import { ContentVisibility } from './legal'

export interface ResearchSection {
  id: string
  title: string
  summary: string
  bullets: string[]
  visibility: ContentVisibility
}

export interface PipelineStage {
  stage: number
  title: string
  trigger: string
  actions: string[]
  outputs: string[]
  legalInstruments: string[]
  control: string
}

export interface RiskControl {
  stage: string
  risk: string
  legalExposure: string
  control: string
}

export interface ComplianceFramework {
  framework: string
  applicability: string
  usage: string
}

export interface ReportHighlight {
  title: string
  summary: string
}

export interface AgencyTaxonomyItem {
  category: string
  description: string
  examples: string[]
}

export interface OperatingModel {
  title: string
  summary: string
  team: string
  pricing: string
  stack: string
}

export interface AgencyComparisonRow {
  agency: string
  location: string
  services: string
  clients: string
  pipeline: string
  dealSize: string
  tools: string
}

export interface StrategyPhase {
  name: string
  audience: string
  steps: string[]
  roles: string[]
  stack: string[]
  kpis: string[]
  timeline: string
}

export interface GapAnalysisItem {
  area: string
  current: string
  recommendation: string
  impact: string
}

export interface ActionPlanPhase {
  phase: string
  window: string
  priorities: string[]
  kpis: string[]
}

export const researchMeta = {
  classification: 'Internal Research (public-safe excerpt)',
  version: '1.0',
  basis: 'MTA documents v1.0 (July 2025 – February 2026)',
  jurisdiction: 'Republic of India',
} as const

export const researchSections: ResearchSection[] = [
  {
    id: 'agency-model',
    title: 'Agency Collaboration Model',
    summary:
      'MTA operates as a lean cross-functional agency where one engagement can span AI, cybersecurity, social, SaaS, and branding under a single accountable delivery structure.',
    bullets: [
      'Direct collaboration with decision-makers instead of multi-layer account hierarchies.',
      'Integrated execution across service lines through unified project governance.',
      'Contract-first delivery posture for every billable engagement.',
      'Compliance-aware operations aligned to Indian legal obligations.',
    ],
    visibility: 'public',
  },
  {
    id: 'revenue-model',
    title: 'Revenue Architecture',
    summary:
      'Operations are balanced between monthly retainers and project-based engagements, with retainer ratio used as the primary cashflow resilience metric.',
    bullets: [
      'Retainer model anchors predictable monthly cash flow.',
      'Project model enables higher margin when scope is tightly defined.',
      'Target benchmark: 60%+ revenue from retainers.',
      'Fragility threshold: <40% retainer contribution.',
    ],
    visibility: 'public',
  },
  {
    id: 'legal-foundation',
    title: 'Legal Foundation',
    summary:
      'All delivery tracks are framed by service-specific agreements, DPDPA-aware data controls, and legally enforceable authorization boundaries.',
    bullets: [
      'Indian Contract Act, 1872 as baseline enforceability framework.',
      'Service-specific agreements activated by scope type.',
      'DPA attachment in personal-data handling scenarios.',
      'Authorization safeguards for cybersecurity testing under IT Act requirements.',
    ],
    visibility: 'public',
  },
]

