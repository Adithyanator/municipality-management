# Implementation Task Breakdown

**Project:** AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System  
**Version:** 1.3  
**Status:** Rapid MVP Development Plan Approved  
**Author:** Technical Lead & Project Manager

---

## 1. Project Overview

### 1.1 Project Summary

The AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System is a modern, cloud-based platform designed to digitize citizen interactions and streamline municipal staff tracking. The system integrates a natural language processing assistant (Google Gemini RAG) and Python-based face recognition services (with liveness checking) into a Node.js/Express backend and a React/Tailwind frontend.

### 1.2 Final Modules Being Implemented

The system has been refactored for a **1-week rapid delivery timeline** (MVP). Only core modules essential to operation and security are in scope. All other features are deferred to Phase 2.

### 1.3 Development Strategy

The project follows a **Database-First / API-First approach** with a focus on **rapid parallel development**. Database schemas, infrastructure setup, and frontend foundations are developed simultaneously on Day 1, allowing APIs and frontend portals to be integrated progressively from Day 2 through Day 5. Day 6 is a strict integration freeze, and Day 7 is reserved for security review and deployment preparation.

### 1.4 Final Delivery Rule

- **Goal:** Deliver a Secure Working MVP.
- **Priority Order:**
  1. Security (Non-negotiable)
  2. Working Features
  3. Integration
  4. UI Polish
  5. Additional Features

---

## 2. MVP Scope (Must Complete)

The following features must be fully completed and secured within the 1-week timeline:

- **Authentication:** Secure user signup, login, and JWT-based session controls.
- **RBAC:** Core role access check middleware on the backend and route guards on the frontend.
- **Citizen Dashboard:** Central view for citizens to file grievances and view progress.
- **Complaint Management:** Grid and Kanban logs allowing citizens to register complaints and staff to update them.
- **File Tracking:** Public lookup of file processing progress by unique File ID.
- **Feedback System:** Satisfaction rating inputs that lock tickets upon completion.
- **Staff Dashboard:** Workspace for municipal employees to view check-ins and task assignments.
- **Attendance System:** Consent recording and biometric facial recognition check-in (with manual fallback).
- **Admin Dashboard:** Console for user audits, SLA deadline parameters, and settings.
- **Basic AI Chatbot:** Gemini-grounded query responding using RAG over the municipal knowledge base.
- **Basic OCR:** Processing citizen document attachments for metadata verification.
- **Notifications:** Dispatch of toast notifications and database-logged alerts.
- **Audit Logging:** Secure transactional log registry for security events.

_All other features are marked as **Phase 2 / Future Enhancements**._

---

## 3. Non-MVP Features (Can Be Deferred)

The following high-complexity modules are deferred to Phase 2 to ensure timely delivery of the core system:

- **Advanced Analytics:** Dynamic charts plotting department workload analytics and historic timelines.
- **Complex Reports:** High-volume CSV/PDF report query filters and export queue managers.
- **Advanced AI Features:** Automated workflow classifications or intent routing pipelines outside RAG.
- **Voice Assistant:** Multi-language auditory interfaces and local language translation frameworks.
- **Recommendation Engine:** Machine-learning-based matching of citizen profiles to municipal benefits.
- **Workflow Automation:** Automated multi-department document approvals and escalation triggers.

---

## 4. Minimal Required Collections for MVP

To prevent database bottleneck issues, only the following **14 collections** are mandatory before backend coding begins:

1. `users`
2. `roles`
3. `permissions`
4. `departments`
5. `complaints`
6. `complaint_assignments`
7. `file_tracking`
8. `file_tracking_history`
9. `feedback`
10. `notifications`
11. `attendance`
12. `biometric_consents`
13. `audit_logs`
14. `chatbot_sessions`

_All remaining collections (such as `kb_embeddings`, `face_templates`, `announcements`, `password_reset_tokens`, `system_settings`, `ai_errors`, and `ai_audit_logs`) will be created when their corresponding module implementation begins._

---

## 5. Team Member Responsibilities

- **Minha Palakkathodi (Documentation Lead + QA Lead):**
  - Owns SRS requirements validation, database validations, and requirements traceability.
  - Documents test cases, reviews audit logging layouts, coordinates user acceptance testing (UAT), tracks security checklists, prepares handover manuals, and drafts daily testing reports.
