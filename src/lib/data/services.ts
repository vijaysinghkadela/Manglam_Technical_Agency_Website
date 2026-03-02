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
    description: 'We replace repetitive manual tasks with highly secure, tailored AI workflows using LLMs (OpenAI, Gemini), RAG implementations, and enterprise-grade n8n/Make automation platforms.',
    features:    ['RAG custom knowledge bases', 'n8n & Zapier/Make workflow builds', 'LLM parameter and prompt tuning', 'Department-wide AI staff training'],
    priceLabel:  'From ₹50,000',
    pricing: [
      {
        label: 'Discovery Workshop', amount: 'Starting at ₹25,000', period: 'one-time', highlight: false,
        features: ['Process Audit', 'Feasibility Report', 'ROI Calculation', 'Architecture Blueprint'],
        subtext: 'Amount is fully credited towards the final automation build.',
      },
      {
        label: 'Tier 1: Basic Automation', amount: 'Starting at ₹50,000', period: 'project', highlight: false,
        features: ['Single-platform workflow', 'Basic API integrations', 'Standard Testing & QA'],
      },
      {
        label: 'Tier 2: Mid-Complexity AI', amount: 'Starting at ₹4,00,000', period: 'project', highlight: true,
        features: ['Custom LLM wrappers', 'RAG implementations', 'CRM/ERP integrations', 'Lead-qualification logic'],
      },
      {
        label: 'Tier 3: Enterprise Custom', amount: 'Starting at ₹12,00,000', period: 'project', highlight: false,
        features: ['Full custom AI agents', 'Multi-system orchestration', 'SOC2/ISO compliance readiness', 'Dedicated architecture'],
      },
      {
        label: 'AI Support Retainer', amount: 'Starting at ₹50,000', period: '/month', highlight: false,
        features: ['Dedicated AI Maintenance', 'Proactive error handling', 'Endpoint repair', 'Workflow tuning'],
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
    description: 'High-impact social architectures built for growth and trust. We do not just post; we engineer funnels, manage communities, and ensure all claims are strictly aligned with Advertising Standards Council of India (ASCI) guidelines.',
    features:    ['ASCI-compliant copywriting', 'Automated CRM lead funnels', 'Multi-platform content calendars', 'Data-driven monthly reporting'],
    priceLabel:  'From ₹75,000/mo',
    pricing: [
      {
        label: 'Discovery Workshop', amount: '₹25,000', period: 'one-time', highlight: false,
        features: ['Brand Audit', 'Competitor Analysis', 'ASCI Risk Assessment', 'Growth Strategy Doc'],
        subtext: 'Credited towards your retainer.',
      },
      {
        label: 'Automation Setup', amount: '₹1,00,000', period: 'one-time', highlight: false,
        features: ['CRM setup', 'Lead funnels', 'Zapier/Make workflows'],
      },
      {
        label: 'SMM Retainer', amount: '₹75,000', period: '/month', highlight: true,
        features: ['12 High-Impact Posts', '4 Reels', 'Community management', 'Monthly Analytics Reporting', 'Workflow maintenance'],
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
    tagline:     'VAPT, ISO 27001 readiness & incident response',
    Icon:        Shield,
    description: 'Proactive defense architectures for Indian SMEs. We map your vulnerabilities, align your infrastructure with ISO 27001 / IT Act 2000, and enforce a strict 72-hour breach notification protocol.',
    features:    ['Vulnerability Assessment (VAPT)', 'ISO 27001 & IT Act 2000 Gap Analysis', 'Mandatory MFA implementation', 'Written Incident Response Plans'],
    priceLabel:  'Custom Quote',
    pricing: [
      {
        label: 'Discovery Workshop', amount: '₹25,000', period: 'one-time', highlight: true,
        features: ['Surface Threat Audit', 'Compliance Gap Check', 'Immediate Risk Report'],
        subtext: 'Credited towards full hardening projects.',
      },
      {
        label: 'VAPT & Hardening', amount: 'Custom', period: 'project', highlight: false,
        features: ['Deep Penetration Testing', 'Architecture Hardening', 'Policy Drafting (NIST/ISO)', 'Employee Phishing Sims'],
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
    tagline:     'Secure-by-default, highly accessible web apps',
    Icon:        Globe,
    description: 'We engineer complex, data-heavy web applications and portals. Every product we build guarantees WCAG 2.1 AA accessibility and secure-by-default architecture from day one. Includes Year 1 Complimentary maintenance.',
    features:    ['Next.js / React ecosystems', 'WCAG 2.1 AA Accessibility', 'Secure-by-default database modeling', 'Year 1 Complimentary Maintenance'],
    priceLabel:  'From ₹1,50,000',
    pricing: [
      {
        label: 'Discovery Workshop', amount: '₹25,000', period: 'one-time', highlight: true,
        features: ['Product Scoping', 'DB Schema Design', 'UX Wireframes', 'Tech Stack Selection'],
        subtext: 'Credited towards total development cost.',
      },
      {
        label: 'Core Development', amount: 'Custom', period: 'milestones', highlight: false,
        features: ['Frontend/Backend Build', 'Testing (E2E, Unit)', 'Deployment Architecture', 'Year 1 Complimentary Support'],
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
    priceLabel:  'Custom Quote',
    pricing: [
      {
        label: 'Discovery Workshop', amount: '₹25,000', period: 'one-time', highlight: true,
        features: ['Market positioning', 'Visual audit', 'Moodboarding', 'Competitor review'],
        subtext: 'Credited towards the full branding project.',
      },
      {
        label: 'System Design', amount: 'From ₹75,000', period: 'project', highlight: false,
        features: ['Primary/Secondary Marks', 'Type Hierarchy', 'Digital Asset Library', 'Guideline PDF'],
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
    priceLabel:  'Custom Quote',
    pricing: [
      {
        label: 'Discovery Workshop', amount: '₹25,000', period: 'one-time', highlight: false,
        features: ['Tone of Voice Audit', 'Content Gap Analysis', 'Keyword Mapping'],
        subtext: 'Credited toward content retainers.',
      },
      {
        label: 'Content Batches', amount: 'Custom', period: 'per piece', highlight: true,
        features: ['SEO-optimized', 'Fact-checked by humans', 'Plagiarism & AI reports included'],
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
