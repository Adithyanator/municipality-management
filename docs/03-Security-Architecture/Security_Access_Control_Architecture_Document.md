# SECURITY & ACCESS CONTROL ARCHITECTURE DOCUMENT

Project: AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System

Source baseline: SmartCity_DB_Architecture_v4.0_AI_Extension_Updated, AI_Architecture_Final_Submission_Updated, Frontend_Architecture_Final_Merged_Updated, and SRS_AI_Powered_Municipality_Management_Portal_Updated. This document preserves the uploaded project scope and uses only the modules, collections, workflows, portals, services, and controls reflected in those documents.

## 1. System Overview

The system is a municipality service platform that provides digital citizen assistance, complaint registration and tracking, file/application tracking, public service guidance, feedback collection, administrative reporting, staff complaint work management, and consent-based face recognition attendance. The SRS defines the project as an AI-powered citizen assistance platform integrated with face recognition attendance management for municipal employees. The final SRS Appendix A aligns this scope with a React citizen/staff/admin portal, Node.js backend, MongoDB Atlas database, Gemini chatbot through an AI Gateway, RAG over approved municipal knowledge, file tracking, complaint management, feedback, analytics, and consent-based face recognition attendance with manual fallback.

The security purpose of this document is to define the access-control, authentication, authorization, data protection, audit, AI governance, biometric privacy, frontend route protection, API security, database security, backup, incident response, and production-readiness controls required to operate the system safely within the uploaded architecture.

Stakeholders supported by the uploaded documents are citizens, municipal staff, department officers or department staff, administrators, and municipality management/report reviewers. System Auditor and IT Support Engineer are recommended controlled RBAC extensions because the database architecture includes audit logs, AI audit/error logs, report exports, system settings, backup policy references, and security operations, but they are not named as direct SRS user roles.

Core system modules are limited to citizen registration/profile, authentication/session management, password reset, citizen portal, staff portal, admin portal, AI May I Help You chatbot, RAG knowledge base and vector search, complaint/ticket workflow, complaint assignment and status history, public file tracking, certificates and certificate types, tax records and payments, feedback, notifications, report exports, system settings, staff/employee management, biometric consent, encrypted face templates, face attendance, attendance summary, staff presence, audit logs, AI audit logs, and AI error logs.

Sensitive data types include citizen profile/contact/address data, Aadhaar hash, authentication credentials and session tokens, password reset token hashes, complaint data, GPS coordinates, attachments, officer notes, internal audit notes, file tracking data, certificate and tax/payment records, staff employment data, attendance events, live staff presence, biometric consent records, encrypted face embeddings/templates, chatbot transcripts/messages, RAG retrieval metadata, AI audit/error metadata, report exports, and system settings. Raw Aadhaar values, plaintext passwords, plaintext reset tokens, Gemini API keys, database credentials, private keys, backup secrets, and plaintext biometric templates must not be stored in MongoDB.

Data classification levels are:

| Level        | Definition                                                                                                          | Examples                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public       | Intended for public access through public routes or public lookup                                                   | announcements, public municipal service directory, public file tracking notes where `public_tracking_enabled` is true                                          |
| Internal     | Operational data for authenticated municipal use                                                                    | department worklists, assignment queues, non-sensitive system setting labels                                                                                   |
| Confidential | Citizen, complaint, staff, tax, payment, report, and operational data requiring authenticated and authorized access | complaints, attachments, file history, certificates, tax records, payments, feedback, report exports                                                           |
| Restricted   | Authentication, biometric, AI governance, audit, security settings, and privileged administrative data              | password hashes, auth sessions, password reset token hashes, encrypted face templates, biometric consents, AI audit logs, audit logs, system security settings |

Trust boundaries are public browser/kiosk/mobile access to React routes, authenticated citizen portal, authenticated staff portal, authenticated admin portal, Node.js/Express API boundary, AI Gateway boundary, Gemini provider boundary, Python face recognition service boundary, MongoDB Atlas data boundary, object/file storage boundary referenced by `files`, and administrative reporting/export boundary.

Security objectives are confidentiality, integrity, availability, accountability, least privilege, portal segregation, consent enforcement, biometric minimization, AI safety, direct-model-write prevention, auditability, retention control, safe fallbacks, and production-grade recovery.

## 2. Security Scope

Citizen services include registration, login, profile/address/notification preferences, chatbot use, complaint submission and tracking, public file tracking, schemes/permits/certificate guidance, feedback, and authenticated citizen complaint views. Security scope covers identity validation, ownership-based access, public/private note separation, attachment restrictions, and protection of citizen PII.

Staff services include assigned complaint worklists, Kanban status updates, officer notes, proof photo upload, attendance scanner use, attendance ledger view, and manual/PIN attendance fallback where required. Security scope covers role and department membership checks, assignment-based access, webcam permission gating, consent checks for biometric attendance, and audit of staff actions.

Admin services include user and employee management, complaint triage and assignment, global ledgers, attendance reports, analytics, CSV/PDF report exports, non-secret system/security settings, and staff attendance management. Security scope covers high-risk privilege separation, export control, settings audit, and administrative action monitoring.

Complaint management covers `complaints`, `complaint_assignments`, `complaint_status_history`, attachments in `files`, SLA fields, department/staff assignment, public notes, officer notes, internal audit notes, resolution proof, feedback linkage, and closure locking after feedback.

File tracking covers `file_tracking` and `file_tracking_history`, public lookup by File ID, public officer comments, department logs, and internal notes that must be suppressed from public APIs.

Permit and certificate services cover public guidance through `municipal_service_directory`, operational certificate records in `certificates`, and `certificate_types`.

Tax-related services cover `properties`, `tax_records`, `payments`, and payment events where already adopted.

Feedback scope covers feedback submission, rating, suggestions, feedback reports, and feedback linkage to closure or analytics.

AI chatbot scope covers Gemini access only through the backend AI Gateway, Chat Orchestrator, guardrails, approved `knowledge_base`, `kb_embeddings`, MongoDB Atlas Vector Search, chatbot sessions/messages, human escalation, complaint/ticket creation through backend APIs, safe fallbacks, redaction, `ai_audit_logs`, and `ai_errors`.

Face recognition attendance scope covers staff biometric consent, enrollment, encrypted face templates, liveness detection, confidence decision, attendance creation, low-confidence/manual review, PIN/manual fallback, staff presence update, attendance summary, audit logging, and frontend webcam permission workflow.

Employee/staff management scope covers `users`, employment fields, `departments`, `department_members`, `roles`, `permissions`, attendance, staff presence, and biometric lifecycle.

Audit and reporting scope covers `audit_logs`, `ai_audit_logs`, `ai_errors`, `report_exports`, files containing generated exports, and export monitoring.

Database security scope covers MongoDB Atlas, Mongoose validation, JSON Schema validation, encryption at rest, TLS in transit, Field Level Encryption, KMS-backed encryption, database RBAC, Atlas Search, Atlas Vector Search, time-series AI logs, backups, and secret exclusion.

Frontend security scope covers React route guards, protected routes, guest routes, role-based navigation, citizen/staff/admin portal segregation, login/logout flows, password reset UI, session persistence, unauthorized handling, attendance scanner access restrictions, and UI-level RBAC enforcement.

## 3. User Role Architecture

