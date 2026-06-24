from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import MarketMetric

router = APIRouter(prefix="/analytics", tags=["ai-analytics-dashboard"])


@router.get("/trends/{neighborhood_id}")
def rental_trends(neighborhood_id: str, db: Session = Depends(get_db)):
    metrics = (
        db.query(MarketMetric)
        .filter(MarketMetric.neighborhood_id == neighborhood_id)
        .order_by(MarketMetric.period.asc())
        .all()
    )
    return [
        {"period": m.period, "avg_price": m.avg_price, "price_change_pct": m.price_change_pct}
        for m in metrics
    ]


@router.get("/predict-price/{neighborhood_id}")
def predict_price(neighborhood_id: str, db: Session = Depends(get_db)):
    """
    Stub for the price-prediction model described in the architecture doc
    (gradient-boosted regression on listing + neighborhood + macro features).
    Wire in a trained model artifact here; this returns a placeholder.
    """
    latest = (
        db.query(MarketMetric)
        .filter(MarketMetric.neighborhood_id == neighborhood_id)
        .order_by(MarketMetric.period.desc())
        .first()
    )
    if not latest:
        return {"predicted_price_next_period": None, "forecast_confidence": 0.0}
    return {
        "predicted_price_next_period": latest.predicted_price_next_period,
        "forecast_confidence": latest.forecast_confidence,
    }
