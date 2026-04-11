# AGENTS.md — Manglam Technical Agency (Comprehensive)

> Complete reference for OpenCode sessions working with MTA codebase.

---

## Project Overview

| Attribute | Value |
|-----------|-------|
| **Project** | Manglam Technical Agency Website |
| **Entity** | Manglam Technical Agency, UDYAM-RJ-15-0094091 |
| **Locations** | Bikaner/Nagaur/Jodhpur, Rajasthan, India |
| **Brand Color** | Deep Red `#6B1A1A` |
| **Product** | FitNexora (fitness SaaS with health/biometric data) |
| **Ecosystem** | iStart Rajasthan registered; QRate eligible |
| **Framework** | Next.js 16 + React 19 |
| **Repository** | Root directory (NOT monorepo) |

---

## Critical Architecture Reality

**This is NOT a monorepo.** Despite README/docker-compose claiming separate `frontend/` and `backend/` directories, the **active codebase** is a single Next.js 16 app in the **root directory**.

| What Docs Claim | What Actually Exists |
|-----------------|---------------------|
| Monorepo with `frontend/` and `backend/` | Single Next.js app in **root** with `src/app/` |
| Separate frontend/backend architecture | Next.js 16 with App Router + API routes |
| MongoDB + Express integration | Static content in `src/lib/data/*.ts` files |
| Full-stack setup | API routes in `src/app/api/` (Nodemailer contact form) |

**The `frontend/` and `backend/` directories exist but contain stale/legacy code and are NOT the active codebase.** ESLint config explicitly ignores `backend/**`.

### Always work in the root directory. Never use:
```bash
cd frontend && npm run dev    # WRONG
cd backend && npm install     # WRONG
```

### Correct commands:
```bash
npm run dev     # From root only
npm run build   # From root only
npm install     # Installs in root node_modules/
```

---

## Commands Reference

| Command | Purpose | Notes |
|---------|---------|-------|
| `npm run dev` | Dev server at `localhost:3000` | Hot reload, unoptimized |
| `npm run build` | Production build | Creates `.next/` folder |
| `npm run start` | Start production server | Must run build first |
| `npm run lint` | ESLint | Ignores `backend/` directory |
| `npm run context` | Generates CONTEXT-SUMMARY.md | Custom script |

**No test command exists** — no tests currently in repo. Don't assume testing infrastructure exists.

---

## Business Context (Affects Code Decisions)

### Entity Information
- **Legal Name**: Manglam Technical Agency
- **UDYAM Registration**: RJ-15-0094091
- **Locations**: Bikaner, Nagaur, Jodhpur, Rajasthan, India
- **Brand Identity**: Deep Red `#6B1A1A`
- **Primary Product**: FitNexora (fitness SaaS platform)

### FitNexora Product
FitNexora handles health and biometric data:
- Diet plans and nutrition data
- Workout metrics and body measurements
- Potential biometric data (facial recognition check-in, wearable integration)
- **Compliance impact**: Health/biometric = sensitive data under LGPD, requiring explicit consent

### Ecosystem Involvement
- Registered on iStart Rajasthan (istart.rajasthan.gov.in)
- QRate evaluation eligible (startup rating system)
- 5,200+ DPIIT startups in Rajasthan ecosystem
- QRate scorecard can be used in proposals as validation

---

## Compliance Requirements (Critical for Code)

### DPDP Act 2023 (India)
| Aspect | Requirement | Enforcement |
|--------|-------------|-------------|
| Consent | Free, specific, informed, unconditional, unambiguous | 13 May 2027 |
| Form | Clear affirmative action, standalone itemised notice | |
| Withdrawal | As easy as giving consent | |
| Breach Notification | "Without undue delay" to Board + principals | |
| Penalty | Up to ₹250 crore per violation | |

### LGPD (Brazil) - Active Now
| Aspect | Requirement | Impact on MTA |
|--------|-------------|---------------|
| Sensitive Data | Health/biometric requires **explicit and emphatic consent** | FitNexora health data |
| Consent | Active opt-in, granular, highlighted, standalone | Contact forms must capture this |
| Withdrawal | As easy as giving consent | One-click withdrawal required |
| Penalty | Up to 2% Brazilian revenue or R$50 million (~₹8-9 crore) | International exposure |

