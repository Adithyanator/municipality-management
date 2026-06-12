# Architecture Review Checklist

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

