# Branch Setup Guide

## Purpose

The purpose of this guide is to formalize, verify, and establish branch governance for the Kottakkal Municipality project repository. This guide defines active roadmap branches, pull request paths, reviewer ownership mapping, branch protection standards, status checks, and developer push permissions.

---

## Active Branches

The following branches exist in the repository (both locally and tracked on GitHub):

* `main`: Stable release and production branch.
* `develop`: Integration and staging branch for team development.
* `feature/frontend`: Frontend/UI implementation.
* `feature/backend`: Backend, API, and database implementation.
* `feature/ai`: AI chatbot, OCR, face recognition, and computer vision implementation.
* *Utility / Contextual Branches*: `feature/api`, `feature/database`, `feature/database-scripts`, `feature/security`, `feature/srs`, `feature/ui`.

---

## Branch Creation Status

All core required branches (`main`, `develop`, `feature/frontend`, `feature/backend`, `feature/ai`) were successfully audited and found to exist locally and remotely on `origin` and `upstream`.
* **Missing Branches Created**: **None** (All branches were pre-existing and active).
* No branches were deleted, forced, or recreated to ensure repository history remains intact.

---

## Pull Request Flow

To protect the production release and maintain integration quality, the project enforces a strict hierarchical merge flow:

```text
feature/* → develop → main
```

### Flow Rules
1. **No Direct Commits**: Direct commits or pushes to `main` and `develop` are strictly prohibited.
2. **Feature Branch Separation**: All development must occur in dedicated feature branches (`feature/frontend`, `feature/backend`, `feature/ai`).
3. **Target branch for Feature Work**: Feature branches must merge into `develop` through a pull request. Direct merges to `main` are blocked.
4. **Target branch for Integration**: `develop` merges into `main` only after complete integration testing, quality checks, and product verification.
5. **No Force Pushing**: Rewriting history on shared remote branches via `git push --force` is forbidden.

---

## Review Ownership

Review assignments are mapped to designated technical owners based on project architecture roles.

### Team Roles Reference
* **Adithyan N**: Project Lead / Frontend Oversight / Security Review Lead / Final Integration Support.
* **Fadi Ahmed**: UI/Frontend Architecture Lead / Face Recognition & AI implementation Support.
* **Fathima Hana**: Database Architecture Lead / Database implementation Support.
* **Muhammad Sanish**: API Architecture Lead / Backend & API implementation Support.
* **Minha Palakkathodi**: SRS Architecture Lead / Documentation Consistency Reviewer.
* **Muhammed Sadik KT**: AI Architecture Lead / AI chatbot implementation Support.

### Review Mapping
* **`feature/frontend`**:
  * **Primary Reviewer**: Fadi Ahmed
  * **Secondary Reviewer/Lead**: Adithyan N
* **`feature/backend`**:
  * **Primary Reviewer**: Muhammad Sanish / Fathima Hana
  * **Secondary Reviewer/Lead**: Adithyan N
* **`feature/ai`**:
  * **Primary Reviewer**: Muhammed Sadik KT / Fadi Ahmed
  * **Secondary Reviewer/Lead**: Adithyan N
* **`develop` (Merging into `main`)**:
  * **Lead Reviewer**: Adithyan N (requires final check before promoting integration to production).
* **`docs/*` / Markdown Documentation**:
  * **Primary Reviewer**: Minha Palakkathodi

---

## Branch Protection Rules

Branch protection rules must be applied to ensure the integrity of key branches.

### Main Branch (`main`)
* **Require pull request before merging**: Enabled.
* **Required approvals**: Minimum of `1` approval before merging.
* **Dismiss stale approvals**: Enabled.
* **Require conversation resolution before merge**: Enabled (all comments/discussions must be resolved).
* **Block force pushes**: Enabled (prevents destructive updates).
* **Block branch deletion**: Enabled.
* **Restrict direct pushes**: Restrict write access to Repository Admins only.

### Integration Branch (`develop`)
* **Require pull request before merging**: Enabled.
* **Required approvals**: Minimum of `1` approval before merging.
* **Dismiss stale approvals**: Enabled.
* **Block force pushes**: Enabled.
* **Block branch deletion**: Enabled.
* **Require branch to be up to date before merge**: Enabled (ensures branch is up to date with `develop` target before merging).

### Feature Branches (`feature/*`)
* **Direct pushes**: Allowed for assigned developers to push commits directly to remote feature branches.
* **Merge restriction**: Direct merge from feature branches to `main` is blocked.
* **Force push**: Blocked unless explicitly approved by the DevOps/Project Lead.
* **Code review encouragement**: Team members should request review before merging any major chunks into `develop`.

---

## Status Checks

An audit of `.github/workflows/` indicates that there are currently **no active CI configuration workflow files** (only `.gitkeep` exists).
* **Current Status**: Automated status checks are **Pending** future CI setup.
* **Recommended Future Status Checks**:
  * `frontend build`: Verifies React/Vite builds correctly.
  * `backend lint`: Validates eslint rules pass for Node/Express.
  * `backend test`: Runs database and API route test suites.
  * `workspace install`: Validates clean installation of `npm` modules.
  * `secret scan`: Scans commits for keys or credentials.

---

## Developer Push Rules

To prevent branch pollution and accidental commits:
* **Frontend Developers** (Fadi Ahmed, etc.) must commit and push only to `feature/frontend` (or child features/bugs branching from it).
* **Backend & Database Developers** (Muhammad Sanish, Fathima Hana, etc.) must commit and push only to `feature/backend` (or child API/database branches).
* **AI Developers** (Muhammed Sadik KT, Fadi Ahmed, etc.) must commit and push only to `feature/ai` (or chatbot specific branches).
* **Direct Pushes Restricted**: No developer (including administrators, except in recovery emergencies) may push commits directly to `main` or `develop`.
* **Approvals**: Pull Requests must be approved by the designated technical owner listed in the [Review Ownership](#review-ownership) section.

---

## Manual GitHub Settings

Since branch protection rules cannot be applied programmatically from the local Git shell, the Repository Administrator must configure them on GitHub:

1. Open your repository on GitHub.
2. Click on the **Settings** tab.
3. Select **Branches** from the left-hand sidebar menu.
4. Click on **Add branch protection rule**.
5. Set **Branch name pattern** to `main`.
6. Enable **Require a pull request before merging** and ensure **Require approvals** is checked (count: 1).
7. Enable **Require conversation resolution before merging**.
8. Ensure **Do not allow bypassing the above settings** is checked if you want to enforce rules for administrators.
9. Click **Create** to save.
10. Click **Add branch protection rule** again.
11. Set **Branch name pattern** to `develop`.
12. Enable **Require a pull request before merging** and ensure **Require approvals** is checked (count: 1).
13. Enable **Require branches to be up to date before merging** once a CI workflow is added.
14. Click **Create** to save.

---

## Example Commands

### Developer Flow Checklist
```bash
# Step 1: Switch to develop branch and get latest changes
git checkout develop
git pull origin develop

# Step 2: Switch to feature branch and merge develop to catch up
git checkout feature/frontend
git merge develop

# Step 3: Stage code modifications
git add .

# Step 4: Create a conventional commit
git commit -m "feat: add frontend component layout"

# Step 5: Push commits to remote feature branch
git push origin feature/frontend
```

---

## Final Rules

* **Rogue Branches**: Do not create branch names outside the approved `feature/` namespaces without consultation.
* **Credential Safety**: Always verify changes using `git diff` before staging to ensure no secrets or environment values are accidentally checked in.
* **Bypass Policy**: Do not bypass branch restrictions under ordinary circumstances.
