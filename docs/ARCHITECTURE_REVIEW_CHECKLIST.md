# Architecture Review Checklist

## Review Ownership

| Name | Role | Primary Deliverables | Review Responsibilities |
| --- | --- | --- | --- |
| Minha Palakkathodi | SRS Architecture Lead | SRS folder, requirement traceability, scope updates | Reviews all checklist items for approved SRS scope alignment |
| Adithyan N | Security Architecture Lead | Security architecture, RBAC review, risk-management documentation | Reviews security, privacy, audit, biometric, and AI safety checklist items |
| Fathima Hana | Database Architecture Lead | Database architecture, schemas, indexes, validation and backup notes | Reviews database, retention, encryption, backup, and data-governance checklist items |
| Muhammad Sanish | API Architecture Lead | API architecture, backend module contracts, middleware and integration notes | Reviews API, backend, validation, error handling, and integration checklist items |
| Fadi Ahmed | UI/Frontend Architecture Lead | UI architecture, frontend route map, portal and component documentation | Reviews frontend route, portal, UI, and session workflow checklist items |
| Muhammed Sadik KT | AI Architecture Lead | AI architecture, chatbot/RAG notes, face recognition workflow notes | Reviews AI Gateway, RAG, guardrail, liveness, matching, fallback, and AI audit checklist items |

## Scope Control

- [ ] The design follows the approved SRS scope.
- [ ] No unsupported modules or services are introduced.
- [ ] Citizen, staff, admin, AI, attendance, database, and reporting boundaries are clear.
- [ ] Frontend, backend, AI services, and database responsibilities are separated.

## Frontend Architecture

- [ ] Public, citizen, staff, and admin portal separation is documented.
- [ ] Route guards and protected routes are defined.
- [ ] Role-based navigation is documented.
- [ ] Login, logout, password reset, and session handling are documented.
- [ ] Attendance scanner and webcam permission controls are documented.

## Backend and API Architecture

- [ ] Node.js/Express API boundaries are documented.
- [ ] JWT authentication and refresh/session handling are documented.
- [ ] RBAC middleware and permission checks are documented.
- [ ] Request validation and error response standards are documented.
- [ ] Report export and audit requirements are documented.

## Database Architecture

- [ ] MongoDB Atlas collections align with the approved database architecture.
- [ ] Schema validation requirements are documented.
- [ ] Index requirements are documented.
- [ ] Sensitive data and encryption requirements are documented.
- [ ] Backup and retention requirements are documented.

## AI Architecture

- [ ] Gemini access is backend-mediated through the AI Gateway.
- [ ] RAG uses approved knowledge base and embeddings.
- [ ] Prompt, guardrail, and tool-call validation requirements are documented.
- [ ] AI audit logs and AI error logs are documented.
- [ ] Human escalation and safe fallback behavior are documented.

## Face Recognition and Attendance

- [ ] Biometric consent is required before enrollment and verification.
- [ ] Raw face images are not permanently stored unless approved by policy.
- [ ] Encrypted face templates and KMS-backed encryption are documented.
- [ ] Liveness, confidence, manual review, and fallback flows are documented.
- [ ] Attendance and staff presence updates are documented.

## Security and Compliance

- [ ] RBAC and least privilege are documented.
- [ ] Audit logging requirements are documented.
- [ ] Secrets are excluded from MongoDB and repository files.
- [ ] Privacy, retention, and consent requirements are documented.
- [ ] Threats and mitigations are reviewed.

## Project Readiness

- [ ] Team ownership is documented.
- [ ] Branch strategy is documented.
- [ ] Required documentation folders exist.
- [ ] Handover and risk-management folders are prepared.
- [ ] No application code is added before implementation approval.
