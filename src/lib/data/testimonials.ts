export interface Testimonial {
  id:      string
  quote:   string
  name:    string
  role:    string
  company: string
  initials:string
  rating?: number
}

export const testimonials: Testimonial[] = [
  {
    id:      'mnss-secretary',
    quote:   'MTA understood our mission from day one. The bilingual website has made it easier for donors across Rajasthan to connect with our work. Having Razorpay integrated directly means contributions now reach us without any middlemen.',
    name:    'Dr. Mahendra D.',
    role:    'Secretary',
    company: 'Marut Narayan Sewa Sansthan',
    initials:'MD',
    rating: 5,
  },
  {
    id:      'mnss-donor',
    quote:   'I came across MNSS through their new website and was able to donate in under two minutes. The Hindi option made it easy for my mother to understand their programs too. Clean, fast, and trustworthy — exactly what an NGO needs.',
    name:    'Priya S.',
    role:    'Regular Donor',
    company: 'Bikaner, Rajasthan',
    initials:'PS',
    rating: 5,
  },
  {
    id:      'startup-founder',
    quote:   'The scope was written clearly before work started, and the handover made it easy for our internal team to keep improving the site after launch.',
    name:    'Amit K.',
    role:    'Founder',
    company: 'Rajasthan Startup',
    initials:'AK',
    rating: 5,
  },
  {
    id:      'operations-lead',
    quote:   'MTA helped us turn a messy manual process into a clean workflow. The most useful part was how plainly they explained the tradeoffs before building.',
    name:    'Neha R.',
    role:    'Operations Lead',
    company: 'Service Business',
    initials:'NR',
    rating: 5,
  },
]
