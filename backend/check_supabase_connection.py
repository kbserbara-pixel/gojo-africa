"""
Quick health check for the Supabase Postgres connection.

Run from the backend/ directory (with the venv activated so it picks up the
same dependencies the app uses):

    python check_supabase_connection.py

It reuses the app's own settings/config, so it always checks whatever
DATABASE_URL is currently set in backend/.env -- no separate credentials to
maintain. Exits 0 on success, 1 on failure, and tries to give an actionable
hint for the most common failure causes (wrong password, project paused,
psycopg2 not installed, schema not yet applied).
"""
import sys

from sqlalchemy import text
from sqlalchemy.exc import OperationalError, ProgrammingError

from app.core.config import settings
from app.core.database import engine

EXPECTED_TABLES = {
    "users", "neighborhoods", "properties", "property_media",
    "verification_records", "housemate_profiles", "housemate_matches",
    "bookings", "transactions", "ai_recommendations", "market_metrics",
}


def main() -> int:
    print(f"Environment:      {settings.environment}")
    print(f"Database backend: {'Postgres (Supabase)' if settings.database_url.startswith('postgres') else 'SQLite (local)'}")

    if settings.database_url.startswith("sqlite"):
        print("\nDATABASE_URL is still pointing at SQLite -- update backend/.env "
              "to your Supabase connection string first, then re-run this script.")
        return 1

    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            print("\n[OK] Connected to Supabase Postgres.")

            rows = conn.execute(text(
                "SELECT table_name FROM information_schema.tables "
                "WHERE table_schema = 'public' ORDER BY table_name"
            )).fetchall()
            found = {row[0] for row in rows}

            print(f"[OK] Found {len(found)} table(s) in the public schema.")
            missing = EXPECTED_TABLES - found
            if missing:
                print(f"\n[WARN] Missing expected table(s): {', '.join(sorted(missing))}")
                print("       Run database/schema.sql in the Supabase SQL Editor if you "
                      "haven't yet, then re-run this check.")
            else:
                print("[OK] All expected application tables are present.")

            count = conn.execute(text("SELECT COUNT(*) FROM users")).scalar()
            print(f"[OK] users table is queryable ({count} row(s)).")

        return 0

    except ModuleNotFoundError as e:
        print(f"\n[FAIL] {e}")
        print("       Install the Postgres driver: pip install psycopg2-binary --only-binary :all:")
        return 1
    except OperationalError as e:
        print(f"\n[FAIL] Could not connect to the database.\n{e}")
        print("\nCommon causes:")
        print("  - Wrong password or project ref in DATABASE_URL")
        print("  - Supabase free-tier project paused from inactivity (open the dashboard to wake it)")
        print("  - Network/firewall blocking outbound port 5432 (try the 6543 pooler URL instead)")
        return 1
    except ProgrammingError as e:
        print(f"\n[FAIL] Connected, but a query failed -- the schema is likely not applied yet.\n{e}")
        print("       Run database/schema.sql in the Supabase SQL Editor, then re-run this check.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
