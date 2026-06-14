# MTA Website Audit Report - 2026-06-14

## Executive Summary
- Reviewed the active root Next.js 16 App Router application, not the stale `frontend/` / `backend/` directories.
- Fixed the Services navbar dropdown root causes: clipped desktop dropdown surface, hover/click race, brittle close behavior, and incomplete keyboard coverage.
- Restored a footer Cookie Preferences control using the existing consent banner event API.
- Refined navbar glass tokens for readable desktop glass, lighter mobile blur, and non-`backdrop-filter` fallback.
- Updated E2E coverage to match the current route set and removed stale `/pricing` and `/api/chat` expectations.
- Security review found no confirmed exploitable issue in the audited surface. Residual production risks are documented below.

## Page Inventory
All listed routes were built and screenshot-tested at large desktop, laptop, tablet, and mobile sizes.

| Route | Status |
| --- | --- |
| `/` | Passed |
| `/about` | Passed |
| `/contact` | Passed |
| `/portfolio` | Passed |
| `/services` | Passed |
| `/services/ai-automation` | Passed |
| `/services/performance-marketing` | Passed |
| `/services/cybersecurity` | Passed |
| `/services/saas-products` | Passed |
| `/services/branding` | Passed |
| `/trust-center` | Passed |
| `/cybersecurity-policy` | Passed |
| `/cybersecurity-training` | Passed |
| `/__codex_missing_route__` | Passed as expected 404 |
| `/api/contact` | Passed invalid-payload/security-header test |
| `/api/quote`, `/api/newsletter`, `/api/document-request` | Reviewed statically; not destructively submitted |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Built successfully |

## Screenshot Inventory
- After screenshots: `tmp-ui-review/screenshots/20260614-133344/`
- Browser audit JSON: `tmp-ui-review/screenshots/20260614-133344/browser-console-network-audit.json`
- Services menu screenshot: `tmp-ui-review/screenshots/20260614-133344/navbar-services-menu-desktop-after.png`
- Baseline tracked diff: `tmp-ui-review/baseline/baseline-20260614-133344.patch`
- Baseline status snapshot: `tmp-ui-review/baseline/baseline-20260614-133344-status.txt`

Note: the repository was already dirty before implementation. The baseline patch/status were captured before edits; fresh before screenshots were not captured before the first code change, so visual comparison uses the saved baseline artifacts and existing prior screenshot folders as historical references.

## Functional Test Report
- Navbar desktop Services hover: Passed in Chromium, Firefox, WebKit.
- Navbar desktop Services click fallback: Passed after fixing pointer-enter/click close race.
- Navbar Services keyboard: ArrowDown, Home/End, Escape, focus return, and outside click passed.
- Mobile navigation and Services submenu: Passed at 390px viewport.
- Contact query prefill and select readability: Passed.
- Consent accept persistence: Passed.
- Footer Cookie Preferences reopen flow: Passed after restoring footer control.
- Horizontal overflow on services/contact at 390, 768, 1440: Passed.
- Browser console/network audit: 56 route/viewport combinations checked; no non-404 console errors, failed requests, or horizontal overflow.

## UI And Typography Report
- No licensed Perplexity font files were found under `public` or `src`.
- No proprietary fonts were downloaded, copied, bundled, or imitated.
- Existing fallback architecture remains: `Inter`, `Source Serif 4`, and `Instrument Serif` through `next/font/google`.
- Navbar glass was tuned in `src/styles/globals.css` with more opaque readable light glass, restrained blur, improved shadow/border treatment, mobile blur reduction, and `@supports` fallback.
- Typography tokens and roles remain centralized in CSS variables; no global font swap to unavailable Perplexity files was made.

## Security Report
| Severity | Finding | Remediation / Verification |
| --- | --- | --- |
| Medium | Services dropdown could be clipped by `overflow-hidden`, reducing navigation availability. | Fixed by allowing visible overflow on the nav pill and adding viewport-bounded dropdown width. Verified by E2E and screenshot. |
| Low | Services click fallback could close immediately after hover opened it. | Changed click to open-only fallback; close is Escape/outside/focus movement. Verified by E2E. |
| Low | Footer lacked a visible way to reopen privacy preferences despite banner support. | Added footer Cookie Preferences button dispatching `mta:show-consent-banner`. Verified by E2E. |
| Info | CSP uses `unsafe-inline`; dev also uses `unsafe-eval`. | Existing Next.js-compatible policy retained. Production hardening could move to nonce/hash CSP if the app architecture supports it. |
| Info | Production rate limiting depends on Upstash env vars. | Existing code fails closed with 503 if missing in production. Verify production env before launch. |

Security checks performed:
- `npm audit --audit-level=moderate`: 0 vulnerabilities.
- Static scan for `dangerouslySetInnerHTML`, localStorage, env usage, external targets, and suspicious sink patterns.
- Header spot checks for page and API preflight: CSP, frame, content-type, referrer, permissions, CORS, and Allow headers present.
- API invalid payload regression test for `/api/contact`.

## Code Change Summary
Files intentionally changed in this pass:
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/styles/globals.css`
- `tests/e2e/ux-a11y.spec.ts`
- `tmp-ui-review/audit-browser-pass.mjs`
- `tmp-ui-review/audit-browser-resume.mjs`
- `tmp-ui-review/MTA_FULL_AUDIT_REPORT_20260614.md`
- `tmp-ui-review/baseline/*`
- `tmp-ui-review/screenshots/20260614-133344/*`

The worktree had many pre-existing tracked and untracked changes before this pass. They were preserved and not reverted.

## Verification Matrix
| Check | Status |
| --- | --- |
| Production build / TypeScript | Passed |
| Lint | Passed |
| Unit tests | Passed |
| E2E tests | Passed: 30/30 across Chromium, Firefox, WebKit |
| Dependency audit | Passed: 0 vulnerabilities |
| Browser console review | Passed with documented limitation: expected 404 route logs only |
| Network request review | Passed |
| Responsive screenshot review | Passed |
| Services dropdown desktop/keyboard/mobile | Passed |
| Security headers | Passed |
| Edge browser project | Not available in current configured run unless `PLAYWRIGHT_EDGE=true` is set |

## Remaining Limitations
- No production credentials or destructive production submissions were used.
- Fresh before screenshots were not captured before the first edit; baseline diff/status artifacts were captured instead.
- Perplexity Sans/Serif were not implemented because no licensed font files are present.
- Production HSTS only enables when `VERCEL=1` or `ENABLE_STRICT_TRANSPORT_SECURITY=true`.
- Production rate limiting requires valid `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
