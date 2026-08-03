from datetime import datetime, date, time
from typing import Optional

from sqlalchemy import (
    String,
    Integer,
    Float,
    Boolean,
    DateTime,
    Date,
    Time,
    Text,
    ForeignKey,
    UniqueConstraint,
    JSON,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


class Organization(Base, TimestampMixin):
    __tablename__ = "organizations"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(200), default="MIA Solutions Pvt. Ltd.")
    legal_name: Mapped[str] = mapped_column(String(200), default="MIA Solutions Pvt. Ltd.")
    code: Mapped[str] = mapped_column(String(50), unique=True)
    logo_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    website: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    is_test_site: Mapped[bool] = mapped_column(Boolean, default=True)


class Campus(Base, TimestampMixin):
    __tablename__ = "campuses"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    organization_id: Mapped[int] = mapped_column(ForeignKey("organizations.id"))
    name: Mapped[str] = mapped_column(String(200))
    code: Mapped[str] = mapped_column(String(50), unique=True)
    city: Mapped[str] = mapped_column(String(100))
    state: Mapped[str] = mapped_column(String(100))
    address: Mapped[str] = mapped_column(Text)
    phone: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(120))
    curriculum: Mapped[str] = mapped_column(String(50), default="CBSE")
    capacity: Mapped[int] = mapped_column(Integer, default=2000)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class AcademicYear(Base, TimestampMixin):
    __tablename__ = "academic_years"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    name: Mapped[str] = mapped_column(String(50))
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)
    is_current: Mapped[bool] = mapped_column(Boolean, default=False)


class User(Base, TimestampMixin):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(200), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str] = mapped_column(String(200))
    role: Mapped[str] = mapped_column(String(50), index=True)
    campus_id: Mapped[Optional[int]] = mapped_column(ForeignKey("campuses.id"), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(30), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    avatar_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    last_login: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)


class AuditLog(Base, TimestampMixin):
    __tablename__ = "audit_logs"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)
    action: Mapped[str] = mapped_column(String(100))
    entity: Mapped[str] = mapped_column(String(100))
    entity_id: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    details: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    ip_address: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)


class Student(Base, TimestampMixin):
    __tablename__ = "students"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    student_id: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    academic_year_id: Mapped[int] = mapped_column(ForeignKey("academic_years.id"))
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    date_of_birth: Mapped[date] = mapped_column(Date)
    gender: Mapped[str] = mapped_column(String(20))
    blood_group: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(30), nullable=True)
    address: Mapped[str] = mapped_column(Text)
    grade: Mapped[str] = mapped_column(String(20))
    section: Mapped[str] = mapped_column(String(10))
    roll_number: Mapped[str] = mapped_column(String(20))
    admission_date: Mapped[date] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(30), default="active")
    transport_route_id: Mapped[Optional[int]] = mapped_column(ForeignKey("transport_routes.id"), nullable=True)
    hostel_room_id: Mapped[Optional[int]] = mapped_column(ForeignKey("hostel_rooms.id"), nullable=True)
    rfid_tag: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    medical_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    scholarship_code: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)


class Guardian(Base, TimestampMixin):
    __tablename__ = "guardians"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
    full_name: Mapped[str] = mapped_column(String(200))
    relation: Mapped[str] = mapped_column(String(50))
    phone: Mapped[str] = mapped_column(String(30))
    email: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    occupation: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=True)
    is_emergency_contact: Mapped[bool] = mapped_column(Boolean, default=False)
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)


class Employee(Base, TimestampMixin):
    __tablename__ = "employees"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    employee_id: Mapped[str] = mapped_column(String(50), unique=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    designation: Mapped[str] = mapped_column(String(100))
    department: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(200))
    phone: Mapped[str] = mapped_column(String(30))
    join_date: Mapped[date] = mapped_column(Date)
    employment_type: Mapped[str] = mapped_column(String(50), default="full_time")
    salary: Mapped[float] = mapped_column(Float, default=0)
    status: Mapped[str] = mapped_column(String(30), default="active")
    subjects: Mapped[Optional[list]] = mapped_column(JSON, nullable=True)


class AdmissionApplication(Base, TimestampMixin):
    __tablename__ = "admission_applications"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    application_no: Mapped[str] = mapped_column(String(50), unique=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    academic_year_id: Mapped[int] = mapped_column(ForeignKey("academic_years.id"))
    applicant_name: Mapped[str] = mapped_column(String(200))
    date_of_birth: Mapped[date] = mapped_column(Date)
    gender: Mapped[str] = mapped_column(String(20))
    applying_grade: Mapped[str] = mapped_column(String(20))
    parent_name: Mapped[str] = mapped_column(String(200))
    parent_phone: Mapped[str] = mapped_column(String(30))
    parent_email: Mapped[str] = mapped_column(String(200))
    previous_school: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="submitted")
    entrance_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    interview_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    merit_rank: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    interview_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    offer_letter_sent: Mapped[bool] = mapped_column(Boolean, default=False)
    fee_paid: Mapped[bool] = mapped_column(Boolean, default=False)
    documents: Mapped[Optional[list]] = mapped_column(JSON, nullable=True)


