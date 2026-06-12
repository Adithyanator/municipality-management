# Team Structure

## Minha Palakkathodi - SRS Architecture Lead

Owns:

- `docs/01-SRS/`
- SRS requirement traceability

Responsibilities:

- Maintain SRS documentation structure.
- Coordinate requirement coverage and scope control.
- Review changes against the approved SRS.
- Ensure project documentation remains aligned with approved requirements.

## Adithyan N - Security Architecture Lead

Owns:

- `docs/03-Security-Architecture/`
- `docs/10-Risk-Management/`

Responsibilities:

- Maintain security architecture and access-control documentation.
- Review RBAC, authentication, audit, privacy, and risk-control coverage.
- Coordinate risk-management documentation.
- Verify security alignment across SRS, API, database, UI, and AI documents.

## Fathima Hana - Database Architecture Lead

Owns:

- `database/`
- `docs/04-Database-Architecture/`

Responsibilities:

- Maintain MongoDB Atlas database architecture documentation.
- Review collections, schemas, indexes, validation, retention, and backup planning.
- Coordinate database deliverables with API and security architecture.
- Ensure database documentation follows the approved architecture.

## Muhammad Sanish - API Architecture Lead

Owns:

- `backend/`
- `docs/05-API-Architecture/`

Responsibilities:

- Maintain backend and API architecture documentation.
- Review endpoint contracts, middleware boundaries, validation, error handling, and service integrations.
- Coordinate backend interfaces with database, frontend, security, and AI leads.
- Ensure API architecture follows the approved SRS and security requirements.

## Fadi Ahmed - UI/Frontend Architecture Lead

Owns:

- `frontend/`
- `frontend/src/pages/`
- `frontend/src/components/`
- `docs/06-UI-Architecture/`

Responsibilities:

- Maintain frontend and UI architecture documentation.
- Review public, citizen, staff, and admin portal structure.
- Coordinate route guards, navigation, layouts, and frontend access-control documentation.
- Ensure UI architecture follows the approved frontend and security requirements.

## Muhammed Sadik KT - AI Architecture Lead

Owns:

- `ai-services/`
- `docs/07-AI-Architecture/`

Responsibilities:

- Maintain AI chatbot and face recognition architecture documentation.
- Review Gemini, AI Gateway, RAG, embeddings, prompts, guardrails, liveness, matching, and attendance AI workflows.
- Coordinate AI service boundaries with API, database, and security leads.
- Ensure AI architecture follows the approved AI and security requirements.

## Responsibility Matrix

| Name | Role | Primary Deliverables | Review Responsibilities |
| --- | --- | --- | --- |
| Minha Palakkathodi | SRS Architecture Lead | SRS folder, requirement traceability, scope updates | Reviews all changes for SRS alignment and scope control |
| Adithyan N | Security Architecture Lead | Security architecture, RBAC review, risk-management documentation | Reviews authentication, authorization, privacy, audit, biometric, and AI safety controls |
| Fathima Hana | Database Architecture Lead | Database architecture, schemas, indexes, validation and backup notes | Reviews data model, MongoDB Atlas design, retention, encryption, and data governance |
| Muhammad Sanish | API Architecture Lead | API architecture, backend module contracts, middleware and integration notes | Reviews API boundaries, validation, error handling, service contracts, and backend security enforcement |
| Fadi Ahmed | UI/Frontend Architecture Lead | UI architecture, frontend route map, portal and component documentation | Reviews React route protection, portal segregation, navigation, and frontend workflows |
| Muhammed Sadik KT | AI Architecture Lead | AI architecture, chatbot/RAG notes, face recognition workflow notes | Reviews Gemini integration, guardrails, embeddings, liveness, matching, fallback, and AI auditability |

## Collaboration Rules

- Work should be performed on the assigned feature branch.
- Shared contracts must be coordinated through pull requests and documented changes.
- No secrets, credentials, API keys, private keys, raw biometric data, or generated backups may be committed.
- Architecture changes must be reflected in the relevant `docs/` or `database/architecture/` files.