| Role                                  | Status in uploaded documents                                              | Responsibilities                                                              | Allowed actions                                                                                                                                                    | Restricted actions                                                                                                     | Security risks                                                       | Recommended access controls                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Citizen                               | Direct SRS role                                                           | Use municipal services and track own requests                                 | Register, login, manage own profile, use chatbot, submit complaints, track own complaints/files, submit feedback, view public schemes/permits/certificate guidance | Staff/admin portals, staff worklists, internal notes, global reports, system settings, biometric admin functions       | PII exposure, account takeover, complaint attachment misuse          | JWT authentication, ownership checks, rate limits, upload validation, public/private data filtering   |
| Municipal Staff                       | Direct SRS role                                                           | Handle assigned municipal work and mark attendance                            | View assigned complaints, update status, add officer notes, upload resolution proof, view own attendance ledger, use face/PIN/manual attendance                    | User management, global exports, settings, unrelated department cases, biometric template administration               | Unauthorized complaint updates, proof upload abuse, attendance fraud | RBAC, assignment checks, department checks, file validation, attendance consent and liveness controls |
| Department Officer / Department Staff | Supported by departments and department_members                           | Manage department-level complaint handling and dispatch                       | View department complaints, assign within department if permitted, update department status/history, review department work                                        | Cross-department admin changes, global settings, unrestricted exports                                                  | Department privilege creep, conflict between assignment and approval | Department-scoped RBAC, separation of assignment and approval, audit of reassignment                  |
| Admin                                 | Direct SRS role                                                           | Manage users, complaints, employees, attendance, reports, dashboard analytics | User/staff management, complaint triage, assignment, attendance analytics, report exports, non-secret settings                                                     | Direct secret access, direct Gemini writes, deleting audit logs, bypassing consent                                     | Excessive privilege, report leakage, settings misuse                 | Privileged RBAC, step-up approval for high-risk operations, export logging, immutable audit trails    |
| Super Admin                           | Recommended controlled extension of RBAC/database design                  | Highest-level administrative governance                                       | Manage roles/permissions, security settings references, backup policy references, admin account lifecycle                                                          | Operational complaint ownership unless separately assigned, audit log deletion, secret storage in MongoDB              | Privilege escalation, separation-of-duty failure                     | Dual-control for role/permission changes, restricted account count, explicit audit review             |
| System Auditor                        | Recommended controlled extension from audit/reporting requirements        | Independent review of audit, AI audit, reports, and security events           | Read `audit_logs`, `ai_audit_logs`, `ai_errors`, report export metadata, relevant read-only operational records                                                    | Create/update/delete operational records, change permissions, export sensitive bulk data unless approved               | Audit data misuse, privacy exposure                                  | Read-only RBAC, filtered exports, monitored access, no write privileges                               |
| IT Support Engineer                   | Recommended controlled extension from system settings/security operations | Operate non-secret settings, support incidents, monitor errors                | View operational health, AI errors, correlation IDs, non-secret system settings, support session revocation under approval                                         | View plaintext secrets, change roles without approval, access face templates, access complaint contents without ticket | Support overreach, secret exposure                                   | Break-glass workflow, least-privilege settings access, audit every support action                     |

## 4. Role-Based Access Control Architecture

Permission legend: V=view, C=create, U=update, D=delete, A=approve/assign/administratively authorize, E=export. `Own` means ownership-limited. `Dept` means department-scoped. `RO` means read-only. `No` means denied.

| Module / Collection        | Citizen                              | Municipal Staff                         | Department Officer/Staff       | Admin                              | Super Admin                 | System Auditor  | IT Support Engineer                 |
| -------------------------- | ------------------------------------ | --------------------------------------- | ------------------------------ | ---------------------------------- | --------------------------- | --------------- | ----------------------------------- |
| `users`                    | V/U Own                              | V Own                                   | V Dept staff                   | V/C/U/A                            | V/C/U/D/A                   | V RO            | V/U support fields only             |
| `roles`                    | No                                   | No                                      | No                             | V                                  | V/C/U/D/A                   | V RO            | V RO                                |
| `permissions`              | No                                   | No                                      | No                             | V                                  | V/C/U/D/A                   | V RO            | V RO                                |
| `departments`              | V public                             | V                                       | V Dept                         | V/C/U/A                            | V/C/U/D/A                   | V RO            | V RO                                |
| `department_members`       | No                                   | V Own membership                        | V Dept                         | V/C/U/A                            | V/C/U/D/A                   | V RO            | V RO                                |
| `complaints`               | V/C Own, U limited before assignment | V/U Assigned                            | V/U/A Dept                     | V/C/U/A/E                          | V/A/E                       | V RO            | V metadata for support only         |
| `complaint_assignments`    | V Own status only                    | V/U Assigned                            | V/C/U/A Dept                   | V/C/U/A/E                          | V/A/E                       | V RO            | No                                  |
| `complaint_status_history` | V public/own notes                   | C/U Assigned public/officer notes       | C/U Dept                       | V/C/U/A/E                          | V/A/E                       | V RO            | V correlation only                  |
| `file_tracking`            | V public by File ID                  | V/U Assigned                            | V/U Dept                       | V/C/U/A/E                          | V/A/E                       | V RO            | V metadata only                     |
| `file_tracking_history`    | V public notes                       | V/C/U Assigned                          | V/C/U Dept                     | V/C/U/A/E                          | V/A/E                       | V RO            | V metadata only                     |
| `certificates`             | V Own                                | V Assigned                              | V/U Dept                       | V/C/U/A/E                          | V/A/E                       | V RO            | No                                  |
| `certificate_types`        | V public                             | V                                       | V                              | V/C/U/A                            | V/C/U/D/A                   | V RO            | V RO                                |
| `tax_records`              | V Own                                | V Assigned                              | V/U Dept if assigned           | V/C/U/A/E                          | V/A/E                       | V RO            | No                                  |
| `payments`                 | V Own receipt/status                 | V Assigned status                       | V Dept status                  | V/U/A/E                            | V/A/E                       | V RO            | No                                  |
| `feedback`                 | V/C Own                              | V Assigned complaint feedback           | V Dept analytics               | V/U/E                              | V/E                         | V RO            | No                                  |
| `attendance`               | No                                   | V Own, C via scanner only               | V Dept, A fallback if assigned | V/C/U/A/E                          | V/A/E                       | V RO            | V errors only                       |
| `attendance_summary`       | No                                   | V Own                                   | V Dept                         | V/U/A/E                            | V/A/E                       | V RO            | V RO                                |
| `staff_presence`           | No                                   | V Own/status if allowed                 | V Dept dashboard               | V/U/A                              | V/A                         | V RO            | V operational only                  |
| `biometric_consents`       | No                                   | V Own consent, C revoke request         | V Dept status if authorized    | V/C/U/A                            | V/A/E                       | V RO            | No                                  |
| `face_templates`           | No                                   | No direct template access               | No direct template access      | V metadata, C/U/D via service only | V metadata/A                | V metadata RO   | No                                  |
| `knowledge_base`           | V public/retrievable content only    | V permitted                             | V/C/U Dept drafts              | V/C/U/A/E                          | V/C/U/D/A/E                 | V RO            | V metadata only                     |
| `kb_embeddings`            | No direct access                     | No direct access                        | No direct access               | V metadata/rebuild status          | V/A                         | V metadata RO   | V operational status                |
| `chatbot_sessions`         | V/C Own                              | V assigned escalations                  | V Dept escalations             | V/E governed                       | V/E governed                | V RO redacted   | V correlation only                  |
| `chatbot_messages`         | V/C Own                              | V/C human handoff                       | V Dept handoff                 | V/E redacted                       | V/E redacted                | V RO redacted   | V correlation only                  |
| `ai_human_review_queue`    | No                                   | V/U assigned reviews                    | V/U/A Dept reviews             | V/U/A/E                            | V/A/E                       | V RO            | V operational only                  |
| `ai_audit_logs`            | No                                   | No                                      | V Dept related if authorized   | V/E                                | V/E                         | V RO/E approved | V operational metadata              |
| `ai_errors`                | No                                   | No                                      | V Dept related if authorized   | V/U status/E                       | V/E                         | V RO            | V/U operational status              |
| `notifications`            | V/U Own                              | V/U Own/assigned                        | V/C Dept                       | V/C/U/A                            | V/A                         | V RO            | V delivery status                   |
| `report_exports`           | No                                   | No unless own attendance export allowed | V Dept metadata                | V/C/A/E                            | V/A/E                       | V RO            | V operational status                |
| `system_settings`          | No                                   | No                                      | No                             | V/U non-secret assigned settings   | V/C/U/A non-secret settings | V RO            | V/U operational non-secret settings |
| `audit_logs`               | No                                   | No                                      | V Dept related if authorized   | V/E                                | V/E                         | V RO/E approved | V operational metadata              |

Permission conflicts include assigning and approving the same high-risk complaint action, changing roles and reviewing audit evidence for the same change, creating a report export and approving unrestricted download scope, enrolling a face template without active consent, and publishing knowledge base content that is later used by Gemini without independent approval.

High-risk permissions are role/permission management, admin user management, report exports, system settings, biometric consent override, face template deletion/enrollment, knowledge base publish/archive, AI Gateway configuration identifiers, audit log export, and attendance override/manual fallback approval.

Separation-of-duty requirements are: role/permission changes require Super Admin or controlled approval; complaint assignment and closure approval should be separated where feasible; face enrollment requires active consent and service validation rather than manual DB writes; export creation must be logged and reviewed; audit log administrators must not be able to delete or alter logs; knowledge base publication should be reviewed before retrieval is allowed.

