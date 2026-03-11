export interface Project {
  id:           string
  slug:         string
  client:       string
  title:        string
  tags:         string[]
  stack:        string[]
  duration:     string
  value:        string
  deliverables: string[]
  description:  string
  url?:         string
  featured:     boolean
  status:       'live' | 'coming-soon'
  bgFrom:       string   // CSS colour for gradient start
  bgTo:         string   // CSS colour for gradient end
}

export const projects: Project[] = [
  {
    id: 'mnss', slug: 'mnss-website', featured: true, status: 'live',
    client:      'Marut Narayan Sewa Sansthan',
    title:       'MNSS Website',
    tags:        ['NGO', 'Web Development'],
    stack:       ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudinary', 'Vercel'],
    duration:    '3 Weeks',
    value:       '₹50,000',
    description: 'Built from scratch for a Rajasthan-based NGO running rehabilitation, women\'s safety, and skill development across 5+ districts since 2009. Delivered on time, exactly as scoped.',
    url:         'https://www.marutnarayansewasansthan.org',
    bgFrom:      '#0A1A0A',
    bgTo:        '#0F2A10',
    deliverables: [
      'Responsive website design & development',
      'Content integration & image optimisation',
      'QA, testing & production deployment',
      '1-year free domain + maintenance',
    ],
  },
  {
    id: 'ecommerce', slug: 'ecommerce-platform', featured: false, status: 'coming-soon',
    client: 'Rajasthan Retailer', title: 'E-Commerce Platform',
    tags: ['Web Development'], stack: ['Next.js', 'Stripe', 'PostgreSQL'],
    duration: '6 Weeks', value: 'Confidential', deliverables: [], description: 'Case study in progress.',
    bgFrom: '#0A0A1A', bgTo: '#1A0A2A',
  },
  {
    id: 'healthcare-social', slug: 'healthcare-social', featured: false, status: 'coming-soon',
    client: 'Healthcare Client', title: 'Healthcare Social Campaign',
    tags: ['Social Media'], stack: ['Meta Ads', 'n8n'],
    duration: '3 Months', value: 'Confidential', deliverables: [], description: 'Case study in progress.',
    bgFrom: '#0A1A1A', bgTo: '#0A2A1A',
  },
  {
    id: 'security', slug: 'sme-security-audit', featured: false, status: 'coming-soon',
    client: 'Bikaner SME', title: 'SME Security Audit',
    tags: ['Cybersecurity'], stack: ['OWASP', 'Custom tooling'],
    duration: '2 Weeks', value: 'Confidential', deliverables: [], description: 'Case study in progress.',
    bgFrom: '#1A0A0A', bgTo: '#2A0A1A',
  },
  {
    id: 'gymos-ai',
    slug: 'gymos-ai-saas',
    featured: true,
    status: 'live',
    client: 'Internal SaaS Product',
    title: 'GymOS AI',
    tags: ['SaaS Products', 'AI Automation'],
    stack: ['Flutter', 'Supabase', 'PostgreSQL', 'Node.js', 'Claude Opus'],
    duration: 'Continuous Integration',
    value: 'Proprietary',
    description: 'Delivering customized technical and innovative engineering solutions for sustainable growth. GymOS is an AI-powered multi-tenant SaaS platform built for gym owners and trainers across India, featuring automated revenue operations and intelligent client management.',
    bgFrom: '#0A0A1A',
    bgTo: '#111827',
    deliverables: [
      'AI-generated Workout & Diet Plans',
      'Multi-tenant Client Management System',
      'Razorpay & Stripe Global Billing',
      'WhatsApp Business Automation'
    ]
  },
  {
    id: 'focusguard-pro',
    slug: 'focusguard-pro-saas',
    featured: true,
    status: 'live',
    client: 'Internal SaaS Product',
    title: 'FocusGuard Pro',
    tags: ['SaaS Products'],
    stack: ['Flutter', 'Firebase', 'Riverpod', 'Hive', 'OpenAI GPT-4o'],
    duration: 'Continuous Integration',
    value: 'Proprietary',
    description: 'Delivering customized technical and innovative engineering solutions for sustainable growth. FocusGuard Pro is an advanced digital wellness SaaS application featuring real-time app blocking, AI coaching, and comprehensive productivity analytics.',
    bgFrom: '#3b0716',
    bgTo: '#1a030a',
    deliverables: [
      'Cross-Platform Mobile Application (iOS & Android)',
      'Real-Time App Blocking & Screen Time Analytics',
      'AI-Powered Productivity Coaching',
      'Custom Gamification & Habit Tracking'
    ]
  }
]
