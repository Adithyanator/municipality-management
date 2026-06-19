# Implementation Task Breakdown

**Project:** AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System  
**Version:** 1.0  
**Status:** Approved for Development  
**Author:** Technical Lead & Project Manager  

---

## 1. Project Overview

### 1.1 Project Summary
The AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System is a modern, cloud-based platform designed to digitize citizen interactions and streamline municipal staff tracking. The system integrates a natural language processing assistant (Google Gemini RAG) and Python-based face recognition services (with liveness checking) into a Node.js/Express backend and a React/Tailwind frontend.

### 1.2 Final Modules Being Implemented
1. **Authentication & RBAC:** Session-backed JWT credentials, secure cookie transport, and role-based route middleware.
2. **Citizen Portal:** Grievance intake, profile manager, and personal notification preferences.
3. **Staff Portal:** A Kanban board for assigned task updates, a webcam attendance scanner, and access to manual attendance fallback settings.
4. **Admin Portal:** User role triaging, system configurations, and secure CSV/PDF report exports.
5. **Complaint Management:** A backend service managing complaint status histories, assignments, and resolution uploads.
6. **File Tracking:** A public progress lookup index providing timelines for certificates, taxes, and permits.
7. **Feedback System:** Rating controls that freeze complaint tickets after user review.
8. **Permit and Certificate Services:** Operational metadata registries linking properties, taxes, and receipts.
9. **Government Scheme Information:** A public directory cataloging municipal schemes and downloadable templates.
10. **Staff Attendance:** Biometric face template match checking and liveness validation.
11. **AI Chatbot:** Grounded RAG conversational support utilizing MongoDB Atlas Vector Search.
12. **OCR Services:** Automated document scanners that extract text metadata into restricted schemas.
13. **Audit Logging:** Append-only transaction registries.
14. **Reports and Analytics:** Administrative performance tracking panels.
15. **Handover and Admin Configuration:** Non-secret parameter settings and KMS key management procedures.

### 1.3 Development Strategy
The project follows a **Database-First / API-First approach**. Database models, validations, and security middlewares are initialized before development starts on frontend routing, templates, and integration modules. The project is split into four 1-week sprints, ensuring that functional dependencies are resolved sequentially.

---

## 2. Full Feature List

* **Authentication and RBAC:** Secure registrations, user logins, session revocation tracking, JWT token refreshes, and route role validators.
* **Citizen Portal:** Custom landing dashboard, grievance intake form with photo attachment options, personal contact information manager, and notification settings.
* **Staff Portal:** Dynamic Kanban task board, manual check-in override console, webcam permission gates, and personal attendance ledgers.
* **Admin Portal:** User management panels, department directories, SLA deadline configurations, CSV/PDF report generation, and security configuration grids.
* **Complaint Management:** Geospatial complaint routing services, SLA policy assignment queues, status history trackers, and photo proof validations.
* **File Tracking:** Public timeline lookups by File ID, split note fields (public tracking details vs internal auditor notes).
* **Feedback System:** Citizen satisfaction rating forms, comments fields, and ticket closure locks.
* **Permit and Certificate Services:** Application status registries, certificate type configurations, and payments mappings.
* **Government Scheme Information:** Public directories searchable by category, and file metadata lists linking download templates.
* **Staff Attendance:** Biometric consent records, face template enrollments, webcam image captures, similarity score computations, liveness checks, and real-time presence caching.
* **AI Chatbot:** Conversational memory orchestrators, prompt guardrails, PII filters, and fallback human reviews queue triggers.
* **OCR Services:** Upload handlers for certificate parsing and automated derived text validations.
* **Audit Logging:** System security logs and AI model decision hashes.
* **Reports and Analytics:** High-volume export queue trackers and dashboard analytics charts.
* **Handover and Admin Configuration:** KMS encryption rotation grids, non-secret variables configurations, and IAM developer access registers.

---

## 3. Team Member Responsibilities

* **Minha Palakkathodi (Requirements, Documentation, Quality Assurance):**
  - Owns SRS requirements validation and traceability mapping.
  - Documents test cases, reviews audit logging layouts, and coordinates user acceptance testing (UAT).
