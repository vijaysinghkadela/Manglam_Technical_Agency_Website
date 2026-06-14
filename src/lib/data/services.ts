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
    slug: "performance-marketing",
    name: "Performance Marketing",
    tagline:
      "Lead generation, paid acquisition, retargeting, and measurable growth campaigns",
    Icon: Share2,
    description:
      "Manglam Technical Agency plans, launches, monitors, and optimizes performance marketing systems for businesses that need measurable enquiries, WhatsApp conversations, calls, leads, traffic, and sales conversations. Management fees cover strategy, setup, copy direction, tracking, optimization, reporting, and recommendations; ad spend, ad accounts, landing pages, CRM tools, and creative production costs stay separate unless scoped in writing.",
    features: [
      "Lead generation campaigns across forms, calls, websites, and click-to-WhatsApp flows",
      "Meta Ads, Instagram, Facebook, Messenger, and WhatsApp placement planning",
      "Google Search and YouTube intent campaigns with conversion-path recommendations",
      "Retargeting, funnel sequencing, lead-quality review, and performance reporting",
    ],
    priceLabel: PRICE_FROM.socialMedia,
    requiredAgreements: ["MTA-DM", "MTA-DPA", "MTA-NDA", "MTA-AIE"],
    dpaTrigger:
      "Required when lead forms, click-to-WhatsApp flows, CRM exports, audience lists, conversion tracking, or campaign reporting process personal data.",
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
          "Market, offer, and audience review",
          "1 active lead or traffic campaign",
          "Meta Ads campaign setup with up to 2 ad sets",
          "Ad copy direction and basic creative recommendations",
          "Pixel or lead-flow tracking checklist",
          "Monthly report covering spend, leads, CPL, and next actions",
        ],
      },
      {
        label: "Growth",
        amount: "₹35,000/mo",
        period: "1-month starting",
        highlight: true,
        features: [
          "Full funnel plan for awareness, lead capture, and retargeting",
          "Up to 3 active campaigns across Meta and/or Google Search",
          "Audience structure, keyword intent review, and campaign architecture",
          "Creative testing plan and copywriting for ad variations",
          "Retargeting audiences and conversion path recommendations",
          "Weekly optimization notes plus monthly performance report",
        ],
      },
      {
        label: "Scale",
        amount: "₹65,000/mo",
        period: "1-month starting",
        highlight: false,
        features: [
          "Multi-channel acquisition system across Meta, Search, YouTube, and retargeting",
          "Advanced campaign segmentation by intent, geography, audience, and funnel stage",
          "Lead-quality feedback loop with sales or CRM team",
          "Landing page, WhatsApp, call, and form conversion recommendations",
          "Creative fatigue monitoring and structured test roadmap",
          "Weekly review cadence, monthly strategy review, and priority support",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Market & Audience Review",
        summary: "Clarify offer, audience, funnel, and lead-quality expectations.",
        detail:
          "We review the product or service, target geography, customer intent, previous campaign performance, sales follow-up capacity, and the conversion action that matters most: lead form, call, website form, or WhatsApp conversation.",
        duration: "2-3 days",
      },
      {
        step: 2,
        title: "Campaign Architecture",
        summary: "Build channel, objective, audience, and budget structure.",
        detail:
          "We define campaign objectives, ad groups, audience layers, keyword or placement logic, budget split, exclusions, retargeting pools, and success metrics before launch.",
        duration: "2-4 days",
      },
      {
        step: 3,
        title: "Copy, Tracking & Launch",
        summary: "Prepare ad copy, conversion paths, lead flow, and launch checks.",
        detail:
          "We write or direct ad copy, recommend creative angles, verify lead flow, align tracking where access permits, and launch campaigns from client-owned ad accounts.",
        duration: "3-5 days",
      },
      {
        step: 4,
        title: "Optimization & Reporting",
        summary: "Improve CPL, lead quality, and campaign efficiency over time.",
        detail:
          "We monitor spend, results, CPL, conversion rate, lead quality, creative fatigue, and audience response, then provide recommendations for budget, copy, targeting, landing pages, and follow-up readiness.",
        duration: "Weekly / monthly",
      },
    ],
    faqs: [
      {
        q: "Do you handle ad spend?",
        a: "No. Ad spend is paid directly by the client to Meta, Google, or any other platform. MTA charges management fees for planning, setup, optimization, reporting, and advisory work.",
      },
      {
        q: "Can you guarantee leads or sales?",
        a: "No responsible agency can guarantee platform outcomes. We control strategy, campaign structure, testing, tracking discipline, reporting, and recommendations; final results also depend on offer, market demand, follow-up speed, budget, competition, landing pages, and platform behavior.",
      },
      {
        q: "Which businesses are a good fit?",
        a: "Performance marketing works well for local service providers, institutes, clinics, salons, real estate, e-commerce, startups, SMEs, and any business that can respond quickly to leads and measure enquiry quality.",
      },
      {
        q: "Are landing pages, CRM tools, or creatives included?",
        a: "Only if scoped separately. Website pages, CRM subscriptions, WhatsApp tools, automation platforms, ad account costs, and creative production costs are separate from campaign management fees unless written into the proposal.",
      },
      {
        q: "How is data privacy handled?",
        a: "Lead data, audience lists, reports, and campaign access are treated as confidential. We use the minimum access needed, keep client accounts under client ownership, and map lead-handling flows to consent-aware DPDP practices where applicable.",
      },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    tagline: "Vulnerability assessment, penetration testing, compliance support, and incident response",
    Icon: Shield,
    description:
      "Manglam Technical Agency helps organizations identify, prioritize, and remediate security weaknesses through structured vulnerability assessment, penetration testing, security audits, hardening, awareness training, and incident response. Engagements are scoped under clear Rules of Engagement and aligned with practical frameworks such as ISO 27001, SOC 2, NIST, DPDP, and CERT-In expectations where relevant.",
    features: [
      "Vulnerability assessment for websites, networks, cloud assets, and business infrastructure",
      "Web application, API, network, wireless, cloud, and Active Directory penetration testing",
      "Cybersecurity audits, policy development, third-party risk, and compliance consulting",
      "Incident response, digital forensics, hardening, and security awareness training",
    ],
    priceLabel: PRICE_FROM.cybersecurity,
    requiredAgreements: ["MTA-CS", "MTA-NDA", "MTA-DPA", "MTA-ROE"],
    dpaTrigger:
      "Required when testing, audits, incident response, forensics, logs, access reviews, or compliance work involves personal data, employee records, customer records, credentials, or sensitive business systems.",
    governingLaws: [
      "IT Act, 2000",
      "CERT-In Directions, 2022",
      "DPDPA, 2023",
      "Indian Contract Act, 1872",
      "ISO 27001 / SOC 2 / NIST alignment where scoped",
    ],
    deliveryStages: [2, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: "Basic VA",
        amount: "₹30,000-₹50,000",
        period: "Small business assessment",
        highlight: false,
        features: [
          "External vulnerability assessment",
          "Website and infrastructure scan",
          "Misconfiguration and CVE review",
          "Prioritized remediation report",
          "Executive summary and fix checklist",
        ],
      },
      {
        label: "Web App VAPT",
        amount: "₹50,000-₹2,50,000",
        period: "Application security engagement",
        highlight: true,
        features: [
          "OWASP web application testing",
          "API and authentication review",
          "Controlled exploitation with evidence",
          "CVSS scoring and remediation roadmap",
          "Retest option after fixes",
        ],
      },
      {
        label: "Security Retainer",
        amount: "₹25,000/mo+",
        period: "Monthly security support",
        highlight: false,
        features: [
          "Monthly vulnerability review",
          "Hardening and remediation guidance",
          "Awareness training support",
          "Policy and compliance advisory",
          "Incident response readiness",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Assessment & Authorization",
        summary: "RoE, NDA, scope, assets, and testing boundaries are approved first.",
        detail:
          "We define Rules of Engagement, authorized assets, test windows, success criteria, contacts, exclusions, and evidence-handling expectations before any security work begins.",
        duration: "2-3 days",
      },
      {
        step: 2,
        title: "Analysis & Testing",
        summary: "Discovery, scanning, manual validation, and controlled exploitation.",
        detail:
          "We identify attack surface, enumerate services, review exposed technologies, run vulnerability analysis, manually validate findings, and perform controlled exploitation only inside the approved scope.",
        duration: "3-10 days",
      },
      {
        step: 3,
        title: "Mitigation & Implementation",
        summary: "Prioritized findings, remediation roadmap, and hardening guidance.",
        detail:
          "We deliver findings with severity, business impact, evidence, likely root cause, fix guidance, and a practical roadmap for remediation, hardening, and risk reduction.",
        duration: "2-4 days",
      },
      {
        step: 4,
        title: "Monitoring & Continuous Improvement",
        summary: "Retesting, training, policy updates, and ongoing readiness where scoped.",
        detail:
          "Where included, we retest remediated issues, improve controls, support awareness training, update policies, and prepare teams for incident response and compliance evidence.",
        duration: "Retainer or scoped follow-up",
      },
    ],
    faqs: [
      {
        q: "What cybersecurity services do you provide?",
        a: "We provide vulnerability assessment, penetration testing, web app and API security testing, network/cloud/wireless assessment, policy development, cybersecurity audits, third-party risk review, hardening, awareness training, incident response, and digital forensics support.",
      },
      {
        q: "Do you perform testing without written authorization?",
        a: "No. Security testing starts only after scope, ownership, Rules of Engagement, testing windows, and approval are documented. We do not test assets the client is not authorized to assess.",
      },
      {
        q: "What frameworks can reports align with?",
        a: "Depending on scope, reports can map recommendations to practical controls from ISO 27001, SOC 2, NIST, DPDP, CERT-In expectations, OWASP, and sector-specific requirements.",
      },
      {
        q: "Do you help after the report is delivered?",
        a: "Yes. Depending on the plan, we can provide remediation guidance, retesting, policy support, hardening, training, monthly reviews, or incident response readiness as a follow-up or retainer.",
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
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