Least-privilege recommendations are to default every route/API to deny, grant citizens ownership-only access, grant staff assignment-only access, grant department staff department-scoped access, grant admins operational access without secret exposure, keep Super Admin accounts limited, and keep auditor access read-only and redacted.

## 5. Authentication Architecture

### Backend Authentication

Citizen registration flow uses the public registration UI and backend registration API. The SRS Appendix A states citizens can register and manage profile/address/notification preferences. The database architecture extends `users` with normalized email/phone, `aadhaar_hash`, profile fields, role routing, and staff registry fields; raw Aadhaar values must not be stored. The backend validates required fields, checks normalized email/phone and Aadhaar hash for duplicates, hashes the password with bcrypt, assigns the citizen role, stores the user record, creates an `audit_logs` registration event, and issues a JWT/auth session only after successful validation.

Staff/admin login flow uses backend authentication against `users`, `roles`, `permissions`, `departments`, and `department_members`. Passwords are verified against bcrypt hashes. On success, the backend creates an `auth_sessions` record with user, role, device/request metadata, issue time, expiry, revocation status, and correlation ID, then issues a short-lived access JWT and a refresh token bound to the `auth_sessions` record.

Password hashing must use bcrypt for password storage. Plaintext passwords must never be stored in MongoDB or logs. Password changes and reset completions must update `password_changed_at` and invalidate or rotate affected sessions.

JWT authentication is enforced by Node.js middleware. JWT claims should contain only minimal identity, role, department/member references, session ID, issue time, expiry, and correlation support. Authorization must not rely only on frontend state.

Refresh token strategy uses `auth_sessions` as the authoritative session store. Refresh tokens must be rotated, stored only as hashes or revocable session references server-side, checked against expiry/revocation/device metadata, and invalidated on logout, password reset, high-risk role change, account lock, or suspected compromise.

Password reset uses `password_reset_tokens` with `token_hash`, requested metadata, expiry, TTL index, and status. Raw reset tokens must never be stored. Successful password reset marks the token as used/expired, logs the event in `audit_logs`, rotates sessions, and updates password metadata.

Session timeout rules should be enforced through short access-token expiry and refresh-session expiry stored in `auth_sessions`. Exact timeout values are not specified in the uploaded documents and must be finalized by municipality policy through non-secret `system_settings` references.

Multi-device login policy should allow municipality-approved concurrent sessions through separate `auth_sessions` records, with admin support for session listing and revocation. Limits are policy values and must be finalized by municipality policy.

Account lockout policy should protect against brute force by tracking failed attempts, applying rate limits and temporary lockout, and logging failed login events. Specific thresholds are not specified in the uploaded documents and must be approved as municipality security settings.

Future MFA/2FA is a recommended enhancement only. It should be added as an RBAC-compatible step-up control for admin, Super Admin, report export, role/permission changes, and biometric administration if approved later.

### Frontend Authentication

Login portal security separates guest routes from authenticated routes. Guest routes include public landing content, public file tracking, citizen registration, login, and password reset. Authenticated routes are protected through route guards and role-aware navigation.

Protected route architecture uses React route guards to verify authentication state, token/session validity, role, and portal scope before rendering citizen, staff, admin, attendance, or settings screens.

Guest route restrictions prevent authenticated users from re-entering login/reset/register pages in ways that conflict with active sessions; they should redirect to the correct portal based on role.

Authenticated route restrictions prevent unauthenticated access to citizen/staff/admin portals and redirect to login or unauthorized routes as appropriate.

Session persistence should retain only the minimum token/session state needed for the React app to call the Node.js API. Where cookies are used, they must be secure, HttpOnly, SameSite, and TLS-only. Where browser storage is used by the implementation, token theft risk must be mitigated by short token life, refresh revocation, XSS controls, and logout enforcement.

Logout handling clears frontend state and calls the backend session revocation endpoint to revoke the `auth_sessions` record and refresh token.

Unauthorized access handling displays a controlled unauthorized state and records route access violations through frontend audit events forwarded to the backend where appropriate.

Token expiration handling attempts a refresh through the backend refresh endpoint; if refresh fails or the session is revoked/expired, the user is logged out and redirected to login.

Password reset UI workflow requests a reset, receives an out-of-band reset link/token delivery through the approved channel, submits a new password with the reset token, and never exposes or stores raw token values beyond the reset transaction.

Registration flow:

```text
Citizen Registration UI
  -> Node.js Registration API
  -> Validate input and duplicate email/phone/aadhaar_hash
  -> bcrypt password hash
  -> Create users/citizen_addresses/preferences as applicable
  -> audit_logs registration event
  -> Create auth_sessions and issue JWT/refresh token or require login
  -> Citizen Portal
```

Login flow:

```text
Login UI
  -> Node.js Auth API
  -> Validate credentials
  -> bcrypt password verification
  -> Load role/permissions/department membership
  -> Create auth_sessions
  -> Issue access JWT + refresh token
  -> React route guard redirects to Citizen, Staff, or Admin portal
```

Token refresh flow:

```text
API call receives expired access token
  -> Frontend calls refresh endpoint
  -> Backend validates refresh token/session hash against auth_sessions
  -> Check revoked/expired/password_changed_at/role change status
  -> Rotate refresh token and issue new access JWT
  -> Continue request or force logout
```

Password reset flow:

```text
Password Reset UI
  -> Request reset endpoint
  -> Create password_reset_tokens.token_hash with TTL and status
  -> Deliver reset token through approved channel
  -> User submits token + new password
  -> Backend hashes submitted token and validates status/expiry
  -> bcrypt new password hash
  -> Mark token used, revoke active sessions, log audit event
  -> Redirect to login
```

Logout/session revocation flow:

```text
User selects logout or admin revokes session
  -> Frontend calls logout endpoint
  -> Backend marks auth_sessions revoked
  -> Refresh token invalidated
  -> Frontend clears auth state
  -> audit_logs logout/session_revoked event
  -> Redirect to public/login route
```

## 6. Authorization Architecture

### Frontend Authorization

React route access control uses route guards to prevent unauthorized rendering of portal screens. Public routes allow announcements, public directories, public file tracking, login, registration, and password reset. Citizen routes allow authenticated citizen services. Staff routes allow assigned worklists and attendance scanner features. Admin routes allow dashboards, user/staff management, complaint triage, reports, attendance analytics, and system settings.

Route guards must check authenticated state, role, department context where needed, and route-specific permission metadata. Role-based navigation must hide inaccessible menu items for citizen, staff, and admin portals, while also handling direct URL entry with route guard enforcement.

Citizen portal access is limited to own profile, own complaints, own feedback, chatbot sessions, public lookup, and public service guidance.

Staff portal access is limited to staff worklists, assigned or department-authorized complaint updates, attendance scanner, own attendance ledger, and permitted notifications.

Admin portal access is limited to users, staff, triage, attendance analytics, reports, non-secret settings, and governance screens permitted by RBAC.

Attendance scanner access must be restricted to authenticated staff/admin roles with attendance permission. The scanner must require the webcam clearance gate before capture and must block access where the user has no active staff identity or no valid attendance permission.

Webcam clearance gate must request user browser permission only when the protected attendance scanner route is authorized. Denied webcam permission, failed camera access, failed liveness, low confidence, or service failure must route to retry, manual review, or PIN/manual fallback as defined by the AI/database architecture.

Unauthorized route handling must redirect to a controlled unauthorized page or the correct portal and record route access violation events for backend audit where appropriate.

UI-level permission enforcement must disable or hide create/update/delete/approve/export controls unless the role and workflow state allow them. This is a usability and enforcement layer only; backend authorization remains authoritative.

### Backend Authorization

Node.js API authorization is enforced by authentication middleware, RBAC middleware, ownership checks, department scope checks, assignment checks, and workflow-state checks before every protected operation.

Service-to-service access between Node.js, AI Gateway, and Python face recognition service must be authenticated and restricted to internal service routes. Gemini is called only by the backend AI Gateway and must not be called directly from the frontend for operational actions.

MongoDB collection-level access should be mediated through backend services and database users with least privilege. Application users must not receive direct MongoDB credentials. Service database accounts should be separated by operational need where practical.

Admin privilege separation must distinguish ordinary Admin from Super Admin-controlled role/permission and high-risk settings functions. System Auditor is read-only and redacted. IT Support Engineer has operational metadata access only unless break-glass approval is recorded.

