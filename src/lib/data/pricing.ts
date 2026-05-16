import { PricingPlan, ComparisonRow } from '@/types';

// =============================================================================
// GLOBAL MARKET COMPARISON DATA (2026)
// =============================================================================
// Benchmarks derived from industry reports: Clutch.co, GoodFirms, Statista,
// HubSpot State of Marketing, Gartner IT Services Pricing Guide
// =============================================================================

export interface GlobalMarketBenchmark {
  service: string;
  slug: string;
  regions: {
    region: string;
    currency: string;
    lowRange: string;
    highRange: string;
    notes?: string;
  }[];
  mtaAdvantage: string;
  lastUpdated: string;
}

export const globalMarketBenchmarks: GlobalMarketBenchmark[] = [
  {
    service: 'Social Media Marketing (Monthly Retainer)',
    slug: 'social-media-marketing',
    regions: [
      { region: 'India', currency: 'INR', lowRange: '₹25,000', highRange: '₹2,50,000', notes: 'Tier-1 agencies in metros' },
      { region: 'India', currency: 'USD', lowRange: '$300', highRange: '$3,000', notes: 'USD equivalent' },
      { region: 'United States', currency: 'USD', lowRange: '$3,000', highRange: '$25,000', notes: 'Mid-market agencies' },
      { region: 'European Union', currency: 'EUR', lowRange: '€2,500', highRange: '€15,000', notes: 'Western EU agencies' },
      { region: 'United Kingdom', currency: 'GBP', lowRange: '£2,000', highRange: '£12,000', notes: 'London-based agencies' },
    ],
    mtaAdvantage: 'MTA delivers US/EU-quality AI-powered SMM at 60-80% lower cost with DPDP/LGPD compliance built-in.',
    lastUpdated: '2026-04-01',
  },
  {
    service: 'SaaS MVP Development (One-Time)',
    slug: 'web-development',
    regions: [
      { region: 'India', currency: 'INR', lowRange: '₹10,00,000', highRange: '₹80,00,000', notes: 'Quality varies significantly' },
      { region: 'India', currency: 'USD', lowRange: '$12,000', highRange: '$95,000', notes: 'USD equivalent' },
      { region: 'United States', currency: 'USD', lowRange: '$50,000', highRange: '$500,000', notes: 'Silicon Valley / NYC rates' },
      { region: 'European Union', currency: 'EUR', lowRange: '€40,000', highRange: '€300,000', notes: 'Western EU dev shops' },
      { region: 'Eastern Europe', currency: 'USD', lowRange: '$25,000', highRange: '$150,000', notes: 'Poland, Ukraine, Romania' },
    ],
    mtaAdvantage: 'MTA combines India cost efficiency with US-standard architecture, Next.js 16, and compliance-first design.',
    lastUpdated: '2026-04-01',
  },
  {
    service: 'Cybersecurity Audit (One-Time)',
    slug: 'cybersecurity',
    regions: [
      { region: 'India', currency: 'INR', lowRange: '₹50,000', highRange: '₹5,00,000', notes: 'CERT-IN empaneled auditors' },
      { region: 'India', currency: 'USD', lowRange: '$600', highRange: '$6,000', notes: 'USD equivalent' },
      { region: 'United States', currency: 'USD', lowRange: '$5,000', highRange: '$50,000', notes: 'SOC 2 / penetration testing' },
      { region: 'European Union', currency: 'EUR', lowRange: '€4,000', highRange: '€35,000', notes: 'GDPR compliance audits' },
    ],
    mtaAdvantage: 'MTA audits cover DPDP Act 2023, GDPR, and LGPD simultaneously—single audit, triple compliance.',
    lastUpdated: '2026-04-01',
  },
  {
    service: 'AI Workflow Automation (Setup)',
    slug: 'ai-automation',
    regions: [
      { region: 'India', currency: 'INR', lowRange: '₹1,50,000', highRange: '₹8,00,000', notes: 'n8n/Make specialists' },
      { region: 'India', currency: 'USD', lowRange: '$1,800', highRange: '$9,500', notes: 'USD equivalent' },
      { region: 'United States', currency: 'USD', lowRange: '$10,000', highRange: '$75,000', notes: 'Enterprise automation consultants' },
      { region: 'European Union', currency: 'EUR', lowRange: '€8,000', highRange: '€50,000', notes: 'AI/ML consultancies' },
    ],
    mtaAdvantage: 'MTA delivers agentic AI workflows with C2PA provenance and DPDP-compliant data handling at India rates.',
    lastUpdated: '2026-04-01',
  },
  {
    service: 'Fractional CTO (Monthly Retainer)',
    slug: 'fractional-cto',
    regions: [
      { region: 'India', currency: 'INR', lowRange: '₹1,50,000', highRange: '₹5,00,000', notes: 'Ex-startup CTOs' },
      { region: 'India', currency: 'USD', lowRange: '$1,800', highRange: '$6,000', notes: 'USD equivalent' },
      { region: 'United States', currency: 'USD', lowRange: '$8,000', highRange: '$25,000', notes: '10-20 hrs/month' },
      { region: 'European Union', currency: 'EUR', lowRange: '€6,000', highRange: '€18,000', notes: 'Senior tech advisors' },
    ],
    mtaAdvantage: 'MTA Fractional CTO combines startup experience with enterprise compliance knowledge (iStart, QRate eligible).',
    lastUpdated: '2026-04-01',
  },
];

