"""
AI House Hunter engine.

In production this calls the OpenAI API with function-calling to parse the
free-text query into structured filters, then ranks candidates with a
hybrid score (semantic relevance + budget fit + lifestyle fit + trust
score) and generates a natural-language explanation per result -- see
NestAfrica_Technical_Architecture.md, Section 5.

This stub implements a deterministic fallback (keyword + budget filter) so
the endpoint is fully runnable with no OpenAI key configured, and swaps in
the real OpenAI call when OPENAI_API_KEY is set.
"""
from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.models import Property
from app.schemas.schemas import AIHunterResultItem


def _fallback_search(db: Session, query_text: str, budget_min: Optional[float], budget_max: Optional[float]) -> List[Property]:
    q = db.query(Property).filter(Property.status == "active")
    if budget_min is not None:
        q = q.filter(Property.price >= budget_min)
    if budget_max is not None:
        q = q.filter(Property.price <= budget_max)
    if query_text:
        like = f"%{query_text}%"
        q = q.filter(Property.title.ilike(like) | Property.description.ilike(like))
    return q.order_by(Property.trust_score.desc()).limit(10).all()


def _llm_rerank_and_explain(query_text: str, candidates: List[Property]) -> List[dict]:
    """
    Production path: call OpenAI to score/explain each candidate against the
    query. Left as a clearly-marked integration point -- wire in your
    OpenAI client here using settings.openai_api_key.
    """
    # from openai import OpenAI
    # from app.core.config import settings
    # client = OpenAI(api_key=settings.openai_api_key)
    # ... function-calling / scoring prompt against `query_text` and candidates ...
    raise NotImplementedError("Wire up the OpenAI client here using settings.openai_api_key")


def search_properties(db: Session, query_text: str, budget_min: Optional[float] = None, budget_max: Optional[float] = None) -> List[AIHunterResultItem]:
    candidates = _fallback_search(db, query_text, budget_min, budget_max)

    results = []
    for prop in candidates:
        budget_fit = 1.0
        if budget_max and prop.price > budget_max:
            budget_fit = max(0.0, 1 - (prop.price / budget_max - 1))

        score_breakdown = {
            "semantic_relevance": 0.7,  # placeholder until OpenAI semantic search is wired in
            "budget_fit": round(budget_fit, 2),
            "lifestyle_fit": 0.7,  # placeholder until lifestyle vectors are collected
            "trust_score": round(prop.trust_score / 100, 2) if prop.trust_score else 0.5,
        }
        explanation = (
            f'"{prop.title}" matches your search for "{query_text}". '
            f"Priced at {prop.price} {prop.currency}, with a trust score of {prop.trust_score:.0f}/100."
        )
        results.append(
            AIHunterResultItem(
                property_id=prop.id,
                title=prop.title,
                score_breakdown=score_breakdown,
                explanation=explanation,
            )
        )
    return results
