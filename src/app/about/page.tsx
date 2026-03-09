import Link from 'next/link'
import { TextReveal } from '@/components/ui/TextReveal'
import { AboutContent } from '@/components/about/AboutContent'

export const metadata = {
  title: 'About — Manglam Technical Agency',
  description: 'Manglam Technical Agency is a full-service technical agency based in Nagaur, Rajasthan. A lean team of specialists delivering AI automation, cybersecurity, web development, and digital operations for Indian businesses.',
}

const STATS = [
  { value: '3–4', label: 'Specialists' },
  { value: '2021', label: 'Founded' },
  { value: '6', label: 'Practice Areas' },
  { value: '∞', label: 'Accountability' },
]

const SERVICE_TAGS = ['AI', 'Security', 'Web', 'SMM', 'Branding', 'Content']

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas)' }}>

      {/* ── HERO — Full viewport ─────────────────────────── */}
      <section
        className="relative w-full min-h-screen flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-10%',
            top: '15%',
            width: 'clamp(300px, 40vw, 700px)',
            height: 'clamp(300px, 40vw, 700px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-28 lg:pt-36 pb-12 lg:pb-16">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 font-mono mb-14 lg:mb-20 animate-fade-up"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover-foreground transition-colors">HOME</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>ABOUT</span>
          </nav>

          {/* Main headline + Agency Card */}
          <div className="flex-1 flex flex-col justify-center lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">

            {/* Left: headline + description */}
            <div>
              <span
                className="font-mono uppercase block mb-6 animate-fade-up stagger-1"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                ✦ MANGLAM TECHNICAL AGENCY
              </span>
              <div className="flex flex-col" style={{ gap: '0.02em' }}>
                <TextReveal
                  text="EXCELLENCE"
                  as="h1"
                  delay={0.1}
                  className="font-display font-black leading-none tracking-tighter uppercase"
                  style={{ fontSize: 'clamp(2.2rem, 7.5vw, 8rem)', color: 'var(--color-foreground)' }}
                />
                <TextReveal
                  text="IN TECHNOLOGY."
                  as="h1"
                  delay={0.22}
                  className="font-display font-black leading-none tracking-tighter uppercase"
                  style={{ fontSize: 'clamp(2.2rem, 7.5vw, 8rem)', color: 'var(--color-violet)' }}
                />
                <TextReveal
                  text="Delivered by Specialists Who Actually Do the Work."
                  as="h1"
                  delay={0.38}
                  className="font-display font-black leading-none tracking-tighter"
                  style={{
                    fontSize: 'clamp(0.9rem, 2.5vw, 2.5rem)',
                    color: 'var(--color-muted)',
                    paddingLeft: 'clamp(4px, 0.8vw, 14px)',
                    fontStyle: 'italic',
                  }}
                />
              </div>

              <p
                className="mt-8 lg:mt-10 animate-fade-up stagger-4"
                style={{
                  fontSize: '16px',
                  lineHeight: 1.72,
                  color: 'var(--color-muted)',
                  maxWidth: '540px',
                }}
              >
                Manglam Technical Agency (MTA) is a full-service technical and creative agency
                based in Nagaur, Rajasthan. We exist for one reason: to give businesses access
                to enterprise-grade technical capabilities without the overhead, bureaucracy, or
                impersonal service of a large firm.
              </p>
            </div>

            {/* Right: Floating Agency Card (desktop only) */}
            <div
              className="hidden lg:flex flex-col shrink-0 animate-fade-up stagger-3"
              style={{
                width: '220px',
                border: '1px solid rgba(124,58,237,0.35)',
                backgroundColor: 'rgba(124,58,237,0.04)',
              }}
            >
              {/* Card header */}
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{ borderBottom: '1px solid rgba(124,58,237,0.18)' }}
              >
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '9px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
                >
                  ✦ MTA
                </span>
                <span
                  className="font-mono"
                  style={{ fontSize: '8px', color: 'rgba(124,58,237,0.4)', letterSpacing: '0.1em' }}
                >
                  PUBLIC
                </span>
              </div>

              {/* Stats */}
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="px-5 py-4 flex items-baseline justify-between"
                  style={{ borderBottom: i < STATS.length - 1 ? '1px solid rgba(124,58,237,0.12)' : 'none' }}
                >
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '9px', color: 'rgba(124,58,237,0.4)', letterSpacing: '0.14em' }}
                  >
                    {stat.label}
                  </span>
                  <span
                    className="font-display font-black"
                    style={{ fontSize: '1.15rem', color: 'var(--color-violet-light)' }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}

              {/* Service tags */}
              <div
                className="px-5 py-4 flex flex-wrap gap-1.5"
                style={{ borderTop: '1px solid rgba(124,58,237,0.18)' }}
              >
                {SERVICE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono uppercase"
                    style={{
                      fontSize: '8px',
                      color: 'rgba(124,58,237,0.5)',
                      letterSpacing: '0.14em',
                      border: '1px solid rgba(124,58,237,0.2)',
                      padding: '2px 6px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ borderTop: '1px solid rgba(124,58,237,0.18)' }}
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${10 + (i % 3) * 6}px`,
                      backgroundColor: `rgba(124,58,237,${0.12 + i * 0.04})`,
                    }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between mt-10 lg:mt-14">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up stagger-4">
              <span
                className="font-mono uppercase"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                ✦ NAGAUR, RAJASTHAN
              </span>
              <span
                className="font-mono"
                style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.14em' }}
              >
                Est. 2021 · 6 Practice Areas · 3–4 Specialists
              </span>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-2">
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: '10px',
                  color: 'var(--color-dead)',
                  letterSpacing: '0.22em',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                Scroll
              </span>
              <div style={{ width: '1px', height: '48px', backgroundColor: 'var(--color-border)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Client-side sections ─────────────────────────── */}
      <AboutContent />
    </main>
  )
}
