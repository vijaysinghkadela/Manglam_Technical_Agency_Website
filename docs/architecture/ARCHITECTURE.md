# MTA Website - System Architecture

## Overview

This project is a single root-level Next.js 16 application using the App Router. The active application lives in the repository root under `src/`. The legacy `frontend/` and `backend/` directories are not the production code path.

All public pages, API endpoints, security proxy logic, and server-side email handlers run through Next.js. There is no separate Express server, database layer, or CMS in the active app.

## Structure

```
mta-website/
├── src/
│   ├── app/                       # Next.js App Router pages and route handlers
│   │   ├── about/
│   │   ├── contact/
│   │   ├── cybersecurity-policy/
│   │   ├── cybersecurity-training/
│   │   ├── legal/
│   │   ├── portfolio/
│   │   ├── pricing/
│   │   ├── services/
│   │   ├── trust-center/
│   │   └── api/
│   │       ├── chat/
│   │       ├── contact/
│   │       ├── document-request/
│   │       ├── newsletter/
│   │       └── quote/
│   ├── components/                # Feature and reusable UI components
│   │   ├── about/
│   │   ├── chat/
│   │   ├── contact/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── legal/
│   │   ├── portfolio/
│   │   ├── pricing/
│   │   ├── seo/
│   │   ├── services/
│   │   └── ui/
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Data, email, validation, security, chatbot context
│   │   └── data/                  # Static content files; no CMS/database
│   ├── providers/                 # React context providers
│   ├── stores/                    # Zustand stores
│   └── proxy.ts                   # Security proxy for requests/API routes
├── public/                        # Static assets
├── docs/                          # Documentation
├── next.config.ts                 # Next.js config, headers, image config, redirects
├── package.json                   # Root app scripts and dependencies
└── README.md
```

## Architecture Principles

### Application
- **Root-only app**: Build and run commands must execute from the repository root.
- **App Router routes**: Pages are colocated under `src/app/{route}/page.tsx`.
- **Route handlers**: Server endpoints are in `src/app/api/**/route.ts`.
- **Static content**: Website content lives in `src/lib/data/*.ts`; no database or CMS is required.
- **Security proxy**: `src/proxy.ts` applies malicious-pattern blocking, CORS, headers, and API rate limiting.

### UI
- **Components**: Feature folders for page-level UI, plus shared primitives in `src/components/ui`.
- **Layout**: Global navigation, footer, chatbot, analytics, and providers are wired from `src/app/layout.tsx`.
- **Animations**: Framer Motion and Lenis provide motion and smooth scroll with accessibility fallbacks.
- **State**: Zustand is used only where client state needs to persist across components.

### Server Workflows
- **Email**: Nodemailer sends contact, quote, and document-request submissions to the admin inbox.
- **Forms**: React Hook Form and Zod enforce client/server validation and consent capture.
- **Chat**: The site assistant streams from OpenRouter when configured and falls back to local context replies when unavailable.
- **Compliance**: Legal and trust pages expose DPDP, LGPD, GDPR, cybersecurity, AI ethics, and agreement content.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand (state)
- Framer Motion (animations)
- Lenis (smooth scroll)
- React Hook Form + Zod
- Nodemailer
- OpenRouter API for chat
- Vercel Analytics and Speed Insights

## Data Flow

1. Static pages render from App Router pages and static data modules.
2. Forms submit to Next.js route handlers under `/api`.
3. Route handlers validate with Zod, sanitize data, and send mail through `src/lib/email.ts`.
4. `src/proxy.ts` screens traffic before route handling and adds security/CORS headers.
5. The chatbot posts conversation context to `/api/chat`; missing or failing OpenRouter config returns local fallback responses.

## Operational Notes

- Run `npm run dev`, `npm run build`, `npm run start`, and `npm run lint` from the repository root.
- Ignore stale architecture assumptions in `frontend/` and `backend/`.
- Production deployments need SMTP variables for form email and optionally `OPENROUTER_API_KEY` for streamed chat.
- `ALLOWED_ORIGINS` can be set as a comma-separated list for API CORS.
