from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime

from app.core.database import get_db
from app.core.security import verify_password, create_access_token, get_current_user
from app.models.entities import User, AuditLog

router = APIRouter(prefix="/auth", tags=["Auth"])


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


class LoginBody(BaseModel):
    email: str
    password: str


@router.post("/login", response_model=TokenOut)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    user.last_login = datetime.utcnow()
    db.add(
        AuditLog(
            user_id=user.id,
            action="login",
            entity="user",
            entity_id=str(user.id),
            details={"email": user.email},
        )
    )
    db.commit()
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return TokenOut(
        access_token=token,
        user={
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "campus_id": user.campus_id,
        },
    )


@router.post("/login-json", response_model=TokenOut)
def login_json(body: LoginBody, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    user.last_login = datetime.utcnow()
    db.commit()
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return TokenOut(
        access_token=token,
        user={
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "campus_id": user.campus_id,
        },
    )


@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "campus_id": user.campus_id,
        "phone": user.phone,
    }


@router.get("/demo-accounts")
def demo_accounts():
    return {
        "company": "MIA Solutions Pvt. Ltd.",
        "note": "Test site credentials — password for all accounts: Test@1234",
        "accounts": [
            {"email": "admin@miasolutions.test", "role": "super_admin"},
            {"email": "principal.hyd@miasolutions.test", "role": "principal"},
            {"email": "teacher.hyd@miasolutions.test", "role": "teacher"},
            {"email": "parent.demo@miasolutions.test", "role": "parent"},
            {"email": "student.demo@miasolutions.test", "role": "student"},
            {"email": "accounts.hyd@miasolutions.test", "role": "accountant"},
            {"email": "hr.hyd@miasolutions.test", "role": "hr"},
            {"email": "branch.blr@miasolutions.test", "role": "branch_admin"},
        ],
    }