// =============================================================================
// SMM TOOL ECOSYSTEM PRICING COMPARISON (2026)
// =============================================================================
// For clients evaluating DIY vs. managed SMM services
// =============================================================================

export interface SMMToolPricing {
  tool: string;
  category: string;
  freeTeir: string;
  paidRange: string;
  enterpriseRange: string;
  mtaNotes: string;
}

export const smmToolPricing: SMMToolPricing[] = [
  {
    tool: 'Sprout Social',
    category: 'Scheduling & Analytics',
    freeTeir: 'None',
    paidRange: '$199–$399/user/month',
    enterpriseRange: '$Custom',
    mtaNotes: 'Included in Growth/Scale tiers; MTA manages on your behalf',
  },
  {
    tool: 'Hootsuite',
    category: 'Scheduling & Analytics',
    freeTeir: 'None (trial only)',
    paidRange: '$99–$249/month',
    enterpriseRange: '$739+/month',
    mtaNotes: 'MTA provides equivalent functionality via n8n pipelines',
  },
  {
    tool: 'Buffer',
    category: 'Scheduling',
    freeTeir: '3 channels',
    paidRange: '$5–$100/month',
    enterpriseRange: 'N/A',
    mtaNotes: 'Starter tier includes Buffer-equivalent scheduling',
  },
  {
    tool: 'Canva Pro',
    category: 'Design',
    freeTeir: 'Limited',
    paidRange: '$12.99/user/month',
    enterpriseRange: '$30/user/month',
    mtaNotes: 'All MTA SMM tiers include professional design—no client Canva needed',
  },
  {
    tool: 'CapCut / Premiere Pro',
    category: 'Video Editing',
    freeTeir: 'Limited (CapCut)',
    paidRange: '$22.99/month (PP)',
    enterpriseRange: '$Corporate licensing',
    mtaNotes: 'Growth/Scale tiers include short-form video production',
  },
  {
    tool: 'Brandwatch / Sprinklr',
    category: 'Social Listening',
    freeTeir: 'None',
    paidRange: '$800–$3,000/month',
    enterpriseRange: '$10,000+/month',
    mtaNotes: 'Scale tier includes AI-powered sentiment analysis',
  },
  {
    tool: 'Jasper / Copy.ai',
    category: 'AI Copywriting',
    freeTeir: 'Limited',
    paidRange: '$49–$125/month',
    enterpriseRange: '$Custom',
    mtaNotes: 'MTA uses fine-tuned LLMs with brand voice calibration',
  },
  {
    tool: 'Meta Ads Manager',
    category: 'Paid Ads',
    freeTeir: 'Platform (ads extra)',
    paidRange: 'Ad spend variable',
    enterpriseRange: 'Ad spend variable',
    mtaNotes: 'Growth/Scale tiers include ad coordination and optimization',
  },
];

// =============================================================================
// COST COMPARISON: IN-HOUSE VS AGENCY VS MTA
// =============================================================================

export interface CostComparisonModel {
  model: string;
  monthlyEstimate: string;
  annualEstimate: string;
  hiddenCosts: string[];
  bestFor: string;
}

