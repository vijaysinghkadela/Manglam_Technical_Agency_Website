'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { services } from '@/lib/data/services'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const CARD_W   = 380
const SIDE_PAD = 96

export function ServicesHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile   = useMediaQuery('(max-width: 1023px)')
  const [vpW, setVpW] = useState(1280)

  useEffect(() => {
    setVpW(window.innerWidth)
    const fn = () => setVpW(window.innerWidth)
    window.addEventListener('resize', fn, { passive:true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  const trackW   = CARD_W * services.length
  const scrollDist = Math.max(trackW - (vpW - SIDE_PAD), 0)
  const sectionH = `calc(100vh + ${scrollDist}px)`

  const { scrollYProgress } = useScroll({ target:sectionRef, offset:['start start','end end'] })
  const x = useTransform(scrollYProgress, [0,1], ['0px', `-${scrollDist}px`])

  if (isMobile) {
    return (
      <section className="w-full py-20 section-divide bg-canvas">
        <div className="w-full max-w-[1440px] mx-auto px-6">
          <SectionHeader />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} data-cursor="link"
                className="flex flex-col border border-border bg-surface p-6 group hover:bg-card transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-violet/50 transition-colors">
                    <s.Icon className="w-5 h-5 text-muted group-hover:text-violet-light transition-colors" />
                  </div>
                  <span className="font-display font-black text-4xl text-[#1A1A1A] leading-none">
                    {String(i + 1).padStart(2,'0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mt-5 leading-tight">{s.name}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{s.tagline}</p>
                <p className="text-xs text-violet-light font-mono mt-3">{s.priceLabel}</p>
                <span className="text-sm text-muted group-hover:text-white transition-colors mt-3 inline-flex items-center gap-1">
                  Explore
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} style={{ height:sectionH }} className="relative w-full section-divide">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-canvas">

        {/* Header */}
        <div className="flex items-end justify-between px-12 pt-20 pb-8 shrink-0">
          <SectionHeader />
          <span className="font-mono text-[11px] text-muted tracking-[0.2em]">
            {String(services.length).padStart(2,'0')} SERVICES
          </span>
        </div>

        {/* Cards */}
        <div className="flex-1 overflow-hidden pl-12 min-h-0 flex items-stretch">
          <motion.div style={{ x, width:`${trackW}px` }}
            className="flex items-stretch shrink-0"
          >
            {services.map((s, i) => (
              <SpotlightCard
                key={s.slug}
                style={{ width:`${CARD_W}px`, flexShrink:0 }}
                className="relative flex flex-col border-r border-border first:border-l group"
              >
                <Link href={`/services/${s.slug}`} data-cursor="link"
                  className="flex flex-col h-full p-10"
                >
                  {/* Decorative number */}
                  <span className="font-display font-black leading-none select-none text-[#0F0F0F] group-hover:text-[#170D30] transition-colors duration-500"
                    style={{ fontSize:80 }}
                  >
                    {String(i + 1).padStart(2,'0')}
                  </span>

                  {/* Icon */}
                  <div className="w-10 h-10 border border-border flex items-center justify-center mt-5 group-hover:border-violet/50 transition-colors">
                    <s.Icon className="w-5 h-5 text-muted group-hover:text-violet-light transition-colors" />
                  </div>

                  {/* Content — pushed to bottom */}
                  <div className="mt-auto flex flex-col gap-3">
                    <h3 className="font-display font-bold text-xl text-white leading-tight">{s.name}</h3>
                    <p className="text-sm text-muted leading-relaxed">{s.tagline}</p>
                    <ul className="flex flex-col gap-1.5 mt-1">
                      {s.features.slice(0,3).map(f => (
                        <li key={f} className="text-xs text-dead font-mono">— {f}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-violet-light font-mono">{s.priceLabel}</p>
                    <span className="text-sm text-muted group-hover:text-white transition-colors inline-flex items-center gap-1 mt-1">
                      Explore Service
                      <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </span>
                  </div>

                  {/* Left violet accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-violet scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                </Link>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="shrink-0 h-px mx-12 bg-border">
          <motion.div className="h-full bg-violet origin-left" style={{ scaleX:scrollYProgress }} />
        </div>
        <div className="shrink-0 px-12 py-3">
          <span className="text-[10px] text-dead font-mono tracking-[0.22em] uppercase">
            ← scroll to explore all services →
          </span>
        </div>
      </div>
    </section>
  )
}

function SectionHeader() {
  return (
    <div>
      <span className="text-[11px] text-violet-light font-mono tracking-[0.22em] uppercase block mb-2">
        WHAT WE DO
      </span>
      <h2 className="font-display font-black text-white leading-[0.92] tracking-tight"
        style={{ fontSize:'clamp(28px, 4vw, 56px)' }}>
        Services That<br />Scale With You
      </h2>
    </div>
  )
}
