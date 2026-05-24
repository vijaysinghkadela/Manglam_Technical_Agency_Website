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
    tagline: "Custom AI agents, RAG pipelines, and workflow automation for Indian businesses",
    Icon: Bot,
    description:
      "We build AI automation that fits your actual operations. Chatbots, document processors, workflow triggers — deployed on your infrastructure or ours.",
    features: [
      "Workflow engineering with n8n",
      "RAG knowledge bases from your documents",
      "WhatsApp AI bots",
      "LLM prompt tuning and optimization",
    ],
    priceLabel: PRICE_FROM.aiAutomation,
    requiredAgreements: ["MTA-AI", "MTA-DPA", "MTA-NDA"],
    dpaTrigger:
      "Required when personal data enters prompts, workflows, or storage layers.",
    governingLaws: [
      "Indian Contract Act, 1872",
      "DPDPA, 2023",
      "IT Act, 2000",
      "Copyright Act, 1957",
    ],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: "Spark",
        amount: "₹85,000",
        period: "1-month build",
        highlight: true,
        features: [
          "3 production workflows",
          "WhatsApp AI bot",
          "Prompt engineering",
          "API integrations",
          "Testing + handover",
        ],
      },
      {
        label: "Neural",
        amount: "₹28,000/mo",
        period: "6-month retainer",
        highlight: false,
        features: [
          "Agent performance monitoring",
          "Prompt tuning",
          "RAG knowledge base updates",
          "Monthly analytics",
          "Incident response",
        ],
      },
      {
        label: "Cortex",
        amount: "₹38,000/mo",
        period: "12-month partnership",
        highlight: false,
        features: [
          "Multi-agent performance monitoring",
          "Weekly QA",
          "2 new workflows/month",
          "Monthly ROI report",
          "Priority support",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery Workshop",
        summary: "Map manual workflows and calculate ROI.",
        detail:
          "We document exact time-cost metrics and propose a defined architecture blueprint.",
        duration: "3 days",
      },
      {
        step: 2,
        title: "Data & Security Mapping",
        summary: "Ensure no proprietary data leaks.",
        detail:
          "We map API endpoints and design systems that do not train public models on your data.",
        duration: "2 days",
      },
      {
        step: 3,
        title: "Build & Staging",
        summary: "Workflows built and iteratively tested.",
        detail:
          "We use dummy data on live staging. You review every branch logic.",
        duration: "2-3 weeks",
      },
      {
        step: 4,
        title: "Deployment & Training",
        summary: "System goes live alongside staff onboarding.",
        detail:
          "We provide comprehensive runbooks so your team knows precisely how to use and override the automations.",
        duration: "Ongoing",
      },
    ],
    faqs: [
      {
        q: "Is my data used to train the AI?",
        a: "No. We use API endpoints (like OpenAI Enterprise) that explicitly forbid training on customer data.",
      },
      {
        q: "What happens when an API breaks?",
        a: "Our workflow maintenance retainers include proactive error handling and rapid endpoint repair.",
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
    name: "SaaS & Web Development",
    tagline: "Web apps, SaaS platforms, and landing pages built with modern stacks",
    Icon: Globe,
    description:
      "We build websites, web applications, and SaaS platforms. From a landing page to a multi-tenant platform — scoped, delivered, and handed over with documentation.",
    features: [
      "Next.js / React / Flutter ecosystems",
      "Feature development and architecture",
      "Landing pages and web applications",
      "SaaS platform builds",
    ],
    priceLabel: PRICE_FROM.saasWeb,
    requiredAgreements: ["MTA-SL", "MTA-DPA", "MTA-NDA"],
    dpaTrigger:
      "Required when platform includes user accounts, analytics, or personal data processing.",
    governingLaws: [
      "Indian Contract Act, 1872",
      "Copyright Act, 1957",
      "DPDPA, 2023",
      "IT Act, 2000",
    ],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: "Sprint",
        amount: "₹65,000",
        period: "1-month delivery",
        highlight: false,
        features: [
          "Landing pages",
          "Portfolio / brochure sites",
          "Mobile-first responsive design",
          "Contact form + WhatsApp integration",
          "Basic SEO + analytics",
        ],
      },
      {
        label: "Build",
        amount: "₹2,80,000",
        period: "3-4 month project",
        highlight: true,
        features: [
          "E-commerce stores",
          "Web apps and portals",
          "Auth + DB design",
          "Admin dashboard",
          "API integrations",
        ],
      },
      {
        label: "Platform",
        amount: "₹8,00,000",
        period: "6-month platform",
        highlight: false,
        features: [
          "SaaS products",
          "Multi-tenant systems",
          "Flutter apps",
          "CI/CD and monitoring",
          "Maintenance + handover",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery Workshop",
        summary: "Translating ideas to technical scope.",
        detail:
          "We lock down the exact feature set and user journeys before any code is written.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Design & Architecture",
        summary: "Wireframes and DB schemas.",
        detail:
          "UI design, database modeling, and architecture planning.",
        duration: "2 weeks",
      },
      {
        step: 3,
        title: "Sprints",
        summary: "Agile development with previews.",
        detail:
          "We build in 2-week sprints with live staging URLs for your review.",
        duration: "4-12 weeks",
      },
      {
        step: 4,
        title: "QA & Launch",
        summary: "Security checks and go-live.",
        detail:
          "Testing, deployment, and handover with documentation.",
        duration: "1 week",
      },
    ],
    faqs: [
      {
        q: "Can MTA build my entire SaaS product?",
        a: "We contribute as a development partner. Full project ownership is available when you handle the legal and compliance side.",
      },
      {
        q: "Do you build e-commerce stores?",
        a: "Yes, we build e-commerce stores as part of our SaaS & Web Development service. Contact us for a custom quote.",
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