export const costComparisonModels: CostComparisonModel[] = [
  {
    model: 'In-House Team (US)',
    monthlyEstimate: '$15,000–$35,000',
    annualEstimate: '$180,000–$420,000',
    hiddenCosts: ['Benefits (30%)', 'Tools ($500–$2,000/mo)', 'Training', 'Turnover risk'],
    bestFor: 'Large enterprises with 24/7 needs and internal brand control requirements',
  },
  {
    model: 'In-House Team (India)',
    monthlyEstimate: '₹3,00,000–₹8,00,000',
    annualEstimate: '₹36,00,000–₹96,00,000',
    hiddenCosts: ['PF/ESI (13%)', 'Tools', 'Office space', 'Management overhead'],
    bestFor: 'Indian enterprises with local focus and existing HR infrastructure',
  },
  {
    model: 'US/EU Agency',
    monthlyEstimate: '$5,000–$25,000',
    annualEstimate: '$60,000–$300,000',
    hiddenCosts: ['Onboarding fees', 'Revision charges', 'Platform markups'],
    bestFor: 'Companies requiring native English and US timezone alignment',
  },
  {
    model: 'MTA Managed SMM',
    monthlyEstimate: '$1,250–$5,000',
    annualEstimate: '$15,000–$60,000',
    hiddenCosts: ['None—all-inclusive pricing', 'Tools included', 'Compliance included'],
    bestFor: 'Startups and SMBs wanting enterprise-grade AI-powered SMM at India rates',
  },
];

// =============================================================================
// PRICING PLANS (Original Structure)
// =============================================================================

export const pricingPlans: PricingPlan[] = [
  {
    service: 'SaaS & Web Development',
    slug: 'web-development',
    badge: 'Build',
    plans: [
      {
        name: 'Micro MVP',
        price: '$15,000–$25,000',
        period: 'one-time',
        features: ['Basic auth setup', '1 CRUD core workflow', 'Simple dashboard', 'Launch-ready codebase', 'Responsive design', 'Deployment included'],
        popular: true,
        cta: 'Build Micro MVP',
        ctaLink: '/contact',
      },
      {
        name: 'Standard MVP',
        price: '$40,000–$99,000',
        period: 'one-time',
        features: ['Advanced Auth & SSO', 'Stripe Billing Integration', '3-5 major custom features', 'Advanced Reporting CMS', 'Scalable Architecture', 'Priority Support'],
        cta: 'Build Standard MVP',
        ctaLink: '/contact',
      },
      {
        name: 'SaaS Success Plan',
        price: '$450',
        period: '/month',
        features: ['Uptime monitoring', 'Security patches', 'Core Web Vitals optimization', 'Hosting & Database management', '5 hrs developer support'],
        cta: 'Secure Retainer',
        ctaLink: '/contact',
      },
    ],
  },
  {
    service: 'Social Media Marketing',
    slug: 'social-media-marketing',
    badge: 'Retainer',
    plans: [
      {
        name: 'Starter',
        price: '$1,250',
        period: '/month',
        features: ['2 platforms (e.g. FB/IG)', '3 posts per week', 'Static graphics', 'Community management', 'Basic analytics reporting'],
        cta: 'Start Starter Plan',
        ctaLink: '/contact',
      },
      {
        name: 'Growth',
        price: '$2,750',
        period: '/month',
        features: ['3-4 platforms', 'Daily posting', 'Short-form video production (Reels/TikToks)', 'Active audience engagement', 'Ad coordination'],
        popular: true,
        cta: 'Start Growth Plan',
        ctaLink: '/contact',
      },
      {
        name: 'Scale',
        price: '$5,000+',
        period: '/month',
        features: ['5+ platforms', 'Multiple daily posts', 'Influencer strategy integration', 'Deep performance analytics', 'Generative Search Optimization (GSO)'],
        cta: 'Start Scale Plan',
        ctaLink: '/contact',
      },
    ],
  },
  {
    service: 'Cybersecurity & Compliance',
    slug: 'cybersecurity',
    badge: 'Security',
    plans: [
      {
        name: 'Vulnerability & Privacy Audit',
        price: '$1,500',
        period: 'one-time',
        features: ['Surface Threat Audit', 'Compliance Gap Check (GDPR/DPDP)', 'Immediate Risk Report', 'Actionable remediation plan'],
        popular: true,
        cta: 'Request Full Audit',
        ctaLink: '/contact',
      },
      {
        name: 'Managed Security Retainer',
        price: '$250',
        period: '/month',
        features: ['24/7 Threat monitoring', 'Monthly vulnerability scanning', 'Managed Antivirus/Firewall checks', 'Security Awareness training access'],
        cta: 'Secure Your Stack',
        ctaLink: '/contact',
      },
    ],
  },
  {
    service: 'AI & Workflow Automation',
    slug: 'ai-automation',
    badge: 'Efficiency',
    plans: [
      {
        name: 'Implementation (n8n/Make)',
        price: '$3,000–$8,000',
        period: 'setup',
        features: ['Process audit & mapping', 'CRM / Data system sync', 'Zapier to n8n migration (save 80% on fees)', 'Custom Chatbot workflows'],
        popular: true,
        cta: 'Request Automation',
        ctaLink: '/contact',
      },
      {
        name: 'AI Support Retainer',
        price: '$300–$700',
        period: '/month',
        features: ['Endpoint error resolution', 'API credit usage monitoring', 'Prompt tuning & drift prevention', 'Ongoing workflow adjustments'],
        cta: 'Request Retainer',
        ctaLink: '/contact',
      },
    ],
  },
  {
    service: 'Fractional CTO',
    slug: 'fractional-cto',
    badge: 'Advisory',
    plans: [
      {
        name: 'Advisory Retainer',
        price: '$2,500',
        period: '/month',
        features: ['10-15 hours/month', 'Weekly strategy calls', 'Architecture reviews', 'High-level vendor evaluation', 'Code auditing'],
        cta: 'Request Advisory',
        ctaLink: '/contact',
      },
      {
        name: 'Standard Partnership',
        price: '$5,000',
        period: '/month',
        features: ['20-30 hours/month', 'Hands-on developer mentorship', 'Hiring and interview support', 'Detailed code reviews', 'Emergency response'],
        popular: true,
        cta: 'Hire Fractional CTO',
        ctaLink: '/contact',
      },
    ],
  },
];

