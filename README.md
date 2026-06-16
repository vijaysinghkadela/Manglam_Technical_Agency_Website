# Manglam Technical Agency Website

A scalable, production-ready website for Manglam Technical Agency built as a single root-level Next.js 16 App Router application with React 19, compliance-first forms, legal/trust pages, and an AI site assistant.

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
│   │   ├── privacy-policy/
│   │   ├── terms-of-service/
│   │   ├── cybersecurity/
│   │   ├── ai-ethics-policy/
│   │   ├── dpdp-implementation-checklist/
│   │   └── agreements/[slug]/
│   ├── api/            # API routes (chat, contact, document-request, newsletter, quote)
│   ├── manifest.ts     # Web app manifest
│   ├── robots.ts       # robots.txt
│   └── sitemap.ts      # sitemap.xml
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
│   ├── chatbot/        # Local site assistant context/fallbacks
│   ├── email.ts        # Nodemailer transport
│   ├── seo/            # Structured data schemas
│   ├── validations.ts  # Zod schemas
│   ├── constants.ts
│   ├── design-system.ts
│   └── security.ts
├── providers/          # React context providers (Lenis)
├── stores/             # Zustand stores
├── hooks/              # Custom React hooks
└── proxy.ts            # Request security, CORS, and API rate limiting
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.6 (App Router) |
| React | 19.2.3 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion + Lenis smooth scroll |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Email | Nodemailer (contact, quote, document request API routes) |
| Chat | OpenRouter-backed site assistant with local fallback context |
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
- **SEO:** Metadata, Open Graph image generation, JSON-LD, sitemap, robots, and web manifest

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

### Public Routes
- `/` - Home
- `/about` - Company overview
- `/services` and `/services/[slug]` - Services and detail pages
- `/portfolio` - Portfolio
- `/pricing` - Pricing and packages
- `/contact` - Contact form
- `/trust-center` - Compliance and trust overview
- `/cybersecurity-policy` and `/cybersecurity-training` - Cybersecurity service pages
- `/legal` and `/legal/*` - Legal policies, agreements, AI ethics, cybersecurity, and DPDP checklist

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
Configured in `src/app/layout.tsx` and `src/styles/globals.css`:
- **Body:** Outfit with Inter fallback (`--font-body`)
- **Display:** Outfit with Inter fallback (`--font-display`)
- **Mono:** system monospace stack (`--font-mono`)

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

If `OPENROUTER_API_KEY` is not set, the chatbot uses local fallback responses from `src/lib/chatbot/site-context.ts`.

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
