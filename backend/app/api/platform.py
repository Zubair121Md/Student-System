from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.core.config import get_settings
from app.models.entities import (
    Campus,
    Student,
    Employee,
    AdmissionApplication,
    AttendanceRecord,
    FeeInvoice,
    Notification,
    Circular,
    AuditLog,
    Organization,
    Homework,
    Exam,
    LeaveRequest,
    WorkflowApproval,
    User,
)

router = APIRouter(tags=["Platform"])
settings = get_settings()


@router.get("/health")
def health():
    return {
        "status": "ok",
        "app": settings.APP_NAME,
        "company": settings.COMPANY_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "is_test_site": settings.IS_TEST_SITE,
    }


@router.get("/meta")
def meta(db: Session = Depends(get_db)):
    org = db.query(Organization).first()
    return {
        "app_name": settings.APP_NAME,
        "company": settings.COMPANY_NAME,
        "is_test_site": True,
        "banner": "This is a test site with sample data — MIA Solutions Pvt. Ltd.",
        "organization": {
            "name": org.name if org else settings.APP_NAME,
            "legal_name": org.legal_name if org else settings.COMPANY_NAME,
            "code": org.code if org else "MIA",
        },
    }


@router.get("/dashboard/summary")
def dashboard_summary(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    cid = campus_id or user.campus_id

    def scoped(q, model):
        if cid and hasattr(model, "campus_id"):
            return q.filter(model.campus_id == cid)
        return q

    students = scoped(db.query(func.count(Student.id)), Student).scalar() or 0
    employees = scoped(db.query(func.count(Employee.id)), Employee).scalar() or 0
    admissions = scoped(db.query(func.count(AdmissionApplication.id)), AdmissionApplication).scalar() or 0
    pending_fees = (
        scoped(db.query(func.count(FeeInvoice.id)), FeeInvoice)
        .filter(FeeInvoice.status.in_(["pending", "overdue", "partial"]))
        .scalar()
        or 0
    )
    today = date.today()
    present = (
        scoped(db.query(func.count(AttendanceRecord.id)), AttendanceRecord)
        .filter(AttendanceRecord.date == today, AttendanceRecord.status == "present")
        .scalar()
        or 0
    )
    absent = (
        scoped(db.query(func.count(AttendanceRecord.id)), AttendanceRecord)
        .filter(AttendanceRecord.date == today, AttendanceRecord.status == "absent")
        .scalar()
        or 0
    )
    open_workflows = db.query(func.count(WorkflowApproval.id)).filter(WorkflowApproval.status == "pending").scalar() or 0
    campuses = db.query(func.count(Campus.id)).scalar() or 0

    fee_collected = (
        scoped(db.query(func.coalesce(func.sum(FeeInvoice.net_amount), 0)), FeeInvoice)
        .filter(FeeInvoice.status == "paid")
        .scalar()
    )
    fee_pending_amt = (
        scoped(db.query(func.coalesce(func.sum(FeeInvoice.net_amount), 0)), FeeInvoice)
        .filter(FeeInvoice.status.in_(["pending", "overdue", "partial"]))
        .scalar()
    )

    return {
        "campuses": campuses,
        "students": students,
        "employees": employees,
        "admissions": admissions,
        "pending_fee_invoices": pending_fees,
        "attendance_today": {"present": present, "absent": absent},
        "open_workflows": open_workflows,
        "fees": {"collected": float(fee_collected or 0), "pending": float(fee_pending_amt or 0)},
        "company": settings.COMPANY_NAME,
    }


@router.get("/campuses")
def list_campuses(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = db.query(Campus).order_by(Campus.name).all()
    return [
        {
            "id": c.id,
            "name": c.name,
            "code": c.code,
            "city": c.city,
            "state": c.state,
            "curriculum": c.curriculum,
            "capacity": c.capacity,
            "phone": c.phone,
            "email": c.email,
            "is_active": c.is_active,
        }
        for c in rows
    ]


@router.get("/notifications")
def notifications(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = (
        db.query(Notification)
        .filter(Notification.user_id == user.id)
        .order_by(Notification.created_at.desc())
        .limit(30)
        .all()
    )
    return [
        {
            "id": n.id,
            "title": n.title,
            "body": n.body,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat(),
        }
        for n in rows
    ]


@router.get("/circulars")
def circulars(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(Circular)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(Circular.campus_id == cid)
    rows = q.order_by(Circular.published_at.desc()).limit(50).all()
    return [
        {
            "id": c.id,
            "title": c.title,
            "body": c.body,
            "audience": c.audience,
            "published_at": c.published_at.isoformat(),
        }
        for c in rows
    ]


@router.get("/audit-logs")
def audit_logs(
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.role not in ("super_admin", "branch_admin", "principal"):
        return []
    rows = db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(limit).all()
    return [
        {
            "id": a.id,
            "user_id": a.user_id,
            "action": a.action,
            "entity": a.entity,
            "entity_id": a.entity_id,
            "details": a.details,
            "created_at": a.created_at.isoformat(),
        }
        for a in rows
    ]


@router.get("/workflows")
def workflows(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = db.query(WorkflowApproval).order_by(WorkflowApproval.created_at.desc()).limit(50).all()
    return [
        {
            "id": w.id,
            "module": w.module,
            "entity_id": w.entity_id,
            "step": w.step,
            "status": w.status,
            "comments": w.comments,
            "created_at": w.created_at.isoformat(),
        }
        for w in rows
    ]
