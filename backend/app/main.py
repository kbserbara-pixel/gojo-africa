from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.routers import (
    auth, properties, ai_hunter, neighborhoods, verification,
    housemates, diaspora, services, analytics,
)

# Dev convenience: auto-create tables on SQLite. In production, manage the
# schema with database/schema.sql + a migration tool (e.g. Alembic) instead.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gojo Africa API",
    description="AI-powered housing ecosystem for Africa -- Ethiopia launch market.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(properties.router)
app.include_router(ai_hunter.router)
app.include_router(neighborhoods.router)
app.include_router(verification.router)
app.include_router(housemates.router)
app.include_router(diaspora.router)
app.include_router(services.router)
app.include_router(analytics.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "gojo-africa-api"}
