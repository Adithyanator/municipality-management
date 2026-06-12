# Data Retention and Privacy Policy

Status: Draft  
Version: 0.9  
Owner: Adithyan N - Security Architecture Lead  
Review Contributors: Minha Palakkathodi, Fathima Hana, Muhammad Sanish, Fadi Ahmed, Muhammed Sadik KT

## Purpose

This draft policy defines retention, access control, encryption, archival, and deletion expectations for core municipal data categories. Final legal retention periods must be approved by municipality policy before production.

## Retention and Privacy Matrix

| Data Category | Retention Period | Access Controls | Encryption Requirements | Archival Strategy | Deletion Policy |
| --- | --- | --- | --- | --- | --- |
| Citizen Data | Municipality policy required; retain only while needed for approved services and legal operations. | Citizen own access; authorized staff/admin access by RBAC and purpose. | TLS in transit, encryption at rest, field-level encryption where approved for sensitive fields. | Archive inactive citizen service records by policy with restricted access. | Delete or anonymize when policy permits and no active service/legal dependency exists. |
| Complaint Records | Municipality policy required; active complaints retained through resolution and review period. | Citizen owner, assigned staff, department officers, admin, and auditor read access by role. | TLS, encryption at rest, protected attachments. | Archive closed complaints after approved retention trigger. | Delete/anonymize only under approved records policy; preserve audit metadata where required. |
| Attendance Records | Municipality attendance policy required. | Staff own view, department/admin authorized view, auditor read-only. | TLS and encryption at rest. | Archive attendance history and summaries by policy. | Delete after approved attendance retention period; preserve audit evidence where required. |
| Face Images | Raw face images must not be stored permanently unless legally required by approved policy. | No routine user access; processing only by authorized face recognition workflow. | If temporary processing is required, protect in transit and avoid persistent storage. | No archive unless legally required. | Delete immediately after enrollment/verification processing unless approved legal retention applies. |
| Encrypted Face Templates | Until consent withdrawal, employment end, retention expiry, or template rotation. | Service-controlled access only; admin metadata view only where authorized. | AES-256/KMS-backed encryption, TLS, encryption at rest. | Retain deletion metadata and audit evidence as policy requires. | Revoke/delete template material when consent is withdrawn, employment ends, or retention expires. |
| Uploaded Documents | Municipality policy required based on complaint, file tracking, permit, certificate, or report workflow. | Owner/assigned staff/admin access based on workflow and RBAC. | Encrypted storage, TLS, checksum validation. | Archive documents with linked metadata and access restrictions. | Delete after approved retention expiry; preserve audit and checksum metadata where required. |
| Audit Logs | Municipality-approved audit retention required. | Admin/Super Admin/System Auditor read access; no citizen/staff access. | Encryption at rest and TLS. | Archive tamper-protected logs according to policy. | Do not delete before approved retention expiry; deletion must be audited. |
| AI Chat Logs | Six-month retention where approved by governance. | Owner, human reviewer, admin/auditor redacted access by RBAC. | TLS, encryption at rest, redaction where needed. | Archive only redacted metadata if longer retention is approved. | Expire by TTL or cleanup job after approved retention period. |
| Report Exports | Short-lived operational retention; final period by municipality policy. | Admin-only access with export audit trail. | Encrypted storage and TLS. | Archive only when policy requires; otherwise expire. | Delete export files after expiry; retain export metadata as policy requires. |

## Privacy Controls

- Apply least privilege across citizen, staff, department, admin, auditor, and support roles.
- Separate public file tracking notes from internal officer or audit notes.
- Do not store plaintext passwords, raw password reset tokens, plaintext API keys, private keys, or database credentials.
- Use redaction for chatbot transcripts and AI logs where sensitive data is not required.
- Treat OCR output as derived data that must be validated before operational decisions.
- Audit access to report exports, biometric actions, role changes, settings changes, and sensitive records.

## Archival Strategy

- Archive only after workflow closure and policy-approved retention trigger.
- Preserve metadata needed for auditability without retaining unnecessary sensitive content.
- Keep archived records encrypted and access-controlled.
- Validate archive restore procedures as part of disaster recovery testing.

## Deletion Policy

- Deletion must follow municipality retention policy and approved workflow state.
- Biometric templates must be deleted or revoked when consent is withdrawn, employment ends, retention expires, or template rotation requires cleanup.
- Raw face images should be deleted immediately after processing unless legally required.
- Password reset tokens must expire through TTL and store only token hashes.
- Deletion jobs must be auditable.

