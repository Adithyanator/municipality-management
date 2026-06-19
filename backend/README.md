# Kottakkal Municipality Management - Backend

Node.js / Express backend core for the AI-Powered Smart Municipal Citizen Assistance and Staff Attendance Management System.

## Structure
- `src/routes`: versioned API endpoints routing request traffic.
- `src/middlewares`: Security, RBAC authentication, validation, and error log routing.
- `src/controllers`: Maps incoming requests to system service commands, avoiding direct database operations.
- `src/services`: Implements database operations and API communications.
- `src/models`: Mongoose database schemas.
- `src/validators`: Payload schema constraints.
- `src/config`: System credentials, environment configs, and connection hooks.
- `src/utils`: Common backend helpers.
- `src/jobs`: Async cleanup and backup runners.
- `src/constants`: Reusable constants.
