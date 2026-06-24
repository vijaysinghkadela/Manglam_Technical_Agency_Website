# MTA Website Audit Implementation List

Audit source: `docs/WEBSITE-AUDIT-2026-06-24.md`
Target: 90-95% closure of audit findings through visible UX, conversion, accessibility, SEO, and trust improvements.

## Loop Engineering Frame

The site now treats each visitor path as a feedback loop:

- Signal: buyer sees fit, proof, price, and trust early.
- Route: buyer chooses by business need, not internal department labels.
- Control: CTAs, forms, consent, and legal links reduce uncertainty.
- Feedback: portfolio outcomes, response windows, FAQs, and proof blocks answer buyer objections.
- Error budget: avoid hidden content, blocked forms, broken overlays, and poor accessible text.

## Implemented

### Critical UI Blockers

- Fixed mobile nav overlay by replacing fragile animated state menu with native Popover API.
- Raised mobile menu above cookie/chat layers with full-screen opaque overlay behavior.
- Reworked cookie consent into a compact non-modal bottom banner.
- Removed blocking backdrop from optional analytics consent.
- Kept consent actions visible: Accept, Manage, and dismiss.
- Removed unsafe initial opacity from root page template to prevent blank captures.
- Removed hidden-by-default pricing animation for conversion-critical pricing cards.
- Added mobile popover CSS for full viewport sizing and stable backdrop behavior.

### Accessibility Loop

- Added skip-to-content link in root layout.
- Added accessible labels to split animated headings.
- Added screen-reader text for `TextReveal`.
- Marked visual split words as `aria-hidden`.
- Improved mobile menu semantics with role dialog and explicit close control.
- Reduced form burden by moving optional follow-up consent into collapsed details.

### Conversion Signal Loop

- Rewrote home hero from broad agency claim to buyer-specific promise.
- Added above-fold proof chips: Rajasthan businesses, DPDP-aware forms, direct engineer contact.
- Added buyer-oriented stats: live builds, SaaS products, reply window, Rajasthan presence.
- Added primary CTA track: Start a Project.
- Added secondary CTA track: See Proof.
- Added home "Who MTA is built for" band for clinics, gyms, NGOs, local service businesses, founders, and startups.
- Added proof screenshots for MNSS and ClinicFlow.
- Added proof signals: live public builds, internal SaaS products, reply loop, compliance posture.

### Services Routing Loop

- Added "Choose by need" section on Services page.
- Mapped common needs to service pages:
  - Get more enquiries -> Web & App Development
  - Automate admin work -> AI Automation
  - Secure a website or app -> Cybersecurity
  - Refresh brand trust -> Branding
- Added service-card buyer-fit signals.
- Added service-card delivery-loop proof copy.
- Replaced generic card CTA copy with service-specific action labels.
- Preserved transparent price chips and feature summaries.

### Trust Proof Loop

- Added portfolio outcome chips for each project.
- Added stronger portfolio meta description.
- Added About trust strip:
  - UDYAM RJ-15-0094091
  - iStart Rajasthan registration
  - DPDP-aware consent/form handling
  - 2-4 hour enquiry response window
- Kept legal/trust center links available from service and footer paths.

### SEO And Structured Signal Loop

- Confirmed sitemap includes public commercial routes: `/pricing`, `/legal`, service pages, legal pages, and agreement pages.
- Confirmed Pricing is present in navbar/footer.
- Shortened service detail meta descriptions.
- Expanded portfolio meta description.
- Fixed schema logo/image URLs to existing assets.
- Expanded LocalBusiness area served: India, Rajasthan, Bikaner, Nagaur, Jodhpur, Jaipur.
- Added service-level JSON-LD to service detail pages.
- Added FAQ JSON-LD to service detail pages.
- Added breadcrumb JSON-LD to service detail pages.

### Contact And Consent Loop

- Kept main DPDP consent explicit.
- Collapsed optional follow-up consent under "Optional contact preferences".
- Kept WhatsApp-first contact route visible.
- Preserved form labels and consent trace.

### Training Page

- Existing training page already includes workshop packages, duration, pricing, audience, process, and CTA.
- Existing training page already includes free DPDP gap assessment offer.

## Evidence Gates Passed

- `npx eslint src` passed.
- `npm run build` passed.
- Visual verification screenshots captured in `public/audit-screenshots/2026-06-24/fix-verification/`.
- Local preview available at `http://127.0.0.1:3000`.

## Remaining Backlog For Full 100% Closure

These items need content/business inputs or larger route work before implementation:

- Add full case study detail pages for each project.
- Add client-approved testimonials with names, role, and context.
- Add client logo strip only after approval.
- Add before/after screenshots where source assets exist.
- Add video walkthroughs or short product demos.
- Add blog/research publishing plan if content pipeline is active.
- Add local landing pages for Bikaner, Nagaur, Jodhpur, Jaipur service intent.
- Add downloadable cybersecurity training brochure PDF.
- Add review schema only after real review source exists.
- Add real outcome metrics once clients approve numbers: leads, traffic, time saved, launch dates.
- Add automated a11y regression testing with axe or Playwright checks.
- Remove nested `main` semantics in a wider layout cleanup if strict HTML validation becomes gate.

## Verification Checklist For Next Release

- Desktop home: hero, proof band, services, portfolio proof visible.
- Mobile home: nav opens as full-screen menu and closes cleanly.
- Contact page: cookie banner does not cover form fields.
- Services page: "Choose by need" appears before service grid.
- Service detail pages: pricing visible in full-page screenshots.
- Portfolio page: outcomes visible on live project cards.
- Screen reader extraction: headings keep spaces.
- Sitemap: public commercial routes present.
- Structured data: Organization, LocalBusiness, Service, FAQ, Breadcrumb parse without errors.
- Build: `npm run build`.
- Source lint: `npx eslint src`.