* **Adithyan N (Frontend Lead, Security Review, Project Coordinator):**
  - **Main Frontend Implementer:** Builds React views, Tailwind styles, state managers, and webcam scanner frames.
  - Conducts code reviews, enforces CSRF UI settings, and monitors project deadlines.
* **Fathima Hana (Database Developer):**
  - Builds Mongoose schema structures, database validations, indices, and time-series configs.
  - Implements backup configurations and data retention routines.
* **Muhammad Sanish (Backend / API Developer):**
  - Owns Express server initialization, API controllers, JWT auth routes, and RBAC authorization middlewares.
  - Configures secure cookie transports, input sanitation parameters, and export logic.
* **Fadi Ahmed (UI Support, Testing Developer):**
  - Creates modular React layout shells, tests client routing behaviors, and checks Tailwind design consistency.
  - Conducts cross-browser visual validations.
* **Muhammed Sadik KT (AI & Biometric Service Developer):**
  - Implements the Python biometric face-matching and liveness comparison module.
  - Configures Gemini prompt orchestrations, Vector Search indexing scripts, and OCR parsing APIs.

---

## 4. Sprint-wise Task Breakdown (1-Week Sprints)

### Sprint 1: Foundation Setup (Week 1)
* **Goal:** Initialize backend routes, database structures, UI templates, and authentication guards.
* **Backend:** Express setup, MongoDB Atlas connection, JWT session routing, RBAC middleware, and append-only audit logger.
* **Frontend:** Tailwind initialization, React routing guards, register/login UI, and dashboard layout shells.
* **Database:** Users, roles, permissions, auth sessions, and settings schemas.

### Sprint 2: Core Citizen Services (Week 2)
* **Goal:** Develop core citizen-facing pipelines.
* **Backend:** Upload validation service, complaint registration APIs, feedback endpoints, and public lookup controllers.
* **Frontend:** Citizen dashboard, complaint submission layout, file progress tracking view, and schemes directory.
* **Database:** Complaints, assignments, directories, and files collections.

### Sprint 3: Municipality Operations & AI Integration (Week 3)
* **Goal:** Implement staff portals, biometrics comparison, and RAG chatbot services.
* **Backend:** Face comparison controller, consent tracking APIs, vector search adapters, chatbot session controllers, and queue handlers.
* **AI/Python:** Python face matching module, liveness evaluation scripts, vector index builders, and OCR text extractors.
* **Frontend:** Staff Kanban console, attendance webcam scanner, admin settings panels, and chatbot overlay.
* **Database:** Consents, templates, staff presence, review queue, and chatbot messages.

### Sprint 4: Testing, Security Hardening & Handover Preparation (Week 4)
* **Goal:** Hardening codebases, visual validation, staging deployments, and credential rotations.
* **Backend:** anti-NoSQL query sanitation, Anti-CSRF verification middlewares, CAPTCHA checking parameters, and CSV/PDF exporters.
* **Frontend:** Client form sanitizations, browser camera frame cleanups, and final UI adjustments.
* **Operations:** Backup immutability configurations, staging audits, and credential rotation sheets.

---

## 5. Detailed Task Log (Status: Not Started)

### 5.1 Sprint 1 Tasks (Foundation Setup)

#### TASK-BE-001
* **Task:** Setup Express server
* **Assigned To:** Muhammad Sanish
* **Path:** `backend/`
* **Depends On:** None
* **Deliverable:** Running Express server with health check endpoints.
* **Security:** Use helmet headers, CORS allowlist, and express-rate-limit.
* **Testing:** Verify GET `/health` returns 200 OK.
* **Status:** Not Started

#### TASK-DB-001
* **Task:** Initialize Mongoose models for Auth
* **Assigned To:** Fathima Hana
* **Path:** `backend/src/models/`
* **Depends On:** None
* **Deliverable:** Schema models for `users`, `roles`, `permissions`, and `auth_sessions`.
* **Security:** Mongoose validation rules and sparse, unique indexing.
* **Testing:** Execute schema validation checks.
* **Status:** Not Started

