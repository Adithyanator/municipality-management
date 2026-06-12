# Branch Strategy

## Branches

- `main`: stable branch for reviewed and approved project state.
- `develop`: integration branch for team work.
- `feature/frontend`: frontend/UI implementation branch.
- `feature/backend`: backend/database implementation branch.
- `feature/ai`: AI chatbot and computer vision implementation branch.

## Rules

- Feature work must not be committed directly to `main`.
- Team members work in their assigned feature branch.
- Feature branches merge into `develop` through review.
- `develop` merges into `main` only after integration verification.
- Architecture, security, and documentation changes must be reviewed before merging.
- Secrets, environment files, generated backups, runtime logs, and local IDE files must not be committed.

## Recommended Flow

```bash
git checkout develop
git pull origin develop
git checkout feature/frontend
git merge develop
git add .
git commit -m "Describe the feature change"
git push origin feature/frontend
```