- **Adithyan N (Frontend Lead + Project Coordinator + Testing Coordinator):**
  - **Owns the ENTIRE React Frontend:** Builds React views, Tailwind styles, state managers, webcam scanner frames, and protected route rules.
  - Implements the Authentication UI, Citizen Portal UI, Staff Dashboard UI, Admin Dashboard UI, Complaint UI, File Tracking UI, Feedback UI, Attendance UI, and Chatbot UI.
  - Enforces frontend security checks and manages integration coordination and daily integration reviews.
  - **Additional Database Support:** Assists Fathima Hana in database/Mongoose schema implementation if database workload becomes high.
  - **Testing Coordinator:**
    - **Additional Responsibilities:**
      - Coordinate testing activities from Day 5 onwards
      - Verify frontend-backend integration
      - Coordinate bug fixing
      - Verify critical workflows
      - Maintain bug tracking list
    - **Important Note:** Adithyan N may transfer part or all testing responsibilities to another team member if workload becomes high.
    - **Reason:** The project team consists of relatively inexperienced developers and initial centralized testing coordination is required.
- **Fathima Hana (Database Lead):**
  - Owns core database schema designs, validations, indexing, collection relationships, database audits/reviews, and query optimizations.
- **Muhammad Sanish (Backend Lead):**
  - Owns Express server initialization, API controllers, JWT auth routes, and RBAC authorization middlewares.
  - Configures secure cookie transports, input sanitation parameters, audit logging controllers, backend security check middlewares, API documentation, and integration support.
- **Fadi Ahmed (Face Recognition Support + Testing Lead):**
  - Coordinates prototype refinements of face recognition, camera integration, webcam scanner overlays, and dataset collections.
  - Focuses on camera permission testing, cross-browser camera testing, responsive layouts testing, system integration testing, and UI consistency review.
  - Enforces attendance workflow testing and face recognition accuracy testing.
  - Works closely with Muhammed Sadik KT.
- **Muhammed Sadik KT (AI Lead):**
  - Owns the core implementation of the Python biometric face-matching and liveness comparison module.
  - Configures Gemini prompt orchestrations, Vector Search indexing scripts, OCR parsing APIs, AI testing, and chatbot prompt optimizations.

---

## 6. Rapid MVP Development Plan (1 Week)

### 6.1 Sprint 0: Foundation Prep (Duration: Half Day)

- **Goal:** Confirm environments, initialize branch structures, and deploy linting guidelines.
- **Tasks:** Repository verification, local node environment setups, Git branching rules configuration, ESLint/Prettier rules, environment variables (`.env.example`) deployments, and MongoDB Atlas database instance creations.

### 6.2 Day-by-Day MVP Schedule

- **Day 1: Foundation Setup**
  - Initialize the backend Express engine, build core schemas (14 mandatory collections), scaffold the React app structure, configure routing guards, and set up infrastructure adapters.
- **Day 2: Core Citizen Services**
  - Develop user registration/login controllers, JWT middlewares, citizen portal grids, and complaint registration API.
- **Day 3: Core Integration**
  - Implement file tracking lookup services, upload pipelines, notification logs, citizen forms styling, and frontend-to-backend integrations.
- **Day 4: Municipality Operations + AI**
  - Construct staff Kanban dashboard, biometric consent forms, Python face matching service, and Gemini RAG chatbot adaptors.
- **Day 5: Feature Completion + Continuous Testing**
  - Complete AI reviews queue controllers, OCR attachment parsers, admin configuration panels, and final frontend-to-backend views linkages.
  - **Testing Activities:**
    - Begin continuous testing
    - Unit testing
    - Integration testing
    - Early bug reporting
- **Day 6: Integration Day (Feature Freeze)**
  - _No new features allowed._ All developers halt active coding on new modules. Focused exclusively on:
    - Integration testing
    - Bug fixing
    - Responsive testing
    - Security testing
    - No new features
- **Day 7: Final Delivery**
  - Execute:
    - Final verification
    - Final security review
    - Documentation review
    - Deployment preparation
    - Demo preparation

---

# Daily Evening Review Meeting

Duration:
15–20 minutes

Frequency:
Every evening

Mandatory Participants:
All team members

Agenda:

1. Completed tasks
2. Current blockers
3. Integration issues
4. Security issues
5. Database/API dependencies
6. Next day plan

Purpose:

- Detect blockers early
- Prevent integration failures
- Review security concerns
- Synchronize daily progress

---

# Frontend Priority Rule

Adithyan N must complete the following on Day 1 before any additional frontend pages are started:

1. React project structure
2. Tailwind configuration
3. Global layout
4. Routing system
5. Protected routes
6. Authentication pages
7. Axios client
8. API interceptors
9. Reusable UI components

Reason:

All remaining frontend features depend on this foundation.

---

## 7. Detailed Task Log (Status: Not Started)

### 7.1 Day 0 & Day 1 Tasks (Infrastructure & Foundation)

#### TASK-INF-001

- **Task:** MongoDB Atlas Setup
- **Assigned To:** Adithyan N + Muhammad Sanish
- **Path:** `database/`
- **Depends On:** None
- **Deliverable:** Live MongoDB Atlas multi-AZ database instance with access credentials.
- **Security:** Enforce IP access control rules, restrict administrative access to lead architects.
- **Testing:** Connect to Atlas instance using diagnostic shell scripts.
- **Status:** Not Started

