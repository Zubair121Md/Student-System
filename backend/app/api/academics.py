from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.entities import (
    AttendanceRecord,
    LeaveRequest,
    GradeEntry,
    Assessment,
    Subject,
    Exam,
    ExamSchedule,
    TimetableSlot,
    Homework,
    Student,
    Employee,
    User,
)

router = APIRouter(tags=["Academics"])


@router.get("/attendance")
def list_attendance(
    campus_id: Optional[int] = None,
    on_date: Optional[date] = None,
    student_id: Optional[int] = None,
    limit: int = Query(100, le=500),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(AttendanceRecord)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(AttendanceRecord.campus_id == cid)
    if on_date:
        q = q.filter(AttendanceRecord.date == on_date)
    if student_id:
        q = q.filter(AttendanceRecord.student_id == student_id)
    rows = q.order_by(AttendanceRecord.date.desc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "student_id": r.student_id,
            "date": r.date.isoformat(),
            "status": r.status,
            "mode": r.mode,
            "check_in": r.check_in.isoformat() if r.check_in else None,
            "check_out": r.check_out.isoformat() if r.check_out else None,
            "remarks": r.remarks,
        }
        for r in rows
    ]


@router.get("/attendance/analytics")
def attendance_analytics(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(AttendanceRecord.status, func.count(AttendanceRecord.id))
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(AttendanceRecord.campus_id == cid)
    by_status = {s: c for s, c in q.group_by(AttendanceRecord.status).all()}
    mode_q = db.query(AttendanceRecord.mode, func.count(AttendanceRecord.id))
    if cid:
        mode_q = mode_q.filter(AttendanceRecord.campus_id == cid)
    by_mode = {m: c for m, c in mode_q.group_by(AttendanceRecord.mode).all()}
    return {"by_status": by_status, "by_mode": by_mode}


@router.get("/leaves")
def leaves(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = db.query(LeaveRequest).order_by(LeaveRequest.created_at.desc()).limit(50).all()
    return [
        {
            "id": l.id,
            "requester_type": l.requester_type,
            "requester_id": l.requester_id,
            "from_date": l.from_date.isoformat(),
            "to_date": l.to_date.isoformat(),
            "reason": l.reason,
            "status": l.status,
        }
        for l in rows
    ]


@router.get("/grades")
def grades(
    student_id: Optional[int] = None,
    grade: Optional[str] = "10",
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(GradeEntry, Assessment, Subject).join(Assessment).join(Subject)
    if student_id:
        q = q.filter(GradeEntry.student_id == student_id)
    if grade:
        q = q.filter(Assessment.grade == grade)
    rows = q.limit(200).all()
    return [
        {
            "student_id": ge.student_id,
            "assessment": a.name,
            "assessment_type": a.assessment_type,
            "subject": sub.name,
            "marks_obtained": ge.marks_obtained,
            "max_marks": a.max_marks,
            "weightage": a.weightage,
            "grade_letter": ge.grade_letter,
        }
        for ge, a, sub in rows
    ]


@router.get("/exams")
def exams(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(Exam)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(Exam.campus_id == cid)
    rows = q.order_by(Exam.start_date.desc()).all()
    result = []
    for e in rows:
        schedules = db.query(ExamSchedule).filter(ExamSchedule.exam_id == e.id).all()
        result.append(
            {
                "id": e.id,
                "name": e.name,
                "exam_type": e.exam_type,
                "start_date": e.start_date.isoformat(),
                "end_date": e.end_date.isoformat(),
                "status": e.status,
                "publish_results": e.publish_results,
                "schedules": [
                    {
                        "id": s.id,
                        "subject_id": s.subject_id,
                        "grade": s.grade,
                        "exam_date": s.exam_date.isoformat(),
                        "start_time": s.start_time.isoformat(),
                        "end_time": s.end_time.isoformat(),
                        "room": s.room,
                        "invigilator_id": s.invigilator_id,
                    }
                    for s in schedules
                ],
            }
        )
    return result


@router.get("/timetable")
def timetable(
    grade: str = "10",
    section: str = "A",
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(TimetableSlot, Subject, Employee).join(Subject).outerjoin(Employee, TimetableSlot.teacher_id == Employee.id)
    cid = campus_id or user.campus_id or 1
    q = q.filter(TimetableSlot.campus_id == cid, TimetableSlot.grade == grade, TimetableSlot.section == section)
    rows = q.order_by(TimetableSlot.day_of_week, TimetableSlot.period).all()
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return [
        {
            "day": days[slot.day_of_week],
            "day_of_week": slot.day_of_week,
            "period": slot.period,
            "start_time": slot.start_time.isoformat(),
            "end_time": slot.end_time.isoformat(),
            "subject": sub.name,
            "teacher": f"{emp.first_name} {emp.last_name}" if emp else None,
            "room": slot.room,
        }
        for slot, sub, emp in rows
    ]


@router.get("/homework")
def homework(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(Homework, Subject).join(Subject)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(Homework.campus_id == cid)
    rows = q.order_by(Homework.due_date).limit(50).all()
    return [
        {
            "id": h.id,
            "title": h.title,
            "description": h.description,
            "grade": h.grade,
            "section": h.section,
            "subject": sub.name,
            "due_date": h.due_date.isoformat(),
        }
        for h, sub in rows
    ]
