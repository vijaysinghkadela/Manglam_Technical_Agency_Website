'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '@/lib/data/testimonials'
import { SectionLabel } from '@/components/ui/SectionLabel'

function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const current = testimonials[index]

  const prev = useCallback(() => setIndex(i => (i === 0 ? testimonials.length - 1 : i - 1)), [])
  const next = useCallback(() => setIndex(i => (i === testimonials.length - 1 ? 0 : i + 1)), [])

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next])

  return (
    <section className="section relative overflow-hidden" onMouseEnter={() => clearInterval(timerRef.current)} onMouseLeave={() => { timerRef.current = setInterval(next, 5000) }}>
      <div className="container-site flex flex-col items-center">
        <div className="text-center mb-12 sm:mb-14 lg:mb-24 px-4">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display font-black leading-[0.92] text-[clamp(1.5rem,5vw,3rem)] text-foreground">
            Client Voices
          </h2>
        </div>

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.span
            initial={false}
            whileInView={{ scale: 1 }}
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
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-col items-center text-center rounded-[28px] border border-border bg-card px-6 sm:px-10 py-10 sm:py-14 shadow-[0_18px_70px_rgba(0,0,0,0.12)] w-full"
            >
              <blockquote className="font-display font-bold leading-snug italic mb-8 sm:mb-10 select-text text-[clamp(1rem,4vw,1.75rem)] text-foreground max-w-[640px] [line-height:1.6]">
                {current.quote}
              </blockquote>

              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-10 sm:w-12 h-10 sm:h-12 shrink-0 flex items-center justify-center text-xs sm:text-sm font-display font-bold"
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

            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i} role="tab" aria-selected={i === index} aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === index ? '24px' : '6px', backgroundColor: i === index ? 'var(--color-violet)' : 'var(--color-border)' }}
                  data-cursor="pointer"
                />
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
