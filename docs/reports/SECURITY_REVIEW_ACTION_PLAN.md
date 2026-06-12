# Security Review Action Plan

Source: `docs/reports/SECURITY_DOCUMENT_REVIEW_REPORT.md`  
Purpose: Convert security documentation review findings into owner-assigned corrective actions.

## Team Owner Mapping

| Area | Owner |
| --- | --- |
| SRS | Minha Palakkathodi |
| Security | Adithyan N |
| Database | Fathima Hana |
| API | Muhammad Sanish |
| UI | Fadi Ahmed |
| AI | Muhammed Sadik KT |

## 1. Must Fix Before Architecture Freeze

| Finding ID | Severity | Required Action | Responsible Owner | Dependency | Target Phase |
| --- | --- | --- | --- | --- | --- |
| F-002 | High | Add a high-priority API authorization risk and define required endpoint-contract controls for RBAC, object ownership, department scope, report export restrictions, attendance endpoints, AI tool-call endpoints, and file upload/download endpoints. | Muhammad Sanish | API Architecture baseline; Security Architecture baseline | Before Architecture Freeze |
| F-008 | High | Add backup integrity validation, immutable/offline or offsite backup control, restricted backup deletion, and privileged backup operation audit requirements. | Adithyan N | Backup and Disaster Recovery Plan; Database backup requirements from Fathima Hana | Before Architecture Freeze |
| F-010 | High | Add Aadhaar duplicate-check privacy handling: raw Aadhaar must not be stored, only normalized hash may be used, with restricted access and deletion/anonymization policy. | Fathima Hana | Database Architecture; SRS citizen registration requirements; Security privacy baseline | Before Architecture Freeze |
| F-017 | High | Add credential handover controls covering secure channel, recipient identity verification, secret inventory, post-handover credential rotation, and developer-access revocation. | Adithyan N | Municipality Handover Checklist; secret-management rules | Before Architecture Freeze |
| F-005 | Medium | Add complete audit-event coverage aligned with the Security Architecture: route violations, settings changes, knowledge base publish/archive, exports, role/permission changes, biometric consent revocation, and face template deletion. | Adithyan N | Security Architecture audit requirements; Database audit collections | Before Architecture Freeze |
| F-006 | Medium | Add system settings governance risks and handover controls for non-secret settings, AI Gateway configuration identifiers, backup policy references, and settings-change audit. | Adithyan N | Security Architecture; Database `system_settings` collection | Before Architecture Freeze |
| F-014 | Medium | Add AI audit metadata requirements: prompt version, guardrail version, retrieval source IDs, prompt/response hashes, policy decision, fallback action, and tool-call validation status. | Muhammed Sadik KT | AI Architecture; Security Architecture AI governance section | Before Architecture Freeze |

## 2. Must Fix Before Municipality Handover

| Finding ID | Severity | Required Action | Responsible Owner | Dependency | Target Phase |
| --- | --- | --- | --- | --- | --- |
| F-007 | Medium | Add restore-test evidence template with backup snapshot ID, scope, restored collections, sample files, reviewer, timestamp, pass/fail status, and remediation owner. | Adithyan N | Backup and Disaster Recovery Plan; database restore procedure | Before Municipality Handover |
| F-009 | Medium | Add RPO/RTO tiers for authentication, complaint intake, attendance, file tracking, chatbot fallback, report exports, and document storage. | Adithyan N | Municipality operations approval; Database and API architecture inputs | Before Municipality Handover |
| F-016 | Medium | Add municipality acceptance sign-off sections for official, technical maintainer, security reviewer, database owner, and admin training completion. | Minha Palakkathodi | Handover Checklist; municipality review process | Before Municipality Handover |
| F-018 | Medium | Add support transition matrix with severity levels, support hours, response expectations, responsible contacts, and escalation path. | Minha Palakkathodi | Handover Checklist; municipality support ownership | Before Municipality Handover |
| F-019 | Medium | Add monitoring handover items for failed logins, export spikes, AI errors, backup failures, biometric anomalies, attendance fallback rates, and unauthorized access attempts. | Adithyan N | Security monitoring controls; support transition plan | Before Municipality Handover |
| F-011 | Medium | Define separate retention/access treatment for public tracking data, internal tracking notes, officer notes, and audit notes. | Fathima Hana | Database Architecture; Security Architecture public/private note separation | Before Municipality Handover |
| F-012 | Medium | Add operational safeguards for temporary face capture cleanup, browser-side non-retention, no screenshots/debug logs, and camera permission audit where applicable. | Fadi Ahmed | UI Architecture; AI/biometric workflow; Security Architecture | Before Municipality Handover |
| F-013 | Medium | Add OCR extracted text as a privacy data category with retention, access control, validation, and auditability rules. | Muhammad Sanish | API/OCR processing design; Data Retention and Privacy Policy | Before Municipality Handover |

## 3. Can Be Implemented During Development

| Finding ID | Severity | Required Action | Responsible Owner | Dependency | Target Phase |
| --- | --- | --- | --- | --- | --- |
| F-001 | Medium | Add municipality-specific operational risks for department assignment error, SLA breach, incorrect file tracking status, certificate/permit delay, and notification failure. | Minha Palakkathodi | SRS workflows; API/UI/Database input | During Development |
| F-003 | Medium | Add bot-abuse controls for registration, password reset, chatbot, complaint submission, and public file tracking, including CAPTCHA where abuse is observed. | Muhammad Sanish | API Architecture; Security controls; UI implementation plan | During Development |
| F-004 | Medium | Add CSRF, token theft, refresh-token replay, and insecure browser storage threats and controls. Include SameSite, HttpOnly, Secure cookies where applicable. | Fadi Ahmed | UI Architecture; API authentication design | During Development |
| F-015 | Medium | Add human-review workflow controls for chatbot escalation, low-confidence AI answers, failed liveness, low-confidence face matches, and manual attendance approvals. | Muhammed Sadik KT | AI Architecture; Security Architecture; API workflow design | During Development |
| F-020 | Low | Keep direct Gemini-write prohibition explicit in future API Architecture and chatbot workflow documents. | Muhammed Sadik KT | API Architecture; AI Gateway design | During Development |
| F-021 | Low | Add cleanup evidence for raw face image non-retention as part of biometric workflow testing and audit evidence. | Fadi Ahmed | UI webcam workflow; AI face recognition service | During Development |

## 4. Future Enhancements

| Finding ID | Severity | Required Action | Responsible Owner | Dependency | Target Phase |
| --- | --- | --- | --- | --- | --- |
| F-022 | Low | Add MFA/2FA as a future enhancement for admin, Super Admin, report exports, role/permission changes, and biometric administration. | Adithyan N | Security Architecture future enhancement path; authentication roadmap | Future Enhancement |

## Execution Notes

- High-severity findings should be resolved before any architecture freeze activity.
- Handover-related findings should be closed before municipality operational handover.
- Development-phase findings must be converted into implementation backlog items once application development begins.
- Future enhancements should not block current documentation readiness unless the municipality requires them as production prerequisites.

