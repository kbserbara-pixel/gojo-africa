# Gojo Africa
## Technical Architecture Document

---

## 1. Architecture Overview

Gojo Africa is built as a modular monolith at launch (one deployable backend, cleanly separated service modules) that can be split into independent microservices as load and team size justify it. This avoids premature microservices overhead while keeping module boundaries clean enough to extract later — important for a team that needs to ship eight functional areas fast without building eight separate ops burdens on day one.

```
                        ┌─────────────────────────┐
                        │        Clients           │
                        │  Flutter (iOS/Android)   │
                        │  Next.js Web (SSR/ISR)    │
                        └────────────┬─────────────┘
                                     │ HTTPS / REST + WebSocket
                        ┌────────────▼─────────────┐
                        │   API Gateway / ALB        │
                        │  (AWS API Gateway / ALB)   │
                        └────────────┬─────────────┘
                                     │
                        ┌────────────▼─────────────┐
                        │   FastAPI Application      │
                        │   (modular monolith)        │
                        │  ┌─────────────────────┐   │
                        │  │ Auth & Identity       │   │
                        │  │ Properties            │   │
                        │  │ AI House Hunter        │──┼──► OpenAI API
                        │  │ Neighborhood Intel      │   │
                        │  │ Verification & Trust    │   │
                        │  │ Housemate Matching       │   │
                        │  │ Diaspora Concierge       │──┼──► Payment partners (Stripe/Chapa/Telebirr)
                        │  │ Home Services             │   │
                        │  │ Analytics & Forecasting   │   │
                        │  └─────────────────────┘   │
                        └─────┬───────────┬─────────┘
                              │           │
                  ┌───────────▼─┐    ┌────▼──────────┐
                  │ PostgreSQL   │    │ Redis           │
                  │ (RDS, multi- │    │ (ElastiCache)   │
                  │  AZ, +PostGIS│    │ cache, sessions,│
                  │  for geo)    │    │ queues, rate-   │
                  └──────────────┘    │ limiting        │
                                       └────────────────┘
                        ┌─────────────────────────────┐
                        │ Async workers (Celery/RQ on  │
                        │ Redis) — image verification, │
                        │ scoring jobs, notifications,  │
                        │ OpenAI batch calls            │
                        └─────────────────────────────┘
                        ┌─────────────────────────────┐
                        │ S3 — media storage            │
                        │ CloudFront — CDN               │
                        │ Rekognition / custom CV model  │
                        │   — image verification         │
                        └─────────────────────────────┘
```

**Backend framework choice:** FastAPI over Django for the initial build. The platform is AI- and integration-heavy (OpenAI calls, third-party verification, payment partners, real-time chat) where FastAPI's native async support and Pydantic-based validation reduce boilerplate. Django remains a reasonable alternative if the team prioritizes Django's batteries-included admin and ORM tooling for internal ops dashboards (e.g., the human verification queue) — the schema and API contracts in this document are framework-agnostic enough to support either.

---

## 2. Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| Mobile | Flutter (Dart) | Single codebase for iOS + Android; offline-friendly for low-connectivity areas |
| Web | Next.js (React, TypeScript) | SSR/ISR for SEO on property listings; App Router |
| Backend API | FastAPI (Python 3.12) | Async, OpenAPI-native, Pydantic v2 validation |
| Database | PostgreSQL 16 + PostGIS | Relational core + geospatial queries for neighborhood/proximity features |
| Cache / Queue | Redis 7 | Caching, session store, Celery/RQ broker, rate limiting |
| Background jobs | Celery (or RQ) | Image verification, scoring recomputation, notification delivery, AI batch jobs |
| AI / LLM | OpenAI API (GPT-4-class + embeddings) | Conversational search, recommendation explanation, document/listing parsing |
| Object storage | AWS S3 | Property photos, video tours, verification documents |
| CDN | AWS CloudFront | Media delivery |
| Image verification | AWS Rekognition + custom CV model | Duplicate/stock-photo detection, authenticity scoring |
| Search | PostgreSQL full-text + pgvector (or OpenSearch at scale) | Listing search; pgvector for semantic/embedding search powering AI House Hunter |
| Infra | AWS (ECS Fargate or EKS), RDS, ElastiCache, S3, CloudFront, SQS, Cognito | Managed services to minimize ops overhead pre-Series A |
| Observability | CloudWatch, Sentry, Datadog (or OpenTelemetry + Grafana) | Error tracking, latency, AI cost monitoring |
| CI/CD | GitHub Actions → ECR → ECS | Blue/green or rolling deploys |

