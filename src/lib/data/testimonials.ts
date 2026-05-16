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
    id:      'fitnexora',
    quote:   'FitNexora (GymOS AI) is in active v2.7 development as MTA\'s first SaaS product, focused on gym operations, member experience, and AI-assisted fitness planning.',
    name:    'Product Update',
    role:    'Internal SaaS',
    company: 'FitNexora / GymOS AI',
    initials:'FX',
  },
  {
    id:      'fuxk-scroll',
    quote:   'Fuxk_Scroll is alpha-ready with Android AccessibilityService-based blocking, hard trial enforcement, and focus-session controls for anti-doomscrolling use cases.',
    name:    'Product Update',
    role:    'Internal SaaS',
    company: 'Fuxk_Scroll / FocusGuard Pro',
    initials:'FS',
  },
  {
    id:      'mnss',
    quote:   'MNSS website development is in progress with multilingual support, Razorpay donations, and an admin workflow for managing programs and progress reports.',
    name:    'Project Update',
    role:    'Client Project',
    company: 'Marut Narayan Sewa Sansthan',
    initials:'MD',
  },
]
