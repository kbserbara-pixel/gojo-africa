from datetime import datetime
from typing import Optional, Any, Dict, List

from pydantic import BaseModel, EmailStr, model_validator


class UserCreate(BaseModel):
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    # No complexity rule on purpose -- short, simple passwords like "1234" or
    # "12ab" must keep working. Don't add a regex/min_length validator here.
    password: str
    full_name: str
    role: str = "renter"
    locale: str = "en"  # "en" | "am"
    is_diaspora: bool = False
    country_of_residence: Optional[str] = None

    @model_validator(mode="after")
    def require_phone_or_email(self) -> "UserCreate":
        if not self.phone and not self.email:
            raise ValueError("Provide an email address or a phone number")
        return self


class UserOut(BaseModel):
    id: str
    phone: Optional[str] = None
    email: Optional[str] = None
    full_name: str
    role: str
    locale: str
    trust_score: float
    verification_status: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    # Whatever the user typed -- an email address or a phone number (any
    # format/country code). The login endpoint figures out which it is.
    identifier: str
    password: str


class PropertyCreate(BaseModel):
    listing_type: str  # rental|sale|commercial|student_housing|shared_accommodation
    title: str
    description: Optional[str] = None
    price: float
    currency: str = "ETB"
    price_per_bed: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    area_sqm: Optional[float] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    neighborhood_id: Optional[str] = None


class PropertyOut(BaseModel):
    id: str
    owner_id: str
    listing_type: str
    title: str
    description: Optional[str] = None
    price: float
    currency: str
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    area_sqm: Optional[float] = None
    address: Optional[str] = None
    neighborhood_id: Optional[str] = None
    status: str
    trust_score: float
    scam_risk_score: float

    class Config:
        from_attributes = True


class AIHunterQuery(BaseModel):
    user_id: Optional[str] = None
    query: str
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None


class AIHunterResultItem(BaseModel):
    property_id: str
    title: str
    score_breakdown: Dict[str, float]
    explanation: str


class AIHunterResult(BaseModel):
    results: List[AIHunterResultItem]


class NeighborhoodOut(BaseModel):
    id: str
    name: str
    city: str
    safety_score: Optional[float]
    water_score: Optional[float]
    electricity_score: Optional[float]
    internet_score: Optional[float]
    transport_score: Optional[float]
    school_proximity_score: Optional[float]
    hospital_proximity_score: Optional[float]
    cost_of_living_score: Optional[float]

    class Config:
        from_attributes = True


class VerificationCreate(BaseModel):
    target_type: str  # property|user
    target_id: str
    stage: str
    evidence_url: Optional[str] = None


class HousemateProfileCreate(BaseModel):
    user_id: str
    budget_min: float
    budget_max: float
    lifestyle: Dict[str, Any]


class BookingCreate(BaseModel):
    user_id: str
    provider_id: Optional[str] = None
    property_id: Optional[str] = None
    service_type: str
    scheduled_at: Optional[datetime] = None
