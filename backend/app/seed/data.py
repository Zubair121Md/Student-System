"""
Seed script for MIA Campus test site — rich fake data for demos.
Powered by MIA Solutions Pvt. Ltd.
"""
from __future__ import annotations

import random
from datetime import datetime, date, time, timedelta

from faker import Faker
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.entities import (
    Organization,
    Campus,
    AcademicYear,
    User,
    Student,
    Guardian,
    Employee,
    AdmissionApplication,
    AttendanceRecord,
    LeaveRequest,
    Subject,
    Assessment,
    GradeEntry,
    Exam,
    ExamSchedule,
    TimetableSlot,
    FeeStructure,
    FeeInvoice,
    TransportRoute,
    HostelBlock,
    HostelRoom,
    LibraryBook,
    LibraryIssue,
    InventoryItem,
    Notification,
    Circular,
    Homework,
    Complaint,
    PayrollRun,
    WorkflowApproval,
    AuditLog,
)

fake = Faker("en_IN")
Faker.seed(42)
random.seed(42)

GRADES = [str(i) for i in range(1, 13)]
SECTIONS = ["A", "B", "C", "D"]
SUBJECT_NAMES = [
    ("ENG", "English"),
    ("MAT", "Mathematics"),
    ("SCI", "Science"),
    ("SST", "Social Studies"),
    ("HIN", "Hindi"),
    ("PHY", "Physics"),
    ("CHE", "Chemistry"),
    ("BIO", "Biology"),
    ("CSC", "Computer Science"),
    ("PE", "Physical Education"),
]
CITIES = [
    ("Hyderabad", "Telangana"),
    ("Bengaluru", "Karnataka"),
    ("Chennai", "Tamil Nadu"),
    ("Pune", "Maharashtra"),
    ("Delhi", "Delhi"),
    ("Mumbai", "Maharashtra"),
    ("Kolkata", "West Bengal"),
    ("Ahmedabad", "Gujarat"),
    ("Jaipur", "Rajasthan"),
    ("Lucknow", "Uttar Pradesh"),
    ("Visakhapatnam", "Andhra Pradesh"),
    ("Coimbatore", "Tamil Nadu"),
]
CURRICULA = ["CBSE", "ICSE", "IB", "State Board"]
ROLES = [
    "super_admin",
    "branch_admin",
    "principal",
    "teacher",
    "parent",
    "student",
    "accountant",
    "hr",
]


