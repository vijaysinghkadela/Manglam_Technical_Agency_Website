export interface Service {
  slug: string;
  name: string;
  tagline: string;
  Icon: unknown;
  description: string;
  features: string[];
  priceLabel: string;
  process: ProcessStep[];
  faqs: FAQ[];
}

export interface ProcessStep {
  step: number;
  title: string;
  desc: string;
  duration?: string;
}

export interface PricingItem {
  label: string;
  amount: string;
  note: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  type: string;
  stack: string[];
  duration: string;
  value: string;
  url: string;
  description: string;
  deliverables: string[];
  featured: boolean;
  comingSoon?: boolean;
  color: string;
  badge?: string;
}

export interface PricingPlan {
  service: string;
  slug: string;
  badge: string;
  plans: Plan[];
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  cta: string;
  ctaLink: string;
}

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  growth: string | boolean;
  custom: string | boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  linkedin?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  thumbnail: { from: string; to: string };
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  referralSource: string;
  message: string;
  privacyAgreed: boolean;
}

export interface QuoteFormData {
  services: string[];
  budget: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface NewsletterData {
  email: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: number;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon?: string;
}
