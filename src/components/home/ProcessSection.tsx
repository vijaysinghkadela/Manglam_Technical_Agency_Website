'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const STEPS = [
  { n:'01', title:'Discovery Call',   desc:'We deeply understand your goals, audience, tech needs, and constraints. Everything documented.',     duration:'1–2 days',  detail:'We ask the right questions upfront — so there are no surprises later. You get a call recording and written brief.' },
  { n:'02', title:'Proposal & Scope', desc:'Written deliverables, fixed price, and agreed timeline — signed by both parties before work begins.', duration:'2–3 days',  detail:'No verbal commitments. The proposal is a binding document. If scope changes, we re-scope before proceeding.' },
  { n:'03', title:'Design Sprints',   desc:'Visual direction established with mockups and approval checkpoints. No building before you approve.', duration:'1 week',    detail:'We present 1–2 directions, refine based on feedback, and lock the design before development starts.' },
  { n:'04', title:'Development',      desc:'Full build on a live staging environment with weekly progress updates and access at any time.',        duration:'1–3 weeks', detail:'You can view the staging site at any point. We push updates daily. Bugs found here are fixed here, not post-launch.' },
  { n:'05', title:'QA & Testing',     desc:'Cross-device testing, performance audit, security review, and full bug resolution before launch.',    duration:'2–3 days',  detail:'We test on 6+ device/browser combinations. Performance scored on Lighthouse. All critical issues resolved.' },
  { n:'06', title:'Launch & Support', desc:'Go-live execution, post-launch monitoring, and 1-year free support on all web projects.',              duration:'Ongoing',   detail:'We handle DNS propagation, deployment verification, and stay on-call for 48 hours post-launch.' },
]

export function ProcessSection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="w-full py-28 bg-canvas">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div>
            <span className="font-mono text-[11px] text-violet-light tracking-[0.22em] uppercase block mb-3">
              HOW WE WORK
            </span>
            <h2 className="font-display font-black text-white tracking-tight leading-[0.92]"
              style={{ fontSize:'clamp(28px, 4vw, 60px)' }}>
              Six Steps.<br />Zero Ambiguity.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-muted text-[15px] leading-[1.7] max-w-md">
              Every MTA project follows the same disciplined process.
              You always know exactly where things stand.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="border-t border-border">
          {STEPS.map((step, i) => (
            <motion.div key={step.n}
              initial={{ opacity:0, y:16 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.2 }}
              transition={{ duration:0.5, delay:i * 0.07, ease:[0.16,1,0.3,1] }}
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                data-cursor="pointer"
                className="w-full flex items-center gap-6 lg:gap-10 py-6 text-left group hover:bg-[#0A0A0A] transition-colors duration-200 px-2 -mx-2"
              >
                {/* Number */}
                <span className="font-display font-black text-[40px] lg:text-[52px] text-border group-hover:text-violet/20 transition-colors duration-300 leading-none w-[60px] lg:w-[80px] shrink-0">
                  {step.n}
                </span>
                {/* Title */}
                <span className="flex-1 text-lg lg:text-2xl font-display font-bold text-muted group-hover:text-white transition-colors duration-250">
                  {step.title}
                </span>
                {/* Duration */}
                <span className="hidden lg:block text-[11px] text-dead font-mono tracking-wider group-hover:text-muted transition-colors w-28 text-right">
                  {step.duration}
                </span>
                {/* Toggle */}
                <span className={cn(
                  'text-dead group-hover:text-violet transition-all duration-250 text-xl shrink-0 w-6 text-right inline-block',
                  active === i && 'rotate-45 text-violet',
                )}>
                  +
                </span>
              </button>

              {/* Summary */}
              <p className="text-muted text-[14px] leading-relaxed pb-4 pl-[calc(60px+24px)] lg:pl-[calc(80px+40px)] pr-12">
                {step.desc}
              </p>

              {/* Expanded detail */}
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height:0, opacity:0 }}
                    animate={{ height:'auto', opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.35, ease:[0.33,1,0.68,1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-[calc(60px+24px)] lg:pl-[calc(80px+40px)] pr-12">
                      <p className="text-[13px] text-dead font-mono border-l-2 border-violet pl-4 py-1 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="h-px bg-border" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
