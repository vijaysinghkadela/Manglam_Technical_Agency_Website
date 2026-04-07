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
    description: 'We design AI and automation systems that reduce manual work, improve operational speed, and keep implementation grounded in your actual business process.',
    features:    ['Outcome-based workflow engineering', 'RAG custom knowledge bases', 'n8n & self-hosted integrations', 'LLM parameter and prompt tuning'],
    priceLabel:  'From ₹15,000 (process audit)',
    requiredAgreements: ['MTA-AI', 'MTA-DPA', 'MTA-NDA'],
    dpaTrigger: 'Required whenever user/customer/employee personal data enters prompts, workflows, or storage layers.',
    governingLaws: ['Indian Contract Act, 1872', 'DPDPA, 2023', 'IT Act, 2000', 'Copyright Act, 1957'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Process Audit', amount: '₹15,000 - ₹30,000', period: 'one-time', highlight: false,
        features: ['Process Audit', 'Feasibility Report', 'ROI Calculation', 'Architecture Blueprint'],
        subtext: 'Discovery and process mapping before build execution.',
      },
      {
        label: 'Automation Project', amount: '₹50,000 - ₹3,00,000+', period: 'project', highlight: true,
        features: ['Single-platform workflow', 'Chatbot automations', 'Standard Testing & QA'],
      },
      {
        label: 'AI Integration', amount: '₹1,00,000 - ₹5,00,000+', period: 'project', highlight: false,
        features: ['LLM integration', 'RAG systems', 'Custom agent workflows'],
      },
      {
        label: 'Monthly Retainer', amount: '₹25,000 - ₹1,00,000', period: '/month', highlight: false,
        features: ['Monitoring', 'Optimization', 'Issue handling', 'Ongoing iteration'],
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
    tagline:     'AI-Powered Agentic Workflows with DPDP Compliance & C2PA Content Credentials',
    Icon:        Share2,
    description: 'We deploy autonomous AI agents for social media execution using the Capture-Categorize-Calibrate loop. Multi-agent orchestration handles content generation, community management, and real-time ad optimization—all with mandatory human oversight, DPDP-compliant consent flows, and C2PA Content Credentials for full content provenance.',
    features:    [
      'Agentic AI Workflows (Capture-Categorize-Calibrate loop)',
      'Multi-Agent Content Orchestration (n8n + Buffer AI + Predis.ai)',
      'Short-form video production (Reels/Shorts) with C2PA verification',
      'AI-powered community management with sentiment triage',
      'Real-time ad optimization (67% avg ROAS improvement)',
      'DPDP-compliant consent flows & SGI labeling (IT Rules 2026)',
      'Deepfake detection pre-posting (Resemble AI + Hive)',
      'Automated CRM lead funnels with audit trails',
    ],
    priceLabel:  'From ₹15,000/mo (~$175 USD)',
    requiredAgreements: ['MTA-DM', 'MTA-DPA', 'MTA-NDA', 'MTA-AIE'],
    dpaTrigger: 'Required when audience data, lead forms, CRM sync, AI tool processing, or social automation handles personal data. All AI-generated content labeled per IT Amendment Rules 2026.',
    governingLaws: ['Indian Contract Act, 1872', 'ASCI Guidelines, 2021', 'Consumer Protection Act, 2019', 'DPDPA, 2023', 'IT Amendment Rules, 2026 (SGI Labeling)'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Starter',
        amount: '₹15,000',
        period: '/month',
        highlight: false,
        features: [
          '15 AI-assisted posts/month',
          '1-2 platforms (FB/IG)',
          'Basic AI content generation',
          'Community management (24h reply SLA)',
          'Monthly analytics report',
          'DPDP consent documentation',
        ],
        subtext: 'US/EU equivalent: $1,250-2,000/mo. India pricing: 85% cost savings.',
      },
      {
        label: 'Growth',
        amount: '₹35,000',
        period: '/month',
        highlight: true,
        features: [
          '30+ posts with Reels/Shorts production',
          '3-4 platforms + ad coordination',
          'Multi-agent content orchestration',
          'AI sentiment triage for DMs',
          'Deepfake detection on all uploads',
          'C2PA Content Credentials embedded',
          'Bi-weekly strategy calls',
        ],
        subtext: 'US/EU equivalent: $2,750-4,000/mo. India pricing: 70% cost savings.',
      },
      {
        label: 'Premium',
        amount: '₹75,000',
        period: '/month',
        highlight: false,
        features: [
          'Daily multi-platform execution',
          'Full agentic workflow deployment',
          'Real-time ad optimization',
          'Influencer strategy integration',
          'Custom AI voice/brand training',
          'Advanced GSO (Generative Search Optimization)',
          'Dedicated account manager',
        ],
        subtext: 'US/EU equivalent: $5,000-7,500/mo. India pricing: 75% cost savings.',
      },
      {
        label: 'Enterprise',
        amount: '₹1,50,000+',
        period: '/month',
        highlight: false,
        features: [
          '5+ platforms with 24/7 coverage',
          'Multi-agent collaboration architecture',
          'AI receptionist + lead qualification',
          'Performance-based pricing component',
          'White-label client dashboards',
          'Enterprise DPDP compliance suite',
          'Quarterly business reviews',
        ],
        subtext: 'US/EU equivalent: $10,000+/mo. Global enterprise tier.',
      },
    ],
    process: [
      { step:1, title:'Discovery & AI Audit', summary:'Brand voice training and automation mapping.', detail:'We audit current platforms, establish ASCI/DPDP compliance baseline, and configure AI tools with your brand voice and guidelines.', duration:'1 week' },
      { step:2, title:'Agentic Workflow Setup', summary:'Multi-agent orchestration deployment.', detail:'We configure n8n workflows connecting Manager, Data Analysis, Content, and Channel Selection agents. Deepfake detection and C2PA labeling integrated into every pipeline.', duration:'1-2 weeks' },
      { step:3, title:'Content Engine Launch', summary:'Pre-approval of AI-assisted assets.', detail:'You see exactly what goes live 2 weeks in advance. Every piece labeled with "AI-assisted • Human-verified by MTA" per IT Rules 2026.', duration:'Ongoing' },
      { step:4, title:'Optimize & Scale', summary:'Real-time optimization and ROI analysis.', detail:'AI handles community triage, ad optimization (avg 67% ROAS improvement), and performance reporting. Monthly compliance audit included.', duration:'Monthly' },
    ],
    faqs: [
      { q:'Do you handle ad spend?', a:'No. Minimum 6-month commitment is required for retainers. Ad spend is billed separately to your ad platform accounts. We charge 15% management fee on ad spend for optimization services.' },
      { q:'What does ASCI compliance mean here?', a:'We never write misleading claims or guarantee outcomes. All sponsored content includes proper disclosure (#Ad/#Sponsored) per ASCI Guidelines 2021.' },
      { q:'How do you ensure AI ethics compliance?', a:'All AI-generated content goes through human review before posting. We use deepfake detection (Resemble AI + Hive), embed C2PA Content Credentials, and label all synthetic content per IT Amendment Rules 2026.' },
      { q:'What about DPDP Act compliance?', a:'Every workflow includes consent documentation, audit trails, and data minimization. We never feed raw client personal data into AI tools without explicit consent. See our AI Ethics Policy (MTA-AIE) for full details.' },
      { q:'How does India pricing compare to US/EU?', a:'Our India pricing offers 70-85% cost savings vs US/EU agencies for equivalent service levels. A $5,000/mo US Growth package is ₹35,000/mo (~$400) with MTA—same AI capabilities, same compliance rigor.' },
      { q:'What is the Capture-Categorize-Calibrate loop?', a:'This is our agentic workflow: CAPTURE monitors all channels for mentions and signals; CATEGORIZE uses AI to triage by intent, urgency, and sentiment; CALIBRATE determines optimal response—automated for routine, escalated for complex.' },
    ],
  },
{
	slug: 'cybersecurity',
	name: 'Cybersecurity',
	tagline: 'PTES-Based Ethical Hacking, DPDP Compliance & Incident Response',
	Icon: Shield,
	description: 'Comprehensive ethical hacking service using PTES methodology, with DPDP compliance certification.',
	features: [
		'PTES 7-Phase Penetration Testing Execution Standard',
		'DPDP Act 2023 Section 8(5) Compliance Certification',
		'LINDDUN Privacy Threat Modeling for PII Protection',
		'OWASP Top 10:2025 Web Application Security Testing',
		'NIST Cybersecurity Framework 2.0 Aligned Reporting',
		'CERT-In 6-Hour Incident Reporting Compliance',
		'Real Case Studies: FitNexora, MNSS Healthcare, Doctor App',
		'180-Day Log Retention with Encrypted Offline Storage',
	],
	priceLabel: 'From ₹59,000 (Essential VAPT)',
	requiredAgreements: ['MTA-CS', 'MTA-NDA', 'MTA-DPA', 'MTA-ROE'],
	dpaTrigger: 'Mandatory for all engagements processing personal data under DPDP Act 2023. Includes breach notification obligations.',
	governingLaws: ['IT Act, 2000 (Sections 43, 66 & 70B)', 'DPDPA, 2023 (Sections 8, 12-15)', 'CERT-In Directions, 2022', 'Indian Contract Act, 1872', 'GDPR (for EU data subjects)'],
	deliveryStages: [2, 5, 6, 7, 8, 9, 10],
	pricing: [
		{
			label: 'Essential', amount: '₹59,000', period: '5-7 days', highlight: false,
			features: ['Gray-box web/app + API testing', 'PTES Phases 1-7 coverage', 'DPDP gap analysis report', '1 retest included'],
			subtext: 'Ideal for gym websites and small clinics',
		},
		{
			label: 'Professional', amount: '₹1,25,000', period: '10-14 days', highlight: true,
			features: ['Web + API + mobile testing', 'Full PTES + STRIDE threat modeling', 'DPDP Breach Simulation Summary', 'Compliance certificate provided'],
			subtext: 'Ideal for SaaS platforms like FitNexora',
		},
		{
			label: 'Comprehensive', amount: '₹2,10,000', period: '15-21 days', highlight: false,
			features: ['Multi-scope: web + mobile + cloud + wireless + social engineering', 'PTES full + post-exploitation pivots', 'DPDP + CERT-In readiness audit', '2 retests included'],
			subtext: 'Ideal for multi-location healthcare chains',
		},
	],
	process: [
		{ step: 1, title: 'Discovery & Pre-engagement', summary: 'RoE + NDA + scope definition', detail: 'We define the Rules of Engagement, execute NDA/DPA, and establish precise testing scope boundaries. All stakeholders align on testing windows and emergency contacts.', duration: '2-3 days' },
		{ step: 2, title: 'Intelligence Gathering & Threat Modeling', summary: 'OSINT, DFD, LINDDUN/STRIDE analysis', detail: 'We gather open-source intelligence, create Data Flow Diagrams, and apply LINDDUN/STRIDE frameworks to identify privacy and security threat vectors affecting PII.', duration: '3-5 days' },
		{ step: 3, title: 'Vulnerability Analysis & Exploitation', summary: 'OWASP testing, controlled exploitation with proof-of-concept', detail: 'We execute OWASP Top 10:2025 testing, perform controlled exploitation with documented proof-of-concept, and maintain detailed evidence chains for all findings.', duration: '5-10 days' },
		{ step: 4, title: 'Reporting & Remediation', summary: 'Executive + technical reports, DPDP compliance certificate, retest', detail: 'We deliver executive summaries and detailed technical reports with CVSS scoring, issue DPDP compliance certificates where applicable, and conduct remediation retests.', duration: '2-3 days' },
	],
	faqs: [
		{ q: 'What is PTES and why does MTA use it?', a: 'PTES stands for Penetration Testing Execution Standard, a 7-phase methodology widely recognized as the most comprehensive framework for ethical hacking in 2026. It covers Pre-engagement, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation, and Reporting—ensuring no attack vector is overlooked.' },
		{ q: 'What is the DPDP 24-hour breach notification requirement?', a: 'Under DPDP Act 2023, MTA acts as Data Processor and notifies the client (Data Fiduciary) within 24 hours of detecting a breach. The client then has 72 hours to notify the Data Protection Board of India. Our contracts clearly delineate these obligations to ensure regulatory compliance.' },
		{ q: "What's the difference between Gray-box, White-box, and Black-box testing?", a: 'Gray-box testing (our default) uses limited credentials and internal documentation to simulate privileged insider threats. White-box testing provides full source code access for comprehensive static analysis. Black-box testing proceeds with zero prior knowledge, simulating pure external attacker perspective. We recommend Gray-box for optimal coverage-to-cost ratio.' },
		{ q: 'Do you provide proof-of-concept exploits without disrupting production?', a: 'Yes. All exploitation is conducted under strict controlled conditions with immediate cleanup. We never establish persistent backdoors, never execute denial-of-service attacks, and require explicit written approval for any action that could impact production availability. Test environments are preferred for high-risk exploits.' },
],
},
{
    slug:        'saas-products',
    name:        'SaaS Products',
    tagline:     'Secure, multi-tenant scalable web architectures',
    Icon:        Globe,
    description: 'We build scalable web and SaaS products with clear architecture, delivery documentation, and long-term maintainability.',
    features:    ['Next.js / React ecosystems', 'Multi-tenant cloud architectures', 'SaaS Success Plan Maintenance', 'Fractional CTO Advisory'],
    priceLabel:  'From ₹1,00,000',
    requiredAgreements: ['MTA-SL', 'MTA-DPA', 'MTA-NDA'],
    dpaTrigger: 'Required when platform includes user accounts, analytics, or any personal data processing.',
    governingLaws: ['Indian Contract Act, 1872', 'Copyright Act, 1957', 'DPDPA, 2023', 'IT Act, 2000'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Landing Page', amount: '₹25,000 - ₹75,000', period: 'one-time', highlight: false,
        features: ['Responsive build', 'Conversion-focused layout', 'Deployment setup'],
      },
      {
        label: 'Web Application', amount: '₹1,00,000 - ₹5,00,000', period: 'project', highlight: true,
        features: ['Custom workflows', 'Auth and data models', 'Dashboard/UI modules'],
      },
      {
        label: 'SaaS MVP', amount: '₹2,00,000 - ₹10,00,000', period: 'project', highlight: false,
        features: ['MVP architecture', 'Billing integrations', 'Admin and user flows'],
      },
      {
        label: 'Maintenance', amount: '₹15,000 - ₹50,000', period: '/month', highlight: false,
        features: ['Bug fixes', 'Security updates', 'Performance and reliability support'],
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
    priceLabel:  'From ₹15,000',
    requiredAgreements: ['MTA-NDA'],
    dpaTrigger: 'Usually not required unless campaign data, audience databases, or personal data tooling is included.',
    governingLaws: ['Indian Contract Act, 1872', 'Copyright Act, 1957', 'Trade Marks Act, 1999'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Logo Only', amount: '₹15,000 - ₹50,000', period: 'project', highlight: false,
        features: ['Primary logo', 'Basic variations', 'Core export formats'],
      },
      {
        label: 'Brand Identity', amount: '₹50,000 - ₹1,50,000', period: 'project', highlight: true,
        features: ['Logo suite', 'Color palette', 'Typography system', 'Brand guideline document'],
      },
      {
        label: 'Full Branding', amount: '₹1,00,000 - ₹3,00,000', period: 'project', highlight: false,
        features: ['Brand strategy', 'Identity system', 'Collateral templates'],
      },
      {
        label: 'Brand Refresh', amount: '₹30,000 - ₹1,00,000', period: 'project', highlight: false,
        features: ['Brand modernization', 'Asset refresh', 'Updated usage guidance'],
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
    priceLabel:  'From ₹3,000',
    requiredAgreements: ['MTA-NDA'],
    dpaTrigger: 'Required only where content workflows process personal data from forms, CRM exports, or user datasets.',
    governingLaws: ['Indian Contract Act, 1872', 'Copyright Act, 1957', 'DPDPA, 2023'],
    deliveryStages: [2, 3, 5, 6, 7, 8, 9, 10],
    pricing: [
      {
        label: 'Blog Post', amount: '₹3,000 - ₹10,000', period: 'per piece', highlight: false,
        features: ['Research-backed writing', 'SEO integration', 'Brand-aligned tone'],
      },
      {
        label: 'Landing Page Copy', amount: '₹5,000 - ₹25,000', period: 'per page', highlight: false,
        features: ['Conversion-focused copy', 'Messaging structure', 'SEO support'],
      },
      {
        label: 'Email Sequence (5)', amount: '₹10,000 - ₹25,000', period: 'project', highlight: false,
        features: ['Sequence strategy', 'Copywriting', 'CTA alignment'],
      },
      {
        label: 'Monthly Package', amount: '₹25,000 - ₹75,000', period: '/month', highlight: true,
        features: ['Ongoing content production', 'Channel adaptation', 'Monthly reporting'],
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
