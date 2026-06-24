from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import Neighborhood
from app.schemas.schemas import NeighborhoodOut

router = APIRouter(prefix="/neighborhoods", tags=["neighborhood-intelligence"])


@router.get("", response_model=list[NeighborhoodOut])
def list_neighborhoods(city: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Neighborhood)
    if city:
        q = q.filter(Neighborhood.city == city)
    return q.all()


@router.get("/{neighborhood_id}", response_model=NeighborhoodOut)
def get_neighborhood(neighborhood_id: str, db: Session = Depends(get_db)):
    n = db.query(Neighborhood).filter(Neighborhood.id == neighborhood_id).first()
    if not n:
        raise HTTPException(status_code=404, detail="Neighborhood not found")
    return n
