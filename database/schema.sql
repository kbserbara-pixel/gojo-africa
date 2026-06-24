-- Gojo Africa core schema (PostgreSQL 16+, PostGIS + pgvector extensions)
-- Run: psql -d gojoafrica -f schema.sql
--
-- IMPORTANT for Amharic / non-Latin text support: create the database with
-- an explicit UTF8 encoding before running this file (most installs default
-- to UTF8 already, but don't assume it):
--   CREATE DATABASE gojoafrica WITH ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8' TEMPLATE=template0;
--
-- SUPABASE: paste this entire file into Project > SQL Editor > New query and
-- click Run. Skip the CREATE DATABASE line above -- a Supabase project is
-- already a single Postgres database (called "postgres"), already created
-- with UTF8 encoding, so there is nothing to create there. postgis, pgcrypto,
-- and vector are all allow-listed Supabase extensions, so the three
-- CREATE EXTENSION lines below work as-is from the SQL Editor with no extra
-- dashboard steps. Note there is no separate "TrustScores" table: trust_score
-- is a column on `users` and on `properties` (see below) -- intentional, not
-- a missing table.

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;

-- ============ USERS ============
CREATE TYPE user_role AS ENUM ('renter', 'buyer', 'landlord', 'agent', 'provider', 'admin', 'verifier');

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Sign-up/login accepts either an email or a phone number (no SMS/email
    -- verification step) -- so neither column alone is NOT NULL, but the
    -- CHECK constraint below requires at least one of them.
    phone           VARCHAR(20) UNIQUE,
    email           VARCHAR(255) UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    role            user_role NOT NULL DEFAULT 'renter',
    locale          VARCHAR(10) DEFAULT 'en',
    is_diaspora     BOOLEAN DEFAULT FALSE,
    country_of_residence VARCHAR(100),
    trust_score     NUMERIC(5,2) DEFAULT 0.0,
    verification_status VARCHAR(20) DEFAULT 'unverified',
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT users_phone_or_email CHECK (phone IS NOT NULL OR email IS NOT NULL)
);

-- ============ MIGRATION: already-provisioned Supabase database ============
-- If `users` already exists from an earlier run of this file (phone was
-- NOT NULL), run this block once in Supabase's SQL Editor to switch to
-- email-or-phone sign-in without losing existing rows:
--
--   ALTER TABLE users ALTER COLUMN phone DROP NOT NULL;
--   ALTER TABLE users ADD CONSTRAINT users_phone_or_email
--     CHECK (phone IS NOT NULL OR email IS NOT NULL);
--
-- Safe to run even though every existing row already has a phone number --
-- the CHECK only blocks rows with neither, it doesn't touch existing data.

-- ============ NEIGHBORHOODS ============
CREATE TABLE neighborhoods (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    city            VARCHAR(255) NOT NULL,
    country         VARCHAR(100) NOT NULL DEFAULT 'Ethiopia',
    boundary        GEOGRAPHY(POLYGON),
    safety_score             NUMERIC(4,1),
    water_score              NUMERIC(4,1),
    electricity_score        NUMERIC(4,1),
    internet_score           NUMERIC(4,1),
    transport_score          NUMERIC(4,1),
    school_proximity_score   NUMERIC(4,1),
    hospital_proximity_score NUMERIC(4,1),
    cost_of_living_score     NUMERIC(4,1),
    confidence_level         VARCHAR(20) DEFAULT 'medium',
    score_updated_at         TIMESTAMPTZ DEFAULT now()
);

-- ============ PROPERTIES ============
CREATE TYPE listing_type AS ENUM ('rental', 'sale', 'commercial', 'student_housing', 'shared_accommodation');
CREATE TYPE listing_status AS ENUM ('draft', 'pending_review', 'active', 'under_review', 'rented', 'sold', 'removed');

