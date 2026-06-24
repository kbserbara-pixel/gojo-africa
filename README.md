# Gojo Africa — Code Scaffold

Starter scaffold for the Gojo Africa platform: FastAPI backend, Next.js web app,
Flutter mobile shell, and a PostgreSQL schema. This is a foundation to build
on, not a production-ready system — see `NestAfrica_Technical_Architecture.md`
for the full design this maps to.

## Structure

```
NestAfrica/
  NestAfrica_Business_Strategy.md      Business & strategy plan
  NestAfrica_Technical_Architecture.md Full technical architecture
  NestAfrica_Pitch_Deck.html           Investor pitch deck (open in a browser)
  database/schema.sql                  Production PostgreSQL + PostGIS schema (all 8 modules)
  backend/                             FastAPI application
  web/                                 Next.js web application
  mobile/                              Flutter mobile shell
```

## Running the backend

```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env   # Windows; on Mac/Linux: cp .env.example .env
# Quickest local start (no Postgres/Redis required) is already the default
# in .env.example: DATABASE_URL=sqlite:///./gojoafrica.db
uvicorn app.main:app --reload
```

Visit http://localhost:8000/docs for the interactive API explorer.

The ORM models in `backend/app/models/models.py` use plain lat/lng floats so
the app runs on SQLite with zero setup for local development. The real
production schema in `database/schema.sql` uses PostGIS geography types and
pgvector for semantic search — apply that schema directly against Postgres
for anything beyond local prototyping.

## Running the web app

```bash
cd web
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8000`) to point at
the backend.

## Running the mobile shell

```bash
cd mobile
flutter pub get
flutter run
```

## Mapping to AWS (production)

| Local dev | AWS production |
|---|---|
| SQLite / local Postgres | RDS PostgreSQL (Multi-AZ) + PostGIS |
| Local filesystem for media | S3 + CloudFront |
| In-memory / local Redis | ElastiCache for Redis |
| `uvicorn --reload` | ECS Fargate behind an ALB |
| Local OpenAI key | Same API, secrets via AWS Secrets Manager |

See `NestAfrica_Technical_Architecture.md` for the full infrastructure plan.

## What's stubbed vs. real

The AI House Hunter (`backend/app/services/ai_engine.py`) ships with a
deterministic keyword/budget fallback so the API runs with no OpenAI key.
The real OpenAI function-calling + semantic ranking integration point is
clearly marked in that file. Diaspora payment and e-signature endpoints
(`backend/app/routers/diaspora.py`) are stubs awaiting a real Stripe/Chapa/
Telebirr and e-signature provider integration.
