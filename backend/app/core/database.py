from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.core.config import settings

# SQLite: Python's sqlite3 driver stores/reads TEXT as UTF-8 natively, so
# Amharic (or any non-ASCII) content needs no extra config there.
# Postgres: explicitly request a UTF-8 client encoding so Amharic text is
# never mangled regardless of how the OS/locale environment is configured.
# (The server database itself must also be created with ENCODING 'UTF8' --
# see the note at the top of database/schema.sql.)
if settings.database_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}
elif settings.database_url.startswith("postgres"):
    connect_args = {"client_encoding": "utf8"}
else:
    connect_args = {}

engine = create_engine(settings.database_url, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
