'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  { n:'01', title:'Discovery Call',    summary:'We learn your goals, audience, scope, and constraints.',      detail:'You receive a written brief + call recording. Nothing begins without documented alignment.',        duration:'1–2 days'  },
  { n:'02', title:'Proposal & Scope',  summary:'Fixed price, clear deliverables, signed by both parties.',   detail:'The proposal is a binding document. Scope changes are re-scoped before proceeding.',               duration:'2–3 days'  },
  { n:'03', title:'Design Sprints',    summary:'Mockups approved before any code is written.',               detail:'1–2 visual directions presented. You approve before development begins.',                         duration:'1 week'    },
  { n:'04', title:'Development',       summary:'Built on live staging. Weekly updates.',                     detail:'Staging access at any time. Daily pushes. Bugs found here, fixed here.',                        duration:'1–3 weeks' },
  { n:'05', title:'QA & Testing',      summary:'Cross-device. Performance. Security. Then go-live.',        detail:'Lighthouse audit. 6+ browser/device combinations. Critical issues resolved pre-launch.',         duration:'2–3 days'  },
  { n:'06', title:'Launch & Support',  summary:'Production deployment. 48hr monitoring. 1-year support.',   detail:'DNS propagation handled. On-call 48hrs post-launch. 1-year free support on web projects.',        duration:'Ongoing'   },
]

export function ProcessSection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section style={{ backgroundColor:'var(--color-canvas)', padding:'112px 0' }}>
      <div className="container-site">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div>
            <span className="font-mono uppercase block mb-3" style={{ fontSize:'11px', color:'var(--color-violet-light)', letterSpacing:'0.22em' }}>
              HOW WE WORK
            </span>
            <h2 className=" font-black text-white leading-[0.92] tracking-tight" style={{ fontSize:'clamp(28px, 4vw, 58px)' }}>
              Six Steps.<br />Zero Ambiguity.
            </h2>
          </div>
          <p className="self-end" style={{ fontSize:'15px', lineHeight:1.7, color:'var(--color-muted)', maxWidth:'420px' }}>
            Every MTA project follows the same process. You always know exactly where things stand.
          </p>
        </div>

        {/* Steps */}
        <div style={{ borderTop:'1px solid var(--color-border)' }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity:0, y:14 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.2 }}
              transition={{ duration:0.5, delay:i * 0.065, ease:[0.16,1,0.3,1] }}
            >
              {/* Row button */}
              <button
                onClick={() => setActive(active === i ? null : i)}
                data-cursor="pointer"
                className="w-full flex items-start gap-6 lg:gap-10 py-5 text-left group transition-colors duration-200"
                style={{ padding:'20px 8px', margin:'0 -8px' }}
              >
                {/* Number */}
                <span
                  className=" font-black leading-none font-mono shrink-0 transition-colors duration-300"
                  style={{
                    fontSize:  'clamp(32px, 4vw, 48px)',
                    color:      active === i ? 'rgba(124,58,237,0.35)' : 'var(--color-border)',
                    minWidth:   '72px',
                    paddingTop: '4px',
                  }}
                >
                  {step.n}
                </span>
                {/* Title */}
                <span
                  className="flex-1  font-bold transition-colors duration-200 group-hover:text-white"
                  style={{ fontSize:'clamp(17px, 2.2vw, 24px)', color: active === i ? '#FAFAFA' : 'var(--color-muted)', paddingTop:'4px' }}
                >
                  {step.title}
                </span>
                {/* Duration */}
                <span
                  className="hidden lg:block font-mono text-[11px] tracking-wider transition-colors group-hover:text-muted shrink-0"
                  style={{ color:'var(--color-dead)', paddingTop:'6px' }}
                >
                  {step.duration}
                </span>
                {/* Toggle */}
                <span
                  className="font-mono text-xl shrink-0 transition-all duration-200"
                  style={{
                    color:     active === i ? 'var(--color-violet)' : 'var(--color-dead)',
                    transform: active === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    paddingTop:'2px',
                  }}
                >
                  +
                </span>
              </button>

              {/* Summary — always visible */}
              <p className="text-sm leading-relaxed pb-4" style={{ color:'var(--color-muted)', paddingLeft:'clamp(72px, 8vw, 108px)', paddingRight:'40px' }}>
                {step.summary}
              </p>

              {/* Detail — expands on click */}
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    key="detail"
                    initial={{ height:0, opacity:0 }}
                    animate={{ height:'auto', opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.35, ease:[0.33,1,0.68,1] }}
                    style={{ overflow:'hidden' }}
                  >
                    <div style={{ paddingLeft:'clamp(72px, 8vw, 108px)', paddingRight:'40px', paddingBottom:'24px' }}>
                      <p
                        className="text-[13px] leading-relaxed"
                        style={{
                          color:       'var(--color-dead)',
                          fontFamily:  'var(--font-mono)',
                          borderLeft:  '2px solid var(--color-violet)',
                          paddingLeft: '16px',
                          paddingTop:  '4px',
                          paddingBottom:'4px',
                        }}
                      >
                        {step.detail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ height:'1px', backgroundColor:'var(--color-border)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