AI service access is limited to chatbot orchestration, RAG retrieval, policy checks, safety filtering, tool-call validation, AI audit/error logging, and human escalation. Gemini must not directly write to `complaints`, `attendance`, `notifications`, or any operational collection.

Face recognition service access is limited to enrollment, liveness, embedding, match scoring, confidence decision support, and attendance-verification responses through the Node.js backend. Direct face template reads/writes must be service-controlled, consent-bound, and audited.

Audit log access is restricted to Admin, Super Admin, and System Auditor with read-only controls for auditors. Audit logs must be append-only from application flows and protected from ordinary delete/update operations.

RBAC enforcement points are React route guards, API middleware, service method checks, Mongoose/JSON Schema validation, workflow-state checks, and MongoDB database user privileges.

Department-level access control applies to `department_members`, complaint assignment/worklists, department dashboards, file tracking internal notes, attendance views, and department performance data.

Ownership-based access applies to citizen profile, citizen complaints, citizen feedback, citizen chatbot sessions, citizen file/certificate/tax/payment records where applicable, and staff own attendance ledger.

Public access is limited to public landing content, service directory entries, announcements, login/register/password reset, and public file tracking notes. Authenticated access is required for citizen, staff, admin, attendance, reports, settings, and private complaint data.

## 7. Data Security Architecture

| Data category             | Sensitivity             | Storage location / collection                     | Encryption requirement                                      | Access restriction                                   | Retention requirement                                          | Audit requirement                             |
| ------------------------- | ----------------------- | ------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------- |
| Citizen profile data      | Confidential            | `users`, `citizen_addresses`, preferences         | TLS, at rest, FLE for sensitive fields where adopted        | Citizen own, admin authorized                        | Municipality policy                                            | Profile changes audited                       |
| Authentication data       | Restricted              | `users`, `auth_sessions`, `password_reset_tokens` | bcrypt passwords, hashed reset/refresh tokens, TLS, at rest | Auth service/admin limited                           | Session/reset TTL per policy                                   | Login/logout/failed/reset audited             |
| Complaint records         | Confidential            | `complaints`                                      | TLS, at rest, FLE for sensitive fields where needed         | Owner, assigned staff, department/admin              | Municipality policy                                            | Create/update/assign/status audited           |
| Complaint attachments     | Confidential            | `files` with storage key                          | Encrypted object storage, checksum                          | Owner/assigned/admin                                 | Municipality policy                                            | Upload/download/delete audited                |
| File tracking data        | Public to Confidential  | `file_tracking`, `file_tracking_history`          | TLS, at rest                                                | Public notes public; internal notes staff/admin only | Municipality policy                                            | Updates audited                               |
| Certificate data          | Confidential            | `certificates`, `certificate_types`               | TLS, at rest                                                | Owner/staff/admin                                    | Municipality policy                                            | Generate/approve audited                      |
| Tax records               | Confidential            | `properties`, `tax_records`                       | TLS, at rest, FLE as needed                                 | Owner/staff/admin                                    | Municipality policy                                            | Changes audited                               |
| Payment records           | Confidential            | `payments`, `payment_events` if adopted           | TLS, at rest                                                | Owner/admin/auditor                                  | Municipality policy                                            | Payment events audited                        |
| Feedback                  | Confidential/Internal   | `feedback`                                        | TLS, at rest                                                | Owner, assigned/admin analytics                      | Municipality policy                                            | Submission/report use audited                 |
| Attendance records        | Confidential            | `attendance`, `attendance_summary`                | TLS, at rest                                                | Staff own, department/admin/auditor                  | Attendance retention per municipality rules                    | Create/update/override audited                |
| Staff presence            | Internal/Confidential   | `staff_presence`                                  | TLS, at rest                                                | Staff own, department/admin dashboards               | Current-state lifecycle per policy                             | Presence changes from attendance logged       |
| Face templates            | Restricted              | `face_templates`                                  | AES-256 encrypted embedding, KMS key ID, at rest, TLS       | Service-controlled metadata only                     | Delete on consent withdrawal, employment end, retention expiry | Enroll/delete/verify audited                  |
| Biometric consent records | Restricted              | `biometric_consents`                              | TLS, at rest, FLE as needed                                 | Staff own status, admin/auditor                      | Consent lifecycle per policy                                   | Create/revoke/delete request audited          |
| Chatbot sessions          | Confidential            | `chatbot_sessions`                                | TLS, at rest, redaction metadata                            | Owner/admin/auditor redacted                         | Six-month chat retention where approved                        | Session/escalation audited                    |
| Chatbot messages          | Confidential            | `chatbot_messages`                                | TLS, at rest, redaction                                     | Owner, human handoff, admin/auditor redacted         | Six-month chat retention where approved                        | Safety/tool actions audited                   |
| Knowledge base            | Internal/Public         | `knowledge_base`                                  | TLS, at rest                                                | Public if published/visible; RBAC for write          | Municipality policy                                            | Publish/archive/delete audited                |
| KB embeddings             | Internal                | `kb_embeddings`                                   | TLS, at rest                                                | Backend/AI service/admin metadata                    | Regenerate/cleanup by policy                                   | Rebuild/retrieval use audited through AI logs |
| AI audit logs             | Restricted              | `ai_audit_logs`                                   | TLS, at rest, time-series controls                          | Admin/Super Admin/Auditor                            | Municipality-approved AI retention                             | Required for AI decisions/actions             |
| AI error logs             | Restricted/Internal     | `ai_errors`                                       | TLS, at rest                                                | Admin/IT support/auditor                             | Municipality-approved AI retention                             | Required for failures/fallbacks               |
| Report exports            | Confidential/Restricted | `report_exports`, `files`                         | Encrypted storage, expiring access                          | Admin/Super Admin, auditor approved                  | Expiry/retention by municipality policy                        | Every export audited                          |
| System settings           | Restricted/Internal     | `system_settings`                                 | TLS, at rest; no plaintext secrets                          | Admin/Super Admin/IT support scoped                  | Municipality policy                                            | Every change audited                          |

## 8. Face Recognition Security Architecture

Staff biometric consent is mandatory before enrollment or attendance verification. `biometric_consents` must record staff ID, consent status, source, policy version, dates, revocation/deletion metadata, and retention expiry where applicable. Consent must be active before any face template enrollment or AI attendance verification.

Face enrollment is initiated only through authorized admin/staff enrollment workflows and is processed by the Python face recognition service through the Node.js backend. The service performs capture validation, face detection, embedding creation, and stores only encrypted template material through controlled backend APIs.

Face template creation stores encrypted embeddings in `face_templates`, bound to `staff_id` and `consent_id`, with `model_version`, `template_version`, `enrolled_at`, `status`, `retention_expires_at`, `deleted_at`, and `deletion_reason` as required by the database architecture. Raw facial images must not be stored permanently unless legally required by approved municipality policy. The database architecture stores encrypted embeddings/templates instead of raw photos.

Encrypted face embeddings require AES-256 encryption with KMS-managed keys. `encryption_key_id` records the KMS key version. Plaintext embeddings must not be logged or exposed through admin screens.

Template versioning supports model upgrades and template rotation while preserving audit history. New model versions may create new `face_templates`; old templates must be revoked/deleted according to retention and consent rules.

Consent revocation disables future biometric verification, sets active templates to revoked/deleted, records revocation/deletion metadata, removes encrypted template material according to the approved cleanup job, and preserves audit metadata required by policy.

Liveness checks occur before embedding match decisions. Failed liveness must not create automatic face attendance; it must trigger retry, manual review, or PIN/manual fallback and be recorded in `attendance`, `ai_errors`, `ai_human_review_queue`, and/or `ai_audit_logs` as applicable.

Confidence decisions use face match score, liveness result, confidence score, and policy thresholds. High-confidence matches create attendance events. Low-confidence matches route to manual review or fallback.

Manual review is represented through `ai_human_review_queue` for low-confidence biometric matches, failed liveness, manual attendance, and exceptions. Reviewer decisions are linked to attendance and AI audit records.

PIN/manual fallback must remain available for low confidence, failed liveness, mismatch, outages, camera/GPS failure, or absent/revoked consent. Fallback use is recorded through `verification_method`, `manual_fallback_used`, `fallback_reason`, and review/audit records.