#### TASK-BE-002
* **Task:** Implement JWT & Session Authentication
* **Assigned To:** Muhammad Sanish
* **Path:** `backend/src/controllers/auth.controller.js`
* **Depends On:** TASK-DB-001, TASK-BE-001
* **Deliverable:** Auth API endpoints for login, signup, and logout.
* **Security:** Bcrypt password hashing, session tokens tracked in `auth_sessions`, HTTPOnly secure cookies.
* **Testing:** POST `/api/v1/auth/login` returns token; logout revokes session.
* **Status:** Not Started

#### TASK-BE-003
* **Task:** Implement RBAC & Authorization Middlewares
* **Assigned To:** Muhammad Sanish
* **Path:** `backend/src/middlewares/auth.middleware.js`
* **Depends On:** TASK-BE-002
* **Deliverable:** RBAC route gateway checker.
* **Security:** Backend enforcement of role permission checks, department scopes, and resource ownership.
* **Testing:** Accessing `/api/v1/admin/*` endpoint with a Citizen token returns 403 Forbidden.
* **Status:** Not Started

#### TASK-FE-001
* **Task:** Configure Frontend React boilerplate & Routing
* **Assigned To:** Adithyan N
* **Path:** `frontend/`
* **Depends On:** None
* **Deliverable:** React app with Tailwind CSS configurations and protected browser routes.
* **Security:** Enforce local path route guards verifying token expiries.
* **Testing:** Accessing `/citizen` redirecting unauthenticated sessions to `/login`.
* **Status:** Not Started

#### TASK-FE-002
* **Task:** Build Authentication layouts
* **Assigned To:** Adithyan N
* **Path:** `frontend/src/pages/auth/`
* **Depends On:** TASK-FE-001
* **Deliverable:** UI views for login, citizen registration, and password reset request.
* **Security:** Sanitize inputs and block submission button double-clicks.
* **Testing:** Register form inputs validation checks.
* **Status:** Not Started

#### TASK-QA-001
* **Task:** Formulate Requirements Traceability Matrix
* **Assigned To:** Minha Palakkathodi
* **Path:** `docs/reports/`
* **Depends On:** None
* **Deliverable:** Complete matrix linking requirements to database schemas and APIs.
* **Security:** Review authentication workflow consistency.
* **Testing:** Verification reviews.
* **Status:** Not Started

#### TASK-UI-001
* **Task:** Design Portal Layout Shells
* **Assigned To:** Fadi Ahmed
* **Path:** `frontend/src/components/layout/`
* **Depends On:** TASK-FE-001
* **Deliverable:** Navigation layouts for citizen, staff, and admin views.
* **Security:** Segregate menus based on active roles.
* **Testing:** Visual inspections for responsive resizing.
* **Status:** Not Started

---

### 5.2 Sprint 2 Tasks (Core Citizen Services)

#### TASK-DB-002
* **Task:** Initialize Complaint & Files Schema
* **Assigned To:** Fathima Hana
* **Path:** `backend/src/models/`
* **Depends On:** TASK-DB-001
* **Deliverable:** Schema configurations for `complaints`, `complaint_assignments`, and `files`.
* **Security:** Geospatial indexing on location, file checksum validations.
* **Testing:** Execute collection insert test scripts.
* **Status:** Not Started

#### TASK-BE-004
* **Task:** Develop Complaint API Controllers
* **Assigned To:** Muhammad Sanish
* **Path:** `backend/src/controllers/complaint.controller.js`
* **Depends On:** TASK-DB-002, TASK-BE-003
* **Deliverable:** CRUD API routes for ticket intake, routing, and assignments.
* **Security:** Restrict writes to backend services, log creation events to audit trails.
* **Testing:** Verify POST `/api/v1/citizen/complaints` maps to users' ID.
* **Status:** Not Started

#### TASK-FE-003
* **Task:** Build Citizen Dashboard & Complaint Intake UI
* **Assigned To:** Adithyan N
* **Path:** `frontend/src/pages/citizen/`
* **Depends On:** TASK-FE-002, TASK-UI-001
* **Deliverable:** Complaint registration forms with photo upload frames.
* **Security:** File size limits checks on client payloads.
* **Testing:** Form submission uploads attachment and updates dashboard grids.
* **Status:** Not Started

