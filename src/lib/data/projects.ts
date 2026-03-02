import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'mnss-website',
    title: 'MNSS Website',
    client: 'Marut Narayan Sewa Sansthan',
    category: 'Web Dev',
    type: 'NGO',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudinary', 'Vercel'],
    duration: '3 weeks',
    value: '₹50,000',
    url: 'www.marutnarayansewasansthan.org',
    description: 'Built from scratch for a Rajasthan-based NGO running rehabilitation, women\'s safety, and skill development programs across 5+ districts since 2009. Delivered a fast, responsive, and accessible website that serves as the organization\'s primary digital presence.',
    deliverables: [
      'Responsive website design & development',
      'Content integration across 10+ pages',
      'Image optimisation with Cloudinary',
      'SEO setup & metadata configuration',
      'Deployment on Vercel',
      '1-year free support & maintenance',
    ],
    featured: true,
    color: '#6C2BD9',
    badge: '✦ MTA Signature Project',
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    client: 'Coming Soon',
    category: 'Web Dev',
    type: 'E-Commerce',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    duration: 'TBD',
    value: 'TBD',
    url: '',
    description: 'A full-featured e-commerce platform with product management, cart, checkout, and payment integration. Case study in progress.',
    deliverables: [],
    featured: false,
    comingSoon: true,
    color: '#00D4FF',
  },
  {
    slug: 'healthcare-social-campaign',
    title: 'Healthcare Social Media Campaign',
    client: 'Coming Soon',
    category: 'Social Media',
    type: 'Marketing',
    stack: ['Meta Business Suite', 'Canva', 'Buffer'],
    duration: 'TBD',
    value: 'TBD',
    url: '',
    description: 'Comprehensive social media campaign for a healthcare provider. Audience growth and engagement strategies tailored for the medical sector.',
    deliverables: [],
    featured: false,
    comingSoon: true,
    color: '#10B981',
  },
  {
    slug: 'sme-cybersecurity-audit',
    title: 'SME Cybersecurity Audit',
    client: 'Coming Soon',
    category: 'Cybersecurity',
    type: 'Security',
    stack: ['OWASP', 'Nmap', 'Burp Suite'],
    duration: 'TBD',
    value: 'TBD',
    url: '',
    description: 'Full cybersecurity audit for a Jaipur-based SME. Vulnerability assessment, remediation, and ongoing monitoring setup.',
    deliverables: [],
    featured: false,
    comingSoon: true,
    color: '#EF4444',
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return projects;
  return projects.filter((p) =>
    p.category.toLowerCase() === category.toLowerCase() ||
    p.type.toLowerCase() === category.toLowerCase()
  );
}
