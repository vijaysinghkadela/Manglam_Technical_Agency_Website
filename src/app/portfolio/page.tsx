import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/data/projects'
import { PortfolioContent } from '@/components/portfolio/PortfolioContent'
import { FAQSection } from '@/components/ui/FAQSection'
import { portfolioFaqs } from '@/lib/data/faq'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    "Browse MTA's internal SaaS products, active builds, and project pipeline.",
  alternates: { canonical: 'https://manglamtechnicalagency.com/portfolio' },
}

const liveCount   = projects.filter(p => p.status === 'live').length
const comingCount = projects.filter(p => p.status === 'coming-soon').length

export default function PortfolioPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Portfolio', url: '/portfolio' }])} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[92svh] flex flex-col overflow-hidden grain"
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
            background: 'radial-gradient(circle, rgba(var(--color-accent-rgb),0.09) 0%, transparent 65%)' }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: '-5%',
            bottom: '15%',
            width: 'clamp(200px, 28vw, 480px)',
            height: 'clamp(200px, 28vw, 480px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(var(--color-accent-rgb),0.04) 0%, transparent 65%)' }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 page-hero-safe pb-12 sm:pb-16 lg:pb-20">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 font-mono mb-12 lg:mb-24"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover-foreground transition-colors">HOME</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>PORTFOLIO</span>
          </nav>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <span
                className="font-mono uppercase block mb-10"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ OUR WORK
            </span>

            <h1
              aria-label="Digital products"
              className="flex flex-col font-display font-black leading-none tracking-normal uppercase"
              style={{ gap: '0.5rem', fontSize: 'clamp(3.5rem, 10vw, 10rem)', color: 'var(--color-foreground)' }}
            >
              <span>Digital</span>
              <span style={{ color: 'var(--color-violet)' }}>products.</span>
            </h1>

            <p
              className="mt-12 lg:mt-16"
              style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '500px' }}
            >
              A look at products, client work, and experiments we are actively shaping.
              Some projects are live, while others are shown as in-progress work.
            </p>
          </div>

          {/* Bottom stats strip */}
          <div
            className="mt-16 lg:mt-24 flex flex-wrap items-center justify-between gap-8"
            style={{ borderTop: '1px solid var(--color-border)', paddingTop: '32px' }}
          >
            <div className="flex flex-wrap items-center gap-12">
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
                  transform: 'rotate(180deg)' }}
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
      <FAQSection items={portfolioFaqs} title="Portfolio Questions" />
    </main>
  )
}
