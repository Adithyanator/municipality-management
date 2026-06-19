# Architecture Gap Analysis

**Project:** AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System  
**Version:** 1.0  
**Status:** Approved for Development (Consolidated Gap Log)  
**Author:** Principal Enterprise Architect  

---

## 1. Executive Summary

This Gap Analysis identifies omissions, vulnerabilities, and misalignments in the Smart Municipal Citizen Assistance and Staff Attendance Management System. By analyzing the Software Requirements Specification (SRS), Database Architecture, Security Architecture, UI, AI, and API documents, we have compiled all unresolved gaps into this central document.

The findings have been categorized by severity (Critical, High, Medium, Low) to prioritize remediation actions. Resolving these gaps is required before final deployment.

---

## 2. Severity Classification Criteria

* **Critical:** Gaps that present severe security risks, block core municipal services, cause compliance violations, or could result in permanent loss of database integrity or backup recovery capabilities.
* **High:** Technical omissions that bypass access controls, expose sensitive personal data (PII), or lack specific implementation details required for secure deployment.
* **Medium:** Operational omissions, missing telemetry, lack of bot-abuse controls, or generic workflows that delay service routing or limit support capabilities.
* **Low:** Minor documentation inconsistencies, recommendations for future step-up security (such as MFA), or non-critical diagnostic improvements.

---

## 3. Gap Catalog

### 3.1 Critical Gaps (Severity: Critical)

#### Gap GA-01: Incomplete Backup Immutability and Deletion Protections
* **Category:** Security Controls / Operational Controls
* **Impact:** High susceptibility to ransomware attacks or compromised admin access where attackers delete database volumes and corresponding backups.
* **Description:** The Backup Plan specifies daily backups but does not mandate write-once-read-many (WORM) immutable backup storage (e.g., AWS S3 Object Lock), offsite/offline replication, or multi-person validation (dual-control) for backup deletion.
* **Remediation:** Configure immutable database backups and restrict backup deletion permissions through multi-factor validation.

#### Gap GA-02: Missing Developer Access Revocation & Credential Rotation Procedure
* **Category:** Handover Items
* **Impact:** Unauthorized developer access to municipal systems post-handover, risking data leaks.
* **Description:** The Handover Checklist references secure transfer channels but lacks a specific, mandatory post-handover credential rotation procedure and developer-access revocation rules.
* **Remediation:** Establish a post-handover rotation rule requiring rotation of database passwords, API keys, and KMS keys within 24 hours of transfer. Revoke developer IAM and database users.

---

### 3.2 High Gaps (Severity: High)

#### Gap GA-03: Missing API Object-Level Authorization Controls
* **Category:** APIs / Security Controls
* **Impact:** Malicious actors or low-privilege roles could call restricted routes (such as audit log retrieval or bulk data exports) by guessing parameter IDs.
* **Description:** API route definitions list required roles but omit specific verification checks verifying that:
  1. Staff members belong to the department assigned to a ticket.
  2. Report export downloads verify ownership of the requesting admin's token.
  3. Biometric configuration calls require step-up authorization.
* **Remediation:** Enforce object-level verification middleware on all mutate routes and restrict logs/exports to matching actor IDs.

#### Gap GA-04: Aadhaar Normalized Hash Derivation and Duplicate Logic Omission
* **Category:** Features / Security Controls
* **Impact:** Legal violations of national data protection standards due to potential plaintext Aadhaar leakage.
* **Description:** The database schema lists `users.aadhaar_hash` for citizen duplicate-checking. However, the exact key-derivation function (e.g., PBKDF2 with salt and pepper) and storage restrictions are not documented.
* **Remediation:** Document the hash derivation method and restrict database queries to matching pre-computed hashes only.

#### Gap GA-05: Missing Database Schemas for OCR Derived Text
* **Category:** Features / Database Controls
* **Impact:** Uncontrolled storage of derived PII (such as parsed Aadhaar cards, tax receipts) without explicit retention policies or cleanup.
* **Description:** The Database Architecture supports common attachments but lacks specific collection parameters and access rules for temporary text derived from OCR scans.
* **Remediation:** Define metadata structures within the `files` schema or configure a temporary `ocr_cache` collection with restricted read access and a 7-day TTL index.

---

### 3.3 Medium Gaps (Severity: Medium)

#### Gap GA-06: Missing Biometric and Chatbot Human Review Workflows
* **Category:** Operational Controls
* **Impact:** System blockages or un-audited overrides when AI liveness checks fail, face matching is low-confidence, or citizens request human chat handoff.
* **Description:** The AI and UI documents specify fallback actions (e.g., manual overrides), but the technical routing of these escalations to the `ai_human_review_queue` collection is not mapped to specific API controllers or dashboard screens.
* **Remediation:** Map review-queue workflows and endpoints, specifying transition logic to mark attendance records as verified using a fallback method.

