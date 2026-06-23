# MTA Website Remediation ExecPlan

## Purpose
Audit, repair, optimize, and validate the active Manglam Technical Agency website so it is production-ready, crawlable, accessible, secure, maintainable, and conversion-focused.

## Current Architecture
- Active app: root Next.js 16 App Router in `src/app`.
- Legacy directories: `frontend/` and `backend/` are stale and out of scope.
- Package manager: npm via `package-lock.json`.
- Content model: static TypeScript data under `src/lib/data`.
- Global layout: `src/app/layout.tsx` wraps all routes with `Navbar`, `Footer`, consent, analytics gates, and global JSON-LD.

## Verified Baseline
- `git status --short`: clean before this pass.
- Instructions read: `AGENTS.md`, `docs/AGENTS.md`, `README.md`.
- Existing audit read: `docs/reports/ui-review-workspace/MTA_FULL_AUDIT_REPORT_20260614.md`.
- Scripts available: `npm run lint`, `npm run test:unit`, `npm run test:e2e`, `npm run build`, `npm audit`.
- Current core routes found: `/`, `/about`, `/contact`, `/portfolio`, `/services`, `/services/[slug]`, `/trust-center`, `/cybersecurity-policy`, `/cybersecurity-training`.

## Audit Findings
- CONFIRMED P1: Homepage hero displayed proof-like numeric values without a verified source (`1,248`, `82%`, `98.6%`, `4 rules active`).
- CONFIRMED P1: Hero CTA hierarchy did not include above-fold WhatsApp CTA and used homepage anchors instead of direct conversion/proof routes.
- CONFIRMED P2: Navigation links were duplicated between `Navbar.tsx` and `Footer.tsx`, allowing route drift.
- CONFIRMED P2: Some internal CTAs link to homepage anchors where direct pages exist.
- CONFIRMED P1: Sitemap omitted `/cybersecurity-policy` and `/cybersecurity-training`.
- CONFIRMED P1: Pricing contact prefill used service names that drifted from the canonical services catalog.
- CONFIRMED P1: API write routes allowed disallowed-origin POSTs to reach route handlers because CORS headers alone do not stop submission.
- CONFIRMED P1: Mobile nav lacked focus entry/trapping while open.
- CONFIRMED P1: Contact form success redirected immediately to WhatsApp and hid the success state.
- CONFIRMED P2: Portfolio videos autoplayed for reduced-motion users and homepage embedded heavy reel media.
- CONFIRMED P1 from dashboard: Testimonials existed in data but were not visible in the active homepage journey.
- CONFIRMED P2 from dashboard: Homepage had no honest aggregate proof strip; added only computed facts from current data.
- ALREADY FIXED from dashboard: Navigation architecture and service naming drift were repaired with shared navigation and canonical pricing/contact service names.
- FALSE from dashboard: `/blog`, `/pricing`, and `/research` are not active root App Router routes in the current codebase.
- FALSE from dashboard: Portfolio is not limited to two live projects in current data; `src/lib/data/projects.ts` contains multiple live public entries.
- PARTIAL P2: Gmail contact weakens professional trust. A domain email cannot be invented; this remains documented until the real mailbox exists.
- ALREADY FIXED: Services dropdown keyboard, hover/click behavior, cookie preferences, security headers, route coverage, and browser screenshot checks were addressed by the 2026-06-14 audit pass.

## Scope
- Centralize primary/company navigation and CTA hrefs.
- Remove fabricated proof-style numbers from the hero visual.
- Improve first-viewport CTA hierarchy with project enquiry, WhatsApp, and case-study links.
- Prefer direct routes for portfolio/contact journeys where appropriate.
- Validate with lint, unit tests, build, and focused route/browser checks where possible.

## Non-Goals
- No production deployment.
- No invented testimonials, metrics, revenue, ratings, awards, or client approvals.
- No legal policy rewrite without legal review.
- No changes to stale `frontend/` or `backend/`.
- No replacement of Gmail with an unverified domain mailbox.

## Milestones
- [x] Baseline repo and instruction discovery.
- [x] Read audit and verify against active source.
- [x] Implement canonical nav/CTA config.
- [x] Repair hero proof and CTA hierarchy.
- [x] Run validation commands.
- [x] Adversarial review and final update.

## Progress
- 2026-06-23: Baseline completed; working tree clean. Confirmed active root Next.js app and npm scripts.
- 2026-06-23: Existing audit indicates many navbar/accessibility/security issues were already fixed in a prior pass.
- 2026-06-23: Confirmed remaining high-priority hero proof and CTA issues.
- 2026-06-23: Added shared navigation/CTA config consumed by navbar/footer/hero.
- 2026-06-23: Removed unverified hero proof metrics and added direct project, WhatsApp, and portfolio CTAs.
- 2026-06-23: Fixed mobile menu focus trapping, contact success behavior, privacy checkbox error linkage, homepage contact heading level, reduced-motion portfolio video behavior, homepage portfolio media weight, sitemap omissions, pricing-contact service drift, service JSON-LD, and API origin/content-type checks.
- 2026-06-23: Validated lint, unit tests, production build, npm audit, Playwright e2e, and focused API origin/content-type rejection.
- 2026-06-23: Read supplied dashboard HTML. Added homepage proof strip from live data and rendered existing testimonials on the homepage without inventing new proof.

## Surprises And Discoveries
- The current README now correctly states the root app architecture, while older guidance still warns about stale monorepo assumptions.
- The codebase now includes Vitest and Playwright despite older `docs/AGENTS.md` saying no tests exist.

## Decision Log
- Use root `npm` scripts because `package-lock.json` is present.
- Treat `docs/reports/ui-review-workspace/MTA_FULL_AUDIT_REPORT_20260614.md` as the repo-accessible audit source because no separate audit HTML path was provided.
- Keep contact Gmail unchanged because replacing it requires a verified domain email from the business.
- Preserve verified portfolio/testimonial content rather than inventing additional proof.

## Validation Commands
- PASS: `npm run lint`
- PASS: `npm run test:unit` (3 files, 10 tests)
- PASS: `npm run build`
- PASS: `npm run test:e2e` (30/30 across Chromium, Firefox, WebKit)
- PASS: `npm audit --audit-level=moderate` (0 vulnerabilities)
- PASS: focused API checks: disallowed origin `403`, non-JSON body `415`
- PASS: local rendered homepage HTML contains updated hero, proof strip, testimonials, and contact content.

## Acceptance Criteria
- One canonical primary/company nav source exists.
- One service taxonomy remains sourced from `src/lib/data/services.ts`.
- Primary CTAs work and include WhatsApp above the fold.
- Main content remains server-routed and crawlable around client islands.
- No fabricated proof appears in the hero.
- Lint, unit tests, and production build pass or failures are classified.
- ExecPlan reflects final state and remaining risks.

## Outcomes And Retrospective
- Direct-route navigation, canonical service prefill, sitemap coverage, service structured data, mobile menu focus behavior, form success behavior, and API write hardening are complete.
- No fabricated proof metrics remain in the hero. Portfolio proof copy now describes visible scope and delivery notes rather than unverifiable measured outcomes. Homepage proof numbers are computed from current projects, services, testimonials, and agency constants.
- Remaining business limitation: public contact still uses Gmail until the user provides a verified domain mailbox.
