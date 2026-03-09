'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '@/lib/data/testimonials'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const AUTO_ADVANCE_MS = 5000

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const isHovered = useRef(false)
  const current = testimonials[index]

  const prev = useCallback(() => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1)), [])
  const next = useCallback(() => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1)), [])

  // Keyboard navigation
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [prev, next])

  // Auto-advance (pauses on hover)
  useEffect(() => {
    const id = setInterval(() => {
      if (!isHovered.current) next()
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [next])

  return (
    <section
      style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(64px, 10vw, 112px) 0' }}
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
    >
      <div className="container-site flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center mb-12 lg:mb-20"
        >
          <span
            className="font-mono uppercase block mb-3"
            style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
          >
            TESTIMONIALS
          </span>
          <h2
            className="font-display font-black tracking-tight leading-[0.92]"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: 'var(--color-foreground)' }}
          >
            Client Voices
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">

          {/* Decorative quote — animated spring scale */}
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
            className="font-display font-black leading-none select-none mb-6 lg:mb-8"
            style={{ fontSize: 'clamp(64px, 10vw, 120px)', color: 'rgba(124,58,237,0.18)', lineHeight: 1 }}
            aria-hidden
          >
            &ldquo;
          </motion.span>

          {/* Animated testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-col items-center text-center"
            >
              <blockquote
                className="font-display font-bold leading-snug italic mb-10"
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
                  color: 'var(--color-foreground)',
                  maxWidth: '640px',
                }}
              >
                {current.quote}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 shrink-0 flex items-center justify-center text-sm font-display font-bold"
                  style={{
                    backgroundColor: 'rgba(124,58,237,0.10)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    color: 'var(--color-violet)',
                  }}
                >
                  {current.initials}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    {current.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-5 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 border flex items-center justify-center transition-all duration-200 hover:border-violet/50 hover:bg-violet/10"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
              aria-label="Previous testimonial"
              data-cursor="pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? '24px' : '6px',
                    backgroundColor: i === index ? 'var(--color-violet)' : 'var(--color-border)',
                  }}
                  data-cursor="pointer"
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border flex items-center justify-center transition-all duration-200 hover:border-violet/50 hover:bg-violet/10"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
              aria-label="Next testimonial"
              data-cursor="pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Counter */}
          <span className="mt-4 text-xs font-mono" style={{ color: 'var(--color-dead)' }}>
            {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>

        </div>
      </div>
    </section>
  )
}
