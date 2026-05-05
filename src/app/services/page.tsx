import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd }   from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schemas'
import { ServicesGrid } from '@/components/services/ServicesGrid'
import { services } from '@/lib/data/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    "Explore MTA's premium digital infrastructure services: Web Development, Cybersecurity, AI Automation, and more.",
}

const heroStats = [
  { value: '7', label: 'Service tracks' },
  { value: 'Mobile-first', label: 'Layouts by default' },
  { value: 'Transparent', label: 'Pricing & contracts' },
]

const governanceChips = [
  'Scope-first planning',
  'Contract-governed delivery',
  'Low-motion defaults',
]

function buildContactHref() {
  const params = new URLSearchParams()
  params.set('service', 'Other')
  params.set('budget', 'Not Sure')
  params.set('timeline', 'Flexible')
  params.set(
    'message',
    [
      'I found MTA through the Services page and would like help choosing the right service.',
      '',
      'Please review my needs and recommend the best starting point for my project.',
    ].join('\n')
  )

  return `/contact?${params.toString()}`
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }])} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden border-b border-border grain" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="absolute inset-0 bg-line-grid opacity-[0.16] pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-8%', top: '10%',
            width: 'clamp(300px, 40vw, 700px)', height: 'clamp(300px, 40vw, 700px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,26,26,0.09) 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 container-site grid min-h-[68svh] gap-10 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-32">
          <div className="flex flex-col">
            <nav
              className="flex items-center gap-2 font-mono mb-10 lg:mb-14"
              style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
            >
              <Link href="/" className="hover-foreground transition-colors">HOME</Link>
              <span>/</span>
              <span style={{ color: 'var(--color-muted)' }}>SERVICES</span>
            </nav>

            <span className="font-mono uppercase block mb-5" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.24em' }}>
              ✦ WHAT WE DO
            </span>

            <div className="flex flex-col" style={{ gap: '0.02em' }}>
              <h1 className="font-display font-black leading-none tracking-normal uppercase" style={{ fontSize: 'clamp(2.9rem, 8.5vw, 8.8rem)', color: 'var(--color-foreground)' }}>
                SERVICES
              </h1>
              <h1 className="font-display font-black leading-none tracking-normal uppercase" style={{ fontSize: 'clamp(2.9rem, 8.5vw, 8.8rem)', color: 'var(--color-violet)' }}>
                THAT SCALE.
              </h1>
            </div>

            <p className="mt-7 max-w-[56ch]" style={{ fontSize: '16px', lineHeight: 1.72, color: 'var(--color-muted)' }}>
              End-to-end digital infrastructure for Indian businesses. We build, secure, and automate
              your operations so you can focus on growth without hidden scope or bloated handoffs.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={buildContactHref()}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-display text-[14px] font-black transition-all duration-300"
                style={{ backgroundColor: '#6B1A1A', color: '#FFFFFF' }}
                data-cursor="pointer"
              >
                Start a Project <span>→</span>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 font-display text-[14px] font-black transition-all duration-300"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-violet-light)' }}
                data-cursor="pointer"
              >
                View Pricing <span>→</span>
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[20px] border border-border bg-[rgba(255,255,255,0.02)] px-4 py-4"
                >
                  <p className="font-display text-[15px] font-semibold leading-tight" style={{ color: 'var(--color-foreground)' }}>
                    {item.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--color-dead)' }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-border bg-card p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:p-6">
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-mono uppercase text-[11px] tracking-[0.18em]" style={{ color: 'var(--color-violet-light)' }}>
                  Service stack
                </p>
                <h2 className="mt-2 font-display text-[1.25rem] font-black leading-tight" style={{ color: 'var(--color-foreground)' }}>
                  Designed for clear scopes and smooth handoff.
                </h2>
              </div>
              <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--color-violet-light)' }}>
                7 tracks
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {services.slice(0, 4).map((service) => (
                <div key={service.slug} className="rounded-2xl border border-border bg-surface px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-[15px] font-semibold leading-tight" style={{ color: 'var(--color-foreground)' }}>
                        {service.name}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                        {service.tagline}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--color-violet-light)' }}>
                      {service.priceLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-[rgba(107,26,26,0.04)] px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--color-violet-light)' }}>
                  Optimized
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  Low-motion defaults for touch devices and reduced-motion preferences.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-[rgba(107,26,26,0.04)] px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--color-violet-light)' }}>
                  Responsive
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  Layouts adapt from phones to large desktops without hidden content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID (client component with animations) ── */}
      <ServicesGrid />

      {/* ── GOVERNANCE CALLOUT ───────────────────────────── */}
      <section className="border-t border-border" style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <div className="container-site">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[30px] border border-[rgba(107,26,26,0.18)] bg-[rgba(107,26,26,0.04)] p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: 'var(--color-violet-light)' }}>Contract-Governed Delivery</p>
              <h2 className="font-display font-black mb-3" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', color: 'var(--color-foreground)' }}>
                Every service is mapped to legal controls before execution.
              </h2>
              <p className="text-sm leading-relaxed max-w-[62ch]" style={{ color: 'var(--color-muted)' }}>
                Scope, consent, and approval flow are documented up front so your team always knows what is included,
                what is billed separately, and how delivery will be measured.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {governanceChips.map((chip) => (
                  <span key={chip} className="rounded-full border border-border bg-card px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--color-dead)' }}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Link
                href="/legal"
                className="rounded-[28px] border border-border bg-card p-6 transition-colors hover:border-violet/40 hover:bg-[rgba(107,26,26,0.04)]"
                data-cursor="pointer"
              >
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: 'var(--color-violet-light)' }}>Legal Hub →</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  Review agreements, privacy policy, and trust center documentation.
                </p>
              </Link>

              <Link
                href="/research"
                className="rounded-[28px] border border-border bg-card p-6 transition-colors hover:border-violet/40 hover:bg-[rgba(107,26,26,0.04)]"
                data-cursor="pointer"
              >
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: 'var(--color-violet-light)' }}>Research Pipeline →</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  Explore the same evidence base we use to shape services, pricing, and delivery.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