#### TASK-DB-003
* **Task:** Initialize File Tracking Schemas
* **Assigned To:** Fathima Hana
* **Path:** `backend/src/models/`
* **Depends On:** TASK-DB-002
* **Deliverable:** Schemas for `file_tracking` and `file_tracking_history`.
* **Security:** Add `public_tracking_enabled` flag, separating internal and public comments.
* **Testing:** Check validation constraints on status enums.
* **Status:** Not Started

#### TASK-BE-005
* **Task:** Implement File Tracking APIs
* **Assigned To:** Muhammad Sanish
* **Path:** `backend/src/controllers/tracking.controller.js`
* **Depends On:** TASK-DB-003, TASK-BE-003
* **Deliverable:** Public lookup API for tracking file progress.
* **Security:** Suppress private internal notes from public search API views.
* **Testing:** GET `/api/v1/public/file-tracking/:fileNo` hides `internal_note`.
* **Status:** Not Started

#### TASK-FE-004
* **Task:** Build File Tracking Lookup & Announcements UI
* **Assigned To:** Adithyan N
* **Path:** `frontend/src/pages/public/`
* **Depends On:** TASK-FE-003
* **Deliverable:** Public tracking timelines and announcements view.
* **Security:** Sanitize route parameter variables.
* **Testing:** Check search result renderings for non-existent files.
* **Status:** Not Started

#### TASK-QA-002
* **Task:** Define UAT Test Scripts for Citizen Portals
* **Assigned To:** Minha Palakkathodi
* **Path:** `docs/reports/`
* **Depends On:** TASK-QA-001
* **Deliverable:** Test documentation detailing inputs, expected workflows, and pass criteria.
* **Security:** Verify attachment visibility gates.
* **Testing:** Document verification.
* **Status:** Not Started

#### TASK-UI-002
* **Task:** Verify Responsive Design Consistency
* **Assigned To:** Fadi Ahmed
* **Path:** `frontend/`
* **Depends On:** TASK-FE-003
* **Deliverable:** Visual consistency report for forms and tables.
* **Security:** UI route boundary checks.
* **Testing:** Layout validations across desktop, tablet, and mobile views.
* **Status:** Not Started

---

### 5.3 Sprint 3 Tasks (Municipality Operations & AI Integration)

#### TASK-DB-004
* **Task:** Initialize Biometrics & AI Schemas
* **Assigned To:** Fathima Hana
* **Path:** `backend/src/models/`
* **Depends On:** TASK-DB-002
* **Deliverable:** Schema objects for consents, templates, review queue, and AI logs.
* **Security:** KMS keys references config, time-series logging schemas.
* **Testing:** Check index builds on `kb_embeddings`.
* **Status:** Not Started

#### TASK-AI-001
* **Task:** Develop Python Biometric Face Matching API
* **Assigned To:** Muhammed Sadik KT
* **Path:** `ai-services/face-rec/`
* **Depends On:** None
* **Deliverable:** Local service processing liveness checks and comparing face vectors.
* **Security:** Encryption of templates, zero raw photo storage rules.
* **Testing:** Run validation scripts using test image datasets.
* **Status:** Not Started

#### TASK-AI-002
* **Task:** Construct AI RAG Chatbot Gateway
* **Assigned To:** Muhammed Sadik KT
* **Path:** `ai-services/chatbot/`
* **Depends On:** TASK-DB-004
* **Deliverable:** Conversational model adapter grounded in Vector Search index records.
* **Security:** Redact inputs, apply PII filters, prevent direct writes.
* **Testing:** Verify RAG search returns references to original sources.
* **Status:** Not Started

#### TASK-AI-003
* **Task:** Construct OCR Certificate Parser
* **Assigned To:** Muhammed Sadik KT
* **Path:** `ai-services/ocr/`
* **Depends On:** None
* **Deliverable:** OCR parsing service extracting key fields from uploaded attachments.
* **Security:** Restrict permissions on derived text outputs.
* **Testing:** Validate OCR parser against sample PDFs.
* **Status:** Not Started

#### TASK-BE-006
* **Task:** Implement Attendance & Biometrics APIs
* **Assigned To:** Muhammad Sanish
* **Path:** `backend/src/controllers/attendance.controller.js`
* **Depends On:** TASK-DB-004, TASK-BE-003, TASK-AI-001
* **Deliverable:** Routes for consent collection, face clock-ins, and manual fallback logging.
* **Security:** Consent status checked prior to template enrollments.
* **Testing:** POST `/attendance/face-check` requires active consent status.
* **Status:** Not Started

