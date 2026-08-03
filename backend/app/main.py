from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.database import Base, engine, SessionLocal
from app.models import entities  # noqa: F401
from app.api import auth, platform, students, academics, operations, chat
from app.seed.data import seed_database

settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    if settings.SEED_ON_STARTUP:
        db = SessionLocal()
        try:
            seed_database(db)
        finally:
            db.close()
    yield


app = FastAPI(
    title=f"{settings.APP_NAME} API",
    description=f"Student Information System API by {settings.COMPANY_NAME}",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(platform.router, prefix="/api/v1")
app.include_router(students.router, prefix="/api/v1")
app.include_router(academics.router, prefix="/api/v1")
app.include_router(operations.router, prefix="/api/v1")
app.include_router(chat.router, prefix="/api/v1")


@app.get("/")
def root():
    return {
        "app": settings.APP_NAME,
        "company": settings.COMPANY_NAME,
        "docs": "/docs",
        "health": "/api/v1/health",
        "is_test_site": True,
        "message": "This is a test site with sample data — MIA Solutions Pvt. Ltd.",
    }
