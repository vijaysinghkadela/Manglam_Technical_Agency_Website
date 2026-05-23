import type { Metadata } from 'next'
import Link from 'next/link'
import { TextReveal } from '@/components/ui/TextReveal'
import { AboutContent } from '@/components/about/AboutContent'
import { FAQSection } from '@/components/ui/FAQSection'
import { aboutFaqs } from '@/lib/data/faq'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'About — Manglam Technical Agency',
  description: 'Manglam Technical Agency is a full-service technical agency based in Bikaner, Rajasthan. A lean team of specialists delivering AI automation, cybersecurity, web development, and digital operations for Indian businesses.',
}

const STATS = [
  { value: '2', label: 'Core Team' },
  { value: '2025', label: 'Udyam Registered' },
  { value: '6', label: 'Practice Areas' },
  { value: '∞', label: 'Accountability' },
]

const SERVICE_TAGS = ['AI', 'Security', 'Web', 'SMM', 'Branding', 'Content']

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }])} />
      <JsonLd schema={webPageSchema({ url: '/about', title: 'About Manglam Technical Agency', description: 'Full-service technical agency based in Bikaner, Rajasthan. AI automation, cybersecurity, web development, and digital operations for Indian businesses.' })} />

      {/* ── HERO — Full viewport ─────────────────────────── */}
      <section
        className="relative w-full min-h-[92svh] flex flex-col overflow-hidden grain"
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
            background: 'radial-gradient(circle, rgba(var(--color-accent-rgb),0.07) 0%, transparent 68%)' }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-24 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 lg:pb-20">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 font-mono mb-12 lg:mb-20 animate-fade-up"
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
                className="font-mono uppercase block mb-8 animate-fade-up stagger-1"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                ✦ MANGLAM TECHNICAL AGENCY
              </span>
              <div className="flex flex-col" style={{ gap: '0.25rem' }}>
                <TextReveal
                  text="EXCELLENCE"
                  as="h1"
                  delay={0.1}
                  className="font-display font-black leading-none tracking-normal uppercase"
                  style={{ fontSize: 'clamp(2.2rem, 5.5vw, 6rem)', color: 'var(--color-foreground)' }}
                />
                <TextReveal
                  text="IN TECHNOLOGY."
                  as="h1"
                  delay={0.22}
                  className="font-display font-black leading-none tracking-normal uppercase"
                  style={{ fontSize: 'clamp(2.2rem, 5.5vw, 6rem)', color: 'var(--color-violet)' }}
                />
                <TextReveal
                  text="Delivered by Specialists Who Actually Do the Work."
                  as="h1"
                  delay={0.38}
                  className="font-display font-black leading-none tracking-normal"
                  style={{
                    fontSize: 'clamp(0.9rem, 2.5vw, 2.5rem)',
                    color: 'var(--color-muted)',
                    paddingLeft: 'clamp(4px, 0.8vw, 14px)',
                    fontStyle: 'italic' }}
                />
              </div>

              <p
                className="mt-10 lg:mt-14 animate-fade-up stagger-4"
                style={{
                  fontSize: '16px',
                  lineHeight: 1.72,
                  color: 'var(--color-muted)',
                  maxWidth: '540px' }}
              >
                Manglam Technical Agency (MTA) is a technical and creative agency
                based in Bikaner, Rajasthan. We work directly with clients — no account managers,
                no layers of approval, just the people building your solution.
              </p>
            </div>

            {/* Right: Floating Agency Card (desktop only) */}
            <div
              className="hidden lg:flex flex-col shrink-0 animate-fade-up stagger-3 relative"
              style={{
                width: '300px',
                border: '2px solid rgba(var(--color-accent-rgb),0.35)',
                backgroundColor: 'rgba(var(--color-accent-rgb),0.06)',
                backdropFilter: 'blur(16px)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: `
                  0 25px 50px -12px rgba(var(--color-accent-rgb),0.25),
                  0 0 0 1px rgba(var(--color-accent-rgb),0.1),
                  inset 0 1px 0 rgba(var(--color-accent-rgb), 0.06)
                ` }}
            >
              {/* Animated glow border effect */}
              <div
                className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb),0.1) 0%, transparent 50%, rgba(var(--color-accent-rgb),0.05) 100%)' }}
              />

              {/* Top glow line */}
              <div
                className="absolute top-0 left-4 right-4 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(var(--color-accent-rgb),0.6), transparent)',
                  boxShadow: '0 0 20px rgba(var(--color-accent-rgb),0.4)' }}
              />

              {/* Card header */}
              <div
                className="px-6 py-5 flex items-center justify-between relative"
                style={{
                  borderBottom: '2px solid rgba(var(--color-accent-rgb),0.15)',
                  background: 'linear-gradient(180deg, rgba(var(--color-accent-rgb),0.1) 0%, rgba(var(--color-accent-rgb),0.02) 100%)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{
                      backgroundColor: 'var(--color-violet)',
                      boxShadow: '0 0 12px rgba(var(--color-accent-rgb),0.8), 0 0 24px rgba(var(--color-accent-rgb),0.4)' }}
                  />
                  <span
                    className="font-display font-bold uppercase tracking-wider"
                    style={{ fontSize: '14px', color: 'var(--color-violet)', letterSpacing: '0.12em' }}
                  >
                    MTA
                  </span>
                </div>
                <span
                  className="font-mono px-3 py-1 rounded-full font-semibold"
                  style={{
                    fontSize: '9px',
                    color: 'var(--color-violet)',
                    letterSpacing: '0.12em',
                    backgroundColor: 'rgba(var(--color-accent-rgb),0.12)',
                    border: '1px solid rgba(var(--color-accent-rgb),0.25)' }}
                >
                  PUBLIC
                </span>
              </div>

              {/* Stats */}
              <div className="px-3 py-4 relative">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="px-4 py-3 flex items-center justify-between rounded-xl transition-all duration-200 hover:bg-white/10"
                    style={{
                      borderBottom: i < STATS.length - 1 ? '1px solid rgba(var(--color-accent-rgb),0.08)' : 'none' }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono text-[11px] w-7 h-7 flex items-center justify-center rounded-lg font-bold"
                        style={{
                          backgroundColor: 'rgba(var(--color-accent-rgb),0.12)',
                          color: 'var(--color-violet)',
                          border: '1px solid rgba(var(--color-accent-rgb),0.2)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="font-mono uppercase font-medium"
                        style={{ fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.06em' }}
                      >
                        {stat.label}
                      </span>
                    </div>
                    <span
                      className="font-display font-black"
                      style={{
                        fontSize: '1.35rem',
                        color: 'var(--color-violet)',
                        textShadow: '0 0 30px rgba(var(--color-accent-rgb),0.4)' }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Service tags */}
              <div
                className="px-5 py-4"
                style={{
                  borderTop: '2px solid rgba(var(--color-accent-rgb),0.12)',
                  backgroundColor: 'rgba(var(--color-accent-rgb),0.04)' }}
              >
                <div className="flex flex-wrap gap-2.5">
                  {SERVICE_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono uppercase transition-all duration-200 hover:scale-110 cursor-default"
                      style={{
                        fontSize: '10px',
                        color: 'var(--color-violet)',
                        letterSpacing: '0.06em',
                        backgroundColor: 'rgba(var(--color-accent-rgb),0.1)',
                        border: '1px solid rgba(var(--color-accent-rgb),0.25)',
                        padding: '4px 10px',
                        borderRadius: '6px' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer - Activity bars */}
              <div
                className="px-5 py-4 flex items-center gap-2"
                style={{
                  borderTop: '2px solid rgba(var(--color-accent-rgb),0.12)',
                  backgroundColor: 'rgba(var(--color-accent-rgb),0.06)' }}
              >
                <span
                  className="font-mono mr-3 font-semibold"
                  style={{ fontSize: '9px', color: 'var(--color-violet)', letterSpacing: '0.1em' }}
                >
                  ACTIVITY
                </span>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded transition-all duration-300 hover:opacity-100"
                    style={{
                      height: `${16 + (i % 3) * 10}px`,
                      backgroundColor: `rgba(var(--color-accent-rgb),${0.2 + i * 0.08})`,
                      borderRadius: '3px',
                      opacity: 0.8 + (i * 0.05) }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between mt-12 lg:mt-16">
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
                Udyam Registered 2025 · 6 Practice Areas · 2 Core Team Members
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
                  transform: 'rotate(180deg)' }}
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
      <FAQSection items={aboutFaqs} title="Common Questions" />
    </main>
  )
}