Attendance event creation writes to the immutable `attendance` event log and updates `staff_presence` as the current state. Dashboards use `staff_presence` rather than scanning attendance history.

Biometric audit logging must record enroll, verify, revoke, disable, delete, retention cleanup, low-confidence decision, failed liveness, fallback, device ID, consent status, model version, match confidence, timestamp, and reviewer where applicable in `audit_logs`, `ai_audit_logs`, or `biometric_access_audit` if already adopted.

Frontend webcam permission workflow must only execute inside an authorized attendance scanner route. The React app must request browser camera permission, handle denial safely, prevent unauthorized scanner access, and never treat webcam access as proof of authorization.

## 9. AI Chatbot Security Architecture

Gemini API access is allowed only from the backend through the AI Gateway. The frontend must call Node.js APIs, not Gemini directly. Gemini API keys must be stored outside MongoDB in a secrets manager; MongoDB may store only non-secret key identifiers or configuration references in `system_settings`.

The AI Gateway manages prompts, API keys, rate limits, retries, policy checks, error normalization, correlation IDs, guardrail versions, and safe fallback behavior. The Chat Orchestrator coordinates authenticated/public context, retrieval, guardrails, Gemini calls, tool-call validation, ticket creation, human escalation, and audit logging.

Guardrails enforce approved-topic boundaries, PII redaction, prompt injection defense, unsafe response filtering, structured output validation, and safe fallback messages.

Approved knowledge base retrieval uses `knowledge_base`, `kb_embeddings`, MongoDB Atlas Vector Search, `retrieval_allowed: true`, `visibility`, approval metadata, and retrieval source IDs. Gemini responses must be grounded in approved municipal content.

Retrieval allowlists must enforce caller channel and role visibility. Public chatbot responses can use public/retrievable content; staff/admin contexts may use additional approved internal knowledge only when RBAC permits.

Prompt injection defense requires separating user content from system/developer instructions, using retrieval allowlists, validating structured outputs, blocking unapproved tool calls, and recording policy decisions and safety flags.

Structured model output validation must occur before backend actions. Tool-call validation must verify user authorization, target entity, workflow state, department/ownership scope, and rate limits before any operational action.

Ticket creation must occur only through backend APIs that create/update `complaints` and related records. Gemini must not directly write to operational MongoDB collections.

Human escalation is required for low-confidence chatbot answers, safety flags, requested handoff, ticket escalation, or AI exceptions. Escalations create or reference `ai_human_review_queue`, `notifications`, `chatbot_sessions`, `chatbot_messages`, and `ai_audit_logs`.

Redacted transcripts are stored in `chatbot_sessions` and `chatbot_messages` with redaction metadata. Chat log retention is six months where approved, per the AI/database/SRS alignment; final retention must be implemented through TTL or cleanup jobs according to municipality governance.

AI audit logging records service name, model name, prompt/guardrail versions, retrieval sources, prompt/response hashes, safety flags, policy decisions, fallback action, tool validation, operational entity links, PII redaction status, correlation ID, and reviewer data where applicable.

AI error logging records provider outages, guardrail failures, Gemini failures, RAG retrieval errors, tool-call errors, ticket service failures, face capture/liveness/match failures, database write errors, notification failures, queue worker errors, fallback action, retry count, and correlation ID.

Safe fallback messages must avoid exposing internal errors or sensitive data and should offer human escalation, retry, or manual service guidance.

## 10. Audit Logging Architecture

Audit logging uses `audit_logs` for operational/security events, `ai_audit_logs` for AI decisions/actions, `ai_errors` for AI and service failures, and `biometric_access_audit` only where already adopted as a hardening extension.

Events to track are login, logout, failed login, password reset request/completion, session revocation, role changes, permission changes, user management actions, complaint creation/update/assignment, complaint status changes, file tracking updates, certificate generation/approval, tax record changes, payment events, feedback/report actions, attendance creation/update/override, biometric consent creation/revocation/deletion request, face template enrollment/deletion, knowledge base create/update/publish/archive/delete, chatbot actions, AI safety flags, AI errors, human review decisions, data exports, report download, system settings changes, route access violations, and unauthorized access attempts.

Recommended `audit_logs` schema:

```text
audit_logs {
  _id,
  timestamp,
  actor_user_id,
  actor_role_id,
  actor_department_id,
  action_type,
  entity_type,
  entity_id,
  operation: view|create|update|delete|approve|export|login|logout|failed_login|reset|unauthorized,
  before_hash,
  after_hash,
  ip_address,
  user_agent,
  request_id,
  correlation_id,
  outcome: success|failure|blocked,
  reason_code,
  metadata_redacted,
  created_at
}
```

AI audit log usage follows the database architecture fields: action type, service name, model name, policy decision, timestamp, correlation ID, user ID where user-scoped, retrieval KB/chunk IDs, tool-call validation result, safety flag, fallback action, PII redaction status, prompt/response hashes, operational entity type/ID, and reviewer links.

Retention policy must follow municipality-approved governance. Six-month chatbot retention is supported where approved. Attendance retention follows municipality attendance rules. AI audit/error retention must be approved by municipality governance and, if longer than transcripts, should retain hashes, redacted metadata, and correlation IDs rather than sensitive content.

Access rules allow Admin/Super Admin and System Auditor read access, with auditors read-only. Staff and citizens do not access audit logs. IT Support may access operational metadata and correlation IDs only where support-scoped.

Tamper protection strategy is append-only writes, no ordinary update/delete access, database RBAC separation, export monitoring, checksum/hash fields, backup of logs, and alerting on attempted log deletion or modification.

Export monitoring requires every CSV/PDF report export to create a `report_exports` record, link generated files, log filters/row counts/status, audit requestor and download, and monitor repeated or unusually broad exports.

## 11. API Security Architecture

The Node.js backend must enforce JWT middleware on protected APIs, validating signature, expiry, issuer/audience where configured, session ID, and revocation status in `auth_sessions`.

RBAC middleware must load role, permissions, department membership, ownership, assignment, and workflow state. All create/update/delete/approve/export actions require explicit permission checks.

Request validation must use schema validation for route parameters, body payloads, file metadata, query filters, pagination, date ranges, ObjectId formats, enum values, and confidence score bounds.

Rate limiting must protect login, password reset, public file tracking, chatbot, complaint submission, file upload, attendance scanner, report export, and admin endpoints. AI Gateway rate limits must log policy decisions in `ai_audit_logs`.

CORS policy must allow only approved frontend origins and methods. Credentials must be restricted to the intended deployment origin.

Secure headers should include HSTS under HTTPS, content type protections, frame protections as appropriate, referrer policy, and content security controls aligned with the React app.

Error responses must be standardized with correlation ID, generic user-safe message, error code, and no stack traces or secrets. The same correlation ID should appear in `ai_errors`, `audit_logs`, and user-facing API errors where applicable.

Input sanitization and NoSQL injection protection must prevent raw user-controlled objects from becoming MongoDB operators. Use allowlisted query construction, strict schemas, ObjectId validation, and rejection of `$`/operator injection in filterable fields.

File upload validation must enforce allowed MIME types, file size limits, checksum, malware scanning where available, storage key isolation, file role, owner, related entity, and download authorization. Complaint attachments, resolution proofs, receipts, report exports, directory downloads, and profile photos use `files` metadata.

Public endpoint restrictions apply to announcements, service directory, public file tracking, login/register/password reset, and limited chatbot modes where enabled. Public endpoints must be rate-limited and must not expose internal notes, officer notes, audit notes, private complaint data, or bulk records.

Admin endpoint restrictions apply to user management, staff management, reports, attendance analytics, settings, KB publish/archive, and exports. High-risk admin endpoints require stronger audit and may require Super Admin approval.

AI endpoint restrictions require backend-only Gemini calls, guardrails, retrieval allowlists, tool-call validation, redacted logging, and no direct model writes.

Attendance endpoint restrictions require staff/admin authentication, attendance permission, active consent for face verification, device/location validation where used, liveness/confidence decision, fallback path, and audit logging.

Report export restrictions require RBAC, filter validation, row-count recording, expiry, generated-file access control, `report_exports`, `files`, and `audit_logs` entries.

## 12. Frontend Security Architecture

React security architecture uses separated public, citizen, staff, and admin UI surfaces with role-based routing and authenticated API calls to the Node.js backend. The frontend reflects permissions, but it is not the authoritative security boundary.

