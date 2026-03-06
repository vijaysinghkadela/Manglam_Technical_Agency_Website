import { notFound } from 'next/navigation'
import PageHero from '@/components/ui/PageHero'
import { services, getService } from '@/lib/data/services'
import { getAgreementByCode } from '@/lib/data/legal'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: 'Service Not Found' }

  return {
    title: service.name,
    description: service.description,
  }
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  return (
    <main className="bg-canvas min-h-screen">
      <PageHero
        breadcrumbBase="Services"
        breadcrumbBaseHref="/services"
        breadcrumbCurrent={service.name}
        label="SERVICE OVERVIEW"
        title={service.name}
        subheading={service.tagline}
      />

      {/* Metadata Bar */}
      <section className="w-full bg-surface border-b border-border">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-border">
            {[
              ['Service', service.name],
              ['Starting Price', service.priceLabel],
              ['Core Deliverable', service.features[0]],
              ['Agreement Set', service.requiredAgreements.join(', ')],
            ].map(([label, val], i) => (
              <div key={label} className={`px-4 sm:px-6 py-5 ${i % 2 === 0 ? 'border-r border-border' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i < 3 ? 'lg:border-r lg:border-border' : ''}`}>
                <p className="font-mono text-[10px] text-dead uppercase tracking-[0.15em] mb-1">{label}</p>
                <p className="font-mono text-sm text-white font-semibold">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + Process */}
      <section className="py-16 lg:py-28 bg-canvas">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left */}
            <div className="lg:col-span-4 lg:sticky lg:top-[120px] self-start">
              <h2 className="font-display font-black text-white tracking-tight leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Overview</h2>
              <p className="text-[15px] text-muted leading-[1.7]">{service.description}</p>

              <div className="mt-12">
                <p className="font-mono text-label text-violet-light tracking-[0.22em] uppercase mb-4">INCLUDED</p>
                <ul className="flex flex-col gap-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted flex items-start gap-3">
                      <span className="text-violet-light mt-0.5">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border border-border bg-surface p-5">
                <p className="font-mono text-label text-violet-light tracking-[0.18em] uppercase mb-3">LEGAL & COMPLIANCE</p>
                <p className="text-sm text-muted leading-relaxed mb-4">{service.dpaTrigger}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.requiredAgreements.map((code) => {
                    const agreement = getAgreementByCode(code)
                    return agreement ? (
                      <Link
                        key={code}
                        href={`/legal/agreements/${agreement.slug}`}
                        className="px-2 py-1 border border-violet/30 text-xs font-mono text-violet-light hover:text-white hover:border-violet transition-colors"
                      >
                        {code}
                      </Link>
                    ) : (
                      <span key={code} className="px-2 py-1 border border-border text-xs font-mono text-muted">
                        {code}
                      </span>
                    )
                  })}
                </div>
                <ul className="flex flex-col gap-2">
                  {service.governingLaws.map((law) => (
                    <li key={law} className="text-xs text-muted leading-relaxed">
                      • {law}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-dead mb-2">Mapped Delivery Stages</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {service.deliveryStages.map((stage) => (
                      <span
                        key={stage}
                        className="px-2 py-1 border border-border text-[10px] font-mono text-muted"
                      >
                        Stage {stage}
                      </span>
                    ))}
                  </div>
                  <Link href="/research#pipeline" className="text-xs text-violet-light hover:text-white transition-colors">
                    View full stage definitions →
                  </Link>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex mt-10 px-6 py-3 border border-border hover:border-violet text-white hover:bg-violet/10 transition-colors text-sm"
                data-cursor="pointer"
              >
                Get a Quote
              </Link>
            </div>

            {/* Right */}
            <div className="lg:col-span-8 flex flex-col">
              <h2 className="font-display font-black text-white tracking-tight leading-[0.92] mb-10"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>How It Works</h2>
              <div className="flex flex-col border-t border-border">
                {service.process.map((step) => (
                  <div
                    key={step.step}
                    className="w-full flex items-center justify-between py-8 border-b border-border group hover:bg-[#0A0A0A] transition-colors px-2 -mx-2"
                  >
                    <div className="flex items-center gap-6 lg:gap-10">
                      <span className="font-display text-4xl lg:text-5xl font-black text-[#1A1A1A] group-hover:text-violet/20 transition-colors duration-300">
                        {String(step.step).padStart(2, '0')}
                      </span>

                      <div className="flex flex-col gap-2">
                        <h3 className="font-display text-xl lg:text-2xl font-bold text-white">{step.title}</h3>
                        <p className="text-sm text-muted leading-relaxed max-w-lg">{step.summary}</p>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-dead hidden md:block whitespace-nowrap">{step.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      {service.pricing.length > 0 && (
        <section className="py-16 lg:py-28 bg-surface border-t border-border">
          <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
            <span className="font-mono text-label text-violet-light tracking-[0.22em] uppercase block mb-3">PRICING</span>
            <h2 className="font-display font-black text-white tracking-tight leading-[0.92] mb-12"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Plans & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.pricing.map((plan) => (
                <div key={plan.label}
                  className={`bg-card border p-8 flex flex-col gap-6 ${plan.highlight ? 'border-violet' : 'border-border'}`}>
                  <p className="font-display text-xl font-bold text-white">{plan.label}</p>
                  <p className="font-display font-black text-white" style={{ fontSize: '44px' }}>{plan.amount}</p>
                  {plan.period && <p className="text-label font-mono text-muted uppercase tracking-[0.18em] -mt-4">{plan.period}</p>}
                  <div className="h-px bg-border" />
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map(f => (
                      <li key={f} className="text-sm text-muted flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" data-cursor="pointer"
                    className={`mt-auto inline-flex items-center justify-center py-3 text-sm font-semibold transition-all ${plan.highlight ? 'bg-violet text-white hover:bg-violet-dark' : 'border border-border text-muted hover:text-white hover:border-violet'}`}>
                    {plan.amount === 'Get Quote' ? 'Request Quote' : 'Get Started'}
                  </Link>
                </div>
              ))}
            </div>
            {/* Added Disclaimer for Social Media service */}
            {service.slug === 'social-media-marketing' && (
              <p className="font-mono text-center text-dead mt-8 text-xs tracking-wide">
                * Minimum 6-month commitment. Ad spend is billed separately.
              </p>
            )}
          </div>
        </section>
      )}

      <section className="py-20 bg-canvas border-t border-border">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="border border-border bg-surface p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-label text-violet-light tracking-[0.2em] uppercase mb-2">Compliance by Design</p>
              <h2 className="font-display font-black text-white text-2xl mb-2">This service is mapped to MTA&apos;s 10-stage delivery pipeline.</h2>
              <p className="text-sm text-muted leading-relaxed">
                Service execution is gated through signed agreements, payment-linked transitions, and documented handover controls.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/research" className="text-violet-light hover:text-white transition-colors text-sm">
                View Pipeline →
              </Link>
              <Link href="/legal" className="text-violet-light hover:text-white transition-colors text-sm">
                Open Legal Hub →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-28 bg-canvas border-t border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-display font-black text-white tracking-tight leading-[0.92] mb-12 text-center"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Questions?</h2>
          <div className="flex flex-col border-t border-border">
            {service.faqs.map((faq, i) => (
              <details key={`${faq.q}-${i}`} className="group border-b border-border">
                <summary className="flex items-center justify-between py-6 cursor-pointer list-none" data-cursor="pointer">
                  <h3 className="text-lg font-medium text-white pr-8">{faq.q}</h3>
                  <ChevronDown className="w-5 h-5 text-muted group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="pb-6 pr-12">
                  <p className="text-[15px] text-muted leading-[1.7]">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 lg:py-28 bg-surface border-t border-border">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="font-display font-bold text-white text-2xl mb-8">Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.filter(s => s.slug !== slug).slice(0, 2).map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} data-cursor="link"
                className="flex items-start gap-4 p-6 border border-border bg-card hover:border-violet/30 transition-all group">
                <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0 group-hover:border-violet/50 transition-colors">
                  <s.Icon className="w-5 h-5 text-muted group-hover:text-violet-light transition-colors" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">{s.name}</h3>
                  <p className="text-sm text-muted mt-1">{s.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
