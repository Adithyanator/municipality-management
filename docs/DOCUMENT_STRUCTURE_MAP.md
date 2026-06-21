# Document Structure Map

This map records where approved source documents currently live and where they are mirrored in the standardized documentation folders. Original files remain untouched.

| Original Location             | Standardized Location            | Document Name                                                | Document Owner                             | Purpose                                                                                                                                                                                        |
| ----------------------------- | -------------------------------- | ------------------------------------------------------------ | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/srs/`                   | `docs/01-SRS/`                   | `SRS_AI_Powered_Municipality_Management_Portal_Updated.docx` | Minha Palakkathodi - SRS Architecture Lead | Approved software requirements, project scope, roles, functional requirements, non-functional requirements, architecture alignment appendix, and validation baseline.                          |
| `docs/architecture/security/` | `docs/03-Security-Architecture/` | `Security_Access_Control_Architecture_Document.md`           | Adithyan N - Security Architecture Lead    | Approved security and access-control architecture covering RBAC, authentication, authorization, data security, AI security, biometric security, audit, threat modeling, and incident response. |
| `docs/architecture/database/` | `docs/04-Database-Architecture/` | `SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md`     | Fathima Hana - Database Architecture Lead  | Approved MongoDB Atlas database architecture, collection catalog, AI/database extensions, validation rules, indexes, retention guidance, and frontend/SRS coverage mapping.                    |
| `docs/architecture/frontend/` | `docs/06-UI-Architecture/`       | `Frontend_Architecture_Final_Merged_Updated.pdf`             | Fadi Ahmed - UI/Frontend Architecture Lead | Approved frontend/UI architecture covering public, citizen, staff, and admin portal workflows, route protection, and UI-level access-control expectations.                                     |
| `docs/architecture/ai/`       | `docs/07-AI-Architecture/`       | `AI_Architecture_Final_Submission_Updated.pdf`               | Muhammed Sadik KT - AI Architecture Lead   | Approved AI architecture covering Gemini chatbot integration, AI Gateway, RAG, guardrails, face recognition attendance, consent, fallback, and AI governance.                                  |
| `docs/reports/`               | `docs/reports/`                  | `Final_Compliance_Report.md`                                 | Shared architecture leads                  | Final synchronization and implementation-readiness report for the approved document package.                                                                                                   |
| `docs/reports/`               | `docs/reports/`                  | `Traceability_Matrix.md`                                     | Shared architecture leads                  | Requirement traceability between AI, frontend, database, and SRS coverage.                                                                                                                     |

## Notes

- Standardized folders are intended for team-facing documentation navigation.
- Original source locations remain available for backward compatibility and document provenance.
- Missing architecture documents are tracked in `docs/PENDING_DOCUMENTS.md`.