CREATE TABLE properties (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    neighborhood_id UUID REFERENCES neighborhoods(id),
    listing_type    listing_type NOT NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    price           NUMERIC(14,2) NOT NULL,
    currency        VARCHAR(10) NOT NULL DEFAULT 'ETB',
    price_per_bed   NUMERIC(14,2),
    bedrooms        INT,
    bathrooms       INT,
    area_sqm        NUMERIC(10,2),
    address         VARCHAR(500),
    location        GEOGRAPHY(POINT),
    status          listing_status NOT NULL DEFAULT 'draft',
    trust_score     NUMERIC(5,2) DEFAULT 0.0,
    scam_risk_score NUMERIC(5,2) DEFAULT 0.0,
    verification_stage VARCHAR(30) DEFAULT 'submitted',
    embedding       VECTOR(1536),
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now(),
    last_verified_at TIMESTAMPTZ
);

CREATE INDEX idx_properties_location ON properties USING GIST (location);
CREATE INDEX idx_properties_listing_type ON properties (listing_type);
CREATE INDEX idx_properties_status ON properties (status);

CREATE TABLE property_media (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id     UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    url             VARCHAR(1000) NOT NULL,
    media_type      VARCHAR(20) NOT NULL DEFAULT 'image',
    ai_verification_status VARCHAR(20) DEFAULT 'pending',
    is_duplicate_flagged BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============ VERIFICATION ============
CREATE TABLE verification_records (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_type     VARCHAR(20) NOT NULL,
    target_id       UUID NOT NULL,
    stage           VARCHAR(30) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'pending',
    reviewer_id     UUID REFERENCES users(id),
    evidence_url    VARCHAR(1000),
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT now(),
    resolved_at     TIMESTAMPTZ
);

-- ============ HOUSEMATE MATCHING ============
CREATE TABLE housemate_profiles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    budget_min      NUMERIC(14,2),
    budget_max      NUMERIC(14,2),
    lifestyle       JSONB,
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE housemate_matches (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_a_id       UUID NOT NULL REFERENCES users(id),
    user_b_id       UUID NOT NULL REFERENCES users(id),
    property_id     UUID REFERENCES properties(id),
    compatibility_score NUMERIC(5,2),
    status          VARCHAR(20) DEFAULT 'suggested',
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============ HOME SERVICES / DIASPORA BOOKINGS ============
CREATE TYPE service_type AS ENUM (
    'mover', 'cleaner', 'furniture', 'internet_provider', 'maintenance', 'insurance',
    'virtual_tour', 'video_inspection', 'remote_signing'
);

CREATE TABLE bookings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id),
    provider_id     UUID REFERENCES users(id),
    property_id     UUID REFERENCES properties(id),
    service_type    service_type NOT NULL,
    scheduled_at    TIMESTAMPTZ,
    status          VARCHAR(20) DEFAULT 'requested',
    price           NUMERIC(14,2),
    commission_amount NUMERIC(14,2),
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============ TRANSACTIONS / PAYMENTS ============
CREATE TABLE transactions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id     UUID REFERENCES properties(id),
    buyer_id        UUID REFERENCES users(id),
    seller_id       UUID REFERENCES users(id),
    type            VARCHAR(30) NOT NULL,
    amount          NUMERIC(14,2) NOT NULL,
    currency        VARCHAR(10) NOT NULL DEFAULT 'ETB',
    payment_provider VARCHAR(50),
    status          VARCHAR(20) DEFAULT 'pending',
    idempotency_key VARCHAR(100) UNIQUE,
    created_at      TIMESTAMPTZ DEFAULT now(),
    settled_at      TIMESTAMPTZ
);

-- ============ AI RECOMMENDATIONS ============
CREATE TABLE ai_recommendations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id),
    property_id     UUID NOT NULL REFERENCES properties(id),
    query_text      TEXT,
    score_breakdown JSONB,
    explanation_text TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============ MARKET METRICS (Analytics Dashboard) ============
CREATE TABLE market_metrics (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    neighborhood_id UUID REFERENCES neighborhoods(id),
    period          DATE NOT NULL,
    avg_price       NUMERIC(14,2),
    price_change_pct NUMERIC(6,2),
    predicted_price_next_period NUMERIC(14,2),
    forecast_confidence NUMERIC(4,2),
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_market_metrics_neighborhood_period ON market_metrics (neighborhood_id, period);
