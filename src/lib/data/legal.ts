export type ContentVisibility = 'public' | 'restricted-request' | 'internal'

export interface AgreementSummary {
  slug: string
  code: string
  name: string
  visibility: ContentVisibility
  requestable: boolean
  primaryUse: string
  whenRequired: string
  publicSummary: string
  governingLaws: string[]
  companionAgreements: string[]
  keyClauses: string[]
}

export interface PolicyDocument {
  slug: 'privacy-policy' | 'terms-of-service'
  title: string
  lastUpdated: string
  summary: string
  sections: { heading: string; body: string }[]
}

export interface ApplicabilityRow {
  service: string
  required: string[]
  conditional: string[]
}

export interface DocumentRegistryItem {
  id: string
  name: string
  sourceDoc: string
  visibility: ContentVisibility
  requestable: boolean
  notes: string
}

export const agreementSummaries: AgreementSummary[] = [
  {
    slug: 'master-services-agreement',
    code: 'MTA-MSA',
    name: 'Master Services Agreement',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Umbrella framework for repeat client engagements and project-level SOW attachments.',
    whenRequired: 'Use before recurring multi-project relationships or where multiple service agreements are expected.',
    publicSummary:
      'Sets baseline commercial terms, liability limits, dispute process, and precedence for service-specific SOWs or agreements.',
    governingLaws: ['Indian Contract Act, 1872', 'Arbitration and Conciliation Act, 1996'],
    companionAgreements: ['MTA-NDA', 'MTA-DPA'],
    keyClauses: [
      'Order of precedence between MSA and SOW/service agreements',
      'Liability cap tied to fees paid for the covered period',
      'Payment terms, suspension rights, and notice-driven termination',
      'Arbitration seat in India with injunctive relief carve-out for confidentiality breaches',
    ],
  },
  {
    slug: 'nda',
    code: 'MTA-NDA',
    name: 'Non-Disclosure Agreement',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Protects confidential information before discovery and throughout engagements.',
    whenRequired:
      'Mandatory before discovery calls, proposal walkthroughs, architecture reviews, or any sensitive information exchange.',
    publicSummary:
      'Defines confidentiality scope, use restrictions, breach remedies, and post-termination protection period.',
    governingLaws: [
      'Indian Contract Act, 1872',
      'Specific Relief Act, 1963',
      'Arbitration and Conciliation Act, 1996',
    ],
    companionAgreements: [],
    keyClauses: [
      'Confidentiality survives engagement + 3 years',
      'Use limitation: purpose-bound processing and disclosure',
      'Injunctive relief available without proving monetary damages',
      'Arbitration with seat in India',
    ],
  },
  {
    slug: 'web-development-services-agreement',
    code: 'MTA-WD',
    name: 'Web Development Services Agreement',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Website design, build, QA, deployment, and handover projects.',
    whenRequired: 'Required before any web design/development implementation starts.',
    publicSummary:
      'Defines web scope, milestones, payment gates, change-order process, IP transfer on full payment, and support terms.',
    governingLaws: [
      'Indian Contract Act, 1872',
      'Copyright Act, 1957',
      'Information Technology Act, 2000',
      'DPDPA, 2023',
    ],
    companionAgreements: ['MTA-DPA'],
    keyClauses: [
      'Source code handover only after final payment',
      'Change requests require written change order',
      'Year 1 support baseline and paid Year 2+ maintenance',
      'Explicit payment-linked stage progression',
    ],
  },
  {
    slug: 'social-media-marketing-services-agreement',
    code: 'MTA-DM',
    name: 'Social Media Marketing Services Agreement',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Monthly SMM management, campaign execution, and performance reporting.',
    whenRequired: 'Required before social media retainer or campaign operations.',
    publicSummary:
      'Covers content lifecycle, approval windows, ad budget controls, disclosure compliance, and reporting responsibilities.',
    governingLaws: [
      'Indian Contract Act, 1872',
      'ASCI Guidelines, 2021',
      'Consumer Protection Act, 2019',
      'DPDPA, 2023',
    ],
    companionAgreements: ['MTA-DPA'],
    keyClauses: [
      'Content approval SLA and deemed approval window',
      'Sponsored content disclosure (#Ad / #Sponsored) obligations',
      'Ad spend pre-authorization and budget cap controls',
      'Monthly retainer in advance with suspension on late payment',
    ],
  },
  {
    slug: 'cybersecurity-services-agreement',
    code: 'MTA-CS',
    name: 'Cybersecurity Services Agreement',
    visibility: 'public',
    requestable: true,
    primaryUse: 'VAPT, security audits, managed security monitoring, and incident response engagements.',
    whenRequired: 'Mandatory before any testing or security operations begin on client systems.',
    publicSummary:
      'Provides legal authorization boundary, rules of engagement, severity reporting standards, and remediation/retest terms.',
    governingLaws: [
      'Information Technology Act, 2000 (Sections 43 & 66)',
      'IT Rules, 2011',
      'DPDPA, 2023',
      'Indian Contract Act, 1872',
    ],
    companionAgreements: ['MTA-NDA'],
    keyClauses: [
      'Explicit written authorization requirement for lawful testing',
      'No exfiltration/no modification/no unauthorized retention controls',
      'CVSS v3.1 aligned severity and reporting methodology',
      'Critical vulnerability immediate disclosure and retest cycle',
    ],
  },
  {
    slug: 'ai-automation-consulting-services-agreement',
    code: 'MTA-AI',
    name: 'AI Automation & Consulting Services Agreement',
    visibility: 'public',
    requestable: true,
    primaryUse: 'AI automation builds, workflow integration, and AI consulting engagements.',
    whenRequired: 'Required before AI workflow, chatbot, or ML implementation begins.',
    publicSummary:
      'Defines AI scope, milestone acceptance, model/data controls, and ethics-by-design requirements for deployment.',
    governingLaws: [
      'Indian Contract Act, 1872',
      'Copyright Act, 1957',
      'DPDPA, 2023',
      'Information Technology Act, 2000',
    ],
    companionAgreements: ['MTA-DPA', 'MTA-NDA'],
    keyClauses: [
      'No client PII to third-party AI APIs without written consent + valid DPA',
      'Training data ownership remains with client',
      'Data deletion within 30 days post-completion',
      'Human oversight and named accountability for AI outputs',
    ],
  },
  {
    slug: 'saas-licence-agreement',
    code: 'MTA-SL',
    name: 'Software & SaaS Licence Agreement',
    visibility: 'public',
    requestable: true,
    primaryUse: 'SaaS access and recurring software licensing engagements.',
    whenRequired: 'Required before granting client access to MTA-developed software.',
    publicSummary:
      'Governs license grants, prohibited usage, SLA commitments, incident obligations, and renewal/termination mechanics.',
    governingLaws: [
      'Copyright Act, 1957',
      'Indian Contract Act, 1872',
      'DPDPA, 2023',
      'Information Technology Act, 2000',
    ],
    companionAgreements: ['MTA-DPA'],
    keyClauses: [
      'Limited, non-transferable, revocable software licence',
      'No reverse engineering, resale, or credential sharing',
      'SLA response windows and uptime baselines',
      'Personal data deletion and breach communication timelines',
    ],
  },
  {
    slug: 'data-processing-agreement',
    code: 'MTA-DPA',
    name: 'Data Processing Agreement',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Data processing guardrails whenever MTA handles client user/employee/customer personal data.',
    whenRequired: 'Mandatory in all engagements where personal data processing is in scope.',
    publicSummary:
      'Establishes Data Fiduciary/Processor relationship, security controls, breach timelines, and deletion obligations.',
    governingLaws: [
      'DPDPA, 2023',
      'IT Rules, 2011',
      'Indian Contract Act, 1872',
      'Information Technology Act, 2000',
    ],
    companionAgreements: ['MTA-WD', 'MTA-DM', 'MTA-AI', 'MTA-SL'],
    keyClauses: [
      'Processor acts only on documented fiduciary instructions',
      'Breach notification and rights-assistance SLAs',
      'Encryption, RBAC, MFA, backups, and audit-log controls',
      'Data deletion within 30 days of service termination',
    ],
  },
  {
    slug: 'contractor-freelancer-agreement',
    code: 'MTA-FC',
    name: 'Independent Contractor & Freelancer Agreement',
    visibility: 'restricted-request',
    requestable: true,
    primaryUse: 'Internal/external contractor onboarding for client delivery support.',
    whenRequired: 'Required before assigning any external contractor/freelancer to MTA work.',
    publicSummary:
      'Defines independent-contractor status, IP assignment, confidentiality, non-solicitation, and tax-handling obligations.',
    governingLaws: ['Indian Contract Act, 1872', 'Copyright Act, 1957', 'Income Tax Act, 1961'],
    companionAgreements: ['MTA-NDA'],
    keyClauses: [
      'Explicit and irrevocable IP assignment (no automatic transfer under Indian law)',
      '12-month client non-solicitation clause',
      'Confidentiality obligations and post-termination survival',
      'TDS deduction and compliance responsibilities',
    ],
  },
]

