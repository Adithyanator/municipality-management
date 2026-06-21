# Branching and Commit Rules

## Purpose

The purpose of this document is to establish a standardized Git workflow and branching strategy for the Kottakkal Municipality project repository. This guide ensures code quality, system stability, clear history, secure operations, and smooth team collaboration. All team members must adhere to these policies and guidelines.

---

## Branching Model

The project follows a structured branching model designed to isolate feature development, ensure proper integration testing, and maintain a pristine production state on the main branch.

```text
main
 └── develop
      ├── feature/frontend
      ├── feature/backend
      └── feature/ai
```

---

## Branch Responsibilities

### Stable Branch (`main`)
* **Role**: Serves as the official production/stable state of the project.
* **Rules**: 
  * Direct commits are strictly forbidden.
  * Only contains reviewed, approved, and integrated code.
  * Releases are tagged and deployed from this branch.

### Integration Branch (`develop`)
* **Role**: Serves as the primary integration and staging branch for the development team.
* **Rules**:
  * Direct commits are forbidden for feature work.
  * Receives merged pull requests from feature branches after code review.
  * Represents the latest working development build.

### Feature Branches (`feature/*`)
* **Role**: Dedicated branches for implementing specific project components.
* **Branches**:
  * `feature/frontend`: Frontend application, UI/UX components, styles, views, and client-side integration.
  * `feature/backend`: Backend servers, databases, API routes, security middleware, and data models.
  * `feature/ai`: AI-related services, chatbot development, OCR, face recognition, and computer vision models.
* **Rules**:
  * Must branch directly off of `develop`.
  * Merged into `develop` only via Pull Requests and code reviews.

---

## Developer Workflow

To maintain sync with the main project and prevent merge conflicts, developers must follow these routine cycles:

1. Always pull the latest integration state from `develop` before starting work.
2. Regularly merge `develop` into your active feature branch to resolve conflicts early.
3. Commit using conventional prefixes and push changes to the corresponding remote feature branch.
4. Submit a Pull Request to merge the feature branch into `develop`.

---

## Commit Message Format

We enforce the Conventional Commits specification to keep a clean, readable, and machine-parsable commit history.

### Format

```text
<type>: <description>
```

### Allowed Prefixes

* `feat`: A new feature or capability.
* `fix`: A bug fix or correction.
* `docs`: Documentation updates, wiki changes, or markdown files.
* `style`: Code formatting adjustments (whitespace, formatting, missing semi-colons) that do not affect code behavior.
* `refactor`: Code restructurings, optimizations, or cleanups that neither fix bugs nor add features.
* `test`: Adding missing tests or refactoring existing test cases.
* `chore`: Build tasks, tooling changes, dependency updates, or repository maintenance.
* `security`: Enhancements to authorization, authentication, vulnerability fixes, or dependency patching.
* `config`: Modifying configuration settings, environments, or properties.
* `infra`: Infrastructure-related changes, deployment setups, Docker, or Git workflow rules.

### Valid Examples

* `feat: add citizen complaint form layout`
* `fix: correct backend route validation`
* `docs: add API workflow notes`
* `infra: setup repository branching rules`

### Forbidden Commit Messages
Vague, ambiguous, or uninformative commit messages will be rejected:
* `git commit -m "changes"` (uninformative)
* `git commit -m "update"` (vague)
* `git commit -m "final"` (ambiguous)
* `git commit -m "bug fixed"` (lacks prefix and details)

---

## Pull Request Rules

All changes must go through the Pull Request (PR) workflow on GitHub.

1. **No Direct Commits**: Direct commits or pushes to `main` and `develop` are strictly prohibited.
2. **No Direct Feature Work on Main**: All work must originate from dedicated feature branches.
3. **Target Branching**: Feature branches must target `develop`. `develop` will target `main` only after full integration verification.
4. **Mandatory Reviews**: Changes to core system architecture, security modules, databases, and master documentation require review and sign-off by a senior team member or technical lead.
5. **Secrets & Safe Practices**: Secrets, API keys, `.env` files, production database logs, local IDE configurations, and backups must never be committed.

