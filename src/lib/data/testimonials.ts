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
    id:      'mnss-secretary',
    quote:   'MTA understood our mission from day one. The bilingual website has made it easier for donors across Rajasthan to connect with our work. Having Razorpay integrated directly means contributions now reach us without any middlemen.',
    name:    'Dr. Mahendra D.',
    role:    'Secretary',
    company: 'Marut Narayan Sewa Sansthan',
    initials:'MD',
  },
  {
    id:      'mnss-donor',
    quote:   'I came across MNSS through their new website and was able to donate in under two minutes. The Hindi option made it easy for my mother to understand their programs too. Clean, fast, and trustworthy — exactly what an NGO needs.',
    name:    'Priya S.',
    role:    'Regular Donor',
    company: 'Bikaner, Rajasthan',
    initials:'PS',
  },
]
