from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.models import Property, User
from app.schemas.schemas import PropertyCreate, PropertyOut
from app.services.trust_score import compute_property_trust_score

router = APIRouter(prefix="/properties", tags=["properties"])


@router.post("", response_model=PropertyOut)
def create_property(
    payload: PropertyCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    prop = Property(owner_id=current_user.id, status="pending_review", **payload.model_dump())
    prop.trust_score = compute_property_trust_score(prop)
    db.add(prop)
    db.commit()
    db.refresh(prop)
    return prop


@router.get("", response_model=list[PropertyOut])
def list_properties(
    listing_type: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    db: Session = Depends(get_db),
    limit: int = Query(default=20, le=100),
):
    q = db.query(Property).filter(Property.status == "active")
    if listing_type:
        q = q.filter(Property.listing_type == listing_type)
    if min_price is not None:
        q = q.filter(Property.price >= min_price)
    if max_price is not None:
        q = q.filter(Property.price <= max_price)
    return q.limit(limit).all()


@router.get("/{property_id}", response_model=PropertyOut)
def get_property(property_id: str, db: Session = Depends(get_db)):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return prop