#### TASK-INF-002

- **Task:** Environment Configuration
- **Assigned To:** Adithyan N + Muhammad Sanish
- **Path:** `backend/`
- **Depends On:** None
- **Deliverable:** Environment variable templates (`.env.example`) containing configurations for JWT keys, database URLs, and API ports.
- **Security:** Mandate secret-management policies. No plaintext credentials committed to git.
- **Testing:** Validate env parser initialization checks.
- **Status:** Not Started

#### TASK-INF-003

- **Task:** Logging Infrastructure Setup
- **Assigned To:** Adithyan N + Muhammad Sanish
- **Path:** `backend/src/utils/`
- **Depends On:** TASK-INF-002
- **Deliverable:** Winston/Morgan logger scripts capturing runtime diagnostics and transaction scopes.
- **Security:** Enforce data redaction middleware on logs, stripping passwords, tokens, and PII.
- **Testing:** Verify runtime exceptions write properly to error files.
- **Status:** Not Started

#### TASK-INF-004

- **Task:** Deployment Environment Preparation
- **Assigned To:** Adithyan N + Muhammad Sanish
- **Path:** `deployment/`
- **Depends On:** None
- **Deliverable:** Production deployment preparation for Render/Vercel/Netlify. Docker support will be implemented in Phase 2.
- **Security:** Secure CORS origins and enforce HTTPS redirections.
- **Testing:** Verify that local builds complete successfully and hosting settings are configured.
- **Status:** Not Started

#### TASK-FE-INF-001

- **Task:** Global Layout & Theme Setup
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/components/layout/`
- **Depends On:** None
- **Deliverable:** Main React layout wrappers utilizing Tailwind grid alignments.
- **Security:** Sanitize rendering outputs.
- **Testing:** Verify layout responsiveness across mobile and desktop.
- **Status:** Not Started

#### TASK-FE-INF-002

- **Task:** Sidebar & Navbar Navigation
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/components/navigation/`
- **Depends On:** TASK-FE-INF-001
- **Deliverable:** Dashboard headers and sidebar menus containing link directories.
- **Security:** Hide restricted modules from unauthenticated menu items.
- **Testing:** Verify route redirections on user clicks.
- **Status:** Not Started

#### TASK-FE-INF-003

- **Task:** Protected Routes Gating
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/components/guards/`
- **Depends On:** TASK-FE-INF-001
- **Deliverable:** Route guard wrappers checking active user tokens and role sets.
- **Security:** Client-side path redirection to block unauthorized screen accesses.
- **Testing:** Attempting direct URL access to `/admin` without admin role triggers redirection.
- **Status:** Not Started

#### TASK-FE-INF-004

- **Task:** Axios Client & API Interceptors
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/api/`
- **Depends On:** None
- **Deliverable:** Configured Axios instance with auto-injected authorization header interceptors.
- **Security:** Secure storage references, inject CSRF verification headers on mutating calls.
- **Testing:** Verify requests carry JWT tokens under authorization header keys.
- **Status:** Not Started

#### TASK-FE-INF-005

- **Task:** Loading Components & Error Boundaries
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/components/common/`
- **Depends On:** TASK-FE-INF-001
- **Deliverable:** Loading screens and boundary classes catching React runtime exceptions.
- **Security:** Prevent exposure of stack diagnostics on error screens.
- **Testing:** Trigger mock component failure to check error display.
- **Status:** Not Started

#### TASK-FE-INF-006

- **Task:** Toast Notifications & Reusable UI Components
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/components/ui/`
- **Depends On:** TASK-FE-INF-001
- **Deliverable:** Alert toasts, buttons, form grids, and select dropdown elements.
- **Security:** Prevent HTML injection on notification messages.
- **Testing:** Trigger alert toasts, confirming they dismiss correctly.
- **Status:** Not Started

#### TASK-BE-001

- **Task:** Setup Express server
- **Assigned To:** Muhammad Sanish
- **Path:** `backend/`
- **Depends On:** TASK-INF-002
- **Deliverable:** Scaffolded Node/Express application server.
- **Security:** Implement helmet headers, CORS allowlist, and rate limit protections.
- **Testing:** Verify GET `/health` endpoint returns 200 OK.
- **Status:** Not Started

#### TASK-DB-001

- **Task:** Initialize Core Schemas
- **Assigned To:** Fathima Hana (with Adithyan N)
- **Path:** `backend/src/models/`
- **Depends On:** TASK-INF-001
- **Deliverable:** Frozen schema definitions for users, roles, permissions, and departments.
- **Security:** Mongoose validation rules, sparse and unique constraints on user IDs.
- **Testing:** Run model creation validation tests.
- **Status:** Not Started

#### TASK-BE-002

