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
    client: 'Marut Narayan Sewa Sansthan',
    title: 'Marut Narayan Sewa Sansthan (NGO)',
    tags: ['Healthcare NGO', 'Web Development', 'Multilingual'],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'MongoDB', 'Razorpay'],
    duration: 'Completed 2025',
    value: 'Live & Active',
    url: 'https://www.marutnarayansewasansthan.org/',
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
    id: 'clinicflow', slug: 'clinicflow-clinic-management', featured: true, status: 'live',
    client: 'MTA Open-Source Product',
    title: 'ClinicFlow',
    tags: ['Healthcare', 'WhatsApp SaaS', 'Web Development'],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS 3', 'Supabase', 'Razorpay', 'Node.js / Express', 'Vercel'],
    duration: 'Completed 2025',
    value: 'Open Source',
    url: 'https://clinic-flow-rose.vercel.app/dashboard',
    description: 'WhatsApp-native clinic management platform built for small Indian private clinics. Patients book appointments directly through WhatsApp — no app download required. Staff manage everything through a web dashboard backed by Supabase with row-level security and Razorpay/UPI payments.',
    bgFrom: '#0A0F1A',
    bgTo: '#1A0A0F',
    deliverables: [
      'WhatsApp bot backend (Node.js/Express) for patient appointment booking without app installation',
      'Operations dashboard: patient count, daily appointments, monthly revenue (₹), and avg wait time',
      'Patient registry with search, add, edit, and delete — condition and visit history tracking',
      'Appointment scheduler with status filters: Scheduled, Waiting, In Progress, Completed',
      'Razorpay + UPI + Cash payment tracking with receipt verification and pending balance view',
      'Multi-doctor clinic settings, operating hours, QR payment setup, and WhatsApp notification config',
      'Supabase PostgreSQL backend with row-level security and DPDP Act 2023-compliant data handling',
    ],
  },
  {
    id: 'coaching-os', slug: 'coaching-os-saas', featured: true, status: 'live',
    client: 'Internal SaaS Product (MTA)',
    title: 'Coaching_OS',
    tags: ['EdTech SaaS', 'Web Development', 'Beta'],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    duration: 'Launched 2026',
    value: 'Live Beta',
    url: 'https://coaching-os-beta.vercel.app/',
    description: 'SaaS platform for coaching and tuition centers — student management, attendance tracking, fee collection, and parent communication.',
    bgFrom: '#1A0F0A',
    bgTo: '#2A1A0A',
    deliverables: [
      'Student enrollment, attendance, and fee management',
      'Dashboard for coaches to manage daily operations',
      'Parent communication and notification workflows',
    ],
  },
  {
    id: 'crm', slug: 'customer-relationship-management', featured: true, status: 'live',
    client: 'Client Project',
    title: 'CRM — Customer Relationship Management',
    tags: ['CRM', 'SaaS', 'Web Development'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui', 'Zustand', 'TanStack Query', 'Zod', 'Recharts', 'Vercel'],
    duration: 'Completed 2025',
    value: 'Live Demo',
    url: 'https://customer-relationship-management-rose.vercel.app/',
    description: 'Full-featured CRM application for Indian SMEs with contact management, sales pipeline, deal tracking, GST-ready invoicing, lead scoring, email sequences, and automation workflows.',
    bgFrom: '#0F0A1A',
    bgTo: '#1A0A2A',
    deliverables: [
      'Dashboard with real-time metrics, pipeline funnel, and task overview',
      'Contact management with 30+ demo contacts across diverse industries',
      'Drag-and-drop Kanban sales pipeline with 6-stage deal tracking',
      'GST-ready quoting and invoicing with Indian tax calculations',
      'AI-powered lead scoring (hot/warm/cold) and rule-based automation',
      'Email and WhatsApp integrated communication channels',
      'Automated email sequence / drip campaign creator',
      'Sales performance, activity, and advanced reporting with charts',
    ],
  },
]
