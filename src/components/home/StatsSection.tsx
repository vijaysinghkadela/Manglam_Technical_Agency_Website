'use client'
import { motion } from 'framer-motion'
import { ScrambleCounter } from '@/components/ui/ScrambleCounter'
import Badge from '@/components/ui/Badge'
const STATS = [
  { value: 3, suffix: '', label: 'ACTIVE CLIENTS', sub: 'tracked in Clients MOC' },
  { value: 2, suffix: '', label: 'INTERNAL SAAS PRODUCTS', sub: 'FitNexora & Fuxk_Scroll' },
  { value: 6, suffix: '', label: 'PRACTICE AREAS', sub: 'integrated service model' },
  { value: 2025, suffix: '', label: 'UDYAM REGISTERED', sub: 'UDYAM-RJ-15-0094091' },
]

const cardBg = (i: number) =>
  i % 2 === 0
    ? 'radial-gradient(145% 120% at 0% 0%, rgba(var(--color-accent-rgb),0.04) 0%, transparent 60%)'
    : 'radial-gradient(145% 120% at 100% 100%, rgba(var(--color-accent-rgb),0.04) 0%, transparent 60%)'

export function StatsSection() {
  return (
    <section
      className="section"
      style={{
        backgroundColor: 'var(--color-canvas)',
        position: 'relative' }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute top-0 right-0 w-[640px] h-[640px] opacity-[0.03]"
          style={{
            background: `radial-gradient(circle, var(--color-violet) 0%, transparent 70%)`,
            transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[480px] h-[480px] opacity-[0.03]"
          style={{
            background: `radial-gradient(circle, var(--color-violet) 0%, transparent 70%)`,
            transform: 'translate(-20%, 20%)' }}
        />
      </div>

      <div className="container-site">
        <motion.div
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span
              className="font-mono uppercase block mb-4"
              style={{
                fontSize: '0.6875rem',
                color: 'var(--color-violet)',
                letterSpacing: '0.22em' }}
            >
              PROOF OF DELIVERY
            </span>
            <h2
              className="font-display font-black tracking-normal"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                color: 'var(--color-foreground)',
                lineHeight: 0.92 }}
            >
              Small Team.<br />Real Output.
            </h2>
          </div>
          <p
            className="max-w-[440px]"
            style={{
              fontSize: '0.9375rem',
              lineHeight: 1.72,
              color: 'var(--color-muted)' }}
          >
            The numbers below are deliberately small because the delivery model is small, direct, and accountable.
            Every project is handled by specialists, not a layer of account management.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.article
              key={s.label}
              className="group relative overflow-hidden rounded-[24px] border border-border bg-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: '24px',
                backgroundImage: cardBg(i),
                transition: `all ${0.3}s cubic-bezier(${'0.16,1,0.3,1'})` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage = cardBg(i).replace('0.04', '0.08')
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage = cardBg(i)
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, var(--color-violet), transparent 80%)` }}
                aria-hidden
              />

              <span
                className="absolute -top-3 -right-3 font-display font-black select-none pointer-events-none leading-none"
                style={{
                  fontSize: 'clamp(5rem, 10vw, 7rem)',
                  color: 'var(--color-violet)',
                  opacity: 0.04 }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex h-full flex-col p-10 sm:p-12">
                <div className="flex items-start justify-between gap-4">
                  <Badge variant="brand" size="sm">
                    #{String(i + 1).padStart(2, '0')}
                  </Badge>
                </div>

                <ScrambleCounter
                  target={s.value}
                  suffix={s.suffix}
                  className="font-display font-black leading-none tracking-normal mt-8"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    lineHeight: 0.92,
                    background: `linear-gradient(135deg, var(--color-foreground) 40%, var(--color-violet) 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text' }}
                />

                <div
                  className="mt-6 h-px w-10 transition-all duration-500 group-hover:w-16"
                  style={{ backgroundColor: 'var(--color-violet)', opacity: 0.72 }}
                />

                <p
                  className="mt-5 font-mono uppercase"
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--color-muted)',
                    letterSpacing: '0.18em' }}
                >
                  {s.label}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{
                    color: 'var(--color-dead)',
                    lineHeight: 1.5 }}
                >
                  {s.sub}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
