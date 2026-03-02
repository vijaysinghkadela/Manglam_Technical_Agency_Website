'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';

const techPills = [
  { label: 'Next.js', x: '-60%', y: '-30%', delay: 0.8 },
  { label: 'Cybersecurity', x: '50%', y: '10%', delay: 1.0 },
  { label: 'AI Automation', x: '-20%', y: '60%', delay: 1.2 },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 240]);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Grid background with parallax */}
      <motion.div className="absolute inset-0 grid-bg" style={{ y: bgY }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 60%, #080808 100%)',
        }}
      />

      {/* Noise */}
      <div className="absolute inset-0 noise pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center min-h-screen lg:min-h-0 lg:h-screen">
          {/* Left column (60%) */}
          <div className="lg:col-span-3 flex flex-col gap-8 pt-24 lg:pt-0">
            {/* Micro label — typewriter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-micro text-muted"
            >
              ✦ MANGLAM TECHNICAL AGENCY — RAJASTHAN, INDIA
            </motion.p>

            {/* Display heading */}
            <div className="flex flex-col gap-0">
              <TextReveal className="text-display-xl text-white" as="h1" delay={0.3}>
                WE BUILD
              </TextReveal>
              <TextReveal className="text-display-xl text-violet pl-6 lg:pl-10" as="h1" delay={0.45}>
                DIGITAL
              </TextReveal>
              <TextReveal className="text-display-xl text-white" as="h1" delay={0.6}>
                INFRASTRUCTURE
              </TextReveal>
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-lg text-muted max-w-md leading-relaxed"
            >
              From custom websites to AI automation — end-to-end
              technology services for Indian businesses.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex items-center gap-6 flex-wrap"
            >
              <MagneticButton>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#080808] text-sm font-semibold hover:bg-violet hover:text-white transition-all duration-300"
                  data-cursor="pointer"
                >
                  Start a Project →
                </Link>
              </MagneticButton>
              <Link
                href="/portfolio"
                className="text-sm text-muted hover:text-white transition-colors underline-slide"
                data-cursor="pointer"
              >
                See Our Work
              </Link>
            </motion.div>

            {/* Trust */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-xs text-dead tracking-[0.1em]"
            >
              50+ Projects · 20+ Clients · 3 Years · Rajasthan
            </motion.p>
          </div>

          {/* Right column (40%) — Animated circles */}
          <div className="lg:col-span-2 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative w-[320px] h-[320px] lg:w-[400px] lg:h-[400px]"
            >
              {/* Outer Ring — dashed, slow clockwise */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#1F1F1F] animate-spin-slow" />

              {/* Inner Ring — solid, counter-clockwise */}
              <div className="absolute inset-[40px] rounded-full border border-violet/30 animate-spin-slow-reverse" />

              {/* Centre dot grid */}
              <div className="absolute inset-[80px] grid grid-cols-6 grid-rows-6 gap-2 place-items-center">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full ${
                      i % 5 === 0 ? 'bg-violet animate-pulse-violet' : 'bg-[#1F1F1F]'
                    }`}
                  />
                ))}
              </div>

              {/* Floating tech pills */}
              {techPills.map((pill) => (
                <motion.div
                  key={pill.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { delay: pill.delay, duration: 0.5 },
                    y: { delay: pill.delay + 0.3, duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute"
                  style={{ left: `calc(50% + ${pill.x})`, top: `calc(50% + ${pill.y})` }}
                >
                  <span className="px-3 py-1.5 text-[11px] text-white font-medium bg-card border border-[#1F1F1F] rounded-full whitespace-nowrap">
                    {pill.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom left */}
      <div className="absolute bottom-8 left-8 lg:left-12 flex items-center gap-3">
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-white/40 to-transparent animate-scroll-line" />
        <span className="text-[10px] text-dead tracking-[0.15em] uppercase rotate-0 font-mono">
          SCROLL
        </span>
      </div>
    </section>
  );
}
