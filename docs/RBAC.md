# MIA Campus — RBAC Design

**Product:** MIA Campus  
**Company:** MIA Solutions Pvt. Ltd.

## Roles

| Role | Scope | Typical access |
|------|-------|----------------|
| `super_admin` | Organization | All campuses, settings, audit, users |
| `branch_admin` | Campus | Campus config, admissions, fees ops |
| `principal` | Campus | Academics oversight, approvals, reports |
| `teacher` | Campus + sections | Attendance, homework, marks, timetable |
| `parent` | Linked students | Attendance, fees, results, circulars, leave |
| `student` | Self | Timetable, homework, results, library |
| `accountant` | Campus | Fee structures, invoices, receipts, GST |
| `hr` | Campus / org | Employees, payroll, leave, recruitment |

## Permission matrix (summary)

| Capability | SA | BA | Prin | Teach | Parent | Stud | Acct | HR |
|------------|----|----|------|-------|--------|------|------|----|
| Manage campuses | ✓ | | | | | | | |
| Admissions approve | ✓ | ✓ | ✓ | | | | | |
| Student master edit | ✓ | ✓ | ✓ | view | view | view | view | |
| Mark attendance | ✓ | ✓ | ✓ | ✓ | | | | |
| Enter grades | ✓ | ✓ | ✓ | ✓ | | | | |
| Publish results | ✓ | ✓ | ✓ | | | | | |
| Fee collect | ✓ | ✓ | view | | pay | | ✓ | |
| Payroll | ✓ | | | | | | | ✓ |
| Audit logs | ✓ | ✓ | ✓ | | | | | |
| Workflows | ✓ | ✓ | ✓ | request | request | | ✓ | ✓ |

## Enforcement

1. **Authentication:** JWT with `sub` (user id) + `role`
2. **Authorization:** `require_roles(...)` dependency on sensitive routes
3. **Row scope:** filter by `user.campus_id` unless `super_admin`
4. **Audit:** login and privileged mutations write `audit_logs`
5. **Future:** permission table + policy engine (ABAC for section-level teacher access)

## Demo accounts (test site)

Password: `Test@1234`

- `admin@miasolutions.test` → super_admin  
- `principal.hyd@miasolutions.test` → principal  
- `teacher.hyd@miasolutions.test` → teacher  
- `parent.demo@miasolutions.test` → parent  
- `student.demo@miasolutions.test` → student  
- `accounts.hyd@miasolutions.test` → accountant  
- `hr.hyd@miasolutions.test` → hr  
- `branch.blr@miasolutions.test` → branch_admin  

© MIA Solutions Pvt. Ltd.
