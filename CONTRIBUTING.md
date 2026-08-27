# Contributing to Foodly

First off, thank you for taking the time to contribute! 🎉

This document describes how to set up a development environment and the process
for getting your changes merged. Please read it carefully before opening a pull
request.

## Table of contents

- [Code of Conduct](#code-of-conduct)
- [Getting started](#getting-started)
  - [Forking](#forking)
  - [Cloning](#cloning)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment setup](#environment-setup)
  - [Running locally](#running-locally)
- [Branching](#branching)
- [Making changes](#making-changes)
- [Testing](#testing)
- [Code quality](#code-quality)
- [Commit message format](#commit-message-format)
- [Pull requests](#pull-requests)
- [Code quality expectations](#code-quality-expectations)
- [Scope and limitations](#scope-and-limitations)

## Code of Conduct

By participating in this project you agree to abide by the
[Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and constructive in
all interactions.

## Getting started

### Forking

1. Click the **Fork** button at the top of
   [TheMehediHQ/Foodly](https://github.com/TheMehediHQ/Foodly) to create your
   own copy.
2. Clone your fork (see below), keeping the upstream repository in sync.

### Cloning

```bash
# Clone your fork of the repository
git clone https://github.com/<your-username>/Foodly.git
cd Foodly

# Add the upstream remote so you can keep your fork in sync
git remote add upstream https://github.com/TheMehediHQ/Foodly.git
git fetch upstream
```

### Prerequisites

- **Bun** `>=1.2` — [install instructions](https://bun.sh/docs/install/unix)
- **Node.js** `>=18`
- A **MongoDB Atlas** account and cluster (see [Database setup](#database-setup))
- A **Firebase** project (Authentication + a web app) — see
  [Environment setup](#environment-setup)

### Installation

Install all workspace dependencies from the repository root (single lockfile):

```bash
bun install
```

### Environment setup

Copy the example env files and fill in real values. **Never commit real `.env`
files** — they are git-ignored.

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Edit the copied files:

- `apps/api/.env` — set `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_CLUSTER`, and a strong
  `JWT_SECRET`.
- `apps/web/.env` — set your Firebase web app configuration and, optionally,
  `VITE_API_BASE_URL`.

### Running locally

```bash
bun run dev          # start both the API (5000) and web (5173) dev servers
bun run dev:web      # web only
bun run dev:api      # API only
```

The Vite dev server proxies `/api` to the API at `http://localhost:5000`, so
`VITE_API_BASE_URL=/api` works without extra configuration.

### Database setup

Foodly uses **MongoDB Atlas** (no migrations schema). Provide valid Atlas
credentials in `apps/api/.env`, whitelist your IP in the Atlas network access
settings, and the API connects lazily on the first request.

## Branching

Create a branch for each feature or fix from a current `main`:

```bash
git checkout main
git pull upstream main
git checkout -b <type>/<short-description>
```

Use a conventional branch name such as `feat/add-notes`, `fix/401-expiry`, or
`docs/readme-update`.

## Making changes

- Make changes that are focused and scoped to a single concern.
- Keep commits small and logically grouped.
- Do **not** commit `.env` files, build artifacts, or generated files.
- Add or update documentation whenever you change user-facing behavior or
  configuration.

## Testing

```bash
bun run test   # run the workspace test suite via Turborepo
```

Each app's `test` script uses `bun --test`. Add tests for new behavior where
reasonable.

## Code quality

Lint and format everything before opening a PR:

```bash
bun run lint     # shared ESLint flat config across the workspace
bun run format   # Prettier (double quotes, 2-space indent, 100 cols)
```

The shared linting rules live in `packages/eslint-config`.

## Commit message format

This project follows [Conventional Commits](https://www.conventionalcommits.org/)
where possible:

```
feat(api): add endpoint to mark food as purchased
fix(web): resolve auth redirect after Google sign-in
docs: update deployment instructions
chore: bump turbo to ^2.4.0
```

## Pull requests

1. Push your branch to your fork:
   ```bash
   git push origin <type>/<short-description>
   ```
2. Open a Pull Request against `main` in [TheMehediHQ/Foodly](https://github.com/TheMehediHQ/Foodly).
3. Use the PR template and describe **what** changed, **why**, and **how it was
   tested**.
4. Link any related issues (e.g. `Closes #123`).
5. Respond to review feedback; CI must pass before merge.

### Merge requirements

- All required CI checks pass.
- At least one maintainer review is approved.
- No secrets, credentials, or `.env` content are introduced.
- The PR does not change application behavior in ways not described in the PR.

## Code quality expectations

- Follow the existing code style (see `.prettierrc`).
- Prefer TypeScript/JSX conventions already used in each app.
- The API is written as Express `CommonJS` (`apps/api/index.js`); the web app is
  `ESM` (`"type": "module"` in `apps/web/package.json`). Respect each module
  system.
- Keep public API routes backward compatible where possible.
- Add a `turbo.json` entry if you add a new package-level task.

## Scope and limitations

This repository is in early development. Please keep discussions and PRs scoped
to the documented architecture (Bun + Turborepo + Express + React/Vite).

Happy hacking! 🚀
