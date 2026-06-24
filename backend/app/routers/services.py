from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import Booking, User
from app.schemas.schemas import BookingCreate

router = APIRouter(prefix="/services", tags=["home-services-marketplace"])

SERVICE_TYPES = ["mover", "cleaner", "furniture", "internet_provider", "maintenance", "insurance"]


@router.get("/providers")
def list_providers(service_type: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(User).filter(User.role == "provider")
    return [{"id": u.id, "full_name": u.full_name, "trust_score": u.trust_score} for u in q.all()]


@router.post("/bookings")
def create_booking(payload: BookingCreate, db: Session = Depends(get_db)):
    booking = Booking(**payload.model_dump(), status="requested")
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return {"id": booking.id, "status": booking.status}
