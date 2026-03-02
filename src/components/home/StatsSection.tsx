'use client';

import { motion } from 'framer-motion';
import ScrambleCounter from '@/components/ui/ScrambleCounter';

import { cn } from '@/lib/utils';

const stats = [
  { value: 50, suffix: '+', label: 'PROJECTS' },
  { value: 20, suffix: '+', label: 'CLIENTS' },
  { value: 3, suffix: '+', label: 'YEARS' },
  { value: 98, suffix: '%', label: 'SATISFACTION' },
];

export default function StatsSection() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={cn(
              "flex flex-col items-center lg:items-start text-center lg:text-left",
              i < 3 && "lg:border-r lg:border-[#1F1F1F] lg:pr-12"
            )}
          >
            {/* Fixed font size — use clamp with hard cap */}
            <div className="font-black text-white leading-none" style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}>
              <ScrambleCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[11px] text-[#525252] font-mono tracking-[0.2em] uppercase mt-3">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
