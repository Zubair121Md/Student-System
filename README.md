# MIA Campus

Student Information System by **MIA Solutions Pvt. Ltd.**

This repository is a **test site** with sample/fake data for demos and development.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, TypeScript, Tailwind, TanStack Query, Recharts |
| Backend | FastAPI, SQLAlchemy, Pydantic |
| Data | PostgreSQL (Render) / SQLite (local demo) |
| Deploy | Render Blueprint (`render.yaml`), Docker Compose |

## Quick start (local)

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### Frontend

```bash
cd frontend
cp .env.example .env.local   # or use existing .env.local
npm install
npm run dev
```

App: http://localhost:3000

### Docker Compose

```bash
docker compose up --build
```

## Demo accounts

Password for all accounts: `Test@1234`

| Email | Role |
|-------|------|
| admin@miasolutions.test | Super Admin |
| principal.hyd@miasolutions.test | Principal |
| teacher.hyd@miasolutions.test | Teacher |
| parent.demo@miasolutions.test | Parent |
| student.demo@miasolutions.test | Student |
| accounts.hyd@miasolutions.test | Accountant |
| hr.hyd@miasolutions.test | HR |
| branch.blr@miasolutions.test | Branch Admin |

## Modules

Admissions · Students · Attendance · Grading · Examinations · Timetable · Fees · Transport · Hostel · Library · Inventory · HR & Payroll · Homework · Workflows · Analytics · Campuses · Settings · AI Chatbot (MIA Assist)

## Render deploy

1. Push this repo to GitHub (when you are ready).
2. In Render: **New → Blueprint** → select the repo.
3. After first deploy, set:
   - `mia-campus-web` → `NEXT_PUBLIC_API_URL` = `https://<mia-campus-api>.onrender.com`
   - `mia-campus-api` → `FRONTEND_URL` / `CORS_ORIGINS` = `https://<mia-campus-web>.onrender.com`
4. Redeploy the web service so the API URL is baked into the Next.js build.

Optional: set `OPENAI_API_KEY` on the API service for LLM-backed MIA Assist (otherwise rule-based replies are used).

## Documentation

See `/docs`:

- [Cursor agent spec](docs/CURSOR_SPEC.md)
- [Database schema (300+ tables)](docs/DATABASE_SCHEMA.md)
- [API architecture](docs/API_ARCHITECTURE.md)
- [RBAC design](docs/RBAC.md)
- [12-month roadmap](docs/ROADMAP.md)

## Branding

Product: **MIA Campus**  
Company: **MIA Solutions Pvt. Ltd.**  
Banner: test site with sample data (shown in the UI).

## License

Proprietary — MIA Solutions Pvt. Ltd. All rights reserved for this codebase template.
