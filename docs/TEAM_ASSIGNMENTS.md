# Team Assignments

## Member 1 - Frontend/UI

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

## Member 2 - Backend/Database

Primary branches:

- `feature/backend`
- `feature/database`
- `feature/api`

Owned areas:

- `backend/`
- `database/`
- `docs/04-Database-Architecture/`
- `docs/05-API-Architecture/`

Responsibilities:

- Node.js/Express backend planning.
- API contracts, middleware, validators, services, repositories, jobs, and queues.
- MongoDB schemas, indexes, migrations, seeders, backup planning, and validation.
- Authentication, RBAC, audit, report export, and system settings planning.

## Member 3 - AI/Computer Vision

Primary branches:

- `feature/ai`

Owned areas:

- `ai-services/`
- `docs/07-AI-Architecture/`

Responsibilities:

- Gemini chatbot, AI Gateway, RAG, embeddings, prompts, and guardrails planning.
- Face recognition enrollment, liveness, matching, and attendance planning.
- AI audit/error logging and human review workflow planning.

## Shared Documentation Responsibilities

Shared branches:

- `develop`
- `feature/srs`
- `feature/security`

Shared areas:

- `docs/01-SRS/`
- `docs/02-System-Architecture/`
- `docs/03-Security-Architecture/`
- `docs/08-Meeting-Minutes/`
- `docs/09-Handover-Documents/`
- `docs/10-Risk-Management/`

Rules:

- Keep documentation aligned with the approved architecture documents.
- Do not commit secrets, credentials, generated backups, or runtime logs.
- Do not add application implementation code until implementation is explicitly approved.
- Use pull requests for team review before merging into `develop` or `main`.

