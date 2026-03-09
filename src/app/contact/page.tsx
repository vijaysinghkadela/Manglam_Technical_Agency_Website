import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactContent } from '@/components/contact/ContactContent'
import { ContactForm }    from '@/components/contact/ContactForm'
import { JsonLd }         from '@/components/seo/JsonLd'
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Contact Us — Start a Project',
  description:
    'Ready to build? Drop us a line. MTA engineers respond within 2–4 hours, Mon–Sat 9AM–7PM IST. Web development, AI automation, cybersecurity — Rajasthan.',
  keywords: ['contact digital agency Rajasthan', 'hire web developer Jaipur', 'get a quote AI automation', 'cybersecurity consultation India'],
  openGraph: {
    title:       'Contact Manglam Technical Agency — Start a Project',
    description: 'Ready to build? Engineers respond within 2–4 hours. Web development, AI automation, cybersecurity.',
    type:        'website',
  },
  alternates: { canonical: 'https://manglamtechnicalagency.com/contact' },
}

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])} />
      <JsonLd schema={webPageSchema({ url: '/contact', title: 'Contact Manglam Technical Agency', description: 'Get in touch with MTA engineers. Web development, AI automation, cybersecurity projects — Rajasthan.' })} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-screen flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />

        {/* Radial glows */}
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
            left: '-6%',
            bottom: '8%',
            width: 'clamp(200px, 30vw, 500px)',
            height: 'clamp(200px, 30vw, 500px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)',
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
            <span style={{ color: 'var(--color-muted)' }}>CONTACT</span>
          </nav>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <span
              className="font-mono uppercase block mb-6"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ GET IN TOUCH
            </span>

            <div className="flex flex-col" style={{ gap: '0.02em' }}>
              <h1
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', color: 'var(--color-foreground)' }}
              >
                START A
              </h1>
              <h1
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(2.25rem, 7vw, 7rem)', color: 'var(--color-violet)' }}
              >
                CONVERSATION.
              </h1>
            </div>

            <p
              className="mt-8 lg:mt-10"
              style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '500px' }}
            >
              Ready to build? Drop us a line. We promise a technical engineer will read it,
              not a salesperson.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 lg:mt-16" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
            <div className="flex flex-wrap items-center justify-between gap-6">

              {/* Stats strip */}
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <span
                    className="block w-2 h-2 rounded-full animate-pulse shrink-0"
                    style={{ backgroundColor: 'var(--color-violet)' }}
                  />
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.18em' }}
                  >
                    Avg Response: 2–4 hrs
                  </span>
                </div>
                <span
                  className="hidden sm:block font-mono uppercase"
                  style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.14em' }}
                >
                  Mon–Sat · 9AM–7PM IST
                </span>
                <span
                  className="hidden md:block font-mono uppercase"
                  style={{ fontSize: '11px', color: 'var(--color-dead)', letterSpacing: '0.14em' }}
                >
                  Rajasthan, India
                </span>
              </div>

              {/* Scroll indicator */}
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
        </div>
      </section>

      {/* ── CONTACT SPLIT ─────────────────────────────────────── */}
      <ContactContent formNode={<ContactForm />} />

    </main>
  )
}
