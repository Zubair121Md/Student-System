from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "MIA Campus"
    COMPANY_NAME: str = "MIA Solutions Pvt. Ltd."
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "test"
    IS_TEST_SITE: bool = True
    SECRET_KEY: str = "mia-campus-test-secret-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 12
    DATABASE_URL: str = "sqlite:///./mia_campus.db"
    REDIS_URL: str = "redis://localhost:6379/0"
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"
    FRONTEND_URL: str = "http://localhost:3000"
    OPENAI_API_KEY: str = ""
    CHATBOT_MODEL: str = "gpt-4o-mini"
    SEED_ON_STARTUP: bool = True

    @property
    def cors_origin_list(self) -> list[str]:
        origins = [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]
        if self.FRONTEND_URL and self.FRONTEND_URL not in origins:
            origins.append(self.FRONTEND_URL)
        return origins

    @property
    def sqlalchemy_database_url(self) -> str:
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+psycopg2://", 1)
        elif url.startswith("postgresql://") and "+psycopg2" not in url:
            url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
        return url

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()