Route guard design must implement guest routes, protected routes, role-based route access, session checks, token expiration handling, and unauthorized route handling. Direct URL navigation to another portal must be blocked by route metadata and backend authorization.

Protected routes include citizen profile/grievances/feedback/chatbot history, staff worklists/resolution console/attendance scanner/attendance ledger, and admin users/triage/reports/analytics/settings.

Guest routes include public landing, public file tracking, schemes/permits/service directory, login, registration, and password reset.

Citizen portal isolation prevents citizens from rendering staff/admin routes or viewing internal notes. Staff portal isolation prevents staff from rendering admin-only user/settings/export screens. Admin portal isolation prevents public/citizen-only workflows from being confused with privileged operations and requires authenticated admin roles.

Authentication state management must store minimal state, clear it on logout or refresh failure, and avoid exposing secrets. Token handling must prefer secure cookie strategies where implementation permits; otherwise short-lived tokens, refresh revocation, XSS controls, and strict CSP are required.

Session expiration handling must refresh valid sessions or force logout. Logout enforcement must clear client state and revoke backend `auth_sessions`.

Unauthorized access handling must show a controlled unauthorized page/redirect and optionally send route access violation telemetry to the backend for `audit_logs`.

Secure API communication requires HTTPS/TLS, authenticated requests, no direct MongoDB or Gemini access from browser code, and consistent correlation IDs for errors.

File upload restrictions in the UI must validate type, size, and expected file role before upload, while relying on backend validation as authoritative.

Attendance scanner security requires protected staff/admin route access, webcam permission prompt only after authorization, visible failure states for camera denial/service error/low confidence, and fallback workflows.

Webcam permission security requires user consent at browser level and must not store raw face images permanently in the frontend or backend. Captures should be transmitted only to the authorized backend/face service flow.

Client-side validation improves usability for forms, complaint submissions, file tracking, password reset, report filters, and attendance scanner inputs; backend validation remains mandatory.

Frontend audit events should include route access violations, logout, token expiration redirects, scanner permission denials, and unauthorized UI action attempts when security-significant.

Client-side controls can be bypassed by direct API calls; therefore backend RBAC, ownership, department, assignment, and workflow-state authorization remain authoritative.

## 13. Database Security Architecture

MongoDB Atlas is the target platform with Mongoose, JSON Schema validation, Field Level Encryption, Atlas Search, Atlas Vector Search, time-series collections, geospatial indexes, RBAC, audit logging, KMS-backed encryption, and government-grade data governance.

MongoDB Atlas access model should use private or restricted network access where deployment permits, TLS in transit, database users with least privilege, separate service credentials, controlled admin access, and audited administrative actions.

Mongoose schema validation must enforce application-level required fields, enum values, ObjectId references, ownership fields, status transitions, confidence score bounds, file roles, and AI/biometric metadata.

JSON Schema validation in MongoDB must reject invalid documents for critical collections. The database architecture explicitly requires validation for `biometric_consents`, `face_templates`, `password_reset_tokens`, `ai_audit_logs`, and face-verified `attendance` fields.

Field-level encryption should protect sensitive fields such as biometric templates, high-risk PII, authentication-adjacent data, and other municipality-approved sensitive fields. `face_templates.encrypted_embedding` requires AES-256 encryption using KMS-managed keys.

Encryption at rest must be enabled through MongoDB Atlas. TLS in transit must be enforced for all app-to-database connections.

KMS-backed encryption must govern biometric template encryption and any other FLE key material. Key IDs may be stored; raw key material must not be stored in MongoDB.

RBAC for database users must separate application service accounts, migration/admin accounts, read-only audit/reporting users where used, and operational support access. Human users should access data through application/admin tools rather than direct DB credentials.

Index security considerations include preventing indexes from becoming data disclosure channels through unrestricted query APIs. Atlas Vector Search over `kb_embeddings` must only retrieve approved, role/channel-visible chunks. Geospatial indexes on complaint/attendance location must be access-controlled.

Backup protection requires encrypted backups, restricted restore privileges, audit of restore operations, and separate protection for audit logs and report export files.

Audit logging should cover database/admin operations and application audit events. Time-series logs for `ai_audit_logs` and `ai_errors` must be protected as restricted operational records.

Vector search security requires `retrieval_allowed`, `visibility`, approval status, content hash, and retrieval source logging. The AI Gateway must never retrieve archived/unapproved knowledge chunks for Gemini grounding.

Secret storage restrictions are absolute: plaintext API keys, database credentials, private keys, backup secrets, raw reset tokens, plaintext passwords, and raw biometric embeddings must not be stored in MongoDB. `system_settings` may store only non-secret configuration or secret-manager reference identifiers.

## 14. Threat Modeling

| Threat                      | Affected module            | Impact                        | Likelihood | Risk     | Mitigation                                                      | Relevant collection/control                        |
| --------------------------- | -------------------------- | ----------------------------- | ---------- | -------- | --------------------------------------------------------------- | -------------------------------------------------- |
| Unauthorized access         | Portals/APIs               | Data exposure                 | Medium     | High     | JWT, route guards, RBAC middleware                              | `auth_sessions`, `roles`, `permissions`            |
| Privilege escalation        | Admin/RBAC                 | Full system misuse            | Medium     | Critical | Separation of duties, Super Admin control, audit                | `roles`, `permissions`, `audit_logs`               |
| Brute force login           | Auth                       | Account takeover              | Medium     | High     | Rate limits, lockout policy, failed login audits                | `users`, `auth_sessions`, `audit_logs`             |
| Credential theft            | Auth/frontend              | Session compromise            | Medium     | High     | bcrypt, secure cookies/token handling, TLS, session revocation  | `users`, `auth_sessions`                           |
| Session hijacking           | Auth/API                   | Unauthorized operations       | Medium     | High     | Short JWT expiry, refresh rotation, revocation, device metadata | `auth_sessions`                                    |
| NoSQL injection             | API/database               | Data disclosure/tampering     | Medium     | High     | Strict validation, allowlisted filters, operator rejection      | API middleware, Mongoose schemas                   |
| Cross-site scripting        | React frontend             | Token/data theft              | Medium     | High     | Output encoding, CSP, sanitization, safe markdown rendering     | Frontend controls                                  |
| Cross-site request forgery  | Authenticated API          | Unauthorized state change     | Low/Medium | Medium   | SameSite cookies, CSRF tokens where cookies are used, CORS      | API/session controls                               |
| File upload abuse           | Complaints/files/reports   | Malware/storage abuse         | Medium     | High     | MIME/size validation, scanning, checksum, access control        | `files`                                            |
| Data tampering              | Operational records        | Integrity loss                | Medium     | High     | RBAC, workflow-state checks, audit logs                         | `complaints`, `attendance`, `tax_records`          |
| Insider misuse              | Admin/staff                | Privacy breach                | Medium     | High     | Least privilege, export monitoring, audit review                | `audit_logs`, `report_exports`                     |
| Malicious staff actions     | Complaints/attendance      | False updates/fraud           | Medium     | High     | Assignment checks, proof requirements, review queues            | `complaint_assignments`, `attendance`              |
| Report export misuse        | Reports                    | Bulk data leakage             | Medium     | High     | RBAC, row counts, expiry, audit, approval                       | `report_exports`, `files`                          |
| AI prompt injection         | Chatbot/RAG                | Unsafe or false response      | Medium     | High     | Guardrails, retrieval allowlists, structured validation         | `knowledge_base`, `kb_embeddings`, `ai_audit_logs` |
| Unsafe chatbot response     | Chatbot                    | Citizen harm/confusion        | Medium     | High     | Approved content, safety filtering, human escalation            | `chatbot_messages`, `ai_human_review_queue`        |
| Gemini outage               | AI chatbot                 | Service degradation           | Medium     | Medium   | Retries, circuit breaker, safe fallback, error logs             | `ai_errors`                                        |
| AI tool-call abuse          | Chatbot/actions            | Unauthorized complaint/action | Medium     | High     | Backend-only tool validation and RBAC                           | AI Gateway, `complaints`                           |
| Face spoofing               | Attendance                 | Attendance fraud              | Medium     | High     | Liveness detection, confidence thresholds, manual review        | `attendance`, `ai_human_review_queue`              |
| Low-confidence face match   | Attendance                 | False positive/negative       | Medium     | High     | Manual review, PIN/manual fallback, audit                       | `attendance`, `ai_audit_logs`                      |
| Biometric data leakage      | Face templates             | Severe privacy breach         | Low/Medium | Critical | AES-256 KMS encryption, no raw photos, restricted access        | `face_templates`                                   |
| Consent bypass              | Biometric attendance       | Privacy violation             | Low/Medium | Critical | Active consent check before enrollment/verification             | `biometric_consents`                               |
| API abuse                   | Public/API                 | Availability/data risk        | Medium     | High     | Rate limits, validation, IP monitoring                          | API Gateway                                        |
| DDoS                        | Public services            | Availability loss             | Medium     | High     | Rate limits, upstream protection, graceful degradation          | Public endpoints                                   |
| Backup corruption           | DR                         | Recovery failure              | Low/Medium | High     | Restore testing, backup integrity checks                        | Atlas backups                                      |
| Audit log tampering         | Audit/compliance           | Loss of accountability        | Low/Medium | Critical | Append-only, RBAC, backups, monitoring                          | `audit_logs`, `ai_audit_logs`                      |
| Route guard bypass attempts | Frontend/API               | Unauthorized API calls        | High       | Medium   | Backend authorization as authority, route violation logging     | React guards, API RBAC                             |
| Frontend token theft        | React/auth                 | Account takeover              | Medium     | High     | XSS prevention, secure token storage, short expiry              | Frontend/session controls                          |
| Unauthorized portal access  | Citizen/staff/admin routes | Data exposure                 | Medium     | High     | Portal segregation, route guards, backend RBAC                  | Frontend routes, API middleware                    |

