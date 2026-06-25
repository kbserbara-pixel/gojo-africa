"""
SQLAlchemy ORM models.

Simplified for local/SQLite-friendly development: latitude/longitude are
plain floats here instead of PostGIS geography types, and there is no
pgvector embedding column. The authoritative production schema (with
PostGIS + pgvector) lives in database/schema.sql -- apply that directly
against Postgres for anything beyond local prototyping.
"""
import uuid
from datetime import datetime

from sqlalchemy import (
    Column, String, Float, Integer, Boolean, DateTime, ForeignKey, Text, JSON
)
from sqlalchemy.orm import relationship

from app.core.database import Base


def gen_uuid() -> str:
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=gen_uuid)
    # Either phone or email (or both) identifies a user -- enforced at the
    # application layer (UserCreate validator), not a DB NOT NULL, since
    # exactly one of the two being required would block sign-up with the
    # other. Both stay unique so whichever one is set can't collide.
    phone = Column(String(20), unique=True, nullable=True)
    email = Column(String(255), unique=True, nullable=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(20), default="renter")  # renter|buyer|landlord|agent|provider|admin|verifier
    locale = Column(String(10), default="en")
    is_diaspora = Column(Boolean, default=False)
    country_of_residence = Column(String(100), nullable=True)
    trust_score = Column(Float, default=0.0)
    verification_status = Column(String(20), default="unverified")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


class Neighborhood(Base):
    __tablename__ = "neighborhoods"

    id = Column(String, primary_key=True, default=gen_uuid)
    name = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    country = Column(String(100), default="Ethiopia")
    safety_score = Column(Float, nullable=True)
    water_score = Column(Float, nullable=True)
    electricity_score = Column(Float, nullable=True)
    internet_score = Column(Float, nullable=True)
    transport_score = Column(Float, nullable=True)
    school_proximity_score = Column(Float, nullable=True)
    hospital_proximity_score = Column(Float, nullable=True)
    cost_of_living_score = Column(Float, nullable=True)
    confidence_level = Column(String(20), default="medium")
    score_updated_at = Column(DateTime, default=datetime.utcnow)


class Property(Base):
    __tablename__ = "properties"

    id = Column(String, primary_key=True, default=gen_uuid)
    owner_id = Column(String, ForeignKey("users.id"), nullable=False)
    neighborhood_id = Column(String, ForeignKey("neighborhoods.id"), nullable=True)
    listing_type = Column(String(30), nullable=False)  # rental|sale|commercial|student_housing|shared_accommodation
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    currency = Column(String(10), default="ETB")
    price_per_bed = Column(Float, nullable=True)
    bedrooms = Column(Integer, nullable=True)
    bathrooms = Column(Integer, nullable=True)
    area_sqm = Column(Float, nullable=True)
    address = Column(String(500), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    # Phone number renters/buyers should call about this specific listing --
    # separate from the owner's account phone since an agent may want a
    # different number per listing.
    contact_phone = Column(String(30), nullable=True)
    status = Column(String(20), default="draft")
    trust_score = Column(Float, default=0.0)
    scam_risk_score = Column(Float, default=0.0)
    verification_stage = Column(String(30), default="submitted")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    last_verified_at = Column(DateTime, nullable=True)

    media = relationship("PropertyMedia", backref="property")


class PropertyMedia(Base):
    __tablename__ = "property_media"

    id = Column(String, primary_key=True, default=gen_uuid)
    property_id = Column(String, ForeignKey("properties.id"), nullable=False)
    url = Column(String(1000), nullable=False)
    media_type = Column(String(20), default="image")
    ai_verification_status = Column(String(20), default="pending")
    is_duplicate_flagged = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class VerificationRecord(Base):
    __tablename__ = "verification_records"

    id = Column(String, primary_key=True, default=gen_uuid)
    target_type = Column(String(20), nullable=False)  # property|user
    target_id = Column(String, nullable=False)
    stage = Column(String(30), nullable=False)
    status = Column(String(20), default="pending")
    reviewer_id = Column(String, ForeignKey("users.id"), nullable=True)
    evidence_url = Column(String(1000), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)


class HousemateProfile(Base):
    __tablename__ = "housemate_profiles"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    budget_min = Column(Float, nullable=True)
    budget_max = Column(Float, nullable=True)
    lifestyle = Column(JSON, nullable=True)  # schedule, cleanliness, noise_tolerance, smoking, pets
    created_at = Column(DateTime, default=datetime.utcnow)


class HousemateMatch(Base):
    __tablename__ = "housemate_matches"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_a_id = Column(String, ForeignKey("users.id"), nullable=False)
    user_b_id = Column(String, ForeignKey("users.id"), nullable=False)
    property_id = Column(String, ForeignKey("properties.id"), nullable=True)
    compatibility_score = Column(Float, nullable=True)
    status = Column(String(20), default="suggested")
    created_at = Column(DateTime, default=datetime.utcnow)


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    provider_id = Column(String, ForeignKey("users.id"), nullable=True)
    property_id = Column(String, ForeignKey("properties.id"), nullable=True)
    service_type = Column(String(30), nullable=False)
    scheduled_at = Column(DateTime, nullable=True)
    status = Column(String(20), default="requested")
    price = Column(Float, nullable=True)
    commission_amount = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, default=gen_uuid)
    property_id = Column(String, ForeignKey("properties.id"), nullable=True)
    buyer_id = Column(String, ForeignKey("users.id"), nullable=True)
    seller_id = Column(String, ForeignKey("users.id"), nullable=True)
    type = Column(String(30), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="ETB")
    payment_provider = Column(String(50), nullable=True)
    status = Column(String(20), default="pending")
    idempotency_key = Column(String(100), unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    settled_at = Column(DateTime, nullable=True)


class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    property_id = Column(String, ForeignKey("properties.id"), nullable=False)
    query_text = Column(Text, nullable=True)
    score_breakdown = Column(JSON, nullable=True)
    explanation_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class MarketMetric(Base):
    __tablename__ = "market_metrics"

    id = Column(String, primary_key=True, default=gen_uuid)
    neighborhood_id = Column(String, ForeignKey("neighborhoods.id"), nullable=True)
    period = Column(DateTime, nullable=False)
    avg_price = Column(Float, nullable=True)
    price_change_pct = Column(Float, nullable=True)
    predicted_price_next_period = Column(Float, nullable=True)
    forecast_confidence = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