export const leadToDeliveryPipeline: PipelineStage[] = [
  {
    stage: 1,
    title: 'Lead Generation & First Contact',
    trigger: 'Inbound enquiry, referral, outbound outreach, or discovery booking.',
    actions: [
      'Identify service line and primary business objective.',
      'Check fit: urgency, budget realism, and business context.',
      'Route lead to relevant department lead for qualification.',
    ],
    outputs: ['Initial qualification notes', 'Service-line ownership'],
    legalInstruments: [],
    control: 'No sensitive exchange before confidentiality controls are in place.',
  },
  {
    stage: 2,
    title: 'Discovery Call & NDA Gate',
    trigger: 'Sensitive details or solutioning discussion required.',
    actions: [
      'Execute NDA before substantive discussion.',
      'Capture current-state process and business outcome goals.',
      'Set expectations on legal, data, and scope boundaries.',
    ],
    outputs: ['Signed NDA reference', 'Discovery call notes'],
    legalInstruments: ['MTA-NDA'],
    control: 'Non-negotiable NDA-first policy for confidential exchange.',
  },
  {
    stage: 3,
    title: 'Paid Discovery Workshop / Sprint',
    trigger: 'Qualified lead moves from exploratory to scoped engagement.',
    actions: [
      'Run paid discovery rather than free scoping.',
      'Map workflows, systems, data touchpoints, and constraints.',
      'Document problem statement and implementation boundary.',
    ],
    outputs: ['Discovery brief', 'Scope baseline', 'Feasibility notes'],
    legalInstruments: ['Discovery invoice (100% upfront)'],
    control: 'Discovery fee paid before session scheduling.',
  },
  {
    stage: 4,
    title: 'Proposal Preparation',
    trigger: 'Discovery output approved for commercial proposal draft.',
    actions: [
      'Draft concrete scope, timeline, payment milestones, and exclusions.',
      'Define out-of-scope boundaries and change-order pathway.',
      'Attach retainer path where relevant post-delivery.',
    ],
    outputs: ['Signed proposal / commercial scope'],
    legalInstruments: ['Proposal + scope document'],
    control: 'Anything not written is out-of-scope until change order approval.',
  },
  {
    stage: 5,
    title: 'Agreement Execution',
    trigger: 'Proposal accepted and commercial terms aligned.',
    actions: [
      'Execute service-specific master agreement(s).',
      'Attach DPA where personal data processing exists.',
      'Validate mandatory legal dependencies for mixed-service engagements.',
    ],
    outputs: ['Executed service agreements', 'DPA/NDA attachments'],
    legalInstruments: ['MTA-WD/MTA-DM/MTA-CS/MTA-AI/MTA-SL/MTA-FC', 'MTA-DPA', 'MTA-NDA'],
    control: 'No billable delivery work starts before fully signed contract set.',
  },
  {
    stage: 6,
    title: 'Kickoff & Access Governance',
    trigger: 'Contracts executed and kickoff payment received.',
    actions: [
      'Create project brief and architecture note.',
      'Provision secure access controls and credential governance.',
      'Assign accountable internal owners and execution lanes.',
    ],
    outputs: ['Kickoff artifacts', 'Access map', 'Project ownership matrix'],
    legalInstruments: ['Kickoff invoice', 'Access records'],
    control: 'Work starts only after kickoff payment clearance.',
  },
  {
    stage: 7,
    title: 'Active Delivery',
    trigger: 'Kickoff complete and sprint/cycle in progress.',
    actions: [
      'Execute service lifecycle with weekly checkpoints.',
      'Apply compliance controls across content, code, AI, and security operations.',
      'Log approvals and evidence for each milestone.',
    ],
    outputs: ['Milestone deliverables', 'Approval logs', 'Audit-ready evidence'],
    legalInstruments: ['Change orders', 'Milestone acceptance records'],
    control: 'Scope additions require written change order before execution.',
  },
  {
    stage: 8,
    title: 'Payment Collection Control',
    trigger: 'Milestone completion and phase transition request.',
    actions: [
      'Issue milestone invoice per schedule.',
      'Pause transition if payment SLA is breached.',
      'Document notice-period obligations and suspension rules.',
    ],
    outputs: ['Payment receipts', 'Phase-go/no-go log'],
    legalInstruments: ['Milestone invoices', 'Payment notices'],
    control: 'No progression to next phase without current phase payment settlement.',
  },
  {
    stage: 9,
    title: 'Delivery & Handover',
    trigger: 'Final scope completion and closure readiness.',
    actions: [
      'Deliver formal handover package with operational documentation.',
      'Transfer assets/credentials per payment and access policy.',
      'Walk through implementation outputs with client team.',
    ],
    outputs: ['Handover package', 'Delivery confirmation', 'Operational runbook'],
    legalInstruments: ['Final invoice clearance', 'Handover acknowledgment'],
    control: 'Final source/editable assets transfer only after final payment.',
  },
  {
    stage: 10,
    title: 'Post-Delivery Retention',
    trigger: 'Project closure and early-live performance window.',
    actions: [
      'Run post-delivery review (2–4 weeks).',
      'Assess outcomes and identify optimization roadmap.',
      'Convert project momentum into retainer continuity.',
    ],
    outputs: ['Retention proposal', 'Quarterly optimization roadmap'],
    legalInstruments: ['Retainer proposal/addendum'],
    control: 'Retention offer positioned at peak outcome confidence window.',
  },
]