- **Task:** Implement JWT & Session Authentication
- **Assigned To:** Muhammad Sanish
- **Path:** `backend/src/controllers/auth.controller.js`
- **Depends On:** TASK-DB-001, TASK-BE-001
- **Deliverable:** Routes and controllers for user register, login, and logout.
- **Security:** Bcrypt password hashing, session revocation checks via `auth_sessions`.
- **Testing:** POST `/api/v1/auth/login` returns token.
- **Status:** Not Started

#### TASK-BE-003

- **Task:** Implement RBAC & Authorization Middlewares
- **Assigned To:** Muhammad Sanish
- **Path:** `backend/src/middlewares/auth.middleware.js`
- **Depends On:** TASK-BE-002
- **Deliverable:** Middleware classes verifying roles, permission sets, and ownership boundaries.
- **Security:** Backend API verification gates.
- **Testing:** Requests with low-privilege tokens calling admin routes return 403.
- **Status:** Not Started

#### TASK-FE-001

- **Task:** Build Authentication UI Forms
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/pages/auth/`
- **Depends On:** TASK-FE-INF-003
- **Deliverable:** Responsive signup, login, and reset request grids.
- **Security:** Input sanitization, password strength meters.
- **Testing:** Verify login requests hit API endpoints correctly.
- **Status:** Not Started

#### TASK-QA-001

- **Task:** Formulate Requirements Traceability Matrix
- **Assigned To:** Minha Palakkathodi
- **Path:** `docs/reports/`
- **Depends On:** None
- **Deliverable:** Complete matrix linking requirements to database schemas and APIs.
- **Security:** Review authentication workflow consistency.
- **Testing:** Verification reviews.
- **Status:** Not Started

#### TASK-UI-001

- **Task:** Design Portal Layout Shells review
- **Assigned To:** Adithyan N (implementation) + Fadi Ahmed (design review)
- **Path:** `frontend/src/components/layout/`
- **Depends On:** TASK-FE-INF-001
- **Deliverable:** Responsive layout consistency review for core screen elements.
- **Security:** Ensure clear role segregation on rendering views.
- **Testing:** Visual checking of navigation tabs responsiveness.
- **Status:** Not Started

---

### 7.2 Day 2 & Day 3 Tasks (Core Citizen Services)

#### TASK-DB-002

- **Task:** Initialize Complaints & Files Schema
- **Assigned To:** Fathima Hana (with Adithyan N)
- **Path:** `backend/src/models/`
- **Depends On:** TASK-DB-001
- **Deliverable:** Schemas for complaints and files.
- **Security:** Geospatial indices, file metadata validations.
- **Testing:** Check geometry query validation.
- **Status:** Not Started

#### TASK-BE-004

- **Task:** Develop Complaint API Controllers
- **Assigned To:** Muhammad Sanish
- **Path:** `backend/src/controllers/complaint.controller.js`
- **Depends On:** TASK-DB-002, TASK-BE-003
- **Deliverable:** API controllers for ticket creations, assignments, and updates.
- **Security:** Restrict writes to backend services, audit-log modifications.
- **Testing:** Verify ticket POST binds to active login user ID.
- **Status:** Not Started

#### TASK-FE-003

- **Task:** Build Citizen Dashboard & Complaint Intake UI
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/pages/citizen/`
- **Depends On:** TASK-FE-001, TASK-FE-INF-004
- **Deliverable:** Grid dashboard displaying complaints, intake forms, and attachments.
- **Security:** Limit client upload selectors to PDF and images.
- **Testing:** Intake form sends complaint payloads correctly.
- **Status:** Not Started

#### TASK-DB-003

- **Task:** Initialize File Tracking Schemas
- **Assigned To:** Fathima Hana (with Adithyan N)
- **Path:** `backend/src/models/`
- **Depends On:** TASK-DB-002
- **Deliverable:** Schemas for `file_tracking` and `file_tracking_history`.
- **Security:** Configure public visibility checks.
- **Testing:** Execute validation checks on status properties.
- **Status:** Not Started

#### TASK-BE-005

- **Task:** Implement File Tracking & Announcements APIs
- **Assigned To:** Muhammad Sanish
- **Path:** `backend/src/controllers/tracking.controller.js`
- **Depends On:** TASK-DB-003, TASK-BE-003
- **Deliverable:** Status lookup endpoints by File ID.
- **Security:** Hiding of internal notes (`internal_note`) on public trackers.
- **Testing:** GET `/public/file-tracking/:fileNo` hides audit log annotations.
- **Status:** Not Started

#### TASK-FE-004

