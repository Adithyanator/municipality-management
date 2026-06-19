const ExcelJS = require('exceljs');
const path = require('path');

async function createWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Enterprise PMO Lead';
  workbook.lastModifiedBy = 'Enterprise PMO Lead';
  workbook.created = new Date();
  workbook.modified = new Date();

  const teamMembers = [
    'Minha Palakkathodi',
    'Adithyan N',
    'Fathima Hana',
    'Muhammad Sanish',
    'Fadi Ahmed',
    'Muhammed Sadik KT'
  ];

  const timelines = ['Sprint 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const daysList = timelines;

  const moduleSheets = [
    { sheetName: 'Backend Tasks', filterName: 'Backend', lead: 'Muhammad Sanish' },
    { sheetName: 'Frontend Tasks', filterName: 'Frontend', lead: 'Adithyan N' },
    { sheetName: 'Database Tasks', filterName: 'Database', lead: 'Fathima Hana' },
    { sheetName: 'AI Tasks', filterName: 'AI', lead: 'Muhammed Sadik KT' },
    { sheetName: 'Face Recognition Tasks', filterName: 'Face Recognition', lead: 'Fadi Ahmed' },
    { sheetName: 'Documentation & QA Tasks', filterName: 'Documentation & QA', lead: 'Minha Palakkathodi' },
    { sheetName: 'Infrastructure Tasks', filterName: 'Infrastructure', lead: 'Adithyan N + Muhammad Sanish' }
  ];

  const modulesList = ['Backend', 'Frontend', 'Database', 'AI', 'Face Recognition', 'Documentation & QA', 'Infrastructure'];
  const dayTableHeaders = ['Day', 'Total Tasks', 'Completed', 'Completion %'];
  
  const masterHeaders = [
    'Task ID', 'Module', 'Task Name', 'Assigned To', 'Priority', 'Status',
    'Progress %', 'Due Day', 'Dependency', 'Testing Status', 'Security Status', 'Remarks', 'Demo Critical?'
  ];

  const kanbanCols = [
    { name: 'Backlog / Future', startCol: 1, headerColor: 'FF7F7F7F', status: 'Backlog' },
    { name: 'Not Started', startCol: 4, headerColor: 'FF595959', status: 'Not Started' },
    { name: 'In Progress', startCol: 7, headerColor: 'FF1F4E78', status: 'In Progress' },
    { name: 'Under Review', startCol: 10, headerColor: 'FFC65911', status: 'Review' },
    { name: 'Completed', startCol: 13, headerColor: 'FF375623', status: 'Completed' }
  ];

  const colors = {
    headerBg: 'FF2C5E8A',     // Deep Steel Blue
    headerText: 'FFFFFFFF',
    zebraBg: 'FFF9FBFD',      // Very Light Steel
    border: 'FFD3D3D3',       // Light Gray
    titleText: 'FF1F4E78',    // Darker Blue
    completedBg: 'FFE2EFDA', completedText: 'FF375623',
    inProgressBg: 'FFDDEBF7', inProgressText: 'FF1F4E78',
    reviewBg: 'FFFCE4D6', reviewText: 'FFC65911',
    blockedBg: 'FFF8CBAD', blockedText: 'FFC00000',
    notStartedBg: 'FFF2F2F2', notStartedText: 'FF595959',
    criticalBg: 'FFC00000', criticalText: 'FFFFFFFF',
    highBg: 'FFF8CBAD', highText: 'FFC00000',
    mediumBg: 'FFFCE4D6', mediumText: 'FFC65911',
    lowBg: 'FFE2EFDA', lowText: 'FF375623'
  };

  const tasksRaw = [
    // INFRASTRUCTURE (9 tasks)
    ['TASK-INF-001', 'Infrastructure', 'Repository verification', 'Adithyan N + Muhammad Sanish', 'High', 'Sprint 0', 'None', 'Verified local Git repository and node workspace structures', 'Yes', 'No', 'Check configuration files integrity'],
    ['TASK-INF-002', 'Infrastructure', 'Git workflow setup', 'Adithyan N', 'High', 'Sprint 0', 'None', 'Repository branching model and commit rules defined', 'No', 'No', 'Main/develop/feature branching rules'],
    ['TASK-INF-003', 'Infrastructure', 'Branch setup', 'Adithyan N', 'High', 'Sprint 0', 'TASK-INF-002', 'Feature branches initialized on GitHub', 'No', 'No', 'Initial pull request guidelines set'],
    ['TASK-INF-004', 'Infrastructure', 'MongoDB Atlas setup', 'Adithyan N', 'Critical', 'Sprint 0', 'None', 'Live MongoDB Atlas sandbox cluster initialized with access controls', 'Yes', 'Yes', 'IP whitelist rules configured'],
    ['TASK-INF-005', 'Infrastructure', 'Environment variables', 'Muhammad Sanish', 'High', 'Sprint 0', 'None', '.env.example templates configuration sheets', 'Yes', 'Yes', 'No secrets checked in'],
    ['TASK-INF-006', 'Infrastructure', 'ESLint', 'Adithyan N', 'Medium', 'Sprint 0', 'None', 'ESLint standards rules deployed to repository root', 'Yes', 'No', 'Static code styling checks active'],
    ['TASK-INF-007', 'Infrastructure', 'Prettier', 'Adithyan N', 'Medium', 'Sprint 0', 'None', 'Prettier formats scripts configured', 'Yes', 'No', 'Auto format on save verified'],
    ['TASK-INF-008', 'Infrastructure', 'Logging infrastructure', 'Muhammad Sanish', 'Medium', 'Day 1', 'TASK-INF-005', 'Winston/Morgan logger system with data masking logic', 'Yes', 'Yes', 'PII credentials redact scripts applied'],
    ['TASK-INF-009', 'Infrastructure', 'Deployment preparation', 'Adithyan N + Muhammad Sanish', 'Medium', 'Day 7', 'None', 'Render/Vercel MVP launch readiness report', 'Yes', 'Yes', 'Production CORS policies configured'],

    // DATABASE (16 tasks)
    ['TASK-DB-001', 'Database', 'User schema', 'Fathima Hana', 'Critical', 'Day 1', 'TASK-INF-004', 'Mongoose schema for users collection', 'Yes', 'Yes', 'Support: Adithyan N. Unique key bounds active'],
    ['TASK-DB-002', 'Database', 'Role schema', 'Fathima Hana', 'High', 'Day 1', 'TASK-DB-001', 'Roles allocation definition mapping schemas', 'Yes', 'Yes', 'Support: Adithyan N. Predefined roles seeded'],
    ['TASK-DB-003', 'Database', 'Permission schema', 'Fathima Hana', 'High', 'Day 1', 'TASK-DB-002', 'Permissions collection schemas definition mapping routes', 'Yes', 'Yes', 'Support: Adithyan N. RBAC maps'],
    ['TASK-DB-004', 'Database', 'Department schema', 'Fathima Hana', 'Medium', 'Day 1', 'TASK-DB-001', 'Department schemas mapping employees', 'Yes', 'No', 'Support: Adithyan N. Collection indices'],
    ['TASK-DB-005', 'Database', 'Complaint schema', 'Fathima Hana', 'Critical', 'Day 2', 'TASK-DB-001', 'Complaints database models with status trackers', 'Yes', 'Yes', 'Support: Adithyan N. Handles attachments path strings'],
    ['TASK-DB-006', 'Database', 'Complaint assignment schema', 'Fathima Hana', 'High', 'Day 2', 'TASK-DB-005', 'Assignments tracking schemas mapping assignees and times', 'Yes', 'No', 'Support: Adithyan N. References user and complaint'],
    ['TASK-DB-007', 'Database', 'File tracking schema', 'Fathima Hana', 'Medium', 'Day 3', 'TASK-DB-005', 'File_tracking and progress steps schemas mapping', 'Yes', 'No', 'Support: Adithyan N. Tracks history steps'],
    ['TASK-DB-008', 'Database', 'Feedback schema', 'Fathima Hana', 'Medium', 'Day 3', 'TASK-DB-005', 'Customer feedback rating collection schema setup', 'Yes', 'No', 'Support: Adithyan N. Constraints bounds checks'],
    ['TASK-DB-009', 'Database', 'Attendance schema', 'Fathima Hana', 'High', 'Day 4', 'TASK-DB-001', 'Staff attendance punch records logs schema mapping', 'Yes', 'Yes', 'Support: Adithyan N. Biometric template matches parameters'],
    ['TASK-DB-010', 'Database', 'Notification schema', 'Fathima Hana', 'Medium', 'Day 5', 'TASK-DB-001', 'System alerts database logging schemas', 'Yes', 'No', 'Support: Adithyan N. Unread indicators'],
    ['TASK-DB-011', 'Database', 'Audit log schema', 'Fathima Hana', 'High', 'Day 5', 'TASK-DB-001', 'Append-only transactional events audit logging schema', 'Yes', 'Yes', 'Support: Adithyan N. Strict immutability controls'],
    ['TASK-DB-012', 'Database', 'Chatbot session schema', 'Fathima Hana', 'Medium', 'Day 4', 'TASK-DB-001', 'Chat conversation logs databases tracking structures', 'Yes', 'No', 'Support: Adithyan N. Session TTL setup'],
    ['TASK-DB-013', 'Database', 'Indexes', 'Fathima Hana', 'High', 'Day 1', 'TASK-DB-001', 'Unique indices mapping user emails and tracking file ID keys', 'Yes', 'No', 'Support: Adithyan N. Index strategies verified'],
    ['TASK-DB-014', 'Database', 'Relationships', 'Fathima Hana', 'Medium', 'Day 1', 'TASK-DB-002', 'Foreign object reference bounds configuration in schemas', 'Yes', 'No', 'Support: Adithyan N. Strict Mongoose validations'],
    ['TASK-DB-015', 'Database', 'Validation rules', 'Fathima Hana', 'High', 'Day 1', 'TASK-DB-001', 'Mongoose validators evaluating text formats and coordinate bounds', 'Yes', 'Yes', 'Support: Adithyan N. Input sanity checker'],
    ['TASK-DB-016', 'Database', 'Query optimization', 'Fathima Hana', 'Medium', 'Day 6', 'TASK-DB-013', 'Explain query plans validation analysis records', 'Yes', 'No', 'Support: Adithyan N. Optimizing pipeline matches'],

    // BACKEND (20 tasks)
    ['TASK-BE-001', 'Backend', 'Express setup', 'Muhammad Sanish', 'Critical', 'Day 1', 'TASK-INF-005', 'Express server layout initialized with Helmet and CORS settings', 'Yes', 'Yes', 'Security middleware active'],
    ['TASK-BE-002', 'Backend', 'MongoDB connection', 'Muhammad Sanish', 'Critical', 'Day 1', 'TASK-INF-004', 'Mongoose database connector with auto-retry logics', 'Yes', 'No', 'Connection pool set to 10 connections max'],
    ['TASK-BE-003', 'Backend', 'Environment configuration', 'Muhammad Sanish', 'High', 'Day 1', 'TASK-INF-005', 'Dotenv loader checking and validating essential keys', 'Yes', 'Yes', 'Throws startup error on missing keys'],
    ['TASK-BE-004', 'Backend', 'Authentication APIs', 'Muhammad Sanish', 'Critical', 'Day 2', 'TASK-BE-001', 'Login and signup backend API router endpoints', 'Yes', 'Yes', 'Bcrypt salt rounds configured'],
    ['TASK-BE-005', 'Backend', 'JWT implementation', 'Muhammad Sanish', 'Critical', 'Day 2', 'TASK-BE-004', 'Access token issuance logic mapped to JWT key payload', 'Yes', 'Yes', 'Token expires in 15 mins'],
    ['TASK-BE-006', 'Backend', 'Refresh token API', 'Muhammad Sanish', 'High', 'Day 2', 'TASK-BE-005', 'Rotating refresh token endpoints validations', 'Yes', 'Yes', 'Secure cookie transport tags configuration'],
    ['TASK-BE-007', 'Backend', 'Logout API', 'Muhammad Sanish', 'Medium', 'Day 2', 'TASK-BE-005', 'Token cleanup and session revocation middleware endpoints', 'Yes', 'No', 'Revokes active refresh session'],
    ['TASK-BE-008', 'Backend', 'RBAC middleware', 'Muhammad Sanish', 'Critical', 'Day 1', 'TASK-BE-005', 'Gated endpoint middleware evaluating token permissions', 'Yes', 'Yes', 'Role sets validation checks'],
    ['TASK-BE-009', 'Backend', 'Audit logging', 'Muhammad Sanish', 'High', 'Day 5', 'TASK-BE-002', 'Transactional logging controller mapping security events', 'Yes', 'Yes', 'Writes directly to audit_logs collection'],
    ['TASK-BE-010', 'Backend', 'Error middleware', 'Muhammad Sanish', 'Medium', 'Day 1', 'TASK-BE-001', 'Centralized Express error handlers parsing exceptions', 'Yes', 'No', 'Redacts stack traces in production environment'],
    ['TASK-BE-011', 'Backend', 'Validation middleware', 'Muhammad Sanish', 'High', 'Day 1', 'TASK-BE-001', 'Body/params query schemas validator middlewares', 'Yes', 'Yes', 'Strips unauthorized fields'],
    ['TASK-BE-012', 'Backend', 'Complaint APIs', 'Muhammad Sanish', 'High', 'Day 2', 'TASK-BE-008', 'Create, update, assign, and query complaints APIs', 'Yes', 'Yes', 'Resource ownership validations active'],
    ['TASK-BE-013', 'Backend', 'File Tracking APIs', 'Muhammad Sanish', 'Medium', 'Day 3', 'TASK-BE-008', 'Public tracking progress endpoint lookup', 'Yes', 'Yes', 'Suppresses internal notes and logs on public view'],
    ['TASK-BE-014', 'Backend', 'Feedback APIs', 'Muhammad Sanish', 'Medium', 'Day 3', 'TASK-BE-012', 'Complaint feedback rating submission and ticket locking controller', 'Yes', 'No', 'Locks complaints database records on completion'],
    ['TASK-BE-015', 'Backend', 'Attendance APIs', 'Muhammad Sanish', 'High', 'Day 4', 'TASK-BE-008', 'Attendance punch registers and consent flags lookup endpoints', 'Yes', 'Yes', 'Validates consent status before scan logic'],
    ['TASK-BE-016', 'Backend', 'Admin APIs', 'Muhammad Sanish', 'High', 'Day 5', 'TASK-BE-008', 'System configurations and user details updates controls APIs', 'Yes', 'Yes', 'Enforces strict Admin role checks'],
    ['TASK-BE-017', 'Backend', 'Notification APIs', 'Muhammad Sanish', 'Medium', 'Day 5', 'TASK-BE-001', 'Trigger notification records and dispatch to DB logs', 'Yes', 'No', 'System alert logs generation'],
    ['TASK-BE-018', 'Backend', 'Rate limiting', 'Muhammad Sanish', 'High', 'Day 1', 'TASK-BE-001', 'Rate-limiter setup restricting requests per IP window', 'Yes', 'Yes', 'Prevents brute force attempts'],
    ['TASK-BE-019', 'Backend', 'Health check API', 'Muhammad Sanish', 'Low', 'Day 1', 'TASK-BE-001', 'Diagnostics route returning system status', 'Yes', 'No', 'Returns DB status and memory limits details'],
    ['TASK-BE-020', 'Backend', 'API documentation', 'Muhammad Sanish', 'Medium', 'Day 5', 'TASK-BE-001', 'Swagger/OpenAPI backend routing contracts layout', 'Yes', 'No', 'Complete document of schema request bodies'],

    // FRONTEND (24 tasks)
    ['TASK-FE-001', 'Frontend', 'React project setup', 'Adithyan N', 'High', 'Day 1', 'None', 'Vite React scaffold template created', 'Yes', 'No', 'Project workspace initialized'],
    ['TASK-FE-002', 'Frontend', 'Tailwind setup', 'Adithyan N', 'High', 'Day 1', 'TASK-FE-001', 'Tailwind utility framework config initialized', 'Yes', 'No', 'Custom theme color palettes mapped'],
    ['TASK-FE-003', 'Frontend', 'Folder structure', 'Adithyan N', 'Medium', 'Day 1', 'TASK-FE-001', 'Standard client pages/components directory structured', 'No', 'No', 'Standard clean coding layout'],
    ['TASK-FE-004', 'Frontend', 'Global layout', 'Adithyan N', 'High', 'Day 1', 'TASK-FE-003', 'Responsive sidebars and navigation headers layouts', 'Yes', 'No', 'Mobile responsive shell layout'],
    ['TASK-FE-005', 'Frontend', 'Routing', 'Adithyan N', 'High', 'Day 1', 'TASK-FE-001', 'React Router paths configuration mapping', 'Yes', 'No', 'URL router structure finalized'],
    ['TASK-FE-006', 'Frontend', 'Protected routes', 'Adithyan N', 'High', 'Day 1', 'TASK-FE-005', 'Route wrapper gating views based on user login token', 'Yes', 'Yes', 'Redirects guest to login page'],
    ['TASK-FE-007', 'Frontend', 'Axios client', 'Adithyan N', 'High', 'Day 1', 'None', 'Custom Axios client class initialized', 'Yes', 'No', 'Base configuration templates'],
    ['TASK-FE-008', 'Frontend', 'API interceptors', 'Adithyan N', 'High', 'Day 1', 'TASK-FE-007', 'JWT token injection request/response interceptors', 'Yes', 'Yes', 'Auto attaches auth tokens to headers'],
    ['TASK-FE-009', 'Frontend', 'Authentication pages', 'Adithyan N', 'High', 'Day 2', 'TASK-FE-006', 'Responsive Login and registration forms UI layouts', 'Yes', 'Yes', 'Client side input validation rules active'],
    ['TASK-FE-010', 'Frontend', 'Citizen Dashboard', 'Adithyan N', 'High', 'Day 2', 'TASK-FE-006', 'Grievance list overview panel and stats widgets UI', 'Yes', 'No', 'Overview dashboard for citizen portals'],
    ['TASK-FE-011', 'Frontend', 'Complaint Management UI', 'Adithyan N', 'High', 'Day 2', 'TASK-FE-010', 'Complaint intake form components with file attachment uploaders', 'Yes', 'Yes', 'File type constraints validated'],
    ['TASK-FE-012', 'Frontend', 'File Tracking UI', 'Adithyan N', 'Medium', 'Day 3', 'TASK-FE-008', 'Public timeline tracking status lookup bar', 'Yes', 'No', 'Visual timeline progress trackers'],
    ['TASK-FE-013', 'Frontend', 'Feedback UI', 'Adithyan N', 'Medium', 'Day 3', 'TASK-FE-011', 'Satisfaction ratings component locking solved complaints', 'Yes', 'No', '1-to-5 star feedback rating'],
    ['TASK-FE-014', 'Frontend', 'Staff Dashboard UI', 'Adithyan N', 'High', 'Day 4', 'TASK-FE-006', 'Kanban view and ticket updates action buttons', 'Yes', 'Yes', 'Workspace console for employees'],
    ['TASK-FE-015', 'Frontend', 'Attendance UI', 'Adithyan N', 'High', 'Day 4', 'TASK-FE-014', 'Webcam consent prompt and face scan punch window', 'Yes', 'Yes', 'Liveness prompt overlay layout'],
    ['TASK-FE-016', 'Frontend', 'Chatbot UI', 'Adithyan N', 'Medium', 'Day 4', 'TASK-FE-008', 'Conversational chat container overlays widget UI', 'Yes', 'No', 'Gemini assistant layout UI'],
    ['TASK-FE-017', 'Frontend', 'Admin Dashboard UI', 'Adithyan N', 'High', 'Day 5', 'TASK-FE-006', 'User lists management, SLAs settings, and parameters tables', 'Yes', 'Yes', 'SLA thresholds controller views'],
    ['TASK-FE-018', 'Frontend', 'Notifications UI', 'Adithyan N', 'Medium', 'Day 5', 'TASK-FE-008', 'Alert toasts lists dropdown console UI', 'Yes', 'No', 'Toast popups integrations'],
    ['TASK-FE-019', 'Frontend', 'Reusable Components', 'Adithyan N', 'Medium', 'Day 1', 'TASK-FE-002', 'Standard buttons, forms input fields, modal dialogs library', 'Yes', 'No', 'Common component assets'],
    ['TASK-FE-020', 'Frontend', 'Responsive fixes', 'Adithyan N', 'Medium', 'Day 6', 'TASK-FE-004', 'Media queries tweaks on mobile viewports', 'Yes', 'No', 'Fluid grids testing'],
    ['TASK-FE-021', 'Frontend', 'Frontend API integration', 'Adithyan N', 'High', 'Day 5', 'TASK-FE-008', 'Connect React layouts to Express server routes API endpoints', 'Yes', 'Yes', 'Integration mapping verified'],
    ['TASK-FE-022', 'Frontend', 'Error boundaries', 'Adithyan N', 'Low', 'Day 1', 'TASK-FE-001', 'React fallback boundaries catching rendering errors', 'Yes', 'No', 'No stack details shown in production UI'],
    ['TASK-FE-023', 'Frontend', 'Loading components', 'Adithyan N', 'Low', 'Day 1', 'TASK-FE-001', 'Standardized skeleton loader elements', 'Yes', 'No', 'Visual placeholders setup'],
    ['TASK-FE-024', 'Frontend', 'Final UI testing', 'Adithyan N', 'High', 'Day 7', 'TASK-FE-021', 'E2E visual verification and usability test runs report', 'Yes', 'No', 'UX verification pass signoff'],

    // AI (9 tasks)
    ['TASK-AI-001', 'AI', 'Gemini integration', 'Muhammed Sadik KT', 'High', 'Day 4', 'None', 'Gemini API client connection script with prompt instructions', 'Yes', 'Yes', 'RAG context grounding middleware'],
    ['TASK-AI-002', 'AI', 'Prompt engineering', 'Muhammed Sadik KT', 'Medium', 'Day 4', 'TASK-AI-001', 'System instructions locking AI answers within municipality docs', 'Yes', 'No', 'Strict grounding bounds'],
    ['TASK-AI-003', 'AI', 'Chatbot API', 'Muhammed Sadik KT', 'High', 'Day 4', 'TASK-AI-001', 'Express server routing chat session controller endpoints', 'Yes', 'Yes', 'Logs sessions to chatbot DB logs'],
    ['TASK-AI-004', 'AI', 'OCR service', 'Muhammed Sadik KT', 'Medium', 'Day 5', 'None', 'PDF/image character recognition text extractor service', 'Yes', 'Yes', 'Sandbox process execution setup'],
    ['TASK-AI-005', 'AI', 'OCR validation', 'Muhammed Sadik KT', 'Medium', 'Day 5', 'TASK-AI-004', 'Extracted texts checks validating document details matching', 'Yes', 'Yes', 'Verify metadata matching limits'],
    ['TASK-AI-006', 'AI', 'Face recognition core', 'Muhammed Sadik KT', 'Critical', 'Day 4', 'None', 'Python comparison scripts checking face points similarity', 'Yes', 'Yes', 'Volatile memory calculations'],
    ['TASK-AI-007', 'AI', 'Attendance recognition service', 'Muhammed Sadik KT', 'High', 'Day 4', 'TASK-AI-006', 'Biometrics validation punch connector API', 'Yes', 'Yes', 'Liveness score validation criteria check'],
    ['TASK-AI-008', 'AI', 'AI testing', 'Muhammed Sadik KT', 'Medium', 'Day 5', 'TASK-AI-007', 'Biometrics matching FAR/FRR testing checklist documentation', 'Yes', 'Yes', 'Checks accuracy scales'],
    ['TASK-AI-009', 'AI', 'Response optimization', 'Muhammed Sadik KT', 'Medium', 'Day 5', 'TASK-AI-002', 'Fine-tuned prompt parameters shortening delay intervals', 'Yes', 'No', 'RAG search optimizations'],

    // FACE RECOGNITION (9 tasks)
    ['TASK-FR-001', 'Face Recognition', 'Dataset Collection', 'Fadi Ahmed', 'Medium', 'Day 4', 'None', 'Standardized baseline test faces calibration datasets', 'Yes', 'Yes', 'No images checked in repository'],
    ['TASK-FR-002', 'Face Recognition', 'Prototype Refinement', 'Fadi Ahmed', 'High', 'Day 4', 'TASK-AI-006', 'Optimized points extraction models', 'Yes', 'Yes', 'Anti-spoofing tests calibration'],
    ['TASK-FR-003', 'Face Recognition', 'Camera Integration Testing', 'Fadi Ahmed', 'Medium', 'Day 4', 'None', 'HTML5 webcam access scripts checks report', 'Yes', 'Yes', 'Confirm permissions logic'],
    ['TASK-FR-004', 'Face Recognition', 'Attendance Workflow Testing', 'Fadi Ahmed', 'High', 'Day 5', 'TASK-FR-003', 'Verify biometric punch registration triggers checkin updates', 'Yes', 'Yes', 'Strict consent checker gating attendance validation'],
    ['TASK-FR-005', 'Face Recognition', 'Recognition Accuracy Testing', 'Fadi Ahmed', 'High', 'Day 5', 'TASK-FR-002', 'FAR and FRR metrics check data log summary', 'Yes', 'Yes', 'Audits against spoof attacks'],
    ['TASK-FR-006', 'Face Recognition', 'Cross-Browser Camera Testing', 'Fadi Ahmed', 'Medium', 'Day 6', 'TASK-FR-003', 'Camera compatibility verification checks results log', 'Yes', 'Yes', 'Webcam permissions tests on Safari/Firefox/Chrome'],
    ['TASK-FR-007', 'Face Recognition', 'Scanner UI Review', 'Fadi Ahmed', 'Medium', 'Day 4', 'None', 'Webcam canvas box layout alignment reviews logs', 'Yes', 'No', 'UI responsiveness check'],
    ['TASK-FR-008', 'Face Recognition', 'System Integration Testing', 'Fadi Ahmed', 'High', 'Day 6', 'TASK-FR-004', 'End to end biometrics validations verification logs', 'Yes', 'Yes', 'Gating RBAC reviews verified'],
    ['TASK-FR-009', 'Face Recognition', 'Camera Permission Testing', 'Fadi Ahmed', 'Medium', 'Day 4', 'TASK-FR-003', 'Verification checklists logging permission locks and denials checks', 'Yes', 'Yes', 'Checks fallback options'],

    // DOCUMENTATION & QA (9 tasks)
    ['TASK-QA-001', 'Documentation & QA', 'Requirement traceability', 'Minha Palakkathodi', 'High', 'Day 1', 'None', 'RTM spreadsheet linking requirements to components code', 'No', 'No', 'Master traceability index setup'],
    ['TASK-QA-002', 'Documentation & QA', 'Test case creation', 'Minha Palakkathodi', 'High', 'Day 2', 'TASK-QA-001', 'Functional test cases suite covering citizen/staff actions', 'No', 'No', 'Manual check sheets ready'],
    ['TASK-QA-003', 'Documentation & QA', 'UAT preparation', 'Minha Palakkathodi', 'High', 'Day 5', 'None', 'User acceptance testing checklist layout schemas', 'No', 'No', 'Acceptance checklist templates'],
    ['TASK-QA-004', 'Documentation & QA', 'Documentation review', 'Minha Palakkathodi', 'Medium', 'Day 7', 'None', 'Verification and correction checklists for all docs', 'No', 'No', 'Checks repository documents integrity'],
    ['TASK-QA-005', 'Documentation & QA', 'Security checklist review', 'Minha Palakkathodi', 'High', 'Day 7', 'None', 'Security validation gates signed reports', 'No', 'No', 'Checks details audits validation'],
    ['TASK-QA-006', 'Documentation & QA', 'QA reports', 'Minha Palakkathodi', 'Medium', 'Day 6', 'None', 'System QA test validation results report', 'No', 'No', 'Test pass metrics logs summary'],
    ['TASK-QA-007', 'Documentation & QA', 'Bug verification', 'Minha Palakkathodi', 'High', 'Day 6', 'None', 'QA verified bug tracker status validation logs', 'No', 'No', 'Verify fix statuses'],
    ['TASK-QA-008', 'Documentation & QA', 'Final documentation', 'Minha Palakkathodi', 'High', 'Day 7', 'None', 'Consolidated developer documentation package', 'No', 'No', 'Complete architecture references'],
    ['TASK-QA-009', 'Documentation & QA', 'Handover documentation', 'Minha Palakkathodi', 'High', 'Day 7', 'TASK-QA-008', 'Municipality handover procedures manuals checklist', 'No', 'No', 'Log logins and operational keys handover structures']
  ];

  const demoCriticalTaskIds = new Set([
    'TASK-BE-004', // Authentication APIs / Login API / Authentication
    'TASK-BE-005', // JWT implementation / JWT Authentication
    'TASK-BE-012', // Complaint APIs / Complaint Management
    'TASK-BE-013', // File Tracking APIs / File Tracking
    'TASK-BE-014', // Feedback APIs / Feedback Module
    'TASK-BE-015', // Attendance APIs / Attendance Module
    'TASK-FE-009', // Authentication pages / Authentication
    'TASK-FE-010', // Citizen Dashboard / Citizen Dashboard
    'TASK-FE-011', // Complaint Management UI / Complaint Management
    'TASK-FE-012', // File Tracking UI / File Tracking
    'TASK-FE-013', // Feedback UI / Feedback Module
    'TASK-FE-014', // Staff Dashboard UI / Staff Dashboard
    'TASK-FE-015', // Attendance UI / Attendance Module
    'TASK-FE-016', // Chatbot UI / Chatbot MVP
    'TASK-FE-017', // Admin Dashboard UI / Admin Dashboard
    'TASK-DB-005', // Complaint schema / Complaint Management
    'TASK-DB-006', // Complaint assignment schema / Complaint Management
    'TASK-DB-007', // File tracking schema / File Tracking
    'TASK-DB-008', // Feedback schema / Feedback Module
    'TASK-DB-009', // Attendance schema / Attendance Module
    'TASK-DB-012', // Chatbot session schema / Chatbot MVP
    'TASK-AI-003', // Chatbot API / Chatbot MVP
    'TASK-AI-006', // Face recognition core / Face Recognition Integration
    'TASK-AI-007', // Attendance recognition service / Face Recognition Integration
    'TASK-FR-004'  // Attendance Workflow Testing / Face Recognition Integration
  ]);

  function isDemoCritical(id, name) {
    if (demoCriticalTaskIds.has(id)) {
      return 'Yes';
    }
    const demoCriticalKeywords = [
      "Authentication", "Complaint", "File Tracking", "Attendance", "Chatbot",
      "Admin Dashboard", "Citizen Dashboard", "Staff Dashboard", "Feedback",
      "Login API", "JWT Authentication", "Face Recognition", "Face recognition",
      "JWT"
    ];
    return demoCriticalKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase())) ? 'Yes' : 'No';
  }

  const tasks = tasksRaw.map(row => ({
    id: row[0],
    module: row[1],
    name: row[2],
    assigned: row[3],
    priority: row[4],
    status: 'Not Started',
    progress: 0.0,
    day: row[5],
    dep: row[6],
    test: 'Pending',
    sec: 'Pending',
    deliverable: row[7],
    testReq: row[8],
    secReq: row[9],
    remarks: row[10],
    demoCritical: isDemoCritical(row[0], row[2])
  }));

  const demoCriticalCount = tasks.filter(t => t.demoCritical === 'Yes').length;

  function styleHeader(sheet, rowNum, colCount) {
    const row = sheet.getRow(rowNum);
    row.height = 28;
    for (let c = 1; c <= colCount; c++) {
      const cell = row.getCell(c);
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: colors.headerBg }
      };
      cell.font = {
        name: 'Segoe UI',
        size: 11,
        bold: true,
        color: { argb: colors.headerText }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      cell.border = {
        top: { style: 'thin', color: { argb: colors.border } },
        left: { style: 'thin', color: { argb: colors.border } },
        bottom: { style: 'medium', color: { argb: 'FF1F4E78' } },
        right: { style: 'thin', color: { argb: colors.border } }
      };
    }
  }

  function applyCellDefaults(cell, isZebra = false) {
    cell.font = { name: 'Segoe UI', size: 10 };
    cell.border = {
      top: { style: 'thin', color: { argb: colors.border } },
      left: { style: 'thin', color: { argb: colors.border } },
      bottom: { style: 'thin', color: { argb: colors.border } },
      right: { style: 'thin', color: { argb: colors.border } }
    };
    if (isZebra) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: colors.zebraBg }
      };
    }
    cell.alignment = { vertical: 'middle', wrapText: true };
  }

  function addDropdowns(sheet, startRow, endRow, statusCol, priorityCol) {
    for (let r = startRow; r <= endRow; r++) {
      if (statusCol) {
        const cell = sheet.getCell(r, statusCol);
        cell.dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: ['"Not Started,In Progress,Review,Completed,Blocked"']
        };
      }
      if (priorityCol) {
        const cell = sheet.getCell(r, priorityCol);
        cell.dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: ['"Critical,High,Medium,Low"']
        };
      }
    }
  }

  function autoFitColumns(sheet) {
    sheet.columns.forEach((column) => {
      let maxLen = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        if (cell.value) {
          let valueStr = cell.value.toString();
          if (cell.value.formula) {
            valueStr = "Progress formula is long"; 
          }
          if (valueStr.length > maxLen) {
            maxLen = valueStr.length;
          }
        }
      });
      column.width = Math.max(Math.min(maxLen + 4, 40), 12);
    });
  }

  function addConditionalFormatting(sheet, ref, isPriority = false) {
    const rules = isPriority ? [
      {
        type: 'cellIs', operator: 'equal', formulae: ['"Critical"'],
        style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.criticalBg } }, font: { color: { argb: colors.criticalText }, bold: true } }
      },
      {
        type: 'cellIs', operator: 'equal', formulae: ['"High"'],
        style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.highBg } }, font: { color: { argb: colors.highText }, bold: true } }
      },
      {
        type: 'cellIs', operator: 'equal', formulae: ['"Medium"'],
        style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.mediumBg } }, font: { color: { argb: colors.mediumText }, bold: true } }
      },
      {
        type: 'cellIs', operator: 'equal', formulae: ['"Low"'],
        style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lowBg } }, font: { color: { argb: colors.lowText }, bold: true } }
      }
    ] : [
      {
        type: 'cellIs', operator: 'equal', formulae: ['"Completed"'],
        style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.completedBg } }, font: { color: { argb: colors.completedText }, bold: true } }
      },
      {
        type: 'cellIs', operator: 'equal', formulae: ['"In Progress"'],
        style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.inProgressBg } }, font: { color: { argb: colors.inProgressText }, bold: true } }
      },
      {
        type: 'cellIs', operator: 'equal', formulae: ['"Review"'],
        style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.reviewBg } }, font: { color: { argb: colors.reviewText }, bold: true } }
      },
      {
        type: 'cellIs', operator: 'equal', formulae: ['"Blocked"'],
        style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.blockedBg } }, font: { color: { argb: colors.blockedText }, bold: true } }
      },
      {
        type: 'cellIs', operator: 'equal', formulae: ['"Not Started"'],
        style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.notStartedBg } }, font: { color: { argb: colors.notStartedText } } }
      }
    ];
    sheet.addConditionalFormatting({ ref, rules });
  }

  // ==========================================
  // SHEET 1: DASHBOARD
  // ==========================================
  const dash = workbook.addWorksheet('Dashboard', { views: [{ state: 'frozen', ySplit: 14 }] });
  
  dash.mergeCells('A1:T1'); // Expanded title merge for new KPIs
  const dashTitle = dash.getCell('A1');
  dashTitle.value = 'AI-Powered Smart Municipal Citizen Assistance & Staff Attendance Management System - Executive Dashboard';
  dashTitle.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  dashTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  dashTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  dash.getRow(1).height = 36;

  // Setup KPI Cards with the new 4 KPIs added (10 total)
  const kpis = [
    { label: 'Overall Completion %', valFormula: '=COUNTIF(F16:F111, "Completed")/COUNTA(A16:A111)', cellLabel: 'A2', cellVal: 'A3', mergeLabel: 'A2:B2', mergeVal: 'A3:B4', fmt: '0.0%', result: 0.0 },
    { label: 'Blocked Tasks', valFormula: '=COUNTIF(F16:F111, "Blocked")', cellLabel: 'C2', cellVal: 'C3', mergeLabel: 'C2:D2', mergeVal: 'C3:D4', fmt: '0', result: 0 },
    { label: 'Critical Issues Open', valFormula: '=COUNTIFS(E16:E111, "Critical", F16:F111, "<>Completed")', cellLabel: 'E2', cellVal: 'E3', mergeLabel: 'E2:F2', mergeVal: 'E3:F4', fmt: '0', result: 7 }, 
    { label: 'Open Bugs', valFormula: `=COUNTIFS('Bug Tracker'!G3:G30, "<>Completed", 'Bug Tracker'!G3:G30, "<>")`, cellLabel: 'G2', cellVal: 'G3', mergeLabel: 'G2:H2', mergeVal: 'G3:H4', fmt: '0', result: 5 },
    { label: 'Security Checklist %', valFormula: `=COUNTIF('Security Checklist'!D3:D14, "Completed")/COUNTA('Security Checklist'!D3:D14)`, cellLabel: 'I2', cellVal: 'I3', mergeLabel: 'I2:J2', mergeVal: 'I3:J4', fmt: '0.0%', result: 0.0 },
    { label: 'Deployment Readiness %', valFormula: `=COUNTIF('Deployment Checklist'!D3:D10, "Completed")/COUNTA('Deployment Checklist'!D3:D10)`, cellLabel: 'K2', cellVal: 'K3', mergeLabel: 'K2:L2', mergeVal: 'K3:L4', fmt: '0.0%', result: 0.0 },
    
    // New KPIs (Change 7)
    { label: 'Demo Critical Tasks Remaining', valFormula: '=COUNTIFS(F16:F111, "<>Completed", M16:M111, "Yes")', cellLabel: 'M2', cellVal: 'M3', mergeLabel: 'M2:N2', mergeVal: 'M3:N4', fmt: '0', result: demoCriticalCount },
    { label: 'Open Security Issues', valFormula: `=COUNTIFS('Security Review Tracker'!C3:C15, "<>Passed", 'Security Review Tracker'!C3:C15, "<>")`, cellLabel: 'O2', cellVal: 'O3', mergeLabel: 'O2:P2', mergeVal: 'O3:P4', fmt: '0', result: 13 },
    { label: 'Testing Completion %', valFormula: `=COUNTIF('Testing Tracker'!F3:F12, "Passed")/COUNTA('Testing Tracker'!A3:A12)`, cellLabel: 'Q2', cellVal: 'Q3', mergeLabel: 'Q2:R2', mergeVal: 'Q3:R4', fmt: '0.0%', result: 0.0 },
    { label: 'Integration Completion %', valFormula: `=COUNTIF('Integration Tracker'!F3:F12, "Completed")/COUNTA('Integration Tracker'!A3:A12)`, cellLabel: 'S2', cellVal: 'S3', mergeLabel: 'S2:T2', mergeVal: 'S3:T4', fmt: '0.0%', result: 0.0 }
  ];

  kpis.forEach(kpi => {
    dash.mergeCells(kpi.mergeLabel);
    dash.mergeCells(kpi.mergeVal);
    
    const lCell = dash.getCell(kpi.cellLabel);
    lCell.value = kpi.label;
    lCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF595959' } };
    lCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };
    lCell.alignment = { horizontal: 'center', vertical: 'middle' };
    
    const vCell = dash.getCell(kpi.cellVal);
    vCell.value = { formula: kpi.valFormula, result: kpi.result };
    vCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: colors.titleText } };
    vCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBF2F7' } };
    vCell.alignment = { horizontal: 'center', vertical: 'middle' };
    vCell.numFormat = kpi.fmt;
  });
  
  dash.getRow(2).height = 16;
  dash.getRow(3).height = 18;
  dash.getRow(4).height = 18;

  dash.mergeCells('A6:F6');
  const tHeader1 = dash.getCell('A6');
  tHeader1.value = 'Team Workload & Progress Summary';
  tHeader1.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
  tHeader1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E78' } };
  tHeader1.alignment = { horizontal: 'center' };

  dash.mergeCells('H6:M6');
  const tHeader2 = dash.getCell('H6');
  tHeader2.value = 'Module Development Status';
  tHeader2.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
  tHeader2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E78' } };
  tHeader2.alignment = { horizontal: 'center' };

  dash.getRow(6).height = 20;

  const teamHeaders = ['Team Member', 'Assigned Tasks', 'Completed', 'Pending', 'Blocked', 'Completion %'];
  teamHeaders.forEach((h, idx) => {
    const cell = dash.getCell(7, idx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 9, bold: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBF2F7' } };
    cell.alignment = { horizontal: 'center' };
  });

  const modHeaders = ['Module Name', 'Total Tasks', 'Completed', 'Pending', 'Blocked', 'Completion %'];
  modHeaders.forEach((h, idx) => {
    const cell = dash.getCell(7, idx + 8); 
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 9, bold: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBF2F7' } };
    cell.alignment = { horizontal: 'center' };
  });
  dash.getRow(7).height = 18;

  const memberCounts = {
    'Minha Palakkathodi': 9,
    'Adithyan N': 30,
    'Fathima Hana': 16,
    'Muhammad Sanish': 23,
    'Fadi Ahmed': 9,
    'Muhammed Sadik KT': 9
  };

  teamMembers.forEach((member, i) => {
    const row = 8 + i;
    const count = memberCounts[member] || 0;
    dash.getCell(row, 1).value = member;
    dash.getCell(row, 2).value = { formula: `=COUNTIF($D$16:$D$111, A${row})`, result: count };
    dash.getCell(row, 3).value = { formula: `=COUNTIFS($D$16:$D$111, A${row}, $F$16:$F$111, "Completed")`, result: 0 };
    dash.getCell(row, 4).value = { formula: `=B${row}-C${row}-E${row}`, result: count };
    dash.getCell(row, 5).value = { formula: `=COUNTIFS($D$16:$D$111, A${row}, $F$16:$F$111, "Blocked")`, result: 0 };
    dash.getCell(row, 6).value = { formula: `=IF(B${row}>0, C${row}/B${row}, 0)`, result: 0.0 };
    
    for (let c = 1; c <= 6; c++) {
      applyCellDefaults(dash.getCell(row, c), i % 2 === 1);
      if (c >= 2 && c <= 5) dash.getCell(row, c).alignment = { horizontal: 'center' };
      if (c === 6) {
        dash.getCell(row, c).numFormat = '0.0%';
        dash.getCell(row, c).alignment = { horizontal: 'right' };
      }
    }
  });

  const moduleCounts = {
    'Backend': 20,
    'Frontend': 24,
    'Database': 16,
    'AI': 9,
    'Face Recognition': 9,
    'Documentation & QA': 9,
    'Infrastructure': 9
  };

  modulesList.forEach((mod, i) => {
    const row = 8 + i;
    const count = moduleCounts[mod] || 0;
    dash.getCell(row, 8).value = mod;
    dash.getCell(row, 9).value = { formula: `=COUNTIF($B$16:$B$111, H${row})`, result: count };
    dash.getCell(row, 10).value = { formula: `=COUNTIFS($B$16:$B$111, H${row}, $F$16:$F$111, "Completed")`, result: 0 };
    dash.getCell(row, 11).value = { formula: `=I${row}-J${row}-L${row}`, result: count };
    dash.getCell(row, 12).value = { formula: `=COUNTIFS($B$16:$B$111, H${row}, $F$16:$F$111, "Blocked")`, result: 0 };
    dash.getCell(row, 13).value = { formula: `=IF(I${row}>0, J${row}/I${row}, 0)`, result: 0.0 };
    
    for (let c = 8; c <= 13; c++) {
      applyCellDefaults(dash.getCell(row, c), i % 2 === 1);
      if (c >= 9 && c <= 12) dash.getCell(row, c).alignment = { horizontal: 'center' };
      if (c === 13) {
        dash.getCell(row, c).numFormat = '0.0%';
        dash.getCell(row, c).alignment = { horizontal: 'right' };
      }
    }
  });

  // Day-Wise Progress
  dash.mergeCells('O6:R6');
  const tHeader3 = dash.getCell('O6');
  tHeader3.value = 'Day-Wise Progress Timeline';
  tHeader3.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
  tHeader3.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E78' } };
  tHeader3.alignment = { horizontal: 'center' };

  dayTableHeaders.forEach((h, idx) => {
    const cell = dash.getCell(7, idx + 15);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 9, bold: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBF2F7' } };
    cell.alignment = { horizontal: 'center' };
  });

  const dayCounts = {
    'Sprint 0': 7, 'Day 1': 28, 'Day 2': 11, 'Day 3': 6, 'Day 4': 16, 'Day 5': 16, 'Day 6': 6, 'Day 7': 6
  };

  daysList.forEach((dayName, i) => {
    const row = 8 + i;
    const count = dayCounts[dayName] || 0;
    dash.getCell(row, 15).value = dayName;
    dash.getCell(row, 16).value = { formula: `=COUNTIF($H$16:$H$111, O${row})`, result: count };
    dash.getCell(row, 17).value = { formula: `=COUNTIFS($H$16:$H$111, O${row}, $F$16:$F$111, "Completed")`, result: 0 };
    dash.getCell(row, 18).value = { formula: `=IF(P${row}>0, Q${row}/P${row}, 0)`, result: 0.0 };

    for (let c = 15; c <= 18; c++) {
      applyCellDefaults(dash.getCell(row, c), i % 2 === 1);
      if (c === 16 || c === 17) dash.getCell(row, c).alignment = { horizontal: 'center' };
      if (c === 18) {
        dash.getCell(row, c).numFormat = '0%';
        dash.getCell(row, c).alignment = { horizontal: 'right' };
      }
    }
  });

  // Master Task List Row Headers (Row 15) - Added Demo Critical? (Change 3)
  masterHeaders.forEach((h, idx) => {
    dash.getCell(15, idx + 1).value = h;
  });
  styleHeader(dash, 15, 13);
  dash.getRow(15).height = 26;

  // Insert Tasks Data (16 to 111)
  tasks.forEach((task, i) => {
    const rowNum = 16 + i;
    dash.getCell(rowNum, 1).value = task.id;
    dash.getCell(rowNum, 2).value = task.module;
    dash.getCell(rowNum, 3).value = task.name;
    dash.getCell(rowNum, 4).value = task.assigned;
    dash.getCell(rowNum, 5).value = task.priority;
    dash.getCell(rowNum, 6).value = task.status;
    dash.getCell(rowNum, 7).value = { formula: `=IF(F${rowNum}="Completed", 1, IF(F${rowNum}="In Progress", 0.5, IF(F${rowNum}="Review", 0.8, 0)))`, result: task.progress };
    dash.getCell(rowNum, 8).value = task.day;
    dash.getCell(rowNum, 9).value = task.dep;
    dash.getCell(rowNum, 10).value = task.test;
    dash.getCell(rowNum, 11).value = task.sec;
    dash.getCell(rowNum, 12).value = task.remarks;
    dash.getCell(rowNum, 13).value = task.demoCritical;

    for (let col = 1; col <= 13; col++) {
      const cell = dash.getCell(rowNum, col);
      applyCellDefaults(cell, i % 2 === 1);
      if (col === 1 || col === 5 || col === 6 || col === 8 || col === 9 || col === 10 || col === 11 || col === 13) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }
      if (col === 7) {
        cell.numFormat = '0%';
        cell.alignment = { horizontal: 'right', vertical: 'middle' };
      }
    }
  });

  dash.autoFilter = `A15:M111`;
  addDropdowns(dash, 16, 111, 6, 5);
  dash.dataValidation = {
    type: 'list',
    allowBlank: true,
    formulae: ['"Yes,No"']
  };
  for (let r = 16; r <= 111; r++) {
    dash.getCell(r, 13).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Yes,No"'] };
  }
  addConditionalFormatting(dash, `F16:F111`, false);
  addConditionalFormatting(dash, `E16:E111`, true);
  autoFitColumns(dash);

  // ==========================================
  // SHEET 2: KANBAN BOARD
  // ==========================================
  const kb = workbook.addWorksheet('Kanban Board');
  
  kb.mergeCells('A1:O1');
  const kbTitle = kb.getCell('A1');
  kbTitle.value = 'AI-Powered Smart Municipal Kanban Board (Status Flow Tracker)';
  kbTitle.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  kbTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  kbTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  kb.getRow(1).height = 30;

  kb.getCell('B3').value = 'Project Name:';
  kb.getCell('B3').font = { name: 'Segoe UI', bold: true };
  kb.getCell('C3').value = 'Smart Municipal Assistance MVP';
  kb.getCell('C3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBF2F7' } };

  kb.getCell('E3').value = 'Enterprise Lead:';
  kb.getCell('E3').font = { name: 'Segoe UI', bold: true };
  kb.getCell('F3').value = 'Adithyan N & PMO Team';
  kb.getCell('F3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBF2F7' } };

  kb.getCell('H3').value = 'Target Milestone:';
  kb.getCell('H3').font = { name: 'Segoe UI', bold: true };
  kb.getCell('I3').value = '1-Week Rapid MVP Release';
  kb.getCell('I3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBF2F7' } };

  ['C3', 'F3', 'I3'].forEach(cellRef => {
    const c = kb.getCell(cellRef);
    c.border = {
      top: { style: 'thin', color: { argb: colors.border } },
      left: { style: 'thin', color: { argb: colors.border } },
      bottom: { style: 'medium', color: { argb: colors.headerBg } },
      right: { style: 'thin', color: { argb: colors.border } }
    };
    c.alignment = { horizontal: 'center', vertical: 'middle' };
  });
  kb.getRow(3).height = 20;

  kanbanCols.forEach(col => {
    const s = col.startCol;
    kb.mergeCells(5, s, 5, s + 2);
    const headerCell = kb.getCell(5, s);
    headerCell.value = col.name;
    headerCell.font = { name: 'Segoe UI', bold: true, color: { argb: 'FFFFFFFF' } };
    headerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: col.headerColor } };
    headerCell.alignment = { horizontal: 'center', vertical: 'middle' };

    kb.getCell(6, s).value = 'Task ID';
    kb.getCell(6, s + 1).value = 'Task Name';
    kb.getCell(6, s + 2).value = 'Assigned To';
    for (let c = s; c <= s + 2; c++) {
      const cCell = kb.getCell(6, c);
      cCell.font = { name: 'Segoe UI', size: 9, bold: true };
      cCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };
      cCell.alignment = { horizontal: 'center', vertical: 'middle' };
      cCell.border = { bottom: { style: 'thin', color: { argb: colors.border } } };
    }
  });
  kb.getRow(5).height = 24;
  kb.getRow(6).height = 18;

  const colRows = {
    'Backlog': 7, 'Not Started': 7, 'In Progress': 7, 'Review': 7, 'Completed': 7
  };

  tasks.forEach((t) => {
    const status = t.status;
    const colConfig = kanbanCols.find(c => c.status === status) || kanbanCols[0];
    const r = colRows[colConfig.status];
    
    const globalIdx = tasks.findIndex(gt => gt.id === t.id) + 16;
    kb.getCell(r, colConfig.startCol).value = { formula: `=Dashboard!A${globalIdx}`, result: t.id };
    kb.getCell(r, colConfig.startCol + 1).value = { formula: `=Dashboard!C${globalIdx}`, result: t.name };
    kb.getCell(r, colConfig.startCol + 2).value = { formula: `=Dashboard!D${globalIdx}`, result: t.assigned };

    colRows[colConfig.status] = r + 1;
  });

  const maxRow = Math.max(...Object.values(colRows), 15);
  for (let r = 7; r <= maxRow; r++) {
    kb.getRow(r).height = 18;
    kanbanCols.forEach(col => {
      const s = col.startCol;
      for (let c = s; c <= s + 2; c++) {
        const cell = kb.getCell(r, c);
        if (!cell.value) cell.value = ''; 
        cell.font = { name: 'Segoe UI', size: 9 };
        cell.border = {
          left: c === s ? { style: 'thin', color: { argb: col.headerColor } } : { style: 'thin', color: { argb: colors.border } },
          right: c === s + 2 ? { style: 'thin', color: { argb: col.headerColor } } : { style: 'thin', color: { argb: colors.border } },
          top: { style: 'thin', color: { argb: colors.border } },
          bottom: { style: 'thin', color: { argb: colors.border } }
        };
        if (c === s) cell.alignment = { horizontal: 'center', vertical: 'middle' };
        else cell.alignment = { horizontal: 'left', vertical: 'middle' };
      }
    });
  }
  autoFitColumns(kb);

  // ==========================================
  // SHEET 3 TO 10: TIMELINES SPRINT 0 - DAY 7
  // ==========================================
  timelines.forEach((time) => {
    const ws = workbook.addWorksheet(time, { views: [{ state: 'frozen', ySplit: 2 }] });
    
    ws.mergeCells('A1:J1');
    const wsTitle = ws.getCell('A1');
    wsTitle.value = `Gantt Timeline Plan - ${time} Schedule & Tasks`;
    wsTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
    wsTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
    wsTitle.alignment = { horizontal: 'left', vertical: 'middle' };
    ws.getRow(1).height = 24;

    ws.getRow(2).height = 26;
    const headers = [
      'Task ID', 'Task Name', 'Assigned To', 'Priority', 'Dependency', 'Status',
      'Deliverable', 'Testing Required', 'Security Check Required', 'Remarks'
    ];
    headers.forEach((h, idx) => {
      ws.getCell(2, idx + 1).value = h;
    });
    styleHeader(ws, 2, 10);

    const filteredTasks = tasks.filter(t => t.day === time);
    
    filteredTasks.forEach((t, i) => {
      const rowNum = 3 + i;
      const globalIdx = tasks.findIndex(gt => gt.id === t.id) + 16;
      
      ws.getCell(rowNum, 1).value = { formula: `=Dashboard!A${globalIdx}`, result: t.id };
      ws.getCell(rowNum, 2).value = { formula: `=Dashboard!C${globalIdx}`, result: t.name };
      ws.getCell(rowNum, 3).value = { formula: `=Dashboard!D${globalIdx}`, result: t.assigned };
      ws.getCell(rowNum, 4).value = { formula: `=Dashboard!E${globalIdx}`, result: t.priority };
      ws.getCell(rowNum, 5).value = { formula: `=Dashboard!I${globalIdx}`, result: t.dep };
      ws.getCell(rowNum, 6).value = { formula: `=Dashboard!F${globalIdx}`, result: t.status }; 
      ws.getCell(rowNum, 7).value = t.deliverable;
      ws.getCell(rowNum, 8).value = t.testReq;
      ws.getCell(rowNum, 9).value = t.secReq;
      ws.getCell(rowNum, 10).value = { formula: `=Dashboard!L${globalIdx}`, result: t.remarks };

      for (let c = 1; c <= 10; c++) {
        const cell = ws.getCell(rowNum, c);
        applyCellDefaults(cell, i % 2 === 1);
        if (c === 1 || c === 4 || c === 5 || c === 6 || c === 8 || c === 9) {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        }
      }
    });

    ws.autoFilter = `A2:J${2 + filteredTasks.length}`;
    addDropdowns(ws, 3, 2 + filteredTasks.length, 6, 4);
    addConditionalFormatting(ws, `F3:F${2 + filteredTasks.length}`, false);
    addConditionalFormatting(ws, `D3:D${2 + filteredTasks.length}`, true);
    autoFitColumns(ws);
  });

  // ==========================================
  // SHEET 11 TO 17: MODULE WISE TASKS - ADD "LAST UPDATED" (Change 1)
  // ==========================================
  moduleSheets.forEach(m => {
    const ws = workbook.addWorksheet(m.sheetName, { views: [{ state: 'frozen', ySplit: 2 }] });

    ws.mergeCells('A1:J1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `${m.sheetName} (Module Lead: ${m.lead}) - Note: Team members must update the 'Last Updated' field whenever a task status changes.`;
    titleCell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
    ws.getRow(1).height = 24;

    const moduleHeaders = ['Task ID', 'Task Name', 'Assigned To', 'Priority', 'Status', 'Due Day', 'Dependency', 'Testing Status', 'Remarks', 'Last Updated'];
    moduleHeaders.forEach((h, idx) => {
      ws.getCell(2, idx + 1).value = h;
    });
    styleHeader(ws, 2, 10);
    ws.getRow(2).height = 26;

    const filtered = tasks.filter(t => t.module === m.filterName);
    filtered.forEach((t, i) => {
      const rowNum = 3 + i;
      const globalIdx = tasks.findIndex(gt => gt.id === t.id) + 16;

      ws.getCell(rowNum, 1).value = { formula: `=Dashboard!A${globalIdx}`, result: t.id };
      ws.getCell(rowNum, 2).value = { formula: `=Dashboard!C${globalIdx}`, result: t.name };
      ws.getCell(rowNum, 3).value = { formula: `=Dashboard!D${globalIdx}`, result: t.assigned };
      ws.getCell(rowNum, 4).value = { formula: `=Dashboard!E${globalIdx}`, result: t.priority };
      ws.getCell(rowNum, 5).value = { formula: `=Dashboard!F${globalIdx}`, result: t.status };
      ws.getCell(rowNum, 6).value = { formula: `=Dashboard!H${globalIdx}`, result: t.day };
      ws.getCell(rowNum, 7).value = { formula: `=Dashboard!I${globalIdx}`, result: t.dep };
      ws.getCell(rowNum, 8).value = { formula: `=Dashboard!J${globalIdx}`, result: t.test };
      ws.getCell(rowNum, 9).value = { formula: `=Dashboard!L${globalIdx}`, result: t.remarks };
      
      // Last Updated: format as date and default to today (Change 1)
      const dateCell = ws.getCell(rowNum, 10);
      dateCell.value = new Date('2026-06-19');
      dateCell.numFormat = 'dd-mm-yyyy';

      for (let c = 1; c <= 10; c++) {
        const cell = ws.getCell(rowNum, c);
        applyCellDefaults(cell, i % 2 === 1);
        if (c === 1 || c === 4 || c === 5 || c === 6 || c === 7 || c === 8 || c === 10) {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        }
      }
    });

    ws.autoFilter = `A2:J${2 + filtered.length}`;
    addDropdowns(ws, 3, 2 + filtered.length, 5, 4);
    addConditionalFormatting(ws, `E3:E${2 + filtered.length}`, false);
    addConditionalFormatting(ws, `D3:D${2 + filtered.length}`, true);
    autoFitColumns(ws);
  });

  // ==========================================
  // SHEET 18: INTEGRATION TRACKER
  // ==========================================
  const integ = workbook.addWorksheet('Integration Tracker', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  integ.mergeCells('A1:H1');
  const intTitle = integ.getCell('A1');
  intTitle.value = 'Cross-Module Integration Point Registry';
  intTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  intTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  integ.getRow(1).height = 24;

  const intHeaders = ['Integration ID', 'Source Module', 'Destination Module', 'Interface Name', 'Data Flow Description', 'Status', 'Assigned To', 'Verification Notes'];
  intHeaders.forEach((h, idx) => {
    integ.getCell(2, idx + 1).value = h;
  });
  styleHeader(integ, 2, 8);
  integ.getRow(2).height = 26;

  const intRows = [
    ['INT-001', 'Frontend', 'Backend', 'Authentication Integration', 'React login/register pages payload connection to Express auth endpoints', 'Not Started', 'Adithyan N', 'Pending API development'],
    ['INT-002', 'Frontend', 'Backend', 'Complaint Submission Portal', 'React complaint intake form uploads to complaints controllers', 'Not Started', 'Adithyan N', 'Pending backend controller setup'],
    ['INT-003', 'Frontend', 'Backend', 'Attendance punch flow', 'React biometric scanner uploads frames to attendance punches APIs', 'Not Started', 'Adithyan N', 'Pending attendance API setup'],
    ['INT-004', 'Frontend', 'Backend', 'Chatbot interface connection', 'React chatbot window dialog log stream to Gemini RAG proxy route', 'Not Started', 'Adithyan N', 'Pending RAG wrapper setup'],
    ['INT-005', 'Backend', 'Database', 'Mongoose database adapters', 'Express server schemas models connection to MongoDB Atlas database', 'Not Started', 'Muhammad Sanish', 'Pending MongoDB configuration'],
    ['INT-006', 'Backend', 'AI Services', 'Gemini RAG connector API', 'Express chat session controller proxy requests to Gemini model client', 'Not Started', 'Muhammad Sanish', 'Pending Gemini client setup'],
    ['INT-007', 'Backend', 'AI Services', 'Biometric liveness service', 'Express attendance punch endpoint forwards face coordinates to face recognizer', 'Not Started', 'Muhammad Sanish', 'Pending face recognizer core model'],
    ['INT-008', 'Frontend', 'Backend', 'File tracking progress lookup', 'React public search timeline reads from tracking API routes', 'Not Started', 'Adithyan N', 'Pending tracking API setup'],
    ['INT-009', 'Backend', 'AI Services', 'OCR character scanner integration', 'Express upload API sends document PDFs/images to OCR text extractor', 'Not Started', 'Muhammad Sanish', 'Pending OCR service setup'],
    ['INT-010', 'Frontend', 'Backend', 'Feedback rating locking system', 'React satisfaction stars locks complaints ticket record on backend', 'Not Started', 'Adithyan N', 'Pending complaint locking logic']
  ];

  intRows.forEach((row, i) => {
    const r = 3 + i;
    row.forEach((val, idx) => {
      integ.getCell(r, idx + 1).value = val;
    });
    for (let c = 1; c <= 8; c++) {
      applyCellDefaults(integ.getCell(r, c), i % 2 === 1);
      if (c === 1 || c === 6 || c === 7) {
        integ.getCell(r, c).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  });

  integ.autoFilter = `A2:H12`;
  addDropdowns(integ, 3, 12, 6, null);
  addConditionalFormatting(integ, `F3:F12`, false);
  autoFitColumns(integ);

  // ==========================================
  // SHEET 19: BUG TRACKER - ADD REVIEW COLUMNS (Change 2)
  // ==========================================
  const bug = workbook.addWorksheet('Bug Tracker', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  bug.mergeCells('A1:O1');
  const bugTitle = bug.getCell('A1');
  bugTitle.value = 'Defect Prevention and QA Bug Tracker';
  bugTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  bugTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  bug.getRow(1).height = 24;

  const bugHeaders = [
    'Bug ID', 'Summary', 'Module', 'Steps to Reproduce', 'Severity', 'Priority', 'Status', 
    'Assigned To', 'Found By', 'Date Found', 'Date Closed', 'Target Release', 'Resolution Notes',
    'Reviewed By', 'Review Date'
  ];
  bugHeaders.forEach((h, idx) => {
    bug.getCell(2, idx + 1).value = h;
  });
  styleHeader(bug, 2, 15);
  bug.getRow(2).height = 26;

  const bugRows = [
    ['BUG-001', 'Token expiration causes infinite loop in Axios interceptor', 'Frontend', '1. Login to client portal.\n2. Wait for JWT token to expire.\n3. Request fails, interceptor retries indefinitely.', 'High', 'High', 'Open', 'Adithyan N', 'Minha Palakkathodi', '19-06-2026', '', 'v1.0.0-MVP', 'Pending triage.', '', ''],
    ['BUG-002', 'Bcrypt hash comparisons fail for special characters in passwords', 'Backend', '1. Register user with password containing $ or @.\n2. Attempt login.\n3. Login fails with password mismatch error.', 'Critical', 'Critical', 'Open', 'Muhammad Sanish', 'Minha Palakkathodi', '19-06-2026', '', 'v1.0.0-MVP', 'Investigating Bcrypt salt validation.', '', ''],
    ['BUG-003', 'Webcam punch feed freezes on Safari desktop browser', 'Face Recognition', '1. Open attendance check-in page in Safari.\n2. Webcam initializes but video stream freezes after 2 seconds.', 'Medium', 'Medium', 'Open', 'Fadi Ahmed', 'Fadi Ahmed', '19-06-2026', '', 'v1.0.0-MVP', 'Checking canvas drawing context update interval.', '', ''],
    ['BUG-004', 'Query failure when fetching complaints with coordinates outside bounds', 'Database', '1. Submit complaint with latitude/longitude outside municipal borders.\n2. Database query fails with geospatial validator error.', 'High', 'High', 'Open', 'Fathima Hana', 'Adithyan N', '19-06-2026', '', 'v1.0.0-MVP', 'Configuring boundary check in Mongoose model validator.', '', ''],
    ['BUG-005', 'Gemini prompt injections can bypass municipal knowledge base restriction', 'AI', '1. Open Chatbot interface.\n2. Enter prompt telling the model to ignore previous instructions.\n3. Model answers general knowledge queries.', 'High', 'Critical', 'Open', 'Muhammed Sadik KT', 'Minha Palakkathodi', '19-06-2026', '', 'v1.0.0-MVP', 'Refining grounding prompts with strict system bounds.', '', '']
  ];

  for (let r = 3; r <= 30; r++) {
    bug.getCell(r, 7).dataValidation = { type: 'list', allowBlank: true, formulae: ['"New,Assigned,In Progress,Ready for Test,Verified,Closed,Open"'] };
    bug.getCell(r, 5).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Critical,High,Medium,Low"'] };
    bug.getCell(r, 6).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Critical,High,Medium,Low"'] };
    
    // Format date closed and review date
    bug.getCell(r, 11).numFormat = 'dd-mm-yyyy';
    bug.getCell(r, 15).numFormat = 'dd-mm-yyyy';

    for (let c = 1; c <= 15; c++) {
      applyCellDefaults(bug.getCell(r, c), r % 2 === 1);
    }
  }

  bugRows.forEach((row, i) => {
    const r = 3 + i;
    row.forEach((v, idx) => {
      bug.getCell(r, idx + 1).value = v;
    });
  });

  bug.autoFilter = 'A2:O30';
  addConditionalFormatting(bug, 'G3:G30', false);
  addConditionalFormatting(bug, 'E3:E30', true);
  autoFitColumns(bug);

  // ==========================================
  // SHEET 20: SECURITY CHECKLIST
  // ==========================================
  const sec = workbook.addWorksheet('Security Checklist', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  sec.mergeCells('A1:F1');
  const secTitle = sec.getCell('A1');
  secTitle.value = 'Mandatory MVP Security Validation Gates';
  secTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  secTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  sec.getRow(1).height = 24;

  const secHeaders = ['Control ID', 'Security Control Requirement', 'Verification Method / Evidence', 'Status', 'Verified By', 'Target Day'];
  secHeaders.forEach((h, idx) => {
    sec.getCell(2, idx + 1).value = h;
  });
  styleHeader(sec, 2, 6);
  sec.getRow(2).height = 26;

  const secControls = [
    ['SEC-001', 'No plaintext secrets committed. Config retrieved from env.', 'Code review of configuration modules & environment logs.', 'Pending', 'Adithyan N', 'Sprint 0'],
    ['SEC-002', 'Bcrypt password hashing configured with workload factor >= 10.', 'Review backend signup logic and test database hashes.', 'Pending', 'Muhammad Sanish', 'Day 2'],
    ['SEC-003', 'JWT tokens set with short expiration limits (< 15 mins).', 'Examine JWT payload structures and expiry parameters.', 'Pending', 'Muhammad Sanish', 'Day 2'],
    ['SEC-004', 'Frontend Token Handling (Cookie Storage)', 'Check local/session storage cookie attributes and CORS bounds', 'Pending', 'Adithyan N', 'Day 2'],
    ['SEC-005', 'Resource ownership filter validated at backend layer.', 'Testing API modifications under multiple authenticated roles.', 'Pending', 'Muhammad Sanish', 'Day 3'],
    ['SEC-006', 'Upload restrictions gated to PDF/Image formats and < 5MB.', 'Try uploading arbitrary text/executable files to complain attachments.', 'Pending', 'Muhammad Sanish', 'Day 3'],
    ['SEC-007', 'Public trackers suppress private remarks & internal logs.', 'Call tracking endpoint publicly and inspect JSON response.', 'Pending', 'Muhammad Sanish', 'Day 3'],
    ['SEC-008', 'Biometric consent checked prior to webcam scan access.', 'Test attendance check-in workflow without setting consent flag.', 'Pending', 'Fathima Hana', 'Day 4'],
    ['SEC-009', 'Face Data Cleanup (Zero Retention in RAM)', 'Verify volatile memory execution and check disk file systems.', 'Pending', 'Fadi Ahmed + Muhammed Sadik KT', 'Day 4'],
    ['SEC-010', 'Gemini prompts locked within municipal context chunks.', 'Attempt prompt injections to query non-municipal system topics.', 'Pending', 'Muhammed Sadik KT', 'Day 5'],
    ['SEC-011', 'Anti-NoSQL injection middleware active on backend.', 'Send query payloads with operator tags ($gt, $ne, etc.) to APIs.', 'Pending', 'Muhammad Sanish', 'Day 6'],
    ['SEC-012', 'Immutable S3 backup snapshot locks configured.', 'Review backup lock policy config and attempt deletion command.', 'Pending', 'Fathima Hana', 'Day 7']
  ];

  secControls.forEach((row, i) => {
    const r = 3 + i;
    row.forEach((val, idx) => {
      sec.getCell(r, idx + 1).value = val;
    });
    for (let c = 1; c <= 6; c++) {
      applyCellDefaults(sec.getCell(r, c), i % 2 === 1);
      if (c === 1 || c === 4 || c === 5 || c === 6) {
        sec.getCell(r, c).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  });

  sec.autoFilter = `A2:F14`;
  addDropdowns(sec, 3, 14, 4, null);
  addConditionalFormatting(sec, `D3:D14`, false);
  autoFitColumns(sec);

  // ==========================================
  // SHEET 21: DAILY STANDUP
  // ==========================================
  const stand = workbook.addWorksheet('Daily Standup', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  stand.mergeCells('A1:F1');
  const standTitle = stand.getCell('A1');
  standTitle.value = 'Daily Scrum Standup Tracker (15 mins Review logs)';
  standTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  standTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  stand.getRow(1).height = 24;

  const standHeaders = ['Date', 'Team Member', 'Yesterday (Completed Tasks)', 'Today (Planned Tasks)', 'Blockers / Roadblocks', 'Present (Yes/No)'];
  standHeaders.forEach((h, idx) => {
    stand.getCell(2, idx + 1).value = h;
  });
  styleHeader(stand, 2, 6);
  stand.getRow(2).height = 26;

  const dates = ['19-06-2026', '19-06-2026', '19-06-2026', '19-06-2026', '19-06-2026', '19-06-2026'];
  
  teamMembers.forEach((member, idx) => {
    const row = 3 + idx;
    stand.getCell(row, 1).value = dates[idx];
    stand.getCell(row, 2).value = member;
    stand.getCell(row, 3).value = 'None (Day 0 Initial)';
    stand.getCell(row, 4).value = 'Sprint 0 Setup tasks';
    stand.getCell(row, 5).value = 'None';
    stand.getCell(row, 6).value = 'Yes';
    stand.getCell(row, 6).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Yes,No"'] };
    for (let c = 1; c <= 6; c++) {
      applyCellDefaults(stand.getCell(row, c), idx % 2 === 1);
      if (c === 1 || c === 2 || c === 6) {
        stand.getCell(row, c).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  });

  stand.autoFilter = 'A2:F8';
  autoFitColumns(stand);

  // ==========================================
  // SHEET 22: TEAM WORKLOAD
  // ==========================================
  const workload = workbook.addWorksheet('Team Workload', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  workload.mergeCells('A1:F1');
  const wlTitle = workload.getCell('A1');
  wlTitle.value = 'Resource Allocation and Productivity Tracker';
  wlTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  wlTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  workload.getRow(1).height = 24;

  const wlHeaders = ['Team Member', 'Assigned Tasks', 'Completed', 'Pending', 'Blocked', 'Completion %'];
  wlHeaders.forEach((h, idx) => {
    workload.getCell(2, idx + 1).value = h;
  });
  styleHeader(workload, 2, 6);
  workload.getRow(2).height = 26;

  teamMembers.forEach((member, i) => {
    const row = 3 + i;
    const dashRow = 8 + i; 
    const count = memberCounts[member] || 0;

    workload.getCell(row, 1).value = { formula: `=Dashboard!A${dashRow}`, result: member };
    workload.getCell(row, 2).value = { formula: `=Dashboard!B${dashRow}`, result: count };
    workload.getCell(row, 3).value = { formula: `=Dashboard!C${dashRow}`, result: 0 };
    workload.getCell(row, 4).value = { formula: `=Dashboard!D${dashRow}`, result: count };
    workload.getCell(row, 5).value = { formula: `=Dashboard!E${dashRow}`, result: 0 };
    workload.getCell(row, 6).value = { formula: `=Dashboard!F${dashRow}`, result: 0.0 };

    for (let c = 1; c <= 6; c++) {
      applyCellDefaults(workload.getCell(row, c), i % 2 === 1);
      if (c >= 2 && c <= 5) workload.getCell(row, c).alignment = { horizontal: 'center', vertical: 'middle' };
      if (c === 6) {
        workload.getCell(row, c).numFormat = '0.0%';
        workload.getCell(row, c).alignment = { horizontal: 'right', vertical: 'middle' };
      }
    }
  });

  workload.autoFilter = `A2:F8`;
  autoFitColumns(workload);

  // ==========================================
  // SHEET 23: DEPENDENCY TRACKER
  // ==========================================
  const dep = workbook.addWorksheet('Dependency Tracker', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  dep.mergeCells('A1:F1');
  const depTitle = dep.getCell('A1');
  depTitle.value = 'Critical Path Dependency Registry';
  depTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  depTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  dep.getRow(1).height = 24;

  const depHeaders = ['Dependency ID', 'Pre-Requisite Task', 'Dependent Task', 'Dependency Description', 'Status', 'Severity Impact'];
  depHeaders.forEach((h, idx) => {
    dep.getCell(2, idx + 1).value = h;
  });
  styleHeader(dep, 2, 6);
  dep.getRow(2).height = 26;

  const depRows = [
    ['DEP-001', 'TASK-DB-001 (User Schema)', 'TASK-BE-004 (Authentication APIs)', 'Auth controllers require user schema models before coding begins', 'Not Started', 'Critical'],
    ['DEP-002', 'TASK-BE-004 (Authentication APIs)', 'TASK-BE-005 (JWT implementation)', 'JWT logic is built on top of Auth user credentials matching', 'Not Started', 'Critical'],
    ['DEP-003', 'TASK-BE-005 (JWT implementation)', 'TASK-FE-006 (Protected routes)', 'React protected routes require working backend JWT verification', 'Not Started', 'Critical'],
    ['DEP-004', 'TASK-DB-005 (Complaint Schema)', 'TASK-BE-012 (Complaint APIs)', 'Complaints controller depends on Mongoose schemas definitions', 'Not Started', 'High'],
    ['DEP-005', 'TASK-BE-012 (Complaint APIs)', 'TASK-FE-011 (Complaint Management UI)', 'Intake forms submission UI requires active complaint APIs endpoints', 'Not Started', 'High'],
    ['DEP-006', 'TASK-AI-006 (Face recognition core)', 'TASK-BE-015 (Attendance APIs)', 'Biometrics attendance punches verify client frames via AI script', 'Not Started', 'High'],
    ['DEP-007', 'TASK-BE-015 (Attendance APIs)', 'TASK-FE-015 (Attendance UI)', 'Attendance scanner punches require active attendance endpoint', 'Not Started', 'High'],
    ['DEP-008', 'TASK-AI-003 (Chatbot API)', 'TASK-FE-016 (Chatbot UI)', 'Grounded chatbot React overlay queries chat sessions endpoints', 'Not Started', 'High']
  ];

  depRows.forEach((row, i) => {
    const r = 3 + i;
    row.forEach((val, idx) => {
      dep.getCell(r, idx + 1).value = val;
    });

    dep.getCell(r, 5).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Not Started,Resolved,Blocked,In Progress"'] };
    dep.getCell(r, 6).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Critical,High,Medium,Low"'] };

    for (let c = 1; c <= 6; c++) {
      applyCellDefaults(dep.getCell(r, c), i % 2 === 1);
      if (c === 1 || c === 2 || c === 3 || c === 5 || c === 6) {
        dep.getCell(r, c).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  });

  dep.autoFilter = `A2:F10`;
  addConditionalFormatting(dep, `E3:E10`, false); 
  addConditionalFormatting(dep, `F3:F10`, true); 
  autoFitColumns(dep);

  // ==========================================
  // SHEET 24: DEPLOYMENT CHECKLIST
  // ==========================================
  const depl = workbook.addWorksheet('Deployment Checklist', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  depl.mergeCells('A1:E1');
  const deplTitle = depl.getCell('A1');
  deplTitle.value = 'MVP Production Launch Readiness Gates';
  deplTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  deplTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  depl.getRow(1).height = 24;

  const deplHeaders = ['Deployment ID', 'Launch Readiness Task', 'Verification Method', 'Status', 'Verified By'];
  deplHeaders.forEach((h, idx) => {
    depl.getCell(2, idx + 1).value = h;
  });
  styleHeader(depl, 2, 5);
  depl.getRow(2).height = 26;

  const deplChecks = [
    ['DEPL-001', 'MongoDB Atlas Multi-AZ cluster config', 'Verify production connection URI and access rules', 'Not Started', 'Adithyan N'],
    ['DEPL-002', 'Production environment variables loaded', 'Check config env parameters on hosting targets', 'Not Started', 'Muhammad Sanish'],
    ['DEPL-003', 'CORS origins allowlist configured', 'Ensure only frontend URL is allowed in backend middleware', 'Not Started', 'Muhammad Sanish'],
    ['DEPL-004', 'HTTPS redirection configuration', 'Confirm HTTP automatically redirects to HTTPS on production', 'Not Started', 'Adithyan N'],
    ['DEPL-005', 'Render API Hosting server deploy', 'Deploy backend service to Render backend web service', 'Not Started', 'Muhammad Sanish'],
    ['DEPL-006', 'Vercel Frontend client deploy', 'Deploy React app and configure production routing on Vercel', 'Not Started', 'Adithyan N'],
    ['DEPL-007', 'Turnstile CAPTCHA keys integration', 'Load live keys to frontend and backend env properties', 'Not Started', 'Adithyan N'],
    ['DEPL-008', 'KMS backup encryption setup', 'Verify encryption keys rotation policies on AWS KMS', 'Not Started', 'Fathima Hana']
  ];

  deplChecks.forEach((row, i) => {
    const r = 3 + i;
    row.forEach((val, idx) => {
      depl.getCell(r, idx + 1).value = val;
    });

    for (let c = 1; c <= 5; c++) {
      applyCellDefaults(depl.getCell(r, c), i % 2 === 1);
      if (c === 1 || c === 4 || c === 5) {
        depl.getCell(r, c).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  });

  depl.autoFilter = `A2:E10`;
  addDropdowns(depl, 3, 10, 4, null);
  addConditionalFormatting(depl, `D3:D10`, false);
  autoFitColumns(depl);

  // ==========================================
  // SHEET 25: RISKS & BLOCKERS - ADD ESCALATION (Change 8)
  // ==========================================
  const risk = workbook.addWorksheet('Risks & Blockers', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  risk.mergeCells('A1:G1');
  const riskTitle = risk.getCell('A1');
  riskTitle.value = 'Project Risk Mitigation Register';
  riskTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  riskTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  risk.getRow(1).height = 24;

  const riskHeaders = ['Risk ID', 'Risk Description', 'Severity Impact', 'Mitigation Plan Action', 'Risk Owner', 'Status', 'Escalation Required? (Yes/No)'];
  riskHeaders.forEach((h, idx) => {
    risk.getCell(2, idx + 1).value = h;
  });
  styleHeader(risk, 2, 7);
  risk.getRow(2).height = 26;

  const risksData = [
    ['RSK-001', 'API Development Delay', 'High', 'Develop mock API endpoints and response wrappers early in frontend to prevent blockages.', 'Muhammad Sanish', 'Open', 'No'],
    ['RSK-002', 'Cross-Module Integration Failure', 'High', 'Enforce interface schema contracts and perform daily standup integration checks.', 'Adithyan N', 'Open', 'No'],
    ['RSK-003', 'Database Schema Finalization Delay', 'Medium', 'Provide early database support from Adithyan N to Fathima Hana to accelerate schemas coding.', 'Fathima Hana', 'Open', 'No'],
    ['RSK-004', 'Biometric Face Recognition Accuracy Drop', 'High', 'Set up camera calibration parameters dataset and define manual fallback PIN verification.', 'Fadi Ahmed', 'Open', 'No'],
    ['RSK-005', 'Gemini AI Service Downtime', 'Medium', 'Implement local failover checks and display user warning alert indicators.', 'Muhammed Sadik KT', 'Open', 'No'],
    ['RSK-006', 'Frontend Component Delivery Delay', 'Medium', 'Prioritize basic auth routing layouts and grievance pages before styling visual charts.', 'Adithyan N', 'Open', 'No'],
    ['RSK-007', 'Production Environment Deployment Failure', 'High', 'Initialize hosting services environments and deploy simple diagnostic local runs on Day 4.', 'Adithyan N + Muhammad Sanish', 'Open', 'No']
  ];

  risksData.forEach((row, i) => {
    const r = 3 + i;
    row.forEach((val, idx) => {
      risk.getCell(r, idx + 1).value = val;
    });

    risk.getCell(r, 3).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Critical,High,Medium,Low"'] };
    risk.getCell(r, 6).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Open,Mitigated,Closed"'] };
    risk.getCell(r, 7).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Yes,No"'] };

    for (let c = 1; c <= 7; c++) {
      applyCellDefaults(risk.getCell(r, c), i % 2 === 1);
      if (c === 1 || c === 3 || c === 5 || c === 6 || c === 7) {
        risk.getCell(r, c).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  });

  risk.autoFilter = `A2:G9`;
  addConditionalFormatting(risk, `C3:C9`, true); 
  autoFitColumns(risk);

  // ==========================================
  // SHEET 26: FINAL HANDOVER CHECKLIST
  // ==========================================
  const hand = workbook.addWorksheet('Final Handover Checklist', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  hand.mergeCells('A1:E1');
  const handTitle = hand.getCell('A1');
  handTitle.value = 'Official Municipality Handover Packages Delivery Checklist';
  handTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  handTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  hand.getRow(1).height = 24;

  const handHeaders = ['Handover ID', 'Handover Package / Deliverable', 'Owner', 'Status', 'Remarks / Details'];
  handHeaders.forEach((h, idx) => {
    hand.getCell(2, idx + 1).value = h;
  });
  styleHeader(hand, 2, 5);
  hand.getRow(2).height = 26;

  const handChecks = [
    ['HND-001', 'Developer Guide and API Readme Manual', 'Minha Palakkathodi', 'Pending', 'Official handoff documentation template'],
    ['HND-002', 'GitHub Repository Admin Credentials Transfer', 'Adithyan N', 'Pending', 'Rotating repository administrative keys'],
    ['HND-003', 'MongoDB Atlas Cluster Credentials Transfer', 'Adithyan N', 'Pending', 'Transfer ownership to client account'],
    ['HND-004', 'Render and Vercel Hosting Administration Credentials', 'Muhammad Sanish', 'Pending', 'Provide organization administration logins'],
    ['HND-005', 'Escalation Contacts and SLA Matrix Agreement', 'Minha Palakkathodi', 'Pending', 'Document contacts list and response guidelines'],
    ['HND-006', 'Biometric Data Consent Forms Logs', 'Minha Palakkathodi', 'Pending', 'Review records against privacy requirements']
  ];

  handChecks.forEach((row, i) => {
    const r = 3 + i;
    row.forEach((val, idx) => {
      hand.getCell(r, idx + 1).value = val;
    });

    for (let c = 1; c <= 5; c++) {
      applyCellDefaults(hand.getCell(r, c), i % 2 === 1);
      if (c === 1 || c === 3 || c === 4) {
        hand.getCell(r, c).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  });

  hand.autoFilter = `A2:E8`;
  addDropdowns(hand, 3, 8, 4, null);
  addConditionalFormatting(hand, `D3:D8`, false);
  autoFitColumns(hand);

  // ==========================================
  // SHEET 27: DAILY REVIEW LOG (Change 4 - New Sheet)
  // ==========================================
  const log = workbook.addWorksheet('Daily Review Log', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  log.mergeCells('A1:L1');
  const logTitle = log.getCell('A1');
  logTitle.value = 'AI-Powered Smart Municipal Project - Daily Scrum Evening Review Log';
  logTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  logTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  log.getRow(1).height = 24;

  const logHeaders = [
    'Date', 'Meeting Conducted By', 'Attendees', 'Completed Tasks', 'Current Blockers', 
    'Security Issues', 'Integration Issues', 'Risks Identified', 'Decisions Taken', 'Action Items', 'Owner', 'Due Date'
  ];
  logHeaders.forEach((h, idx) => {
    log.getCell(2, idx + 1).value = h;
  });
  styleHeader(log, 2, 12);
  log.getRow(2).height = 26;

  // Pre-populate 1 sample row for guidance (Change 4)
  const sampleLog = [
    '19-06-2026', 'Adithyan N', 'Minha, Sanish, Hana, Fadi, Sadik', 'TASK-INF-001, TASK-INF-002', 'None', 
    'None', 'Integration between React app and Express server auth endpoints under verification', 
    'API development delay mitigated with mock routes', 'Decided to lock complaints schema today', 
    'Complete protected routing guards setup', 'Adithyan N', '20-06-2026'
  ];
  
  for (let r = 3; r <= 30; r++) {
    log.getCell(r, 1).numFormat = 'dd-mm-yyyy';
    log.getCell(r, 12).numFormat = 'dd-mm-yyyy';
    for (let c = 1; c <= 12; c++) {
      applyCellDefaults(log.getCell(r, c), r % 2 === 1);
    }
  }

  sampleLog.forEach((val, idx) => {
    log.getCell(3, idx + 1).value = val;
  });

  log.autoFilter = 'A2:L30';
  autoFitColumns(log);

  // ==========================================
  // SHEET 28: TESTING TRACKER (Change 5 - New Sheet)
  // ==========================================
  const testTracker = workbook.addWorksheet('Testing Tracker', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  testTracker.mergeCells('A1:I1');
  const ttTitle = testTracker.getCell('A1');
  ttTitle.value = 'AI-Powered Smart Municipal Project - Quality Assurance Testing Tracker';
  ttTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  ttTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  testTracker.getRow(1).height = 24;

  const ttHeaders = ['Test ID', 'Module', 'Feature', 'Test Type', 'Assigned Tester', 'Status', 'Bug Found (Yes/No)', 'Bug ID', 'Remarks'];
  ttHeaders.forEach((h, idx) => {
    testTracker.getCell(2, idx + 1).value = h;
  });
  styleHeader(testTracker, 2, 9);
  testTracker.getRow(2).height = 26;

  const testRows = [
    ['TST-001', 'Backend', 'Authentication', 'Integration', 'Adithyan N', 'Not Started', 'No', '', 'Verify JWT access token validations'],
    ['TST-002', 'Frontend', 'Complaint Module', 'Functional', 'Adithyan N', 'Not Started', 'No', '', 'Verify complaint intake form submits successfully'],
    ['TST-003', 'Backend', 'File Tracking', 'API', 'Adithyan N', 'Not Started', 'No', '', 'Verify public tracking endpoint outputs tracking steps'],
    ['TST-004', 'Frontend', 'Feedback', 'UI', 'Minha Palakkathodi', 'Not Started', 'No', '', 'Verify feedback form locks complaint upon ratings submission'],
    ['TST-005', 'Face Recognition', 'Attendance', 'Functional', 'Fadi Ahmed', 'Not Started', 'No', '', 'Verify webcam face punch liveness match'],
    ['TST-006', 'AI', 'Chatbot', 'RAG Integration', 'Adithyan N', 'Not Started', 'No', '', 'Verify Gemini answers grounded in local context'],
    ['TST-007', 'Face Recognition', 'Face Recognition', 'Accuracy', 'Fadi Ahmed', 'Not Started', 'No', '', 'Verify FAR/FRR rates calibration tests'],
    ['TST-008', 'AI', 'OCR', 'API', 'Minha Palakkathodi', 'Not Started', 'No', '', 'Verify file attachments text parsing and metadata extraction'],
    ['TST-009', 'Frontend', 'Dashboard', 'Responsive', 'Adithyan N', 'Not Started', 'No', '', 'Verify layouts and menus render cleanly on mobile'],
    ['TST-010', 'Backend', 'Notifications', 'API', 'Minha Palakkathodi', 'Not Started', 'No', '', 'Verify notification dispatch logs on database']
  ];

  for (let r = 3; r <= 30; r++) {
    testTracker.getCell(r, 5).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Adithyan N,Minha Palakkathodi,Fadi Ahmed"'] };
    testTracker.getCell(r, 6).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Not Started,In Progress,Passed,Failed,Blocked"'] };
    testTracker.getCell(r, 7).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Yes,No"'] };
    
    for (let c = 1; c <= 9; c++) {
      applyCellDefaults(testTracker.getCell(r, c), r % 2 === 1);
    }
  }

  testRows.forEach((row, i) => {
    const r = 3 + i;
    row.forEach((val, idx) => {
      testTracker.getCell(r, idx + 1).value = val;
    });
    for (let c = 1; c <= 9; c++) {
      if (c === 1 || c === 5 || c === 6 || c === 7 || c === 8) {
        testTracker.getCell(r, c).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  });

  testTracker.autoFilter = 'A2:I30';
  addConditionalFormatting(testTracker, `F3:F30`, false);
  autoFitColumns(testTracker);

  // ==========================================
  // SHEET 29: SECURITY REVIEW TRACKER (Change 6 - New Sheet)
  // ==========================================
  const secTracker = workbook.addWorksheet('Security Review Tracker', { views: [{ state: 'frozen', ySplit: 2 }] });
  
  secTracker.mergeCells('A1:G1');
  const stTitle = secTracker.getCell('A1');
  stTitle.value = 'AI-Powered Smart Municipal Project - Security Review & Validation Tracker';
  stTitle.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  stTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  secTracker.getRow(1).height = 24;

  const stHeaders = ['Security Item', 'Owner', 'Review Status', 'Reviewed By', 'Review Date', 'Risk Level', 'Remarks'];
  stHeaders.forEach((h, idx) => {
    secTracker.getCell(2, idx + 1).value = h;
  });
  styleHeader(secTracker, 2, 7);
  secTracker.getRow(2).height = 26;

  const secTrackerRows = [
    ['Password Hashing', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'Critical', 'Verify bcrypt salt factor config'],
    ['JWT Security', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'Critical', 'Check JWT signatures and short TTL bounds'],
    ['RBAC', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'Critical', 'Check role permissions middleware validations'],
    ['Rate Limiting', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'High', 'Check express-rate-limit settings'],
    ['Input Validation', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'High', 'Validate inputs against Mongoose schemas'],
    ['Audit Logging', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'High', 'Ensure critical updates are logged'],
    ['Environment Variables', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'Critical', 'Ensure no secrets in source control'],
    ['File Upload Validation', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'High', 'Restrict uploads to PDF/PNG and <5MB'],
    ['HTTPS Verification', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'Medium', 'Enforce SSL redirection on production'],
    ['Sensitive Data Protection', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'High', 'Redact PII from diagnostic logging'],
    ['Face Data Cleanup', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'Critical', 'Confirm zero frame photo persistence in RAM'],
    ['OCR Validation', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'Medium', 'Verify file parsing sandbox restrictions'],
    ['Prompt Injection Protection', 'Adithyan N', 'Not Started', 'Adithyan N', '', 'High', 'Validate chat inputs and ground system prompts']
  ];

  for (let r = 3; r <= 30; r++) {
    secTracker.getCell(r, 3).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Not Started,In Progress,Passed,Failed,Blocked"'] };
    secTracker.getCell(r, 6).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Critical,High,Medium,Low"'] };
    secTracker.getCell(r, 5).numFormat = 'dd-mm-yyyy';

    for (let c = 1; c <= 7; c++) {
      applyCellDefaults(secTracker.getCell(r, c), r % 2 === 1);
    }
  }

  secTrackerRows.forEach((row, i) => {
    const r = 3 + i;
    row.forEach((val, idx) => {
      secTracker.getCell(r, idx + 1).value = val;
    });
    for (let c = 1; c <= 7; c++) {
      if (c === 2 || c === 3 || c === 4 || c === 5 || c === 6) {
        secTracker.getCell(r, c).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  });

  secTracker.autoFilter = 'A2:G15';
  addConditionalFormatting(secTracker, `C3:C15`, false);
  addConditionalFormatting(secTracker, `F3:F15`, true);
  autoFitColumns(secTracker);

  // ==========================================
  // SHEET 30: TEAM USAGE GUIDE (Change 9 - New Sheet)
  // ==========================================
  const guide = workbook.addWorksheet('Team Usage Guide');
  
  guide.mergeCells('A1:F1');
  const guideTitle = guide.getCell('A1');
  guideTitle.value = 'Smart Municipal Project - Team Usage & Kanban Board Guide';
  guideTitle.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  guideTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.headerBg } };
  guideTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  guide.getRow(1).height = 30;

  const guideRows = [
    ['1. How to update task status:', 'Go to the \'Dashboard\' sheet, scroll down to the Master Task List, find your task, and double-click the \'Status\' cell (Column F). Select from the dropdown: Not Started, In Progress, Review, Completed, or Blocked.'],
    ['2. How to update progress %:', 'On the \'Dashboard\' sheet, the \'Progress %\' (Column G) updates automatically based on the status: 100% for Completed, 80% for Review, 50% for In Progress, and 0% for Not Started.'],
    ['3. How to report blockers:', 'If a task is blocked, change its Status to \'Blocked\'. Go to the \'Risks & Blockers\' sheet and add a risk description. Mark \'Escalation Required?\' as \'Yes\' if it needs urgent PMO discussion.'],
    ['4. How to report bugs:', 'Go to the \'Bug Tracker\' sheet, add a new row with Bug ID, summary, severity, and select Status as \'Open\'. Assign the bug to the developer (e.g. Adithyan N for Frontend).'],
    ['5. How to update Last Updated field:', 'Go to your specific team task sheet (e.g. \'Frontend Tasks\') and type the date in dd-mm-yyyy format in the \'Last Updated\' column (Column J) whenever you change a task\'s status.'],
    ['6. How to use the Kanban Board:', 'The \'Kanban Board\' sheet automatically displays tasks under columns matching their status. Use it during daily standups to visualize the team\'s workload.'],
    ['7. How evening review meetings work:', 'The team holds a mandatory 15-minute evening review meeting. The meeting conductor will log attendees, completed tasks, blockers, and actions in the \'Daily Review Log\' sheet.'],
    ['8. How to prioritize Demo Critical tasks:', 'Filter the Master Task List on \'Dashboard\' by the \'Demo Critical?\' column (Column M) = \'Yes\'. These core features (Auth, Complaints, Attendance, Chatbot, etc.) must be completed first.']
  ];

  guideRows.forEach((row, i) => {
    const r = 3 + i * 2;
    
    // Header
    guide.getCell(r, 1).value = row[0];
    guide.getCell(r, 1).font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: colors.titleText } };
    guide.getCell(r, 1).alignment = { vertical: 'middle' };
    
    // Description
    guide.mergeCells(r + 1, 1, r + 1, 6);
    const descCell = guide.getCell(r + 1, 1);
    descCell.value = row[1];
    descCell.font = { name: 'Segoe UI', size: 10 };
    descCell.alignment = { vertical: 'top', wrapText: true };
    
    guide.getRow(r).height = 20;
    guide.getRow(r + 1).height = 36;
    
    // Add thin border to guide card cells
    for (let c = 1; c <= 6; c++) {
      guide.getCell(r, c).border = { top: { style: 'thin', color: { argb: colors.border } } };
      guide.getCell(r + 1, c).border = { bottom: { style: 'thin', color: { argb: colors.border } } };
    }
  });

  autoFitColumns(guide);

  const destPath = path.join('d:', 'Adhi', 'kottakkal', 'Municipality_Project_Advanced_Kanban.xlsx');
  await workbook.xlsx.writeFile(destPath);
  console.log(`Workbook created successfully at: ${destPath}`);
}

createWorkbook().catch(err => {
  console.error('Error generating workbook:', err);
  process.exit(1);
});