class AttendanceRecord(Base, TimestampMixin):
    __tablename__ = "attendance_records"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    date: Mapped[date] = mapped_column(Date, index=True)
    status: Mapped[str] = mapped_column(String(30))  # present, absent, late, early_exit, leave
    mode: Mapped[str] = mapped_column(String(30), default="classroom")  # rfid, biometric, qr, mobile, classroom, bus, hostel
    check_in: Mapped[Optional[time]] = mapped_column(Time, nullable=True)
    check_out: Mapped[Optional[time]] = mapped_column(Time, nullable=True)
    marked_by: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)
    remarks: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)


class LeaveRequest(Base, TimestampMixin):
    __tablename__ = "leave_requests"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    requester_type: Mapped[str] = mapped_column(String(30))  # student, employee
    requester_id: Mapped[int] = mapped_column(Integer)
    from_date: Mapped[date] = mapped_column(Date)
    to_date: Mapped[date] = mapped_column(Date)
    reason: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(30), default="pending")
    approved_by: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)


class Subject(Base, TimestampMixin):
    __tablename__ = "subjects"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    code: Mapped[str] = mapped_column(String(30))
    name: Mapped[str] = mapped_column(String(100))
    grade: Mapped[str] = mapped_column(String(20))
    credits: Mapped[float] = mapped_column(Float, default=1.0)


class Assessment(Base, TimestampMixin):
    __tablename__ = "assessments"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    academic_year_id: Mapped[int] = mapped_column(ForeignKey("academic_years.id"))
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"))
    name: Mapped[str] = mapped_column(String(100))
    assessment_type: Mapped[str] = mapped_column(String(50))
    max_marks: Mapped[float] = mapped_column(Float)
    weightage: Mapped[float] = mapped_column(Float, default=1.0)
    grade: Mapped[str] = mapped_column(String(20))
    section: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    scheduled_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)


class GradeEntry(Base, TimestampMixin):
    __tablename__ = "grade_entries"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    assessment_id: Mapped[int] = mapped_column(ForeignKey("assessments.id"))
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
    marks_obtained: Mapped[float] = mapped_column(Float)
    grade_letter: Mapped[Optional[str]] = mapped_column(String(5), nullable=True)
    remarks: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    moderated: Mapped[bool] = mapped_column(Boolean, default=False)
    __table_args__ = (UniqueConstraint("assessment_id", "student_id"),)


class Exam(Base, TimestampMixin):
    __tablename__ = "exams"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    academic_year_id: Mapped[int] = mapped_column(ForeignKey("academic_years.id"))
    name: Mapped[str] = mapped_column(String(150))
    exam_type: Mapped[str] = mapped_column(String(50))
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(30), default="scheduled")
    publish_results: Mapped[bool] = mapped_column(Boolean, default=False)


class ExamSchedule(Base, TimestampMixin):
    __tablename__ = "exam_schedules"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    exam_id: Mapped[int] = mapped_column(ForeignKey("exams.id"))
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"))
    grade: Mapped[str] = mapped_column(String(20))
    exam_date: Mapped[date] = mapped_column(Date)
    start_time: Mapped[time] = mapped_column(Time)
    end_time: Mapped[time] = mapped_column(Time)
    room: Mapped[str] = mapped_column(String(50))
    invigilator_id: Mapped[Optional[int]] = mapped_column(ForeignKey("employees.id"), nullable=True)


class TimetableSlot(Base, TimestampMixin):
    __tablename__ = "timetable_slots"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    academic_year_id: Mapped[int] = mapped_column(ForeignKey("academic_years.id"))
    grade: Mapped[str] = mapped_column(String(20))
    section: Mapped[str] = mapped_column(String(10))
    day_of_week: Mapped[int] = mapped_column(Integer)  # 0=Mon
    period: Mapped[int] = mapped_column(Integer)
    start_time: Mapped[time] = mapped_column(Time)
    end_time: Mapped[time] = mapped_column(Time)
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"))
    teacher_id: Mapped[Optional[int]] = mapped_column(ForeignKey("employees.id"), nullable=True)
    room: Mapped[str] = mapped_column(String(50))


class FeeStructure(Base, TimestampMixin):
    __tablename__ = "fee_structures"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    academic_year_id: Mapped[int] = mapped_column(ForeignKey("academic_years.id"))
    name: Mapped[str] = mapped_column(String(150))
    grade: Mapped[str] = mapped_column(String(20))
    total_amount: Mapped[float] = mapped_column(Float)
    installments: Mapped[int] = mapped_column(Integer, default=4)
    components: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)


class FeeInvoice(Base, TimestampMixin):
    __tablename__ = "fee_invoices"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    invoice_no: Mapped[str] = mapped_column(String(50), unique=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
    fee_structure_id: Mapped[int] = mapped_column(ForeignKey("fee_structures.id"))
    amount: Mapped[float] = mapped_column(Float)
    discount: Mapped[float] = mapped_column(Float, default=0)
    late_fee: Mapped[float] = mapped_column(Float, default=0)
    net_amount: Mapped[float] = mapped_column(Float)
    due_date: Mapped[date] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(30), default="pending")
    paid_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    payment_mode: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    receipt_no: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)


