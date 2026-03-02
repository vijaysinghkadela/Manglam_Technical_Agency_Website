'use client';

import Link from 'next/link';
import { ArrowRight, Globe, Share2, Shield, Brain, Key, Database, Users } from 'lucide-react';
import MotionWrapper from '@/components/ui/MotionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { services } from '@/lib/data/services';
import { cn } from '@/lib/cn';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Share2: <Share2 className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Key: <Key className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
};

export default function ServicesGrid() {
  return (
    <section className="w-full py-20 lg:py-28 dot-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="WHAT WE DO" title="End-to-End Digital Services" subtitle="From websites to AI automation — we handle every layer of your digital infrastructure." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <MotionWrapper
              key={service.slug}
              delay={idx * 0.06}
              className={cn(
                idx === services.length - 1 && services.length % 3 === 1 && 'lg:col-start-2',
              )}
            >
              <Link href={`/services/${service.slug}`} className="block h-full">
                <GlassCard className="h-full group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[service.icon] || <Globe className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{service.tagline}</p>
                  <span className="inline-flex items-center gap-2 text-sm text-violet-400 font-medium group-hover:gap-3 transition-all duration-200">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </GlassCard>
              </Link>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
