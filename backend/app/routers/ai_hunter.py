from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.schemas import AIHunterQuery, AIHunterResult
from app.services.ai_engine import search_properties

router = APIRouter(prefix="/ai", tags=["ai-house-hunter"])


@router.post("/search", response_model=AIHunterResult)
def ai_search(payload: AIHunterQuery, db: Session = Depends(get_db)):
    """
    Conversational search entry point. Parses the free-text query into
    structured filters, retrieves and ranks candidate listings, and returns
    an explanation alongside every result (see ai_engine.search_properties).
    """
    results = search_properties(
        db=db,
        query_text=payload.query,
        budget_min=payload.budget_min,
        budget_max=payload.budget_max,
    )
    return AIHunterResult(results=results)