export const riskMap: RiskControl[] = [
  {
    stage: 'Stage 1–2',
    risk: 'Discovery begins without NDA',
    legalExposure: 'Weak enforceability over shared confidential information',
    control: 'Mandatory NDA execution before substantive discussion',
  },
  {
    stage: 'Stage 5',
    risk: 'VAPT without written authorization',
    legalExposure: 'Potential offences under IT Act Sections 43/66',
    control: 'MTA-CS authorization clause required before testing starts',
  },
  {
    stage: 'Stage 5',
    risk: 'Personal data handled without DPA',
    legalExposure: 'DPDPA non-compliance and elevated penalty risk',
    control: 'Attach MTA-DPA whenever personal data processing exists',
  },
  {
    stage: 'Stage 5',
    risk: 'Contractor engaged without IP assignment',
    legalExposure: 'Copyright ownership remains with contractor by default',
    control: 'MTA-FC agreement with explicit IP assignment before work begins',
  },
  {
    stage: 'Stage 6–7',
    risk: 'Scope expansion without formal change order',
    legalExposure: 'Margin erosion and scope disputes',
    control: 'Universal written change-order policy',
  },
  {
    stage: 'Stage 7',
    risk: 'Sponsored content published without disclosure',
    legalExposure: 'ASCI and consumer-protection exposure',
    control: 'Disclosure tags in first lines for sponsored/paid content',
  },
  {
    stage: 'Stage 9',
    risk: 'Delivery without documentation',
    legalExposure: 'Operational disputes over completion and usability',
    control: 'Mandatory handover package across service lines',
  },
]

export const legalFrameworks: ComplianceFramework[] = [
  {
    framework: 'Indian Contract Act, 1872',
    applicability: 'All client and contractor agreements',
    usage: 'Formation, performance, breach remedies, and enforceability baseline',
  },
  {
    framework: 'Information Technology Act, 2000',
    applicability: 'Cybersecurity operations and digital-data handling',
    usage: 'Authorization boundaries and digital conduct liabilities',
  },
  {
    framework: 'DPDPA, 2023',
    applicability: 'Personal data processing engagements',
    usage: 'Fiduciary/processor obligations, safeguards, and breach duties',
  },
  {
    framework: 'Copyright Act, 1957',
    applicability: 'Web, branding, software, and contractor output IP',
    usage: 'IP assignment/licensing ownership controls',
  },
  {
    framework: 'ASCI Guidelines, 2021',
    applicability: 'Advertising, social campaigns, and influencer disclosures',
    usage: 'Mandatory disclosure and misleading-claims controls',
  },
  {
    framework: 'NIST / ISO / OWASP / CVSS references',
    applicability: 'Security and engineering delivery standards',
    usage: 'Operational benchmark frameworks for implementation quality and reporting',
  },
]

export const reportHighlights: ReportHighlight[] = [
  {
    title: 'Referrals dominate',
    summary: 'Most agencies still rely on client referrals, with content, LinkedIn and events filling the rest of the funnel.',
  },
  {
    title: 'Process is predictable',
    summary: 'Lead generation, discovery, proposal, delivery, and retention appear across most agency types.',
  },
  {
    title: 'MTA has a visibility gap',
    summary: 'The site is strong on transparency, but weak on case studies, SEO depth, and focused messaging.',
  },
]

export const agencyTaxonomy: AgencyTaxonomyItem[] = [
  {
    category: 'Digital Marketing',
    description: 'SEO, PPC, social, content, analytics, and performance-led growth services.',
    examples: ['AdLift', 'Techmagnate', 'WATConsult'],
  },
  {
    category: 'Creative / Branding',
    description: 'Brand strategy, campaigns, visual identity, content production, and experience design.',
    examples: ['FCB Kinnect', 'FoxyMoron', 'Schbang'],
  },
  {
    category: 'PR / Communications',
    description: 'Public relations, crisis handling, corporate communication, and reputation management.',
    examples: ['Adfactors PR', 'Edelman India'],
  },
  {
    category: 'Staffing / Recruitment',
    description: 'Talent acquisition, payroll staffing, contract hiring, and executive search.',
    examples: ['Randstad India', 'TeamLease Digital'],
  },
  {
    category: 'Technical / Software',
    description: 'Web, mobile, AI, cloud, and software delivery with fixed-bid or retainer support.',
    examples: ['PixelCrayons', 'Interactive Avenues'],
  },
]

