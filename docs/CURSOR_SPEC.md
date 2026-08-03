# MIA Campus — Cursor Agent Specification

**Product:** MIA Campus  
**Company:** MIA Solutions Pvt. Ltd.  
**Mode:** Test site with seeded sample data  

Use this file as the primary brief when extending the codebase in Cursor.

## Goals

Build and extend a modular SaaS student information system with multi-campus support, role-based access, audit logs, workflows, analytics, and an AI chatbot (MIA Assist).

## Repo layout

```
backend/          FastAPI + SQLAlchemy
frontend/         Next.js 14 App Router
docs/             Schema, API, RBAC, roadmap
render.yaml       Render Blueprint
docker-compose.yml
```

## Non-negotiables

1. Brand as **MIA Solutions Pvt. Ltd.** / **MIA Campus** wherever product copy appears.
2. Keep the **test site** banner and sample-data messaging.
3. Do **not** use marketing language about scale/size of the product in the UI.
4. Prefer modular APIs under `/api/v1`.
5. Preserve demo accounts and password `Test@1234`.

## Implemented modules (UI + API)

Dashboard, Admissions, Students, Attendance, Grading, Examinations, Timetable, Fees, Transport, Hostel, Library, Inventory, HR & Payroll, Homework, Workflows, Analytics, Campuses, Settings, Notifications, MIA Assist chatbot.

## Spec index

| Doc | Path |
|-----|------|
| 300+ table schema | `docs/DATABASE_SCHEMA.md` |
| API architecture | `docs/API_ARCHITECTURE.md` |
| RBAC | `docs/RBAC.md` |
| 12-month roadmap | `docs/ROADMAP.md` |

## Local run

```bash
# API
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000

# Web
cd frontend && npm run dev
```

## Render

See root `README.md` and `render.yaml`. After deploy, wire `NEXT_PUBLIC_API_URL`, `FRONTEND_URL`, and `CORS_ORIGINS`.

## Seed data snapshot (approx.)

- 12 campuses  
- 600 students  
- 144 employees  
- 300 admission applications  
- Attendance, fees, exams, timetable, library, inventory, payroll samples  

© MIA Solutions Pvt. Ltd.
