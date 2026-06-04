import {
  Bot,
  Share2,
  Shield,
  Globe,
  PenTool,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PRICE_FROM } from "@/lib/data/priceConstants";

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  Icon: LucideIcon;
  description: string;
  features: string[];
  priceLabel: string;
  requiredAgreements: string[];
  dpaTrigger: string;
  governingLaws: string[];
  deliveryStages: number[];
  pricing: {
    label: string;
    amount: string;
    period?: string;
    highlight: boolean;
    features: string[];
    subtext?: string;
  }[];
  process: {
    step: number;
    title: string;
    summary: string;
    detail: string;
    duration: string;
  }[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "ai-automation",
    name: "AI Automation",
    tagline: "AI-powered workflow systems that reduce manual effort, remove bottlenecks, and scale operations",
    Icon: Bot,
    description:
      "Manglam Technical Agency designs, builds, integrates, and deploys AI automation systems for real business operations. We are a development and implementation partner, not a software reseller: your platform accounts, API keys, data, and subscriptions stay under your ownership while we architect the workflows that connect them.",
    features: [
      "Lead capture, qualification, routing, and timed follow-up automation",
      "WhatsApp, email, CRM, Google Workspace, calendar, and database integrations",
      "Custom AI agents, RAG knowledge systems, memory, and smart document processing",
      "Deployment, QA, handover documentation, and plan-based post-launch support",
    ],
    priceLabel: PRICE_FROM.aiAutomation,
    requiredAgreements: ["MTA-AI", "MTA-DPA", "MTA-NDA"],
    dpaTrigger:
      "Required when leads, customer records, CRM data, message history, API credentials, or AI knowledge systems process personal or confidential business data.",
    governingLaws: [
      "Indian Contract Act, 1872",
      "DPDPA, 2023",
      "IT Act, 2000",
      "Copyright Act, 1957",
    ],
    deliveryStages: [1, 2, 3, 4, 5, 6, 7, 8],
    pricing: [
      {
        label: "LaunchPad",
        amount: "₹25,000",
        period: "5-10 business days",
        highlight: false,
        features: [
          "1 designed and deployed workflow",
          "Lead capture from form, landing page, or messaging channel",
          "Auto-response messages and WhatsApp lead notifications",
          "Google Sheets logging, basic CRM, and calendar visibility",
          "Simple lead dashboard and 7 days post-launch support",
        ],
        subtext: "Basic starter automation for solo founders, freelancers, coaches, and very small teams.",
      },
      {
        label: "Growth Starter",
        amount: "₹45,000",
        period: "10-15 business days",
        highlight: true,
        features: [
          "Up to 2 automation workflows",
          "Multi-source lead capture from forms, WhatsApp, and social channels",
          "Appointment flow with calendar sync and automated reminders",
          "CRM, Google Sheets, email nurture, and team notifications",
          "Basic analytics dashboard, workflow walkthrough, and 14 days support",
        ],
        subtext: "Smart business automation for clinics, salons, gyms, agencies, real estate, and coaching institutes.",
      },
      {
        label: "SmartFlow",
        amount: "₹65,000",
        period: "15-20 business days",
        highlight: false,
        features: [
          "Up to 3 automation workflows",
          "AI-powered lead qualification and smart inquiry routing",
          "WhatsApp AI chatbot for WhatsApp Business",
          "CRM automation with AI scoring, email sequences, and team alerts",
          "Performance dashboard, team walkthrough, documentation, and 21 days support",
        ],
        subtext: "AI-enhanced automation for growing teams with multiple operational needs.",
      },
      {
        label: "Spark",
        amount: "₹95,000",
        period: "20-30 business days",
        highlight: false,
        features: [
          "Up to 3 advanced automation workflows",
          "Custom AI assistant for business communication",
          "Smart inquiry handling across WhatsApp and email",
          "Advanced CRM, sales pipeline, appointment, fallback, and reporting flows",
          "Team training, complete documentation, and 30 days support",
        ],
        subtext: "Production-grade automation infrastructure for established businesses and D2C brands.",
      },
      {
        label: "Neural",
        amount: "₹2,50,000",
        period: "30-60 business days",
        highlight: false,
        features: [
          "Custom AI agent built for a specific business function",
          "RAG knowledge base connected to business documents and policies",
          "AI memory system for personalized customer interactions",
          "Voice AI, advanced CRM, and custom workflow scope where applicable",
          "Performance monitoring, onboarding, AI tuning guide, and full documentation",
        ],
        subtext: "Custom AI agent infrastructure for businesses ready to make AI a core operating layer.",
      },
      {
        label: "Cortex",
        amount: "₹6,00,000+",
        period: "60+ business days",
        highlight: false,
        features: [
          "Enterprise-scale multi-agent architecture across departments",
          "Voice AI and complete internal AI operating system design",
          "Unlimited enterprise workflows scoped per project",
          "Multi-source RAG, enterprise integrations, and full infrastructure setup",
          "Dedicated team, full support model, and enterprise-grade documentation",
        ],
        subtext: "A fully custom AI operating system for organizations that need multi-agent infrastructure.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Initial Inquiry & Discovery",
        summary: "Understand the business, current tools, goals, and automation needs.",
        detail:
          "We learn how your operation actually works, identify repetitive tasks, and decide whether the right starting point is lead management, customer communication, internal operations, sales automation, or AI agent infrastructure.",
        duration: "1-2 days",
      },
      {
        step: 2,
        title: "Scope Document & Approval",
        summary: "Every workflow, integration, AI component, and deliverable is written down.",
        detail:
          "The approved scope document becomes the single source of truth. Nothing is assumed: workflow counts, business logic, platforms, dashboards, support period, and handover expectations are confirmed before development begins.",
        duration: "2-4 days",
      },
      {
        step: 3,
        title: "Invoice & Advance Payment",
        summary: "The project is commercially locked before build work starts.",
        detail:
          "Small and medium plans use a 50% advance and 50% final payment before deployment. Neural and Cortex engagements use milestone schedules defined during scoping.",
        duration: "Before development",
      },
      {
        step: 4,
        title: "Platform Setup & Access",
        summary: "Client-owned APIs, tools, and credentials are connected securely.",
        detail:
          "You provide required API keys and platform access for OpenAI, Claude, Gemini, WhatsApp Business API, Twilio, CRM, Google Workspace, Make.com, n8n, databases, or hosting as needed. We configure connectivity without reselling those platforms.",
        duration: "1-3 days",
      },
      {
        step: 5,
        title: "Development & Build",
        summary: "Workflow logic, integrations, AI prompts, and system components are assembled.",
        detail:
          "We map triggers, conditions, actions, branching paths, error handling, fallbacks, AI routing, prompt behavior, dashboards, and data movement between systems.",
        duration: "Plan-dependent",
      },
      {
        step: 6,
        title: "Internal Testing & QA",
        summary: "All workflow paths and edge cases are tested before client review.",
        detail:
          "We test triggers, CRM writes, WhatsApp/email sends, calendar actions, AI responses, rate-limit behavior, fallback logic, and dashboard output before handover.",
        duration: "2-5 days",
      },
      {
        step: 7,
        title: "Client Review & Revisions",
        summary: "You test the staged system and give feedback inside the approved scope.",
        detail:
          "Revisions that match the approved scope are applied before launch. New workflows, new integrations, or changed business logic are handled through a change order or separate project.",
        duration: "2-5 days",
      },
      {
        step: 8,
        title: "Deployment & Handover",
        summary: "The system goes live with onboarding, documentation, and support.",
        detail:
          "Final payment clears the project for go-live. We deploy the workflows, provide system walkthroughs, deliver documentation, and begin the included post-launch support period.",
        duration: "1-2 days",
      },
    ],
    faqs: [
      {
        q: "Do you sell OpenAI, WhatsApp, CRM, hosting, or automation platform subscriptions?",
        a: "No. MTA charges only for workflow design, architecture, development, integration, testing, deployment support, documentation, and plan-based support. AI APIs, WhatsApp Business API, Twilio, cloud hosting, CRM tools, databases, Make.com, n8n cloud, and other software subscriptions are purchased and controlled directly by the client.",
      },
      {
        q: "Why are API and platform costs separate from your fees?",
        a: "Every business uses platforms at a different scale. A solo coach sending 50 WhatsApp messages has different usage costs from a D2C brand sending 50,000. Keeping costs separate preserves billing transparency, platform ownership, usage visibility, and zero vendor lock-in.",
      },
      {
        q: "What do clients need to provide before development can move quickly?",
        a: "Clients need to provide API keys, platform access, CRM or WhatsApp Business access, business workflow details, response templates, routing rules, team structure, timely feedback, and milestone approvals. Delays in access or approvals can delay delivery.",
      },
      {
        q: "What does post-launch support include?",
        a: "Support covers bug fixes, workflow monitoring, troubleshooting, and optimization for the workflows delivered inside the approved scope. It does not include new features, major redesigns, new integrations, or issues caused by third-party platform outages.",
      },
      {
        q: "Can AI responses be guaranteed to be perfect?",
        a: "No. AI language models can produce inaccurate, off-brand, or inconsistent responses. We reduce this risk through structured prompts, RAG knowledge systems, testing, monitoring, and tuning, but human oversight remains important.",
      },
      {
        q: "How is data privacy handled?",
        a: "Client information, workflow documents, CRM data, lead data, customer records, API keys, and credentials are treated as confidential. Credentials are used only for agreed integrations and are not shared externally. Clients remain responsible for account security, access control, platform billing, and applicable compliance obligations such as DPDPA.",
      },
    ],
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    tagline:
      "Meta Ads management, creative production, and growth campaigns",
    Icon: Share2,
    description:
      "We run Meta Ads and social growth campaigns for Indian businesses. Creative production, tracking setup, and ongoing optimization — with compliance-aware data handling built in.",
    features: [
      "Campaign strategy & objective setting",
      "Meta Pixel / CAPI / custom event setup",
      "Creative production for static, carousel, and short-form assets",
      "Retargeting, lookalikes, and audience testing",
    ],
    priceLabel: PRICE_FROM.socialMedia,
    requiredAgreements: ["MTA-DM", "MTA-DPA", "MTA-NDA", "MTA-AIE"],
    dpaTrigger:
      "Required when audience data, lead forms, CRM sync, or social automation handles personal data.",
    governingLaws: [
      "Indian Contract Act, 1872",
      "ASCI Guidelines, 2021",
      "Consumer Protection Act, 2019",
      "DPDPA, 2023",
      "IT Amendment Rules, 2026 (SGI Labeling)",
    ],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: "Starter",
        amount: "₹18,000/mo",
        period: "1-month entry",
        highlight: false,
        features: [
          "Campaign strategy & objective setting",
          "Facebook Pixel / CAPI setup",
          "2 ad creatives/month (static)",
          "1 active campaign with up to 2 ad sets",
          "Audience research + targeting setup",
          "Monthly performance report",
          "1 revision round per creative",
          "WhatsApp/email support (24 hr)",
        ],
      },
      {
        label: "Growth",
        amount: "₹35,000/mo",
        period: "1-month starting",
        highlight: true,
        features: [
          "Full-funnel campaign strategy (awareness → conversion)",
          "Pixel + conversion API setup + custom events",
          "4-6 ad creatives/month (static + carousel)",
          "Up to 3 campaigns and 6 ad sets",
          "A/B testing for creatives and audiences",
          "Lookalike + retargeting audience setup",
          "Bi-weekly performance calls (30 min)",
          "Weekly snapshot + monthly deep-dive report",
          "Competitor ad audit (monthly)",
          "2 revision rounds per creative",
          "WhatsApp/email support (12 hr)",
        ],
      },
      {
        label: "Scale",
        amount: "₹65,000/mo",
        period: "1-month starting",
        highlight: false,
        features: [
          "Comprehensive media strategy (FB + IG + Reels + Stories)",
          "Full Pixel, CAPI, and GA4 integration",
          "8-10 creatives/month (static + video + UGC-style reels)",
          "Unlimited campaigns and ad sets within scope",
          "Full-funnel A/B testing across creative, audience, and placement",
          "Retargeting, lookalike, broad, and interest-based stacking",
          "Dynamic product ads when catalog is available",
          "Weekly performance calls (45 min)",
          "Weekly detailed report + monthly strategy review",
          "Dedicated account manager and priority support",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Offer Mapping",
        summary: "Budget, goals, and targeting review.",
        detail:
          "We map the client offer, audience, and ad spend boundaries before any account work begins.",
        duration: "3 days",
      },
      {
        step: 2,
        title: "Tracking Stack Setup",
        summary: "Pixel, CAPI, and event validation.",
        detail:
          "We configure tracking, conversion events, and audience architecture so spend is measurable from day one.",
        duration: "2-4 days",
      },
      {
        step: 3,
        title: "Creative Production & Launch",
        summary: "Assets and campaigns go live.",
        detail:
          "We build the ad assets, launch campaigns, and keep a documented revision trail for every asset.",
        duration: "Ongoing",
      },
      {
        step: 4,
        title: "Optimize & Report",
        summary: "Weekly optimization cadence.",
        detail:
          "We review performance, shift budget, and iterate creative based on actual conversion signals.",
        duration: "Weekly / monthly",
      },
    ],
    faqs: [
      {
        q: "Do you handle ad spend?",
        a: "No. Meta spend is paid directly by the client. We manage strategy, creatives, tracking, and optimization, while the ad account remains under client control.",
      },
      {
        q: "What does ASCI compliance mean here?",
        a: "We avoid misleading claims, use proper sponsored-content disclosure, and keep ad copy aligned with Indian advertising standards.",
      },
      {
        q: "What about DPDP Act compliance?",
        a: "Audience data, lead forms, and CRM sync are handled with consent-aware workflows, audit trails, and data minimization.",
      },
      {
        q: "Can I start with one month?",
        a: "Yes. The Starter plan is available as a one-month entry point. Six- and twelve-month commitments reduce the monthly fee.",
      },
      {
        q: "How do the discounts work?",
        a: "The 6-month and 12-month commitments are pre-priced in the table. Longer terms lower the monthly fee while keeping the same scope envelope.",
      },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    tagline: "Ethical hacking, VAPT, and DPDP compliance for Indian businesses",
    Icon: Shield,
    description:
      "Security assessments using PTES methodology. VAPT, compliance gap analysis, and incident response — with clear reporting and remediation paths.",
    features: [
      "PTES methodology penetration testing",
      "DPDP Act compliance assessment",
      "Web application and API security testing",
      "Social engineering simulation",
      "Network vulnerability testing",
      "Remediation roadmap and retesting",
    ],
    priceLabel: PRICE_FROM.cybersecurity,
    requiredAgreements: ["MTA-CS", "MTA-NDA", "MTA-DPA", "MTA-ROE"],
    dpaTrigger:
      "Required for all engagements processing personal data under DPDP Act 2023.",
    governingLaws: [
      "IT Act, 2000 (Sections 43, 66 & 70B)",
      "DPDPA, 2023 (Sections 8, 12-15)",
      "CERT-In Directions, 2022",
      "Indian Contract Act, 1872",
      "GDPR (for EU data subjects)",
    ],
    deliveryStages: [2, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: "Shield",
        amount: "₹50,000",
        period: "1-month assessment",
        highlight: false,
        features: [
          "Email security audit",
          "Basic VAPT (up to 5 pages/endpoints)",
          "DPDP gap assessment",
          "Phishing simulation",
          "Executive summary",
          "15-day support",
        ],
      },
      {
        label: "Guard",
        amount: "₹1,30,000",
        period: "1-month engagement",
        highlight: true,
        features: [
          "Full VAPT web app + API",
          "Network VAPT up to 10 IPs",
          "Social engineering simulation",
          "DPDP / RBI compliance assessment",
          "Staff training session",
          "Remediation roadmap",
        ],
      },
      {
        label: "Fortress",
        amount: "₹2,50,000",
        period: "1-month engagement",
        highlight: false,
        features: [
          "Full-scope VAPT web + API + network + WiFi",
          "Social engineering and onsite physical test",
          "ISO 27001 gap assessment",
          "DPDP + sector compliance mapping",
          "Board-level report",
          "2-day onsite engagement",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Pre-engagement",
        summary: "RoE + NDA + scope definition",
        detail:
          "We define the Rules of Engagement, execute NDA/DPA, and establish precise testing scope boundaries. All stakeholders align on testing windows and emergency contacts.",
        duration: "2-3 days",
      },
      {
        step: 2,
        title: "Intelligence Gathering & Threat Modeling",
        summary: "OSINT, DFD, LINDDUN/STRIDE analysis",
        detail:
          "We gather open-source intelligence, create Data Flow Diagrams, and apply LINDDUN/STRIDE frameworks to identify privacy and security threat vectors affecting PII.",
        duration: "3-5 days",
      },
      {
        step: 3,
        title: "Vulnerability Analysis & Exploitation",
        summary: "OWASP testing, controlled exploitation with proof-of-concept",
        detail:
          "We execute OWASP Top 10:2025 testing, perform controlled exploitation with documented proof-of-concept, and maintain detailed evidence chains for all findings.",
        duration: "5-10 days",
      },
      {
        step: 4,
        title: "Reporting & Remediation",
        summary:
          "Executive + technical reports, DPDP readiness notes, retest",
        detail:
          "We deliver executive summaries and detailed technical reports with CVSS scoring, add DPDP readiness notes where applicable, and conduct remediation retests.",
        duration: "2-3 days",
      },
    ],
    faqs: [
      {
        q: "What is PTES and why does MTA use it?",
        a: "PTES (Penetration Testing Execution Standard) is the 7-phase methodology we follow for security assessments. It covers pre-engagement through reporting — each phase has clear deliverables. We use it because it produces thorough, documented results that clients can act on.",
      },
      {
        q: "What is the DPDP 24-hour breach notification requirement?",
        a: "Under DPDP Act 2023, MTA (as Data Processor) notifies the client within 24 hours of detecting a breach. The client then has 72 hours to report to the Data Protection Board. Our contracts spell out these roles and timelines clearly.",
      },
      {
        q: "What's the difference between Gray-box, White-box, and Black-box testing?",
        a: "Gray-box (our default) gives testers limited credentials to simulate an insider threat. White-box provides full source code access for deeper analysis. Black-box starts from scratch like an external attacker. Gray-box gives the best balance of depth and cost for most engagements.",
      },
      {
        q: "Do you provide proof-of-concept exploits without disrupting production?",
        a: "Yes. All exploitation is conducted under strict controlled conditions with immediate cleanup. We never establish persistent backdoors, never execute denial-of-service attacks, and require explicit written approval for any action that could impact production availability. Test environments are preferred for high-risk exploits.",
      },
    ],
  },
  {
    slug: "saas-products",
    name: "App & Website Development",
    tagline: "Professional websites, web apps, and custom digital platforms built for speed, credibility, and scale",
    Icon: Globe,
    description:
      "Manglam Technical Agency designs, builds, integrates, and deploys modern websites and web applications that help businesses establish a professional digital presence. We are your development and implementation partner, not a platform reseller or template factory: hosting, domains, CMS tools, and third-party services stay owned and paid directly by you.",
    features: [
      "Custom websites, landing pages, portfolios, corporate sites, and event microsites",
      "Full-stack web applications with auth, dashboards, APIs, databases, and admin panels",
      "CMS, e-commerce, payment, analytics, email, CRM, and third-party API integrations",
      "Deployment, performance optimization, SEO baseline, documentation, and post-launch support",
    ],
    priceLabel: PRICE_FROM.saasWeb,
    requiredAgreements: ["MTA-SL", "MTA-DPA", "MTA-NDA"],
    dpaTrigger:
      "Required when the website or app includes user accounts, forms, analytics, payments, databases, customer portals, CMS workflows, or any personal data processing.",
    governingLaws: [
      "Indian Contract Act, 1872",
      "Copyright Act, 1957",
      "DPDPA, 2023",
      "IT Act, 2000",
    ],
    deliveryStages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: "Starter Site",
        amount: "₹25,000",
        period: "5-10 business days",
        highlight: false,
        features: [
          "1-3 page professional website",
          "Custom design using your brand colors and logo",
          "Mobile-responsive layout with working contact form",
          "Social links, SEO basics, sitemap, Open Graph, and analytics",
          "Vercel/Netlify deployment guidance and 7 days support",
        ],
        subtext: "A clean digital presence for freelancers, consultants, coaches, creators, and small local providers.",
      },
      {
        label: "Business Site",
        amount: "₹55,000",
        period: "10-15 business days",
        highlight: true,
        features: [
          "Up to 5 page business website",
          "Headless CMS for easy content updates",
          "Advanced validated forms and blog/news section",
          "Full SEO pack, structured data, robots.txt, caching, and image optimization",
          "Content management walkthrough and 14 days support",
        ],
        subtext: "A credibility-focused multi-page website for SMEs, clinics, restaurants, real estate, and institutes.",
      },
      {
        label: "Pro Web App",
        amount: "₹1,25,000",
        period: "15-25 business days",
        highlight: false,
        features: [
          "Full-stack web application with Next.js, TypeScript, Tailwind, and PostgreSQL",
          "Authentication, database schema, dashboard, and API endpoints",
          "Custom component library with brand styling",
          "Security basics, CI/CD, analytics, error monitoring, and 90+ Lighthouse target",
          "Technical documentation, team walkthrough, and 21 days support",
        ],
        subtext: "For startups, growing businesses, portals, dashboards, storefronts, and database-driven products.",
      },
      {
        label: "Enterprise Suite",
        amount: "₹3,50,000",
        period: "30-60 business days",
        highlight: false,
        features: [
          "Production-grade platform with multiple feature modules",
          "Advanced auth with role-based access control",
          "Database architecture, caching, integrations, admin panel, and documented APIs",
          "Security review, load testing, monitoring, uptime alerts, and 95+ Lighthouse target",
          "Complete documentation, comprehensive training, and 30 days support",
        ],
        subtext: "For established companies that need a serious system handling real business operations.",
      },
      {
        label: "Custom Build",
        amount: "₹6,00,000+",
        period: "60+ business days",
        highlight: false,
        features: [
          "Fully custom architecture designed for your use case",
          "Best-fit stack, unlimited feature scope, and integrations defined during discovery",
          "Enterprise-grade security and cloud infrastructure setup",
          "Multi-environment CI/CD, runbooks, and dedicated development team",
          "Support and maintenance scoped per project requirements",
        ],
        subtext: "For large organizations, multi-tenant platforms, enterprise portals, and unique technical requirements.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Initial Inquiry & Discovery",
        summary: "Understand the business, audience, goals, and technical requirements.",
        detail:
          "We review what you want to build, who it serves, whether you need a website, web app, CMS, store, portal, or custom platform, and what success should look like.",
        duration: "1-2 days",
      },
      {
        step: 2,
        title: "Proposal & Scope Document",
        summary: "Pages, features, stack, timeline, and cost are documented before work starts.",
        detail:
          "The approved scope document defines every page, feature, integration, design element, deliverable, support period, and out-of-scope boundary. Nothing is assumed.",
        duration: "2-4 days",
      },
      {
        step: 3,
        title: "Design Phase",
        summary: "Wireframes and mockups establish the visual direction.",
        detail:
          "You review layouts, information hierarchy, visual direction, and key interface patterns before development begins. Revisions are applied inside the approved scope.",
        duration: "Plan-dependent",
      },
      {
        step: 4,
        title: "Invoice & Advance Payment",
        summary: "The project is commercially locked before development starts.",
        detail:
          "Starter Site, Business Site, and Pro Web App use a 50% advance and 50% final payment. Enterprise Suite and Custom Build use milestone schedules agreed in writing.",
        duration: "Before development",
      },
      {
        step: 5,
        title: "Development & Build",
        summary: "Frontend, backend, integrations, content, and infrastructure are assembled.",
        detail:
          "We build responsive UI, APIs, database flows, CMS models, auth, payment, analytics, email, monitoring, and other scoped integrations using the agreed stack.",
        duration: "Plan-dependent",
      },
      {
        step: 6,
        title: "Internal Testing & QA",
        summary: "The site or app is tested across browsers, devices, and edge cases.",
        detail:
          "We verify layout, forms, navigation, API behavior, database queries, integrations, responsive states, performance, SEO basics, security headers, and deployment readiness.",
        duration: "2-5 days",
      },
      {
        step: 7,
        title: "Client Review & Revisions",
        summary: "You test the staged build and provide feedback inside scope.",
        detail:
          "Revisions matching the approved scope are applied before go-live. New pages, features, integrations, or redesign requests are handled through a change order or separate project.",
        duration: "2-5 days",
      },
      {
        step: 8,
        title: "Deployment & Go-Live",
        summary: "Production deployment, DNS, SSL, and launch checks are completed.",
        detail:
          "The site is deployed to your hosting account, DNS is configured, SSL is verified, final payment is collected, and the launch checklist is completed.",
        duration: "1-2 days",
      },
      {
        step: 9,
        title: "Post-Launch Monitoring",
        summary: "Initial support monitors performance, issues, and unexpected behavior.",
        detail:
          "During the plan-based support window we watch for rendering issues, form errors, API integration failures, degraded performance, and critical security updates.",
        duration: "7-30 days",
      },
      {
        step: 10,
        title: "Handover & Documentation",
        summary: "Credentials, documentation, and training are delivered.",
        detail:
          "We hand over admin access, code/documentation, CMS or dashboard walkthroughs, deployment notes, and operating guidance so your team can manage the system responsibly.",
        duration: "At handover",
      },
    ],
    faqs: [
      {
        q: "Do you sell hosting, domains, CMS licenses, or SaaS subscriptions?",
        a: "No. MTA charges only for design, development, integration, deployment, support, and documentation. Hosting, domains, CMS plans, email tools, payment gateway fees, maps, analytics, monitoring, and other third-party services are purchased and controlled directly by the client.",
      },
      {
        q: "Why are third-party costs separate?",
        a: "Separate billing keeps ownership and pricing transparent. You control your hosting, domain, platform accounts, data, usage history, and invoices. There are no bundled hosting markups or vendor lock-in.",
      },
      {
        q: "What do I need to provide before the project can move quickly?",
        a: "You should provide logo and brand assets, final text content, images, hosting access, domain/DNS access, CMS or GitHub access if needed, analytics/search console access, payment or email API keys where applicable, and a single point of contact for approvals.",
      },
      {
        q: "What is included in post-launch support?",
        a: "Support covers bug fixes, rendering issues, form problems, broken links, scoped integration issues, performance monitoring, troubleshooting, and critical security patches during the included support period. New pages, new features, redesigns, and content writing are separate work.",
      },
      {
        q: "Can you guarantee rankings, traffic, conversion, or 100% uptime?",
        a: "No. We build the technical foundation: fast pages, responsive UI, SEO metadata, structured data, security headers, monitoring, and clean implementation. Rankings, traffic, conversions, and uptime also depend on content, marketing, hosting providers, competition, and external platforms.",
      },
      {
        q: "How is privacy and credential security handled?",
        a: "Project requirements, API keys, hosting credentials, customer data, business information, mockups, and proprietary concepts are treated as confidential. Shared credentials are used only for agreed development and testing. Clients remain responsible for account security, 2FA, access control, legal compliance, and content accuracy.",
      },
    ],
  },
  {
    slug: "branding",
    name: "Branding",
    tagline: "Logo design, brand guidelines, and visual identity systems",
    Icon: PenTool,
    description:
      "We design brand identities — logos, color systems, typography, and full guidelines. Every asset is delivered with full IP rights, no licensing strings attached.",
    features: [
      "Logo and visual mark design",
      "Comprehensive brand guidelines",
      "Color systems and typography rules",
      "Full IP transfer on delivery",
    ],
    priceLabel: PRICE_FROM.branding,
    requiredAgreements: ["MTA-NDA"],
    dpaTrigger:
      "Not usually required. Only if the engagement involves audience data or personal information.",
    governingLaws: [
      "Indian Contract Act, 1872",
      "Copyright Act, 1957",
      "Trade Marks Act, 1999",
    ],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: "Stamp",
        amount: "₹35,000",
        period: "1-month build",
        highlight: false,
        features: [
          "Logo design",
          "Business card",
          "Letterhead",
          "Social kit",
          "Brand mini-guide",
        ],
      },
      {
        label: "Mark",
        amount: "₹1,20,000",
        period: "1-month build",
        highlight: true,
        features: [
          "Brand discovery",
          "Positioning statement",
          "Logo system",
          "Visual identity system",
          "Brand guidelines",
        ],
      },
      {
        label: "Signature",
        amount: "₹2,50,000",
        period: "1-month build",
        highlight: false,
        features: [
          "Brand audit",
          "Brand architecture",
          "Full visual identity",
          "Brand book",
          "Launch kit",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery",
        summary: "Understanding the company ethos.",
        detail:
          "We unpack why you exist, who you serve, and how you need to sound/look.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Concept Sprints",
        summary: "Iterative visual directions.",
        detail:
          "We present 2-3 distinct brand directions showing logo usage, colors, and type in context.",
        duration: "2 weeks",
      },
      {
        step: 3,
        title: "Refinement",
        summary: "Zeroing in on the winner.",
        detail: "Feedback cycles to perfect the chosen direction.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Handover",
        summary: "IP-clear delivery.",
        detail:
          "You receive the comprehensive brand guideline book and native vector files. We claim no ongoing IP rights.",
        duration: "3 days",
      },
    ],
    faqs: [
      {
        q: "Do I own the logo?",
        a: "Yes. We provide a full IP copyright transfer upon final payment. It is your asset.",
      },
      {
        q: "Do you provide print materials?",
        a: "We provide the digital, print-ready source files. You can take these to any vendor for physical production.",
      },
    ],
  },
  {
    slug: "content-creation",
    name: "Content Creation",
    tagline: "Blog posts, social content, and brand writing",
    Icon: PenTool,
    description:
      "Content production for businesses that need regular blogs, social media posts, and long-form articles. Human-edited, SEO-aware, and delivered on schedule.",
    features: [
      "Blog posts and SEO articles",
      "Social media graphics and captions",
      "Reels and short-form video scripts",
      "Newsletters and brand writing",
    ],
    priceLabel: PRICE_FROM.contentCreation,
    requiredAgreements: ["MTA-NDA"],
    dpaTrigger:
      "Only required when content workflows process personal data from forms or CRM exports.",
    governingLaws: [
      "Indian Contract Act, 1872",
      "Copyright Act, 1957",
      "DPDPA, 2023",
    ],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: "Seed",
        amount: "₹28,000",
        period: "1-month package",
        highlight: false,
        features: [
          "12 social graphics",
          "12 captions + hashtags",
          "2 blog posts",
          "Scheduling setup",
          "Monthly summary",
        ],
      },
      {
        label: "Grow",
        amount: "₹80,000",
        period: "1-month package",
        highlight: true,
        features: [
          "20 graphics",
          "20 captions",
          "4 reels scripts / edits",
          "4 SEO blog posts",
          "1 newsletter",
          "Monthly analytics",
        ],
      },
      {
        label: "Lead",
        amount: "₹1,50,000",
        period: "1-month package",
        highlight: false,
        features: [
          "30 graphics",
          "30 captions",
          "8 reels / shorts",
          "6 SEO blog posts",
          "4 LinkedIn posts",
          "2 newsletters",
          "1 YouTube script",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Strategy & Voice",
        summary: "Define the content system.",
        detail:
          "We map audience, content pillars, and voice rules before writing begins.",
        duration: "3 days",
      },
      {
        step: 2,
        title: "Production",
        summary: "Write and design the assets.",
        detail:
          "We create blogs, graphics, and scripts with human editing and quality control throughout.",
        duration: "1-2 weeks",
      },
      {
        step: 3,
        title: "Review & Schedule",
        summary: "Refinement and publishing prep.",
        detail:
          "We collect feedback, revise, and prep assets for publication or handover.",
        duration: "Ongoing",
      },
    ],
    faqs: [
      {
        q: "Do you use AI for the writing?",
        a: "Yes, but only as a research and structuring helper. Every final asset is human-edited and fact-checked before delivery.",
      },
      {
        q: "Can you publish for us?",
        a: "Yes. We can hand over ready-to-post assets or schedule them in your content calendar.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
