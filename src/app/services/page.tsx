import PageHero from '@/components/ui/PageHero';
import Link from 'next/link';
import { ArrowRight, Globe, Share2, Shield, Bot, Key, Database, Users } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { services } from '@/lib/data/services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore MTA\'s premium digital infrastructure services: Web Development, Cybersecurity, AI Automation, and more.',
};

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Brain: <Bot className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  Key: <Key className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
};

const priceMap: Record<string, string> = {
  'web-development': 'From ₹50,000',
  'social-media-marketing': '₹10,000/mo',
  'cybersecurity': 'From ₹20,000/yr',
  'ai-automation': 'Custom Quote',
  'saas-licensing': 'Custom Quote',
  'data-processing': 'Custom Quote',
  'contractor-management': 'Custom Quote',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Services"
        label="WHAT WE DO"
        title="Services That Scale."
        subheading="End-to-end digital infrastructure for Indian businesses. We build, secure, and automate your operations so you can focus on growth."
      />

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const price = priceMap[service.slug] || 'Custom Quote';

              return (
                <SpotlightCard
                  key={service.slug}
                  className="group flex flex-col p-8 lg:p-10 border border-[#1F1F1F] bg-card h-[420px]"
                >
                  <Link href={`/services/${service.slug}`} className="flex flex-col h-full" data-cursor="link">
                    <div className="flex items-center justify-between mb-auto">
                      <span className="font-body text-4xl font-black text-[#1F1F1F] group-hover:text-violet/30 transition-colors duration-500 select-none">
                        {num}
                      </span>
                      <div className="w-10 h-10 border border-[#1F1F1F] flex items-center justify-center text-white/60 group-hover:border-violet/30 transition-colors">
                        {iconMap[service.icon] || <Globe className="w-5 h-5" />}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="font-display text-2xl font-bold text-white leading-tight">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed line-clamp-2">
                        {service.tagline}
                      </p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xs text-violet font-mono">{price}</p>
                        <ArrowRight className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
