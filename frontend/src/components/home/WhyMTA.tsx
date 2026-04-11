'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]

const values = [
  {
    title: 'India-Based, Globally-Minded',
    body: 'Nagaur, Rajasthan HQ with world-class standards. We combine local understanding with international quality.',
  },
  {
    title: 'Written Agreements for Every Project',
    body: 'No verbal commitments, ever. Clear contracts protect both sides — before a single line of code is written.',
  },
  {
    title: 'Full-Stack Execution',
    body: 'Web, security, AI, automation — all under one roof. No need to coordinate between 5 vendors.',
  },
  {
    title: 'Post-Delivery Support',
    body: "1-year free support on web projects, guaranteed. We don\u0027t disappear after launch.",
  },
  {
    title: 'Transparent Pricing',
    body: 'Published rates, no surprise invoices. You know the full cost before you commit.',
  },
  {
    title: 'Proven Delivery',
    body: 'MNSS website: 3 weeks, exactly as scoped. We deliver on time, every time.',
  },
]

export function WhyMTA() {
  return (
    <section style={{ backgroundColor:'var(--color-surface)', padding:'clamp(56px, 9vw, 96px) 0' }}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left sticky column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, ease: EASE }}
            className="lg:sticky lg:top-[120px] lg:self-start flex flex-col gap-6"
          >
            <div>
              <span className="font-mono uppercase block mb-3" style={{ fontSize:'11px', color:'var(--color-violet-light)', letterSpacing:'0.22em' }}>
                WHY CHOOSE US
              </span>
              <h2 className="font-display font-black tracking-tight leading-[0.92] mb-5"
                style={{ fontSize:'clamp(1.5rem, 3.5vw, 2.75rem)', color: 'var(--color-foreground)' }}>
                Built Different.<br />Delivered Right.
              </h2>
              <p className="text-[15px] leading-[1.72] mb-4" style={{ color:'var(--color-muted)' }}>
                We&apos;re not a body shop or an overseas outsourcing mill. MTA is a lean, Nagaur-based
                agency that treats every project like our own product.
              </p>
              <p className="text-[15px] leading-[1.72]" style={{ color:'var(--color-muted)' }}>
                When you work with us, you get direct access to the people building your solution —
                no account managers, no ticket queues, no runaround.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              {[['50+','Projects'],['20+','Clients'],['3+','Years']].map(([num, lbl]) => (
                <div key={lbl} className="flex flex-col gap-1">
                  <span className="font-display font-black" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-foreground)' }}>
                    {num}
                  </span>
                  <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}>
                    {lbl}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — value list */}
          <div className="flex flex-col">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className="py-6 flex items-start gap-4 border-b group"
                style={{ borderColor:'var(--color-border)' }}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300 group-hover:border-violet/50"
                  style={{ backgroundColor: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.22)' }}
                >
                  <Check className="w-3.5 h-3.5" style={{ color:'var(--color-violet)' }} />
                </div>
                <div>
                  <h3
                    className="font-display font-bold mb-1 transition-colors duration-200 group-hover:text-violet-light"
                    style={{ fontSize: '17px', color: 'var(--color-foreground)', lineHeight: 1.2 }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color:'var(--color-muted)', lineHeight: 1.7 }}>{val.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
