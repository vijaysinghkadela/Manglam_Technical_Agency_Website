# Manglam Technical Agency Website

A scalable, production-ready website for Manglam Technical Agency built with Next.js 16 and React 19.

> **Entity:** Manglam Technical Agency, UDYAM-RJ-15-0094091  
> **Locations:** Bikaner/Nagaur/Jodhpur, Rajasthan, India  
> **Brand:** Deep Red `#6B1A1A`  
> **Product:** FitNexora (fitness SaaS) — handles health/biometric data  
> **Ecosystem:** iStart Rajasthan registered; QRate eligible

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

**Note:** This is a single Next.js 16 app in the root directory, NOT a monorepo.

```
src/app/           # Next.js App Router pages and API route handlers
src/components/    # Feature components and reusable UI primitives
src/lib/           # Utilities, security, email, SEO, and static data
src/hooks/         # Custom React hooks
src/providers/     # React providers
src/stores/        # Zustand stores
src/styles/        # Global CSS and theme tokens
src/types/         # Shared TypeScript types
public/            # App-visible static assets
docs/              # Project, compliance, deployment, and report docs
tests/             # Playwright e2e tests
```

See [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) for the full file
and folder placement guide.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.2 (App Router) |
| React | 19.2.3 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion + Lenis smooth scroll |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Email | Nodemailer (API routes) |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint (zero warnings policy) |

---

## Key Features

### Security & Compliance
- **Proxy Handler:** `src/proxy.ts` - Security middleware (XSS/SQL detection, rate limiting, CORS)
- **Compliance:** DPDP Act 2023, LGPD (Brazil), GDPR (EU) - Privacy-first design
- **Security Headers:** CSP, HSTS, X-Frame-Options, Referrer-Policy
- **Rate Limiting:** 5 requests/minute per IP for API routes

### Content Management
All content in static TypeScript files at `src/lib/data/`:
- `services.ts` - Service offerings
- `projects.ts` - Portfolio items
- `blog.ts` - Blog posts
- `research.ts` - Research articles
- `testimonials.ts` - Client testimonials
- `legal.ts` - Privacy policy, terms, agreements

**No CMS, no database.** Edit files directly.

### Animations
- Smooth scroll via Lenis
- Framer Motion for component animations
- Reduced motion support via `useReducedMotion()`

---

## Configuration

### Path Aliases
```typescript
@/* → ./src/*
```

### Fonts
Configured in `src/app/layout.tsx`:
- **Body:** Inter (`--font-body`)
- **Display:** Syne (`--font-display`)
- **Mono:** JetBrains Mono (`--font-mono`)

---

## Documentation

- `/docs/AGENTS.md` - Comprehensive agent guidance
- `/docs/PROJECT_STRUCTURE.md` - File and folder placement guide
- `/docs/COMPLIANCE.md` - DPDP/LGPD/GDPR implementation
- `/docs/PIPELINE.md` - 10-stage client workflow
- `/docs/ECOSYSTEM.md` - Rajasthan/iStart context

---

## License

Private - Manglam Technical Agency

---

**Manglam Technical Agency**  
*Web, automation, and security delivery from Bikaner*  
[manglamtechnicalagency.com](https://manglamtechnicalagency.com)
