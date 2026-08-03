# MIA Campus — Database Schema Specification

**Product:** MIA Campus  
**Company:** MIA Solutions Pvt. Ltd.  
**Audience:** engineering · Cursor agents · DBAs

> Implemented runtime models in `backend/app/models/entities.py` cover the operational subset used by this test site. This document is the **target canonical schema** (300+ tables) for the modular SaaS roadmap.

**Total tables in this specification:** 398


## Module: `core` (63 tables)

1. `organizations`
2. `organization_settings`
3. `organization_branding`
4. `campuses`
5. `campus_settings`
6. `campus_contacts`
7. `academic_years`
8. `academic_terms`
9. `academic_calendars`
10. `holiday_calendars`
11. `holiday_entries`
12. `curricula`
13. `curriculum_subjects`
14. `boards`
15. `board_mappings`
16. `languages`
17. `time_zones`
18. `countries`
19. `states`
20. `cities`
21. `users`
22. `user_profiles`
23. `user_sessions`
24. `user_devices`
25. `password_resets`
26. `mfa_devices`
27. `oauth_identities`
28. `roles`
29. `permissions`
30. `role_permissions`
31. `user_roles`
32. `campus_user_scopes`
33. `feature_flags`
34. `api_keys`
35. `audit_logs`
36. `audit_log_archives`
37. `data_change_events`
38. `notifications`
39. `notification_templates`
40. `notification_deliveries`
41. `email_outbox`
42. `sms_outbox`
43. `push_tokens`
44. `document_folders`
45. `documents`
46. `document_versions`
47. `document_shares`
48. `workflows`
49. `workflow_steps`
50. `workflow_instances`
51. `workflow_approvals`
52. `workflow_comments`
53. `integrations`
54. `integration_credentials`
55. `webhook_endpoints`
56. `webhook_deliveries`
57. `id_sequences`
58. `custom_fields`
59. `custom_field_values`
60. `tags`
61. `tagged_entities`
62. `comments`
63. `attachments`


## Module: `admissions` (30 tables)

1. `admission_cycles`
2. `admission_forms`
3. `admission_form_fields`
4. `admission_applications`
5. `admission_application_answers`
6. `admission_documents`
7. `admission_document_types`
8. `entrance_tests`
9. `entrance_test_sessions`
10. `entrance_test_questions`
11. `entrance_test_attempts`
12. `entrance_test_scores`
13. `interview_slots`
14. `interview_bookings`
15. `interview_scores`
16. `merit_lists`
17. `merit_list_entries`
18. `seat_quotas`
19. `seat_allocations`
20. `waitlist_entries`
21. `offer_letters`
22. `offer_letter_templates`
23. `enrollment_confirmations`
24. `admission_fee_links`
25. `admission_communications`
26. `admission_status_history`
27. `admission_checklist_items`
28. `admission_checklist_progress`
29. `sibling_discounts_rules`
30. `admission_analytics_daily`


## Module: `students` (28 tables)

1. `students`
2. `student_profiles`
3. `student_identifiers`
4. `student_photos`
5. `student_addresses`
6. `guardians`
7. `guardian_students`
8. `emergency_contacts`
9. `medical_profiles`
10. `medical_conditions`
11. `allergies`
12. `immunizations`
13. `previous_education`
14. `student_documents`
15. `scholarships`
16. `scholarship_awards`
17. `id_cards`
18. `id_card_batches`
19. `rfid_mappings`
20. `biometric_templates`
21. `student_status_history`
22. `student_transfers`
23. `student_promotions`
24. `student_sections`
25. `house_assignments`
26. `student_notes`
27. `student_alerts`
28. `student_custom_attributes`


## Module: `attendance` (28 tables)

1. `attendance_policies`
2. `attendance_sessions`
3. `attendance_records`
4. `attendance_modes`
5. `attendance_devices`
6. `rfid_scans`
7. `biometric_punches`
8. `qr_tokens`
9. `mobile_checkins`
10. `classroom_rolls`
11. `bus_attendance`
12. `hostel_attendance`
13. `late_entries`
14. `early_exits`
15. `leave_types`
16. `leave_balances`
17. `leave_requests`
18. `leave_approvals`
19. `attendance_notifications`
20. `attendance_defaulters`
21. `attendance_summaries_daily`
22. `attendance_summaries_monthly`
23. `attendance_class_stats`
24. `attendance_teacher_stats`
25. `attendance_campus_stats`
26. `attendance_trends`
27. `period_attendance`
28. `substitute_attendance`


