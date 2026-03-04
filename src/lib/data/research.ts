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
