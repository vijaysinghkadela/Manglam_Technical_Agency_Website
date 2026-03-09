'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/lib/data/services'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]

export function ServicesGrid() {
  return (
    <section className="border-t border-border" style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(56px, 10vw, 112px) 0' }}>
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-border)' }}
        >
          {services.map((service, idx) => {
            const num = String(idx + 1).padStart(2, '0')
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (idx % 3) * 0.07, ease: EASE }}
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col h-full p-8 lg:p-10 overflow-hidden transition-colors duration-300"
                  data-cursor="link"
                  style={{ minHeight: '320px' }}
                >
                  {/* Left violet accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-violet scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="font-display font-black leading-none select-none transition-colors duration-500 group-hover:text-violet"
                      style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--color-dead)' }}
                    >
                      {num}
                    </span>
                    <div
                      className="w-10 h-10 border flex items-center justify-center transition-all duration-300 group-hover:border-violet/50"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <service.Icon
                        className="w-5 h-5 transition-colors duration-300 group-hover:text-violet-light"
                        style={{ color: 'var(--color-muted)' }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <h3
                      className="font-display font-bold leading-tight transition-colors duration-300 group-hover:text-violet-light"
                      style={{ fontSize: 'clamp(1rem, 1.4vw, 1.3rem)', color: 'var(--color-foreground)', lineHeight: 1.2 }}
                    >
                      {service.name}
                    </h3>
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                      {service.tagline}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <span className="font-mono text-label" style={{ color: 'var(--color-violet-light)' }}>
                        {service.priceLabel}
                      </span>
                      <div
                        className="w-8 h-8 border flex items-center justify-center transition-all duration-300 group-hover:bg-violet group-hover:border-violet"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <ArrowRight
                          className="w-3.5 h-3.5 transition-colors duration-300 group-hover:text-white"
                          style={{ color: 'var(--color-muted)' }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
