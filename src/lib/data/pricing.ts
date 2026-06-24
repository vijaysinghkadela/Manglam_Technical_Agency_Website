export interface PricingPlan {
  name: string
  tagline: string
  // base (1-month / one-time) price
  price: string
  period: string
  // retainer duration pricing
  price6mo?: string
  price12mo?: string
  savings6mo?: string   // e.g. "~14% off"
  savings12mo?: string  // e.g. "25% off"
  totalBilled6mo?: string
  totalBilled12mo?: string
  // extras
  adSpend?: string
  highlight: boolean
  deliverables: string[]
  margin: string
  retainerNote?: string  // post-build retainer option for project services
}

export interface ServicePricing {
  slug: string
  service: string
  category: 'Monthly Retainer' | 'Project' | 'Project / Retainer'
  isRetainer: boolean   // true → show duration toggle
  plans: PricingPlan[]
  note?: string
}

export const servicePricingData: Record<string, ServicePricing> = {

  /* ─── META ADS ─────────────────────────────────────────── */
  'social-media-marketing': {
    slug: 'social-media-marketing',
    service: 'Meta Ads',
    category: 'Monthly Retainer',
    isRetainer: true,
    plans: [
      {
        name: 'Starter',
        tagline: 'Local shops, startups & clinics beginning with paid ads.',
        price: '₹18,000',
        period: '/mo',
        price6mo: '₹15,500',
        price12mo: '₹13,500',
        savings6mo: '~14% off',
        savings12mo: '25% off',
        totalBilled6mo: '₹93,000 total',
        totalBilled12mo: '₹1,62,000 total',
        adSpend: '₹10K–30K/mo (client pays Meta)',
        highlight: false,
        deliverables: [
          'Campaign strategy & objective setting (traffic, leads, or awareness)',
          'Facebook Pixel / CAPI setup',
          '2 ad creatives/month (static; copy included)',
          '1 active campaign, up to 2 ad sets',
          'Audience research + targeting setup',
          'Monthly performance report',
          '1 revision round per creative',
          'WhatsApp/email support (24-hr response)',
        ],
        margin: '44%',
      },
      {
        name: 'Growth',
        tagline: 'SMBs, coaching, real estate & e-commerce scaling ad spend.',
        price: '₹35,000',
        period: '/mo',
        price6mo: '₹30,000',
        price12mo: '₹26,000',
        savings6mo: '~14% off',
        savings12mo: '26% off',
        totalBilled6mo: '₹1,80,000 total',
        totalBilled12mo: '₹3,12,000 total',
        adSpend: '₹30K–80K/mo (client pays Meta)',
        highlight: true,
        deliverables: [
          'Full-funnel campaign strategy (awareness → conversion)',
          'Pixel + CAPI setup + custom events',
          '4–6 ad creatives/month (static + carousel; copy included)',
          'Up to 3 campaigns, 6 ad sets',
          'A/B testing (creatives + audiences)',
          'Lookalike + retargeting audience setup',
          'Bi-weekly performance calls (30 min)',
          'Weekly snapshot + monthly deep-dive report',
          'Competitor ad audit (monthly)',
          '2 revision rounds per creative',
          'WhatsApp/email support (12-hr response)',
        ],
        margin: '43%',
      },
      {
        name: 'Scale',
        tagline: 'E-commerce stores, established brands & high-growth businesses.',
        price: '₹65,000',
        period: '/mo',
        price6mo: '₹55,000',
        price12mo: '₹48,000',
        savings6mo: '~15% off',
        savings12mo: '26% off',
        totalBilled6mo: '₹3,30,000 total',
        totalBilled12mo: '₹5,76,000 total',
        adSpend: '₹80K–2L/mo (client pays Meta)',
        highlight: false,
        deliverables: [
          'Comprehensive media strategy (FB + IG + Reels + Stories)',
          'Full Pixel, CAPI & GA4 integration',
          '8–10 creatives/month (static + video + UGC-style reels)',
          'Unlimited campaigns & ad sets (within scope)',
          'Full-funnel A/B testing (creative, audience, placement, objective)',
          'Dynamic product ads (e-commerce + catalog setup)',
          'Retargeting + lookalike + broad + interest audience stacking',
          'Weekly calls (45 min) + weekly detailed report',
          'Monthly strategy review + quarterly account audit',
          'Dedicated account manager (named contact)',
          'Landing page conversion recommendations',
          'Priority support — 4-hr WhatsApp response',
        ],
        margin: '49%',
      },
    ],
    note: 'All prices excl. GST (18%). SAC 998361. Ad spend NOT included — client pays Meta directly. Onboarding fee ₹5,000 for new accounts (waived on 6/12-month commitments). Minimum 1-month notice for cancellation on rolling monthly.',
  },

  /* ─── WEB & APP DEVELOPMENT ─────────────────────────────── */
  'saas-products': {
    slug: 'saas-products',
    service: 'Web & App Dev',
    category: 'Project',
    isRetainer: false,
    plans: [
      {
        name: 'Sprint',
        tagline: 'Landing pages, portfolio, brochure & clinic sites. Delivered in 1 month.',
        price: '₹65,000',
        period: 'one-time',
        highlight: false,
        deliverables: [
          'Up to 6 pages / sections',
          'Mobile-first responsive design (Next.js + Tailwind)',
          'Contact form + WhatsApp integration',
          'Basic SEO (meta, OG tags, sitemap)',
          'Google Analytics setup',
          '1 revision round',
          '30-day post-launch support',
          'Deployment on Vercel / custom hosting',
        ],
        margin: '51%',
        retainerNote: '₹55,000/sprint on 6-mo refresh retainer · ₹50,000/sprint on 12-mo',
      },
      {
        name: 'Build',
        tagline: 'Web apps, client portals, booking systems & Flutter apps. 3–6 months.',
        price: '₹2,80,000',
        period: 'one-time',
        highlight: true,
        deliverables: [
          'Full requirements + wireframe session',
          'Custom UI design (Figma → code)',
          'Auth (email / phone / Google SSO via Supabase)',
          'Role-based access control + DB design + RLS policies',
          'API integrations (payment, SMS, maps, etc.)',
          'Admin dashboard',
          'Mobile-responsive or Flutter app (cross-platform)',
          '2 revision rounds + UAT / QA phase',
          'Deployment + DNS + SSL',
          '60-day post-launch support + handover docs',
        ],
        margin: '50%',
        retainerNote: 'Phased: ₹50K/mo over 6 months · Bundle: ₹28K/mo on 12-mo (includes AMC)',
      },
      {
        name: 'Platform',
        tagline: 'SaaS products, multi-tenant platforms & enterprise tools. 6–12 months.',
        price: '₹8,00,000',
        period: 'one-time',
        highlight: false,
        deliverables: [
          'Discovery + scoping workshop',
          'Full architecture design (DB schema, API design, component tree)',
          'Figma design system',
          'Multi-role auth + tenant isolation',
          'Custom billing / subscriptions (Razorpay / Stripe)',
          'Notification system (push + email + WhatsApp)',
          'Admin super-panel + Flutter app (iOS + Android)',
          'CI/CD pipeline (GitHub Actions) + automated testing',
          'Production deployment + monitoring',
          '90-day post-launch support + staff training (1 session)',
          'Full source code + docs handover',
        ],
        margin: '55%',
        retainerNote: '12-mo build + iterate: ₹90K/mo · ₹10,80,000 total',
      },
    ],
    note: 'All prices excl. GST (18%). SAC 998314. Payment: 40% on signing · 30% mid-delivery / staging · 30% on launch. AMC available post-launch: Basic ₹8K/mo · Standard ₹18K/mo · Premium ₹35K/mo.',
  },

  /* ─── CYBERSECURITY ─────────────────────────────────────── */
  cybersecurity: {
    slug: 'cybersecurity',
    service: 'Cybersecurity',
    category: 'Project / Retainer',
    isRetainer: false,
    plans: [
      {
        name: 'Shield',
        tagline: 'CA firms, coaching institutes, schools & local businesses.',
        price: '₹50,000',
        period: 'one-time',
        highlight: false,
        deliverables: [
          'Email security audit (SPF / DKIM / DMARC + dark web credential check)',
          'Basic VAPT — web (up to 5 pages / endpoints)',
          'DPDP Act compliance gap checklist (10-point)',
          'Phishing simulation (25 users, 1 campaign)',
          'Executive summary (2-page, board-presentable)',
          '15-day post-delivery email support',
        ],
        margin: '50%',
        retainerNote: '6-mo AMC: ₹8,500/mo · ₹51,000 total · 12-mo AMC: ₹6,500/mo · ₹78,000 total',
      },
      {
        name: 'Guard',
        tagline: 'Private hospitals, NBFCs, textile exporters & diagnostic centres.',
        price: '₹1,30,000',
        period: 'one-time',
        highlight: true,
        deliverables: [
          'Full VAPT — web app + API (30+ endpoints, CVSS-scored)',
          'Network VAPT (up to 10 IPs)',
          'Phishing + vishing simulation',
          'DPDP / RBI compliance gap assessment (20-point)',
          'Security awareness training (1 session, 20 staff)',
          'Remediation roadmap (30/60/90-day)',
          'Executive + technical reports (separate docs)',
          '30-day post-delivery support',
        ],
        margin: '53%',
        retainerNote: '6-mo: ₹20,000/mo · ₹1,20,000 total · 12-mo AMC: ₹16,500/mo · ₹1,98,000 total',
      },
      {
        name: 'Fortress',
        tagline: 'Cooperative banks, pharma, mid-size enterprises & EV/manufacturing.',
        price: '₹2,50,000',
        period: 'one-time',
        highlight: false,
        deliverables: [
          'Full-scope VAPT (web + API + network 20 IPs + WiFi)',
          'ISO 27001 Annex A gap report (114 controls assessed)',
          'DPDP + RBI / SEBI compliance gap document',
          'Staff training (2 sessions, dept-wise, attendance certs)',
          'Board-level executive summary + technical deep-dive',
          'Remediation priority matrix (critical → low)',
          '2-day onsite engagement',
          '45-day post-audit support',
        ],
        margin: '60%',
        retainerNote: '6-mo managed: ₹45,000/mo · ₹2,70,000 total · 12-mo: ₹38,000/mo · ₹4,56,000 total',
      },
    ],
    note: 'All prices excl. GST (18%). SAC 998315. Payment: 50% on signing · 30% mid-engagement · 20% on final report delivery. Never start VAPT without 50% advance.',
  },

  /* ─── AI & AUTOMATION ───────────────────────────────────── */
  'ai-automation': {
    slug: 'ai-automation',
    service: 'AI & Automation',
    category: 'Project',
    isRetainer: false,
    plans: [
      {
        name: 'Spark',
        tagline: 'Solopreneurs, gyms, clinics & coaching institutes. Eliminate manual admin.',
        price: '₹85,000',
        period: 'one-time',
        highlight: false,
        deliverables: [
          '3 production-ready n8n workflows (lead form → CRM, booking → calendar, invoice auto-send)',
          'WhatsApp AI bot (24/7 FAQ + lead capture + appointment booking)',
          'Admin dashboard view in n8n (live logs)',
          'Integration with 1 external tool (CRM, Google Sheets, or calendar)',
          'Prompt + system config documentation',
          '1-hr live training session',
          '30-day post-launch support (bug fixes + prompt tweaks)',
          'LLM API allowance: ₹2,500/month included',
        ],
        margin: '51%',
        retainerNote: '6-mo retainer: ₹14,000/mo · ₹84,000 total · 12-mo AMC: ₹11,000/mo · ₹1,32,000 total',
      },
      {
        name: 'Neural',
        tagline: 'SMBs, e-commerce, HR & sales companies. Automate lead qualification & support.',
        price: '₹2,00,000',
        period: 'one-time',
        highlight: true,
        deliverables: [
          'Custom AI agent (Claude-powered, persistent memory, tool-use enabled)',
          'RAG pipeline (ingest docs / catalog / policies → agent answers from own data)',
          '5 production n8n workflows (lead, support, invoice, payment reminder, etc.)',
          'WhatsApp + email + CRM integration (1 each)',
          'Admin panel (view conversations, override responses, add docs)',
          'Agent performance dashboard (response time, escalations, resolution rate)',
          '2 training sessions (1 technical + 1 staff usage)',
          '45-day post-launch support',
          'LLM API allowance: ₹4,000/month included',
        ],
        margin: '50%',
        retainerNote: '6-mo retainer: ₹28,000/mo · ₹1,68,000 total · 12-mo: ₹22,000/mo · ₹2,64,000 total',
      },
      {
        name: 'Cortex',
        tagline: 'Mid-size companies, SaaS products & ops-heavy businesses. AI-first operations.',
        price: '₹4,00,000',
        period: 'one-time',
        highlight: false,
        deliverables: [
          'Multi-agent crew (3+ agents: sales / support / ops — shared memory)',
          'Voice AI agent (inbound calls, lead qualification, appointment booking)',
          '10+ n8n workflows (full ops suite)',
          'Full org RAG (company docs + SOPs + product catalog ingested)',
          'Complete integration suite (WhatsApp + email + CRM + calendar + payment gateway)',
          'Admin super-panel + custom analytics dashboard (ROI tracking)',
          '2 dept training sessions + video walkthrough recording',
          '60-day post-launch support',
          'LLM API allowance: ₹8,000/month included',
        ],
        margin: '55%',
        retainerNote: '6-mo managed: ₹48,000/mo · ₹2,88,000 total · 12-mo partnership: ₹38,000/mo · ₹4,56,000 total',
      },
    ],
    note: 'All prices excl. GST (18%). SAC 998314 + 998313. LLM API (Claude Sonnet): pass-through + 15% markup on overage. Payment: 40% on signing · 30% staging demo · 30% production launch.',
  },

  /* ─── BRANDING & IDENTITY ───────────────────────────────── */
  branding: {
    slug: 'branding',
    service: 'Branding & Identity',
    category: 'Project',
    isRetainer: false,
    plans: [
      {
        name: 'Stamp',
        tagline: 'Solopreneurs, coaches, local shops & new startups. Look professional fast.',
        price: '₹35,000',
        period: 'one-time',
        highlight: false,
        deliverables: [
          'Logo (3 formats: horizontal, stacked, icon-only)',
          'Color palette (primary, secondary, accent — hex + CMYK codes)',
          'Typography pair (2 fonts + usage rules)',
          'Business card (Canva/Figma source + print-ready PDF)',
          'Letterhead (A4, print-ready)',
          'Social media kit (3 reusable Canva templates)',
          'Brand mini-guide (1-page PDF)',
          'All source files + usage license',
          '2 revision rounds',
        ],
        margin: '52%',
        retainerNote: '6-mo creative retainer: ₹8,500/mo · 12-mo: ₹6,500/mo',
      },
      {
        name: 'Mark',
        tagline: 'Growing SMBs, D2C brands, clinics & law firms. Full identity system + strategy.',
        price: '₹1,20,000',
        period: 'one-time',
        highlight: true,
        deliverables: [
          'Brand discovery report + competitor positioning analysis',
          'Brand strategy document (positioning, audience, personality)',
          'Logo system (primary + secondary + icon mark, all variants)',
          'Visual identity system (color system, typography, iconography, brand pattern)',
          'Brand guidelines (8–12 page PDF: do\'s/don\'ts, usage rules, color codes)',
          'Tagline + brand voice guide + 3 key messaging pillars',
          'Full collateral (card, letterhead, envelope, email sig, social kit 5 templates, brochure cover)',
          'Editable source files (Figma + Canva) + print-ready PDFs',
          '3 revision rounds + 1-hr brand walkthrough call',
        ],
        margin: '51%',
        retainerNote: '6-mo brand management: ₹14,000/mo · 12-mo: ₹11,000/mo',
      },
      {
        name: 'Signature',
        tagline: 'Established businesses & companies going through a rebrand.',
        price: '₹2,50,000',
        period: 'one-time',
        highlight: false,
        deliverables: [
          'Brand audit + competitor + market deep research',
          'Brand strategy + architecture framework',
          'Brand story + narrative (500-word manifesto)',
          'Logo system (6 concepts → all variants incl. monochrome + reversed)',
          'Complete visual identity (color system, type scale, iconography, illustration style, photography direction)',
          'Brand book (20–30 pages, print + digital PDF)',
          'Messaging framework + brand voice guide + tone variations',
          'Complete collateral (card, letterhead, brochure, pitch deck template, packaging concept, social kit 8 templates, press kit)',
          'Brand launch kit (3 announcement creatives, LinkedIn banner)',
          '4 revision rounds + 2 presentations + 1-hr final walkthrough',
        ],
        margin: '57%',
        retainerNote: '6-mo brand partnership: ₹22,000/mo · 12-mo flagship: ₹17,000/mo',
      },
    ],
    note: 'All prices excl. GST (18%). SAC 998392. IP transfers only on full payment. Payment: 50% on signing · 25% at concept presentation · 25% on final delivery.',
  },

  /* ─── CONTENT CREATION ──────────────────────────────────── */
  'content-creation': {
    slug: 'content-creation',
    service: 'Content Creation',
    category: 'Monthly Retainer',
    isRetainer: true,
    plans: [
      {
        name: 'Seed',
        tagline: 'Solopreneurs, local businesses & single-platform presence.',
        price: '₹28,000',
        period: '/mo',
        price6mo: '₹25,000',
        price12mo: '₹20,000',
        savings6mo: '~11% off',
        savings12mo: '29% off',
        totalBilled6mo: '₹1,50,000 total',
        totalBilled12mo: '₹2,40,000 total',
        highlight: false,
        deliverables: [
          'Monthly content calendar (12 posts — topics + format breakdown)',
          '12 branded social media graphics (static + carousel mix)',
          '12 captions (copy + hashtag research + CTA)',
          '2 blog posts (800–1,000 words, SEO-aware)',
          'Content scheduling setup (Buffer / Meta Business Suite)',
          'Monthly performance summary (reach, engagement, top post)',
          '1 revision round per piece',
        ],
        margin: '50%',
      },
      {
        name: 'Grow',
        tagline: 'Growing SMBs, clinics, coaches, D2C & real estate. Volume + variety.',
        price: '₹80,000',
        period: '/mo',
        price6mo: '₹70,000',
        price12mo: '₹55,000',
        savings6mo: '~13% off',
        savings12mo: '31% off',
        totalBilled6mo: '₹4,20,000 total',
        totalBilled12mo: '₹6,60,000 total',
        highlight: true,
        deliverables: [
          'Content strategy + competitor audit + monthly calendar',
          '20 social media graphics (branded — carousels, single posts, quote cards)',
          '20 captions (platform-optimized copy + CTAs + hashtags)',
          '4 Reels (scripted + edited, subtitles, music, branding overlay)',
          '4 SEO blog posts (1,000–1,200 words, keyword-targeted)',
          '1 email newsletter (design + copy, Mailchimp/Brevo-ready)',
          'Content scheduling + publishing across platforms',
          'Monthly analytics report (engagement, reach, best performers + recommendations)',
          '2 revision rounds per content piece',
        ],
        margin: '51%',
      },
      {
        name: 'Lead',
        tagline: 'Established brands & founders building personal brand. Full multi-platform.',
        price: '₹1,50,000',
        period: '/mo',
        price6mo: '₹1,30,000',
        price12mo: '₹1,10,000',
        savings6mo: '~13% off',
        savings12mo: '27% off',
        totalBilled6mo: '₹7,80,000 total',
        totalBilled12mo: '₹13,20,000 total',
        highlight: false,
        deliverables: [
          'Full content strategy (brand voice, content pillars, platform roadmap, content mix %)',
          '30 graphics (static, carousel, story — Canva source files included)',
          '30 captions (Instagram casual, LinkedIn professional, Facebook community — tone-split)',
          '8 Reels/Shorts (scripted + full edit, subtitles, trending audio, branding)',
          '6 SEO blog posts (1,200–1,500 words, keyword research included)',
          '4 LinkedIn thought leadership articles (900–1,200 words)',
          '2 email newsletters (branded HTML template, written + designed)',
          '1 YouTube script (10–15 min, shot-by-shot breakdown)',
          'Monthly analytics report (per-platform: reach, engagement, click-through)',
          'Content scheduled + published across all platforms',
          '2 revision rounds + 1 monthly strategy call (45 min)',
        ],
        margin: '51%',
      },
    ],
    note: 'All prices excl. GST (18%). SAC 998363. Monthly retainer: 100% advance on 1st of month. 6/12-month contract: 50% advance + monthly thereafter. No content published until payment cleared.',
  },
}