## Module: `grading` (36 tables)

1. `subjects`
2. `subject_groups`
3. `courses`
4. `course_offerings`
5. `class_sections`
6. `section_teachers`
7. `lesson_plans`
8. `syllabus_units`
9. `assessments`
10. `assessment_types`
11. `assessment_rubrics`
12. `rubric_criteria`
13. `grade_entries`
14. `grade_scales`
15. `grade_boundaries`
16. `grading_formulas`
17. `formula_components`
18. `gpa_configs`
19. `cgpa_snapshots`
20. `percentile_ranks`
21. `moderation_batches`
22. `moderation_adjustments`
23. `grace_marks`
24. `revaluation_requests`
25. `revaluation_results`
26. `transcripts`
27. `transcript_lines`
28. `report_cards`
29. `report_card_templates`
30. `rank_lists`
31. `continuous_assessment_cycles`
32. `assignment_submissions`
33. `project_scores`
34. `practical_scores`
35. `viva_scores`
36. `weighted_grade_results`


## Module: `exams` (22 tables)

1. `exams`
2. `exam_sessions`
3. `exam_schedules`
4. `exam_rooms`
5. `seating_plans`
6. `seating_assignments`
7. `hall_tickets`
8. `hall_ticket_templates`
9. `invigilator_assignments`
10. `question_papers`
11. `question_paper_versions`
12. `question_banks`
13. `questions`
14. `question_options`
15. `marks_entry_batches`
16. `marks_entry_locks`
17. `result_publications`
18. `digital_signatures`
19. `exam_attendance`
20. `malpractice_cases`
21. `answer_scripts`
22. `rechecking_requests`


## Module: `timetable` (16 tables)

1. `timetable_plans`
2. `timetable_slots`
3. `periods`
4. `period_templates`
5. `rooms`
6. `room_types`
7. `room_bookings`
8. `teacher_availability`
9. `teacher_constraints`
10. `subject_constraints`
11. `lab_schedules`
12. `substitute_assignments`
13. `timetable_conflicts`
14. `timetable_versions`
15. `timetable_publishes`
16. `bell_schedules`


## Module: `finance` (31 tables)

1. `fee_categories`
2. `fee_structures`
3. `fee_structure_items`
4. `fee_installment_plans`
5. `fee_installments`
6. `student_fee_assignments`
7. `fee_discounts`
8. `scholarship_fee_links`
9. `late_fee_rules`
10. `fine_rules`
11. `fee_invoices`
12. `fee_invoice_lines`
13. `fee_payments`
14. `payment_gateways`
15. `payment_transactions`
16. `refunds`
17. `receipts`
18. `receipt_templates`
19. `gst_configs`
20. `tax_lines`
21. `accounting_ledgers`
22. `journal_entries`
23. `journal_lines`
24. `chart_of_accounts`
25. `bank_accounts`
26. `bank_reconciliations`
27. `fee_reminders`
28. `fee_concessions`
29. `fee_waivers`
30. `collection_targets`
31. `collection_daily_stats`


## Module: `transport` (17 tables)

1. `transport_routes`
2. `route_stops`
3. `vehicles`
4. `vehicle_documents`
5. `drivers`
6. `driver_licenses`
7. `conductors`
8. `route_assignments`
9. `student_transport_subscriptions`
10. `pickup_drop_logs`
11. `gps_devices`
12. `gps_pings`
13. `geofences`
14. `fuel_logs`
15. `maintenance_logs`
16. `transport_fees`
17. `transport_attendance`


## Module: `hostel` (13 tables)

1. `hostel_blocks`
2. `hostel_floors`
3. `hostel_rooms`
4. `hostel_beds`
5. `hostel_allocations`
6. `hostel_visitors`
7. `visitor_passes`
8. `mess_menus`
9. `mess_attendance`
10. `mess_charges`
11. `hostel_inventories`
12. `hostel_incidents`
13. `warden_rounds`


## Module: `library` (16 tables)

1. `library_branches`
2. `library_shelves`
3. `library_books`
4. `book_copies`
5. `book_authors`
6. `book_categories`
7. `library_members`
8. `library_issues`
9. `library_returns`
10. `library_reservations`
11. `library_fines`
12. `digital_resources`
13. `digital_resource_access`
14. `library_rfid_tags`
15. `acquisition_orders`
16. `acquisition_items`


## Module: `inventory` (20 tables)