export const policyDocuments: PolicyDocument[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: 'March 2026',
    summary:
      'Explains what personal data we collect, why we process it, how we protect it, and how users can exercise data rights under applicable Indian law.',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'We collect contact and project-intent data submitted through website forms, plus limited technical telemetry required for security and performance monitoring.',
      },
      {
        heading: 'How We Use Data',
        body: 'Data is used for responding to enquiries, pre-sales qualification, contracted service delivery, compliance operations, and website/service improvement.',
      },
      {
        heading: 'Security Measures',
        body: 'We maintain layered controls including encryption in transit, access controls, monitoring, and documented incident-response processes.',
      },
      {
        heading: 'Data Subject Rights',
        body: 'Users can request access, correction, or deletion by contacting MTA through listed support channels.',
      },
      {
        heading: 'Policy Updates',
        body: 'Material updates are published with revised effective dates to preserve transparency over processing practices.',
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    lastUpdated: 'March 2026',
    summary:
      'Defines website and service usage terms, payment obligations, ownership boundaries, liability limits, and governing law/dispute process.',
    sections: [
      {
        heading: 'Service Framework',
        body: 'Actual deliverables, commercial terms, and timelines are governed by signed service-specific agreements or SOWs.',
      },
      {
        heading: 'Payment and Suspension',
        body: 'Payments are milestone-linked or retainer-based; overdue invoices may trigger scoped suspension until dues are settled.',
      },
      {
        heading: 'IP and Confidentiality',
        body: 'Client IP transfer terms are tied to final payment and contractual scope, while confidentiality obligations survive termination.',
      },
      {
        heading: 'Liability and Governing Law',
        body: 'Liability is contractually limited, and disputes are handled under Indian law and the agreement-specific dispute clause.',
      },
    ],
  },
]

