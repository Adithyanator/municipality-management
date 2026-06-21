// Detailed metadata for all 96 tasks in the Municipality project
module.exports = {
  // INFRASTRUCTURE TASKS (9 tasks)
  'TASK-INF-001': {
    desc: 'Verify and review the initial local Git repository layout and workspace structure. Check configuration files integrity like package.json, eslint configurations, and node workspaces setup. Ensure folder layout complies with project standards. Document structure errors and align branching structure before coding.',
    tech: 'Git, Node.js, Workspace CLI',
    keywords: 'verify git layout, node workspace config, package.json check, folder integrity',
    ref: 'docs/02-System-Architecture/MASTER_ARCHITECTURE_v1.md',
  },
  'TASK-INF-002': {
    desc: 'Define and establish standard repository branching guidelines and commit formats. Set up develop, main, and feature branch definitions on GitHub. Enforce pull request guidelines, commit tags (e.g. feat:, fix:), and merge criteria. Create a markdown documentation in docs detailing the repository rules.',
    tech: 'Git, GitHub, Markdown',
    keywords: 'git workflow rules, branching strategy, pull request rules, commit guidelines',
    ref: 'docs/BRANCH_STRATEGY.md',
  },
  'TASK-INF-003': {
    desc: 'Initialize feature branches on the remote repository matching the project roadmap tasks list. Validate pull request pipelines and assign roles for code reviews. Set up status checks and branch protection rules for main and develop. Ensure developers can push feature branches without access conflicts.',
    tech: 'GitHub, Git CLI',
    keywords: 'initialize feature branches, branch protection rules, code review assignments',
    ref: 'docs/BRANCH_STRATEGY.md',
  },
  'TASK-INF-004': {
    desc: 'Set up a live MongoDB Atlas sandbox cluster with strict security controls. Create database users, manage credentials, and restrict network access with IP whitelist rules. Generate the production connection URI string. Validate database access locally using MongoDB Compass or terminal tools before deploying.',
    tech: 'MongoDB Atlas, MongoDB Compass, Network Security',
    keywords:
      'mongodb atlas setup, database clusters config, IP whitelists rules, connection string',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-INF-005': {
    desc: 'Create standard environment variables configuration templates (.env.example) for backend, frontend, and AI modules. Detail all required keys like DB connection strings, JWT secret keys, and Gemini API keys. Ensure no secret files are pushed to Git by verifying .gitignore excludes .env files.',
    tech: 'Node.js, Dotenv, Git Ignore',
    keywords: 'dotenv configuration, environment template, gitignore rules, api keys templates',
    ref: 'docs/02-System-Architecture/MASTER_ARCHITECTURE_v1.md',
  },
  'TASK-INF-006': {
    desc: 'Deploy and configure standard ESLint code styling rules at the repository root. Establish code style limits for formatting, imports, and variables declaration to maintain code quality. Test styling standards compatibility in both backend and frontend workspaces. Create npm run lint check tasks.',
    tech: 'Node.js, ESLint, npm',
    keywords:
      'eslint config rules, code quality checks, linter automation scripts, code style configuration',
    ref: 'docs/02-System-Architecture/MASTER_ARCHITECTURE_v1.md',
  },
  'TASK-INF-007': {
    desc: 'Integrate Prettier formatter scripts into the workspaces. Create the configuration rules files (.prettierrc) matching eslint specifications. Set up auto format on save configurations for Visual Studio Code or similar text editors. Validate formattings across backend, database, and client files.',
    tech: 'Prettier, ESLint, Editor SDK',
    keywords:
      'prettier configuration, code formatter scripts, editor styling setup, auto format guidelines',
    ref: 'docs/02-System-Architecture/MASTER_ARCHITECTURE_v1.md',
  },
  'TASK-INF-008': {
    desc: 'Deploy a centralized logging infrastructure using Winston and Morgan libraries. Design standard logging configurations to output info, warn, and error statements. Implement log transport mechanisms to files and console. Add critical data masking functions to redact sensitive client parameters or PII details.',
    tech: 'Node.js, Winston, Morgan, Regex',
    keywords: 'winston logger config, morgan traffic logging, logger masking, PII redact logic',
    ref: 'docs/02-System-Architecture/MASTER_ARCHITECTURE_v1.md',
  },
  'TASK-INF-009': {
    desc: 'Prepare the deployment pipelines and configuration documents for the MVP launch. Check hosting prerequisites for Render web services and Vercel client deployment. Generate CORS policy guidelines to prevent cross-origin errors in staging. Verify build dependencies and create the final launch report.',
    tech: 'Render, Vercel, CORS Configuration',
    keywords:
      'production deploy checklist, hosting environments config, CORS restrictions rules, launch plan',
    ref: 'docs/02-System-Architecture/MASTER_ARCHITECTURE_v1.md',
  },

  // DATABASE TASKS (16 tasks)
  'TASK-DB-001': {
    desc: 'Create Mongoose schema definitions for users collection inside the backend models folder. Design fields for email, name, password hash, role reference, and active status. Add schema validations, unique index requirements, and automatic timestamps. Seed standard administrative credentials for testing.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords: 'mongoose user schema, schema validations, user collection model, database index',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-002': {
    desc: 'Create Mongoose schema definitions for roles collection. Map role fields like role name (e.g. Citizen, Staff, Admin) and permission arrays references. Seed standard project role entries during database initialization. Implement strict integrity validations to prevent duplicate role registration.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords: 'mongoose roles schema, role definitions map, database seeding, permissions index',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-003': {
    desc: 'Design and deploy Mongoose schema for the system permissions collection. Define attributes like resource path, CRUD actions flags, and permission descriptors. Map roles relationship arrays to permissions collections. Provide utility scripts to seed baseline route permission indices.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords:
      'mongoose permissions model, route permission check, database seeding scripts, RBAC config',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-004': {
    desc: 'Create Mongoose schema mapping departments collection in the backend models directory. Add fields for department name, lead assigned reference, code, and active staff indices list. Implement Mongoose model validations and query middleware helper methods. Seed primary departments data.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords: 'mongoose department schema, department metadata model, indexing strategy, data seed',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-005': {
    desc: 'Develop the complaints Mongoose database model. Define keys for tracking category, description text, citizen creator reference, current status (e.g. Open, In Progress, Resolved), coordinates, and file attachments URI strings. Enforce strict Mongoose input validators for data fields.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords:
      'mongoose complaint schema, geolocation parameters, image path string, input validations',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-006': {
    desc: 'Create Mongoose schema tracking complaints assignments history. Add attributes for complaint ID reference, assigned employee reference, manager dispatcher reference, assign date, and status tags. Add pre-save validations confirming target assignee is a valid staff user.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords:
      'mongoose assignment schema, staff reference checking, ticket lifecycle tracker, validation rule',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-007': {
    desc: 'Design database schema tracking official file transfers and tracking steps. Save metadata containing tracking number, source department ID, target department ID, transfer date, and status timeline array. Implement validation rules checking timeline sequencing.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords:
      'mongoose file tracking schema, workflow timeline array, tracking code index, metadata config',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-008': {
    desc: 'Develop Mongoose schema mapping citizen feedback entries. Add columns for complaint ID link, rating metrics (1 to 5 scale), description feedback, and submission date. Include schema validators verifying feedback matches closed complaint IDs and ratings scale range.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords:
      'mongoose feedback schema, rating verification range, ticket integrity check, constraint validation',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-009': {
    desc: 'Create Mongoose schema matching staff attendance logs. Add attributes for employee ID reference, punch in time, punch out time, GPS coordinates, verification type (e.g. Biometric), and user biometric consent flag. Ensure validators checks checkin date formats.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords:
      'mongoose attendance schema, biometric log keys, geolocation validations, consent tracker',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-010': {
    desc: 'Build database schemas mapping system notification alerts. Capture information including user ID target reference, notification title, body message text, read status boolean, and dispatch channel (e.g. In-App). Add index strategies optimized for fetching unread messages.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords:
      'mongoose notification schema, read status boolean, user notification indices, query limits',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-011': {
    desc: 'Create append-only Mongoose schema for transaction events audit logs. Save actions logs containing operator user reference, API endpoint accessed, timestamp, event parameters payload, and client IP addresses. Apply strict pre-save hooks to prevent log updates or deletions.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords:
      'mongoose audit log schema, append only controls, immutable collection hooks, activity log',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-012': {
    desc: 'Design database schema tracking chatbot conversation histories. Structure fields containing citizen session ID, query message, AI response text, tokens consumed counts, and RAG document source paths array. Set up time-to-live index strategies (TTL) for session records.',
    tech: 'Node.js, MongoDB, Mongoose',
    keywords:
      'mongoose chat history model, chatbot session logs, token metric keys, TTL database indexes',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-013': {
    desc: 'Deploy custom database indexing rules on Mongoose schemas to optimize queries. Set unique compound indexes for user emails, tracking code IDs, and geospatial indexes for coordinates in complaints and attendance. Verify index coverage reports using mongo dashboard CLI tool.',
    tech: 'MongoDB, Mongoose Indexing CLI',
    keywords:
      'unique database indexes, geospatial coordinate indexing, explain query plans, database tuning',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-014': {
    desc: 'Enforce Mongoose models relation controls and reference keys consistency check. Configure reference checks using pre-save validation hooks on employee ID references and complaint ID fields. Add custom error responses output when target foreign records are missing.',
    tech: 'Node.js, MongoDB, Mongoose Schema',
    keywords:
      'foreign key reference checks, schema validation rules, data relational consistency, database design',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-015': {
    desc: 'Write custom Mongoose validators evaluating data entry integrity. Add regex formats checks on mobile numbers, validation checks on email domains, and coordinates checks for municipal geographic bounds. Test validations triggers using model mock entries.',
    tech: 'Node.js, MongoDB, Mongoose Validator',
    keywords:
      'mongoose regex validators, geolocation coordinate validator, input sanity checker, error handler',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },
  'TASK-DB-016': {
    desc: 'Optimize database queries through Mongoose models tuning. Conduct explain query plans check on major dashboard routes. Confirm queries avoid collection scanning by using covered index keys. Restructure aggregation pipelines to speed up dashboard calculations.',
    tech: 'MongoDB, Mongoose Optimizer CLI',
    keywords:
      'explain collection scan checks, covered query matching, aggregation pipeline tuning, indexes debug',
    ref: 'docs/04-Database-Architecture/SmartCity_DB_Architecture_v4.0_AI_Extension_Updated.md',
  },

  // BACKEND TASKS (20 tasks)
  'TASK-BE-001': {
    desc: 'Scaffold and initialize Express.js web server inside the backend folder. Apply secure default middleware using Helmet, standard CORS origins controls rules, and JSON request parsers. Configure logs outputs and error handling hooks. Verify server responds successfully.',
    tech: 'Node.js, Express.js, Helmet, CORS',
    keywords:
      'express scaffold setup, helmet secure middleware, CORS restrictions setup, routing base config',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-002': {
    desc: 'Code the Mongoose connection adapter script with auto-retry logics. Build robust error connection hooks reporting database disconnection, connection failure, or credential limits alerts. Establish connection pool size controls to limit database loads.',
    tech: 'Node.js, Mongoose, MongoDB Atlas',
    keywords:
      'mongoose connection adapter, auto reconnect loop, db credentials hook, collection pool size',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-003': {
    desc: 'Write environment configuration loader module validating environment keys on startup. Verify the existence of required properties like MONGO_URI, JWT_SECRET, and PORT. Raise startup crash exceptions if mandatory keys are missing in the configuration.',
    tech: 'Node.js, Config Validation',
    keywords:
      'environment variable checks, schema parser config, error crash loop, bootstrap validation',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-004': {
    desc: 'Build secure authentication APIs for user registration and user login in Express.js. Retrieve payload fields, execute validations check, and hash passwords using bcrypt algorithm (rounds >= 10). Return success or structured failure code payload.',
    tech: 'Node.js, Express, Bcrypt',
    keywords:
      'user registration api, express login route, bcrypt hashing config, user models lookup',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-005': {
    desc: 'Implement JWT token creation logic on successful logins. Generate signature payloads containing user ID, role, name, and department reference details. Define short access token expiration limits (e.g. 15 mins). Set up token verification helper middleware.',
    tech: 'Node.js, Express, JWT',
    keywords:
      'jwt signature token, token payload mapping, token expiry check, signature validation',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-006': {
    desc: 'Create secure refresh token APIs supporting token rotation schemes. Maintain active refresh tokens in a cookie transport with HTTPOnly, Secure, and SameSite tags. Verify token validation and rotate credentials on access token renewal requests.',
    tech: 'Node.js, Express, JWT, Cookie Parser',
    keywords:
      'refresh token api, secure cookie transport, token rotation logic, session refresh route',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-007': {
    desc: 'Write session logout controller revoke endpoint. Remove client refresh token credentials, delete session tracking documents, and clear token transport cookie fields. Confirm user cannot refresh validation tokens after logging out.',
    tech: 'Node.js, Express, Cookie Manager',
    keywords:
      'logout controller api, token cookie clearing, session delete route, express cookie clear',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-008': {
    desc: 'Build role-based access control (RBAC) middleware gating backend API endpoints. Match user role from JWT validation payload against resource paths permissions registry. Block unauthorized queries with JSON format access denied errors (403 Status).',
    tech: 'Node.js, Express, RBAC Logic',
    keywords:
      'rbac validation middleware, endpoint permission check, resource authorization, jwt token mapping',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-009': {
    desc: 'Write audit logging transaction controller monitoring critical route access. Hook action filters recording user ID, action method, target endpoint path, metadata, and timestamp details. Save records to audit_logs database collection.',
    tech: 'Node.js, Express, MongoDB',
    keywords:
      'database audit log, backend logger middleware, write transaction logs, security track',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-010': {
    desc: 'Create centralized Express error processing middleware to catch runtime exceptions. Restructure errors outputting uniform JSON schemas containing custom messages and status codes. Mask inner diagnostics stack details on production environments.',
    tech: 'Node.js, Express Middleware',
    keywords:
      'express error middleware, centralized error formats, stack trace mask, custom exception mapper',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-011': {
    desc: 'Deploy payload format validation middleware using Express validation libraries (e.g. Joi, Zod). Build input schemas checking parameter data styles for logins, registrations, and complaints creation. Strip out unrecognized fields.',
    tech: 'Node.js, Express, Joi/Zod',
    keywords:
      'request body validation, request schema filters, middleware request parser, input filter',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-012': {
    desc: 'Build grievance complaint CRUD endpoints. Code controllers validating citizen login context, storing geographic coordinates, attachment references, and routing ticket assign processes. Enforce resource ownership checks during update operations.',
    tech: 'Node.js, Express, Mongoose',
    keywords:
      'complaint endpoints crud, coordinates geo parsing, file upload paths, updates validation',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-013': {
    desc: 'Implement tracking progress lookup endpoints. Return public workflow details, status history timeline, and current assigning department. Suppress admin remarks or security audit notes from being visible in public dashboard views.',
    tech: 'Node.js, Express, Mongoose',
    keywords:
      'public tracking api, file status details, workflow tracker controller, privacy mask filter',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-014': {
    desc: 'Develop feedback rating collection endpoints. Validate if complaint ticket status is Completed before allowing satisfaction ratings (1 to 5) to be submitted. Prevent multiple feedback submissions on the same complaint ID.',
    tech: 'Node.js, Express, Mongoose',
    keywords:
      'feedback rating router, compliance status validation, complaints database lock, double rating block',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-015': {
    desc: 'Write staff attendance log router APIs. Create routes punching staff check-in times and coordinates logs. Gated routes verifying active face validation checks result and explicit user biometric consent flags before updating database records.',
    tech: 'Node.js, Express, Mongoose',
    keywords:
      'attendance tracking controller, punch checkin route, biometric consent checker, coordinates validations',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-016': {
    desc: 'Develop administrative configuration panel routes. Create endpoints modifying SLA ranges, managing departments list, allocating roles, and updating system configurations. Restrict access strictly to verified Admin credentials.',
    tech: 'Node.js, Express, RBAC',
    keywords:
      'admin configuration routes, SLA settings update, database config variables, role allocation panel',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-017': {
    desc: 'Deploy notification APIs enabling alert registration and alerts querying. Support creation of notifications records, dispatching unread updates alerts to targeted user dashboards, and updating read status on reading events.',
    tech: 'Node.js, Express, Mongoose',
    keywords:
      'notification alert router, user notification logs, alerts read status, in-app notification',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-018': {
    desc: 'Apply rate limiting security middleware (e.g. express-rate-limit) on authentication and feedback API routes. Set maximum request thresholds within specific IP time frames to block database search brute force attempts.',
    tech: 'Node.js, Express, Express Rate Limit',
    keywords:
      'express rate limit, brute force protection, authentication route limit, api rate policy',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-019': {
    desc: 'Write system diagnostic health check route. Create endpoint returning status checks details for active MongoDB connectivity, memory limits details, and uptime metric logs. Mask system paths from unauthorized requests.',
    tech: 'Node.js, Express, System CLI',
    keywords:
      'health check endpoint, mongoose database validation, system metrics logs, diagnostics route',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },
  'TASK-BE-020': {
    desc: 'Create API documentation pages using Swagger UI or OpenAPI specs. Write descriptive request bodies, response models, validation error formats, and required auth tokens scopes descriptions. Expose doc pages at /api-docs endpoint.',
    tech: 'Node.js, Express, Swagger, OpenAPI',
    keywords:
      'swagger ui integration, openapi schema files, api endpoints docs, backend router spec',
    ref: 'docs/05-API-Architecture/API_Architecture_DB_Aligned_v1.0.md',
  },

  // FRONTEND TASKS (24 tasks)
  'TASK-FE-001': {
    desc: 'Scaffold React frontend workspace template using Vite build tool. Establish dependency packages list containing Axios, React Router, TailwindCSS, and ESLint configs. Validate dev server initializes cleanly and page builds error-free.',
    tech: 'Node.js, Vite, React, npm',
    keywords: 'vite react setup, frontend workspace config, client dependency install, build setup',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-002': {
    desc: 'Install and configure TailwindCSS framework inside client workspace. Configure custom project theme parameters including HSL color palette mappings, fonts, and responsive grid values in tailwind.config.js. Test styling inputs.',
    tech: 'TailwindCSS, PostCSS, Autoprefixer',
    keywords:
      'tailwindcss client setup, custom color layouts, theme palette map, stylesheet utility',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-003': {
    desc: 'Organize folder structure layout for frontend modules. Set up pages, components, assets, contexts, hooks, services, and utils subfolders inside src folder. Deploy file organization criteria guidelines file for developer teams.',
    tech: 'Vite, React Workspace',
    keywords:
      'folder architecture layout, files layout organization, clean code pattern, modular structure',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-004': {
    desc: 'Build global application layout components including responsive sidebars, main navigation headers, and content containers. Ensure menus collapse on mobile viewports. Integrate user profile card previews and notifications indicator buttons.',
    tech: 'React, TailwindCSS, Heroicons',
    keywords:
      'global sidebar component, header navbar layouts, mobile drawer controls, desktop layout shell',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-005': {
    desc: 'Integrate React Router library setup. Define paths mappings for public citizen homepages, auth views, dashboards, complaints management panels, tracking search views, and settings. Build fallback routes catching unmatched paths.',
    tech: 'React, React Router DOM',
    keywords:
      'react router client, path route definitions, route routing manager, browser paths map',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-006': {
    desc: 'Create reusable React route guard components that prevent unauthorized users from accessing protected pages. Verify JWT token validity and user roles before rendering pages. Redirect unauthenticated users to the login page and unauthorized users to an access denied page. Integrate with React Router and centralized authentication context/store. Test by attempting direct URL access to restricted routes.',
    tech: 'React, React Router, Context API',
    keywords:
      'client route guard, role check component, guest redirect route, route permission gate',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-007': {
    desc: 'Develop Axios API client service setup. Configure base URL matching backend gateway, timeout limits, and default request headers definitions. Include error processing logic capturing standard network errors or request cancellations.',
    tech: 'Node.js, Axios Client, Express API',
    keywords:
      'axios client config, api routing base, endpoint timeout handler, network connection check',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-008': {
    desc: 'Implement Axios interceptors injecting JWT validation credentials automatically. Write response interceptors monitoring 401 Unauthorized codes to trigger token refresh sequences or clean up local storage caches and force login views.',
    tech: 'Node.js, Axios Interceptors, JWT Token',
    keywords:
      'jwt request interceptor, token refresh hooks, axios token injector, unauthorized handler',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-009': {
    desc: 'Create responsive login and citizen registration form interfaces. Integrate client-side formatting checks for passwords strength, mobile numbers regex structures, and email formats. Validate error feedback alerts display on validation failures.',
    tech: 'React, TailwindCSS, Form State',
    keywords:
      'login layout ui, citizen registration form, input validation bounds, input error displays',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-010': {
    desc: 'Develop the main Citizen Dashboard panel view. Design summary statistics widgets showcasing total complaints logged, active tickets count, and completed complaints. Include filter selectors filtering complaints list details.',
    tech: 'React, TailwindCSS, Lucide Icons',
    keywords:
      'citizen portal interface, dashboard tracking view, tickets status table, citizen statistics widgets',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-011': {
    desc: 'Build complaint intake form dashboard view. Support file attachments uploads, geographic coordinates input using maps plugins or geolocation browsers, category select input, and description text fields. Validate constraints checks.',
    tech: 'React, TailwindCSS, Geolocation API',
    keywords:
      'complaint submission layout, file attach validation, coordinates browser picker, form submittals',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-012': {
    desc: 'Implement File Tracking UI page. Design search tracking number input fields routing search events. Render visual progress timeline components displaying historic departments processing steps, current locations, and signatures.',
    tech: 'React, TailwindCSS, CSS Transition',
    keywords:
      'file tracking timeline, search status lookup, processing steps progress, tracking stepper ui',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-013': {
    desc: 'Design grievance feedback ratings dashboard card. Create interactive rating stars icons enabling feedback ratings (1 to 5 scale), text feedback fields, and locking features restricting feedback updates on submission.',
    tech: 'React, TailwindCSS, React Icons',
    keywords:
      'grievance feedback card, ratings scale component, feedback comment panel, ticket locking UI',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-014': {
    desc: 'Develop the Staff Dashboard workspace panel. Design interactive Kanban board tracking lists categorized by grievance status. Enable task state update buttons, ticket assign selectors, and search filters.',
    tech: 'React, TailwindCSS, Kanban Utilities',
    keywords:
      'staff console layout, kanban board workspace, task status column, employee ticket picker',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-015': {
    desc: 'Build staff biometric attendance punch interface. Design webcam feed console overlaying a scanner guidelines box. Include consent tick flags, punch triggers, geolocation fetching steps, and liveness check indicators.',
    tech: 'React, HTML5 Camera API, CSS Canvas',
    keywords:
      'webcam attendance interface, checkin punch layout, biometric consent tick, camera stream box',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-016': {
    desc: 'Create chatbot workspace overlays container layout. Build conversational message thread logs panel, user chat prompt text area, sending indicators, source reference document tags, and clear chat controls.',
    tech: 'React, TailwindCSS, Framer Motion',
    keywords: 'ai chatbot popup, messaging history container, user prompts text, gemini chat panel',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-017': {
    desc: 'Develop Admin Dashboard settings panels views. Support parameters data tables configuration, SLA threshold sliders controls, user roles list manager, department creation, and configuration values update fields.',
    tech: 'React, TailwindCSS, SLA Controller',
    keywords:
      'admin configuration panel, sla thresholds slider, user roles list, departments manager table',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-018': {
    desc: 'Build real-time notification alert toasts overlays elements. Create message logs dropdown panels in top navigation menus displaying unread alert summaries. Integrate marked read action triggers.',
    tech: 'React, TailwindCSS, Portal hooks',
    keywords:
      'notification toast popup, header dropdown console, alerts log template, notification status toggle',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-019': {
    desc: 'Write reusable UI components components library. Construct unified designs for inputs, custom buttons, modal dialog containers, loader spinners, feedback alert boxes, and dropdown select fields, matching styling criteria.',
    tech: 'React, TailwindCSS, Modular CSS',
    keywords:
      'reusable input components, customized button designs, modal popup wrapper, common asset styles',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-020': {
    desc: 'Apply layout fixes addressing responsiveness issues on mobile views. Audit fluid grids designs, flex configurations, image parameters, and responsive breakpoints adjustments. Test sidebar layouts collapsed rules.',
    tech: 'CSS, Flexbox, Tailwind Media Queries',
    keywords:
      'mobile responsive debugging, responsive flex settings, mobile navigation menu, layout breaks',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-021': {
    desc: 'Map and connect frontend services controllers to backend Express routes endpoints. Connect logins processes, complaint forms submittals, trackers query routing, and chat stream endpoints. Verify payloads data mapping.',
    tech: 'React, Axios, REST API Integration',
    keywords:
      'integrate api connections, react page request, backend endpoint mapping, rest query controller',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-022': {
    desc: 'Write custom React error boundary wrappers capturing rendering exceptions. Prevent app crash locks by displaying clean recovery warnings templates. Exclude core developer debug logs stack details from user-facing screens.',
    tech: 'React Component SDK',
    keywords:
      'react error boundary, react rendering recovery, application fallback layout, crash warning screens',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-023': {
    desc: 'Build visual skeleton loader components mimicking page layouts during loading events. Design loading indicators representing statistics lists, text blocks, table rows, and dashboard blocks to improve perceived speeds.',
    tech: 'React, TailwindCSS, Shimmer Animation',
    keywords:
      'skeleton card loaders, page loading layout, shimmer CSS animations, data fetching wrapper',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FE-024': {
    desc: 'Conduct final user interface tests runs check. Perform compatibility checks on desktop and mobile web layout styles, test user flow actions sequences, verify accessibility elements, and generate frontend testing sign-off logs.',
    tech: 'React, DevTools, Usability Audit CLI',
    keywords:
      'user interface testing, mobile viewport simulation, client navigation checks, final design audit',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },

  // AI TASKS (9 tasks)
  'TASK-AI-001': {
    desc: 'Integrate Google Gemini API into the AI service layer. Create a dedicated service responsible for receiving prompts, invoking Gemini, and returning formatted responses. Store API keys securely using environment variables. Implement error handling, rate limiting, and response logging. Test responses using sample municipal queries.',
    tech: 'Node.js, Google Gemini SDK, Dotenv',
    keywords:
      'gemini api integration, ai service gateway, developer api keys, request parameters check',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-AI-002': {
    desc: 'Write prompt engineering system parameters constraining AI output answers within authorized municipal domains files contents. Construct grounding checks rules preventing hallucinated data entries in chatbot responses.',
    tech: 'Google Gemini SDK, Prompt Design',
    keywords:
      'prompt system instructions, gemini grounding prompts, RAG system prompt, prompt templates design',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-AI-003': {
    desc: 'Develop chatbot backend router Express endpoints. Implement controllers verifying active user context, loading session records, proxying queries to Gemini model, parsing responses, and saving history records in database.',
    tech: 'Node.js, Express, Mongoose',
    keywords:
      'chat api endpoint, express session router, chatbot request handlers, conversation log pipeline',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-AI-004': {
    desc: 'Deploy document processing OCR services parsing attached files. Extract textual data from pdf documents or images formats. Configure secure sandbox processes settings running file parsing tasks safely.',
    tech: 'Node.js, Tesseract.js / Cloud Vision API, Sandbox',
    keywords: 'ocr text scanner, text parser service, pdf parsing wrapper, document text search',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-AI-005': {
    desc: 'Create text checks validating parser outputs correctness. Verify parsed tax receipts, property licenses or application documents data patterns match registration credentials. Design matching tolerance check algorithms.',
    tech: 'Node.js, Regex Data Extraction',
    keywords:
      'document validation algorithm, regex pattern matching, parsed metadata check, content validation',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-AI-006': {
    desc: 'Develop python face comparisons script calculating landmark indices. Load image inputs arrays, extract coordinate landmark parameters, compare distances ratios, and output matching scores metrics. Optimize calculations speeds.',
    tech: 'Python, Face Recognition, NumPy',
    keywords:
      'face landmarks extraction, distance matrix score, python image processing, biometric model matching',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-AI-007': {
    desc: 'Build biometrics validation connection service joining Python script outputs with attendance APIs endpoints. Validate matching scores against strict FAR/FRR threshold targets to determine staff verification status.',
    tech: 'Node.js, Python Shell, Express Gateway',
    keywords:
      'attendance punch service, python backend shell, biometric threshold config, checkin connector',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-AI-008': {
    desc: 'Conduct accuracy check runs for face verification engines. Document False Acceptance Rate (FAR) and False Rejection Rate (FRR) levels details under varying webcam light conditions. Generate accuracy analysis checklists.',
    tech: 'Python, Quality Audit Scripts',
    keywords:
      'far frr analysis, camera light test, biometric accuracy audit, validation summary log',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-AI-009': {
    desc: 'Optimize Gemini model prompt settings reducing latency responses intervals. Refine context sizes, reduce document chunks payload lengths, and configure prompt caching options to speed up chatbot loading times.',
    tech: 'Google Gemini API, RAG Pipeline Tuning',
    keywords:
      'chatbot response speed, context token caching, prompt length optimization, response latency reduction',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },

  // FACE RECOGNITION TASKS (9 tasks)
  'TASK-FR-001': {
    desc: 'Assemble calibration test datasets containing face snapshots. Restructure datasets files tracking varying head tilts, diverse lighting parameters, and camera resolution configurations. Ensure no images are added to source control.',
    tech: 'Python, File System CLI, Git',
    keywords:
      'calibrate dataset configuration, test image assets, face snapshots array, git exclude rules',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-FR-002': {
    desc: 'Refine face recognition core script checking landmarks distance calculations logic. Test script calculations against calibration dataset assets, calibrate thresholds margins, and include basic anti-spoofing tests.',
    tech: 'Python, OpenCV, NumPy',
    keywords:
      'refine biometric prototype, face verification thresholds, anti spoof validation, distance calculations',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-FR-003': {
    desc: 'Test browser camera integration across Chrome, Edge, and Firefox. Verify permission requests, webcam initialization, image capture quality, and error handling. Ensure fallback behavior works when camera access is denied. Document issues and report compatibility problems.',
    tech: 'HTML5 Camera API, JS Browser Test',
    keywords:
      'webcam browser permissions, camera initialize check, browser support limits, stream errors log',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-FR-004': {
    desc: 'Verify the biometrics attendance workflow logic connection. Confirm webcam snapshot events trigger coordinates fetching sequences, pass payload details to Python shell scripts, and record success checkins in database.',
    tech: 'Node.js, Express, Python Integration',
    keywords:
      'biometric checkin verify, camera punch test, workflow integration check, attendance logger',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-FR-005': {
    desc: 'Test biometric validation engine resistance against spoof attacks. Verify verification logs reject printed face photos, mock video feeds, and digital face captures. Document FAR metrics under attack conditions.',
    tech: 'Python, Biometric Audit Tools',
    keywords:
      'spoofing attack tests, print photo reject, biometric vulnerability check, validation thresholds log',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-FR-006': {
    desc: 'Validate webcam permissions and feed loading functions across Safari, Chrome, Firefox, and Edge. Audit camera initialization exceptions, verify fallbacks setups, and save cross-browser checks logs.',
    tech: 'Browser DevTools, JavaScript API',
    keywords:
      'cross browser camera, webcam compatibility table, browser camera exception, permission test log',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-FR-007': {
    desc: 'Review biometric scanner overlay UI box alignment styles. Confirm responsive designs are correctly placed on mobile screen sizes, web feed scaling runs cleanly, and liveness guidelines indicator prompts show clearly.',
    tech: 'React, CSS Flexbox, TailwindCSS',
    keywords:
      'biometric overlay layout, camera frame wrapper, mobile webcam responsive, UI layout reviews',
    ref: 'docs/06-UI-Architecture/Frontend_Architecture_Final_Merged_Updated.pdf',
  },
  'TASK-FR-008': {
    desc: 'Run end-to-end integration tests on biometrics attendance routes. Verify verification punches trigger updates across admin config panels, update dashboard summaries, and log transaction details in audit collections.',
    tech: 'Node.js, Express, E2E Test Suite',
    keywords:
      'biometric end to end, attendance integration audit, transaction updates validation, db updates trace',
    ref: 'docs/07-AI-Architecture/AI_Architecture_Final_Submission_Updated.pdf',
  },
  'TASK-FR-009': {
    desc: 'Verify webcam consent check validation behavior. Verify attendance routes block punch-in requests and output error alerts if user has not ticked the consent checklist options box before starting scans.',
    tech: 'Node.js, Express, React state',
    keywords:
      'biometric consent validations, webcam consent check, block scanner logic, consent gate test',
    ref: 'docs/03-Security-Architecture/Security_Access_Control_Architecture_Document.md',
  },

  // DOCUMENTATION & QA TASKS (9 tasks)
  'TASK-QA-001': {
    desc: 'Develop the Requirement Traceability Matrix (RTM) document. Map SRS features targets to database schemas layouts, api route controllers, and frontend pages. Verify complete specification coverage in active worksheets.',
    tech: 'Markdown, Excel Workspace',
    keywords:
      'rtm document structure, srs traceability mapping, specification validation index, quality metrics',
    ref: 'docs/01-SRS/SRS_AI_Powered_Municipality_Management_Portal_Updated.docx',
  },
  'TASK-QA-002': {
    desc: 'Write manual testing scripts covering citizen registrations, complaints logging lifecycle, file tracking number search queries, and biometric attendance logs. Detail expected results formats for testers.',
    tech: 'Markdown, QA Test Sheets',
    keywords:
      'manual test script, user action validations, expected results table, test case layout',
    ref: 'docs/01-SRS/SRS_AI_Powered_Municipality_Management_Portal_Updated.docx',
  },
  'TASK-QA-003': {
    desc: 'Design User Acceptance Testing (UAT) checklists sheets. Structure validation fields verifying citizen dashboard features, staff portal Kanban controls, admin parameter sliders, and chatbot conversation accuracy.',
    tech: 'Excel Workbooks, Markdown',
    keywords:
      'uat checklist templates, user acceptance verification, dashboard validation logs, client signup signoff',
    ref: 'docs/01-SRS/SRS_AI_Powered_Municipality_Management_Portal_Updated.docx',
  },
  'TASK-QA-004': {
    desc: 'Review and compile project documents package. Check structure mappings, audit pending files registries, confirm version logs consistency, and prepare the implementation-readiness compliance reports summaries.',
    tech: 'Markdown, Document Tools',
    keywords:
      'project documents compile, architecture review, compliance check report, version audit logs',
    ref: 'docs/01-SRS/SRS_AI_Powered_Municipality_Management_Portal_Updated.docx',
  },
  'TASK-QA-005': {
    desc: 'Execute security checklist verification audits. Check configurations ensuring no plaintext variables are committed in source code, review password hashes logic settings, check JWT configurations, and compile signed safety report.',
    tech: 'Markdown, Security Review Tools',
    keywords:
      'security check audit, password hashing config, jwt validation gate, signoff compliance tracker',
    ref: 'docs/03-Security-Architecture/Security_Access_Control_Architecture_Document.md',
  },
  'TASK-QA-006': {
    desc: 'Synthesize QA test results summaries. Detail total test scenarios ran, report overall success rates metrics, document unresolved bug registries, and write the quality assurance results checklist reports.',
    tech: 'Markdown, Excel Graphs',
    keywords: 'qa results dashboard, test pass statistics, open bug tracker, test signoff document',
    ref: 'docs/01-SRS/SRS_AI_Powered_Municipality_Management_Portal_Updated.docx',
  },
  'TASK-QA-007': {
    desc: 'Confirm developer bug corrections details. Test Axios interceptors retry behaviors under expired tokens conditions, verify geo constraints on complaint submissions, check prompt bounds on chatbots, and update bug status tags.',
    tech: 'Postman, Axios Debugger, Git',
    keywords: 'verify bug fix, query parameters debug, token retry loop, verify status update',
    ref: 'docs/01-SRS/SRS_AI_Powered_Municipality_Management_Portal_Updated.docx',
  },
  'TASK-QA-008': {
    desc: 'Format developer deployment documentation guidelines. Detail backend hosting settings, database server coordinates, database users privileges profiles, and create repository navigation maps for developers.',
    tech: 'Markdown, Documentation CLI',
    keywords:
      'developer setup instructions, backend deploy guide, database settings doc, folder structures map',
    ref: 'docs/01-SRS/SRS_AI_Powered_Municipality_Management_Portal_Updated.docx',
  },
  'TASK-QA-009': {
    desc: 'Prepare the official municipality handoff procedures manuals. Detail roles credentials, system handover items logs, administration credentials rotation steps, and administrative contact channels guides sheets.',
    tech: 'Markdown, Handover Packages',
    keywords:
      'municipality handoff guide, credential keys rotation, administrator logins audit, handover manuals template',
    ref: 'docs/09-Handover-Documents/ARCHITECTURE_FREEZE_v1.md',
  },
};
