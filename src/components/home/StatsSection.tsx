'use client'
import { ScrambleCounter } from '@/components/ui/ScrambleCounter'
import { cn } from '@/lib/utils'

const STATS = [
  { value:50, suffix:'+', label:'PROJECTS DELIVERED' },
  { value:20, suffix:'+', label:'HAPPY CLIENTS'      },
  { value:3,  suffix:'+', label:'YEARS ACTIVE'       },
  { value:98, suffix:'%', label:'SATISFACTION RATE'  },
]

export function StatsSection() {
  return (
    <section className="w-full py-20 bg-canvas">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((s, i) => (
            <div key={s.label}
              className={cn('flex flex-col items-center lg:items-start text-center lg:text-left py-10',
                i % 2 === 0 ? 'border-r border-border pr-6 lg:pr-12' : 'pl-6 lg:pl-12',
                i < 2       ? 'border-b lg:border-b-0 border-border' : '',
                i === 1     ? 'lg:border-r border-border'            : '',
                i === 2     ? 'lg:border-r border-border'            : '',
              )}
            >
              <ScrambleCounter
                target={s.value} suffix={s.suffix}
                className="font-display font-black text-white leading-none tracking-tight"
                style={{ fontSize:'clamp(36px, 5vw, 72px)' }}
              />
              <p className="font-mono text-[11px] text-muted tracking-[0.2em] mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
