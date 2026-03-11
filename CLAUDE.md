# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) website for Manglam Technical Agency, a technology services company based in Rajasthan, India. The site showcases their services, portfolio, blog, research, and pricing pages with premium Framer Motion animations.

## Commands

```bash
# Development
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Animations**: Framer Motion + Lenis smooth scroll
- **State**: Zustand for client state management
- **Forms**: React Hook Form + Zod validation
- **Email**: Nodemailer for contact form submissions
- **Analytics**: Vercel Analytics + Speed Insights

### Project Structure
- `src/app/` — Next.js App Router pages (about, blog, contact, legal, portfolio, pricing, research, services)
- `src/components/` — UI components organized by feature (home, layout, ui, blog, contact, legal, portfolio, research, seo, services)
- `src/lib/` — Data models, constants, utilities, and SEO schemas
- `src/providers/` — React context providers (Lenis smooth scroll)
- `src/stores/` — Zustand stores
- `src/hooks/` — Custom React hooks

### Data Management
Content is stored in static TypeScript files under `src/lib/data/`:
- `services.ts` — Service offerings
- `projects.ts` — Portfolio projects
- `blog.ts` — Blog posts
- `team.ts` — Team members
- `testimonials.ts` — Client testimonials
- `legal.ts` — Legal documents (privacy, terms, MSA, NDA)
- `pricing.ts` — Pricing plans
- `research.ts` — Research articles

### SEO
- SEO schemas defined in `src/lib/seo/schemas.ts`
- Organization, website, and page-specific structured data
- OpenGraph/twitter cards configured in root layout

### Key Components
- `MagneticCursor` — Custom cursor with magnetic hover effects
- `MegaMenu` — Animated navigation dropdown
- `LenisProvider` — Smooth scroll wrapper
- `ThemeToggle` — Dark/light mode switch
- `JsonLd` — Structured data component

### Forms
- Contact form uses React Hook Form with Zod validation
- Nodemailer handles email sending server-side (API route in `src/app/api/contact/route.ts`)

## Development Notes

- Font configuration in `layout.tsx` uses Inter (body), Syne (display), and JetBrains Mono via `next/font/google`
- Theme uses CSS variables (`--color-card`, `--color-border`, `--color-violet`) defined in global CSS
- Component pattern: Content-heavy pages delegate to components in `src/components/{page}/`
- Images served from `/public/` directory
