'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ } from '@/types';
import MotionWrapper from '@/components/ui/MotionWrapper';

interface ServiceFAQProps {
  faqs: FAQ[];
}

export default function ServiceFAQ({ faqs }: ServiceFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <MotionWrapper key={idx} delay={idx * 0.05}>
          <div className="bg-surface-2/80 backdrop-blur-xl border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand/30">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
              aria-expanded={openIdx === idx}
              id={`faq-${idx}`}
            >
              <span className="text-[15px] font-medium text-text-primary pr-4">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${openIdx === idx ? 'rotate-180 text-brand-light' : ''}`} />
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-[15px] text-text-muted leading-relaxed border-t border-border/50 pt-4">{faq.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </MotionWrapper>
      ))}
    </div>
  );
}