export const departments = Object.values(servicePricingData).map((service) => ({
  department: service.service,
  slug: service.slug,
  description: service.note ?? service.category,
  note: service.note,
  plans: service.plans.map((plan) => ({
    name: plan.name,
    tagline: plan.tagline,
    target: plan.tagline,
    popular: plan.highlight,
    highlight: plan.highlight,
    icon: '',
    durations: [
      {
        label: service.isRetainer ? 'Monthly' : 'Project',
        price: plan.price,
        type: service.isRetainer ? 'per-month' as const : 'one-time' as const,
      },
      ...(service.isRetainer && plan.price6mo
        ? [{
            label: '6 Months',
            price: plan.price6mo,
            badge: plan.savings6mo,
            totalPrice: plan.totalBilled6mo,
            type: 'per-month' as const,
          }]
        : []),
      ...(service.isRetainer && plan.price12mo
        ? [{
            label: '12 Months',
            price: plan.price12mo,
            badge: plan.savings12mo,
            totalPrice: plan.totalBilled12mo,
            type: 'per-month' as const,
          }]
        : []),
    ],
    deliverables: plan.deliverables,
    features: plan.deliverables,
  })),
}))

export const bundles: {
  name: string
  total: string
  target: string
  plans: { department: string; plan: string; price: string }[]
}[] = []
