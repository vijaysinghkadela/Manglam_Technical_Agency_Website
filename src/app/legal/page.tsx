import type { Metadata } from 'next'
import Link from 'next/link'
import {
  agreementApplicabilityMatrix,
  agreementSummaries,
  documentRegistry,
  policyDocuments,
} from '@/lib/data/legal'
import { DocumentRequestForm } from '@/components/legal/DocumentRequestForm'
import { LegalContent } from '@/components/legal/LegalContent'
import { TextReveal } from '@/components/ui/TextReveal'

export const metadata: Metadata = {
  title: 'Legal Hub',
  description:
    'Agreement summaries, service applicability matrix, and controlled request workflow for legal templates used by MTA.',
}

export default function LegalHubPage() {
  const requestableDocs = documentRegistry.filter((item) => item.requestable)
  const visibleAgreements = agreementSummaries.filter((agreement) => agreement.visibility !== 'internal')

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
            right: '-8%',
            top: '10%',
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
            <span style={{ color: 'var(--color-muted)' }}>LEGAL</span>
          </nav>

          {/* Headline + Document Stack */}
          <div className="flex-1 flex flex-col justify-center lg:grid lg:grid-cols-[1fr_auto] lg:items-center gap-12">

            {/* Left: headline */}
            <div>
              <span
                className="font-mono uppercase block mb-6 animate-fade-up stagger-1"
                style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
              >
                ✦ LEGAL &amp; COMPLIANCE
              </span>

              <div className="flex flex-col" style={{ gap: '0.02em' }}>
                <TextReveal
                  text="LEGAL"
                  as="h1"
                  delay={0.1}
                  className="font-display font-black leading-none tracking-tighter uppercase"
                  style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', color: 'var(--color-foreground)' }}
                />
                <TextReveal
                  text="HUB."
                  as="h1"
                  delay={0.2}
                  className="font-display font-black leading-none tracking-tighter uppercase"
                  style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', color: 'var(--color-violet)' }}
                />
              </div>

              <p
                className="mt-8 lg:mt-10 animate-fade-up stagger-4"
                style={{ fontSize: '16px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '520px' }}
              >
                Agreement summaries, applicability matrix, and request-only template access designed for client-safe transparency.
              </p>
            </div>

            {/* Right: Floating Document Stack (desktop only) */}
            <div
              className="hidden lg:block relative shrink-0 animate-fade-up stagger-3"
              style={{ width: '220px', height: '280px' }}
            >
              {/* Card 3 — back (MTA-FC, restricted) */}
              <div
                className="absolute inset-0"
                style={{
                  transform: 'rotate(-9deg) translate(-18px, 22px)',
                  border: '1px solid rgba(124,58,237,0.15)',
                  backgroundColor: 'rgba(124,58,237,0.03)',
                }}
              >
                <div className="p-4">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '9px', color: 'rgba(124,58,237,0.25)', letterSpacing: '0.18em' }}
                  >
                    MTA-FC
                  </span>
                  <div
                    className="mt-2 font-mono uppercase"
                    style={{ fontSize: '7px', color: 'rgba(124,58,237,0.18)', letterSpacing: '0.14em' }}
                  >
                    RESTRICTED
                  </div>
                </div>
                {[40, 52, 35, 60, 48].map((w, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-sm"
                    style={{
                      left: '16px', top: `${76 + idx * 18}px`,
                      width: `${w}%`, height: '2px',
                      backgroundColor: 'rgba(124,58,237,0.08)',
                    }}
                  />
                ))}
              </div>

              {/* Card 2 — middle (MTA-DPA) */}
              <div
                className="absolute inset-0"
                style={{
                  transform: 'rotate(-3.5deg) translate(6px, 10px)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  backgroundColor: 'rgba(124,58,237,0.05)',
                }}
              >
                <div className="p-4">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '9px', color: 'rgba(124,58,237,0.45)', letterSpacing: '0.18em' }}
                  >
                    MTA-DPA
                  </span>
                </div>
                {[55, 65, 45, 70, 58, 42].map((w, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-sm"
                    style={{
                      left: '16px', top: `${60 + idx * 16}px`,
                      width: `${w}%`, height: '2px',
                      backgroundColor: 'rgba(124,58,237,0.13)',
                    }}
                  />
                ))}
              </div>

              {/* Card 1 — front (MTA-MSA) */}
              <div
                className="absolute inset-0"
                style={{
                  transform: 'rotate(2.5deg)',
                  border: '1px solid rgba(124,58,237,0.4)',
                  backgroundColor: 'rgba(124,58,237,0.07)',
                }}
              >
                <div className="p-4">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '9px', color: 'var(--color-violet-light)', letterSpacing: '0.18em' }}
                  >
                    MTA-MSA
                  </span>
                  <div
                    className="mt-2 w-full"
                    style={{ height: '1px', backgroundColor: 'rgba(124,58,237,0.2)' }}
                  />
                </div>
                {[62, 78, 52, 84, 66, 58, 74].map((w, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-sm"
                    style={{
                      left: '16px', top: `${60 + idx * 22}px`,
                      width: `${w}%`, height: '2px',
                      backgroundColor: 'rgba(124,58,237,0.18)',
                    }}
                  />
                ))}
                {/* Footer */}
                <div
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
                  style={{ borderTop: '1px solid rgba(124,58,237,0.18)', paddingTop: '8px' }}
                >
                  <span
                    className="font-mono"
                    style={{ fontSize: '8px', color: 'rgba(124,58,237,0.4)', letterSpacing: '0.12em' }}
                  >
                    PUBLIC
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: '8px', color: 'rgba(124,58,237,0.4)' }}
                  >
                    ✦ MTA
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom stats + scroll indicator */}
          <div className="flex items-end justify-between mt-10 lg:mt-14">
            <div className="flex items-center gap-8 flex-wrap">
              {[
                { value: `${visibleAgreements.length}`, label: 'Agreements' },
                { value: `${requestableDocs.length}`, label: 'Requestable Templates' },
                { value: `${policyDocuments.length}`, label: 'Policy Docs' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span
                    className="font-display font-black"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: 'var(--color-foreground)' }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
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

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(64px, 10vw, 120px) 0' }}
      >
        <div className="container-site grid grid-cols-1 lg:grid-cols-[180px_1fr_360px] gap-10 lg:gap-12 xl:gap-16 items-start">

          {/* ── TOC Sidebar (desktop only) ── */}
          <aside className="hidden lg:block lg:sticky lg:top-32 self-start">
            <span
              className="font-mono uppercase block mb-6"
              style={{ fontSize: '9px', color: 'var(--color-dead)', letterSpacing: '0.22em' }}
            >
              Contents
            </span>
            <nav className="flex flex-col">
              {[
                { href: '#agreements', label: 'Agreements', num: '01' },
                { href: '#matrix', label: 'Service Matrix', num: '02' },
                { href: '#policies', label: 'Policies', num: '03' },
              ].map(({ href, label, num }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-3 py-2.5 font-mono transition-colors hover:text-violet"
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-muted)',
                    letterSpacing: '0.06em',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <span style={{ color: 'var(--color-dead)', fontSize: '9px', letterSpacing: '0.1em' }}>{num}</span>
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
              <a
                href="#request"
                className="font-mono uppercase transition-colors hover:text-violet"
                style={{ fontSize: '10px', color: 'var(--color-violet-light)', letterSpacing: '0.18em', display: 'block' }}
              >
                Request Template →
              </a>
            </div>
          </aside>

          {/* ── Content ── */}
          <LegalContent
            agreements={visibleAgreements}
            matrix={agreementApplicabilityMatrix}
            policies={policyDocuments}
          />

          {/* ── Sticky request form ── */}
          <aside id="request" className="lg:sticky lg:top-32 self-start">
            <DocumentRequestForm
              docs={requestableDocs.map(({ id, name, notes }) => ({ id, name, notes }))}
            />
          </aside>
        </div>
      </section>
    </main>
  )
}