1. `inventory_warehouses`
2. `inventory_categories`
3. `inventory_items`
4. `inventory_batches`
5. `stock_movements`
6. `purchase_requisitions`
7. `purchase_orders`
8. `purchase_order_items`
9. `vendors`
10. `vendor_contacts`
11. `goods_receipts`
12. `goods_receipt_items`
13. `asset_register`
14. `asset_assignments`
15. `uniform_sizes`
16. `uniform_issues`
17. `lab_equipment`
18. `equipment_maintenance`
19. `stationery_issues`
20. `procurement_budgets`


## Module: `hr` (24 tables)

1. `employees`
2. `employee_profiles`
3. `departments`
4. `designations`
5. `employment_contracts`
6. `employee_documents`
7. `employee_attendance`
8. `employee_leave_types`
9. `employee_leave_balances`
10. `employee_leave_requests`
11. `payroll_components`
12. `payroll_runs`
13. `payroll_run_lines`
14. `salary_structures`
15. `salary_revisions`
16. `appraisals`
17. `appraisal_cycles`
18. `appraisal_scores`
19. `recruitment_jobs`
20. `recruitment_candidates`
21. `recruitment_interviews`
22. `onboarding_checklists`
23. `exit_checklists`
24. `hr_policies`


## Module: `communication` (17 tables)

1. `parent_portal_preferences`
2. `teacher_portal_preferences`
3. `circulars`
4. `circular_audiences`
5. `complaints`
6. `complaint_messages`
7. `ptm_slots`
8. `ptm_bookings`
9. `homework`
10. `homework_attachments`
11. `homework_submissions`
12. `announcements`
13. `message_threads`
14. `message_participants`
15. `messages`
16. `sms_campaigns`
17. `email_campaigns`


## Module: `analytics` (15 tables)

1. `report_definitions`
2. `report_runs`
3. `dashboard_widgets`
4. `dashboard_layouts`
5. `kpi_definitions`
6. `kpi_snapshots`
7. `compliance_checklists`
8. `compliance_evidences`
9. `export_jobs`
10. `data_mart_attendance`
11. `data_mart_fees`
12. `data_mart_admissions`
13. `data_mart_academics`
14. `etl_jobs`
15. `etl_runs`


## Module: `platform_ext` (21 tables)

1. `mobile_app_versions`
2. `mobile_sessions`
3. `offline_sync_queues`
4. `chat_sessions`
5. `chat_messages`
6. `ai_prompts`
7. `ai_usage_logs`
8. `search_indexes`
9. `background_jobs`
10. `job_retries`
11. `file_storage_objects`
12. `cdn_assets`
13. `tenant_quotas`
14. `billing_subscriptions`
15. `billing_invoices`
16. `support_tickets`
17. `support_ticket_messages`
18. `system_health_checks`
19. `feature_usage_events`
20. `consent_records`
21. `privacy_requests`


## Module: `lifecycle` (1 tables)

1. `organizations_history`


## Implemented runtime entities (test site)

These map 1:1 to SQLAlchemy models and are seeded with fake data:

| Table | Purpose |
|-------|---------|
| organizations | Tenant / school group (MIA Solutions Pvt. Ltd.) |
| campuses | Multi-campus directory |
| academic_years | Year cycles per campus |
| users | Auth + RBAC principals |
| audit_logs | Immutable action trail |
| students / guardians | Student master |
| employees | Staff / teachers |
| admission_applications | Admissions pipeline |
| attendance_records / leave_requests | Attendance |
| subjects / assessments / grade_entries | Grading engine |
| exams / exam_schedules | Examination |
| timetable_slots | Timetable |
| fee_structures / fee_invoices | Fees |
| transport_routes | Transport |
| hostel_blocks / hostel_rooms | Hostel |
| library_books / library_issues | Library |
| inventory_items | Inventory |
| notifications / circulars / homework / complaints | Comms |
| payroll_runs | HR payroll |
| workflow_approvals | Approvals |
| chat_messages | MIA Assist chatbot |

## Conventions

- Every business table includes `id`, `created_at`, `updated_at`.
- Campus-scoped tables include `campus_id` FK.
- Soft deletes use `deleted_at` where required by compliance modules.
- JSON columns store flexible components (fee breakup, stops, subjects).
- Primary keys are integers in the test site; production may migrate to UUIDs per tenant.

## Multi-tenancy

- Level 1: `organizations` (MIA Solutions Pvt. Ltd. group)
- Level 2: `campuses` (branch)
- Level 3: `academic_years` + curriculum
- Row-level security via role + `campus_id` scope on API layer

© MIA Solutions Pvt. Ltd.