## 15. Security Controls

Input validation must be applied at React forms, API schemas, Mongoose models, and MongoDB JSON Schema validation. Output encoding must protect React rendering, safe markdown responses, public notes, officer notes, chatbot messages, and report displays.

Request rate limiting must protect public and high-risk APIs, including login, password reset, chatbot, file tracking, uploads, scanner, and report exports. CAPTCHA may be used for public abuse prevention on registration, password reset, complaint submission, chatbot public use, and public file tracking where abuse is observed.

IP monitoring should detect brute-force login, reset abuse, export abuse, repeated scanner failures, and chatbot abuse. HTTPS/TLS is mandatory for frontend, backend, service-to-service, and MongoDB connections.

Secure cookie/token handling must use HttpOnly/Secure/SameSite cookies where adopted or short-lived tokens with refresh revocation where browser storage is used. Secure headers and CORS restrictions must match approved frontend origins.

CSRF protection is required where cookie-authenticated state-changing APIs are used. NoSQL injection prevention requires allowlisted query construction and operator rejection.

File upload scanning, MIME/size validation, checksum, storage-key isolation, and `files` metadata access rules are required. Audit trails must cover security-sensitive and operational actions.

Secrets management must store Gemini API keys, DB credentials, private keys, encryption keys, and backup secrets outside MongoDB. Error redaction must remove stack traces, secrets, tokens, raw prompts where unnecessary, and sensitive PII from user-facing responses.

AI output filtering must enforce guardrails, retrieval grounding, safe fallbacks, PII redaction, and human escalation. Biometric encryption must use AES-256/KMS for face templates and no permanent raw face image storage.

Backup encryption, backup access control, frontend route protection, session security, and report export monitoring must be implemented before production.

## 16. Backup and Disaster Recovery Security

MongoDB Atlas backups must be encrypted, access-controlled, monitored, and restore-tested. Daily, weekly, monthly, and offsite backup schedules are supported as recommended operational controls; exact retention durations must be finalized by municipality policy because the uploaded documents do not provide legal retention durations for every data category.

Daily backups should protect operational continuity for complaints, attendance, sessions where appropriate, file tracking, certificates, tax records, feedback, knowledge base, AI audit/errors, report exports metadata, and system settings. Weekly backups should provide broader recovery checkpoints. Monthly backups should support longer-term recovery requirements approved by the municipality. Offsite backup should protect against regional or account-level failure.

Backup encryption must protect data at rest and in transfer. Backup access control must restrict backup listing, export, and restore to authorized Admin/Super Admin/IT operations with audit logging. Backup restore testing must verify MongoDB data, audit logs, AI logs, file metadata, report export references, and system settings references.

Audit log backup must preserve `audit_logs`, `ai_audit_logs`, and `ai_errors` integrity. Report export backup handling must respect export expiry and prevent retained backups from becoming uncontrolled bulk disclosure.

Recommended RTO is municipality-policy dependent; for architecture planning, citizen service and complaint intake should target same-business-day restoration unless municipality operations require a stricter objective. Recommended RPO should be aligned with Atlas backup capabilities and municipality tolerance for complaint/attendance data loss; daily backup is the minimum pattern reflected in the requested scope, with shorter RPO finalized by policy.

Backup retention model: daily short-term, weekly medium-term, monthly long-term, and offsite encrypted copies, all finalized by municipality policy. Chat transcripts support six-month retention where approved. Attendance, tax, certificates, and audit retention must follow municipality rules.

Disaster recovery steps are: declare incident, freeze affected credentials/sessions if compromise is suspected, identify last known good backup, restore to controlled environment, validate schema/indexes/vector indexes, validate audit continuity, rotate secrets where needed, verify application health, verify report/file references, resume services, and record DR actions in `audit_logs`.

## 17. Incident Response Plan

Authentication breach: detect failed-login spikes, unusual sessions, or token misuse; contain by revoking `auth_sessions`, locking affected accounts, rotating credentials, and forcing password reset; investigate audit logs and IP/device metadata; recover by restoring trusted access; communicate to affected users per municipality process; improve lockout, rate limits, and MFA readiness.

Role/permission misuse: detect role changes and privilege anomalies; contain by reverting unauthorized permission assignments and suspending accounts; investigate `audit_logs`; recover RBAC baseline; communicate to municipal authority; improve approval and separation-of-duty controls.

Data leakage: detect unusual downloads, exports, or API access; contain by revoking sessions and export URLs; investigate `report_exports`, `files`, and audit logs; recover by rotating exposed links and restoring access controls; communicate per municipal governance; improve export approval and monitoring.

AI chatbot unsafe response: detect safety flags, user reports, or human escalation; contain by disabling affected prompt/knowledge entry or routing to safe fallback; investigate `chatbot_messages`, retrieval IDs, `ai_audit_logs`, and `ai_errors`; recover by correcting approved knowledge/guardrails; communicate corrected guidance; improve prompt injection tests and review workflow.

Gemini failure: detect provider errors or circuit breaker activation; contain by safe fallback and human escalation; investigate `ai_errors`; recover when provider/API Gateway is healthy; communicate service degradation; improve retry/backoff and fallback content.

Face recognition failure: detect high failure/low-confidence rates; contain by manual/PIN fallback; investigate liveness/camera/model/device/correlation logs; recover service or template quality; communicate attendance process guidance; improve thresholds and device checks.

Biometric data incident: detect unauthorized template access, consent bypass, or encryption/key issue; contain by disabling biometric verification, revoking service credentials, rotating KMS keys where required, and preserving evidence; investigate `face_templates` metadata, `biometric_consents`, `audit_logs`, `ai_audit_logs`; recover through re-enrollment only with consent; communicate to employees; improve encryption/access controls.

Audit log tampering: detect modification/delete attempts or integrity mismatch; contain by revoking privileged accounts; investigate database/admin actions; recover from protected backups; communicate to oversight stakeholders; improve append-only and monitoring controls.

Database outage: detect Atlas connectivity/health failures; contain by queueing retryable jobs and showing safe service messages; investigate Atlas status, app errors, and correlation IDs; recover through failover/restore; communicate availability status; improve DR tests.

File/report export leakage: detect unusual export/download; contain by expiring links and disabling export permission; investigate `report_exports`, `files`, `audit_logs`; recover by reissuing authorized reports; communicate internally; improve filter limits and approval.

Frontend security compromise: detect XSS, unauthorized route attempts, or abnormal token behavior; contain by disabling affected release, revoking sessions, and deploying patched frontend; investigate route/audit/API logs; recover with fixed build; improve CSP and dependency review.

Token/session compromise: detect impossible travel, repeated refresh failures, or reported theft; contain by revoking sessions; investigate `auth_sessions`; recover with password reset and token rotation; improve session/device monitoring.

## 18. Compliance and Privacy Architecture

Citizen privacy requires collection minimization, ownership-only access, private complaint controls, public/private file tracking separation, redaction of chatbot transcripts, and report export restrictions.

