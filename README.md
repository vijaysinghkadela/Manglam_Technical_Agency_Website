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
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Home
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── services/
│   ├── portfolio/
│   ├── pricing/
│   ├── research/
│   ├── legal/
│   └── api/            # API routes (contact, newsletter, quote)
├── components/
│   ├── home/           # Home page sections
│   ├── layout/         # Navbar, Footer
│   ├── ui/             # Reusable UI components
│   ├── blog/
│   ├── contact/
│   ├── services/
│   └── ...
├── lib/
│   ├── data/           # Static content (TypeScript files)
│   ├── constants.ts
│   ├── design-system.ts
│   └── security.ts
├── providers/          # React context providers (Lenis)
├── stores/             # Zustand stores
└── hooks/              # Custom React hooks
```

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
- `/docs/COMPLIANCE.md` - DPDP/LGPD/GDPR implementation
- `/docs/PIPELINE.md` - 10-stage client workflow
- `/docs/ECOSYSTEM.md` - Rajasthan/iStart context

---

## License

Private - Manglam Technical Agency

---

**Manglam Technical Agency**  
*Empowering Your Digital Future*  
[manglamtechnicalagency.com](https://manglamtechnicalagency.com)
