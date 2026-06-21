# Team Assignments

## Responsibility Matrix

| Name               | Role                          | Primary Deliverables                                                         | Review Responsibilities                                                                                 |
| ------------------ | ----------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Minha Palakkathodi | SRS Architecture Lead         | SRS folder, requirement traceability, scope updates                          | Reviews all changes for SRS alignment and scope control                                                 |
| Adithyan N         | Security Architecture Lead    | Security architecture, RBAC review, risk-management documentation            | Reviews authentication, authorization, privacy, audit, biometric, and AI safety controls                |
| Fathima Hana       | Database Architecture Lead    | Database architecture, schemas, indexes, validation and backup notes         | Reviews data model, MongoDB Atlas design, retention, encryption, and data governance                    |
| Muhammad Sanish    | API Architecture Lead         | API architecture, backend module contracts, middleware and integration notes | Reviews API boundaries, validation, error handling, service contracts, and backend security enforcement |
| Fadi Ahmed         | UI/Frontend Architecture Lead | UI architecture, frontend route map, portal and component documentation      | Reviews React route protection, portal segregation, navigation, and frontend workflows                  |
| Muhammed Sadik KT  | AI Architecture Lead          | AI architecture, chatbot/RAG notes, face recognition workflow notes          | Reviews Gemini integration, guardrails, embeddings, liveness, matching, fallback, and AI auditability   |

## Minha Palakkathodi - SRS Architecture Lead

Primary branch:

- `feature/srs`

Owned areas:

- `docs/01-SRS/`
- SRS requirement traceability

Responsibilities:

- Maintain SRS documentation structure.
- Coordinate requirement coverage and scope control.
- Review changes against the approved SRS.

## Adithyan N - Security Architecture Lead

Primary branch:

- `feature/security`

Owned areas:

- `docs/03-Security-Architecture/`
- `docs/10-Risk-Management/`

Responsibilities:

- Maintain security architecture and risk-management documentation.
- Review RBAC, authentication, authorization, audit, privacy, biometric, and AI safety controls.
- Verify security alignment across architecture areas.

## Fathima Hana - Database Architecture Lead

Primary branch:

- `feature/database`

Owned areas:

- `database/`
- `docs/04-Database-Architecture/`

Responsibilities:

- Maintain database architecture documentation.
- Review MongoDB collections, schemas, indexes, validation, retention, and backups.
- Coordinate database deliverables with API and security architecture.

## Muhammad Sanish - API Architecture Lead

Primary branches:

- `feature/api`
- `feature/backend`

Owned areas:

- `backend/`
- `docs/05-API-Architecture/`

Responsibilities:

- Maintain API and backend architecture documentation.
- Review endpoint contracts, middleware, validators, services, integrations, and error handling.
- Coordinate backend interfaces with database, frontend, security, and AI leads.

## Fadi Ahmed - UI/Frontend Architecture Lead

Primary branches:

- `feature/frontend`
- `feature/ui`

Owned areas:

- `frontend/`
- `frontend/src/pages/`
- `frontend/src/components/`
- `docs/06-UI-Architecture/`

Responsibilities:

- Public, citizen, staff, and admin portal planning.
- React route structure and route-guard documentation.
- UI component and layout planning.
- Chatbot, grievance, and attendance scanner UI planning.

## Muhammed Sadik KT - AI Architecture Lead

Primary branch:

- `feature/ai`

Owned areas:

- `ai-services/`
- `docs/07-AI-Architecture/`

Responsibilities:

- Gemini chatbot, AI Gateway, RAG, embeddings, prompts, and guardrails planning.
- Face recognition enrollment, liveness, matching, and attendance planning.
- AI audit/error logging and human review workflow planning.

## Shared Documentation Responsibilities

Shared branch:

- `develop`

Shared areas:

- `docs/02-System-Architecture/`
- `docs/08-Meeting-Minutes/`
- `docs/09-Handover-Documents/`

Rules:

- Keep documentation aligned with the approved architecture documents.
- Do not commit secrets, credentials, generated backups, or runtime logs.
- Do not add application implementation code until implementation is explicitly approved.
- Use pull requests for team review before merging into `develop` or `main`.
