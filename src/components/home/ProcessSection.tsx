'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ProcessSection() {
  const [active, setActive] = useState<number | null>(null)

  const steps = [
    { n: '01', title: 'Discovery Call', desc: 'We understand your goals, audience, and project scope through a focused consultation.', duration: 'Est. 1–2 days' },
    { n: '02', title: 'Proposal & Scope', desc: 'Clear deliverables, timeline, and fixed pricing agreed in writing before any work begins.', duration: 'Est. 2–3 days' },
    { n: '03', title: 'Design Sprints', desc: 'Visual direction established with mockups and approval checkpoints — no surprises.', duration: 'Est. 1 week' },
    { n: '04', title: 'Development', desc: 'Full build phase with weekly progress updates and a staging environment for review.', duration: 'Est. 1–3 weeks' },
    { n: '05', title: 'QA & Testing', desc: 'Cross-device testing, performance checks, and bug resolution before any launch.', duration: 'Est. 2–3 days' },
    { n: '06', title: 'Launch & Support', desc: 'Go-live execution plus post-launch monitoring. Web projects include 1-year free support.', duration: 'Ongoing' },
  ]

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
      
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <span className="text-[11px] text-violet-400 font-mono tracking-[0.2em] uppercase block mb-3">HOW WE WORK</span>
          <h2 className="font-black text-white tracking-tight leading-[0.92]" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
            Six Steps.<br />Zero Ambiguity.
          </h2>
        </div>
        <div className="flex items-end">
          <p className="text-[#525252] text-base leading-relaxed max-w-md">
            Every project follows the same disciplined process. You know exactly where things stand at every stage.
          </p>
        </div>
      </div>

      {/* Steps list */}
      <div className="border-t border-[#1F1F1F]">
        {steps.map((step, i) => (
          <div key={step.n}>
            <button
              onClick={() => setActive(active === i ? null : i)}
              className="w-full flex items-center gap-6 lg:gap-12 py-6 text-left group hover:bg-[#0A0A0A] transition-colors duration-200 px-2 -mx-2"
            >
              {/* Number */}
              <span className="text-[40px] lg:text-[56px] font-black text-[#1F1F1F] group-hover:text-violet-500/20 transition-colors duration-300 font-mono leading-none w-20 flex-shrink-0">
                {step.n}
              </span>
              
              {/* Title */}
              <span className="flex-1 text-xl lg:text-2xl font-bold text-[#525252] group-hover:text-white transition-colors duration-300">
                {step.title}
              </span>
              
              {/* Duration */}
              <span className="hidden lg:block text-[11px] text-[#2A2A2A] font-mono tracking-wider group-hover:text-[#525252] transition-colors">
                {step.duration}
              </span>
              
              {/* Arrow */}
              <span className={cn(
                "text-[#2A2A2A] group-hover:text-violet-500 transition-all duration-300 flex-shrink-0 text-lg",
                active === i && "rotate-45 text-violet-500"
              )}>
                +
              </span>
            </button>

            {/* Expanded content */}
            <motion.div
              initial={false}
              animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-8 pl-[calc(80px+24px)] lg:pl-[calc(80px+48px)] pr-12">
                <p className="text-[#525252] text-base leading-relaxed mb-4">{step.desc}</p>
                <div className="flex items-center gap-2 text-[11px] text-violet-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  {step.duration}
                </div>
              </div>
            </motion.div>

            <div className="h-px bg-[#1F1F1F]" />
          </div>
        ))}
      </div>
    </div>
  )
}
