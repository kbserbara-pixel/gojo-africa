from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import HousemateProfile
from app.schemas.schemas import HousemateProfileCreate
from app.services.trust_score import compute_compatibility_score

router = APIRouter(prefix="/housemates", tags=["housemate-matching"])


@router.post("/profile")
def create_profile(payload: HousemateProfileCreate, db: Session = Depends(get_db)):
    profile = HousemateProfile(**payload.model_dump())
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return {"id": profile.id}


@router.get("/matches/{user_id}")
def get_matches(user_id: str, db: Session = Depends(get_db)):
    me = db.query(HousemateProfile).filter(HousemateProfile.user_id == user_id).first()
    if not me:
        return {"matches": []}

    candidates = db.query(HousemateProfile).filter(HousemateProfile.user_id != user_id).all()
    matches = []
    for c in candidates:
        score = compute_compatibility_score(me, c)
        matches.append({"user_id": c.user_id, "compatibility_score": score})
    matches.sort(key=lambda m: m["compatibility_score"], reverse=True)
    return {"matches": matches[:10]}
