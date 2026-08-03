"""ASGI entry for Render / uvicorn: uvicorn app.main:app"""
from app.main import app

__all__ = ["app"]
