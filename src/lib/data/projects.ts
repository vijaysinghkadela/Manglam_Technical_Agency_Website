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
    id: 'fitnexora', slug: 'fitnexora-gymos-ai', featured: true, status: 'live',
    client:      'Internal SaaS Product (MTA)',
    title:       'FitNexora / GymOS AI',
    tags:        ['SaaS', 'AI & Automation', 'Flutter'],
    stack:       ['Flutter 3.6+', 'Riverpod 2.6', 'GoRouter', 'Supabase', 'NVIDIA Kimi K2', 'Razorpay'],
    duration:    'Active development (v2.7)',
    value:       'Internal Product',
    description: 'MTA\'s first SaaS product for gym owners and members, combining operations, client management, and AI-generated workout and diet planning in one platform.',
    bgFrom:      '#0C0C0E',
    bgTo:        '#2B1304',
    deliverables: [
      'Owner dashboards for attendance, memberships, and traffic monitoring',
      'Member app for workouts, diet tracking, and progress visibility',
      'AI pipeline for body analysis, 4-week plans, and diet recommendations',
      'INR tiered pricing model: Basic, Pro, and Elite',
    ],
  },
  {
    id: 'mnss', slug: 'mnss-website', featured: true, status: 'live',
    client: 'Marut Narayan Sewa Sansthan',
    title: 'MNSS Website',
    tags: ['Healthcare NGO', 'Web Development', 'Multilingual'],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'MongoDB', 'Razorpay'],
    duration: 'Completed 2025',
    value: 'Live & Active',
    url: 'https://mnss.org.in',
    description: 'Multilingual website for a Bikaner-based healthcare and rehabilitation organization, including donations, reports publishing, and admin management flows.',
    bgFrom: '#0A1A0A',
    bgTo: '#0F2A10',
    deliverables: [
      'Hindi/English multilingual experience via LanguageContext',
      'Programs showcase and progress report publishing',
      'Razorpay donation workflow with verification routes',
      'Admin dashboard for content and report management',
    ],
  },
  {
    id: 'fuxk-scroll', slug: 'fuxk-scroll-focusguard-pro', featured: false, status: 'coming-soon',
    client: 'Internal SaaS Product (MTA)',
    title: 'Fuxk_Scroll / FocusGuard Pro',
    tags: ['Digital Wellness', 'Android App'],
    stack: ['Flutter', 'Kotlin AccessibilityService', 'Supabase', 'RevenueCat'],
    duration: 'Alpha-ready',
    value: 'Internal Product',
    description: 'Android-first digital wellness app focused on blocking short-form video addiction and enforcing focus sessions with whitelist-based lockdown.',
    bgFrom: '#131313',
    bgTo: '#2B1600',
    deliverables: [
      'Native AccessibilityService blocking engine for Android',
      '3-day hard trial enforcement with subscription paywall',
      'Preset-based focus sessions and block overlays',
      'Adult content filtering and short-form surface detection',
    ],
  },
  {
    id: 'doctor-client', slug: 'doctor-client-app', featured: false, status: 'coming-soon',
    client: 'Doctor Client',
    title: 'Doctor Appointment Management App',
    tags: ['Healthcare', 'App Development'],
    stack: ['Flutter'],
    duration: 'In development',
    value: 'Confidential',
    description: 'Healthcare appointment management application currently in development while SOW-specific fields are being finalized.',
    bgFrom: '#0A0A1A',
    bgTo: '#1A0A2A',
    deliverables: [
      'Appointment workflow planning and app module structuring',
      'Healthcare-oriented mobile application development',
    ],
  },
  {
    id: 'coaching-os', slug: 'coaching-os-saas', featured: false, status: 'coming-soon',
    client: 'Internal SaaS Product (MTA)',
    title: 'Coaching OS',
    tags: ['EdTech SaaS', 'Planning'],
    stack: ['Flutter', 'Supabase', 'Riverpod', 'GoRouter', 'Razorpay'],
    duration: 'Planning phase',
    value: 'Internal Product',
    description: 'Second MTA SaaS product planned for coaching and tuition centers across Rajasthan, starting from Bikaner.',
    bgFrom: '#1A0F0A',
    bgTo: '#2A1A0A',
    deliverables: [
      'Student enrollment, attendance, and fee management architecture',
      'Parent communication automation workflows',
      'AI-ready reporting roadmap for coaching performance analytics',
    ],
  },
]