export const operatingModels: OperatingModel[] = [
  {
    title: 'Small / Boutique',
    summary: 'Founder-led delivery, flexible pricing, and multi-role teams of 3–10 people.',
    team: 'Generalists, PM, designer, developer',
    pricing: 'Project fees, monthly retainers, paid discovery',
    stack: 'Sheets, Zoho, Trello, WhatsApp, GA',
  },
  {
    title: 'Mid-Size Growth',
    summary: 'Dedicated sales, account management, and repeatable proposal systems.',
    team: 'BD, AM, PM, specialists',
    pricing: 'Standardized retainers + campaigns',
    stack: 'HubSpot, LinkedIn Sales Nav, Asana, Mailchimp',
  },
  {
    title: 'Enterprise / Networked',
    summary: 'Formal sales teams, packaged offers, CRM, automation, and legal rigor.',
    team: 'Sales director, strategists, vertical specialists',
    pricing: 'RFP-driven, retainer + performance clauses',
    stack: 'Salesforce, Marketo, Power BI, RFPIO',
  },
]

export const agencyComparison: AgencyComparisonRow[] = [
  { agency: 'Social Panga', location: 'Bengaluru', services: 'SEO, SMM, PPC, branding', clients: 'B2C brands', pipeline: 'Referrals → discovery → proposal', dealSize: 'Unknown', tools: 'Google Ads, GA, CRM' },
  { agency: 'AdLift', location: 'Mumbai', services: 'SEO, SEM, CRO, analytics', clients: 'SMEs to Fortune 500', pipeline: 'Inbound → qualification → ROI review', dealSize: 'Unknown', tools: 'SEMrush, Search Console' },
  { agency: 'FCB Kinnect', location: 'Mumbai', services: 'Digital creative, influencer marketing', clients: 'Consumer brands', pipeline: 'Events → pitch → campaign delivery', dealSize: 'Unknown', tools: 'Brandwatch, creative suites' },
  { agency: 'FoxyMoron', location: 'Mumbai', services: 'Creative, content, social, media', clients: 'FMCG, tech, retail', pipeline: 'Inbound → workshop → multi-channel execution', dealSize: '₹5L–₹50L', tools: 'Adobe CC, analytics' },
  { agency: 'Schbang', location: 'Mumbai', services: 'Integrated marketing, media, tech', clients: 'National brands', pipeline: 'Events → discovery → end-to-end execution', dealSize: '₹10L+', tools: 'Figma, BI dashboards' },
  { agency: 'RepIndia', location: 'Delhi', services: 'SEO, social, ORM, web dev', clients: 'Large brands', pipeline: 'Inbound → proposal → monthly reporting', dealSize: '₹5L–₹30L', tools: 'Semrush, GA' },
  { agency: 'Techmagnate', location: 'Delhi', services: 'Enterprise SEO, PPC, analytics', clients: 'E-commerce, BFSI, education', pipeline: 'Audit → proposal → retainer', dealSize: '₹2L–₹50L', tools: 'Ahrefs, Moz' },
  { agency: 'WATConsult', location: 'Mumbai', services: 'Strategy, social, mobile, video', clients: 'Multinationals', pipeline: 'Inquiry → discovery → retainers', dealSize: '₹10L+', tools: 'Salesforce, Adobe CC' },
  { agency: 'Webchutney', location: 'Mumbai', services: 'Content, web, integrated campaigns', clients: 'FMCG, e-commerce', pipeline: 'RFPs → creative brief → delivery', dealSize: '₹5L–₹30L', tools: 'Adobe, CMS' },
  { agency: 'Adfactors PR', location: 'Mumbai', services: 'PR, corporate, financial, crisis', clients: '700+ retained clients', pipeline: 'Referral/RFP → strategy → retainers', dealSize: '₹10L–₹1Cr', tools: 'Cision, Meltwater' },
  { agency: 'Edelman India', location: 'Mumbai', services: 'PR, reputation, public affairs', clients: 'Global corporations', pipeline: 'Global inquiry → proposal → execution', dealSize: '₹20L+', tools: 'Brandwatch, CRM' },
  { agency: 'Randstad India', location: 'Delhi', services: 'Staffing and recruitment', clients: 'Enterprises and SMEs', pipeline: 'Brief → shortlist → onboarding', dealSize: '8–12% salary', tools: 'ATS, LinkedIn Recruiter' },
  { agency: 'TeamLease Digital', location: 'Mumbai', services: 'IT staffing, payroll', clients: 'Tech firms, startups', pipeline: 'BD → talent supply → account mgmt', dealSize: '~10% salary', tools: 'HRMS, assessments' },
  { agency: 'PixelCrayons', location: 'Jaipur', services: 'Software outsourcing, AI/ML', clients: 'SMEs and startups', pipeline: 'Inbound → milestones → maintenance', dealSize: '$5K–$50K+', tools: 'React, Node, Jira' },
  { agency: 'Interactive Avenues', location: 'Mumbai', services: 'Full-service digital marketing', clients: 'Mid-large enterprises', pipeline: 'Inquiry → pitch → analytics', dealSize: '₹5L+', tools: 'Google Marketing Platform' },
]

