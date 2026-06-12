# Project Risk Register Draft

Status: Draft  
Version: 0.9  
Owner: Adithyan N - Security Architecture Lead  
Project: AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System

## Purpose

This draft risk register identifies municipal security, governance, operational, AI, biometric, data, and handover risks for the React, Node.js, MongoDB, AI chatbot, OCR processing, face recognition attendance, complaint management, file tracking, and permit/certificate service platform.

Risk score uses a 1-5 scale:

- Probability: 1 = Rare, 5 = Almost Certain
- Impact: 1 = Low, 5 = Critical
- Risk Score = Probability x Impact

## Risk Register

| Risk ID | Risk Category | Description | Probability | Impact | Risk Score | Mitigation Strategy | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | Data Breach | Citizen, complaint, attendance, certificate, uploaded document, or chatbot data may be exposed through weak access controls or misconfigured APIs. | 3 | 5 | 15 | Enforce JWT authentication, RBAC, ownership checks, encryption, audit logging, secure headers, and least-privilege data access. | Adithyan N |
| R-002 | Unauthorized Access | Citizens, staff, or external attackers may access restricted staff/admin portals or APIs. | 3 | 5 | 15 | Enforce route guards, backend authorization, session validation, account lockout, rate limiting, and unauthorized access logging. | Adithyan N |
| R-003 | Insider Threats | Municipal staff or administrators may misuse access to view, alter, export, or disclose sensitive records. | 3 | 5 | 15 | Apply least privilege, separation of duties, export monitoring, audit log review, and admin action approvals. | Adithyan N |
| R-004 | Privilege Escalation | Users may gain higher privileges through RBAC misconfiguration, weak middleware, or role assignment errors. | 3 | 5 | 15 | Restrict role changes, audit all permission updates, require admin review, and validate permissions server-side. | Adithyan N |
| R-005 | Database Corruption | MongoDB records may become inconsistent due to bad migrations, invalid writes, or failed update workflows. | 2 | 5 | 10 | Use schema validation, migration review, backups, transaction-safe service logic, and restore testing. | Fathima Hana |
| R-006 | Data Loss | Complaint records, file tracking history, attendance logs, or reports may be lost through accidental deletion or infrastructure failure. | 2 | 5 | 10 | Configure automated backups, restricted delete permissions, restore testing, and audit trails. | Fathima Hana |
| R-007 | Ransomware | Endpoint or server compromise may encrypt files, exports, backups, or operational assets. | 2 | 5 | 10 | Maintain offline/offsite backups, endpoint protection, least privilege, patching, restore tests, and incident response procedures. | Adithyan N |
| R-008 | Malware | Uploaded files or compromised dependencies may introduce malware into the municipal platform. | 3 | 4 | 12 | Validate uploads, restrict MIME types, scan files where available, lock dependencies, and monitor storage access. | Muhammad Sanish |
| R-009 | DDoS | Public endpoints such as login, complaint submission, file tracking, chatbot, or permit lookup may be overwhelmed. | 3 | 4 | 12 | Apply rate limiting, request throttling, caching for public content, monitoring, and upstream protection. | Muhammad Sanish |
| R-010 | AI Hallucination Risks | Chatbot may provide inaccurate municipal guidance or unsupported answers. | 3 | 4 | 12 | Use approved knowledge base retrieval, guardrails, confidence thresholds, safe fallback messages, and human escalation. | Muhammed Sadik KT |
| R-011 | Face Recognition Errors | Attendance may be incorrectly marked due to false match, failed liveness, poor lighting, or model error. | 3 | 4 | 12 | Use liveness checks, confidence thresholds, manual review, PIN/manual fallback, and audit every biometric action. | Muhammed Sadik KT |
| R-012 | File Tampering | Complaint attachments, certificate files, report exports, or uploaded documents may be altered or replaced. | 3 | 4 | 12 | Store file checksums, enforce storage access controls, restrict overwrite operations, and audit file lifecycle events. | Muhammad Sanish |
| R-013 | Backup Failure | Backups may fail, be incomplete, or be unusable during recovery. | 2 | 5 | 10 | Monitor backup jobs, run restore tests, protect backup credentials, and maintain backup evidence. | Fathima Hana |
| R-014 | Municipality Handover Risks | Municipality officials may receive incomplete credentials, documentation, training, or operational procedures. | 3 | 4 | 12 | Use handover checklist, conduct admin/user training, document support contacts, and verify backup/security configuration handover. | Shared Architecture Leads |
| R-015 | Scalability Risks | Complaint, chatbot, attendance, OCR, or file tracking usage may exceed initial capacity assumptions. | 3 | 4 | 12 | Plan indexes, queue-based processing, rate limits, monitoring, and capacity review before production. | Muhammad Sanish |
| R-016 | Vendor Dependency Risks | Gemini API, MongoDB Atlas, storage provider, or external AI/OCR services may become unavailable or change behavior. | 3 | 4 | 12 | Use fallback messages, retries, circuit breakers, monitoring, abstraction layers, and documented vendor contingency plans. | Muhammed Sadik KT |
| R-017 | OCR Processing Risk | OCR may misread uploaded documents, causing incorrect file/certificate processing decisions. | 3 | 3 | 9 | Treat OCR output as assistive, require validation, log source files, and route uncertain results for staff review. | Muhammad Sanish |
| R-018 | Audit Log Gaps | Sensitive operations may occur without sufficient traceability. | 2 | 5 | 10 | Log authentication, role changes, exports, AI actions, attendance, biometric consent, and file operations. | Adithyan N |

## Key Risk Recommendations

- Complete API Architecture before backend implementation to reduce access-control and integration risks.
- Require backend authorization as the authoritative control, even where frontend route guards exist.
- Treat AI chatbot and OCR outputs as advisory unless validated by approved backend workflows or staff review.
- Treat biometric attendance as consent-bound and always provide manual fallback.
- Validate backup and restore capability before municipality handover.