---

## 3. Module-to-Service Breakdown

Each module below maps to a router/service package in the backend and a corresponding set of mobile/web screens.

**Auth & Identity** — phone/email + OTP auth (critical for Ethiopia, where phone-first identity is the norm), role-based access (renter, buyer, landlord, agent, service provider, admin/verifier), session management via JWT + Redis-backed refresh tokens.

**Property Marketplace** — CRUD for listings across five listing types (rental, sale, commercial, student housing, shared accommodation), type-specific schema extensions (e.g., per-bed pricing for shared accommodation), media upload pipeline to S3, geospatial indexing via PostGIS for map search and proximity queries.

**AI House Hunter** — conversational endpoint backed by OpenAI function-calling: parses natural-language queries into structured filters, retrieves candidate listings via pgvector semantic search + structured filters, ranks with a hybrid score (semantic fit + budget fit + lifestyle fit + trust score), and generates a natural-language explanation per recommendation (explainability is a stored, auditable field — not just a chat response — so users and the product team can review why a result was surfaced).

**Neighborhood Intelligence** — geospatial scoring service that aggregates per-area data (safety, water reliability, electricity reliability, internet quality, transit access, school/hospital proximity, cost of living) from three sources: structured partner/government data feeds where available, verified crowdsourced reports (weighted by reporter trust score), and derived signals (e.g., listing density, price volatility as a cost-of-living proxy). Scores are versioned and timestamped so confidence/staleness is visible.

**Verification & Trust** — pipeline with four stages: (1) automated image verification (duplicate detection, stock-photo/reverse-image checks, basic authenticity heuristics), (2) landlord/agent identity verification (document upload + manual or partner-API check), (3) human verification queue for flagged or high-value listings (on-the-ground confirmation), (4) composite trust score computed from verification stage, account history, dispute rate, and response time, surfaced on every listing and profile. Scam detection runs continuously as a background job scoring active listings against fraud heuristics (price anomalies, duplicate content across accounts, rapid relisting after removal).

**Housemate Matching** — compatibility scoring service (lifestyle, schedule, cleanliness, budget vectors), match feed, in-app messaging (WebSocket-based), and shared budget planner (linked to a shared-accommodation listing, splits rent/utilities across matched housemates).

**Diaspora Concierge** — booking and workflow service for remote viewings and virtual tours, scheduling integration for vetted local agents performing video inspections, e-signature integration for remote contract signing, and an international payments module integrating licensed payment partners (e.g., Stripe for card/international rails, plus local options such as Chapa or Telebirr APIs for in-country settlement).

**Home Services Marketplace** — provider directory and booking service across six categories (movers, cleaners, furniture providers, internet providers, maintenance technicians, insurance partners), reusing the same trust-score and review infrastructure built for landlords/agents, with commission tracking per booking.

**AI Analytics Dashboard** — read-optimized analytics service computing rental trend aggregates, a price-prediction model (gradient-boosted regression on listing + neighborhood + macro features, retrained periodically), area growth forecasting (time-series model on listing volume, price trend, and infrastructure investment signals), and investment recommendation surfacing for landlords/investors.

---

## 4. Core Database Schema (Entity Overview)

The schema below shows core entities and relationships; a runnable PostgreSQL migration implementing this is included in the code scaffold (`database/schema.sql`).

