'use client'
import { motion } from 'framer-motion'
import { ScrambleCounter } from '@/components/ui/ScrambleCounter'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]

const STATS = [
  { value:50, suffix:'+', label:'PROJECTS DELIVERED', sub: 'across industries' },
  { value:20, suffix:'+', label:'HAPPY CLIENTS',      sub: 'India & beyond'   },
  { value:3,  suffix:'+', label:'YEARS ACTIVE',       sub: 'since 2021'       },
  { value:98, suffix:'%', label:'SATISFACTION RATE',  sub: 'client-reported'  },
]

export function StatsSection() {
  return (
    <section style={{ backgroundColor:'var(--color-canvas)', padding:'clamp(40px, 7vw, 72px) 0' }}>
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className={`flex flex-col items-center text-center min-w-0 group ${
                i % 2 === 0 ? 'border-r border-border' : ''
              } ${i < 2 ? 'border-b border-border' : ''} ${
                i < 3 ? 'lg:border-r lg:border-border' : 'lg:border-r-0'
              } lg:border-b-0`}
              style={{ padding: 'clamp(24px, 4vw, 48px)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <ScrambleCounter
                target={s.value}
                suffix={s.suffix}
                className="font-display font-black leading-none tracking-tight text-glow-violet"
                style={{ fontSize:'clamp(2rem, 5.5vw, 4.5rem)', color: 'var(--color-foreground)' }}
              />
              <div
                className="my-3 transition-all duration-500 group-hover:w-10"
                style={{ width:'24px', height:'1px', backgroundColor:'var(--color-violet)', opacity:0.6 }}
              />
              <p className="font-mono uppercase" style={{ fontSize:'11px', color:'var(--color-muted)', letterSpacing:'0.2em' }}>
                {s.label}
              </p>
              <p
                className="font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ fontSize:'10px', color:'var(--color-violet-light)', letterSpacing:'0.14em' }}
              >
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