export const comparisonTable: ComparisonRow[] = [
  { feature: 'Target Architecture', starter: 'Micro Validation', growth: 'Robust Mid-Level', custom: 'Enterprise Operations' },
  { feature: 'Basic User Auth', starter: true, growth: true, custom: true },
  { feature: 'Stripe Billing Logic', starter: false, growth: true, custom: true },
  { feature: 'Custom Data Dashboard', starter: false, growth: true, custom: true },
  { feature: 'AI/LLM Integrations', starter: false, growth: 'Supported', custom: 'Complex/RAG' },
  { feature: 'Dedicated Project Manager', starter: false, growth: true, custom: true },
  { feature: 'Estimated Build Time', starter: '2–4 weeks', growth: '3–5 months', custom: '6+ months' },
  { feature: 'Development Cost (USD)', starter: '$15K–$25K', growth: '$40K–$99K', custom: '$100K+' },
];

// =============================================================================
// SMM TIER COMPARISON (Expanded)
// =============================================================================

export interface SMMComparisonRow {
  feature: string;
  starter: string | boolean;
  growth: string | boolean;
  scale: string | boolean;
  enterprise?: string | boolean;
}

export const smmComparisonTable: SMMComparisonRow[] = [
  { feature: 'Platforms Managed', starter: '2', growth: '3-4', scale: '5+', enterprise: 'Unlimited' },
  { feature: 'Posts per Week', starter: '3', growth: 'Daily', scale: 'Multiple Daily', enterprise: 'Custom Cadence' },
  { feature: 'Static Graphics', starter: true, growth: true, scale: true, enterprise: true },
  { feature: 'Short-Form Video (Reels/TikTok)', starter: false, growth: true, scale: true, enterprise: true },
  { feature: 'Long-Form Video', starter: false, growth: false, scale: true, enterprise: true },
  { feature: 'AI Content Generation', starter: 'Basic', growth: 'Advanced', scale: 'Full Agentic', enterprise: 'Custom LLMs' },
  { feature: 'C2PA Provenance Labeling', starter: false, growth: true, scale: true, enterprise: true },
  { feature: 'Deepfake Detection Scanning', starter: false, growth: false, scale: true, enterprise: true },
  { feature: 'Community Management', starter: 'Basic', growth: 'Active', scale: '24/7', enterprise: 'Dedicated Team' },
  { feature: 'Paid Ad Coordination', starter: false, growth: true, scale: true, enterprise: true },
  { feature: 'Influencer Strategy', starter: false, growth: false, scale: true, enterprise: true },
  { feature: 'Analytics Reporting', starter: 'Monthly', growth: 'Bi-weekly', scale: 'Weekly', enterprise: 'Real-time Dashboard' },
  { feature: 'GSO (Generative Search Optimization)', starter: false, growth: false, scale: true, enterprise: true },
  { feature: 'DPDP/LGPD Compliance', starter: true, growth: true, scale: true, enterprise: true },
  { feature: 'Dedicated Account Manager', starter: false, growth: false, scale: true, enterprise: true },
  { feature: 'Monthly Investment (USD)', starter: '$1,250', growth: '$2,750', scale: '$5,000+', enterprise: 'Custom' },
  { feature: 'Monthly Investment (INR)', starter: '₹1,04,000', growth: '₹2,29,000', scale: '₹4,15,000+', enterprise: 'Custom' },
  { feature: 'US Agency Equivalent', starter: '$3,000–$5,000', growth: '$6,000–$10,000', scale: '$12,000–$20,000', enterprise: '$25,000+' },
];

