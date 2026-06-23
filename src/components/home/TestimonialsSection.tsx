'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { testimonials } from '@/lib/data/testimonials'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const current = testimonials[index]
  const reducedMotion = Boolean(useReducedMotion())

  const prev = useCallback(() => setIndex(i => (i === 0 ? testimonials.length - 1 : i - 1)), [])
  const next = useCallback(() => setIndex(i => (i === testimonials.length - 1 ? 0 : i + 1)), [])

  useEffect(() => {
    if (reducedMotion) return
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next, reducedMotion])

  const pauseRotation = () => clearInterval(timerRef.current)
  const resumeRotation = () => {
    if (!reducedMotion) timerRef.current = setInterval(next, 5000)
  }

  return (
    <section className="section relative overflow-hidden" onMouseEnter={pauseRotation} onMouseLeave={resumeRotation}>
      <div className="container-site flex flex-col items-center">
        <div className="text-center mb-12 sm:mb-14 lg:mb-24 px-4">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display font-black leading-[0.92] text-[clamp(1.5rem,5vw,3rem)] text-foreground">
            Client Voices
          </h2>
        </div>

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
            className="font-display font-black leading-none select-none mb-4 sm:mb-6 lg:mb-8"
            style={{ fontSize: 'clamp(48px, 10vw, 120px)', color: 'rgba(var(--color-accent-rgb),0.16)', lineHeight: 1 }}
            aria-hidden
          >
            &ldquo;
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 || info.velocity.x < -360) next()
                if (info.offset.x > 80 || info.velocity.x > 360) prev()
              }}
              className="flex w-full cursor-grab flex-col items-center rounded-lg border border-border bg-card px-6 py-10 text-center shadow-[0_18px_70px_rgba(0,0,0,0.12)] active:cursor-grabbing sm:px-10 sm:py-14"
            >
              <div className="mb-6 flex items-center gap-1" aria-label={`${current.rating ?? 5} star rating`}>
                {Array.from({ length: current.rating ?? 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-violet text-violet" />
                ))}
              </div>
              <blockquote className="font-display font-bold leading-snug italic mb-8 sm:mb-10 select-text text-[clamp(1rem,4vw,1.75rem)] text-foreground max-w-[640px] [line-height:1.6]">
                {current.quote}
              </blockquote>

              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="h-10 w-10 shrink-0 animate-[avatar-pulse_4s_ease-in-out_infinite] rounded-full flex items-center justify-center text-xs font-display font-bold sm:h-12 sm:w-12 sm:text-sm"
                  style={{
                    backgroundColor: 'rgba(var(--color-accent-rgb),0.08)',
                    border: '1px solid rgba(var(--color-accent-rgb),0.24)',
                    color: 'var(--color-violet)' }}
                >
                  {current.initials}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{current.name}</p>
                  <p className="text-xs text-muted">{current.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 grid grid-cols-[auto_auto_auto] items-center gap-4">
            <button onClick={prev} className="h-11 w-11 rounded-full border border-border flex items-center justify-center text-muted transition-all duration-200 hover:border-violet/50 hover:bg-[rgba(var(--color-accent-rgb),0.08)]" aria-label="Previous testimonial" data-cursor="pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-pressed={i === index}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="flex h-11 min-w-[44px] items-center justify-center rounded-full transition-all duration-300"
                  data-cursor="pointer"
                >
                  <span
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{ width: i === index ? '24px' : '8px', backgroundColor: i === index ? 'var(--color-violet)' : 'var(--color-border)' }}
                  />
                </button>
              ))}
            </div>

            <button onClick={next} className="h-11 w-11 rounded-full border border-border flex items-center justify-center text-muted transition-all duration-200 hover:border-violet/50 hover:bg-[rgba(var(--color-accent-rgb),0.08)]" aria-label="Next testimonial" data-cursor="pointer">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <span className="mt-4 text-xs font-mono text-dead">
            {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}

export { TestimonialsSection }
export default TestimonialsSection
