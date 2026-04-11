import { Bot, Share2, Shield, Globe, PenTool, Edit3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  slug:        string
  name:        string
  tagline:     string
  Icon:        LucideIcon
  description: string
  features:    string[]
  priceLabel:  string
  requiredAgreements: string[]
  dpaTrigger: string
  governingLaws: string[]
  deliveryStages: number[]
  pricing: {
    label:     string
    amount:    string
    period?:   string
    highlight: boolean
    features:  string[]
    subtext?:  string
  }[]
  process: {
    step:     number
    title:    string
    summary:  string
    detail:   string
    duration: string
  }[]
  faqs: { q: string; a: string }[]
}

export const services: Service[] = [
  {
    slug:        'ai-automation',
    name:        'AI Automation',
    tagline:     'LLM-powered workflows & intelligent integrations',
    Icon:        Bot,
    description: 'We replace repetitive manual tasks with highly secure, tailored AI workflows. By leveraging open-source n8n integrations, our clients regularly achieve 80% savings on long-term API execution costs compared to traditional Zapier/Make setups.',
    features:    ['Outcome-based workflow engineering', 'RAG custom knowledge bases', 'n8n & self-hosted integrations', 'LLM parameter and prompt tuning'],
    priceLabel:  'From $3,000 setup',
    requiredAgreements: ['MTA-AI', 'MTA-DPA', 'MTA-NDA'],
    dpaTrigger: 'Required whenever user/customer/employee personal data enters prompts, workflows, or storage layers.',
    governingLaws: ['Indian Contract Act, 1872', 'DPDPA, 2023', 'IT Act, 2000', 'Copyright Act, 1957'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Discovery Workshop', amount: 'Starting at $500', period: 'one-time', highlight: false,
        features: ['Process Audit', 'Feasibility Report', 'ROI Calculation', 'Architecture Blueprint'],
        subtext: 'Amount is fully credited towards the final automation build.',
      },
      {
        label: 'Tier 1: Basic Automation', amount: 'Starting at $3,000', period: 'project', highlight: false,
        features: ['Single-platform workflow', 'Chatbot automations', 'Standard Testing & QA'],
      },
      {
        label: 'Tier 2: Mid-Complexity AI', amount: 'Starting at $8,000', period: 'project', highlight: true,
        features: ['Zapier to n8n migration', 'CRM/ERP integrations', 'Lead-qualification logic'],
      },
      {
        label: 'Tier 3: Enterprise Custom', amount: 'Starting at $15,000+', period: 'project', highlight: false,
        features: ['Full custom AI agents', 'Multi-system orchestration (RAG)', 'SOC2/ISO compliance readiness', 'Dedicated architecture'],
      },
      {
        label: 'AI Support Retainer', amount: 'From $300', period: '/month', highlight: false,
        features: ['API credit monitoring', 'Proactive error handling', 'Drift prevention', 'Workflow tuning'],
      },
    ],
    process: [
      { step:1, title:'Discovery Workshop', summary:'Map manual workflows and calculate ROI.', detail:'We document exact time-cost metrics and propose a defined architecture blueprint.', duration:'3 days' },
      { step:2, title:'Data & Security Mapping', summary:'Ensure no proprietary data leaks.', detail:'We map API endpoints and design systems that do not train public models on your data.', duration:'2 days' },
      { step:3, title:'Build & Staging', summary:'Workflows built and iteratively tested.', detail:'We use dummy data on live staging. You review every branch logic.', duration:'2-3 weeks' },
      { step:4, title:'Deployment & Training', summary:'System goes live alongside staff onboarding.', detail:'We provide comprehensive runbooks so your team knows precisely how to use and override the automations.', duration:'Ongoing' },
    ],
    faqs: [
      { q:'Is my data used to train the AI?', a:'No. We use API endpoints (like OpenAI Enterprise) that explicitly forbid training on customer data.' },
      { q:'What happens when an API breaks?', a:'Our workflow maintenance retainers include proactive error handling and rapid endpoint repair.' },
    ],
  },
  {
    slug:        'social-media-marketing',
    name:        'Social Media Marketing',
    tagline:     'Data-driven ROI with ASCI-compliant content',
    Icon:        Share2,
    description: 'High-impact social architectures built for growth. We prioritize measurable revenue growth and cost-per-acquisition (CPA) optimization over vanity metrics, utilizing high-conversion short-form video in all growth tiers.',
    features:    ['Short-form video production (Reels)', 'Automated CRM lead funnels', 'Multi-platform content calendars', 'Performance-based Ad Management (15%)'],
    priceLabel:  'From $1,250/mo',
    requiredAgreements: ['MTA-DM', 'MTA-DPA', 'MTA-NDA'],
    dpaTrigger: 'Required when audience data, lead forms, CRM sync, or social automation handles personal data.',
    governingLaws: ['Indian Contract Act, 1872', 'ASCI Guidelines, 2021', 'Consumer Protection Act, 2019', 'DPDPA, 2023'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Starter SMM Retainer', amount: '$1,250', period: '/month', highlight: false,
        features: ['1-2 Platforms', '3 posts per week', 'Static graphics', 'Basic Reporting'],
      },
      {
        label: 'Growth SMM Retainer', amount: '$2,750', period: '/month', highlight: true,
        features: ['3-4 Platforms', 'Daily posts', 'Short-form video inclusion', 'Ad Coordination'],
      },
      {
        label: 'Scale SMM Retainer', amount: '$5,000+', period: '/month', highlight: false,
        features: ['5+ Platforms', 'Multiple daily posts', 'Influencer strategy', 'Generative Search Optimization'],
      },
    ],
    process: [
      { step:1, title:'Discovery & Audit', summary:'Brand messaging and history review.', detail:'We review past campaigns, audit current platforms, and establish the ASCI compliance baseline.', duration:'1 week' },
      { step:2, title:'Funnel Setup', summary:'Wiring your socials to your CRM.', detail:'We build the backend logic (Zapier/Make) so every DM/Lead is captured cleanly.', duration:'1 week' },
      { step:3, title:'Content Strategy', summary:'Pre-approval of all assets.', detail:'You see exactly what goes live 2 weeks in advance. No surprises.', duration:'Ongoing' },
      { step:4, title:'Execution & Reporting', summary:'Live management and ROI analysis.', detail:'We handle community interaction and provide a rigorous monthly growth report.', duration:'Monthly' },
    ],
    faqs: [
      { q:'Do you handle ad spend?', a:'No. Minimum 6-month commitment is required for retainers, and ad spend is always billed separately and directly to your cards.' },
      { q:'What does ASCI compliance mean here?', a:'It means we do not write misleading claims or guarantee outcomes in copy that could trigger regulatory action against your business.' },
    ],
  },
  {
    slug:        'cybersecurity',
    name:        'Cybersecurity',
    tagline:     'VAPT, Compliance readiness & incident response',
    Icon:        Shield,
    description: 'Proactive defense architectures for scaling companies. We map your vulnerabilities, ensure compliance with GDPR/DPDP requirements, and sign Data Processing Agreements (DPAs) so you can survive vendor security audits.',
    features:    ['Vulnerability Assessment (VAPT)', 'GDPR & DPDP Act Data Processing Agreements', 'Security Awareness Training Access', 'Written Incident Response Plans'],
    priceLabel:  'From $250/mo',
    requiredAgreements: ['MTA-CS', 'MTA-NDA', 'MTA-DPA'],
    dpaTrigger: 'DPA required only if client personal data is processed/stored in assessment evidence or managed monitoring tooling.',
    governingLaws: ['IT Act, 2000 (Sections 43 & 66)', 'Indian Contract Act, 1872', 'DPDPA, 2023', 'GDPR'],
    deliveryStages: [2, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Vulnerability & Privacy Audit', amount: '$1,500', period: 'one-time', highlight: true,
        features: ['Surface Threat Audit', 'Compliance Gap Check (GDPR/DPDP)', 'Immediate Risk Report'],
      },
      {
        label: 'VAPT & Hardening', amount: '$5,000–$10,000', period: 'project', highlight: false,
        features: ['Deep Penetration Testing', 'Architecture Hardening', 'Policy Drafting (NIST/ISO)', 'Employee Phishing Sims'],
      },
      {
        label: 'Managed Security Retainer', amount: '$250', period: '/month', highlight: false,
        features: ['24/7 Monitoring', 'Monthly Scans', 'Firewall Management'],
      },
    ],
    process: [
      { step:1, title:'Discovery Audit', summary:'Surface assessment of exposure.', detail:'We perform non-intrusive scans and review current access policies.', duration:'3 days' },
      { step:2, title:'Deep VAPT', summary:'Ethical penetration testing.', detail:'We actively attempt to breach your staging/prod environments (with permission) to find flaws.', duration:'2 weeks' },
      { step:3, title:'Remediation', summary:'Patching the holes.', detail:'We configure AES-256 encryption, enforce MFA, and harden the network.', duration:'2-3 weeks' },
      { step:4, title:'Policy Handover', summary:'IR plans and runbooks delivered.', detail:'We hand over your custom Incident Response plan with the 72-hour notification protocol.', duration:'1 week' },
    ],
    faqs: [
      { q:'What is the 72-hour breach commitment?', a:'Aligned with CERT-In directives, we ensure your internal processes are capable of identifying and reporting severe breaches within 72 hours.' },
      { q:'Do you provide ISO 27001 certification?', a:'We provide the *readiness* and framework. The actual certification must be performed by an independent external auditor.' },
    ],
  },
  {
    slug:        'saas-products',
    name:        'SaaS Products',
    tagline:     'Secure, multi-tenant scalable web architectures',
    Icon:        Globe,
    description: 'We architect production-ready applications structured to survive technical due diligence. Fractional CTO services are available for founders seeking high-level strategy without full-time executive overhead.',
    features:    ['Next.js / React ecosystems', 'Multi-tenant cloud architectures', 'SaaS Success Plan Maintenance', 'Fractional CTO Advisory'],
    priceLabel:  'Starting at $15,000',
    requiredAgreements: ['MTA-SL', 'MTA-DPA', 'MTA-NDA'],
    dpaTrigger: 'Required when platform includes user accounts, analytics, or any personal data processing.',
    governingLaws: ['Indian Contract Act, 1872', 'Copyright Act, 1957', 'DPDPA, 2023', 'IT Act, 2000'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Micro MVP', amount: '$15,000–$25,000', period: 'one-time', highlight: false,
        features: ['Auth logic', '1 CRUD workflow', 'Simple Dashboard'],
      },
      {
        label: 'Standard MVP', amount: '$40,000–$99,000', period: 'one-time', highlight: false,
        features: ['Stripe billing', '3-5 major features', 'CMS Integration'],
      },
      {
        label: 'SaaS Success Plan', amount: '$450', period: 'per month', highlight: false,
        features: ['Uptime monitoring', 'Security patches', '5 hours dev support'],
      },
      {
        label: 'Fractional CTO', amount: '$2,500', period: 'per month', highlight: true,
        features: ['10-15 hours/mo', 'Code auditing', 'Strategy calls', 'Hiring support'],
      },
    ],
    process: [
      { step:1, title:'Discovery Workshop', summary:'Translating ideas to technical scope.', detail:'We lock down the exact feature set and user journeys to avoid scope creep.', duration:'1 week' },
      { step:2, title:'Design & Architecture', summary:'Wireframes and DB schemas.', detail:'We design the UI for WCAG 2.1 AA compliance and model the database for scalability.', duration:'2 weeks' },
      { step:3, title:'Sprints', summary:'Agile development with previews.', detail:'We build in 2-week sprints. You test specific features on live staging URLs.', duration:'4-12 weeks' },
      { step:4, title:'QA & Launch', summary:'Security checks and go-live.', detail:'Load testing, penetration testing, and DNS handover. Year 1 maintenance begins.', duration:'1 week' },
    ],
    faqs: [
      { q:'What does Year 1 Complimentary Maintenance cover?', a:'It covers critical bug fixes, library updates, and security patches for the first 12 months after launch. Year 2 transitions to a subscription model.' },
      { q:'Why WCAG 2.1 AA?', a:'Digital accessibility is non-negotiable for modern businesses. We ensure your app is usable by people with varying auditory, cognitive, and physical abilities.' },
    ],
  },
  {
    slug:        'branding',
    name:        'Branding',
    tagline:     'Brand systems & IP-clear visual assets',
    Icon:        PenTool,
    description: 'We develop cohesive brand systems—not just logos. From typography rules to exact color math, we deliver comprehensive guidelines that ensure your brand is protected, scalable, and entirely IP-clear.',
    features:    ['Logo & Mark generation', 'Comprehensive Brand Guidelines', 'Color systems & typography rules', '100% IP-clear asset handover'],
    priceLabel:  'Starting at ₹10,000',
    requiredAgreements: ['MTA-NDA'],
    dpaTrigger: 'Usually not required unless campaign data, audience databases, or personal data tooling is included.',
    governingLaws: ['Indian Contract Act, 1872', 'Copyright Act, 1957', 'Trade Marks Act, 1999'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Brand Discovery Workshop', amount: 'Starting at ₹10,000', period: 'one-time', highlight: false,
        features: ['2-3 hour session', 'Competitor Analysis', 'Positioning', 'Brand Strategy Brief'],
      },
      {
        label: 'Comprehensive Brand System', amount: 'Custom Pricing', period: 'project', highlight: true,
        features: ['Logo Suite', 'Colour Palette', 'Typography System', 'Brand Voice Guide', 'Application Mockups', 'Brand Guidelines PDF'],
      },
      {
        label: 'Brand Guardian Retainer', amount: 'Custom', period: 'monthly', highlight: false,
        features: ['Dedicated monthly design hours', 'Brand consistency reviews', 'Priority asset creation'],
      },
    ],
    process: [
      { step:1, title:'Discovery', summary:'Understanding the company ethos.', detail:'We unpack why you exist, who you serve, and how you need to sound/look.', duration:'1 week' },
      { step:2, title:'Concept Sprints', summary:'Iterative visual directions.', detail:'We present 2-3 distinct brand directions showing logo usage, colors, and type in context.', duration:'2 weeks' },
      { step:3, title:'Refinement', summary:'Zeroing in on the winner.', detail:'Feedback cycles to perfect the chosen direction.', duration:'1 week' },
      { step:4, title:'Handover', summary:'IP-clear delivery.', detail:'You receive the comprehensive brand guideline book and native vector files. We claim no ongoing IP rights.', duration:'3 days' },
    ],
    faqs: [
      { q:'Do I own the logo?', a:'Yes. We provide a full IP copyright transfer upon final payment. It is your asset.' },
      { q:'Do you provide print materials?', a:'We provide the digital, print-ready source files. You can take these to any vendor for physical production.' },
    ],
  },
  {
    slug:        'content-creation',
    name:        'Content Creation',
    tagline:     'Research-backed, AI-assisted, human-verified copy',
    Icon:        Edit3,
    description: 'We leverage AI as a research and structuring tool, but every single line of copy—whether for a landing page, technical whitepaper, or blog—is heavily edited and fact-checked by technical human writers.',
    features:    ['Technical blog writing', 'Website copywriting frameworks', 'Whitepapers & documentation', 'Strict AI-hallucination audits'],
    priceLabel:  'Starting at ₹15,000',
    requiredAgreements: ['MTA-NDA'],
    dpaTrigger: 'Required only where content workflows process personal data from forms, CRM exports, or user datasets.',
    governingLaws: ['Indian Contract Act, 1872', 'Copyright Act, 1957', 'DPDPA, 2023'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Content Starter', amount: 'Starting at ₹25,000', period: 'per month', highlight: false,
        features: ['4 blog posts (800–1,200 words)', 'SEO keyword integration'],
      },
      {
        label: 'Content Pro', amount: 'Starting at ₹50,000', period: 'per month', highlight: true,
        features: ['8 blog posts', 'Accompanying social media captions', '1 monthly email newsletter', 'SEO strategy'],
      },
      {
        label: 'Content Suite', amount: 'Starting at ₹1,00,000', period: 'per month', highlight: false,
        features: ['Full strategy', 'Blog, social, email, PR content', '1 long-form asset per quarter'],
      },
      {
        label: 'One-Off Projects', amount: 'Starting at ₹15,000', period: 'per project', highlight: false,
        features: ['Website copy', 'Pitch decks', 'Industry reports'],
        subtext: 'Minimum engagement applies.',
      },
    ],
    process: [
      { step:1, title:'Tone Audit', summary:'Defining your voice.', detail:'We establish the vocabulary, cadence, and formatting rules your brand must follow.', duration:'3 days' },
      { step:2, title:'Research & AI Outlining', summary:'Data gathering.', detail:'We use LLMs strictly to structure outlines and aggregate technical research points.', duration:'3 days' },
      { step:3, title:'Human Drafting', summary:'Writing the actual copy.', detail:'Our team writes the content, ensuring nuance, wit, and deep accuracy that AI cannot achieve.', duration:'1-2 weeks' },
      { step:4, title:'Fact-Check & Review', summary:'Client sign-off.', detail:'You review the drafts. We provide plagiarism and AI-score reports to prove human intervention.', duration:'Ongoing' },
    ],
    faqs: [
      { q:'Do you just generate ChatGPT text and charge me?', a:'Absolutely not. AI is a research assistant for us. Our value is in the human editing, fact-checking, and strategic tone alignment.' },
      { q:'Do you guarantee SEO rankings?', a:'No agency can guarantee Google rankings. We guarantee structurally perfect, deeply researched content that search engines heavily favor.' },
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}
