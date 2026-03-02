'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  {
    quote:
      'They delivered our entire website in 3 weeks. The quality was beyond what we expected from any agency at this price.',
    name: 'Programme Director',
    role: 'Marut Narayan Sewa Sansthan',
    initials: 'MN',
  },
  {
    quote:
      'MTA understood our vision from day one. The cybersecurity audit they performed saved us from a major vulnerability we didn\'t know existed.',
    name: 'CTO',
    role: 'Rajasthan HealthTech Startup',
    initials: 'RH',
  },
  {
    quote:
      'Their social media automation setup cut our weekly marketing hours by 70%. We went from posting manually to a fully automated pipeline.',
    name: 'Marketing Head',
    role: 'Jaipur E-Commerce Brand',
    initials: 'JE',
  },
]

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section className="w-full bg-surface py-28">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="font-mono text-[11px] text-violet-light tracking-[0.22em] uppercase block mb-3">
            TESTIMONIALS
          </span>
          <h2 className="font-display font-black text-white tracking-tight leading-[0.92]"
            style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}>
            Client Voices
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Decorative quote mark */}
          <span className="text-[80px] lg:text-[120px] font-display font-black text-violet/20 leading-none select-none absolute -top-8 left-0 lg:-left-8">
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="relative z-10"
            >
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug italic mb-10">
                {current.quote}
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-sm font-display font-bold text-violet">
                  {current.initials}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{current.name}</p>
                  <p className="text-xs text-muted">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-colors"
                aria-label="Previous testimonial"
                data-cursor="pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-colors"
                aria-label="Next testimonial"
                data-cursor="pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs font-mono text-muted">
              {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
