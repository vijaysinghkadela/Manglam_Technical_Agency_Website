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
  image?:       string
  previewVideo?: string
  previewVideoLabel?: string
  previewVideos?: {
    src: string
    label: string
  }[]
  featured:     boolean
  status:       'live' | 'coming-soon'
  type:         'client' | 'product' | 'social-media-handle-manager'
  bgFrom:       string
  bgTo:         string
}

export const projects: Project[] = [
  {
    id: 'nashamukti-social',
    slug: 'nashamukti-hospital-social-media',
    featured: true,
    status: 'live',
    type: 'social-media-handle-manager',
    client: 'Nashamukti Hospital Bikaner',
    title: 'Social Media Handle For rehabilitation Hospital',
    tags: ['Social Media Handle Manager', 'Healthcare', 'Instagram Reels'],
    stack: ['Instagram', 'Meta Business Suite', 'Reel Production', 'Community Updates', 'Content Calendar'],
    duration: 'Active 2026',
    value: 'Live Instagram handle',
    image: '/media/case-studies/nashamukti/Nasha Mukti Hospital Instagram Profile.png',
    previewVideos: [
      {
        src: '/media/case-studies/nashamukti/counseling-patient-short.mp4',
        label: 'counseling-patient-short',
      },
      {
        src: '/media/case-studies/nashamukti/Balika Vidyale Udasar.mp4',
        label: 'Balika Vidyale Udasar',
      },
      {
        src: '/media/case-studies/nashamukti/Krishna Academy Gangashar.mp4',
        label: 'Krishna Academy Gangashar',
      },
      {
        src: '/media/case-studies/nashamukti/MN Institute - Nasha mukti Hospital .mp4',
        label: 'MN Institute - Nasha mukti Hospital',
      },
      {
        src: '/media/case-studies/nashamukti/Nasha Mukti Awareness program - Balika Vidyale Udasar.mp4',
        label: 'Nasha Mukti Awareness program - Balika Vidyale Udasar',
      },
    ],
    url: 'https://www.instagram.com/nashamuktihospitalbikaner/',
    description:
      'Ongoing social media handle management and local awareness growth for a Bikaner rehabilitation and mental health service provider. The work combines daily creative publishing across Instagram, Facebook, and X, credible awareness content, facility proof, event coverage, short-form reels, and performance marketing support designed to help more families in the city discover verified de-addiction care.',
    bgFrom: '#07111F',
    bgTo: '#0E2A3A',
    deliverables: [
      'Daily creative post planning for Instagram, Facebook, and X with a consistent hospital voice',
      'Instagram profile positioning with clear service, location, credibility, and enquiry context',
      'Reel-format video previews from counseling, school awareness, and on-ground activities',
      'Performance marketing support to spread de-addiction awareness across Bikaner city',
      'Feed planning for awareness posts, facility proof, community education, and trust-building stories',
      'Publishing support with captions, creative direction, account hygiene, and discovery-path maintenance',
    ],
  },
  {
    id: 'securestart', slug: 'securestart', featured: false, status: 'coming-soon', type: 'product',
    client: 'MTA Product',
    title: 'SecureStart',
    tags: ['Cybersecurity', 'SaaS', 'Assessment Platform'],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Supabase', 'Python', 'n8n'],
    duration: 'In Development',
    value: 'Coming Soon',
    description: 'Cybersecurity assessment platform for Indian small businesses. Assess, score, and improve cyber posture with professional DOCX reports, DPDP Act compliance mapping, and a clear upsell path into monthly retainers.',
    bgFrom: '#0A0A1A',
    bgTo: '#1A0A1A',
    deliverables: [
      'Client onboarding and asset inventory management',
      'Security assessment creation with finding management',
      'Risk scoring engine with Red/Amber/Green posture bands',
      'Professional DOCX report generation (executive + full)',
      'DPDP Act 2023 and IT Act 2000 compliance mapping',
      'Remediation planning and task tracking',
      'Role-based access (admin, analyst, reviewer, client viewer)',
    ],
  },
  {
    id: 'mnss', slug: 'mnss-website', featured: true, status: 'live', type: 'client',
    client: 'Marut Narayan Sewa Sansthan',
    title: 'Marut Narayan Sewa Sansthan (NGO)',
    tags: ['Healthcare NGO', 'Web Development', 'Multilingual'],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'MongoDB', 'Razorpay'],
    duration: 'Completed 2025',
    value: 'Live & Active',
    image: '/images/MNSS-website-screenshot.webp',
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
    id: 'clinicflow', slug: 'clinicflow-clinic-management', featured: true, status: 'live', type: 'product',
    client: 'MTA Open-Source Product',
    title: 'ClinicFlow',
    tags: ['Healthcare', 'WhatsApp SaaS', 'Web Development'],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS 3', 'Supabase', 'Razorpay', 'Node.js / Express', 'Vercel'],
    duration: 'Completed 2025',
    value: 'Open Source',
    image: '/images/ClinicFlow Dashboard Screenshot.webp',
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
      'Supabase PostgreSQL backend with row-level security and consent-aware data handling',
    ],
  },
  {
    id: 'coaching-os', slug: 'coaching-os-saas', featured: true, status: 'live', type: 'product',
    client: 'Internal SaaS Product (MTA)',
    title: 'Coaching_OS',
    tags: ['EdTech SaaS', 'Web Development', 'Beta'],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    duration: 'Launched 2026',
    value: 'Live Beta',
    image: '/images/Coaching_OS_Dashboard_Screenshot.webp',
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
    id: 'crm', slug: 'customer-relationship-management', featured: true, status: 'live', type: 'product',
    client: 'MTA Product Demo',
    title: 'CRM — Customer Relationship Management',
    tags: ['CRM', 'SaaS', 'Web Development'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui', 'Zustand', 'TanStack Query', 'Zod', 'Recharts', 'Vercel'],
    duration: 'Completed 2025',
    value: 'Live Demo',
    image: '/images/CRM For Real Estate Dashboard Screenshot.webp',
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