// =============================================================================
// COMPLIANCE COST CALCULATOR DATA
// =============================================================================

export interface ComplianceCostFactor {
  regulation: string;
  diyImplementationCost: string;
  mtaIncludedCost: string;
  penaltyRisk: string;
  timeToCompliance: string;
}

export const complianceCostFactors: ComplianceCostFactor[] = [
  {
    regulation: 'DPDP Act 2023 (India)',
    diyImplementationCost: '₹5,00,000–₹25,00,000',
    mtaIncludedCost: 'Included in all tiers',
    penaltyRisk: 'Up to ₹250 crore',
    timeToCompliance: '3-6 months DIY vs. immediate with MTA',
  },
  {
    regulation: 'GDPR (EU)',
    diyImplementationCost: '€20,000–€100,000',
    mtaIncludedCost: 'Included in all tiers',
    penaltyRisk: 'Up to €20M or 4% global revenue',
    timeToCompliance: '6-12 months DIY vs. immediate with MTA',
  },
  {
    regulation: 'LGPD (Brazil)',
    diyImplementationCost: 'R$50,000–R$300,000',
    mtaIncludedCost: 'Included (FitNexora health data ready)',
    penaltyRisk: 'Up to R$50 million (~₹8-9 crore)',
    timeToCompliance: '4-8 months DIY vs. immediate with MTA',
  },
  {
    regulation: 'IT Amendment Rules 2026 (India)',
    diyImplementationCost: '₹2,00,000–₹10,00,000',
    mtaIncludedCost: 'Included (SGI labeling built-in)',
    penaltyRisk: 'Platform blocking + legal action',
    timeToCompliance: '2-4 months DIY vs. immediate with MTA',
  },
];

// =============================================================================
// ROI CALCULATOR ASSUMPTIONS
// =============================================================================

export interface ROIAssumption {
  metric: string;
  industry_average: string;
  mta_delivered: string;
  improvement: string;
  source: string;
}

export const roiAssumptions: ROIAssumption[] = [
  {
    metric: 'Cost per Lead (CPL)',
    industry_average: '$50–$200',
    mta_delivered: '$15–$60',
    improvement: '60-70% reduction',
    source: 'HubSpot State of Marketing 2025',
  },
  {
    metric: 'Social Engagement Rate',
    industry_average: '1-3%',
    mta_delivered: '4-8%',
    improvement: '2-4x improvement',
    source: 'Sprout Social Industry Benchmarks',
  },
  {
    metric: 'Content Production Time',
    industry_average: '4-8 hours/post',
    mta_delivered: '1-2 hours/post',
    improvement: '75% time savings',
    source: 'MTA internal benchmarks (agentic workflows)',
  },
  {
    metric: 'Compliance Audit Preparation',
    industry_average: '40-80 hours',
    mta_delivered: '0 hours (pre-compliant)',
    improvement: '100% time savings',
    source: 'MTA DPDP implementation data',
  },
  {
    metric: 'Brand Safety Incidents',
    industry_average: '2-5 per year',
    mta_delivered: '<1 per year',
    improvement: '80%+ reduction',
    source: 'C2PA + deepfake detection stack',
  },
];
