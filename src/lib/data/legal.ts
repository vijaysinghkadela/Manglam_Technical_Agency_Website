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
  slug: 'privacy-policy' | 'terms-of-service' | 'ai-ethics-policy' | 'dpdp-implementation-checklist'
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
    slug: 'performance-marketing-services-agreement',
    code: 'MTA-DM',
    name: 'Performance Marketing Services Agreement',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Monthly SMM management, campaign execution, and performance reporting.',
    whenRequired: 'Required before performance marketing retainer or campaign operations.',
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
    slug: 'rules-of-engagement',
    code: 'MTA-ROE',
    name: 'Rules of Engagement for Penetration Testing',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Legal authorization framework defining scope, boundaries, and permissible actions for ethical hacking engagements.',
    whenRequired: 'Mandatory before any penetration testing or vulnerability assessment begins.',
    publicSummary:
      'Defines IP ranges, applications in scope, testing windows, exclusions, emergency contacts, and explicit written authorization for lawful testing under IT Act 2000.',
    governingLaws: ['IT Act, 2000 (Sections 43 & 66)', 'Indian Contract Act, 1872', 'DPDPA, 2023'],
    companionAgreements: ['MTA-CS', 'MTA-NDA', 'MTA-DPA'],
    keyClauses: [
      'Explicit scope definition (IP ranges, applications, exclusions)',
      'Testing windows and emergency contact protocols',
      'No production disruption / no denial-of-service clause',
      'Data handling and destruction obligations (7-day deletion post-test)',
      'Breach notification without undue delay',
    ],
  },
  {
    slug: 'dpdp-breach-templates',
    code: 'MTA-DPDP-BREACH',
    name: 'DPDP Breach Notification Templates',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Standardized templates for DPDP Act 2023 personal data breach notifications to Data Principals and Data Protection Board.',
    whenRequired: 'Triggered within 24 hours of discovering any personal data breach during testing or operations.',
    publicSummary:
      'Includes Data Principal notice template (plain language), DPB detailed report template (72-hour), and processor-to-fiduciary alert template.',
    governingLaws: ['DPDPA, 2023 (Section 8(6))', 'DPDP Rules, 2025 (Rule 7)', 'IT Act, 2000'],
    companionAgreements: ['MTA-DPA', 'MTA-CS'],
    keyClauses: [
      'Without undue delay notification requirement',
      'Plain language for Data Principals',
      'Detailed facts for DPB within 72 hours',
      'Mitigation measures and remedial steps documentation',
    ],
  },
  {
    slug: 'cert-in-compliance',
    code: 'MTA-CERT-IN',
    name: 'CERT-In Compliance Addendum',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Ensures adherence to CERT-In Directions 2022 for incident reporting and log retention requirements.',
    whenRequired: 'Required for all clients covered under CERT-In Directions (body corporates, service providers, intermediaries with websites/apps).',
    publicSummary:
      'Mandates 6-hour incident reporting, 180-day log retention, synchronized NTP timestamps, and cooperation with CERT-In investigations.',
    governingLaws: ['IT Act, 2000 (Section 70B)', 'CERT-In Directions, 2022', 'DPDPA, 2023'],
    companionAgreements: ['MTA-CS', 'MTA-ROE'],
    keyClauses: [
      '6-hour incident reporting to CERT-In',
      '180-day log retention in India',
      'Accurate NTP synchronization',
      'Mandatory cooperation with CERT-In data requests',
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
  {
    slug: 'ai-ethics-policy',
    code: 'MTA-AIE',
    name: 'AI Ethics Policy for Performance Marketing',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Defines ethical AI usage principles, transparency requirements, and human oversight obligations for all SMM operations.',
    whenRequired: 'Mandatory for all SMM retainers and any engagement using AI tools for content generation, community management, or audience targeting.',
    publicSummary:
      'Establishes MTA principles for ethical AI deployment: transparency and SGI labeling per IT Amendment Rules 2026, human-in-the-loop requirements, bias mitigation, DPDP consent for AI processing, deepfake prohibition, and C2PA Content Credentials compliance.',
    governingLaws: ['IT Amendment Rules, 2026 (SGI Labeling)', 'DPDPA, 2023', 'ASCI Guidelines, 2021', 'Indian Contract Act, 1872'],
    companionAgreements: ['MTA-DM', 'MTA-DPA', 'MTA-NDA'],
    keyClauses: [
      'All AI-generated content labeled as Synthetically Generated Information (SGI) per IT Rules 2026',
      '100% AI output receives human review and approval before posting',
      'No client personal data fed into AI tools without explicit written consent',
      'Deepfake/synthetic media prohibited for testimonials without consent + human editing',
      'C2PA v2.4 Content Credentials embedded on all AI-assisted visual content',
      'Deepfake detection (Resemble AI + Hive) required before posting',
      'Monthly internal audit and annual policy review',
    ],
  },
  {
    slug: 'dpdp-implementation-checklist',
    code: 'MTA-DPDP-IMPL',
    name: 'DPDP Act 2023 Implementation Checklist',
    visibility: 'public',
    requestable: true,
    primaryUse: 'Comprehensive compliance checklist for DPDP Act 2023 implementation covering all data fiduciary obligations.',
    whenRequired: 'Reference document for all engagements involving personal data processing. Required for DPDP readiness assessments.',
    publicSummary:
      'Step-by-step implementation guide for DPDP Act 2023 compliance including Section 8 obligations, consent management, breach notification procedures (72-hour timeline), Data Principal rights handling, and May 2027 enforcement readiness.',
    governingLaws: ['DPDPA, 2023', 'DPDP Rules, 2025', 'IT Act, 2000', 'Indian Contract Act, 1872'],
    companionAgreements: ['MTA-DPA', 'MTA-DPDP-BREACH', 'MTA-CERT-IN'],
    keyClauses: [
      'Data Fiduciary accountability for all processing including by processors',
      'Valid processor contracts (DPAs) with Supabase, Razorpay, AI tools, etc.',
      'Free, specific, informed, unconditional consent with clear affirmative action',
      'Breach notification to DPB within 72 hours with detailed report',
      'Data Principal rights: access, correction, erasure, grievance redressal',
      'Erasure when consent withdrawn or purpose served (unless legal retention)',
      'Published business contact and grievance mechanism',
      '2-year audit trail of consents required',
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
  {
    slug: 'ai-ethics-policy',
    title: 'AI Ethics Policy for Performance Marketing',
    lastUpdated: 'April 2026',
    summary:
      'Defines MTA principles for ethical AI deployment in SMM operations: transparency, human oversight, bias mitigation, DPDP compliance, deepfake prohibition, and C2PA Content Credentials. Forms part of every SMM retainer, proposal, and client SOW.',
    sections: [
      {
        heading: 'Purpose & Scope',
        body: 'This policy ensures ethical, transparent, and trustworthy campaign content for clients (gyms, healthcare providers, local businesses in Rajasthan). AI must serve the client goals while protecting audience trust, complying with law, and avoiding bias or harm. Applies to performance marketing services: ad creatives, campaign copy, landing page recommendations, lead handling, community replies where scoped, and AI-automated workflows.',
      },
      {
        heading: 'Transparency & SGI Labeling',
        body: 'All AI-generated or AI-assisted content must be clearly labeled as Synthetically Generated Information (SGI) per IT Amendment Rules 2026. Implementation: Prominent caption line "AI-assisted content • Edited by MTA" plus platform-native labels (Instagram "AI-generated", YouTube disclosure) where available. No exceptions for "minor edits".',
      },
      {
        heading: 'Human-in-the-Loop Requirements',
        body: '100% of AI output receives human review and final approval before posting. You or designated team member reviews every post. Audit log maintained (prompt + output + editor name) for compliance verification.',
      },
      {
        heading: 'Bias & Fairness Mitigation',
        body: 'Content must not discriminate by gender, age, caste, religion, location (urban/rural Rajasthan), or language. Prompts tested on diverse audience segments. Weekly manual bias check on gym/healthcare campaigns to ensure fair representation.',
      },
      {
        heading: 'Privacy & DPDP Compliance',
        body: 'Never feed client personal data (gym member lists, patient contacts, app users) into AI tools without explicit written consent. Anonymize data before n8n/AI workflow nodes. Data minimization: only necessary information used for processing. Full DPDP Act 2023 compliance required.',
      },
      {
        heading: 'Accuracy & No Misinformation',
        body: 'All health/fitness/medical claims must be fact-checked against reliable sources. No deepfakes or misleading "before-after" transformations. Healthcare content requires doctor/client sign-off before publication. Claims limited to verified features only.',
      },
      {
        heading: 'Deepfake & Synthetic Media Prohibition',
        body: 'Deepfakes (SGI that appears real and indistinguishable) are prohibited for client testimonials or transformations unless: (1) client provides explicit verifiable consent, (2) final video is human-edited, and (3) content is clearly labeled. Deepfake detection (Resemble AI + Hive Moderation) required on all media before posting.',
      },
      {
        heading: 'C2PA Content Credentials',
        body: 'All AI-assisted visual content must embed C2PA v2.4 Content Credentials before publication. This includes cryptographic manifest with creator claim, AI assertions, edit history, and content bindings. Supported formats: JPEG, PNG, WebP, AVIF, HEIC, MP4, MOV. Tools with C2PA support: Canva Magic Studio, Adobe, Microsoft.',
      },
      {
        heading: 'Tool-Specific Rules',
        body: 'Buffer AI / Predis.ai / Canva Magic: Always add manual disclosure text; human review of performance prediction scores. Claude / Gemini: Prompts must include "Rajasthan audience, Hindi/English, transparent tone". n8n workflows: Anonymization step required before any AI node.',
      },
      {
        heading: 'Accountability & Grievance',
        body: 'MTA remains responsible for all AI-assisted output. Grievance mechanism: clients contact manglamtechnicalagency@gmail.com within 24 hours for response. Internal reviewer assigned per campaign. Audit logs kept for 2 years per DPDP requirements.',
      },
      {
        heading: 'Breach & Incident Response',
        body: 'Any suspected violation (unlabeled SGI, data leak, complaint) triggers: (1) Immediate campaign halt, (2) Client notification "without undue delay", (3) Internal audit within 24 hours, (4) Report to Data Protection Board if DPDP breach (72-hour detailed report), (5) Platform compliance (3-hour removal for flagged SGI).',
      },
      {
        heading: 'Training & Review',
        body: 'All team members trained on this policy at onboarding. Annual policy review or upon any new MeitY/IT Rules notification. Last reviewed: April 2026. Policy version: 1.0.',
      },
    ],
  },
  {
    slug: 'dpdp-implementation-checklist',
    title: 'DPDP Act 2023 Implementation Checklist',
    lastUpdated: 'April 2026',
    summary:
      'Comprehensive compliance checklist for Digital Personal Data Protection Act 2023 implementation. Covers all Data Fiduciary obligations, consent management, breach notification procedures, and May 2027 enforcement readiness timeline.',
    sections: [
      {
        heading: 'Overview & Timeline',
        body: 'The Digital Personal Data Protection Act, 2023 with Rules 2025 (notified November 13, 2025) govern all digital personal data processing in India. Full enforcement begins May 13, 2027 (18 months from notification). Data Protection Board of India is operational. Consent Manager framework activates November 13, 2026. MTA qualifies as Data Fiduciary (determines purpose and means of processing).',
      },
      {
        heading: 'Key Definitions',
        body: 'Data Principal: Individual whose data is processed (gym members, website visitors, FitNexora users). Data Fiduciary: Entity determining purpose/means (MTA). Data Processor: Entity processing on behalf of fiduciary (Supabase, AI tools). Personal Data: Any data about identifiable individual (name, email, phone, health data, IP, behavioral data). Processing: Collection, storage, use, sharing—wholly or partly automated.',
      },
      {
        heading: 'Section 8 Obligations Checklist',
        body: 'ACCOUNTABILITY: MTA responsible for all processing including by processors (Predis.ai, Buffer leaks = MTA liability). PROCESSOR CONTRACTS: Valid DPAs required with Supabase, Razorpay, Canva, AI tools. ACCURACY: Ensure data accurate/complete for decisions (FitNexora records, appointments). TECHNICAL MEASURES: Policies, access controls, staff training. SECURITY SAFEGUARDS: Encryption, RLS, access logs. BREACH NOTIFICATION: Notify Board + principals "without undue delay" (72 hours). ERASURE: Delete when consent withdrawn or purpose served. CONTACT PERSON: Publish business contact. GRIEVANCE MECHANISM: Effective redressal system on website and contracts.',
      },
      {
        heading: 'Consent Requirements (Sections 5-6)',
        body: 'Consent must be: FREE, SPECIFIC, INFORMED, UNCONDITIONAL, UNAMBIGUOUS + clear affirmative action (checkbox, NOT pre-ticked). Notice required before/with consent: Plain language explaining (1) data collected, (2) purpose, (3) how to exercise rights, (4) how to complain to Board. Available in English or 22 scheduled languages. Withdrawal must be as easy as giving consent. No bundling unrelated consents. Children (<18): Verifiable parental consent + no tracking/targeted ads.',
      },
      {
        heading: 'Data Principal Rights (Sections 11-14)',
        body: 'RIGHT TO ACCESS: Summary of data processed + sharing details (respond within prescribed period, likely 30 days). RIGHT TO CORRECTION: Update, complete, or correct data (without undue delay). RIGHT TO ERASURE: Delete data unless legal retention required. RIGHT TO GRIEVANCE: Effective redressal within prescribed timeline. RIGHT TO NOMINATION: Post-death/incapacity data management. Agencies must provide mechanisms and respond timely with documentation.',
      },
      {
        heading: 'Breach Notification Procedures',
        body: 'DETECTION (T+0): Identify breach, contain if possible, document facts. INTERNAL ASSESSMENT (T+24h): Determine scope, affected data, impact assessment. DATA PRINCIPAL NOTICE ("without undue delay"): Plain language explaining breach, impact, and rights. DPB DETAILED REPORT (T+72h): Comprehensive report with facts, extent, impact, mitigation, remediation steps. ONGOING UPDATES: Update Board and principals as investigation progresses.',
      },
      {
        heading: 'Penalty Framework',
        body: 'Failure to prevent breach (security safeguards): ₹250 crore maximum. Failure to notify breach: ₹200 crore maximum. Children data violations: ₹200 crore maximum. Other obligation failures: ₹50 crore maximum. General non-compliance: ₹10,000 per instance. Average breach cost in India (2026): ₹22 crore including legal, remediation, lost business.',
      },
      {
        heading: 'MTA Implementation Checklist',
        body: '1. Update Privacy Policy: Add DPDP notice template, grievance process, processor list. 2. Client Contracts/SOWs: Insert consent clause + data processing addendum. 3. FitNexora App: Supabase RLS + explicit consent flows on signup. 4. SMM Workflows: Document consent for audience data; add AI-assisted labels; never use client personal data in prompts without permission. 5. Processor Agreements: Review Supabase, Razorpay, AI tools for DPDP-compliant DPAs. 6. Internal: Appoint grievance handler; keep 2-year audit trail of consents. 7. Website: Clear privacy notice + consent banner. 8. Breach Response Plan: 1-page playbook (notify → contain → report in 72h).',
      },
      {
        heading: 'Contract Language Templates',
        body: 'DPDP CONSENT CLAUSE: "Client confirms explicit consent has been obtained from all data subjects whose personal data is provided to MTA for processing. Client remains the Data Fiduciary and MTA acts as Data Processor." BREACH NOTIFICATION CLAUSE: "MTA will notify Client within 24 hours of detecting any personal data breach. Client is responsible for notifying the Data Protection Board within 72 hours per DPDP Act 2023." AI PROCESSING CLAUSE: "MTA uses AI tools for service delivery. No client personal data will be used for AI model training without separate written consent."',
      },
      {
        heading: 'Enforcement Readiness Timeline',
        body: 'NOW (April 2026): Audit current practices, update Privacy Policy, review processor agreements, implement consent mechanisms. BY NOVEMBER 2026: Consent Manager framework activation—ensure all consent flows compliant. BY MAY 2027: Full enforcement begins—all obligations must be operational, breach response tested, audit trails in place, grievance mechanism functional.',
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
    service: 'Performance Marketing',
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
  {
    id: 'MTA_ROE_Template.docx',
    name: 'Rules of Engagement Template',
    sourceDoc: 'MTA_ROE_Template.docx',
    visibility: 'public',
    requestable: true,
    notes: 'Penetration testing authorization template with scope definitions.',
  },
  {
    id: 'MTA_DPDP_Breach_Templates.docx',
    name: 'DPDP Breach Notification Templates',
    sourceDoc: 'MTA_DPDP_Breach_Templates.docx',
    visibility: 'public',
    requestable: true,
    notes: 'Breach notification templates for Data Principals and DPB.',
  },
  {
    id: 'MTA_CERT_In_Addendum.docx',
    name: 'CERT-In Compliance Addendum',
    sourceDoc: 'MTA_CERT_In_Addendum.docx',
    visibility: 'public',
    requestable: true,
    notes: 'CERT-In Directions 2022 compliance addendum for incident reporting.',
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
