# MIA Campus — API Architecture

**Product:** MIA Campus  
**Company:** MIA Solutions Pvt. Ltd.  
**Base URL (local):** `http://localhost:8000`  
**Version prefix:** `/api/v1`

## Style

- REST + JSON
- Bearer JWT (`Authorization: Bearer <token>`)
- OpenAPI at `/docs` and `/redoc`
- Errors: `{ "detail": "..." }`

## Auth

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/auth/login` | Public | OAuth2 form (username=email) |
| POST | `/auth/login-json` | Public | JSON `{email,password}` |
| GET | `/auth/me` | JWT | Current user |
| GET | `/auth/demo-accounts` | Public | Test accounts list |

## Platform

| Method | Path | Notes |
|--------|------|-------|
| GET | `/health` | Liveness + company meta |
| GET | `/meta` | Test-site banner payload |
| GET | `/dashboard/summary` | KPI snapshot |
| GET | `/campuses` | Campus directory |
| GET | `/notifications` | User notifications |
| GET | `/circulars` | Campus circulars |
| GET | `/audit-logs` | Admin audit trail |
| GET | `/workflows` | Approval queue |

## Students & admissions

| Method | Path |
|--------|------|
| GET | `/students` |
| GET | `/students/{id}` |
| GET | `/admissions` |
| GET | `/admissions/analytics` |

## Academics

| Method | Path |
|--------|------|
| GET | `/attendance` |
| GET | `/attendance/analytics` |
| GET | `/leaves` |
| GET | `/grades` |
| GET | `/exams` |
| GET | `/timetable` |
| GET | `/homework` |

## Operations & finance

| Method | Path |
|--------|------|
| GET | `/fees/structures` |
| GET | `/fees/invoices` |
| GET | `/transport/routes` |
| GET | `/hostel` |
| GET | `/library/books` |
| GET | `/library/issues` |
| GET | `/inventory` |
| GET | `/hr/employees` |
| GET | `/hr/payroll` |
| GET | `/complaints` |

## AI chatbot

| Method | Path | Body |
|--------|------|------|
| POST | `/chat` | `{ "message": "...", "session_id": "optional" }` |

Uses OpenAI when `OPENAI_API_KEY` is set; otherwise MIA Assist rule-based replies. Branding: **MIA Assist · MIA Solutions Pvt. Ltd.**

## Cross-cutting

- **CORS:** `CORS_ORIGINS` + `FRONTEND_URL`
- **Idempotency:** planned for payment POSTs (`Idempotency-Key`)
- **Pagination:** `limit` / `offset` on list endpoints
- **Campus scope:** `campus_id` query or inferred from user
- **Versioning:** URL path `/api/v1`; breaking changes bump to `/api/v2`

## Future module APIs (roadmap)

```
/api/v1/admissions/applications
/api/v1/admissions/merit-lists
/api/v1/attendance/devices
/api/v1/grading/formulas
/api/v1/exams/hall-tickets
/api/v1/fees/payments
/api/v1/transport/gps
/api/v1/parents/portal
/api/v1/teachers/portal
/api/v1/mobile/sync
```

## Clients

| Client | Consumer |
|--------|----------|
| Next.js web | Staff / admin / parent / teacher |
| Mobile (planned) | Parent + teacher apps |
| Webhooks | Payment gateways, SMS, ERP |

© MIA Solutions Pvt. Ltd.
