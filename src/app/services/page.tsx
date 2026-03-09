import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/lib/data/services'
import { JsonLd }   from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schemas'
import { ServicesGrid } from '@/components/services/ServicesGrid'

export const metadata: Metadata = {
  title: 'Services',
  description:
    "Explore MTA's premium digital infrastructure services: Web Development, Cybersecurity, AI Automation, and more.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }])} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[55vh] flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="absolute inset-0 bg-line-grid opacity-[0.16] pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-8%', top: '10%',
            width: 'clamp(300px, 40vw, 700px)', height: 'clamp(300px, 40vw, 700px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-28 lg:pt-36 pb-16">
          <nav
            className="flex items-center gap-2 font-mono mb-14 lg:mb-20"
            style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}
          >
            <Link href="/" className="hover-foreground transition-colors">HOME</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-muted)' }}>SERVICES</span>
          </nav>

          <div className="flex-1 flex flex-col justify-center">
            <span className="font-mono uppercase block mb-5" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.24em' }}>
              ✦ WHAT WE DO
            </span>
            <div className="flex flex-col" style={{ gap: '0.02em' }}>
              <h1 className="font-display font-black leading-none tracking-tighter uppercase" style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', color: 'var(--color-foreground)' }}>
                SERVICES
              </h1>
              <h1 className="font-display font-black leading-none tracking-tighter uppercase" style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', color: 'var(--color-violet)' }}>
                THAT SCALE.
              </h1>
            </div>
            <p className="mt-8" style={{ fontSize: '16px', lineHeight: 1.72, color: 'var(--color-muted)', maxWidth: '480px' }}>
              End-to-end digital infrastructure for Indian businesses. We build, secure, and
              automate your operations so you can focus on growth.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID (client component with animations) ── */}
      <ServicesGrid services={services} />

      {/* ── GOVERNANCE CALLOUT ───────────────────────────── */}
      <section className="border-t border-border" style={{ backgroundColor: 'var(--color-surface)', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <div className="container-site">
          <div className="border border-border p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            style={{ backgroundColor: 'var(--color-canvas)' }}
          >
            <div>
              <p className="font-mono text-label tracking-[0.18em] uppercase mb-2" style={{ color: 'var(--color-violet-light)' }}>Contract-Governed Delivery</p>
              <h2 className="font-display font-black mb-2" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', color: 'var(--color-foreground)' }}>
                Every service is mapped to legal controls before execution.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Explore the agreement matrix, request workflow, and full lead-to-delivery governance model.
              </p>
            </div>
            <div className="flex items-center gap-5 text-sm shrink-0">
              <Link href="/legal"
                className="font-mono transition-colors"
                style={{ color: 'var(--color-violet-light)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-violet-light)' }}
              >Legal Hub →</Link>
              <Link href="/research"
                className="font-mono transition-colors"
                style={{ color: 'var(--color-violet-light)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-violet-light)' }}
              >Research Pipeline →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