export const agreementApplicabilityMatrix: ApplicabilityRow[] = [
  {
    service: 'Web Development',
    required: ['MTA-WD'],
    conditional: ['MTA-DPA (if personal data/analytics)', 'MTA-NDA (if confidential data shared pre-signature)'],
  },
  {
    service: 'Social Media Marketing',
    required: ['MTA-DM'],
    conditional: ['MTA-DPA (if user data/automation handling)', 'MTA-NDA'],
  },
  {
    service: 'Cybersecurity / VAPT',
    required: ['MTA-CS'],
    conditional: ['MTA-NDA (recommended before discovery)'],
  },
  {
    service: 'AI Automation',
    required: ['MTA-AI'],
    conditional: ['MTA-DPA (if personal data)', 'MTA-NDA'],
  },
  {
    service: 'SaaS Platform Access',
    required: ['MTA-SL'],
    conditional: ['MTA-DPA (if accounts/personal data)'],
  },
  {
    service: 'Contractor/Freelancer Engagement',
    required: ['MTA-FC'],
    conditional: ['MTA-NDA'],
  },
]

export const documentRegistry: DocumentRegistryItem[] = [
  {
    id: 'MTA_NDA_template.docx',
    name: 'NDA Template',
    sourceDoc: 'MTA_NDA_template.docx',
    visibility: 'public',
    requestable: true,
    notes: 'Client-safe template, shareable by request after manual review.',
  },
  {
    id: 'MTA_AG1_Web_Development_Agreement.docx',
    name: 'Web Development Agreement Template',
    sourceDoc: 'MTA_AG1_Web_Development_Agreement.docx',
    visibility: 'public',
    requestable: true,
    notes: 'Share sanitized template version only.',
  },
  {
    id: 'MTA_AG2_SMM_Services_Agreement.docx',
    name: 'SMM Services Agreement Template',
    sourceDoc: 'MTA_AG2_SMM_Services_Agreement.docx',
    visibility: 'public',
    requestable: true,
    notes: 'Share sanitized template version only.',
  },
  {
    id: 'MTA_AG3_Cybersecurity_Agreement.docx',
    name: 'Cybersecurity Services Agreement Template',
    sourceDoc: 'MTA_AG3_Cybersecurity_Agreement.docx',
    visibility: 'public',
    requestable: true,
    notes: 'Share sanitized template version only.',
  },
  {
    id: 'MTA_AG4_AI_Automation_Agreement.docx',
    name: 'AI Automation Agreement Template',
    sourceDoc: 'MTA_AG4_AI_Automation_Agreement.docx',
    visibility: 'public',
    requestable: true,
    notes: 'Share sanitized template version only.',
  },
  {
    id: 'MTA_AG5_SaaS_Licence_Agreement.docx',
    name: 'SaaS Licence Agreement Template',
    sourceDoc: 'MTA_AG5_SaaS_Licence_Agreement.docx',
    visibility: 'public',
    requestable: true,
    notes: 'Share sanitized template version only.',
  },
  {
    id: 'MTA_AG8_Data_Processing_Agreement.docx',
    name: 'Data Processing Agreement Template',
    sourceDoc: 'MTA_AG8_Data_Processing_Agreement.docx',
    visibility: 'public',
    requestable: true,
    notes: 'Share sanitized template version only.',
  },
  {
    id: 'MTA_AG7_Contractor_Freelancer_Agreement.docx',
    name: 'Contractor/Freelancer Agreement Template',
    sourceDoc: 'MTA_AG7_Contractor_Freelancer_Agreement.docx',
    visibility: 'restricted-request',
    requestable: true,
    notes: 'Restricted to vetted requesters due internal staffing sensitivity.',
  },
  {
    id: 'MTA_Policy_Handbook_Improved.docx',
    name: 'Policy Handbook (Internal)',
    sourceDoc: 'MTA_Policy_Handbook_Improved.docx',
    visibility: 'internal',
    requestable: false,
    notes: 'Internal governance document; not public.',
  },
  {
    id: 'MTA_New_Owner_Guide.docx',
    name: 'New Owner Guide (Internal)',
    sourceDoc: 'MTA_New_Owner_Guide.docx',
    visibility: 'internal',
    requestable: false,
    notes: 'Internal operational transfer document; not public.',
  },
  {
    id: 'MTA_Department_Guides_Fixed.docx',
    name: 'Department Guides (Internal)',
    sourceDoc: 'MTA_Department_Guides_Fixed.docx',
    visibility: 'internal',
    requestable: false,
    notes: 'Internal execution playbooks; not public.',
  },
  {
    id: 'MNSS_Agreement.docx',
    name: 'Executed Client Agreement: MNSS',
    sourceDoc: 'MNSS_Agreement.docx',
    visibility: 'internal',
    requestable: false,
    notes: 'Executed client-specific contract; confidential.',
  },
  {
    id: 'MTA_MNSS_Social_Media_Automation_Agreement.docx',
    name: 'Executed Client Agreement: MNSS SMM Automation',
    sourceDoc: 'MTA_MNSS_Social_Media_Automation_Agreement.docx',
    visibility: 'internal',
    requestable: false,
    notes: 'Executed client-specific contract; confidential.',
  },
]

export const legalPageSlugs = ['master-services-agreement', 'nda', 'privacy-policy', 'terms-of-service'] as const

export const publicAgreementSummaries = agreementSummaries.filter((item) => item.visibility !== 'internal')
export const requestableAgreements = agreementSummaries.filter((item) => item.requestable)

export function getAgreementBySlug(slug: string) {
  return agreementSummaries.find((item) => item.slug === slug)
}

export function getAgreementByCode(code: string) {
  return agreementSummaries.find((item) => item.code === code)
}

export function getPolicyBySlug(slug: PolicyDocument['slug']) {
  return policyDocuments.find((item) => item.slug === slug)
}
