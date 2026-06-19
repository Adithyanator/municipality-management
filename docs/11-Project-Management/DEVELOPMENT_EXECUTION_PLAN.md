# Development Execution Plan

**Project:** AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System  
**Version:** 1.0  
**Status:** Approved for Development  
**Author:** Principal Enterprise Architect  

---

## 1. Execution Overview

This execution plan outlines the development lifecycle for implementing the Smart Municipal Citizen Assistance and Staff Attendance Management System. The development phase is structured into **four consecutive 1-week sprints** (4-week MVP timeline). 

Each sprint is designed around technical dependencies, ensuring that the database layer, API controllers, and security middlewares are established before developing dependent frontend layouts and AI pipelines.

---

## 2. Sprint Breakdown

### 2.1 Sprint 1: Base Infrastructure, Authentication & Database Initialization
* **Duration:** Week 1  

#### Objectives:
* Initialize the Node.js/Express server and set up the MongoDB Atlas connection.
* Deploy Mongoose models, index structures, and JSON validation schemas for the 42 collections.
* Implement JWT authentication, `auth_sessions`, password reset, and registration endpoints.
* Develop shared middleware adapters (correlation ID injection, security headers, rate limiting, and request validation).
* Resolve security gaps: GA-03 (API authorization middleware), GA-04 (Aadhaar PBKDF2 hash), GA-05 (OCR schema baseline), GA-07 (CAPTCHA tokens on public routes), GA-08 (anti-CSRF validation checks).

#### Deliverables:
* `/backend/src/app.js` server bootstrap code.
* Mongoose schema objects for users, auth sessions, settings, and reset tokens.
* Middleware utility scripts (rate limit, JWT authentication, RBAC parser, request validator).
* API controllers for user signup, login, password reset request, and password reset confirm.

#### Dependencies:
* Approved database schemas (v4.0 AI Extension) and Master Architecture guidelines.
* Provisioned MongoDB Atlas cluster and AWS KMS keys.

#### Risks:
* Delays in configuring the PBKDF2 Aadhaar key-derivation logic, stalling citizen registration endpoints.
* Configuration mismatches in database indexing rules.

#### Responsible Teams:
* **Database Team:** Fathima Hana (Lead)  
* **API/Backend Team:** Muhammad Sanish (Lead)  
* **Security Team:** Adithyan N (Lead)  

---

### 2.2 Sprint 2: Citizen Services & Complaint Processing
* **Duration:** Week 2  

#### Objectives:
* Implement citizen profile and notification preference updates.
* Develop the common file upload service (MIME validation, size restriction, malware checking).
* Construct complaint intake, routing, assignment, and feedback controllers.
* Build public directories (schemes, permits) and announcements endpoints.
* Integrate public file tracking timeline searches.
* Resolve gaps: GA-06 (low-confidence queue base), GA-07 (Turnstile verification on complaint submission).

#### Deliverables:
* File upload pipeline, returning file metadata reference IDs.
* API controllers for complaint registration, assignment logs, and feedback updates.
* Announcement lookup and landing announcements controllers.
* Universal file tracking lookup controller.

#### Dependencies:
* Successful completion of Sprint 1 authentication and middleware pipelines.
* Provisioned AWS S3 bucket/object storage configurations.

#### Risks:
* Vulnerabilities in multipart file parsers, risking malicious code uploads.
* Performance bottlenecks in geospatial calculations for ticket routing.

#### Responsible Teams:
* **API/Backend Team:** Muhammad Sanish (Lead)  
* **UI/Frontend Team:** Fadi Ahmed (Lead)  
* **SRS Team:** Minha Palakkathodi (Lead)  

---

### 2.3 Sprint 3: Face Attendance & Biometric Management
* **Duration:** Week 3  

#### Objectives:
* Implement biometric consent registers and template enrollment controls.
* Develop the Python face comparison module.
* Build webcam liveness checking and template similarity evaluation controllers.
* Deploy attendance check-in/check-out logs, daily summaries, and presence dashboards.
* Resolve gaps: GA-06 (biometric reviewer queue endpoints), GA-12 (automated similarity testing frameworks).

#### Deliverables:
* Biometric consent creation, revocation, and template deletion controllers.
* Python-based verification API, processing raw images, checking liveness, and comparing vectors.
* Express endpoints for face verification check-ins and manual overrides.
* Real-time presence dashboard caching.

#### Dependencies:
* Sprint 1 and 2 databases and authentication controllers.
* Integration of camera libraries in React.

#### Risks:
* High false-matching ratios, leading to credential spoofing or employee lockouts.
* Camera driver compatibility issues across old browsers or kiosk portals.

#### Responsible Teams:
* **AI Team:** Muhammed Sadik KT (Lead)  
* **UI/Frontend Team:** Fadi Ahmed (Lead)  
* **Security Team:** Adithyan N (Lead)  

---

### 2.4 Sprint 4: RAG Chatbot Integration, Administrative Reporting & Handover Prep
* **Duration:** Week 4  

#### Objectives:
* Integrate the Gemini AI Gateway, grounding chat prompts using Atlas Vector Search content chunks.
* Implement chatbot session memory, transcript redactions, and human escalations.
* Develop administrative CSV/PDF report exports and configuration screens.
* Prepare pre-production staging deployments and execute immutable backup configurations.
* Resolve gaps: GA-01 (immutable backup lock), GA-02 (post-handover key rotations), GA-09 (escalation SLAs), GA-10 (monitoring logging parameters), GA-11 (recovery RPO/RTO tiers).

#### Deliverables:
* Chatbot session routes and conversational history controllers.
* Administrative export panel with download token authentication controls.
* Settings panel for non-secret municipal variables.
* Staging validation verification checks, credential rotation checklists, and support SLA manuals.

#### Dependencies:
* Complete preceding sprints.
* Active Gemini API access tokens.

#### Risks:
* AI chatbot hallucinations or prompt injection attempts bypassing RAG grounding.
* Large data volumes crashing CSV/PDF exporters.

#### Responsible Teams:
* **AI Team:** Muhammed Sadik KT (Lead)  
* **API/Backend Team:** Muhammad Sanish (Lead)  
* **Security Team:** Adithyan N (Lead)  
* **IT Team:** Shared Operations Leads  

---

## 3. Sprint Summary Matrix

| Sprint | Timeline | Key Focus | Primary Deliverable | Open Gap Resolved |
| :--- | :--- | :--- | :--- | :--- |
| **Sprint 1** | Week 1 | Infrastructure & Auth | Express Boilerplate, User API, 42 Schema Models | GA-03, GA-04, GA-05, GA-07, GA-08 |
| **Sprint 2** | Week 2 | Core Citizen Services | Complaint Intake, Upload service, Tracking lookup | GA-06, GA-07 |
| **Sprint 3** | Week 3 | Biometrics & Attendance | Biometric consent, Face rec comparison, Override log | GA-06, GA-12 |
| **Sprint 4** | Week 4 | AI RAG, Reports & Deployment | AI Gateway, PDF Exporter, Handover checklists | GA-01, GA-02, GA-09, GA-10, GA-11 |
