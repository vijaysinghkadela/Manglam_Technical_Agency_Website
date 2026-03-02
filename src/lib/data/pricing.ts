import { PricingPlan, ComparisonRow } from '@/types';

export const pricingPlans: PricingPlan[] = [
  {
    service: 'Web Development',
    slug: 'web-development',
    badge: 'One-Time',
    plans: [
      {
        name: 'Starter',
        price: '₹50,000',
        period: 'one-time',
        features: ['Up to 5 pages', 'Responsive design', 'SEO-friendly architecture', 'Content integration', '1-year free domain & maintenance', 'Performance monitoring', 'Deployment included'],
        popular: true,
        cta: 'Get Web Dev Quote',
        ctaLink: '/contact',
      },
      {
        name: 'Growth',
        price: '₹75,000–₹1,00,000',
        period: 'one-time',
        features: ['Up to 15 pages', 'Blog integration', 'Full SEO setup', 'CMS integration', '1-year free support', 'Analytics dashboard', 'Priority support'],
        cta: 'Get Growth Quote',
        ctaLink: '/contact',
      },
      {
        name: 'Custom',
        price: 'Get Quote',
        period: 'project-based',
        features: ['Complex web applications', 'E-commerce platforms', 'SaaS dashboards', 'Custom CMS', 'API development', 'Advanced animations', 'Priority support'],
        cta: 'Request Custom Quote',
        ctaLink: '/contact',
      },
    ],
  },
  {
    service: 'Social Media & Automation',
    slug: 'social-media-marketing',
    badge: 'Retainer',
    plans: [
      {
        name: 'Monthly',
        price: '₹10,000',
        period: '/month',
        features: ['2 platforms (FB + IG)', 'Content creation & scheduling', '12 posts per month', 'Audience engagement', 'Monthly analytics report', 'Hashtag research'],
        cta: 'Start Monthly Plan',
        ctaLink: '/contact',
      },
      {
        name: 'Annual',
        price: '₹1,20,000',
        period: '/year',
        features: ['Everything in Monthly', 'Workflow automation included', 'Priority content creation', 'Quarterly strategy reviews', 'Ad campaign consultation', 'Save ₹12,000 annually'],
        popular: true,
        cta: 'Start Annual Plan',
        ctaLink: '/contact',
      },
    ],
  },
  {
    service: 'Cybersecurity',
    slug: 'cybersecurity',
    badge: 'Annual',
    plans: [
      {
        name: 'Annual Plan',
        price: '₹20,000–₹30,000',
        period: '/year',
        features: ['Security audit', 'Vulnerability assessment', 'Threat monitoring', 'Incident response', 'IT Act compliance', 'Monthly security reports'],
        popular: true,
        cta: 'Get Security Quote',
        ctaLink: '/contact',
      },
    ],
  },
  {
    service: 'AI Automation',
    slug: 'ai-automation',
    badge: 'Custom',
    plans: [
      {
        name: 'Custom',
        price: 'Custom',
        period: 'based on scope',
        features: ['Process audit & mapping', 'AI tool integration', 'Workflow automation', 'System integration', 'Staff training', 'Ongoing support'],
        cta: 'Request AI Quote',
        ctaLink: '/contact',
      },
    ],
  },
  {
    service: 'SaaS Licensing',
    slug: 'saas-licensing',
    badge: 'Custom',
    plans: [
      {
        name: 'Custom',
        price: 'Custom',
        period: 'per engagement',
        features: ['Tool evaluation', 'License procurement', 'Access management', 'Onboarding docs', 'Renewal management', 'Cost optimisation'],
        cta: 'Request SaaS Quote',
        ctaLink: '/contact',
      },
    ],
  },
  {
    service: 'Data Processing',
    slug: 'data-processing',
    badge: 'Custom',
    plans: [
      {
        name: 'Custom',
        price: 'Custom',
        period: 'based on volume',
        features: ['DPA drafting', 'GDPR & IT Act compliance', 'Secure data pipelines', 'Data cleaning', 'Analytics dashboards', 'Breach response planning'],
        cta: 'Request DPA Quote',
        ctaLink: '/contact',
      },
    ],
  },
];

export const comparisonTable: ComparisonRow[] = [
  { feature: 'Pages', starter: 'Up to 5', growth: 'Up to 15', custom: 'Unlimited' },
  { feature: 'Responsive Design', starter: true, growth: true, custom: true },
  { feature: 'CMS Integration', starter: false, growth: true, custom: true },
  { feature: 'Blog', starter: false, growth: true, custom: true },
  { feature: 'SEO Setup', starter: 'Basic', growth: 'Full', custom: 'Advanced' },
  { feature: 'Free Support', starter: '1 Year', growth: '1 Year', custom: '1 Year' },
  { feature: 'Free Domain', starter: true, growth: true, custom: true },
  { feature: 'Estimated Duration', starter: '2–3 weeks', growth: '3–5 weeks', custom: '4–8 weeks' },
  { feature: 'Price', starter: '₹50,000', growth: '₹75K–₹1L', custom: 'Get Quote' },
];