def seed_database(db: Session) -> dict:
    if db.query(Organization).first():
        return {"status": "already_seeded"}

    org = Organization(
        name="MIA Campus",
        legal_name="MIA Solutions Pvt. Ltd.",
        code="MIA",
        website="https://miasolutions.example",
        is_test_site=True,
    )
    db.add(org)
    db.flush()

    campuses: list[Campus] = []
    for i, (city, state) in enumerate(CITIES, start=1):
        campus = Campus(
            organization_id=org.id,
            name=f"MIA Campus — {city}",
            code=f"MIA-{city[:3].upper()}-{i:02d}",
            city=city,
            state=state,
            address=fake.address().replace("\n", ", "),
            phone=fake.phone_number(),
            email=f"campus.{city.lower().replace(' ', '')}@miasolutions.test",
            curriculum=CURRICULA[(i - 1) % len(CURRICULA)],
            capacity=random.randint(1500, 3500),
        )
        db.add(campus)
        campuses.append(campus)
    db.flush()

    years: dict[int, AcademicYear] = {}
    for campus in campuses:
        year = AcademicYear(
            campus_id=campus.id,
            name="2025-26",
            start_date=date(2025, 4, 1),
            end_date=date(2026, 3, 31),
            is_current=True,
        )
        db.add(year)
        years[campus.id] = year
    db.flush()

    password = hash_password("Test@1234")
    users: list[User] = []

    demo_users = [
        ("admin@miasolutions.test", "Super Admin", "super_admin", None),
        ("principal.hyd@miasolutions.test", "Priya Sharma", "principal", campuses[0].id),
        ("teacher.hyd@miasolutions.test", "Rahul Mehta", "teacher", campuses[0].id),
        ("parent.demo@miasolutions.test", "Ananya Reddy", "parent", campuses[0].id),
        ("student.demo@miasolutions.test", "Arjun Reddy", "student", campuses[0].id),
        ("accounts.hyd@miasolutions.test", "Suresh Iyer", "accountant", campuses[0].id),
        ("hr.hyd@miasolutions.test", "Meera Nair", "hr", campuses[0].id),
        ("branch.blr@miasolutions.test", "Branch Admin Bengaluru", "branch_admin", campuses[1].id),
    ]
    for email, name, role, campus_id in demo_users:
        u = User(
            email=email,
            password_hash=password,
            full_name=name,
            role=role,
            campus_id=campus_id,
            phone=fake.phone_number(),
            is_active=True,
        )
        db.add(u)
        users.append(u)
    db.flush()

    # Transport & hostel first (FK targets for students)
    routes: list[TransportRoute] = []
    rooms: list[HostelRoom] = []
    for campus in campuses:
        for r in range(1, 5):
            route = TransportRoute(
                campus_id=campus.id,
                route_code=f"R{r}",
                name=f"Route {r} — {campus.city}",
                vehicle_no=f"TS{random.randint(10,99)} AB {random.randint(1000,9999)}",
                driver_name=fake.name(),
                driver_phone=fake.phone_number(),
                capacity=40,
                stops=[fake.street_name() for _ in range(6)],
            )
            db.add(route)
            routes.append(route)

        for gender, block_name in [("male", "Boys Block"), ("female", "Girls Block")]:
            block = HostelBlock(
                campus_id=campus.id,
                name=f"{block_name} {campus.code}",
                gender=gender,
                warden_name=fake.name(),
            )
            db.add(block)
            db.flush()
            for rn in range(1, 9):
                room = HostelRoom(
                    block_id=block.id,
                    room_no=f"{block_name[0]}{rn:02d}",
                    capacity=4,
                    occupied=random.randint(0, 4),
                )
                db.add(room)
                rooms.append(room)
    db.flush()

    # Employees / teachers
    employees: list[Employee] = []
    for campus in campuses:
        for i in range(12):
            first, last = fake.first_name(), fake.last_name()
            emp = Employee(
                employee_id=f"EMP-{campus.code}-{i+1:03d}",
                campus_id=campus.id,
                first_name=first,
                last_name=last,
                designation=random.choice(["Teacher", "Senior Teacher", "HOD", "Coordinator"]),
                department=random.choice(["Academics", "Science", "Commerce", "Arts", "Sports"]),
                email=f"{first.lower()}.{last.lower()}@{campus.code.lower()}.test",
                phone=fake.phone_number(),
                join_date=fake.date_between(start_date="-8y", end_date="-1y"),
                salary=random.randint(35000, 95000),
                subjects=[s[1] for s in random.sample(SUBJECT_NAMES, 2)],
            )
            db.add(emp)
            employees.append(emp)
    db.flush()

    # Link demo teacher
    teacher_user = next(u for u in users if u.role == "teacher")
    employees[0].user_id = teacher_user.id
    employees[0].email = teacher_user.email
    employees[0].first_name = "Rahul"
    employees[0].last_name = "Mehta"

    # Subjects
    subjects: list[Subject] = []
    for campus in campuses:
        for grade in GRADES:
            for code, name in SUBJECT_NAMES[:6 if int(grade) < 9 else 10]:
                sub = Subject(
                    campus_id=campus.id,
                    code=f"{code}-{grade}",
                    name=name,
                    grade=grade,
                    credits=1.0 if name != "Physical Education" else 0.5,
                )
                db.add(sub)
                subjects.append(sub)
    db.flush()

    # Students
    students: list[Student] = []
    campus_routes = {c.id: [r for r in routes if r.campus_id == c.id] for c in campuses}
    campus_rooms = {
        c.id: [rm for rm in rooms if db.get(HostelBlock, rm.block_id) and db.get(HostelBlock, rm.block_id).campus_id == c.id]
        for c in campuses
    }
    # Rebuild campus_rooms properly
    campus_rooms = {}
    blocks_by_campus = {}
    for campus in campuses:
        blocks = db.query(HostelBlock).filter(HostelBlock.campus_id == campus.id).all()
        campus_rooms[campus.id] = (
            db.query(HostelRoom)
            .filter(HostelRoom.block_id.in_([b.id for b in blocks]))
            .all()
        )

    sid = 1000
    for campus in campuses:
        year = years[campus.id]
        # More students on first campuses for demo richness
        count = 80 if campus.id <= 3 else 40
        for i in range(count):
            sid += 1
            grade = random.choice(GRADES)
            section = random.choice(SECTIONS)
            first, last = fake.first_name(), fake.last_name()
            st = Student(
                student_id=f"STU-{campus.code}-{sid}",
                campus_id=campus.id,
                academic_year_id=year.id,
                first_name=first,
                last_name=last,
                date_of_birth=fake.date_of_birth(minimum_age=5, maximum_age=18),
                gender=random.choice(["male", "female"]),
                blood_group=random.choice(["A+", "B+", "O+", "AB+", "A-", "B-", "O-"]),
                email=f"stu.{sid}@miasolutions.test",
                phone=fake.phone_number(),
                address=fake.address().replace("\n", ", "),
                grade=grade,
                section=section,
                roll_number=f"{grade}{section}{i+1:02d}",
                admission_date=fake.date_between(start_date="-5y", end_date="-30d"),
                status="active",
                transport_route_id=random.choice(campus_routes[campus.id]).id if random.random() > 0.3 else None,
                hostel_room_id=random.choice(campus_rooms[campus.id]).id if random.random() > 0.75 else None,
                rfid_tag=f"RFID{sid:06d}",
                medical_notes=random.choice([None, "Asthma", "Allergy — peanuts", None, None]),
                scholarship_code=random.choice([None, None, "MERIT25", "NEED15", None]),
            )
            db.add(st)
            students.append(st)
    db.flush()

    # Demo student link
    demo_student = students[0]
    demo_student.first_name = "Arjun"
    demo_student.last_name = "Reddy"
    demo_student.email = "student.demo@miasolutions.test"
    demo_student.grade = "10"
    demo_student.section = "A"
    demo_student.campus_id = campuses[0].id
    student_user = next(u for u in users if u.role == "student")
    demo_student.user_id = student_user.id

    parent_user = next(u for u in users if u.role == "parent")
    for st in students:
        g = Guardian(
            student_id=st.id,
            full_name=fake.name() if st.id != demo_student.id else "Ananya Reddy",
            relation=random.choice(["Father", "Mother", "Guardian"]),
            phone=fake.phone_number(),
            email=parent_user.email if st.id == demo_student.id else fake.email(),
            occupation=fake.job(),
            is_primary=True,
            is_emergency_contact=True,
            user_id=parent_user.id if st.id == demo_student.id else None,
        )
        db.add(g)
        if random.random() > 0.6:
            db.add(
                Guardian(
                    student_id=st.id,
                    full_name=fake.name(),
                    relation="Mother" if g.relation == "Father" else "Father",
                    phone=fake.phone_number(),
                    email=fake.email(),
                    is_primary=False,
                    is_emergency_contact=True,
                )
            )
    db.flush()

    # Admissions
    statuses = ["submitted", "verification", "assessment", "interview", "approved", "enrolled", "waitlisted", "rejected"]
    for campus in campuses:
        year = years[campus.id]
        for i in range(25):
            app = AdmissionApplication(
                application_no=f"APP-{campus.code}-{2026}{i+1:04d}",
                campus_id=campus.id,
                academic_year_id=year.id,
                applicant_name=fake.name(),
                date_of_birth=fake.date_of_birth(minimum_age=4, maximum_age=16),
                gender=random.choice(["male", "female"]),
                applying_grade=random.choice(GRADES),
                parent_name=fake.name(),
                parent_phone=fake.phone_number(),
                parent_email=fake.email(),
                previous_school=fake.company() + " School",
                status=random.choice(statuses),
                entrance_score=round(random.uniform(40, 98), 1),
                interview_score=round(random.uniform(50, 95), 1) if random.random() > 0.3 else None,
                merit_rank=i + 1 if random.random() > 0.4 else None,
                interview_at=datetime.utcnow() + timedelta(days=random.randint(1, 20)) if random.random() > 0.5 else None,
                offer_letter_sent=random.random() > 0.6,
                fee_paid=random.random() > 0.7,
                documents=["birth_certificate", "previous_marksheet", "photo"],
            )
            db.add(app)
    db.flush()

    # Attendance last 14 days for first campus students
    today = date.today()
    hyd_students = [s for s in students if s.campus_id == campuses[0].id][:60]
    teacher = next(u for u in users if u.role == "teacher")
    for st in hyd_students:
        for d in range(14):
            day = today - timedelta(days=d)
            if day.weekday() >= 5:
                continue
            status = random.choices(
                ["present", "absent", "late", "leave"],
                weights=[85, 6, 6, 3],
            )[0]
            db.add(
                AttendanceRecord(
                    student_id=st.id,
                    campus_id=st.campus_id,
                    date=day,
                    status=status,
                    mode=random.choice(["classroom", "rfid", "biometric", "qr", "mobile"]),
                    check_in=time(8, random.randint(0, 40)) if status != "absent" else None,
                    check_out=time(14, random.randint(0, 30)) if status != "absent" else None,
                    marked_by=teacher.id,
                )
            )

    # Leave requests
    for st in hyd_students[:10]:
        db.add(
            LeaveRequest(
                requester_type="student",
                requester_id=st.id,
                from_date=today + timedelta(days=random.randint(1, 10)),
                to_date=today + timedelta(days=random.randint(11, 15)),
                reason=random.choice(["Family function", "Medical", "Travel"]),
                status=random.choice(["pending", "approved", "rejected"]),
            )
        )

    # Assessments & grades
    hyd_subjects = [s for s in subjects if s.campus_id == campuses[0].id and s.grade == "10"][:5]
    assessments: list[Assessment] = []
    for sub in hyd_subjects:
        for atype, name, weight in [
            ("continuous", "Unit Test 1", 0.2),
            ("mid_term", "Mid Term", 0.3),
            ("assignment", "Assignment", 0.1),
            ("final", "Final Exam", 0.4),
        ]:
            a = Assessment(
                campus_id=campuses[0].id,
                academic_year_id=years[campuses[0].id].id,
                subject_id=sub.id,
                name=f"{sub.name} — {name}",
                assessment_type=atype,
                max_marks=100,
                weightage=weight,
                grade="10",
                section="A",
                scheduled_at=datetime.utcnow() - timedelta(days=random.randint(5, 60)),
            )
            db.add(a)
            assessments.append(a)
    db.flush()

    grade10 = [s for s in students if s.campus_id == campuses[0].id and s.grade == "10"][:30]
    for a in assessments:
        for st in grade10:
            marks = round(random.uniform(45, 98), 1)
            letter = (
                "A+" if marks >= 90 else "A" if marks >= 80 else "B" if marks >= 70 else "C" if marks >= 60 else "D"
            )
            db.add(
                GradeEntry(
                    assessment_id=a.id,
                    student_id=st.id,
                    marks_obtained=marks,
                    grade_letter=letter,
                )
            )

    # Exams
    for campus in campuses[:4]:
        exam = Exam(
            campus_id=campus.id,
            academic_year_id=years[campus.id].id,
            name=f"Term 1 Examinations {campus.city}",
            exam_type="mid_term",
            start_date=today + timedelta(days=20),
            end_date=today + timedelta(days=30),
            status="scheduled",
        )
        db.add(exam)
        db.flush()
        camp_subs = [s for s in subjects if s.campus_id == campus.id and s.grade == "10"][:5]
        camp_emps = [e for e in employees if e.campus_id == campus.id]
        for idx, sub in enumerate(camp_subs):
            db.add(
                ExamSchedule(
                    exam_id=exam.id,
                    subject_id=sub.id,
                    grade="10",
                    exam_date=today + timedelta(days=20 + idx),
                    start_time=time(9, 0),
                    end_time=time(12, 0),
                    room=f"Hall-{idx+1}",
                    invigilator_id=camp_emps[idx % len(camp_emps)].id if camp_emps else None,
                )
            )

    # Timetable
    periods = [
        (1, time(8, 0), time(8, 45)),
        (2, time(8, 50), time(9, 35)),
        (3, time(9, 40), time(10, 25)),
        (4, time(10, 45), time(11, 30)),
        (5, time(11, 35), time(12, 20)),
        (6, time(13, 0), time(13, 45)),
    ]
    hyd_subs_tt = [s for s in subjects if s.campus_id == campuses[0].id and s.grade == "10"]
    hyd_teachers = [e for e in employees if e.campus_id == campuses[0].id]
    for day in range(5):
        for period, st_t, en_t in periods:
            sub = hyd_subs_tt[period % len(hyd_subs_tt)]
            db.add(
                TimetableSlot(
                    campus_id=campuses[0].id,
                    academic_year_id=years[campuses[0].id].id,
                    grade="10",
                    section="A",
                    day_of_week=day,
                    period=period,
                    start_time=st_t,
                    end_time=en_t,
                    subject_id=sub.id,
                    teacher_id=hyd_teachers[period % len(hyd_teachers)].id,
                    room=f"R-{100+period}",
                )
            )

    # Fees
    for campus in campuses:
        for grade in ["8", "9", "10", "11", "12"]:
            fs = FeeStructure(
                campus_id=campus.id,
                academic_year_id=years[campus.id].id,
                name=f"Grade {grade} Annual Fee",
                grade=grade,
                total_amount=random.choice([65000, 75000, 85000, 95000]),
                installments=4,
                components={
                    "tuition": 50000,
                    "lab": 8000,
                    "library": 3000,
                    "transport_optional": 12000,
                    "gst": 0,
                },
            )
            db.add(fs)
    db.flush()

    fee_structs = db.query(FeeStructure).all()
    for st in students[:200]:
        matching = [f for f in fee_structs if f.campus_id == st.campus_id and f.grade == st.grade]
        if not matching:
            matching = [f for f in fee_structs if f.campus_id == st.campus_id]
        if not matching:
            continue
        fs = matching[0]
        status = random.choices(["paid", "pending", "overdue", "partial"], weights=[50, 25, 15, 10])[0]
        amount = fs.total_amount / fs.installments
        discount = 5000 if st.scholarship_code else 0
        late = 500 if status == "overdue" else 0
        inv = FeeInvoice(
            invoice_no=f"INV-{st.student_id}-01",
            student_id=st.id,
            fee_structure_id=fs.id,
            amount=amount,
            discount=discount,
            late_fee=late,
            net_amount=amount - discount + late,
            due_date=today - timedelta(days=random.randint(-20, 40)),
            status=status,
            paid_at=datetime.utcnow() - timedelta(days=5) if status == "paid" else None,
            payment_mode="upi" if status == "paid" else None,
            receipt_no=f"RCP-{st.id:06d}" if status == "paid" else None,
        )
        db.add(inv)

    # Library
    books: list[LibraryBook] = []
    for campus in campuses:
        for i in range(30):
            b = LibraryBook(
                campus_id=campus.id,
                isbn=fake.isbn13(),
                title=fake.catch_phrase() + " " + random.choice(["Vol I", "Basics", "Advanced", ""]),
                author=fake.name(),
                category=random.choice(["Science", "Fiction", "History", "Math", "Reference"]),
                copies=random.randint(2, 8),
                available=random.randint(0, 5),
                rfid_tag=f"LIB{campus.id}{i:04d}",
            )
            # fix title accidental tuple from trailing comma - wait I have a bug
            books.append(b)
            db.add(b)
    db.flush()

    for st in hyd_students[:15]:
        book = random.choice([b for b in books if b.campus_id == campuses[0].id])
        db.add(
            LibraryIssue(
                book_id=book.id,
                student_id=st.id,
                issued_at=today - timedelta(days=random.randint(1, 20)),
                due_date=today + timedelta(days=random.randint(1, 14)),
                status=random.choice(["issued", "returned", "overdue"]),
                fine=random.choice([0, 0, 50, 100]),
            )
        )

    # Inventory
    for campus in campuses:
        for name, cat in [
            ("Lab Microscope", "Lab Equipment"),
            ("Class 10 Uniform Set", "Uniforms"),
            ("A4 Notebook Pack", "Stationery"),
            ("Projector", "AV"),
            ("Football", "Sports"),
        ]:
            db.add(
                InventoryItem(
                    campus_id=campus.id,
                    sku=f"SKU-{campus.id}-{fake.unique.random_int(1000,9999)}",
                    name=name,
                    category=cat,
                    quantity=random.randint(5, 200),
                    unit="pcs",
                    reorder_level=10,
                )
            )

    # Circulars, homework, complaints, notifications
    for campus in campuses[:3]:
        db.add(
            Circular(
                campus_id=campus.id,
                title=f"PTM Schedule — {campus.city}",
                body="Parent-Teacher Meeting will be held this Saturday from 9 AM to 1 PM.",
                audience="all",
                created_by=users[1].id,
            )
        )
        db.add(
            Circular(
                campus_id=campus.id,
                title="Fee Reminder — Term 2",
                body="Kindly clear Term 2 fees before the due date to avoid late charges.",
                audience="parents",
                created_by=users[5].id,
            )
        )

    hw_subs = hyd_subjects[:3]
    for sub in hw_subs:
        db.add(
            Homework(
                campus_id=campuses[0].id,
                teacher_id=employees[0].id,
                subject_id=sub.id,
                grade="10",
                section="A",
                title=f"{sub.name} Practice Worksheet",
                description="Complete exercises 1–10 from the textbook and submit on the portal.",
                due_date=today + timedelta(days=3),
            )
        )

    db.add(
        Complaint(
            campus_id=campuses[0].id,
            raised_by=parent_user.id,
            category="Transport",
            subject="Bus delay on Route 2",
            description="The bus has been arriving 20 minutes late for the past week.",
            status="open",
            priority="medium",
        )
    )

    for u in users:
        db.add(
            Notification(
                user_id=u.id,
                title="Welcome to MIA Campus",
                body="This is a test site operated by MIA Solutions Pvt. Ltd. with sample data.",
                channel="in_app",
            )
        )

    # Payroll
    for emp in [e for e in employees if e.campus_id == campuses[0].id][:10]:
        gross = emp.salary
        deductions = round(gross * 0.12, 2)
        db.add(
            PayrollRun(
                campus_id=campuses[0].id,
                employee_id=emp.id,
                month="2026-07",
                gross=gross,
                deductions=deductions,
                net=gross - deductions,
                status="processed",
            )
        )

    # Workflows
    db.add(
        WorkflowApproval(
            module="admissions",
            entity_id=1,
            step="Principal Approval",
            status="pending",
            requested_by=users[7].id if len(users) > 7 else users[0].id,
            assigned_to=users[1].id,
            comments="Awaiting seat confirmation",
        )
    )

    db.add(
        AuditLog(
            user_id=users[0].id,
            action="seed",
            entity="system",
            entity_id="0",
            details={"message": "Test data seeded by MIA Solutions Pvt. Ltd."},
            ip_address="127.0.0.1",
        )
    )

    db.commit()
    return {
        "status": "seeded",
        "campuses": len(campuses),
        "students": len(students),
        "employees": len(employees),
        "company": "MIA Solutions Pvt. Ltd.",
        "demo_password": "Test@1234",
    }