export const pipelineStrategies: StrategyPhase[] = [
  {
    name: 'Lean-Boutique Model',
    audience: 'Small agencies and founder-led teams',
    steps: ['Lead with referrals and founder network', 'Run short qualification calls', 'Sell a paid discovery workshop', 'Close with concise scope and pricing', 'Deliver an MVP, then upsell support'],
    roles: ['Founder', 'Account lead', 'Developer/designer'],
    stack: ['Zoho CRM', 'Google Sheets', 'Trello', 'WhatsApp', 'GA4'],
    kpis: ['Qualified leads / month', 'Discovery workshops booked', 'Proposal conversion rate', 'Monthly recurring revenue'],
    timeline: 'Setup in 1–2 weeks; payback expected in ~3 months',
  },
  {
    name: 'Growth-Stage Model',
    audience: 'Mid-size agencies scaling from 10–50 people',
    steps: ['Blend referrals, ads, and content', 'Hire dedicated BD support', 'Standardize discovery and proposals', 'Assign PMs and account owners', 'Pitch renewals and add-ons before contract end'],
    roles: ['BD manager', 'Account executive', 'Project manager', 'Specialist teams'],
    stack: ['HubSpot', 'LinkedIn Sales Nav', 'Asana', 'Mailchimp', 'Better Proposals'],
    kpis: ['3x pipeline coverage', 'Lead velocity', 'Win rate', 'Client LTV'],
    timeline: 'Ramps in ~30 days with 30/60/90-day milestones',
  },
  {
    name: 'Enterprise-Grade Model',
    audience: 'Agencies targeting large accounts and RFPs',
    steps: ['Use thought leadership and partnerships', 'Run SDR/BDR outreach', 'Respond to formal RFPs', 'Negotiate with detailed SOWs', 'Hold quarterly reviews for retention'],
    roles: ['Sales director', 'Proposal writer', 'Architect', 'Account manager', 'CSM'],
    stack: ['Salesforce', 'Marketo', 'RFPIO', 'Power BI', 'ZoomInfo'],
    kpis: ['4x pipeline-to-quota', 'Sales cycle length', 'Win rate', 'Renewal rate', 'NPS'],
    timeline: 'Full deployment in 3–6 months; ROI measured annually',
  },
]

export const gapAnalysis: GapAnalysisItem[] = [
  {
    area: 'Messaging',
    current: 'Broad service list without a single sharp positioning statement.',
    recommendation: 'Lead with a clear niche and keyword-rich value proposition.',
    impact: 'Higher clarity, stronger SEO, better qualification.',
  },
  {
    area: 'Portfolio',
    current: 'Too few completed case studies and limited proof of outcomes.',
    recommendation: 'Publish 2–3 detailed case studies with measurable results.',
    impact: 'Improved trust and conversion on sales calls.',
  },
  {
    area: 'SEO',
    current: 'Minimal on-page text and weak content depth.',
    recommendation: 'Expand service copy, add blog cadence, and optimize metadata.',
    impact: 'Better rankings and more organic leads.',
  },
  {
    area: 'Social proof',
    current: 'Little visible client-logo or review coverage.',
    recommendation: 'Add testimonials, client logos, and third-party reviews.',
    impact: 'Stronger credibility and faster sales cycles.',
  },
]

export const actionPlan: ActionPlanPhase[] = [
  {
    phase: '0–30 Days',
    window: 'Immediate fixes',
    priorities: ['Rewrite core messaging', 'Add 3 case studies', 'Improve service-page SEO', 'Collect testimonials'],
    kpis: ['+50% more qualified leads', '5 tracked keywords', '3 published case studies'],
  },
  {
    phase: '30–90 Days',
    window: 'Pipeline build-out',
    priorities: ['Launch outreach campaigns', 'Post weekly blogs', 'Start LinkedIn/Google ads', 'Implement CRM tracking'],
    kpis: ['3x pipeline coverage', '1 blog/week', 'Monthly discovery calls'],
  },
  {
    phase: '90–180 Days',
    window: 'Scale and optimize',
    priorities: ['Hire BD support', 'Refine proposal templates', 'Review conversion data', 'Double down on best channels'],
    kpis: ['Win-rate growth', 'Higher LTV', 'More retained clients'],
  },
]
