# Manglam Technical Agency Website

A scalable, production-ready website for Manglam Technical Agency built as a single root-level Next.js 16 App Router application with React 19.

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
│   ├── contact/
│   ├── cybersecurity-policy/
│   ├── cybersecurity-training/
│   ├── portfolio/
│   ├── pricing/
│   ├── services/
│   ├── trust-center/
│   ├── legal/
│   └── api/            # API routes (chat, contact, document-request, newsletter, quote)
├── components/
│   ├── home/           # Home page sections
│   ├── layout/         # Navbar, Footer
│   ├── ui/             # Reusable UI components
│   ├── chat/
│   ├── contact/
│   ├── legal/
│   ├── portfolio/
│   ├── pricing/
│   ├── seo/
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
| Email | Nodemailer (contact, quote, document request API routes) |
| Chat | OpenRouter-backed site assistant with local fallback |
| Analytics | Vercel Analytics + Speed Insights |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint (zero warnings policy) |
| `npm run context` | Regenerate `CONTEXT-SUMMARY.md` |

---

## Key Features

### Security & Compliance
- **Proxy Handler:** `src/proxy.ts` - Security middleware (XSS/SQL detection, rate limiting, CORS)
- **Compliance:** DPDP Act 2023, LGPD (Brazil), GDPR (EU) - Privacy-first design
- **Security Headers:** CSP, HSTS, X-Frame-Options, Referrer-Policy
- **Rate Limiting:** 5 requests/minute per IP for API routes
- **Trust Center:** Legal, cybersecurity, AI ethics, DPDP checklist, and document request workflows

### Content Management
All content in static TypeScript files at `src/lib/data/`:
- `services.ts` - Service offerings
- `projects.ts` - Portfolio items
- `research.ts` - Research articles
- `testimonials.ts` - Client testimonials
- `legal.ts` - Privacy policy, terms, agreements
- `pricing.ts` - Service plans, bundles, and pricing data
- `faq.ts` - FAQ content

**No CMS, no database.** Edit files directly.

### API Routes
- `src/app/api/chat/route.ts` - Site assistant via OpenRouter with local fallback
- `src/app/api/contact/route.ts` - Contact form with granular consent audit trail
- `src/app/api/document-request/route.ts` - Legal/template document request form
- `src/app/api/newsletter/route.ts` - Newsletter signup endpoint
- `src/app/api/quote/route.ts` - Quote request endpoint

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

### Environment Variables
Copy `.env.local.example` to `.env.local` and configure:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="MTA Website <your_email@gmail.com>"

OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=openai/gpt-oss-20b:free
NEXT_PUBLIC_SITE_URL=https://manglamtechnicalagency.com
ALLOWED_ORIGINS=https://manglamtechnicalagency.com,https://www.manglamtechnicalagency.com
```

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
