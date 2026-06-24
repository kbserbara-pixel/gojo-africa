from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import Booking

router = APIRouter(prefix="/diaspora", tags=["diaspora-concierge"])


@router.post("/virtual-tour")
def request_virtual_tour(property_id: str, user_id: str, db: Session = Depends(get_db)):
    booking = Booking(user_id=user_id, property_id=property_id, service_type="virtual_tour", status="requested")
    db.add(booking)
    db.commit()
    return {"booking_id": booking.id, "status": booking.status}


@router.post("/video-inspection")
def request_video_inspection(property_id: str, user_id: str, db: Session = Depends(get_db)):
    booking = Booking(user_id=user_id, property_id=property_id, service_type="video_inspection", status="requested")
    db.add(booking)
    db.commit()
    return {"booking_id": booking.id, "status": booking.status}


@router.post("/sign")
def request_remote_signing(property_id: str, user_id: str, db: Session = Depends(get_db)):
    """Stub -- wire to an e-signature provider (e.g. DocuSign) in production."""
    booking = Booking(user_id=user_id, property_id=property_id, service_type="remote_signing", status="requested")
    db.add(booking)
    db.commit()
    return {"booking_id": booking.id, "status": booking.status, "next_step": "redirect_to_esignature_provider"}


@router.post("/payments/intent")
def create_payment_intent(amount: float, currency: str, provider: str = "stripe"):
    """Stub -- wire to Stripe / Chapa / Telebirr APIs in production."""
    return {"provider": provider, "amount": amount, "currency": currency, "client_secret": "stub_client_secret"}
