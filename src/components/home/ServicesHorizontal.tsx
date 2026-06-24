'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { services } from '@/lib/data/services'
export function ServicesHorizontal() {
  return (
    <section
      className="section"
      style={{
        borderTop: '1px solid var(--color-border)',
        position: 'relative',
        backgroundColor: 'var(--color-canvas)' }}
      aria-label="Our Services"
    >
      <div className="container-site">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionLabel />
          <p
            className="text-sm sm:text-base leading-relaxed max-w-md"
            style={{
              color: 'var(--color-muted)',
              lineHeight: 1.72 }}
          >
            Six practice areas, one delivery standard. Each service is scoped, priced, and documented before any work begins.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-14">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={false}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Link
                href={`/services/${s.slug}`}
                data-cursor="link"
                className="group flex flex-col rounded-[24px] border border-border bg-card p-6 sm:p-8 transition-all duration-300 active:scale-[0.98] touch-manipulation hover:shadow-md"
                style={{
                  touchAction: 'manipulation',
                  borderRadius: '24px',
                  transition: `all ${0.3}s cubic-bezier(${'0.16,1,0.3,1'})` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-violet)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)' }}
              >
                <div
                  className="mb-4 h-px w-full"
                  style={{ background: `linear-gradient(90deg, var(--color-violet), transparent 85%)` }}
                  aria-hidden
                />
                <div className="flex justify-between items-start">
                  <div
                    className="w-11 h-11 flex items-center justify-center border transition-all duration-300 group-hover:border-violet/60 rounded-2xl group-hover:shadow-sm"
                    style={{
                      borderColor: 'var(--color-border)',
                      borderRadius: '16px' }}
                  >
                    <s.Icon
                      className="w-4 h-4 transition-colors duration-300 group-hover:text-violet"
                      style={{ color: 'var(--color-muted)' }}
                    />
                  </div>
                  <span
                    className="font-display font-black text-2xl sm:text-3xl leading-none transition-colors duration-500 group-hover:text-violet"
                    style={{
                      color: 'var(--color-dead)',
                      opacity: 0.6,
                      fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="font-display font-bold mt-3 sm:mt-4 leading-tight"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    color: 'var(--color-foreground)',
                    lineHeight: 0.92 }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-sm mt-1.5 sm:mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none"
                  style={{
                    color: 'var(--color-muted)',
                    lineHeight: 1.72 }}
                >
                  {s.tagline}
                </p>
                <ul className="mt-3 grid gap-2">
                  {s.features.slice(0, 2).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                      style={{ color: 'var(--color-dead)' }}
                    >
                      <span style={{ color: 'var(--color-violet)', marginTop: '2px' }}>•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className="font-mono text-[10px] sm:text-xs mt-2 sm:mt-3"
                  style={{ color: 'var(--color-violet)' }}
                >
                  {s.priceLabel}
                </p>
                <span
                  className="text-sm mt-3 inline-flex items-center gap-1 min-h-[44px] transition-colors duration-200 group-hover:text-violet"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Explore <span className="transition-transform duration-300 inline-block group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionLabel() {
  return (
    <div>
      <span
        className="font-mono uppercase block mb-2"
        style={{
          fontSize: '0.6875rem',
          color: 'var(--color-violet)',
          letterSpacing: '0.22em' }}
      >
        WHAT WE DO
      </span>
      <h2
        className="font-display font-black leading-[0.92] tracking-normal"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 3rem)',
          color: 'var(--color-foreground)',
          lineHeight: 0.92 }}
      >
        Services That<br />Scale With You
      </h2>
    </div>
  )
}
