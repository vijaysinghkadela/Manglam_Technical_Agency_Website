'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TextReveal from '@/components/ui/TextReveal';

interface PageHeroProps {
  breadcrumbBase?: string;
  breadcrumbBaseHref?: string;
  breadcrumbCurrent: string;
  label?: string;
  title: string;
  subheading?: string;
}

export default function PageHero({
  breadcrumbBase = 'Home',
  breadcrumbBaseHref = '/',
  breadcrumbCurrent,
  label,
  title,
  subheading,
}: PageHeroProps) {
  return (
    <section className="w-full bg-canvas pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[12px] font-mono text-muted">
              <Link href={breadcrumbBaseHref} className="hover:text-white transition-colors" data-cursor="pointer">
                {breadcrumbBase}
              </Link>
              <span>/</span>
              <span className="text-white/60">{breadcrumbCurrent}</span>
            </div>

            {label && (
              <p className="text-[11px] text-violet uppercase tracking-[0.2em] font-medium">
                {label}
              </p>
            )}
          </div>

          <TextReveal className="text-display-l text-white font-display" as="h1">
            {title}
          </TextReveal>

          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[18px] text-muted max-w-2xl leading-relaxed"
            >
              {subheading}
            </motion.p>
          )}
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[80px]">
        <div className="w-full h-[1px] bg-[#1F1F1F]" />
      </div>
    </section>
  );
}
