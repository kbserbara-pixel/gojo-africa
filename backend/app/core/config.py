from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./gojoafrica.db"
    redis_url: str = "redis://localhost:6379/0"
    openai_api_key: str = ""
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    aws_s3_bucket: str = "gojo-africa-media"
    aws_region: str = "eu-west-1"
    environment: str = "development"
    # Comma-separated list of allowed origins for CORS. Defaults to local dev
    # only -- set this to the real production domain(s) (e.g. the Vercel URL)
    # via the CORS_ORIGINS env var once deployed publicly.
    cors_origins: str = "http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