### GDPR (EU)
Broader than DPDP but similar consent requirements. If MTA serves EU clients, GDPR applies.

### CCPA/CPRA (California)
Opt-out model (vs opt-in for DPDP/LGPD). Lower immediate risk for MTA but relevant for FitNexora international scaling.

### Code-Level Requirements
1. **Contact forms must have explicit consent checkbox** (required, not pre-ticked)
2. **Consent must be logged** with timestamp and purpose
3. **Withdrawal mechanism** must be as easy as giving consent
4. **Breach notification playbook** must exist (72-hour internal SLA)
5. **Data deletion workflows** on consent withdrawal

---

## Tech Stack Deep Dive

### Framework & Runtime
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.2 | App Router framework |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Node.js | 20+ | Runtime |

### Styling & UI
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | v4 | CSS framework (CSS-based config) |
| Framer Motion | 12.x | Animations |
| Lenis | 1.x | Smooth scrolling |

### State & Forms
| Technology | Version | Purpose |
|------------|---------|---------|
| Zustand | 5.x | Client state management |
| React Hook Form | 7.x | Form handling |
| Zod | 4.x | Schema validation |

### Data & Services
| Technology | Purpose |
|------------|---------|
| Supabase | Database (not currently in use for content) |
| Nodemailer | Email sending (contact form) |
| Razorpay | Payment processing |

### Analytics & Monitoring
| Technology | Purpose |
|------------|---------|
| Vercel Analytics | Performance monitoring |
| Vercel Speed Insights | Core Web Vitals |

---

## Directory Structure

```
C:\Users\Vinay Pal\Documents\brain-ai\brain-ai\01 - Clients\MTA Website
├── .next/              # Build output (gitignored)
├── .claude/            # Claude-specific files
├── backend/            # STALE — legacy Express code (ESLint ignored)
├── docs/               # Documentation (COMPLIANCE.md, PIPELINE.md, etc.)
├── frontend/           # STALE — legacy Next.js code
├── node_modules/
├── public/             # Static assets (images, favicon)
├── scripts/            # Utility scripts (generate-context-summary.js)
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── about/
│   │   ├── api/       # API routes (contact, etc.)
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── legal/
│   │   ├── portfolio/
│   │   ├── pricing/
│   │   ├── research/
│   │   ├── services/
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx     # Homepage
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── template.tsx
│   ├── components/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── legal/
│   │   ├── portfolio/
│   │   ├── research/
│   │   ├── seo/
│   │   ├── services/
│   │   └── ui/          # Reusable UI primitives
│   ├── hooks/           # Custom React hooks
│   ├── lib/
│   │   ├── data/        # Static content (TypeScript files)
│   │   │   ├── services.ts
│   │   │   ├── projects.ts
│   │   │   ├── blog.ts
│   │   │   ├── team.ts
│   │   │   ├── legal.ts
│   │   │   ├── pricing.ts
│   │   │   ├── research.ts
│   │   │   └── testimonials.ts
│   │   ├── seo/         # SEO schemas
│   │   └── utils.ts
│   ├── providers/       # React context providers
│   │   └── LenisProvider.tsx
│   └── stores/          # Zustand stores
│       ├── useUIStore.ts
│       ├── useQuoteStore.ts
│       └── useNotificationStore.ts
├── AGENTS.md            # Root reference (this file)
├── CLAUDE.md            # Claude-specific guidance
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── eslint.config.mjs
```

---

## Component Patterns

### Page Structure
```typescript
// src/app/{page}/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | Manglam Technical Agency',
  description: '...',
}

export default function PageName() {
  return (
    <main>
      {/* Page content */}
    </main>
  )
}
```

### Component Structure
```typescript
// src/components/{feature}/{Component}.tsx
'use client'  // Only if using client-side features

interface Props {
  // Props definition
}

export function ComponentName({ ...props }: Props) {
  return (
    // JSX
  )
}
```

### UI Components
```typescript
// src/components/ui/{Component}.tsx
// Reusable, unstyled or minimally styled components
// Used across multiple features
```

