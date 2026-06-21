# Backup and Disaster Recovery Plan

Status: Draft  
Version: 0.9  
Owner: Adithyan N - Security Architecture Lead  
Review Contributors: Fathima Hana - Database Architecture Lead, Muhammad Sanish - API Architecture Lead

## Purpose

This plan defines draft backup and disaster recovery expectations for the municipal platform. Final backup frequency, legal retention duration, RPO, and RTO must be approved by municipality policy before production.

## Backup Strategy

- Use automated encrypted backups for MongoDB data.
- Store uploaded documents, report exports, and related file metadata in a controlled backup scope.
- Protect audit logs, AI audit logs, and AI error logs from unauthorized deletion or alteration.
- Maintain backup access under least privilege.
- Test restoration before municipality handover and before production use.
- Keep backup credentials and storage secrets outside MongoDB and outside the Git repository.

## Database Backup Policy

| Database Area                                                                  | Backup Requirement                                               | Security Requirement                                                            |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Citizen, complaint, file tracking, certificate, tax, payment, feedback records | Daily backup minimum until municipality policy defines final RPO | Encrypted backup, restricted restore access, audit of restore actions.          |
| Attendance, attendance summary, staff presence                                 | Daily backup minimum                                             | Encrypted backup and role-restricted restore validation.                        |
| Biometric consents and face templates                                          | Daily backup minimum with policy-aware deletion handling         | Encrypted backup, KMS-backed template protection, consent-aware restore review. |
| Chatbot sessions/messages and knowledge base                                   | Daily backup minimum                                             | Redaction-aware handling and AI governance review.                              |
| Audit logs, AI audit logs, AI error logs                                       | Protected backup with tamper-aware retention                     | Restricted read access, integrity review, and restore evidence.                 |

## Document Backup Policy

| Document Type                       | Backup Requirement                                  | Access Control                                    |
| ----------------------------------- | --------------------------------------------------- | ------------------------------------------------- |
| Uploaded complaint files            | Encrypted storage backup with file metadata mapping | Owner/assigned staff/admin access only.           |
| Permit/certificate files            | Encrypted storage backup                            | Citizen owner and authorized staff/admin access.  |
| OCR source files                    | Encrypted backup if retention is approved           | Restricted processing access and deletion policy. |
| Report exports                      | Expiry-aware backup handling                        | Admin-only access with export audit logs.         |
| Architecture and handover documents | Git repository and controlled archive backup        | Team and municipality review access.              |

## Recovery Procedures

1. Declare the incident and assign an incident owner.
2. Identify affected services, collections, files, and user roles.
3. Preserve audit logs and correlation IDs.
4. Suspend compromised accounts, sessions, or service credentials where needed.
5. Identify the last known good database and document backup.
6. Restore to a controlled validation environment.
7. Validate MongoDB schemas, indexes, vector indexes, and core workflows.
8. Validate file metadata, checksums, and download permissions.
9. Validate audit logs, report export records, AI audit logs, and biometric consent/template linkage.
10. Rotate secrets if compromise is suspected.
11. Obtain authorized approval before production restoration.
12. Record recovery actions in incident notes and audit records.

## RPO and RTO

| Objective | Draft Value                                                  | Notes                                                                                  |
| --------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| RPO       | 24 hours maximum until final municipality policy is approved | A shorter RPO may be required for attendance, complaints, and payment-related records. |
| RTO       | Same business day for core citizen services where feasible   | Exact RTO must be approved by municipality operations.                                 |

## Disaster Scenarios

| Scenario                         | Recovery Response                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| MongoDB outage                   | Activate database recovery/failover, validate last successful backup, restore if required.             |
| Database corruption              | Stop writes, preserve evidence, restore last known good backup, replay validated changes if available. |
| Ransomware                       | Isolate affected systems, revoke credentials, restore from clean offline/offsite backup.               |
| File storage compromise          | Disable affected storage access, validate checksums, restore clean files, rotate storage credentials.  |
| Gemini or AI service outage      | Use safe fallback messages and human escalation until service recovers.                                |
| Face recognition service failure | Use manual/PIN attendance fallback and record fallback audit evidence.                                 |
| Admin credential compromise      | Revoke sessions, rotate credentials, review audit logs, restore configuration if changed.              |

## Recovery Testing Plan

| Test                     | Frequency                                         | Evidence                                                 |
| ------------------------ | ------------------------------------------------- | -------------------------------------------------------- |
| Database restore test    | Before production and then by municipality policy | Restore log, validation checklist, responsible reviewer. |
| File restore test        | Before production and after storage changes       | File checksum validation and access-control test.        |
| Audit log restore test   | Before production                                 | Audit continuity report.                                 |
| Attendance fallback test | Before production                                 | Manual/PIN fallback evidence and audit record.           |
| AI fallback test         | Before production                                 | Safe fallback and human escalation test results.         |
