'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { AGENCY_PHONE } from '@/lib/constants';

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative w-full bg-violet py-28 lg:py-32 overflow-hidden">
      {/* Giant watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="font-display text-[200px] lg:text-[400px] font-black text-white/[0.04] select-none leading-none">
          MTA
        </span>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        <TextReveal className="text-display-l text-white" as="h2">
          Ready to Build Something Real?
        </TextReveal>

        <p className="text-lg text-white/60 max-w-xl">
          Free consultation. Honest scope. Real timelines.
        </p>

        <MagneticButton className="mt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-violet font-display text-base font-bold hover:bg-[#080808] hover:text-white transition-all duration-300"
            data-cursor="pointer"
          >
            Start Your Project →
          </Link>
        </MagneticButton>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[13px] text-white/50 mt-2"
        >
          or WhatsApp us directly{' '}
          <a href={`tel:${AGENCY_PHONE}`} className="underline hover:text-white transition-colors">
            {AGENCY_PHONE}
          </a>
        </motion.p>
      </div>
    </section>
  );
}
