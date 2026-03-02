'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '@/lib/data/testimonials'

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section style={{ backgroundColor:'var(--color-surface)', padding:'112px 0' }}>
      <div className="container-site">
        <div className="mb-16">
          <span className="font-mono uppercase block mb-3" style={{ fontSize:'11px', color:'var(--color-violet-light)', letterSpacing:'0.22em' }}>
            TESTIMONIALS
          </span>
          <h2 className="font-display font-black text-white tracking-tight leading-[0.92]"
            style={{ fontSize:'clamp(28px, 4vw, 60px)' }}>
            Client Voices
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-[80px] lg:text-[120px] font-display font-black leading-none select-none absolute -top-8 left-0 lg:-left-8"
            style={{ color:'rgba(124,58,237,0.2)' }}
          >
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
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-display font-bold"
                  style={{ backgroundColor:'var(--color-card)', border:'1px solid var(--color-border)', color:'var(--color-violet)' }}
                >
                  {current.initials}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{current.name}</p>
                  <p className="text-xs" style={{ color:'var(--color-muted)' }}>{current.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-12">
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 border flex items-center justify-center transition-colors"
                style={{ borderColor:'var(--color-border)', color:'var(--color-muted)' }}
                aria-label="Previous testimonial"
                data-cursor="pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border flex items-center justify-center transition-colors"
                style={{ borderColor:'var(--color-border)', color:'var(--color-muted)' }}
                aria-label="Next testimonial"
                data-cursor="pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs font-mono" style={{ color:'var(--color-muted)' }}>
              {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
