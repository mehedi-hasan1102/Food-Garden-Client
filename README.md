# Foodly

A full-stack food inventory application built as a **Bun workspace monorepo** orchestrated with **Turborepo**.

- **`apps/api`** — Express REST API (JWT auth, MongoDB/Mongoose)
- **`apps/web`** — React 19 + Vite + Tailwind CSS frontend (Firebase Auth)
- **`packages/eslint-config`** — shared ESLint flat config

> Powered by [Bun](https://bun.sh) (package manager + runtime) and [Turborepo](https://turbo.build) for incremental build caching and task orchestration.

## Prerequisites

- [Bun](https://bun.sh) `>=1.2` (install with `curl -LsSf https://bun.sh | bash` or `nvm`/`brew`)

## Quick start

```bash
# Install all workspace dependencies (single lockfile at the repo root)
bun install

# Run every app in development (API + Web, in parallel)
bun run dev

# ...or run a single app
bun run dev:web
bun run dev:api
```

Each app also has its own scripts for targeted use:

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `bun run dev`        | Start all dev servers (turbo, parallel)      |
| `bun run dev:web`    | Start only the web dev server (vite)         |
| `bun run dev:api`    | Start only the API (express)                 |
| `bun run build`      | Build all apps for production                |
| `bun run lint`       | Lint all apps                                |
| `bun run format`     | Format the whole repo with Prettier          |
| `bun run test`       | Run the test suite across apps               |
| `bun run clean`      | Remove build artifacts from all apps         |

## Environment variables

Every app ships with a `.env.example` describing the required variables. Copy them and fill in values:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

> `.env` files are git-ignored — never commit real secrets.

## Workspace layout

```
foodly/
├── package.json            # root workspace + packageManager = bun
├── bun.lock                # single workspace lockfile
├── turbo.json              # build pipeline / caching
├── apps/
│   ├── api/                # Express server (CommonJS, runs on Bun)
│   └── web/                # React + Vite frontend
└── packages/
    └── eslint-config/      # shared ESLint flat config
```

## Deployment

- **Web** — Firebase Hosting (`firebase.json` in `apps/web`). See `.github/workflows/firebase-hosting-merge.yml`.
- **API** — Vercel (`apps/api/vercel.json`), or run the container (`docker compose up`).