### Mandatory PR Template
Every Pull Request template must contain:
* **Task ID**: The associated project task reference (e.g., `TASK-INF-002`).
* **Summary of Changes**: High-level explanation of the implementation details.
* **Files Changed**: List of key directories/files modified.
* **Testing Done**: Evidence of testing (e.g., unit test results, manual flow verifications).
* **Screenshots/Videos**: Visual confirmation if UI/UX layouts were modified.
* **Risks or Pending Items**: Known issues, security implications, or outstanding tasks.

---

## Merge Criteria

A Pull Request is eligible to be merged into `develop` or `main` if and only if:

1. **Successful Build**: The branch passes all build steps and automated test runners.
2. **No Secrets Included**: The change is vetted to ensure no keys, credentials, or `.env` files are committed.
3. **No Unrelated Files**: The PR does not contain accidental modifications to configuration files or codebases outside the scope of the task.
4. **Up to Date**: The branch is fully merged or rebased with the current head of the target branch (`develop`).
5. **Conventional Commits**: Every commit message in the PR history adheres to the Conventional Commits format.
6. **Reviewer Approval**: At least one formal approval from an assigned reviewer or maintainer.
7. **Deliverable Completion**: The specific task goals outlined in the kanban or task ticket are fully addressed.
8. **Documentation Sync**: Any architectural, API, database, or workflow changes have their corresponding documentation updated within the same PR.

---

## Forbidden Actions

To prevent repo pollution, data leaks, and broken codebases, the following actions are forbidden:
* **Direct Pushing**: Never push directly to `main` or `develop`.
* **Force Pushing**: Force pushing (`git push -f` or `--force`) to shared branches is prohibited.
* **History Rewriting**: Rewriting commit history (interactive rebases, commit amending) on commits already pushed to shared branches is disallowed.
* **Committing Forbidden Assets**: Never check in node modules, dist folders, logs, environment variables, local machine configurations, or system caches.
* **Branch Deletion**: Deleting key system branches (`main`, `develop`, `feature/frontend`, `feature/backend`, `feature/ai`) is strictly prohibited.

---

## Example Git Commands

Here are the commands developers should execute for routine work:

### For Frontend Development Workflow
```bash
git checkout develop
git pull origin develop

git checkout feature/frontend
git merge develop

# ... perform frontend code adjustments ...
git add .
git commit -m "feat: describe the change"
git push origin feature/frontend
```

### For Backend Development Workflow
```bash
git checkout develop
git pull origin develop

git checkout feature/backend
git merge develop

# ... perform backend/database code adjustments ...
git add .
git commit -m "feat: describe backend change"
git push origin feature/backend
```

### For AI Development Workflow
```bash
git checkout develop
git pull origin develop

git checkout feature/ai
git merge develop

# ... perform AI model or chatbot code adjustments ...
git add .
git commit -m "feat: describe ai service change"
git push origin feature/ai
```

---

## Optional GitHub Setup Notes

Since GitHub settings are configured via the web UI and not local configuration files, the repository maintainer must enforce these policies in GitHub repository settings under **Settings > Branches > Branch protection rules**:

### For `main` and `develop` Branches
* **Require a pull request before merging**: Prevent direct pushes and require code integration through PRs.
* **Require approvals**: Enable "Require approvals" and set the minimum number of approvals to `1`.
* **Dismiss stale pull request approvals**: Dismiss approvals when new commits are pushed.
* **Require status checks to pass before merging**: If a continuous integration (CI) workflow is defined, require status checks (build/test verification) to pass.
* **Require signed commits**: Ensure all commits are digitally signed (PGP keys) to establish trust.
* **Restrict who can push to matching branches**: Limit direct write privileges only to repository administrators/owners.
* **Prevent force pushes**: Block force pushing (`git push --force`) to avoid code deletions.
* **Prevent branch deletion**: Lock the branch from deletion by users.

---

## Final Team Rules

* **Compliance**: Deviation from this branching strategy or commit rulebook will result in PR rejection and required remediation.
* **Vigilance**: If secrets are accidentally committed, notify the DevOps team immediately to perform credential revocation and use tools like `git-filter-repo` to clean history.
* **No Bypass**: Admin bypass permissions on GitHub branch protection should never be used except in emergency recovery scenarios approved by project leads.