#### TASK-BE-007
* **Task:** Implement AI Chatbot & Escalation Queue controllers
* **Assigned To:** Muhammad Sanish
* **Path:** `backend/src/controllers/ai.controller.js`
* **Depends On:** TASK-DB-004, TASK-BE-003, TASK-AI-002
* **Deliverable:** Express controllers coordinating chatbot actions and handoff reviews.
* **Security:** Output schemas validation.
* **Testing:** Low-confidence matches create an item in `ai_human_review_queue`.
* **Status:** Not Started

#### TASK-FE-005
* **Task:** Build Staff Attendance Scanner & Kanban Board
* **Assigned To:** Adithyan N
* **Path:** `frontend/src/pages/staff/`
* **Depends On:** TASK-FE-003, TASK-UI-001
* **Deliverable:** Dynamic Kanban interface and biometric check-in UI.
* **Security:** Webcam permission gating, location check validation support.
* **Testing:** Verify camera frame capture trigger rules.
* **Status:** Not Started

#### TASK-FE-006
* **Task:** Build Admin Configuration & AI Review UI
* **Assigned To:** Adithyan N
* **Path:** `frontend/src/pages/admin/`
* **Depends On:** TASK-FE-005
* **Deliverable:** User role updates panels, settings grids, and AI queues view.
* **Security:** Admin role-gate checks on route entry.
* **Testing:** Setting adjustments update parameters correctly.
* **Status:** Not Started

#### TASK-QA-003
* **Task:** Formulate AI Model Evaluation Scripts
* **Assigned To:** Minha Palakkathodi
* **Path:** `docs/reports/`
* **Depends On:** TASK-QA-002
* **Deliverable:** Metrics validation scripts checking matching precision.
* **Security:** Biometric accuracy audits.
* **Testing:** Document verification.
* **Status:** Not Started

#### TASK-UI-003
* **Task:** Build Webcam permission gate components
* **Assigned To:** Fadi Ahmed
* **Path:** `frontend/src/components/scanner/`
* **Depends On:** TASK-FE-005
* **Deliverable:** Camera access prompt modules with visual fallback settings.
* **Security:** Handle camera lockouts or permissions denials safely.
* **Testing:** Check error message displays on permission denials.
* **Status:** Not Started

---

### 5.4 Sprint 4 Tasks (Testing & Security Hardening)

#### TASK-BE-008
* **Task:** Deploy Query Sanitizations & Middleware protections
* **Assigned To:** Muhammad Sanish
* **Path:** `backend/src/middlewares/security.js`
* **Depends On:** TASK-BE-001
* **Deliverable:** NoSQL injection prevention middleware.
* **Security:** Strip special operators (`$`, `.`) from request parameters.
* **Testing:** Verify POST payloads containing MongoDB operators are rejected.
* **Status:** Not Started

#### TASK-BE-009
* **Task:** Integrate anti-CSRF and CAPTCHA checking
* **Assigned To:** Muhammad Sanish
* **Path:** `backend/src/middlewares/captcha.js`
* **Depends On:** TASK-BE-001
* **Deliverable:** Double-submit cookie check and CAPTCHA validation middlewares.
* **Security:** Validate Turnstile tokens on public mutations, enforce same-site cookie tags.
* **Testing:** Requests with missing Turnstile tokens return 400 Bad Request.
* **Status:** Not Started

#### TASK-AI-004
* **Task:** Execute Biometric Model Threshold Tuning
* **Assigned To:** Muhammed Sadik KT
* **Path:** `ai-services/face-rec/`
* **Depends On:** TASK-AI-001
* **Deliverable:** Metric optimization adjustments for cosine similarity bounds.
* **Security:** Minimize false-positive matching rates.
* **Testing:** Run validation scans on verification sets.
* **Status:** Not Started

