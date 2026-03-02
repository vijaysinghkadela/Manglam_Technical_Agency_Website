export interface Project {
  id: string
  slug: string
  client: string
  title: string
  category: string[]
  stack: string[]
  duration: string
  value: string
  deliverables: string[]
  description: string
  url?: string
  featured: boolean
  status: 'live' | 'coming-soon'
  gradient: string
}

export const projects: Project[] = [
  {
    id: 'mnss',
    slug: 'mnss-website',
    client: 'Marut Narayan Sewa Sansthan',
    title: 'MNSS Website',
    category: ['Web Development', 'NGO'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudinary', 'Vercel'],
    duration: '3 Weeks',
    value: '₹50,000',
    deliverables: [
      'Responsive website design & development',
      'Content integration & image optimisation',
      'QA, testing & production deployment',
      '1-year free domain + maintenance',
    ],
    description:
      'Built from scratch for a Rajasthan-based NGO running rehabilitation, women\'s safety, and skill development programs across 5+ districts since 2009. Delivered in exactly 3 weeks as agreed.',
    url: 'https://www.marutnarayansewasansthan.org',
    featured: true,
    status: 'live',
    gradient: 'from-[#0A1A0A] via-[#0F2A10] to-[#0A1A0A]',
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce-platform',
    client: 'Rajasthan Retailer',
    title: 'E-Commerce Platform',
    category: ['Web Development'],
    stack: ['Next.js', 'Stripe', 'PostgreSQL'],
    duration: '6 Weeks',
    value: 'Confidential',
    deliverables: [],
    description: 'Case study in progress.',
    featured: false,
    status: 'coming-soon',
    gradient: 'from-[#0A0A1A] to-[#1A0A2A]',
  },
  {
    id: 'healthcare-social',
    slug: 'healthcare-social-campaign',
    client: 'Healthcare Client',
    title: 'Healthcare Social Campaign',
    category: ['Social Media'],
    stack: ['Meta Ads', 'n8n', 'Automation'],
    duration: '3 Months',
    value: 'Confidential',
    deliverables: [],
    description: 'Case study in progress.',
    featured: false,
    status: 'coming-soon',
    gradient: 'from-[#0A1A1A] to-[#0A2A1A]',
  },
  {
    id: 'security-audit',
    slug: 'sme-security-audit',
    client: 'Bikaner SME',
    title: 'SME Cybersecurity Audit',
    category: ['Cybersecurity'],
    stack: ['Nmap', 'OWASP', 'Custom tooling'],
    duration: '2 Weeks',
    value: 'Confidential',
    deliverables: [],
    description: 'Case study in progress.',
    featured: false,
    status: 'coming-soon',
    gradient: 'from-[#1A0A0A] to-[#2A0A1A]',
  },
]