### Layout Components
```typescript
// src/components/layout/
// Navbar.tsx
// Footer.tsx
// PageLayout.tsx
```

---

## Content Management System

**MTA uses NO traditional CMS or database for content.** All content lives in TypeScript files at `src/lib/data/`.

### Available Data Files

| File | Content | Update Frequency |
|------|---------|------------------|
| `services.ts` | Service offerings | As services change |
| `projects.ts` | Portfolio projects | As projects complete |
| `blog.ts` | Blog posts | Weekly/monthly |
| `team.ts` | Team members | As team changes |
| `testimonials.ts` | Client testimonials | As collected |
| `legal.ts` | Privacy, terms, agreements | As laws/policies update |
| `pricing.ts` | Pricing plans | As pricing changes |
| `research.ts` | Research articles | As published |

### Editing Content
1. Open the relevant `.ts` file in `src/lib/data/`
2. Modify the array/object exports
3. TypeScript validates the shape
4. Next.js hot-reloads in dev
5. Build to deploy

**No API calls, no database queries, no admin panel.**

---

## Path Aliases

Configured in `tsconfig.json`:

```typescript
// tsconfig.json paths
"@/*": ["./src/*"]

// Usage
import { Navbar } from '@/components/layout/Navbar'
import { services } from '@/lib/data/services'
```

---

## Fonts & Theme System

### Font Configuration (layout.tsx)
```typescript
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets:['latin'], variable:'--font-body', display:'swap' })
const syne = Syne({ subsets:['latin'], variable:'--font-display', display:'swap', weight:['600','700','800'] })
const jetbrains = JetBrains_Mono({ subsets:['latin'], variable:'--font-mono', display:'swap' })
```

### CSS Variables (globals.css)
- `--font-body`: Inter (body text)
- `--font-display`: Syne (headings)
- `--font-mono`: JetBrains Mono (code/labels)
- `--color-card`: Card backgrounds
- `--color-border`: Border colors
- `--color-violet`: Brand accent
- `--color-foreground`: Text color
- `--color-canvas`: Background

---

## API Routes

### Current API Routes
| Route | Purpose | Implementation |
|-------|---------|----------------|
| `src/app/api/contact/route.ts` | Contact form email | Nodemailer |

### Contact API
```typescript
// POST /api/contact
// Body: { name, email, phone?, service, budget, timeline, message, privacy }
// Response: { success: boolean, message?: string }
```

---

## Build & Deployment

### Local Development
```bash
npm install     # Install dependencies
npm run dev     # Start dev server (localhost:3000)
```

### Production Build
```bash
npm run build   # Creates optimized .next/ folder
npm run start   # Start production server
```

### Vercel Deployment
```bash
# Vercel CLI (optional)
vercel          # Deploy to preview
vercel --prod   # Deploy to production
```

---

## Common Pitfalls to Avoid

1. **Don't use frontend/ or backend/ directories** — they're stale
2. **Don't assume database exists** — content is in TypeScript files
3. **Don't add tests** — no testing infrastructure exists yet
4. **Don't modify legacy directories** — focus on root/src/
5. **Don't forget compliance** — DPDP/LGPD affect all forms
6. **Don't hardcode brand colors** — use CSS variables
7. **Don't add new dependencies without checking** — keep lean

---

## External Documentation

| Document | Purpose |
|----------|---------|
| `/docs/COMPLIANCE.md` | DPDP/LGPD/GDPR implementation details |
| `/docs/PIPELINE.md` | 10-stage client workflow |
| `/docs/ECOSYSTEM.md` | Rajasthan/iStart/QRate context |
| `/docs/PRIVACY-LAWS.md` | Global privacy law comparison |
| `CLAUDE.md` | Claude-specific architecture notes |
| `README.md` | Project overview (note: claims monorepo — see warning above) |

---

## Support & Contact

- **Website**: https://manglamtechnicalagency.com
- **Entity**: Manglam Technical Agency
- **UDYAM**: RJ-15-0094091
- **Locations**: Bikaner/Nagaur/Jodhpur, Rajasthan, India

---

*Last updated: April 2026*
