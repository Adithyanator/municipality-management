# Team Structure

## Member 1 - Frontend/UI

Owns:

- `frontend/`
- `frontend/src/pages/`
- `frontend/src/components/`

Responsibilities:

- React portal structure for public, citizen, staff, and admin areas.
- UI components, layouts, route guard integration, and portal navigation.
- Chatbot UI, attendance scanner UI, grievance UI, and frontend validation.
- Alignment with the approved Frontend Architecture and Security Architecture.

## Member 2 - Backend/Database

Owns:

- `backend/`
- `database/`

Responsibilities:

- Node.js/Express API structure.
- Authentication, JWT sessions, RBAC middleware, validators, services, repositories, jobs, and queues.
- MongoDB Atlas schemas, migrations, indexes, seeders, backup references, and database diagrams.
- Alignment with the approved Database Architecture, SRS, and Security Architecture.

## Member 3 - AI/Computer Vision

Owns:

- `ai-services/`

Responsibilities:

- Gemini chatbot support structure, RAG, embeddings, prompts, guardrails, and chatbot tests.
- Face recognition enrollment, liveness, matching, attendance flow, and tests.
- Shared AI service configs, logs, and utilities.
- Alignment with the approved AI Architecture and Security Architecture.

## Collaboration Rules

- Work should be performed on the assigned feature branch.
- Shared contracts must be coordinated through pull requests and documented changes.
- No secrets, credentials, API keys, private keys, raw biometric data, or generated backups may be committed.
- Architecture changes must be reflected in the relevant `docs/` or `database/architecture/` files.

