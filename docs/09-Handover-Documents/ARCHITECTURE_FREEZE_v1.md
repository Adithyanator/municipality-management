# Architecture Freeze Document (v1.0)

**Project:** AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System  
**Version:** 1.0  
**Status:** Approved for Development, but with Open Issues tracked separately  
**Author:** Principal Enterprise Architect

---

## 1. Executive Authorization

This document establishes the **Architecture Freeze (Version 1.0)** for the Smart Municipal Citizen Assistance and Staff Attendance Management System. All core architecture leads have verified that the baseline requirements, database structures, interfaces, and security matrices are aligned.

By freezing this architecture, the project is authorized to proceed to active development. Any request to modify the components, APIs, or database schemas must go through a formal Change Request (CR) review process.

---

## 2. Approved Functional Modules

The following functional scopes are frozen and approved for implementation:

1. **AI Assistant:** Citizen conversational RAG grounded in the municipal knowledge base.
2. **File Tracking:** Public timeline updates for application statuses, searchable by unique File ID.
3. **Complaint Management:** Grid and Kanban boards for ticket logging, assignment, and resolution.
4. **Feedback System:** Rating collection and suggestion forms that lock closed complaints.
5. **Permit & Certificate Services:** Operational registries linked to tax, property, and payment histories.
6. **Government Scheme Information:** A public directory hosting guidelines and downloadable templates.
7. **Attendance Management:** Consent-based biometric tracking with liveness verification.
8. **Admin Dashboard:** Administrative settings, user profiles, and operational logs.
9. **AI/OCR Services:** Assistive file processors that categorize files and extract metadata.

---

## 3. Approved User Roles

The following seven roles are frozen and mapped to the system RBAC matrix:

1. **Citizen:** Public user scope (own data ownership only).
2. **Municipal Staff:** Operational scope (assigned tasks and own attendance only).
3. **Department Officer:** Managerial scope (department-scoped triage and reporting).
4. **Admin:** IT operations scope (user profiles and system settings).
5. **Super Admin:** Security governance scope (role/permission changes and keys).
6. **System Auditor:** Compliance scope (read-only audit, AI audit, and error logs).
7. **IT Support Engineer:** Systems diagnostic scope (system health and telemetry views).

---

## 4. Approved Pages & Portals

The frontend React application is restricted to the following layouts:

- **Public Pages:** Landing Page, Announcements Board, Schemes Directory, Permit Directory, Universal File Tracking Search, Citizen Register/Login, Password Reset Portal.
- **Citizen Portal:** Profile Manager, Grievance Intake, My Complaints Registry, Chatbot Overlay.
- **Staff Portal:** Assigned Kanban Board, Attendance Webcam Scanner Interface, Attendance Ledger.
- **Admin Portal:** User Directory, Grievance Triage Board, Attendance Registry, Analytics, Export Settings.

---

## 5. Approved Database Collections (42)

The MongoDB Atlas database architecture is frozen at **42 collections**:

### Preserved Production Collections (26):

1. `users`
2. `roles`
3. `permissions`
4. `departments`
5. `department_members`
6. `citizen_addresses`
7. `complaints` (authoritative ticket collection)
8. `complaint_assignments`
9. `complaint_status_history`
10. `attendance`
11. `attendance_summary`
12. `properties`
13. `tax_records`
14. `payments`
15. `certificates`
16. `certificate_types`
17. `files` (attachment registry)
18. `notifications`
19. `user_notification_preferences`
20. `feedback`
21. `audit_logs`
22. `auth_sessions`
23. `chatbot_knowledge_base`
24. `wards`
25. `complaint_categories`
26. `sla_policies`

### New Support Collections (16):

27. `knowledge_base`
28. `kb_embeddings`
29. `chatbot_sessions`
30. `ai_human_review_queue`
31. `biometric_consents`
32. `face_templates`
33. `staff_presence`
34. `file_tracking`
35. `file_tracking_history`
36. `municipal_service_directory`
37. `announcements`
38. `password_reset_tokens`
39. `report_exports`
40. `system_settings`
41. `ai_errors`
42. `ai_audit_logs`

---

## 6. Approved APIs (Grouped by Module)

All API route registrations must use the versioned `/api/v1` prefix:

### 6.1 Authentication & Registration

- `POST /api/v1/auth/register` (Citizen signup)
- `POST /api/v1/auth/login` (Create session and issue JWT)
- `POST /api/v1/auth/password-reset/request` (Generate hash token)
- `POST /api/v1/auth/password-reset/confirm` (Verify reset)

