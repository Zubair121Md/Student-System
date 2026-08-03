from typing import Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.entities import Student, Guardian, User, AdmissionApplication, Campus

router = APIRouter(tags=["Students & Admissions"])


@router.get("/students")
def list_students(
    campus_id: Optional[int] = None,
    grade: Optional[str] = None,
    q: Optional[str] = None,
    limit: int = Query(50, le=200),
    offset: int = 0,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    query = db.query(Student)
    cid = campus_id or (user.campus_id if user.role != "super_admin" else None)
    if cid:
        query = query.filter(Student.campus_id == cid)
    if grade:
        query = query.filter(Student.grade == grade)
    if q:
        like = f"%{q}%"
        query = query.filter(
            (Student.first_name.ilike(like))
            | (Student.last_name.ilike(like))
            | (Student.student_id.ilike(like))
        )
    total = query.count()
    rows = query.order_by(Student.first_name).offset(offset).limit(limit).all()
    return {
        "total": total,
        "items": [
            {
                "id": s.id,
                "student_id": s.student_id,
                "full_name": f"{s.first_name} {s.last_name}",
                "grade": s.grade,
                "section": s.section,
                "roll_number": s.roll_number,
                "campus_id": s.campus_id,
                "status": s.status,
                "gender": s.gender,
                "rfid_tag": s.rfid_tag,
                "scholarship_code": s.scholarship_code,
            }
            for s in rows
        ],
    }


@router.get("/students/{student_id}")
def student_detail(student_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    s = db.query(Student).filter(Student.id == student_id).first()
    if not s:
        raise HTTPException(404, "Student not found")
    guardians = db.query(Guardian).filter(Guardian.student_id == s.id).all()
    return {
        "id": s.id,
        "student_id": s.student_id,
        "first_name": s.first_name,
        "last_name": s.last_name,
        "date_of_birth": s.date_of_birth.isoformat(),
        "gender": s.gender,
        "blood_group": s.blood_group,
        "email": s.email,
        "phone": s.phone,
        "address": s.address,
        "grade": s.grade,
        "section": s.section,
        "roll_number": s.roll_number,
        "admission_date": s.admission_date.isoformat(),
        "status": s.status,
        "campus_id": s.campus_id,
        "transport_route_id": s.transport_route_id,
        "hostel_room_id": s.hostel_room_id,
        "rfid_tag": s.rfid_tag,
        "medical_notes": s.medical_notes,
        "scholarship_code": s.scholarship_code,
        "guardians": [
            {
                "id": g.id,
                "full_name": g.full_name,
                "relation": g.relation,
                "phone": g.phone,
                "email": g.email,
                "is_primary": g.is_primary,
                "is_emergency_contact": g.is_emergency_contact,
            }
            for g in guardians
        ],
    }


@router.get("/admissions")
def list_admissions(
    campus_id: Optional[int] = None,
    status: Optional[str] = None,
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    query = db.query(AdmissionApplication)
    cid = campus_id or user.campus_id
    if cid:
        query = query.filter(AdmissionApplication.campus_id == cid)
    if status:
        query = query.filter(AdmissionApplication.status == status)
    rows = query.order_by(AdmissionApplication.created_at.desc()).limit(limit).all()
    return [
        {
            "id": a.id,
            "application_no": a.application_no,
            "applicant_name": a.applicant_name,
            "applying_grade": a.applying_grade,
            "parent_name": a.parent_name,
            "parent_phone": a.parent_phone,
            "status": a.status,
            "entrance_score": a.entrance_score,
            "interview_score": a.interview_score,
            "merit_rank": a.merit_rank,
            "interview_at": a.interview_at.isoformat() if a.interview_at else None,
            "offer_letter_sent": a.offer_letter_sent,
            "fee_paid": a.fee_paid,
            "campus_id": a.campus_id,
        }
        for a in rows
    ]


@router.get("/admissions/analytics")
def admission_analytics(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    from sqlalchemy import func

    query = db.query(AdmissionApplication.status, func.count(AdmissionApplication.id))
    cid = campus_id or user.campus_id
    if cid:
        query = query.filter(AdmissionApplication.campus_id == cid)
    rows = query.group_by(AdmissionApplication.status).all()
    return {"by_status": {status: count for status, count in rows}}
