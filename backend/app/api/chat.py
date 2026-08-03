import uuid
from typing import Optional

import httpx
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.entities import ChatMessage, User, Student, FeeInvoice, AdmissionApplication, Campus

router = APIRouter(prefix="/chat", tags=["AI Chatbot"])
settings = get_settings()


class ChatIn(BaseModel):
    message: str
    session_id: Optional[str] = None


def build_context(db: Session, user: User) -> str:
    campuses = db.query(Campus).count()
    students = db.query(Student).count()
    pending_fees = (
        db.query(FeeInvoice).filter(FeeInvoice.status.in_(["pending", "overdue", "partial"])).count()
    )
    admissions = db.query(AdmissionApplication).count()
    return (
        f"You are MIA Assist, the AI helper for MIA Campus by MIA Solutions Pvt. Ltd. "
        f"This is a test site with sample data. "
        f"Current snapshot: {campuses} campuses, {students} students, "
        f"{admissions} admission applications, {pending_fees} fee invoices pending. "
        f"Logged-in user: {user.full_name} ({user.role}). "
        f"Help with navigation, admissions, attendance, fees, exams, timetable, "
        f"transport, hostel, library, HR, and reports. "
        f"Be concise and practical. Never claim this is a production school chain."
    )


def rule_based_reply(message: str, user: User) -> str:
    m = message.lower()
    if any(w in m for w in ["fee", "payment", "invoice", "receipt"]):
        return (
            "Fee invoices are under Finance → Fees. You can filter by pending, overdue, or paid. "
            "Parents can view dues on the Parent Portal. Demo accountant: accounts.hyd@miasolutions.test"
        )
    if any(w in m for w in ["attend", "absent", "present", "rfid"]):
        return (
            "Attendance supports classroom, RFID, biometric, QR, mobile, bus, and hostel modes. "
            "Open Academics → Attendance for daily records and analytics."
        )
    if any(w in m for w in ["admission", "enroll", "merit", "application"]):
        return (
            "Admissions workflow: Application → Verification → Assessment → Approval → Fee Payment → Enrollment. "
            "See Admissions for the dashboard, merit ranks, and interview schedules."
        )
    if any(w in m for w in ["exam", "result", "grade", "report card"]):
        return (
            "Grading supports continuous assessment, mid-terms, finals, and weighted formulas "
            "(e.g. 40% internal + 60% final). Check Academics → Grades and Examinations."
        )
    if any(w in m for w in ["timetable", "schedule", "period"]):
        return "Open Academics → Timetable for class schedules, rooms, and teacher allocation (demo: Grade 10-A)."
    if any(w in m for w in ["transport", "bus", "route"]):
        return "Transport routes, vehicles, and drivers are under Operations → Transport."
    if any(w in m for w in ["hostel", "room", "warden"]):
        return "Hostel blocks and room occupancy are under Operations → Hostel."
    if any(w in m for w in ["library", "book"]):
        return "Library catalog and issues are under Operations → Library."
    if any(w in m for w in ["hr", "payroll", "employee", "salary"]):
        return "Employee records and payroll runs are under People → HR & Payroll."
    if any(w in m for w in ["help", "module", "navigate", "where"]):
        return (
            "Modules: Dashboard, Admissions, Students, Attendance, Grades, Exams, Timetable, "
            "Fees, Transport, Hostel, Library, Inventory, HR, Analytics, and Settings. "
            "You are signed in as "
            f"{user.full_name} ({user.role}). This is a test site by MIA Solutions Pvt. Ltd."
        )
    if any(w in m for w in ["mia", "company", "who built", "solutions"]):
        return "MIA Campus is built and operated for demos by MIA Solutions Pvt. Ltd. This environment uses sample/test data only."
    return (
        "I can help with admissions, students, attendance, grades, exams, fees, transport, hostel, "
        "library, inventory, and HR. Ask about a module or say “help”. "
        "— MIA Assist · MIA Solutions Pvt. Ltd. (test site)"
    )


@router.post("")
async def chat(body: ChatIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    session_id = body.session_id or str(uuid.uuid4())
    db.add(ChatMessage(session_id=session_id, user_id=user.id, role="user", content=body.message))
    db.commit()

    reply = None
    if settings.OPENAI_API_KEY:
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                resp = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={"Authorization": f"Bearer {settings.OPENAI_API_KEY}"},
                    json={
                        "model": settings.CHATBOT_MODEL,
                        "messages": [
                            {"role": "system", "content": build_context(db, user)},
                            {"role": "user", "content": body.message},
                        ],
                        "temperature": 0.4,
                    },
                )
                if resp.status_code == 200:
                    reply = resp.json()["choices"][0]["message"]["content"]
        except Exception:
            reply = None

    if not reply:
        reply = rule_based_reply(body.message, user)

    db.add(ChatMessage(session_id=session_id, user_id=user.id, role="assistant", content=reply))
    db.commit()
    return {
        "session_id": session_id,
        "reply": reply,
        "assistant": "MIA Assist",
        "company": "MIA Solutions Pvt. Ltd.",
    }