#### Gap GA-07: Lacking Bot Abuse Safeguards on Public Endpoint Interfaces
* **Category:** APIs / Security Controls
* **Impact:** Susceptibility to brute-force attacks, spam registration, and resource exhaustion on public endpoints.
* **Description:** The API baseline lists public routes (login, register, public tracking, chatbot sessions) but does not require CAPTCHA (e.g., Cloudflare Turnstile) or IP reputation checks.
* **Remediation:** Enforce CAPTCHA challenges on all public mutate operations.

#### Gap GA-08: Missing CSRF Middlewares and Secure Cookie Settings
* **Category:** Security Controls
* **Impact:** Susceptibility to Cross-Site Request Forgery (CSRF) and browser-side token theft.
* **Description:** The UI and Security architectures detail JWT authentication but omit token transport controls (such as `HttpOnly`, `SameSite=Strict` cookies, and Anti-CSRF token verification middlewares).
* **Remediation:** Mandate cookie transport parameters and add Anti-CSRF verification middleware for mutate actions.

#### Gap GA-09: Missing Support SLAs and Escalation Matrices
* **Category:** Handover Items
* **Impact:** Extended operational downtime due to lack of defined support guidelines during critical system issues.
* **Description:** The handover documentation identifies a "support owner" but lacks a defined SLA matrix classifying response times, escalation contacts, or support hours.
* **Remediation:** Include a support transition matrix with response expectations and escalation paths.

#### Gap GA-10: Lack of Unified Monitoring Alerts
* **Category:** Monitoring
* **Impact:** Delayed response to system failures, security anomalies, or unauthorized access attempts.
* **Description:** The handover checklist does not require configuration of alert parameters for failed logins, bulk export spikes, AI integration errors, backup failures, or biometric failures.
* **Remediation:** Add monitoring rules for security events, failed backups, export spikes, and biometric anomalies.

#### Gap GA-11: Generic RPO and RTO Targets
* **Category:** Operational Controls
* **Impact:** Mismatched operational expectations during system recoveries.
* **Description:** The Backup Plan applies a generic 24-hour RPO and same-business-day RTO to all data. Critical workflows (such as authentication and attendance) are not separated from low-priority tasks (such as feedback collection).
* **Remediation:** Define tiered recovery targets, prioritizing authentication, attendance, and complaint intake.

#### Gap GA-12: Lacking Automated Testing Requirements for Specialized Services
* **Category:** Testing Requirements
* **Impact:** Functional regression or model bias in production deployments.
* **Description:** The testing strategy does not define automated verification specifications for:
  1. Semantic search accuracy and Vector Search latency.
  2. Face matching thresholds and false-positive/negative rates under different lighting conditions.
  3. Liveness check verification under simulated spoofing attacks.
* **Remediation:** Establish validation scripts for matching scores, vector query recall, and liveness accuracy.

---

### 3.4 Low Gaps (Severity: Low)

#### Gap GA-13: Incomplete Multi-Factor Authentication (MFA) Roadmap Linkage
* **Category:** Security Controls
* **Impact:** Administrative accounts rely solely on passwords, increasing password compromise risks.
* **Description:** The Security Architecture recommends MFA as a future enhancement but does not integrate it into the current API or UI architectures.
* **Remediation:** Document the future integration path for MFA/2FA on administrative portals.

---

## 4. Gap Matrix Summary

| Gap ID | Area / Category | Description Summary | Severity | Priority | Owner |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GA-01** | Backup Security | Immutability and deletion protections | Critical | P1 | Adithyan N |
| **GA-02** | Handover Items | Credential rotation & access revocation | Critical | P1 | Adithyan N |
| **GA-03** | API Security | Object-level authorization middleware | High | P2 | Muhammad Sanish |
| **GA-04** | Data Privacy | Aadhaar normalized hash derivation | High | P2 | Fathima Hana |
| **GA-05** | Database Scope | Temporary OCR derived text schemas | High | P2 | Fathima Hana |
| **GA-06** | AI Operations | Biometric human review routing | Medium | P3 | Muhammed Sadik KT |
| **GA-07** | Public APIs | Bot abuse CAPTCHA controls | Medium | P3 | Muhammad Sanish |
| **GA-08** | UI/API Security | CSRF and secure cookie transport | Medium | P3 | Fadi Ahmed |
| **GA-09** | Handover Items | Support SLAs and escalation matrices | Medium | P3 | Minha Palakkathodi |
| **GA-10** | System Monitoring| Alerting on failures/anomalies | Medium | P3 | Adithyan N |
| **GA-11** | Backup Policy | Tiered RPO/RTO targets | Medium | P3 | Adithyan N |
| **GA-12** | Quality Testing | Automated tests for AI/Biometrics | Medium | P3 | Shared Leads |
| **GA-13** | Authentication | MFA integration path | Low | P4 | Adithyan N |

---

## 5. Conclusion & Action Items

To ensure successful development:
1. **Critical gaps (GA-01, GA-02)** must be resolved prior to the final Handover.
2. **High gaps (GA-03, GA-04, GA-05)** must be incorporated into early Database and API schema freeze updates.
3. **Medium gaps** should be prioritized as sprint tasks during application development.
