# AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System

## Project Overview

This repository contains the approved architecture-first project structure for the Kottakkal municipality platform. The system scope follows the approved SRS, Database Architecture, AI Architecture, Frontend Architecture, and Security & Access Control Architecture documents.

The platform is organized for citizen services, staff complaint workflows, admin reporting, Gemini-backed AI chatbot assistance, MongoDB Atlas data architecture, and consent-based face recognition attendance. This repository setup does not include application implementation code yet.

## Technology Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose, JSON Schema validation, Atlas Search, Atlas Vector Search
- Authentication and Security: JWT, bcrypt, RBAC, password reset tokens, audit logs
- AI Chatbot: Gemini API through backend AI Gateway, RAG, guardrails, knowledge base embeddings
- Face Attendance: Python face recognition service, liveness, encrypted face templates, biometric consent
- DevOps and Collaboration: Git, GitHub, branch-based team workflow

## Folder Structure

```text
kottakkal/
  frontend/        React frontend portal structure
  backend/         Node.js/Express API structure
  ai-services/     Chatbot and face recognition service structure
  database/        Schemas, migrations, indexes, backups, and database architecture
  docs/            SRS, architecture documents, diagrams, reports, meeting notes
  deployment/      Deployment configuration placeholder
  scripts/         Utility and automation scripts placeholder
  .github/         GitHub ownership and workflow metadata
  README.md
  .gitignore
```

## Team Responsibilities

- Minha Palakkathodi - SRS Architecture Lead: owns SRS documentation and requirements traceability.
- Adithyan N - Security Architecture Lead: owns security architecture, access control, and risk review.
- Fathima Hana - Database Architecture Lead: owns MongoDB Atlas database architecture and data governance documentation.
- Muhammad Sanish - API Architecture Lead: owns backend/API architecture and integration contracts.
- Fadi Ahmed - UI/Frontend Architecture Lead: owns frontend route, portal, and UI architecture documentation.
- Muhammed Sadik KT - AI Architecture Lead: owns Gemini chatbot, RAG, and face recognition architecture documentation.

See `TEAM_STRUCTURE.md` for detailed ownership.

## Branch Strategy

- `main`: stable repository branch for reviewed and approved work.
- `develop`: integration branch for completed team work before release.
- `feature/frontend`: frontend/UI development branch.
- `feature/backend`: backend/database development branch.
- `feature/ai`: AI chatbot and face recognition development branch.

Branching rules are documented in `docs/BRANCH_STRATEGY.md`.

## Development Workflow

1. Pull the latest `develop` branch before starting work.
2. Work only in the assigned feature branch.
3. Keep changes aligned with the approved architecture documents.
4. Do not commit secrets, credentials, local environment files, generated backups, or runtime logs.
5. Open pull requests from feature branches into `develop`.
6. Merge `develop` into `main` only after review and verification.

## Installation Instructions

Application dependencies are not installed yet because this repository setup intentionally contains structure and documentation only.

When implementation begins:

```bash
cd frontend
npm install

cd ../backend
npm install
```

AI service setup will be defined when Python service implementation begins.

## Git Commands

```bash
git status
git checkout develop
git pull origin develop
git checkout feature/frontend
git add .
git commit -m "Describe the change"
git push origin feature/frontend
```

## Architecture Documents

Approved documents are stored under:

- `docs/srs/`
- `docs/architecture/frontend/`
- `docs/architecture/database/`
- `docs/architecture/ai/`
- `docs/architecture/security/`
- `database/architecture/`
- `docs/reports/`
