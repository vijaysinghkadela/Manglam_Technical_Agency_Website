export interface Testimonial {
  id:      string
  quote:   string
  name:    string
  role:    string
  company: string
  initials:string
}

export const testimonials: Testimonial[] = [
  {
    id:      'mnss',
    quote:   'They delivered our entire website in 3 weeks. The quality was beyond what we expected from any agency at this price. Everything was written down and delivered exactly as agreed.',
    name:    'Programme Director',
    role:    'Programme Director',
    company: 'Marut Narayan Sewa Sansthan',
    initials:'MD',
  },
  {
    id:      't2',
    quote:   'Our social media engagement doubled in the first month. The automation setup alone saved our team 15 hours a week. Highly recommended for any Rajasthan-based business.',
    name:    'Business Owner',
    role:    'Founder',
    company: 'Jaipur Retail Business',
    initials:'JR',
  },
  {
    id:      't3',
    quote:   'The security audit found three critical vulnerabilities we had no idea existed. The report was clear, actionable, and fully aligned with IT Act compliance. Outstanding work.',
    name:    'Operations Head',
    role:    'Operations Head',
    company: 'Rajasthan Healthcare Provider',
    initials:'RH',
  },
]
