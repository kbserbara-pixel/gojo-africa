from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import VerificationRecord
from app.schemas.schemas import VerificationCreate

router = APIRouter(prefix="/verification", tags=["verification-trust"])


@router.post("/submit")
def submit_for_verification(payload: VerificationCreate, db: Session = Depends(get_db)):
    record = VerificationRecord(**payload.model_dump(), status="pending")
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"id": record.id, "status": record.status}


@router.get("/queue")
def verification_queue(db: Session = Depends(get_db)):
    """Human verification queue -- pending records ordered oldest first."""
    records = (
        db.query(VerificationRecord)
        .filter(VerificationRecord.status == "pending")
        .order_by(VerificationRecord.created_at.asc())
        .all()
    )
    return [
        {"id": r.id, "target_type": r.target_type, "target_id": r.target_id, "stage": r.stage}
        for r in records
    ]


@router.post("/{record_id}/resolve")
def resolve_verification(record_id: str, status: str, reviewer_id: str, db: Session = Depends(get_db)):
    record = db.query(VerificationRecord).filter(VerificationRecord.id == record_id).first()
    if record:
        record.status = status
        record.reviewer_id = reviewer_id
        db.commit()
    return {"id": record_id, "status": status}
