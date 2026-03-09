import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactContent } from '@/components/contact/ContactContent'
import { ContactForm }    from '@/components/contact/ContactForm'
import { JsonLd }         from '@/components/seo/JsonLd'
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schemas'
import { TextReveal } from '@/components/ui/TextReveal'

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
        className="relative w-full min-h-[65vh] flex flex-col overflow-hidden grain"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-8%',
            top: '10%',
            width: 'clamp(320px, 44vw, 760px)',
            height: 'clamp(320px, 44vw, 760px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)',
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
            <span style={{ color: 'var(--color-muted)' }}>CONTACT</span>
          </nav>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <span
              className="font-mono uppercase block mb-6 animate-fade-up stagger-1"
              style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}
            >
              ✦ GET IN TOUCH
            </span>

            <div className="flex flex-col" style={{ gap: '0.02em' }}>
              <TextReveal
                text="START A"
                as="h1"
                delay={0.1}
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', color: 'var(--color-foreground)' }}
              />
              <TextReveal
                text="CONVERSATION."
                as="h1"
                delay={0.22}
                className="font-display font-black leading-none tracking-tighter uppercase"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 6rem)', color: 'var(--color-violet)' }}
              />
            </div>

            <p
              className="mt-8 lg:mt-10 animate-fade-up stagger-4"
              style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--color-muted)', maxWidth: '500px' }}
            >
              Ready to build? Drop us a line. We promise a technical engineer will read it,
              not a salesperson.
            </p>
          </div>

          {/* Bottom stats bar */}
          <div className="mt-10 lg:mt-14 animate-fade-up stagger-4" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
            <div className="flex flex-wrap items-center gap-6">
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
                Nagaur, Rajasthan
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SPLIT ─────────────────────────────────────── */}
      <ContactContent formNode={<ContactForm />} />

    </main>
  )
}
