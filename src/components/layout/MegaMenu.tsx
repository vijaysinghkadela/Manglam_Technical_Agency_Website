'use client';

import Link from 'next/link';
import { services } from '@/lib/data/services';
import { Globe, Share2, Shield, Brain, Key, Database, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Key: <Key className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
};

interface MegaMenuProps {
  onClose: () => void;
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 z-50 mt-2"
      onMouseLeave={onClose}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass-card p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services list */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onClick={onClose}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand-light shrink-0 group-hover:bg-brand/20 transition-colors">
                  {iconMap[service.icon] || <Globe className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary group-hover:text-brand-light transition-colors">{service.name}</div>
                  <div className="text-xs text-text-muted mt-0.5 line-clamp-1">{service.tagline}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured project */}
          <div className="bg-surface-2 rounded-xl p-5 border border-border">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-3">Featured Project</div>
            <div className="mb-3">
              <div className="text-sm font-semibold text-text-primary">MNSS Website</div>
              <div className="text-xs text-text-muted mt-1">Rajasthan NGO • 3 weeks • ₹50,000</div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['Next.js', 'TypeScript', 'Tailwind'].map((t) => (
                <span key={t} className="text-[10px] bg-dark px-2 py-0.5 rounded border border-brand/10 text-text-muted">{t}</span>
              ))}
            </div>
            <a
              href="https://www.marutnarayansewasansthan.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-brand-light hover:text-brand transition-colors"
            >
              Visit Live Site <ExternalLink className="w-3 h-3" />
            </a>
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href="/services"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm text-text-primary hover:text-brand-light transition-colors font-medium"
              >
                View All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
