import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/data/projects'
import { PortfolioContent } from '@/components/portfolio/PortfolioContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    "From NGO portals to e-commerce platforms and security audits. Browse MTA's recent client deliveries and case studies.",
}

const liveCount   = projects.filter(p => p.status === 'live').length
const comingCount = projects.filter(p => p.status === 'coming-soon').length

export default function PortfolioPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Portfolio', url: '/portfolio' }])} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-screen flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-8%',
            top: '15%',
            width: 'clamp(320px, 44vw, 760px)',
            height: 'clamp(320px, 44vw, 760px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: '-5%',
            bottom: '15%',
            width: 'clamp(200px, 28vw, 480px)',
            height: 'clamp(200px, 28vw, 480px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-28 lg:pt-36 pb-12 lg:pb-16">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 font-mono mb-14 lg:mb-24"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover-foreground transition-colors">HOME</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>PORTFOLIO</span>
          </nav>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <span
              className="font-mono uppercase block mb-6"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ OUR WORK
            </span>

            <div className="flex flex-col" style={{ gap: '0.02em' }}>
              <h1
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', color: 'var(--color-foreground)' }}
              >
                DIGITAL
              </h1>
              <h1
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', color: 'var(--color-violet)' }}
              >
                PRODUCTS.
              </h1>
            </div>

            <p
              className="mt-8 lg:mt-10"
              style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '500px' }}
            >
              From e-commerce platforms to scalable NGO portals. Browse our recent client
              deliveries and internal case studies.
            </p>
          </div>

          {/* Bottom stats strip */}
          <div
            className="mt-12 lg:mt-16 flex flex-wrap items-center justify-between gap-6"
            style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}
          >
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display font-black"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-foreground)', lineHeight: 1 }}
                >
                  {projects.length}
                </span>
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                >
                  Projects
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display font-black"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-violet)', lineHeight: 1 }}
                >
                  {liveCount}
                </span>
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                >
                  Live
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display font-black"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-foreground)', lineHeight: 1 }}
                >
                  {comingCount}
                </span>
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
                >
                  Coming Soon
                </span>
              </div>
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

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <PortfolioContent />
    </main>
  )
}