### 6.2 Public Lookup

- `GET /api/v1/public/announcements` (Public notices)
- `GET /api/v1/public/service-directory` (Schemes/permits)
- `GET /api/v1/public/file-tracking/:fileNo` (Public status tracking)

### 6.3 Citizen Services

- `GET/PATCH /api/v1/citizen/profile` (Citizen profile)
- `GET/PATCH /api/v1/citizen/notification-preferences` (Citizen preferences)
- `POST/GET /api/v1/citizen/complaints` (Complaint intake)
- `POST /api/v1/citizen/chatbot/sessions` (AI session initialization)

### 6.4 Staff Worklist & Attendance

- `GET/PATCH /api/v1/staff/assignments` (Kanban task logs)
- `POST /api/v1/staff/attendance/face-check` (Face scan verification)
- `POST /api/v1/staff/attendance/manual` (PIN override verification)

### 6.5 Admin Operations

- `GET/POST/PATCH /api/v1/admin/users` (User management)
- `POST /api/v1/admin/reports/exports` (CSV/PDF reporting request)
- `PATCH /api/v1/admin/system-settings/:settingKey` (Configure settings)

### 6.6 AI & Internal Service

- `POST /api/v1/internal/ai/gemini/respond` (Gemini model respondent)
- `POST /api/v1/internal/face/verify` (Biometric comparison)

---

## 7. Approved Security Controls

- **JWT Verification:** Authenticates requests using short-lived tokens and tracks active sessions via `auth_sessions`.
- **Backend RBAC:** Enforces ownership, department scopes, and role permissions on the API controllers.
- **KMS Encryption:** AES-256 field-level encryption for personal data, and AWS KMS-managed keys for face templates.
- **Append-Only Auditing:** Restricts updates and deletions on audit trails, securing logging continuity.
- **Endpoint Rate-Limiting:** Middleware throttles protecting login, registration, chatbot, and reporting routes.

---

## 8. Approved AI Features

- **RAG Grounding:** Chatbot queries search document vectors via MongoDB Atlas Vector Search, utilizing approved retrieval chunks.
- **Webcam Liveness Check:** Captures face scans, verifying depth and lighting to prevent spoofing.
- **OCR Metadata Parsing:** Automates document processing, extracting text data into protected derived schemas.
- **Review Escalations:** Redirects liveness failures, low-confidence matching, and chatbot handoffs to `ai_human_review_queue`.

---

## 9. Open Issues & Mitigation Track

The following gaps are excluded from this freeze and will be resolved as sprint tasks during development:

| Gap ID    | Description Summary                        | Target Resolution Phase   | Mitigation Control                                                   |
| :-------- | :----------------------------------------- | :------------------------ | :------------------------------------------------------------------- |
| **GA-01** | Backup immutability & deletion blocks      | Pre-Production Deployment | AWS S3 Object Lock and Multi-Factor Auth delete gates.               |
| **GA-02** | Post-handover credential rotation rules    | Handover Phase            | Rotate database credentials, API keys, and KMS keys within 24 hours. |
| **GA-03** | API object-level authorization checks      | Sprint 1 (Development)    | Add verification checks within route middlewares.                    |
| **GA-04** | Aadhaar PBKDF2 hash generation logic       | Sprint 1 (Development)    | Detail key-derivation inside the Mongoose schema.                    |
| **GA-05** | Temporary OCR text cache collections       | Sprint 1 (Development)    | Define an `ocr_cache` collection with a 7-day TTL index.             |
| **GA-06** | Handoff queue transition controllers       | Sprint 2 (Development)    | Implement REST API routes for review actions.                        |
| **GA-07** | CAPTCHA bot abuse validation               | Sprint 1 (Development)    | Enforce Turnstile tokens on public mutations.                        |
| **GA-08** | CSRF double-submit validation              | Sprint 1 (Development)    | Set cookie attributes and use anti-CSRF headers.                     |
| **GA-09** | Escalation contact matrices & support SLAs | Handover Phase            | Complete the Support Transition document.                            |
| **GA-10** | Error rate monitoring thresholds           | Handover Phase            | Configure logging alert rules in Datadog/CloudWatch.                 |
| **GA-11** | Workflow-specific RPO/RTO tiers            | Handover Phase            | Assign recovery targets based on service priority.                   |
| **GA-12** | Model precision validation scripts         | Sprint 3 (Development)    | Code validation tests for face recognition thresholds.               |
| **GA-13** | Multi-factor authentication roadmap        | Future Enhancement        | Document TOTP/WebAuthn configurations.                               |
