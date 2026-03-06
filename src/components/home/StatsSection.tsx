'use client'
import { ScrambleCounter } from '@/components/ui/ScrambleCounter'

const STATS = [
  { value:50, suffix:'+', label:'PROJECTS DELIVERED' },
  { value:20, suffix:'+', label:'HAPPY CLIENTS'      },
  { value:3,  suffix:'+', label:'YEARS ACTIVE'       },
  { value:98, suffix:'%', label:'SATISFACTION RATE'  },
]

export function StatsSection() {
  return (
    <section style={{ backgroundColor:'var(--color-canvas)', padding:'clamp(32px, 6vw, 56px) 0' }}>
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center min-w-0 ${
                i % 2 === 0 ? 'border-r border-border' : ''
              } ${i < 2 ? 'border-b border-border' : ''} ${
                i < 3 ? 'lg:border-r lg:border-border' : 'lg:border-r-0'
              } lg:border-b-0`}
              style={{
                padding: 'clamp(20px, 4vw, 40px)',
              }}
            >
              {/* CAPPED at 72px — prevents overflow into next section */}
              <ScrambleCounter
                target={s.value}
                suffix={s.suffix}
                className="font-display font-black text-white leading-none tracking-tight"
                style={{ fontSize:'clamp(1.5rem, 4vw, 3rem)' }}
              />
              <p
                className="font-mono uppercase mt-3"
                style={{ fontSize:'11px', color:'var(--color-muted)', letterSpacing:'0.2em' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
