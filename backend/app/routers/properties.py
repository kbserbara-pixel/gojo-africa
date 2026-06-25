import uuid
from typing import Optional

import httpx
from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.models import Property, PropertyMedia, User
from app.schemas.schemas import PropertyCreate, PropertyMediaOut, PropertyOut
from app.services.trust_score import compute_property_trust_score

router = APIRouter(prefix="/properties", tags=["properties"])


@router.post("", response_model=PropertyOut)
def create_property(
    payload: PropertyCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Listings publish immediately -- there's no admin review screen built
    # yet to ever move a listing out of "pending_review", which previously
    # meant every new listing was invisible on the marketplace forever.
    prop = Property(owner_id=current_user.id, status="active", **payload.model_dump())
    prop.trust_score = compute_property_trust_score(prop)
    db.add(prop)
    db.commit()
    db.refresh(prop)
    return prop


@router.post("/{property_id}/media", response_model=PropertyMediaOut)
async def upload_property_media(
    property_id: str,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    if str(prop.owner_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="You don't own this listing")
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise HTTPException(status_code=500, detail="Photo storage isn't configured on the server yet")

    contents = await file.read()
    ext = (file.filename or "").rsplit(".", 1)[-1].lower() if "." in (file.filename or "") else "jpg"
    object_path = f"{property_id}/{uuid.uuid4()}.{ext}"

    upload_url = (
        f"{settings.supabase_url}/storage/v1/object/{settings.supabase_storage_bucket}/{object_path}"
    )
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            upload_url,
            content=contents,
            headers={
                "Authorization": f"Bearer {settings.supabase_service_role_key}",
                "apikey": settings.supabase_service_role_key,
                "Content-Type": file.content_type or "application/octet-stream",
            },
        )
    if resp.status_code >= 400:
        raise HTTPException(status_code=502, detail=f"Photo upload to storage failed: {resp.text}")

    public_url = (
        f"{settings.supabase_url}/storage/v1/object/public/{settings.supabase_storage_bucket}/{object_path}"
    )
    media = PropertyMedia(property_id=property_id, url=public_url, media_type="image")
    db.add(media)
    db.commit()
    db.refresh(media)
    return media


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
