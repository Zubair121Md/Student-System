from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.entities import (
    FeeInvoice,
    FeeStructure,
    Student,
    TransportRoute,
    HostelBlock,
    HostelRoom,
    LibraryBook,
    LibraryIssue,
    InventoryItem,
    Employee,
    PayrollRun,
    Complaint,
    User,
)

router = APIRouter(tags=["Operations & Finance"])


@router.get("/fees/structures")
def fee_structures(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(FeeStructure)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(FeeStructure.campus_id == cid)
    return [
        {
            "id": f.id,
            "name": f.name,
            "grade": f.grade,
            "total_amount": f.total_amount,
            "installments": f.installments,
            "components": f.components,
            "campus_id": f.campus_id,
        }
        for f in q.all()
    ]


@router.get("/fees/invoices")
def fee_invoices(
    campus_id: Optional[int] = None,
    status: Optional[str] = None,
    limit: int = Query(100, le=300),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(FeeInvoice, Student).join(Student)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(Student.campus_id == cid)
    if status:
        q = q.filter(FeeInvoice.status == status)
    rows = q.order_by(FeeInvoice.due_date.desc()).limit(limit).all()
    return [
        {
            "id": inv.id,
            "invoice_no": inv.invoice_no,
            "student_id": st.student_id,
            "student_name": f"{st.first_name} {st.last_name}",
            "grade": st.grade,
            "amount": inv.amount,
            "discount": inv.discount,
            "late_fee": inv.late_fee,
            "net_amount": inv.net_amount,
            "due_date": inv.due_date.isoformat(),
            "status": inv.status,
            "payment_mode": inv.payment_mode,
            "receipt_no": inv.receipt_no,
        }
        for inv, st in rows
    ]


@router.get("/transport/routes")
def transport_routes(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(TransportRoute)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(TransportRoute.campus_id == cid)
    return [
        {
            "id": r.id,
            "route_code": r.route_code,
            "name": r.name,
            "vehicle_no": r.vehicle_no,
            "driver_name": r.driver_name,
            "driver_phone": r.driver_phone,
            "capacity": r.capacity,
            "stops": r.stops,
        }
        for r in q.all()
    ]


@router.get("/hostel")
def hostel(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    cid = campus_id or user.campus_id or 1
    blocks = db.query(HostelBlock).filter(HostelBlock.campus_id == cid).all()
    result = []
    for b in blocks:
        rooms = db.query(HostelRoom).filter(HostelRoom.block_id == b.id).all()
        result.append(
            {
                "id": b.id,
                "name": b.name,
                "gender": b.gender,
                "warden_name": b.warden_name,
                "rooms": [
                    {
                        "id": r.id,
                        "room_no": r.room_no,
                        "capacity": r.capacity,
                        "occupied": r.occupied,
                    }
                    for r in rooms
                ],
            }
        )
    return result


@router.get("/library/books")
def library_books(
    campus_id: Optional[int] = None,
    q: Optional[str] = None,
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    query = db.query(LibraryBook)
    cid = campus_id or user.campus_id
    if cid:
        query = query.filter(LibraryBook.campus_id == cid)
    if q:
        like = f"%{q}%"
        query = query.filter((LibraryBook.title.ilike(like)) | (LibraryBook.author.ilike(like)))
    return [
        {
            "id": b.id,
            "isbn": b.isbn,
            "title": b.title,
            "author": b.author,
            "category": b.category,
            "copies": b.copies,
            "available": b.available,
            "rfid_tag": b.rfid_tag,
        }
        for b in query.limit(limit).all()
    ]


@router.get("/library/issues")
def library_issues(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(LibraryIssue, LibraryBook, Student).join(LibraryBook).join(Student)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(LibraryBook.campus_id == cid)
    rows = q.order_by(LibraryIssue.issued_at.desc()).limit(50).all()
    return [
        {
            "id": i.id,
            "book": b.title,
            "student": f"{s.first_name} {s.last_name}",
            "issued_at": i.issued_at.isoformat(),
            "due_date": i.due_date.isoformat(),
            "status": i.status,
            "fine": i.fine,
        }
        for i, b, s in rows
    ]


@router.get("/inventory")
def inventory(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(InventoryItem)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(InventoryItem.campus_id == cid)
    return [
        {
            "id": i.id,
            "sku": i.sku,
            "name": i.name,
            "category": i.category,
            "quantity": i.quantity,
            "unit": i.unit,
            "reorder_level": i.reorder_level,
            "low_stock": i.quantity <= i.reorder_level,
        }
        for i in q.all()
    ]


@router.get("/hr/employees")
def employees(
    campus_id: Optional[int] = None,
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(Employee)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(Employee.campus_id == cid)
    return [
        {
            "id": e.id,
            "employee_id": e.employee_id,
            "full_name": f"{e.first_name} {e.last_name}",
            "designation": e.designation,
            "department": e.department,
            "email": e.email,
            "phone": e.phone,
            "join_date": e.join_date.isoformat(),
            "status": e.status,
            "subjects": e.subjects,
        }
        for e in q.limit(limit).all()
    ]


@router.get("/hr/payroll")
def payroll(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(PayrollRun, Employee).join(Employee)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(PayrollRun.campus_id == cid)
    return [
        {
            "id": p.id,
            "employee": f"{e.first_name} {e.last_name}",
            "employee_id": e.employee_id,
            "month": p.month,
            "gross": p.gross,
            "deductions": p.deductions,
            "net": p.net,
            "status": p.status,
        }
        for p, e in q.all()
    ]


@router.get("/complaints")
def complaints(
    campus_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = db.query(Complaint)
    cid = campus_id or user.campus_id
    if cid:
        q = q.filter(Complaint.campus_id == cid)
    return [
        {
            "id": c.id,
            "category": c.category,
            "subject": c.subject,
            "description": c.description,
            "status": c.status,
            "priority": c.priority,
            "created_at": c.created_at.isoformat(),
        }
        for c in q.order_by(Complaint.created_at.desc()).all()
    ]
