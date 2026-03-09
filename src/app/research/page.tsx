import type { Metadata } from 'next'
import Link from 'next/link'
import { ResearchPageContent } from '@/components/research/ResearchPageContent'
import { researchMeta } from '@/lib/data/research'
import { TextReveal } from '@/components/ui/TextReveal'

export const metadata: Metadata = {
  title: 'Research: Collaboration, Delivery Pipeline & Legal Framework',
  description:
    'Public-safe research brief covering MTA collaboration model, lead-to-delivery pipeline, legal framework, and delivery risk controls.',
}

export default function ResearchPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>

      {/* ── HERO — Full viewport ─────────────────────────── */}
      <section
        className="relative w-full min-h-screen flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            left: '-10%',
            top: '20%',
            width: 'clamp(300px, 40vw, 700px)',
            height: 'clamp(300px, 40vw, 700px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-28 lg:pt-36 pb-12 lg:pb-16">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 font-mono mb-14 lg:mb-24 animate-fade-up stagger-1"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover-foreground transition-colors">HOME</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>RESEARCH</span>
          </nav>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <span
              className="font-mono uppercase block mb-6 animate-fade-up stagger-1"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ INTERNAL RESEARCH (PUBLIC EXCERPT)
            </span>

            <div className="flex flex-col" style={{ gap: '0.02em' }}>
              <TextReveal
                text="CLIENT"
                as="h1"
                delay={0.1}
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(2.5rem, 7.5vw, 7.5rem)', color: 'var(--color-foreground)' }}
              />
              <TextReveal
                text="COLLABORATION"
                as="h1"
                delay={0.2}
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(2.5rem, 7.5vw, 7.5rem)', color: 'var(--color-foreground)' }}
              />
              <TextReveal
                text="& DELIVERY"
                as="h1"
                delay={0.3}
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(2.5rem, 7.5vw, 7.5rem)', color: 'var(--color-violet)' }}
              />
              <TextReveal
                text="FRAMEWORK."
                as="h1"
                delay={0.4}
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(2.5rem, 7.5vw, 7.5rem)', color: 'var(--color-violet)' }}
              />
            </div>

            <p
              className="mt-8 lg:mt-10 animate-fade-up stagger-4"
              style={{ fontSize: '16px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '520px' }}
            >
              A structured view of how MTA qualifies leads, executes delivery, enforces legal controls, and protects confidentiality in every engagement.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between mt-10 lg:mt-14">
            <div className="flex flex-col gap-1 font-mono" style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.14em' }}>
              <span>{researchMeta.classification}</span>
              <span>{researchMeta.version} · {researchMeta.basis}</span>
              <span>{researchMeta.jurisdiction}</span>
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

      <ResearchPageContent />
    </main>
  )
}