- **Task:** Build Public File Tracking Timeline UI
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/pages/public/`
- **Depends On:** TASK-FE-003
- **Deliverable:** Search layouts displaying file processing statuses.
- **Security:** Escaping query inputs.
- **Testing:** Timeline displays progress dots correctly.
- **Status:** Not Started

#### TASK-QA-002

- **Task:** QA Test Plan for Grievance Handling
- **Assigned To:** Minha Palakkathodi
- **Path:** `docs/reports/`
- **Depends On:** TASK-QA-001
- **Deliverable:** Validation scripts for citizen workflows.
- **Security:** Verify attachment visibility bounds.
- **Testing:** Document verification.
- **Status:** Not Started

#### TASK-UI-002

- **Task:** Validate Citizen Forms Responsive Layouts
- **Assigned To:** Fadi Ahmed
- **Path:** `frontend/`
- **Depends On:** TASK-FE-003
- **Deliverable:** Design consistency review log.
- **Security:** Check screen element boundaries.
- **Testing:** Verify view rendering across mobile viewports.
- **Status:** Not Started

---

### 7.3 Day 4 & Day 5 Tasks (Operations & AI Integrations)

#### TASK-DB-004

- **Task:** Initialize Biometrics & AI Schemas
- **Assigned To:** Fathima Hana (with Adithyan N)
- **Path:** `backend/src/models/`
- **Depends On:** TASK-DB-002
- **Deliverable:** Schemas for biometric consents, templates, review queues, and AI logs.
- **Security:** Reference keys encryption configurations, time-series metrics logging.
- **Testing:** Check Vector Search indexing configurations.
- **Status:** Not Started

#### TASK-AI-001

- **Task:** Python Biometric Face Verification Service
- **Assigned To:** Muhammed Sadik KT
- **Path:** `ai-services/face-rec/`
- **Depends On:** None
- **Deliverable:** Python script calculating embedding similarity and depth liveness scores.
- **Security:** Template protection, volatile RAM comparison configurations.
- **Testing:** Cosine similarity calculation accuracy checks.
- **Status:** Not Started

#### TASK-AI-002

- **Task:** AI RAG Chatbot Integration
- **Assigned To:** Muhammed Sadik KT
- **Path:** `ai-services/chatbot/`
- **Depends On:** TASK-DB-004
- **Deliverable:** Chat orchestrator calling Gemini grounded in vector chunk datasets.
- **Security:** Guardrails enforcement, user prompt sanitizations.
- **Testing:** RAG response lists retrieve source references correctly.
- **Status:** Not Started

#### TASK-AI-003

- **Task:** OCR Attachment Parser
- **Assigned To:** Muhammed Sadik KT
- **Path:** `ai-services/ocr/`
- **Depends On:** None
- **Deliverable:** File metadata scanning module.
- **Security:** Limit access privileges on OCR parsing text files.
- **Testing:** Check parse scripts outputs against test PDF uploads.
- **Status:** Not Started

#### TASK-BE-006

- **Task:** Implement Biometric Consent & Verification APIs
- **Assigned To:** Muhammad Sanish
- **Path:** `backend/src/controllers/attendance.controller.js`
- **Depends On:** TASK-DB-004, TASK-BE-003, TASK-AI-001
- **Deliverable:** Consent registers and face check-in punch adapters.
- **Security:** active consent checks before enrollment.
- **Testing:** Post check-in fails without active consent status.
- **Status:** Not Started

#### TASK-BE-007

- **Task:** Implement Chatbot and Handoff Queue APIs
- **Assigned To:** Muhammad Sanish
- **Path:** `backend/src/controllers/ai.controller.js`
- **Depends On:** TASK-DB-004, TASK-BE-003, TASK-AI-002
- **Deliverable:** Conversational routes and manual review queue assigners.
- **Security:** Chat log PII redactions.
- **Testing:** Low confidence responses routes to review queue logs.
- **Status:** Not Started

#### TASK-FE-005

- **Task:** Build Staff Attendance Scanner & Kanban Dashboard
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/pages/staff/`
- **Depends On:** TASK-FE-003, TASK-FE-INF-004
- **Deliverable:** Staff portal display containing work cards and webcam scans layout.
- **Security:** webcam permissions checker.
- **Testing:** Attendance punch updates dashboard logs successfully.
- **Status:** Not Started

#### TASK-FE-006