```
users
 ├─ id, phone, email, password_hash, role (renter|buyer|landlord|agent|provider|admin)
 ├─ trust_score, verification_status, created_at
 └─ profile (name, locale, diaspora_flag, country_of_residence)

properties
 ├─ id, owner_id (→users), listing_type (rental|sale|commercial|student|shared)
 ├─ title, description, price, currency, bedrooms, bathrooms, area_sqm
 ├─ address, latitude, longitude (PostGIS geography)
 ├─ status (draft|active|under_review|rented|sold|removed)
 ├─ trust_score, verification_stage, scam_risk_score
 └─ created_at, updated_at, last_verified_at

property_media
 ├─ id, property_id (→properties), url, type (image|video|tour)
 └─ ai_verification_status, is_duplicate_flagged

neighborhoods
 ├─ id, name, city, boundary (PostGIS polygon)
 └─ safety_score, water_score, electricity_score, internet_score,
    transport_score, school_proximity_score, hospital_proximity_score,
    cost_of_living_score, score_updated_at, confidence_level

verification_records
 ├─ id, target_type (property|user), target_id, stage, status
 ├─ reviewer_id (→users, nullable for AI-stage), evidence_url
 └─ created_at, resolved_at

housemate_profiles
 ├─ id, user_id (→users), budget_min, budget_max
 └─ lifestyle_vector (jsonb: schedule, cleanliness, noise_tolerance, smoking, pets)

housemate_matches
 ├─ id, user_a_id, user_b_id, property_id (nullable), compatibility_score
 └─ status (suggested|accepted|rejected), created_at

bookings (home services + diaspora services)
 ├─ id, user_id, provider_id, service_type, property_id (nullable)
 ├─ scheduled_at, status, price, commission_amount
 └─ created_at

transactions
 ├─ id, property_id, buyer_id, seller_id, type (rental_deposit|sale|service_payment)
 ├─ amount, currency, payment_provider, status
 └─ created_at, settled_at

ai_recommendations
 ├─ id, user_id, property_id, query_text, score_breakdown (jsonb)
 ├─ explanation_text
 └─ created_at

market_metrics (for AI Analytics Dashboard)
 ├─ id, neighborhood_id, period, avg_price, price_change_pct
 └─ predicted_price_next_period, forecast_confidence
```

---

## 5. AI / Recommendation Engine Design

