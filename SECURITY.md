# Security Policy

## Supported versions

Only the latest `main` branch is supported with security updates. If you are
running a fork or an older commit, please backport any security fixes you apply.

## Reporting a vulnerability

The Foodly maintainers take security vulnerabilities seriously. Please report
them **responsibly** rather than opening a public issue.

### How to report

- **Preferred (recommended):** Open a **private GitHub Security Advisory** on the
  repository. GitHub will route it to the maintainers.
- **Email:** Send the details to the project maintainer at
  **mehedi.hasan11023@gmail.com**. Include `[SECURITY]` in the subject line.
- **GitHub:** You may also file a confidential issue in this repository and
  mark it appropriately.

You do **not** need to wait for a fix to be published before disclosing a
publicly known/exploited issue, but we ask that you give us a reasonable window
to address it first.

### What to include

To help us triage and fix the issue quickly, please provide as much of the
following as possible:

- A clear description of the vulnerability and its impact.
- Steps to reproduce (including a proof-of-concept if possible).
- The affected version(s) / commit hash.
- Any suggested mitigation or fix.
- Your name (optional, for credit in the advisory) and a preferred method for
  follow-up.

### What NOT to include

Do **not** post any sensitive information to public GitHub issues, discussions,
or any other public channel, including:

- Real credentials, API keys, tokens, or passwords (including those discovered
  in the running application).
- Private keys or certificates.
- Database connection credentials.
- Full exploit code that could be used to attack other users.

### What to expect

- We will acknowledge receipt within **48 hours**.
- We will investigate, confirm, and provide a plan within **7 days** (sooner if
  the impact is critical).
- We will keep you informed of progress and coordinate the public disclosure
  with the release of a fix.
- Once verified and fixed, we will credit you (by name or handle) in the
  release notes / security advisory unless you prefer to remain anonymous.

## Security considerations in this repository

- The API signs JWTs with `JWT_SECRET` and stores the token in an **httpOnly**,
  `SameSite` cookie. In production the `Secure` flag is enabled automatically
  (`NODE_ENV=production`).
- CORS is restricted to an allow-list of origins. Do not widen it in a fork.
- Environment secrets must never be committed. Use `.env.example` as a template
  and keep real `.env` files git-ignored (verified by `.gitignore`).
- The API connects to MongoDB Atlas over `mongodb+srv://`. Rotate any
  compromised Atlas database user credentials if you suspect they were exposed.

Thank you for helping keep Foodly and its users safe.