- **Task:** Build Admin settings & AI review board UI
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/pages/admin/`
- **Depends On:** TASK-FE-005
- **Deliverable:** Role managers, queue dashboards, and parameter settings panel.
- **Security:** Admin permission check middleware guards.
- **Testing:** Configuration modifications save parameter adjustments.
- **Status:** Not Started

#### TASK-QA-003

- **Task:** Biometric Verification Performance tests
- **Assigned To:** Minha Palakkathodi
- **Path:** `docs/reports/`
- **Depends On:** TASK-QA-002
- **Deliverable:** QA test documentation logging precision rates.
- **Security:** Biometric accuracy audits.
- **Testing:** Document verification.
- **Status:** Not Started

#### TASK-UI-003

- **Task:** Build Scanner Webcam permission UI components
- **Assigned To:** Adithyan N
- **Path:** `frontend/src/components/scanner/`
- **Depends On:** TASK-FE-005
- **Deliverable:** Camera access prompt modules with visual fallback settings.
- **Security:** Handle camera lockouts or permissions denials safely.
- **Testing:** Webcam denial shows PIN manual inputs immediately.
- **Status:** Not Started

---

### 7.4 Day 6 & Day 7 Tasks (Integration & Hardening)

#### TASK-BE-008

- **Task:** Integrate anti-NoSQL middleware
- **Assigned To:** Muhammad Sanish
- **Path:** `backend/src/middlewares/security.js`
- **Depends On:** TASK-BE-001
- **Deliverable:** Input sanitizers blocking operator injections.
- **Security:** Strip special operators (`$`, `.`) from request parameters.
- **Testing:** Verify POST payloads containing MongoDB operators are rejected.
- **Status:** Not Started

#### TASK-BE-009

- **Task:** Integrate Anti-CSRF and CAPTCHA validation middlewares
- **Assigned To:** Muhammad Sanish
- **Path:** `backend/src/middlewares/captcha.js`
- **Depends On:** TASK-BE-001
- **Deliverable:** Anti-CSRF token checkers and Turnstile verification APIs.
- **Security:** Enforce Same-Site cookie tags, validate CAPTCHA payloads.
- **Testing:** Public registrations fail if Turnstile token is missing.
- **Status:** Not Started

#### TASK-AI-004

- **Task:** AI Model threshold configuration
- **Assigned To:** Muhammed Sadik KT
- **Path:** `ai-services/face-rec/`
- **Depends On:** TASK-AI-001
- **Deliverable:** Similarity parameters configurations.
- **Security:** Minimize false matches.
- **Testing:** Check matching metrics against test sets.
- **Status:** Not Started

#### TASK-FE-007

- **Task:** Frontend Gating & Memory Release
- **Assigned To:** Adithyan N
- **Path:** `frontend/`
- **Depends On:** TASK-FE-006
- **Deliverable:** Hardened frontend modules.
- **Security:** Release webcam streams on unmounts, anti-CSRF request header bindings.
- **Testing:** Verify memory cleanup on route transitions.
- **Status:** Not Started

#### TASK-QA-004

- **Task:** Role Boundary Pen-Testing audits
- **Assigned To:** Minha Palakkathodi
- **Path:** `docs/reports/`
- **Depends On:** TASK-QA-003
- **Deliverable:** Verification logs checks.
- **Security:** Validate API RBAC gates.
- **Testing:** Check endpoint protections.
- **Status:** Not Started

#### TASK-UI-004

- **Task:** Run Cross-Browser Layout Verification
- **Assigned To:** Fadi Ahmed
- **Path:** `frontend/`
- **Depends On:** TASK-FE-007
- **Deliverable:** Browser compatibility report.
- **Security:** CSS layout bounds checks.
- **Testing:** Verify layouts render correctly in Firefox, Safari, and Chrome.
- **Status:** Not Started

#### TASK-DB-005

- **Task:** Immutable Backup configurations
- **Assigned To:** Fathima Hana
- **Path:** `database/`
- **Depends On:** TASK-DB-004
- **Deliverable:** S3 Object Lock configuration scripts.
- **Security:** Tamper-proof backup configurations.
- **Testing:** Check simulated delete commands.
- **Status:** Not Started

---

### 7.5 Face Recognition Core Tasks (Assigned: Fadi Ahmed)

#### TASK-FR-001

- **Task:** Dataset Collection
- **Assigned To:** Fadi Ahmed
- **Path:** `ai-services/face-rec/dataset/`
- **Depends On:** None
- **Deliverable:** Standardized library of staff face profile datasets for calibration.
- **Security:** Zero storage of raw images in public repos; restricted access only.
- **Testing:** Verify alignment metrics of gathered sample set.
- **Status:** Not Started

#### TASK-FR-002

- **Task:** Prototype Refinement
- **Assigned To:** Fadi Ahmed
- **Path:** `ai-services/face-rec/`
- **Depends On:** TASK-AI-001
- **Deliverable:** Optimized comparison model utilizing optimized landmarks matrices.
- **Security:** Protection against offline model extraction.
- **Testing:** Run validation accuracy tests against sample sets.
- **Status:** Not Started

#### TASK-FR-003

- **Task:** Camera Integration Testing
- **Assigned To:** Fadi Ahmed
- **Path:** `frontend/src/components/scanner/`
- **Depends On:** TASK-UI-003
- **Deliverable:** Gated webcam framework integration report.
- **Security:** webcam parameters verification, checking zero buffer persistences.
- **Testing:** Check camera feed binding logic.
- **Status:** Not Started

#### TASK-FR-004

- **Task:** Attendance Workflow Testing
- **Assigned To:** Fadi Ahmed
- **Path:** `docs/reports/`
- **Depends On:** TASK-BE-006, TASK-FR-003
- **Deliverable:** Verification test log tracing biometric punch inputs to model outcomes.
- **Security:** Confirm active consent checks block unconsented camera captures.
- **Testing:** Attempt punches under blocked consent rules.
- **Status:** Not Started

#### TASK-FR-005

- **Task:** Recognition Accuracy Testing
- **Assigned To:** Fadi Ahmed
- **Path:** `docs/reports/`
- **Depends On:** TASK-FR-002
- **Deliverable:** Metrics summary documenting False Acceptance Rate (FAR) and False Rejection Rate (FRR).
- **Security:** Mitigate spoofing risk from static print templates.
- **Testing:** Run model against mock spoofing inputs.
- **Status:** Not Started

#### TASK-FR-006

- **Task:** Cross-Browser Camera Testing
- **Assigned To:** Fadi Ahmed
- **Path:** `docs/reports/`
- **Depends On:** TASK-FR-003
- **Deliverable:** Browser compatibility log for camera access.
- **Security:** camera permissions sandbox restrictions validation.
- **Testing:** Run webcam scans across Chrome, Edge, Safari, and Firefox.
- **Status:** Not Started

#### TASK-FR-007

- **Task:** System Integration Testing
- **Assigned To:** Fadi Ahmed
- **Path:** `docs/reports/`
- **Depends On:** TASK-FR-004, TASK-FE-005
- **Deliverable:** End-to-end integration validation report.
- **Security:** Confirm RBAC blocks staff from viewing other staff biometric logs.
- **Testing:** Run dry-run cycles.
- **Status:** Not Started

---

## 8. Dependency Order

For a smooth implementation lifecycle, developers must strictly adhere to the following sequence. Frontend components, controllers, and services must not be developed before their database models and middlewares are complete.

### 8.1 Authentication & Session Management Flow

```
1. (TASK-DB-001) Schema Models [Hana]
   └── 2. (TASK-BE-002) Auth API & Session login controllers [Sanish]
       └── 3. (TASK-BE-003) RBAC Authorization Middlewares [Sanish]
           ├── 4a. (TASK-FE-INF-003) React Routing Guards [Adithyan]
           └── 4b. (TASK-FE-001) Login & Register UI [Adithyan]
