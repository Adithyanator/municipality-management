# Traceability Matrix

| AI Requirement | Frontend Requirement | Database Support | SRS Coverage |
| --- | --- | --- | --- |
| Gemini chatbot through backend AI Gateway | Citizen AI Chatbot Overlay, chatbot suggestion chips, markdown response rendering | chatbot_sessions, chatbot_messages, ai_audit_logs, ai_errors, correlation IDs, prompt versions, guardrail versions | Appendix A.2, A.4, A.6, A.8 |
| RAG over approved municipal knowledge | FAQ answers, schemes/permits guidance, chatbot links to forms/docs | knowledge_base, kb_embeddings, retrieval_allowed, visibility, municipal_service_directory, retrieval source IDs | Appendix A.2, A.4, A.7 |
| Human escalation and chatbot ticket creation | Chatbot handoff, complaint/request creation, ticket status support | complaints chatbot fields, ai_human_review_queue, complaint_assignments, notifications | Appendix A.2, A.4, A.8 |
| Prompt versions, policy checks, telemetry, retries, normalized errors | Safe chatbot UX and backend API reliability | ai_audit_logs, ai_errors, policy_decision, retry_count, circuit_breaker_state, fallback_action, correlation_id | Appendix A.5, A.8, A.9 |
| Face recognition attendance | Staff Face Attendance Scanner, webcam capture, GPS verification | attendance AI fields, biometric_consents, face_templates, staff_presence, capture_location, location_verified | Appendix A.2, A.4, A.7 |
| Liveness detection and confidence scoring | Scanner low similarity/retry and success/failure states | liveness_score, liveness_result, face_match_score, confidence_decision, review_status | Appendix A.4, A.9, A.10 |
| Consent lifecycle and revocation | Staff enrollment and admin staff management | biometric_consents, consent_source, consent_policy_version, revoked_date, deletion_requested_at, face template deletion metadata | Appendix A.2, A.4, A.5, A.10 |
| Manual/PIN attendance fallback | Staff scanner failure fallback and manual attendance backup | verification_method, manual_fallback_used, fallback_reason, ai_human_review_queue, ai_errors fallback_action | Appendix A.2, A.4, A.10 |
| AI auditability and immutable traceability | Admin oversight, audit notes, exception review | ai_audit_logs, audit_logs, biometric_access_audit compatibility, operational_entity links | Appendix A.5, A.7, A.9 |
| Public landing page content | Landing page announcements, schemes, helplines | announcements, municipal_service_directory, files | Appendix A.2, A.7, A.8 |
| Public file tracking | Universal File Tracker with timeline and public officer notes | file_tracking, file_tracking_history, public_tracking_enabled, public_note/internal_note split | Appendix A.2, A.4, A.7, A.8 |
| Citizen registration and profile | Signup, profile manager, notification settings | users, citizen_addresses, user_notification_preferences, aadhaar_hash, preferred_language | Appendix A.3, A.4 |
| Password reset | Password Reset Portal | password_reset_tokens with token_hash and TTL expiry | Appendix A.4, A.5, A.8 |
| Complaint submission with GPS and attachments | Register Grievance, photo proof, geolocation | complaints location, attachment_file_ids, files metadata, 2dsphere index | Appendix A.4, A.7 |
| Complaint timeline and tracking | My Grievances Ledger, Detail Tracker, officer updates | complaint_status_history stage, public_note, officer_note, internal_audit_note, proof_file_ids | Appendix A.4, A.7 |
| Staff Kanban and resolution console | Assigned/In Progress/Resolved board, proof photo upload, completion notes | complaint_assignments kanban_column/status/priority/due_at, complaints resolution fields, files | Appendix A.3, A.4, A.7 |
| Admin triage and assignment | Grievance Triage Board, department/staff dispatch | complaints, complaint_assignments, departments, department_members, notifications | Appendix A.3, A.4, A.8 |
| Attendance ledger and analytics | Staff ledger, admin attendance reporting, late flags | attendance, attendance_summary, staff_presence, shift_id, late_flag, report_exports | Appendix A.4, A.7, A.8 |
| CSV/PDF reports | Global ledger export, Performance & Analytics Suite | report_exports, files, audit_logs | Appendix A.3, A.4, A.7, A.8 |
| Security/system settings | Admin Security & System Settings | system_settings with non-secret config and secret-manager references only | Appendix A.5, A.6, A.7 |
| Notifications and preferences | Toasts, notification panel, citizen preferences | notifications, user_notification_preferences, review_queue_id, ai_audit_log_id | Appendix A.3, A.4, A.8 |
| Retention and privacy | Chat retention, biometric deletion, reset token expiry, public/private data separation | expires_at indexes, template deletion metadata, password_reset_tokens TTL, public_tracking_enabled, redaction fields | Appendix A.5, A.9, A.10 |
