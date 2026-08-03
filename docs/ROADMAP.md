# MIA Campus — 12-Month Development Roadmap

**Product:** MIA Campus  
**Company:** MIA Solutions Pvt. Ltd.  
**Environment note:** Current repo ships as a test site with seeded sample data.

## Quarter 1 — Foundation (Months 1–3)

| Month | Focus | Deliverables |
|-------|-------|--------------|
| 1 | Platform core | Multi-campus tenancy, auth, RBAC, audit logs, org settings, Render/Docker CI |
| 2 | Student master + admissions | Application workflow, documents, merit list, enrollment, student IDs |
| 3 | Attendance v1 | Classroom + leave + parent notify; RFID/QR adapters; daily/monthly reports |

**Exit criteria:** Branch admins can onboard a campus, admit students, and take attendance.

## Quarter 2 — Academics (Months 4–6)

| Month | Focus | Deliverables |
|-------|-------|--------------|
| 4 | Timetable | Constraints engine, conflict detection, substitute teachers |
| 5 | Grading engine | Weighted formulas, GPA/CGPA, rubrics, moderation hooks |
| 6 | Examinations | Scheduling, hall tickets, seating, marks entry, report cards |

**Exit criteria:** Term results published to parent portal with digital report cards.

## Quarter 3 — Finance & operations (Months 7–9)

| Month | Focus | Deliverables |
|-------|-------|--------------|
| 7 | Fees & payments | Installments, scholarships, late fees, gateway, receipts, GST |
| 8 | Transport + hostel | Routes, GPS hooks, room allocation, visitor/mess basics |
| 9 | Library + inventory | Issue/return, RFID, procurement, low-stock alerts |

**Exit criteria:** Fee collection dashboards and operational modules live per campus.

## Quarter 4 — People, mobile, analytics (Months 10–12)

| Month | Focus | Deliverables |
|-------|-------|--------------|
| 10 | HR & payroll | Employee records, leave, payroll runs, appraisals |
| 11 | Parent/teacher mobile | Offline-first attendance sync, push notifications |
| 12 | Analytics & AI | Compliance reports, KPI marts, MIA Assist expansions, API partners |

**Exit criteria:** Mobile apps in pilot; analytics pack for principals; chatbot covering all modules.

## Cross-cutting workstreams (ongoing)

- Security reviews, penetration testing before production cutover
- Multi-curriculum support (CBSE / ICSE / IB / State)
- Document management + digital signatures
- Celery workers for statements, SMS, and report generation
- Observability: metrics, traces, error budgets

## Team shape (indicative)

- 2 backend · 2 frontend · 1 mobile · 1 QA · 1 DevOps · 1 PM (MIA Solutions Pvt. Ltd.)

© MIA Solutions Pvt. Ltd.
