import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/lib/data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description:
    "Explore MTA's premium digital infrastructure services: Web Development, Cybersecurity, AI Automation, and more.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Services"
        label="WHAT WE DO"
        title="Services That Scale"
        subheading="End-to-end digital infrastructure for Indian businesses. We build, secure, and automate your operations so you can focus on growth."
      />

      <section className="py-28 bg-surface border-t border-border">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, idx) => {
              const num = String(idx + 1).padStart(2, '0')

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative bg-card border border-border p-8 flex flex-col min-h-[320px] overflow-hidden transition-all duration-500 hover:border-violet/30"
                  data-cursor="link"
                >
                  {/* Left violet accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-violet scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-5xl font-black text-white/6 group-hover:text-violet/20 transition-colors duration-500 select-none">
                      {num}
                    </span>
                    <div className="w-10 h-10 border border-border flex items-center justify-center text-muted group-hover:border-violet/40 group-hover:text-violet-light transition-all duration-300">
                      <service.Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <h3 className="font-display text-xl font-bold text-white leading-tight group-hover:text-violet-light transition-colors duration-300">{service.name}</h3>
                    <p className="text-sm text-muted leading-relaxed line-clamp-2">{service.tagline}</p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-violet-light font-mono font-semibold">{service.priceLabel}</span>
                      <div className="w-8 h-8 border border-border flex items-center justify-center group-hover:bg-violet group-hover:border-violet transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-canvas border-t border-border">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="border border-border bg-surface p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] text-violet-light tracking-[0.18em] uppercase mb-2">Contract-Governed Delivery</p>
              <h2 className="font-display font-black text-white text-2xl mb-2">Every service is mapped to legal controls before execution.</h2>
              <p className="text-sm text-muted leading-relaxed">
                Explore the agreement matrix, request workflow, and full lead-to-delivery governance model.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/legal" className="text-violet-light hover:text-white transition-colors">Legal Hub →</Link>
              <Link href="/research" className="text-violet-light hover:text-white transition-colors">Research Pipeline →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
