# Security Threat Model

Status: Draft  
Version: 0.9  
Owner: Adithyan N - Security Architecture Lead  
Project: AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System

## Purpose

This threat model defines the key assets, threat actors, attack vectors, trust boundaries, STRIDE analysis, prioritization, and security controls for the municipal platform. It focuses on citizens, municipal staff, administrators, MongoDB database, file storage, AI services, OCR processing, and face recognition attendance.

## Assets

| Asset | Description | Sensitivity |
| --- | --- | --- |
| Citizen accounts and profiles | Citizen identity, contact, address, preferences, and service records. | High |
| Complaint records | Complaint details, attachments, status history, officer notes, and resolution proof. | High |
| File tracking and permit/certificate records | Public tracking metadata, internal notes, certificate records, and related documents. | High |
| Attendance records | Staff attendance, staff presence, liveness/confidence metadata, and manual fallback records. | High |
| Face recognition data | Biometric consent records and encrypted face templates. | Critical |
| Uploaded documents | Citizen uploads, proof photos, OCR source files, exports, receipts, and downloadable files. | High |
| Authentication data | Password hashes, JWT sessions, password reset token hashes, roles, and permissions. | Critical |
| AI services data | Chatbot sessions, messages, knowledge base, embeddings, AI audit logs, and AI errors. | High |
| Audit logs | Operational, security, AI, export, and biometric traceability logs. | Critical |
| System settings | Non-secret configuration and secret-manager references. | High |

## Threat Actors

| Threat Actor | Motivation | Target |
| --- | --- | --- |
| External attacker | Data theft, disruption, ransomware, unauthorized access. | Public APIs, login, file uploads, chatbot, database paths. |
| Malicious citizen user | Complaint abuse, file tampering, unauthorized access to other citizen data. | Citizen portal, file tracking, complaint workflows. |
| Malicious municipal staff | Unauthorized record viewing, status tampering, attendance misuse. | Staff portal, complaint assignments, attendance records. |
| Malicious or careless administrator | Privilege misuse, export leakage, settings misconfiguration. | Admin portal, reports, roles, settings, exports. |
| Compromised service account | Automated data access or destructive actions. | Backend, database, AI integrations, storage. |
| Vendor/service outage | Availability disruption. | Gemini, MongoDB Atlas, storage, OCR/AI dependencies. |

## Attack Vectors

- Brute-force login and credential stuffing.
- Stolen JWT or refresh session abuse.
- Broken object-level authorization.
- NoSQL injection through weak query handling.
- Malicious file upload or OCR document payload.
- Cross-site scripting in complaint, chatbot, or status text.
- Report export misuse.
- Prompt injection against the AI chatbot.
- Direct or unvalidated AI tool-call action.
- Face spoofing or low-confidence match abuse.
- Backup credential compromise.
- Insider misuse of admin or staff privileges.
- DDoS against public endpoints.

## Trust Boundaries

| Boundary | Description | Required Controls |
| --- | --- | --- |
| Public browser to React frontend | Public users access landing, login, registration, chatbot, and file tracking. | HTTPS, secure headers, input validation, safe rendering. |
| React frontend to Node.js API | Citizen, staff, and admin portals call backend services. | JWT, session validation, CORS, RBAC, ownership checks. |
| Node.js API to MongoDB | Backend is the system-of-record interface for database access. | TLS, MongoDB RBAC, schema validation, audit logging. |
| Node.js API to file storage | Backend mediates upload/download and report export access. | MIME validation, checksums, storage ACLs, audit logs. |
| Node.js API to AI Gateway/Gemini | Chatbot requests pass through backend AI controls. | Guardrails, retrieval allowlists, tool validation, AI audit logs. |
| Node.js API to face recognition service | Attendance capture, liveness, and matching are internally controlled. | Service authentication, active consent, encrypted templates, fallback. |
| Admin portal to privileged operations | Admin users manage users, reports, attendance, settings, and exports. | Least privilege, audit, separation of duties, export monitoring. |

## STRIDE Analysis

| STRIDE Category | Threat | Affected Area | Priority | Control |
| --- | --- | --- | --- | --- |
| Spoofing | Stolen credentials used to impersonate citizens, staff, or admins. | Authentication, portals | High | bcrypt, JWT expiry, session revocation, lockout, audit logs. |
| Spoofing | Face spoofing used to mark false attendance. | Attendance system | High | Liveness checks, confidence thresholds, manual review, fallback audit. |
| Tampering | Complaint, file tracking, attendance, or certificate records altered without authorization. | Database, APIs | High | RBAC, workflow validation, audit logs, schema validation. |
| Tampering | Uploaded files or report exports modified after upload. | File storage | High | Checksums, immutable storage patterns, storage ACLs, file lifecycle audit. |
| Repudiation | Staff or admins deny making privileged changes. | Admin/staff operations | High | `audit_logs`, `ai_audit_logs`, correlation IDs, export logs. |
| Information Disclosure | Citizen, staff, biometric, tax, certificate, or complaint data exposed. | Database, APIs, exports | Critical | Least privilege, encryption, secure APIs, export monitoring, redaction. |
| Information Disclosure | AI chatbot reveals sensitive data or internal content. | AI services | High | Retrieval allowlists, redaction, guardrails, approved knowledge base. |
| Denial of Service | Public endpoints overwhelmed by DDoS or automated abuse. | Login, chatbot, file tracking, complaints | Medium | Rate limits, throttling, monitoring, caching, safe fallback. |
| Elevation of Privilege | User gains admin or staff privileges through RBAC weakness. | Backend/API | Critical | Server-side RBAC, role-change audit, separation of duties. |

## Threat Prioritization

| Priority | Threats |
| --- | --- |
| Critical | Data breach, privilege escalation, biometric data leakage, audit log tampering. |
| High | Unauthorized access, insider misuse, report export leakage, prompt injection, face spoofing, file tampering. |
| Medium | DDoS, vendor outage, OCR misread, scalability degradation. |

## Security Controls

- JWT authentication, `auth_sessions`, refresh token revocation, and password reset token hashing.
- bcrypt password hashing.
- Backend RBAC, ownership checks, department checks, and workflow-state authorization.
- React route guards and role-based navigation as frontend enforcement layers.
- MongoDB Atlas encryption at rest, TLS, schema validation, indexes, and database RBAC.
- File upload validation, MIME restrictions, checksums, access-controlled downloads, and audit logs.
- AI Gateway guardrails, approved RAG retrieval, prompt injection defense, structured output validation, and tool-call validation.
- Biometric consent enforcement, encrypted face templates, liveness checks, confidence decisions, and manual fallback.
- Backup encryption, restore testing, and disaster recovery procedures.
- Audit logs, AI audit logs, AI error logs, and export monitoring.