Employee privacy requires attendance data minimization, consent-bound biometric processing, no permanent raw face image storage, and restricted access to staff presence/attendance analytics.

Biometric consent must be explicit, recorded in `biometric_consents`, bound to `face_templates`, and required before enrollment or verification. Biometric revocation must disable verification and trigger template revocation/deletion workflow. Face template deletion must remove encrypted template material when consent is withdrawn, employment ends, or retention expires while preserving deletion metadata and audit evidence required by policy.

Chat transcript redaction must reduce sensitive content in `chatbot_sessions` and `chatbot_messages`; long-retained AI logs should store hashes, redacted metadata, and correlation IDs rather than unnecessary sensitive prompt/response text.

Data minimization applies to Aadhaar hashing, prompt/response hashes, no raw reset tokens, no plaintext secrets, no raw biometric photos, and public-only exposure for public routes.

Retention policies must be finalized by municipality governance where not specified. The uploaded architecture supports six-month chat log retention where approved, password reset TTL expiry, biometric deletion on revocation/employment end/retention expiry, and attendance retention according to municipality rules.

Auditability is provided through `audit_logs`, `ai_audit_logs`, `ai_errors`, `report_exports`, and optional `biometric_access_audit` where already adopted.

Least privilege is enforced across roles, routes, APIs, database users, AI services, and support operations. Secure AI usage requires backend-only Gemini access, approved RAG content, guardrails, tool-call validation, redaction, and human escalation.

Frontend privacy considerations include portal isolation, unauthorized route handling, secure token handling, webcam prompt only inside authorized scanner workflow, no permanent browser storage of face captures, and minimized display of sensitive notes.

## 19. Security Implementation Checklist

Immediate security requirements:

- Implement bcrypt password hashing and reject plaintext password storage.
- Implement JWT middleware, refresh sessions, and `auth_sessions` revocation.
- Implement `password_reset_tokens` using hashed tokens and TTL expiry.
- Enforce React route guards for guest, citizen, staff, and admin routes.
- Enforce backend RBAC, ownership, department, assignment, and workflow checks.
- Protect file uploads using `files` metadata, MIME/size validation, and access rules.
- Enforce no raw Aadhaar storage; use `aadhaar_hash` for duplicate checks.
- Enforce no plaintext secrets in MongoDB or frontend code.

Pre-production checklist:

- Validate all Mongoose and JSON Schema rules for critical collections.
- Configure MongoDB Atlas TLS, encryption at rest, RBAC, indexes, Atlas Search, and Atlas Vector Search.
- Implement AI Gateway guardrails, retrieval allowlists, structured output validation, and tool-call validation.
- Implement `ai_audit_logs`, `ai_errors`, and correlation IDs.
- Implement biometric consent checks, AES-256/KMS encrypted face templates, liveness, confidence decisions, and fallback.
- Implement report export RBAC, `report_exports`, file expiry, and audit logs.
- Test route guard bypass, API authorization, NoSQL injection, XSS, CSRF where applicable, upload abuse, and rate limits.

Production deployment checklist:

- Enforce HTTPS/TLS end-to-end.
- Configure secure cookies/token policy and CORS for approved origins.
- Configure rate limits for login, reset, chatbot, public tracking, uploads, scanner, and exports.
- Configure backup schedules, backup encryption, restore access controls, and restore test evidence.
- Configure logging/monitoring for `audit_logs`, `ai_audit_logs`, `ai_errors`, failed logins, export events, and unauthorized route/API access.
- Verify secret manager references for Gemini API, MongoDB credentials, KMS keys, and backup secrets.

Post-deployment monitoring checklist:

- Monitor authentication anomalies, failed logins, session revocations, and password reset abuse.
- Monitor role/permission changes and admin settings changes.
- Monitor chatbot safety flags, prompt injection indicators, Gemini failures, and human review queues.
- Monitor liveness failures, low-confidence face matches, manual fallback rates, and consent revocations.
- Monitor report exports, large downloads, and unusual staff/admin access.
- Review audit logs and restore tests periodically under municipality policy.

Future security enhancements:

- Add MFA/2FA for Admin, Super Admin, report export, role/permission changes, and biometric administration.
- Add stronger anomaly detection for exports, attendance, and chatbot abuse.
- Add formal dual-control approval for role/permission and high-risk settings changes.
- Expand automated security tests for route guards, RAG grounding, prompt injection, and consent revocation.

## 20. Final Security Architecture Summary

Executive security summary: The security architecture uses React route protection for portal segregation, Node.js/Express as the system-of-record security and integration boundary, MongoDB Atlas as the governed database platform, Gemini only through a controlled AI Gateway, and Python face recognition as an internal consent-bound biometric service. The architecture protects citizen services, staff workflows, admin reporting, AI chatbot operations, and face attendance through RBAC, JWT sessions, bcrypt passwords, hashed reset tokens, audit logs, AI audit/error logs, encryption, KMS-backed biometric templates, public/private data separation, and strict backend authorization.

Final security architecture diagram:

```text
Public/Citizen/Staff/Admin React Portals
  |-- Guest routes: landing, public file tracking, login, register, password reset
  |-- Protected routes: citizen portal, staff portal, admin portal, attendance scanner
  |-- Route guards, role navigation, webcam gate, unauthorized handling
        |
        v
Node.js / Express Backend API (system-of-record interface)
  |-- JWT + auth_sessions + bcrypt + password_reset_tokens
  |-- RBAC + ownership + department + assignment + workflow checks
  |-- Audit logs + report_exports + file metadata
  |-- AI Gateway and Chat Orchestrator
  |-- Attendance orchestration
        |                         |
        v                         v
MongoDB Atlas                  AI / Biometric Services
  |-- users/roles/permissions  |-- Gemini API via AI Gateway only
  |-- complaints/files         |-- Guardrails + RAG + tool validation
  |-- file_tracking            |-- Python face recognition service
  |-- certificates/tax/payments|-- Liveness + match + confidence
  |-- attendance/presence      |-- Manual/PIN fallback
  |-- biometric_consents       |
  |-- encrypted face_templates |
  |-- knowledge_base/kb_embeddings
  |-- chatbot_sessions/messages
  |-- audit_logs/ai_audit_logs/ai_errors
```

Critical risks are privileged admin misuse, report export leakage, biometric consent bypass, biometric template exposure, prompt injection, unsafe chatbot response, Gemini outage, low-confidence face match, route guard bypass attempts, frontend token theft, NoSQL injection, file upload abuse, and audit log tampering.

Security scorecard:

| Area                | Readiness                                                   | Notes                                                                                               |
| ------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Authentication      | High, if bcrypt/JWT/auth_sessions/reset TTL are implemented | Supported by SRS Appendix A and database collections                                                |
| Authorization/RBAC  | High, with department/ownership checks                      | Requires strict backend middleware and route guards                                                 |
| Frontend security   | Medium-High                                                 | Route guards and portal segregation must be tested against direct API calls                         |
| Database security   | High                                                        | MongoDB Atlas, validation, FLE, KMS, TLS, RBAC are in scope                                         |
| AI chatbot security | Medium-High                                                 | Depends on guardrails, retrieval allowlists, and tool validation quality                            |
| Biometric security  | Medium-High                                                 | Requires consent enforcement, KMS encryption, liveness, fallback, and deletion jobs                 |
| Auditability        | High                                                        | `audit_logs`, `ai_audit_logs`, `ai_errors`, `report_exports` support traceability                   |
| Backup/DR           | Medium                                                      | Schedule exists as architectural requirement; exact retention/RTO/RPO require municipality approval |
| Compliance/privacy  | Medium-High                                                 | Strong minimization and consent model; policy durations must be finalized                           |

Production readiness assessment: The uploaded architecture is suitable for controlled production preparation if the immediate and pre-production security checklist is completed, route guard and backend RBAC tests pass, MongoDB Atlas security settings are configured, secrets are externalized, report export monitoring is enabled, AI Gateway guardrails are validated, biometric consent/template deletion workflows are tested, and backup/restore evidence is approved by municipality governance.

Final recommendations are to make backend authorization the authoritative control, keep frontend controls as portal and usability enforcement, require active biometric consent before every enrollment/verification, prevent direct Gemini writes to operational collections, use approved knowledge retrieval only, audit every high-risk operation, restrict report exports, keep secrets outside MongoDB, implement restore testing, and finalize unspecified retention/timeouts/RTO/RPO values through municipality policy before production deployment.