#### TASK-FE-007
* **Task:** Hardening Frontend Security & Forms
* **Assigned To:** Adithyan N
* **Path:** `frontend/`
* **Depends On:** TASK-FE-006
* **Deliverable:** Sanity checking configurations and browser frame releases.
* **Security:** Release webcam frames on scanner component unmounts, anti-CSRF headers.
* **Testing:** Verify memory cleanup on route transitions.
* **Status:** Not Started

#### TASK-QA-004
* **Task:** Conduct RBAC Penetration Testing
* **Assigned To:** Minha Palakkathodi
* **Path:** `docs/reports/`
* **Depends On:** TASK-QA-003
* **Deliverable:** Penetration testing report logging role boundary results.
* **Security:** Access control verification.
* **Testing:** Verify all endpoints reject unauthorized tokens.
* **Status:** Not Started

#### TASK-UI-004
* **Task:** Run Cross-Browser Layout Verification
* **Assigned To:** Fadi Ahmed
* **Path:** `frontend/`
* **Depends On:** TASK-FE-007
* **Deliverable:** Browser compatibility report.
* **Security:** CSS layout bounds checking.
* **Testing:** Render page views in Chrome, Firefox, and Safari.
* **Status:** Not Started

#### TASK-DB-005
* **Task:** Establish Database Backup Immutability policies
* **Assigned To:** Fathima Hana
* **Path:** `database/`
* **Depends On:** TASK-DB-004
* **Deliverable:** Scripted AWS S3 Object Lock configuration templates.
* **Security:** Immutability constraints, dual-control delete gates.
* **Testing:** Verify simulated delete attempts return Access Denied.
* **Status:** Not Started

---

## 6. Dependency Order

For a smooth implementation lifecycle, developers must strictly adhere to the following sequence. Frontend components, controllers, and services must not be developed before their database models and middlewares are complete.

### 6.1 Authentication & Session Management Flow
```
1. (TASK-DB-001) Schema Models [Hana] 
   └── 2. (TASK-BE-002) Auth API & Session login controllers [Sanish] 
       └── 3. (TASK-BE-003) RBAC Authorization Middlewares [Sanish] 
           ├── 4a. (TASK-FE-001) React Routing Guards [Adithyan] 
           └── 4b. (TASK-FE-002) Login & Register UI [Adithyan]
```

### 6.2 Grievance Intake & File Tracking Flow
```
1. (TASK-DB-002) Complaint & Assignment Schemas [Hana] 
   ├── 2a. (TASK-DB-003) File Tracking Schemas [Hana]
   └── 2b. (TASK-BE-004) Complaint API Controllers [Sanish] 
       ├── 3a. (TASK-BE-005) File Tracking APIs [Sanish]
       │   └── 4a. (TASK-FE-004) Public Timelines Search UI [Adithyan]
       └── 3b. (TASK-FE-003) Citizen Intake Form & Attachments UI [Adithyan]
```

### 6.3 Biometric Staff Attendance Flow
```
1. (TASK-DB-004) Biometrics Collections [Hana] 
   ├── 2a. (TASK-AI-001) Python Similarity Service [Sadik] 
   └── 2b. (TASK-BE-006) Biometrics Consent & Verification APIs [Sanish] 
       └── 3. (TASK-FE-005) Webcam Scanner Gated View [Adithyan]
```

---

## 7. Security Gates

A security checkpoint review must be conducted at the end of each sprint. Features cannot be merged into the `develop` branch if any gate criterion is violated.

### 7.1 Sprint 1 Gates:
- [ ] **No plaintext secrets:** Database passwords, JWT keys, and Turnstile secret keys must be retrieved from environment configurations. No variables committed in repository code.
- [ ] **Bcrypt configurations:** Citizen and employee passwords must be hashed with bcrypt using a workload factor of 10 or higher.
- [ ] **JWT expiration limits:** Access token lifetime configured to 15 minutes or lower, with refresh tokens managed under validation controls.

### 7.2 Sprint 2 Gates:
- [ ] **Resource ownership filters:** Complaint modifications require token user match checks, verified at the backend service layer.
- [ ] **File type gating:** File uploads are restricted to allowlisted MIME-types (e.g. PDF, JPG, PNG) and limited to 5MB.
- [ ] **Scope isolation:** Public file trackers must suppress private comments and internal audit notes.

