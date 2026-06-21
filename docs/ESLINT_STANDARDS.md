# ESLint Standards

## Purpose

This document defines the static code analysis (linting) standards for the **Kottakkal Municipality** project. The main goals are to ensure code quality, prevent runtime exceptions, enforce consistent coding styles, and accelerate onboarding for developers working on the JavaScript/React/Node workspaces.

## Scope

These standards apply to all JavaScript (`.js`) and React/JSX (`.jsx`) source files within the workspace:

- **React Frontend Portal (`frontend/`)**
- **Node.js / Express Backend Engine (`backend/`)**
- **Root Utility Scripts**

This setup explicitly **excludes** Python AI services, databases, backups, and build directories.

## Frontend Rules

The frontend workspace leverages React/JSX. The following specific lint rules are enforced:

- **`react/jsx-uses-react`**: Prevents React from being marked as unused when using JSX.
- **`react/jsx-uses-vars`**: Prevents variables used in JSX from being incorrectly marked as unused.
- **`react-hooks/rules-of-hooks`**: Enforces the Rules of Hooks (only call Hooks at the top level, only call Hooks from React functions).
- **`react-hooks/exhaustive-deps`**: Warns when React Hook dependencies are missing or incorrect (Warning level).
- **`jsx-a11y/alt-text`**: Enforces that all HTML elements that require alternative text (e.g., `<img>`, `<area>`, `<input type="image">`, etc.) have meaningful alt text (Warning level).

## Backend Rules

The backend workspace uses a Node.js/Express MVC/service-layer structure. The following specific rules are enforced:

- **`no-process-exit`**: Warns against using `process.exit()` directly in the code (Warning level) to prevent abrupt application shutdown in service layers.
- **`no-console`**: Warns on the use of `console` methods (Warning level). Logging should ideally utilize standardized logging utilities.

## Ignored Paths

The linting process is configured to ignore the following directories and files:

- `node_modules/` (and nested `node_modules/` folders)
- `dist/` and `build/` (production bundles)
- `coverage/` (unit/integration test reports)
- `.env` and `.env.*` (environment secrets)
- `ai-services/` (Python AI services)
- `temp_build/` (temporary/transient build files)

## Developer Commands

Run these commands from the repository root:

- **Lint Entire Workspace**: `npm run lint`
- **Lint Frontend Workspace Only**: `npm run lint:frontend`
- **Lint Backend Workspace Only**: `npm run lint:backend`

To run linting directly within workspace directories:

- **Frontend Lint**: `npm run lint --workspace=kottakkal-frontend`
- **Backend Lint**: `npm run lint --workspace=kottakkal-backend`

## Common Fixes

- **Unused Variables**: If a variable is declared but never used, remove it or prefix it with an underscore (e.g., `_unusedVar`) if required by signature definition.
- **Equality Checks (`eqeqeq`)**: Always use strict equality `===` or inequality `!==` instead of `==` or `!=`.
- **Variable Declarations (`no-var`, `prefer-const`)**: Avoid the `var` keyword. Use `const` by default, or `let` only if the variable's value needs to be reassigned.
- **Control Blocks (`curly`)**: Ensure that all control statements (`if`, `else`, `for`, `while`, `do`) use curly braces `{}` even for single-line statements.

## Rules Not Covered

- **Formatting Rules**: Code formatting (spaces, indentation, quotes) is delegated to **Prettier** (using configuration specified in [.prettierrc](file:///d:/Adhi/kottakkal/.prettierrc)) to avoid style conflicts.
- **Python AI Services**: Linting for Python code is handled separately by standard Python linters (e.g., `flake8` or `black`) and is not covered by this ESLint configuration.

## Future Improvements

- **CI/CD Integration**: Integrate the `npm run lint` check as a pre-commit hook (e.g., using `husky` and `lint-staged`) or as a blocking check in the GitHub Actions build pipeline.
- **TypeScript Transition**: If the codebase transitions to TypeScript, migrate the configuration to use `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`.
