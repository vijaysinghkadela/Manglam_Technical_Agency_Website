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
    <section style={{ backgroundColor:'var(--color-canvas)', padding:'80px 0' }}>
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
              style={{
                padding:      '40px',
                borderRight:  i < 3 ? '1px solid var(--color-border)' : 'none',
                borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              {/* CAPPED at 72px — prevents overflow into next section */}
              <ScrambleCounter
                target={s.value}
                suffix={s.suffix}
                className="font-display font-black text-white leading-none tracking-tight"
                style={{ fontSize:'clamp(38px, 5vw, 72px)' }}
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
