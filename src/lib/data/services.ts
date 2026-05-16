import {
  Bot,
  Share2,
  Shield,
  Globe,
  PenTool,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
    tagline: "LLM-powered workflows & intelligent integrations",
    Icon: Bot,
    description:
      "We design AI and automation systems that reduce manual work, improve operational speed, and keep implementation grounded in your actual business process.",
    features: [
      "Outcome-based workflow engineering",
      "RAG custom knowledge bases",
      "n8n & self-hosted integrations",
      "LLM parameter and prompt tuning",
    ],
    priceLabel: "From ₹85,000",
    requiredAgreements: ["MTA-AI", "MTA-DPA", "MTA-NDA"],
    dpaTrigger:
      "Required whenever user, customer, or employee personal data enters prompts, workflows, or storage layers.",
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
        subtext:
          "Best for solopreneurs and small teams needing a first automation layer.",
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
        subtext:
          "6-month total: ₹1,68,000. Included API allowance billed transparently.",
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
        subtext: "12-month total: ₹4,56,000. Flagship AI partnership tier.",
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
      "Paid social retainers, Meta Ads systems & compliance-first growth",
    Icon: Share2,
    description:
      "We run Meta Ads and social growth programs with creative production, tracking architecture, and optimization built around measurable revenue outcomes. Every engagement includes human review, ad account hygiene, and consent-aware data handling.",
    features: [
      "Campaign strategy & objective setting",
      "Meta Pixel / CAPI / custom event setup",
      "Creative production for static, carousel, and short-form assets",
      "Retargeting, lookalikes, and audience testing",
    ],
    priceLabel: "From ₹18,000/mo",
    requiredAgreements: ["MTA-DM", "MTA-DPA", "MTA-NDA", "MTA-AIE"],
    dpaTrigger:
      "Required when audience data, lead forms, CRM sync, AI tool processing, or social automation handles personal data. All AI-generated content labeled per IT Amendment Rules 2026.",
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
        subtext:
          "6-month: ₹15,500/mo (₹93,000 total) · 12-month: ₹13,500/mo (₹1,62,000 total)",
      },
      {
        label: "Growth",
        amount: "₹35,000/mo",
        period: "6-month commitment",
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
        subtext: "1-month: ₹35,000 · 12-month: ₹26,000/mo (₹3,12,000 total)",
      },
      {
        label: "Scale",
        amount: "₹65,000/mo",
        period: "12-month commitment",
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
        subtext:
          "6-month: ₹55,000/mo (₹3,30,000 total) · 12-month: ₹48,000/mo (₹5,76,000 total)",
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
    tagline: "PTES-Based Ethical Hacking, DPDP Compliance & Incident Response",
    Icon: Shield,
    description:
      "Comprehensive ethical hacking service using PTES methodology, with DPDP compliance certification.",
    features: [
      "PTES 7-Phase Penetration Testing Execution Standard",
      "DPDP Act 2023 Section 8(5) Compliance Certification",
      "LINDDUN Privacy Threat Modeling for PII Protection",
      "OWASP Top 10:2025 Web Application Security Testing",
      "NIST Cybersecurity Framework 2.0 Aligned Reporting",
      "CERT-In 6-Hour Incident Reporting Compliance",
      "Real Case Studies: FitNexora, MNSS Healthcare, Doctor App",
      "180-Day Log Retention with Encrypted Offline Storage",
    ],
    priceLabel: "From ₹50,000",
    requiredAgreements: ["MTA-CS", "MTA-NDA", "MTA-DPA", "MTA-ROE"],
    dpaTrigger:
      "Mandatory for all engagements processing personal data under DPDP Act 2023. Includes breach notification obligations.",
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
        subtext: "6-month retainer: ₹8,500/mo · 12-month AMC: ₹6,500/mo",
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
        subtext: "6-month retainer: ₹20,000/mo · 12-month AMC: ₹16,500/mo",
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
        subtext: "6-month managed: ₹45,000/mo · 12-month contract: ₹38,000/mo",
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
          "Executive + technical reports, DPDP compliance certificate, retest",
        detail:
          "We deliver executive summaries and detailed technical reports with CVSS scoring, issue DPDP compliance certificates where applicable, and conduct remediation retests.",
        duration: "2-3 days",
      },
    ],
    faqs: [
      {
        q: "What is PTES and why does MTA use it?",
        a: "PTES stands for Penetration Testing Execution Standard, a 7-phase methodology widely recognized as the most comprehensive framework for ethical hacking in 2026. It covers Pre-engagement, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation, and Reporting - ensuring no attack vector is overlooked.",
      },
      {
        q: "What is the DPDP 24-hour breach notification requirement?",
        a: "Under DPDP Act 2023, MTA acts as Data Processor and notifies the client (Data Fiduciary) within 24 hours of detecting a breach. The client then has 72 hours to notify the Data Protection Board of India. Our contracts clearly delineate these obligations to ensure regulatory compliance.",
      },
      {
        q: "What's the difference between Gray-box, White-box, and Black-box testing?",
        a: "Gray-box testing (our default) uses limited credentials and internal documentation to simulate privileged insider threats. White-box testing provides full source code access for comprehensive static analysis. Black-box testing proceeds with zero prior knowledge, simulating pure external attacker perspective. We recommend Gray-box for optimal coverage-to-cost ratio.",
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
    tagline: "Development partner for web apps, SaaS platforms & landing pages",
    Icon: Globe,
    description:
      "We partner with founders and businesses on SaaS and web development - contributing to architecture, feature work, and ongoing builds. We do not build complete SaaS products for clients from scratch as a packaged service. Where a client handles their own legal and compliance responsibilities, we can take full delivery ownership of a SaaS project.",
    features: [
      "Next.js / React / Flutter ecosystems",
      "Feature development & architecture contributions",
      "Landing pages & web application builds",
      "Full SaaS ownership when client manages legal/compliance",
    ],
    priceLabel: "From ₹65,000",
    requiredAgreements: ["MTA-SL", "MTA-DPA", "MTA-NDA"],
    dpaTrigger:
      "Required when platform includes user accounts, analytics, or any personal data processing.",
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
        subtext:
          "6-month retainer: ₹55,000/sprint · 12-month retainer: ₹50,000/sprint",
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
        subtext:
          "6-month phased delivery: ₹3,00,000 total · 12-month build + maintain: ₹3,36,000 total",
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
        subtext:
          "12-month iterate: ₹10,80,000 total · revenue-share option available",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery Workshop",
        summary: "Translating ideas to technical scope.",
        detail:
          "We lock down the exact feature set and user journeys to avoid scope creep.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Design & Architecture",
        summary: "Wireframes and DB schemas.",
        detail:
          "We design the UI for WCAG 2.1 AA compliance and model the database for scalability.",
        duration: "2 weeks",
      },
      {
        step: 3,
        title: "Sprints",
        summary: "Agile development with previews.",
        detail:
          "We build in 2-week sprints. You test specific features on live staging URLs.",
        duration: "4-12 weeks",
      },
      {
        step: 4,
        title: "QA & Launch",
        summary: "Security checks and go-live.",
        detail:
          "Load testing, penetration testing, and DNS handover. Year 1 maintenance begins.",
        duration: "1 week",
      },
    ],
    faqs: [
      {
        q: "Can MTA build my entire SaaS product?",
        a: "Yes, under specific conditions. We contribute to SaaS builds as a development partner. Full project ownership is available when you take on the legal, compliance, and business responsibilities for the product.",
      },
      {
        q: "Why WCAG 2.1 AA?",
        a: "Digital accessibility is non-negotiable for modern businesses. We ensure your app is usable by people with varying auditory, cognitive, and physical abilities.",
      },
    ],
  },
  {
    slug: "branding",
    name: "Branding",
    tagline: "Brand systems & IP-clear visual assets",
    Icon: PenTool,
    description:
      "We develop cohesive brand systems - not just logos. From typography rules to exact color math, we deliver comprehensive guidelines that ensure your brand is protected, scalable, and entirely IP-clear.",
    features: [
      "Logo & mark generation",
      "Comprehensive brand guidelines",
      "Color systems & typography rules",
      "100% IP-clear asset handover",
    ],
    priceLabel: "From ₹35,000",
    requiredAgreements: ["MTA-NDA"],
    dpaTrigger:
      "Usually not required unless campaign data, audience databases, or personal data tooling is included.",
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
        subtext: "6-month retainer: ₹8,500/mo · 12-month retainer: ₹6,500/mo",
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
        subtext: "6-month retainer: ₹14,000/mo · 12-month retainer: ₹11,000/mo",
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
        subtext:
          "6-month managed: ₹22,000/mo · 12-month partnership: ₹17,000/mo",
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
    slug: "ecommerce",
    name: "E-Commerce Solutions",
    tagline: "Full-service online store setup, management & growth",
    Icon: ShoppingCart,
    description:
      "We build and manage complete e-commerce operations - from store design and product listings to Meta / Google ads and ongoing sales management. One team handles everything: the website, the marketing, and the results.",
    features: [
      "Custom e-commerce website design & development",
      "Product catalog setup & inventory management",
      "Meta Ads & Google Ads campaign management",
      "SEO optimization for product pages",
      "Order management & payment gateway integration",
    ],
    priceLabel: "From ₹40,000",
    requiredAgreements: ["MTA-EC", "MTA-DPA", "MTA-NDA"],
    dpaTrigger:
      "Required when the store processes customer personal data, payment information, or runs targeted ad campaigns using audience data.",
    governingLaws: [
      "Indian Contract Act, 1872",
      "Consumer Protection Act, 2019",
      "DPDPA, 2023",
      "IT Act, 2000",
    ],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: "Store Setup",
        amount: "₹40,000 - ₹1,20,000",
        period: "one-time",
        highlight: false,
        features: [
          "Custom design",
          "Product listings (up to 100 SKUs)",
          "Payment gateway integration",
          "Mobile-responsive build",
        ],
      },
      {
        label: "Growth Management",
        amount: "₹25,000 - ₹60,000",
        period: "/month",
        highlight: true,
        features: [
          "Meta & Google Ads management",
          "SEO & product page updates",
          "Performance reporting",
          "Inventory & order support",
        ],
        subtext:
          "Ad spend billed separately to your ad accounts. 15% management fee applies.",
      },
      {
        label: "Full Operations",
        amount: "₹60,000 - ₹1,50,000",
        period: "/month",
        highlight: false,
        features: [
          "Everything in Growth",
          "Dedicated account manager",
          "Advanced ad optimization",
          "CRM integration",
          "Customer support setup",
        ],
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Catalog Audit",
        summary: "Map products, audience, and competitors.",
        detail:
          "We review your product range, target buyers, and competitor stores to define the right platform and ad strategy.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Store Design & Build",
        summary: "Custom storefront built to convert.",
        detail:
          "We design and develop the store, upload your product catalog, configure payment gateways, and run pre-launch QA.",
        duration: "2-4 weeks",
      },
      {
        step: 3,
        title: "Ads & Marketing Launch",
        summary: "Meta and Google campaigns go live.",
        detail:
          "We set up pixel tracking, ad accounts, and launch initial campaigns with A/B testing from day one.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Optimize & Scale",
        summary: "Monthly optimization based on data.",
        detail:
          "We analyze sales data, ad performance, and customer behavior to improve ROAS and conversion rates every month.",
        duration: "Ongoing",
      },
    ],
    faqs: [
      {
        q: "Do you manage ad spend on our behalf?",
        a: "No. Ad budgets are managed through your own Meta / Google ad accounts. We charge a 15% management fee on ad spend for strategy, creative, and optimization.",
      },
      {
        q: "What platforms do you build on?",
        a: "We build on Shopify (recommended for most businesses), WooCommerce for WordPress sites, or custom Next.js stores for high-scale or unique requirements.",
      },
      {
        q: "Can you handle product uploads from day one?",
        a: "Yes. Your initial catalog is uploaded as part of setup. Ongoing catalog management is included in Growth and Full Operations plans.",
      },
    ],
  },
  {
    slug: "content-creation",
    name: "Content Creation",
    tagline: "SEO writing, social content, and long-form thought leadership",
    Icon: PenTool,
    description:
      "We produce human-edited content systems that combine research, structure, and distribution planning across blogs, social posts, email, and founder-led content.",
    features: [
      "Blog posts and SEO articles",
      "Social media graphics and captions",
      "Reels / short-form scripts",
      "LinkedIn thought leadership and newsletters",
    ],
    priceLabel: "From ₹28,000",
    requiredAgreements: ["MTA-NDA"],
    dpaTrigger:
      "Required only where content workflows process personal data from forms, CRM exports, or user datasets.",
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
        subtext: "6-month retainer: ₹25,000/mo · 12-month retainer: ₹20,000/mo",
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
        subtext: "6-month retainer: ₹70,000/mo · 12-month retainer: ₹55,000/mo",
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
        subtext:
          "6-month partnership: ₹1,30,000/mo · 12-month ownership: ₹1,10,000/mo",
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