### 7.3 Sprint 3 Gates:
- [ ] **Biometric consent check:** Biometric verification requests must verify that the user's `biometric_consents.consent_given` is true.
- [ ] **Zero photo retention:** Python face recognition services must process webcam frames in volatile memory, discarding images immediately after comparison.
- [ ] **RAG context bounds:** Gemini prompt controllers must route queries strictly within the retrieved knowledge base text chunks.

### 7.4 Sprint 4 Gates:
- [ ] **Query sanitizations:** Anti-NoSQL injection middleware rejects payloads containing MongoDB operator modifiers.
- [ ] **Anti-CSRF headers:** Cookie transports must be configured as HTTPOnly, secure, and SameSite. Anti-CSRF token verification must be validated on all data-mutating routes.
- [ ] **Backup immutability:** WORM storage locks must be applied to S3 backup volumes.

---

## 8. Review Process

To maintain structural standards, developers must strictly adhere to this code review pipeline:

```
[Feature Branch] 
  ──> 1. Local Visual & Testing Verification
  ──> 2. Submit Pull Request to [develop] 
  ──> 3. Automated Validation Pipeline (formatting, types)
  ──> 4. Assign Reviewers (Peer + Tech Lead)
  ──> 5. Address Comments & Verify Changes
  ──> 6. Merge authorized branch
```

### 8.1 Branching Convention
* `main`: Frozen, production-ready code.
* `develop`: Active integration testing branch.
* `feature/sprint[1-4]-[task_id]-[short_name]`: Individual developer branches (e.g. `feature/sprint1-TASK-BE-001-setup`).

### 8.2 Reviewer Assignment Matrix
* **Database schemas & Mongoose code:** Reviewed by Fathima Hana.
* **Backend Express code & APIs:** Reviewed by Muhammad Sanish.
* **Frontend React components & layouts:** Reviewed by Adithyan N.
* **AI pipelines & biometric comparisons:** Reviewed by Muhammed Sadik KT.
* **Final Authorization gate:** Enforced by Technical Lead (Adithyan N).

### 8.3 Code Review Checklist
1. **Middlewares checks:** Does the endpoint include correlation ID injection, JWT authentication, and RBAC middlewares?
2. **Database validations:** Are parameters validated using schemas before database mutations are executed?
3. **Audit records:** Does the mutation route write to append-only logs (`audit_logs` or `ai_audit_logs`)?
4. **Redaction checks:** Are sensitive values (passwords, raw biometric coordinates) redacted before output data is returned?
5. **NoSQL security:** Are queries sanitised against NoSQL injection?
6. **Webcam cleanup:** Do React scanner components clean up webcam buffers upon unmounting?

---

## 9. Final Development Roadmap

| Week | Sprint | Main Goals | Responsible Members | Expected Output |
| :--- | :--- | :--- | :--- | :--- |
| **Week 1** | **Sprint 1** | Foundation setup, database schemas, auth sessions, and routing guards. | Sanish, Hana, Adithyan, Fadi | Express boilerplates, 42 schemas initialized, login/register views, dashboard shells. |
| **Week 2** | **Sprint 2** | Citizen services, complaint intake, uploads service, and file tracking. | Sanish, Hana, Adithyan, Fadi, Minha | Complaint intake portal, file upload pipeline, public lookup directory timelines. |
| **Week 3** | **Sprint 3** | Biometrics matching, face scanning, and RAG chatbot integration. | Sadik, Sanish, Adithyan, Fadi, Hana | Python face comparison API, vector indices, Kanban dashboard, chatbot overlay. |
| **Week 4** | **Sprint 4** | Hardening codebases, visual validation, and backups setup. | Sanish, Adithyan, Sadik, Fadi, Hana, Minha | Anti-NoSQL filters, CSRF cookies verification, S3 WORM locks, handover sign-offs. |

---

## 10. Document Status

* **Status:** Approved for Development  
* **Tracked Gaps:** Open Issues are tracked separately under Section 9 of the formal [ARCHITECTURE_FREEZE_v1.md](file:///d:/Adhi/kottakkal/docs/09-Handover-Documents/ARCHITECTURE_FREEZE_v1.md) registry.
* All tasks listed in this roadmap are initialized as **Status: Not Started**. No code modifications are marked completed.
