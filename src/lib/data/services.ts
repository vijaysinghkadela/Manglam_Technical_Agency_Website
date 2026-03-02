import { Globe, Share2, Shield, Bot, Key, Database, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ServiceProcess {
  step: number
  title: string
  desc: string
  duration: string
}

export interface ServiceFaq {
  q: string
  a: string
}

export interface ServicePricingPlan {
  label: string
  amount: string
  period?: string
  features: string[]
  highlight?: boolean
}

export interface Service {
  slug: string
  name: string
  tagline: string
  Icon: LucideIcon
  description: string
  features: string[]
  priceLabel: string
  process: ServiceProcess[]
  pricing: ServicePricingPlan[]
  faqs: ServiceFaq[]
}

export const services: Service[] = [
  {
    slug: 'web-development',
    name: 'Web Development',
    tagline: 'Custom websites built to convert and scale',
    Icon: Globe,
    description:
      'End-to-end website design and development tailored to your goals — responsive, fast, and built with modern tech. Delivered in weeks, not months.',
    features: [
      'Responsive design (mobile + desktop)',
      'Content integration & SEO foundations',
      '1-year free domain + maintenance',
      'QA testing & production deployment',
    ],
    priceLabel: 'From ₹50,000',
    process: [
      { step: 1, title: 'Discovery Call',     desc: 'We learn your goals, audience, and content requirements in depth.',         duration: '1–2 days' },
      { step: 2, title: 'Proposal & Scope',   desc: 'Written deliverables, fixed price, and timeline — signed before work starts.', duration: '2–3 days' },
      { step: 3, title: 'Design Sprints',     desc: 'Visual mockups and layout approval before development begins.',               duration: '1 week'   },
      { step: 4, title: 'Development',        desc: 'Full build with staging previews and weekly check-ins.',                     duration: '1–3 weeks'},
      { step: 5, title: 'QA & Launch',        desc: 'Cross-device testing, performance checks, and go-live execution.',           duration: '2–3 days' },
      { step: 6, title: 'Handover & Support', desc: '1-year free maintenance, domain, and performance monitoring included.',     duration: 'Ongoing'  },
    ],
    pricing: [
      {
        label: 'Starter',
        amount: '₹50,000',
        period: 'one-time',
        features: ['Up to 5 pages', 'Responsive layout', '1-yr free domain & maintenance', 'QA & deployment', 'Performance monitoring'],
        highlight: false,
      },
      {
        label: 'Growth',
        amount: '₹75,000–₹1,00,000',
        period: 'one-time',
        features: ['Up to 15 pages', 'CMS integration', 'Blog & SEO setup', 'Custom animations', 'Priority support'],
        highlight: true,
      },
      {
        label: 'Custom',
        amount: 'Get Quote',
        features: ['E-commerce / portal', 'SaaS dashboard', 'API integrations', 'Custom scope'],
        highlight: false,
      },
    ],
    faqs: [
      { q: 'How long does a typical website take?',   a: 'Standard 5-page sites take 3 weeks. Complex portals or e-commerce can take 6–10 weeks.' },
      { q: 'What is included in Year 1 free support?', a: 'Domain registration, maintenance updates, bug fixes, and performance monitoring — all free for 12 months.' },
      { q: 'Do you build on WordPress or custom code?', a: 'Both. We recommend Next.js for performance and WordPress for content-heavy sites. We discuss the best fit in the discovery call.' },
      { q: 'Can you redesign my existing website?', a: 'Yes. We audit your current site and rebuild it on a modern stack, preserving your SEO and content.' },
      { q: 'Do you provide hosting?', a: 'We deploy on Vercel, AWS, or your preferred provider. Hosting costs are not included in the project fee.' },
    ],
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media & Automation',
    tagline: 'Content that grows communities and automates engagement',
    Icon: Share2,
    description:
      'Data-driven social media management combined with automation workflows — so your brand stays active and consistent without manual effort.',
    features: [
      'Facebook & Instagram management',
      'Content creation & scheduling',
      'Automated posting workflows',
      'Monthly analytics reports',
    ],
    priceLabel: '₹10,000/month',
    process: [
      { step: 1, title: 'Onboarding',        desc: 'Account access, brand audit, content guidelines established.',    duration: '2 days'   },
      { step: 2, title: 'Content Calendar',  desc: 'Monthly content plan reviewed and approved before scheduling.',  duration: '3 days'   },
      { step: 3, title: 'Create & Schedule', desc: 'Posts, reels, and stories created and auto-scheduled.',           duration: 'Ongoing'  },
      { step: 4, title: 'Automate',          desc: 'Workflow automation for scheduling, responses, and campaigns.',  duration: '1 week'   },
      { step: 5, title: 'Report & Refine',   desc: 'Monthly analytics review and strategy adjustment.',              duration: 'Monthly'  },
    ],
    pricing: [
      {
        label: 'Monthly',
        amount: '₹10,000',
        period: 'per month',
        features: ['2 platforms (Facebook + Instagram)', '12 posts/month', 'Basic automation', 'Monthly analytics report', 'Pay by 5th each month'],
        highlight: false,
      },
      {
        label: 'Annual',
        amount: '₹1,20,000',
        period: 'per year',
        features: ['Everything in Monthly', 'Full automation workflows', 'Campaign management', 'Priority response', 'Save vs monthly billing'],
        highlight: true,
      },
    ],
    faqs: [
      { q: 'When is payment due?',      a: 'On or before the 5th of each calendar month. A 10-day grace period applies before service is paused.' },
      { q: 'Who owns the content?',     a: 'The client owns all produced content upon full payment of dues.' },
      { q: 'Can I cancel anytime?',     a: '30 days written notice is required before termination. Fees for the notice period remain payable.' },
      { q: 'What platforms do you cover?', a: 'Default: Facebook and Instagram. Additional platforms (LinkedIn, YouTube, Twitter/X) are quoted separately.' },
    ],
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity Services',
    tagline: 'Protect your digital assets before attackers find them',
    Icon: Shield,
    description:
      'End-to-end cybersecurity for Indian SMEs and organisations — security audits, threat monitoring, and Indian IT Act 2000 compliance.',
    features: [
      'Security audit & vulnerability scan',
      'Threat monitoring & alerting setup',
      'Incident response planning',
      'IT Act 2000 / IT Rules 2011 compliance',
    ],
    priceLabel: '₹20,000–₹30,000/yr',
    process: [
      { step: 1, title: 'Security Audit',    desc: 'Full assessment of your digital infrastructure and access controls.', duration: '1 week'    },
      { step: 2, title: 'Risk Report',       desc: 'Prioritised findings with remediation recommendations.',               duration: '2–3 days'  },
      { step: 3, title: 'Hardening',         desc: 'Implementing fixes — firewalls, access control, patching.',           duration: '1–2 weeks' },
      { step: 4, title: 'Monitoring Setup',  desc: 'Ongoing threat detection and alerting configured.',                   duration: '2–3 days'  },
      { step: 5, title: 'Quarterly Review',  desc: 'Recurring compliance checks and incident response drills.',           duration: 'Quarterly' },
    ],
    pricing: [
      {
        label: 'Annual Plan',
        amount: '₹20,000–₹30,000',
        period: 'per year',
        features: ['Full security audit', 'Vulnerability report', 'Monitoring setup', 'Incident response plan', 'IT Act 2000 compliance', 'Quarterly reviews'],
        highlight: true,
      },
    ],
    faqs: [
      { q: 'Is this aligned with Indian law?',    a: 'Yes. All work is compliant with IT Act 2000, IT (Amendment) Act 2008, and IT Rules 2011.' },
      { q: 'What size businesses do you serve?', a: 'SMEs, NGOs, hospitals, clinics, and startups across Rajasthan and beyond.' },
      { q: 'Do you offer penetration testing?',  a: 'Yes — ethical pen testing is included in the audit phase. We document all findings.' },
    ],
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    tagline: 'Replace repetitive work with intelligent workflows',
    Icon: Bot,
    description:
      'We map your manual processes and replace them with AI-powered automation — saving hours, reducing errors, and scaling your operations.',
    features: [
      'Business process audit & mapping',
      'OpenAI / Gemini API integration',
      'n8n / Zapier / custom workflow builds',
      'Staff training & documentation',
    ],
    priceLabel: 'Custom Quote',
    process: [
      { step: 1, title: 'Process Audit',    desc: 'Map every manual workflow that can be automated.',                      duration: '2–3 days'  },
      { step: 2, title: 'Blueprint',        desc: 'Architecture design — tools, APIs, data flows.',                       duration: '3 days'    },
      { step: 3, title: 'Build & Test',     desc: 'Workflow builds with staging environment testing.',                    duration: '1–3 weeks' },
      { step: 4, title: 'Deploy',           desc: 'Production deployment with failover and monitoring.',                  duration: '2 days'    },
      { step: 5, title: 'Train & Document', desc: 'Staff onboarding, runbooks, and ongoing support.',                    duration: '2–3 days'  },
    ],
    pricing: [
      {
        label: 'Custom',
        amount: 'Get Quote',
        features: ['Based on number of workflows', 'API usage costs quoted separately', 'Includes deployment + training', 'Ongoing maintenance available'],
        highlight: false,
      },
    ],
    faqs: [
      { q: 'What tools do you use?',       a: 'n8n, Zapier, Make, OpenAI API, Gemini API, and custom Python/Node scripts depending on requirements.' },
      { q: 'How is pricing calculated?',   a: 'Based on the number of workflows, complexity, and API licensing costs. We provide a fixed quote before starting.' },
      { q: 'Can you automate my CRM?',    a: 'Yes — CRM automation, email sequences, lead routing, and reporting dashboards are common use cases.' },
    ],
  },
  {
    slug: 'saas-licensing',
    name: 'SaaS Licensing',
    tagline: 'Software access structured for your business needs',
    Icon: Key,
    description:
      'Navigate SaaS tool selection, licensing agreements, and user management — all structured with clear written agreements.',
    features: [
      'Tool evaluation & recommendation',
      'Licensing agreement drafting',
      'User access & onboarding setup',
      'Renewal management',
    ],
    priceLabel: 'Custom Quote',
    process: [
      { step: 1, title: 'Needs Assessment', desc: 'Identify gaps and software requirements across your team.',  duration: '1–2 days' },
      { step: 2, title: 'Tool Selection',   desc: 'Evaluate, compare, and recommend the best-fit solutions.', duration: '2–3 days' },
      { step: 3, title: 'Licensing',        desc: 'Draft agreements and execute vendor licensing.',             duration: '1 week'   },
      { step: 4, title: 'Onboarding',       desc: 'User setup, training, and documentation.',                  duration: '3–5 days' },
      { step: 5, title: 'Management',       desc: 'Renewals, seat adjustments, and ongoing support.',          duration: 'Ongoing'  },
    ],
    pricing: [
      {
        label: 'Custom',
        amount: 'Get Quote',
        features: ['Based on tool count & user seats', 'Written agreements included', 'Onboarding & training', 'Renewal management'],
        highlight: false,
      },
    ],
    faqs: [
      { q: 'Do you resell SaaS tools?',     a: 'We advise and manage licensing — you maintain direct vendor relationships.' },
      { q: 'Can you manage existing tools?', a: 'Yes — we can take over management of tools you already subscribe to.' },
    ],
  },
  {
    slug: 'data-processing',
    name: 'Data Processing',
    tagline: 'Compliant, secure data operations for your organisation',
    Icon: Database,
    description:
      'Legally sound data handling frameworks aligned with the Indian IT Act 2000 and GDPR principles — protecting your organisation and your users.',
    features: [
      'Data Processing Agreement (DPA) drafting',
      'IT Act 2000 / GDPR-aligned frameworks',
      'Secure data pipeline architecture',
      'Breach response planning',
    ],
    priceLabel: 'Custom Quote',
    process: [
      { step: 1, title: 'Data Audit',       desc: 'Map all data flows, storage, and third-party transfers.',              duration: '2–3 days' },
      { step: 2, title: 'DPA Drafting',     desc: 'Written Data Processing Agreement tailored to your operations.',      duration: '3–5 days' },
      { step: 3, title: 'System Setup',     desc: 'Secure pipeline and storage architecture implementation.',             duration: '1–2 weeks'},
      { step: 4, title: 'Compliance Check', desc: 'Full review against IT Act and applicable regulations.',              duration: '2 days'   },
      { step: 5, title: 'Documentation',    desc: 'Staff data-handling training and incident response runbooks.',        duration: '2 days'   },
    ],
    pricing: [
      {
        label: 'Custom',
        amount: 'Get Quote',
        features: ['Based on data volume & complexity', 'DPA drafting included', 'Compliance report', 'Staff training materials'],
        highlight: false,
      },
    ],
    faqs: [
      { q: 'Is this GDPR-compliant?',          a: 'We align all work with GDPR principles and the Indian IT Act 2000/IT Rules 2011 — whichever applies to your context.' },
      { q: 'Do you cover healthcare data?',    a: 'Yes — we work with hospitals and rehabilitation centres and understand sensitive health data requirements.' },
    ],
  },
  {
    slug: 'contractor-management',
    name: 'Contractor Management',
    tagline: 'Structure your freelancer relationships legally and clearly',
    Icon: Users,
    description:
      'Every contractor relationship needs a written agreement. We draft, structure, and manage your freelancer contracts so there are no disputes.',
    features: [
      'Contractor agreement drafting',
      'Scope of work documentation',
      'IP ownership & NDA provisions',
      'Onboarding & offboarding process',
    ],
    priceLabel: 'Custom Quote',
    process: [
      { step: 1, title: 'Scope Definition',  desc: 'Deliverables, timelines, and responsibilities documented.',           duration: '1–2 days' },
      { step: 2, title: 'Agreement Draft',   desc: 'Contract with IP, NDA, payment, and termination clauses.',            duration: '2–3 days' },
      { step: 3, title: 'Review & Sign',     desc: 'Both parties review, negotiate, and execute the agreement.',          duration: '1–2 days' },
      { step: 4, title: 'Tracking Setup',    desc: 'Deliverable tracker and milestone schedule established.',             duration: '1 day'    },
      { step: 5, title: 'Offboarding',       desc: 'Closure checklist — IP handover, access revocation, final payment.', duration: 'Per project end' },
    ],
    pricing: [
      {
        label: 'Custom',
        amount: 'Get Quote',
        features: ['Per engagement pricing', 'Full agreement drafting', 'IP + NDA provisions', 'Onboarding / offboarding docs'],
        highlight: false,
      },
    ],
    faqs: [
      { q: 'Do agreements include NDA clauses?',  a: 'Yes — confidentiality provisions are included in all contractor agreements by default.' },
      { q: 'Can you manage ongoing contractors?', a: 'Yes — we provide templates and tracking systems for managing multiple freelancers simultaneously.' },
    ],
  },
]

export function getServiceBySlug(slug: string) {
  return services.find(s => s.slug === slug)
}

export function getService(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}