class TransportRoute(Base, TimestampMixin):
    __tablename__ = "transport_routes"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    route_code: Mapped[str] = mapped_column(String(30))
    name: Mapped[str] = mapped_column(String(150))
    vehicle_no: Mapped[str] = mapped_column(String(30))
    driver_name: Mapped[str] = mapped_column(String(100))
    driver_phone: Mapped[str] = mapped_column(String(30))
    capacity: Mapped[int] = mapped_column(Integer, default=40)
    stops: Mapped[Optional[list]] = mapped_column(JSON, nullable=True)


class HostelBlock(Base, TimestampMixin):
    __tablename__ = "hostel_blocks"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    name: Mapped[str] = mapped_column(String(100))
    gender: Mapped[str] = mapped_column(String(20))
    warden_name: Mapped[str] = mapped_column(String(100))


class HostelRoom(Base, TimestampMixin):
    __tablename__ = "hostel_rooms"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    block_id: Mapped[int] = mapped_column(ForeignKey("hostel_blocks.id"))
    room_no: Mapped[str] = mapped_column(String(20))
    capacity: Mapped[int] = mapped_column(Integer, default=4)
    occupied: Mapped[int] = mapped_column(Integer, default=0)


class LibraryBook(Base, TimestampMixin):
    __tablename__ = "library_books"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    isbn: Mapped[str] = mapped_column(String(30))
    title: Mapped[str] = mapped_column(String(255))
    author: Mapped[str] = mapped_column(String(150))
    category: Mapped[str] = mapped_column(String(100))
    copies: Mapped[int] = mapped_column(Integer, default=1)
    available: Mapped[int] = mapped_column(Integer, default=1)
    rfid_tag: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)


class LibraryIssue(Base, TimestampMixin):
    __tablename__ = "library_issues"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("library_books.id"))
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
    issued_at: Mapped[date] = mapped_column(Date)
    due_date: Mapped[date] = mapped_column(Date)
    returned_at: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    fine: Mapped[float] = mapped_column(Float, default=0)
    status: Mapped[str] = mapped_column(String(30), default="issued")


class InventoryItem(Base, TimestampMixin):
    __tablename__ = "inventory_items"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    sku: Mapped[str] = mapped_column(String(50))
    name: Mapped[str] = mapped_column(String(150))
    category: Mapped[str] = mapped_column(String(100))
    quantity: Mapped[int] = mapped_column(Integer)
    unit: Mapped[str] = mapped_column(String(30))
    reorder_level: Mapped[int] = mapped_column(Integer, default=10)


class Notification(Base, TimestampMixin):
    __tablename__ = "notifications"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    title: Mapped[str] = mapped_column(String(200))
    body: Mapped[str] = mapped_column(Text)
    channel: Mapped[str] = mapped_column(String(30), default="in_app")
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    link: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)


class Circular(Base, TimestampMixin):
    __tablename__ = "circulars"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    title: Mapped[str] = mapped_column(String(200))
    body: Mapped[str] = mapped_column(Text)
    audience: Mapped[str] = mapped_column(String(50), default="all")
    published_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    created_by: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)


class Homework(Base, TimestampMixin):
    __tablename__ = "homework"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    teacher_id: Mapped[int] = mapped_column(ForeignKey("employees.id"))
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"))
    grade: Mapped[str] = mapped_column(String(20))
    section: Mapped[str] = mapped_column(String(10))
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text)
    due_date: Mapped[date] = mapped_column(Date)


class Complaint(Base, TimestampMixin):
    __tablename__ = "complaints"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    raised_by: Mapped[int] = mapped_column(ForeignKey("users.id"))
    category: Mapped[str] = mapped_column(String(50))
    subject: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(30), default="open")
    priority: Mapped[str] = mapped_column(String(20), default="medium")


class PayrollRun(Base, TimestampMixin):
    __tablename__ = "payroll_runs"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    campus_id: Mapped[int] = mapped_column(ForeignKey("campuses.id"))
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"))
    month: Mapped[str] = mapped_column(String(7))
    gross: Mapped[float] = mapped_column(Float)
    deductions: Mapped[float] = mapped_column(Float)
    net: Mapped[float] = mapped_column(Float)
    status: Mapped[str] = mapped_column(String(30), default="processed")


class WorkflowApproval(Base, TimestampMixin):
    __tablename__ = "workflow_approvals"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    module: Mapped[str] = mapped_column(String(50))
    entity_id: Mapped[int] = mapped_column(Integer)
    step: Mapped[str] = mapped_column(String(100))
    status: Mapped[str] = mapped_column(String(30), default="pending")
    requested_by: Mapped[int] = mapped_column(ForeignKey("users.id"))
    assigned_to: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)
    comments: Mapped[Optional[str]] = mapped_column(Text, nullable=True)


class ChatMessage(Base, TimestampMixin):
    __tablename__ = "chat_messages"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    session_id: Mapped[str] = mapped_column(String(100), index=True)
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)
    role: Mapped[str] = mapped_column(String(20))
    content: Mapped[str] = mapped_column(Text)
