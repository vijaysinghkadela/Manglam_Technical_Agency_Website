'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { services } from '@/lib/data/services'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]
const CARD_W   = 380
const SIDE_PAD = 96

export function ServicesHorizontal() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const isMobile    = useMediaQuery('(max-width: 1023px)')
  const [vpW, setVpW] = useState(1280)

  useEffect(() => {
    setTimeout(() => setVpW(window.innerWidth), 0)
    const fn = () => setVpW(window.innerWidth)
    window.addEventListener('resize', fn, { passive:true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  const trackW     = CARD_W * services.length
  const scrollDist = Math.max(trackW - (vpW - SIDE_PAD), 0)
  const sectionHeight = `calc(100vh + ${scrollDist}px)`

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0,1], ['0px', `-${scrollDist}px`])

  // Mobile: vertical grid
  if (isMobile) {
    return (
      <section style={{ borderTop:'1px solid var(--color-border)' }}>
        <div className="container-site py-12 lg:py-20">
          <SectionLabel />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {services.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              >
                <Link href={`/services/${s.slug}`}
                  data-cursor="link"
                  className="flex flex-col p-6 group transition-all duration-300"
                  style={{ border:'1px solid var(--color-border)', backgroundColor:'var(--color-surface)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.4)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)' }}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className="w-10 h-10 flex items-center justify-center border transition-colors group-hover:border-violet/60"
                      style={{ borderColor:'var(--color-border)' }}
                    >
                      <s.Icon className="w-5 h-5 transition-colors group-hover:text-violet-light" style={{ color:'var(--color-muted)' }} />
                    </div>
                    <span
                      className="font-display font-black text-3xl sm:text-4xl leading-none transition-colors duration-500 group-hover:text-violet"
                      style={{ color:'var(--color-dead)', opacity: 0.6 }}
                    >
                      {String(i+1).padStart(2,'0')}
                    </span>
                  </div>
                  <h3 className="font-display font-bold mt-4 leading-tight" style={{ fontSize:'18px', color: 'var(--color-foreground)' }}>{s.name}</h3>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color:'var(--color-muted)' }}>{s.tagline}</p>
                  <p className="font-mono text-xs mt-3" style={{ color:'var(--color-violet-light)' }}>{s.priceLabel}</p>
                  <span className="text-sm mt-3 inline-flex items-center gap-1 transition-colors group-hover:text-violet-light min-h-[44px]" style={{ color:'var(--color-muted)' }}>
                    Explore <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: sectionHeight, position:'relative', width:'100%' }}
      aria-label="Our Services"
    >
      <div
        className="flex flex-col overflow-hidden"
        style={{
          position:'sticky', top:0, height:'100vh', width:'100%',
          backgroundColor:'var(--color-canvas)',
          borderTop:'1px solid var(--color-border)',
        }}
      >
        {/* Section header */}
        <div className="flex items-end justify-between shrink-0 pt-20 pb-8 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
          <SectionLabel />
          <span className="font-mono text-label tracking-[0.2em]" style={{ color:'var(--color-muted)' }}>
            {String(services.length).padStart(2,'0')} SERVICES
          </span>
        </div>

        {/* Scrolling card track */}
        <div className="flex-1 overflow-hidden min-h-0 flex items-stretch max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
          <motion.div
            style={{ x, width:`${trackW}px`, flexShrink:0 }}
            className="flex items-stretch"
          >
            {services.map((s, i) => (
              <SpotlightCard
                key={s.slug}
                style={{
                  width:`${CARD_W}px`,
                  flexShrink:0,
                  borderRight:'1px solid var(--color-border)',
                  ...(i === 0 ? { borderLeft:'1px solid var(--color-border)' } : {}),
                }}
                className="relative flex flex-col group"
              >
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="link"
                  className="flex flex-col h-full p-10"
                >
                  {/* Decorative number */}
                  <span
                    className="font-display font-black leading-none select-none transition-colors duration-500 group-hover:text-violet"
                    style={{ fontSize:80, color:'var(--color-dead)' }}
                  >
                    {String(i+1).padStart(2,'0')}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-10 h-10 flex items-center justify-center mt-5 border transition-colors group-hover:border-violet/50"
                    style={{ borderColor:'var(--color-border)' }}
                  >
                    <s.Icon
                      className="w-5 h-5 transition-colors group-hover:text-violet-light"
                      style={{ color:'var(--color-muted)' }}
                    />
                  </div>

                  {/* Content pushed to bottom */}
                  <div className="mt-auto flex flex-col gap-3">
                    <h3 className="font-display font-bold leading-tight" style={{ fontSize:'21px', color: 'var(--color-foreground)' }}>
                      {s.name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color:'var(--color-muted)' }}>{s.tagline}</p>
                    <ul className="flex flex-col gap-2 mt-1">
                      {s.features.slice(0,3).map(f => (
                        <li key={f} className="font-mono text-sm" style={{ color:'var(--color-dead)' }}>— {f}</li>
                      ))}
                    </ul>
                    <p className="font-mono text-xs" style={{ color:'var(--color-violet-light)' }}>{s.priceLabel}</p>
                    <span className="text-sm inline-flex items-center gap-1 mt-1 transition-colors group-hover:text-violet-light" style={{ color:'var(--color-muted)' }}>
                      Explore Service
                      <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
                    </span>
                  </div>

                  {/* Violet left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-violet transition-transform duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                </Link>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="shrink-0 max-w-[1440px] mx-auto px-6 lg:px-12 w-full h-px" style={{ backgroundColor:'var(--color-border)' }}>
          <motion.div className="h-full origin-left" style={{ scaleX:scrollYProgress, backgroundColor:'var(--color-violet)' }} />
        </div>
        <div className="shrink-0 max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-3 flex items-center justify-between">
          <span className="font-mono uppercase text-[10px] tracking-[0.22em]" style={{ color:'var(--color-dead)' }}>
            ← scroll to explore all services →
          </span>
          <motion.span
            className="font-mono text-[10px] tracking-[0.16em]"
            style={{ color:'var(--color-violet-light)' }}
          >
            {services.length} SERVICES
          </motion.span>
        </div>
      </div>
    </section>
  )
}

function SectionLabel() {
  return (
    <div>
      <span className="font-mono uppercase block mb-2" style={{ fontSize:'11px', color:'var(--color-violet-light)', letterSpacing:'0.22em' }}>
        WHAT WE DO
      </span>
      <h2 className="font-display font-black leading-[0.92] tracking-tight" style={{ fontSize:'clamp(28px, 4vw, 54px)', color: 'var(--color-foreground)' }}>
        Services That<br />Scale With You
      </h2>
    </div>
  )
}