```

### 8.2 Grievance Intake & File Tracking Flow

```
1. (TASK-DB-002) Complaint & Assignment Schemas [Hana]
   ├── 2a. (TASK-DB-003) File Tracking Schemas [Hana]
   └── 2b. (TASK-BE-004) Complaint API Controllers [Sanish]
       ├── 3a. (TASK-BE-005) File Tracking APIs [Sanish]
       │   └── 4a. (TASK-FE-004) Public Timelines Search UI [Adithyan]
       └── 3b. (TASK-FE-003) Citizen Intake Form & Attachments UI [Adithyan]
```

### 8.3 Biometric Staff Attendance Flow

```
1. (TASK-DB-004) Biometrics Collections [Hana]
   ├── 2a. (TASK-AI-001) Python Similarity Service [Sadik]
   └── 2b. (TASK-BE-006) Biometrics Consent & Verification APIs [Sanish]
       └── 3. (TASK-FE-005) Webcam Scanner Gated View [Adithyan]
```

---

## 9. Security Gates

A security checkpoint review must be conducted at the end of each development day. Features cannot be merged into the `develop` branch if any gate criterion is violated.

### 9.1 Day 1 Gates:

- [ ] **No plaintext secrets:** Database passwords, JWT keys, and Turnstile secret keys must be retrieved from environment configurations. No variables committed in repository code.
- [ ] **Bcrypt configurations:** Citizen and employee passwords must be hashed with bcrypt using a workload factor of 10 or higher.
- [ ] **JWT expiration limits:** Access token lifetime configured to 15 minutes or lower, with refresh tokens managed under validation controls.

### 9.2 Day 3 Gates:

- [ ] **Resource ownership filters:** Complaint modifications require token user match checks, verified at the backend service layer.
- [ ] **File type gating:** File uploads are restricted to allowlisted MIME-types (e.g. PDF, JPG, PNG) and limited to 5MB.
- [ ] **Scope isolation:** Public file trackers must suppress private comments and internal audit notes.

### 9.3 Day 5 Gates:

- [ ] **Biometric consent check:** Biometric verification requests must verify that the user's `biometric_consents.consent_given` is true.
- [ ] **Zero photo retention:** Python face recognition services must process webcam frames in volatile memory, discarding images immediately after comparison.
- [ ] **RAG context bounds:** Gemini prompt controllers must route queries strictly within the retrieved knowledge base text chunks.

### 9.4 Day 7 Gates:

- [ ] **Query sanitizations:** Anti-NoSQL injection middleware rejects payloads containing MongoDB operator modifiers.
- [ ] **Anti-CSRF headers:** Cookie transports must be configured as HTTPOnly, secure, and SameSite. Anti-CSRF token verification must be validated on all data-mutating routes.
- [ ] **Backup immutability:** WORM storage locks must be applied to S3 backup volumes.

---

## 10. Review Process

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

### 10.1 Branching Convention

- `main`: Frozen, production-ready code.
- `develop`: Active integration testing branch.
- `feature/day[0-7]-[task_id]-[short_name]`: Individual developer branches (e.g. `feature/day1-TASK-BE-001-setup`).

### 10.2 Reviewer Assignment Matrix

- **Database schemas & Mongoose code:** Reviewed by Fathima Hana.
- **Backend Express code & APIs:** Reviewed by Muhammad Sanish.
- **Frontend React components & layouts:** Reviewed by Adithyan N.
- **AI pipelines & biometric comparisons:** Reviewed by Muhammed Sadik KT.
- **Final Authorization gate:** Enforced by Technical Lead (Adithyan N).

### 10.3 Code Review Checklist

1. **Middlewares checks:** Does the endpoint include correlation ID injection, JWT authentication, and RBAC middlewares?
2. **Database validations:** Are parameters validated using schemas before database mutations are executed?
3. **Audit records:** Does the mutation route write to append-only logs (`audit_logs` or `ai_audit_logs`)?
4. **Redaction checks:** Are sensitive values (passwords, raw biometric coordinates) redacted before output data is returned?
5. **NoSQL security:** Are queries sanitised against NoSQL injection?
6. **Webcam cleanup:** Do React scanner components clean up webcam buffers upon unmounting?

---

## 11. Final Development Roadmap

| Day       | Goals                                                                                                       | Responsible Members                  | Expected Output                                                       |
| :-------- | :---------------------------------------------------------------------------------------------------------- | :----------------------------------- | :-------------------------------------------------------------------- |
| **Day 0** | Repo verification, setup linting config, prep Atlas environment                                             | Hana, Sanish, Adithyan               | Configured workspace, branch pipelines.                               |
| **Day 1** | Scaffolding Express, 14 models creation, React protected routing setup                                      | Hana, Sanish, Adithyan, Fadi         | Express core, schemas, React base.                                    |
| **Day 2** | JWT APIs, Signup/Login, Citizen views, Complaint controllers                                                | Sanish, Adithyan, Fadi               | Auth APIs, Citizen panels, complaint intake.                          |
| **Day 3** | File tracking, file upload handlers, alerts database, styled portals                                        | Sanish, Hana, Adithyan, Fadi, Minha  | Public timelines lookup, upload validators.                           |
| **Day 4** | Python face compare, RAG chatbot adaptors, Staff attendance scanner                                         | Sadik, Sanish, Adithyan, Fadi, Hana  | Python similarity service, chatbot, scanner views.                    |
| **Day 5** | Complete remaining modules & Begin Continuous Testing (Unit, Integration, Early bug reporting)              | Sadik, Sanish, Adithyan, Hana, Minha | Completed features, initial test reports, bug logs.                   |
| **Day 6** | **Feature Freeze.** Integration testing, bug fixing, responsive testing, security testing (No new features) | All Team Members                     | Stabilized codebase, responsive check logs, security report.          |
| **Day 7** | Final verification, final security review, documentation review, deployment & demo preparation              | All Team Members                     | Production release on Render/Vercel/Netlify, finalized documentation. |

---

## 12. Daily Standup Format

To ensure rapid syncs in the 1-week timeline, each team member must report the following during the daily standup:

- **Yesterday:** What tasks were completed yesterday?
- **Today:** What tasks are being worked on today?
- **Blockers:** Are there any dependencies or technical roadblocks preventing progress?

**Standup Meeting Duration:** 15 minutes daily.

---

## 13. Document Status

- **Status:** Rapid MVP Development Plan Approved
- **Tracked Gaps:** Open Issues are tracked separately under Section 9 of the formal [ARCHITECTURE_FREEZE_v1.md](file:///d:/Adhi/kottakkal/docs/09-Handover-Documents/ARCHITECTURE_FREEZE_v1.md) registry.
- All tasks listed in this roadmap are initialized as **Status: Not Started**. No code modifications are marked completed.

---

# Final Development Verdict

Project Status:

Approved for Development

Development Start Condition:

- Sprint 0 completed
- Environment setup completed
- MongoDB Atlas configured
- Repository verified

Recommendation:

Today:
Sprint 0

Tomorrow:
Day 1 Development Begins

Every Evening:
Mandatory 15-minute review meeting
