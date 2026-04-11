# AGENTS.md — Manglam Technical Agency

> Ultra-minimal reference for OpenCode sessions. See `/docs/AGENTS.md` for comprehensive guidance.

---

## Critical Architecture Warning

**Despite README/docker-compose claiming monorepo structure with `frontend/` and `backend/` directories, the ACTIVE CODEBASE is a single Next.js 16 app in the ROOT directory.**

- **Real entry**: Root `package.json` (Next.js 16.2.2, React 19)
- **App Router**: `src/app/` — NOT `frontend/src/app/`
- **Legacy dirs**: `frontend/` and `backend/` contain stale code; ESLint ignores `backend/`
- **Build**: Run `npm run build` from root, not subdirectories

Always work in root. Never assume monorepo structure.

---

## Quick Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint (ignores backend/)
npm run context  # Generates CONTEXT-SUMMARY.md
```

---

## Business Context (Affects Code)

| Fact | Detail |
|------|--------|
| **Entity** | Manglam Technical Agency, UDYAM-RJ-15-0094091 |
| **Locations** | Bikaner/Nagaur/Jodhpur, Rajasthan, India |
| **Brand** | Deep Red `#6B1A1A` |
| **Product** | FitNexora (fitness SaaS) — handles health/biometric data |
| **Ecosystem** | iStart Rajasthan registered; QRate eligible |

---

## Compliance Requirements (Affects Forms/Data)

| Law | Key Requirement | Enforcement |
|-----|-----------------|-------------|
| **DPDP Act 2023** | Explicit consent, breach notification "without undue delay" | 13 May 2027 |
| **LGPD (Brazil)** | Health/biometric = sensitive data; explicit consent required | Active |
| **GDPR (EU)** | Similar to DPDP; broader data subject rights | Active |

**Penalties**: ₹250 crore (DPDP), R$50 million (~₹8-9 crore) (LGPD)

**Action**: Contact forms must capture granular consent. FitNexora health data needs explicit consent under LGPD.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| React | 19.2.3 |
| Styling | Tailwind CSS v4 (CSS-based config) |
| Animation | Framer Motion + Lenis smooth scroll |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Email | Nodemailer (API route: `src/app/api/contact/route.ts`) |

---

## Path Aliases

```typescript
@/* → ./src/*
```

---

## Content Management

All content in static TypeScript files at `src/lib/data/`:
- `services.ts`, `projects.ts`, `blog.ts`, `team.ts`
- `legal.ts` — Privacy policy, terms, agreement templates
- `pricing.ts`, `research.ts`, `testimonials.ts`

**No CMS, no database.** Edit files directly.

---

## Key Directories

```
src/app/           # Next.js App Router pages
src/components/    # UI components (home, layout, ui, blog, contact...)
src/lib/data/      # Static content (TypeScript files)
src/providers/     # React context providers (Lenis)
src/stores/        # Zustand stores
src/hooks/         # Custom React hooks
```

---

## Component Patterns

- **Pages**: `src/app/{page}/page.tsx`
- **Components**: `src/components/{feature}/{Component}.tsx`
- **UI components**: `src/components/ui/`
- **Layout**: `src/components/layout/` (Navbar, Footer)

---

## Fonts & Theme

Configured in `src/app/layout.tsx`:
- **Body**: Inter (`--font-body`)
- **Display**: Syne (`--font-display`)
- **Mono**: JetBrains Mono (`--font-mono`)

CSS variables: `--color-card`, `--color-border`, `--color-violet`

---

## See Also

- `/docs/AGENTS.md` — Comprehensive agent guidance
- `/docs/COMPLIANCE.md` — DPDP/LGPD/GDPR implementation
- `/docs/PIPELINE.md` — 10-stage client workflow
- `/docs/ECOSYSTEM.md` — Rajasthan/iStart context
- `CLAUDE.md` — Detailed architecture notes
