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


settings = Settings()
