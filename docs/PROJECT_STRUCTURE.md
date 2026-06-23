# Project Structure

This repository is organized around the active root-level Next.js app. The
`frontend/` and `backend/` directories are legacy code and should not be used
for current implementation work unless a migration is explicitly requested.

## Active App

```text
src/
  app/              Next.js App Router pages, route handlers, metadata, sitemap
  components/       React components grouped by feature and shared UI
  hooks/            Client-side React hooks
  lib/              App utilities, security helpers, email, SEO, and data
  lib/data/         Static content source of truth
  providers/        React providers
  stores/           Zustand stores
  styles/           Global CSS and Tailwind v4 theme tokens
  types/            Shared TypeScript types
```

## Root Files

```text
package.json            npm scripts and dependencies for the active app
package-lock.json       locked dependency graph
next.config.ts          Next.js configuration
tsconfig.json           TypeScript configuration and path aliases
eslint.config.mjs       ESLint configuration
vitest.config.ts        unit-test configuration
playwright.config.ts    e2e/browser-test configuration
AGENTS.md              short operating instructions for agents
CLAUDE.md              legacy/detailed architecture notes
README.md              project overview
```

## Documentation

```text
docs/
  AGENTS.md              comprehensive agent guidance
  COMPLIANCE.md          DPDP/LGPD/GDPR implementation notes
  ECOSYSTEM.md           Rajasthan/iStart context
  PIPELINE.md            10-stage client workflow
  PRIVACY-LAWS.md        privacy law reference
  SECURITY.md            security posture and process notes
  api/                   API documentation
  architecture/          architecture documentation
  deployment/            deployment documentation
  guides/                operational guides
  reports/               generated or historical implementation reports
```

## Public Assets

```text
public/
  images/          logos, team photos, project screenshots used by the app
  media/           case-study video/media assets used by the app
  screenshots/     review/audit screenshots that are intentionally public
  *.svg, *.ico     favicon and stock Next.js public assets
```

Only move files in `public/` after checking references in `src/`, because paths
under `public/` are served directly by URL.

## Tests

```text
tests/e2e/          Playwright end-to-end tests
src/**/*.test.tsx   colocated component/unit tests
src/**/*.test.ts    colocated store/unit tests
```

## Generated Artifacts

```text
docs/reports/ui-audits/        root-level generated UI review screenshots
docs/reports/ui-review-workspace/ historical UI audit scripts and full audit output
docs/reports/implementation/   historical implementation and verification notes
logs/                          local runtime/debug logs
```

Generated artifacts should not be imported by app code. If an artifact needs to
be user-visible on the website, move it into `public/` and reference it with a
stable public URL.

## Legacy / Do Not Use By Default

```text
frontend/        stale frontend code from an older structure
backend/         stale backend code from an older structure
THE TEAM/        raw source images; optimized app assets live in public/images/team
```

The current application entry point is the root `package.json`, and pages live
under `src/app/`.

## Placement Rules

- New pages: `src/app/{route}/page.tsx`
- New route handlers: `src/app/api/{route}/route.ts`
- Feature components: `src/components/{feature}/`
- Reusable UI primitives: `src/components/ui/`
- Static business content: `src/lib/data/`
- Shared client state: `src/stores/`
- Shared hooks: `src/hooks/`
- App-visible images/media: `public/images/` or `public/media/`
- Generated reports/screenshots/logs: `docs/reports/` or `logs/`