**Conversational search (AI House Hunter).** User free-text input → OpenAI function-calling extracts structured intent (location, budget, bedrooms, lifestyle constraints) → structured filters query Postgres; the same query text is embedded and matched via pgvector against listing description embeddings for semantic recall (catching listings that match intent even when keywords don't align) → candidate set passed to a ranking step.

**Ranking and personalization.** Final ranking is a weighted blend of: semantic relevance score, budget-fit score (computed from the Budget Analysis service against user-declared income/savings), lifestyle-match score (vector similarity between user preference vector and listing/neighborhood attributes), and the listing's trust score (so verified, trustworthy listings are never out-ranked by unverified ones on relevance alone).

**Explainability.** Every recommendation stores its score breakdown (`ai_recommendations.score_breakdown`) and a generated natural-language explanation ("This matches your budget, is 8 minutes from your stated workplace, and has a high water-reliability score for the area"). This is a product requirement, not a nice-to-have — in a market where users are wary of opaque platforms, explainability is part of the trust strategy, not just UX polish.

**Budget analysis.** A deterministic (non-LLM) affordability model using income/savings inputs, local cost-of-living benchmarks from Neighborhood Intelligence, and standard affordability ratios, cross-checked against the user's actual saved/viewed listings to flag mismatches early.

**Cost and reliability controls.** LLM calls are scoped narrowly (function-calling for structured extraction, short prompts for explanation generation) to control OpenAI API cost at scale; responses are cached by normalized query signature in Redis; a fallback rules-based search path exists if the LLM service degrades, so core search availability never depends entirely on a third-party API.

---

## 6. Verification & Trust Pipeline

1. **Submission** — landlord/agent submits listing with photos and identity documents.
2. **Automated checks** — image hashing/reverse-search for duplicate or stock photos, basic text analysis for scam-pattern language, price-anomaly check against neighborhood comparables.
3. **Risk scoring** — listing assigned a provisional trust score and scam-risk score; low-risk, clean listings can go live immediately with a "pending full verification" badge.
4. **Human verification queue** — flagged listings, all sale listings above a value threshold, and all diaspora-targeted listings route to a human verifier (internal team initially, scalable to a trained partner network) for on-the-ground or document-based confirmation.
5. **Trust score finalization** — composite score recalculated from verification outcome, owner account history, and response/dispute metrics; recalculated periodically (not just at submission) so stale or degraded trust is reflected over time.
6. **Continuous scam monitoring** — background job rescans active listings for emergent fraud patterns (e.g., the same images appearing under multiple accounts).

---

## 7. API Design Principles

- REST for CRUD-style resources (`/properties`, `/users`, `/bookings`), versioned under `/api/v1/`.
- WebSocket channel for real-time housemate messaging and diaspora concierge live-tour coordination.
- OpenAPI schema auto-generated by FastAPI, consumed directly by the Next.js client via generated TypeScript types (keeps web client and backend contract in sync without manual duplication).
- All AI-backed endpoints (`/ai/search`, `/ai/recommendations`) return both the result and the explanation payload — explainability is part of the API contract, not an internal-only field.
- Idempotency keys required on all payment- and transaction-related POST endpoints to make diaspora/cross-border payment retries safe.

---

## 8. Security & Compliance

Authentication via short-lived JWT access tokens + Redis-backed refresh tokens; OTP-based phone verification for account creation given phone-first identity norms in Ethiopia. All PII (identity documents, payment details) encrypted at rest (RDS encryption + S3 SSE) and in transit (TLS everywhere). Role-based access control enforced at the API layer for every module, with particular attention to the verification queue (only verified internal/partner reviewers can resolve verification records) and payment endpoints (PCI-scope minimized by delegating card handling to Stripe/payment partners rather than storing card data). Audit logging on all verification decisions and trust-score changes for dispute resolution. Data residency and cross-border payment flows reviewed against Ethiopian National Bank regulations and any data-protection requirements before the Diaspora Concierge payment module goes live.

---

## 9. Scalability & Infrastructure Plan

**Phase 0–1 (MVP–early growth):** Single-region AWS deployment (e.g., `eu-west-1` or `me-south-1` for latency to Ethiopia/diaspora corridors), ECS Fargate for the API (auto-scaled by request volume), RDS Postgres Multi-AZ, ElastiCache Redis, S3 + CloudFront for media. This comfortably supports tens of thousands of MAUs.

**Phase 2 (national scale):** Read replicas for Postgres to offload analytics/dashboard queries from transactional load; move heavy search to OpenSearch if pgvector/full-text search latency degrades at listing-volume scale; introduce a dedicated image-processing pipeline (SQS + Lambda or worker fleet) for verification at higher submission volume.

**Phase 3 (regional expansion):** Multi-region considerations only if latency to new markets demands it; until then, a single well-placed region with CDN edge caching covers most of Sub-Saharan Africa adequately. Database and service boundaries (already modular) become the seam for extracting true microservices (e.g., Verification & Trust, AI House Hunter) if team/scale demands independent deploy cycles.

**Cost discipline:** OpenAI usage, Rekognition calls, and SMS/OTP costs are the primary variable infra costs at scale — each is metered and capped per user/session to avoid runaway spend, with cached/fallback paths as described in Section 5.

---

## 10. DevOps & Delivery

GitHub Actions pipeline: lint/type-check → unit tests → build container → push to ECR → deploy to ECS (staging) → manual promote to production. Infrastructure defined as code (Terraform) for reproducibility across the eventual multi-market expansion. Feature flags (e.g., LaunchDarkly or a simple in-house flag table) to roll out modules like AI House Hunter or Diaspora Concierge progressively rather than big-bang. Sentry for error tracking, CloudWatch + Datadog/Grafana dashboards for latency, AI cost, and verification-queue backlog monitoring — the verification queue length is treated as a first-class operational metric, since it directly gates trust-score integrity.
