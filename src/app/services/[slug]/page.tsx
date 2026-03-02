import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { services, getServiceBySlug } from '@/lib/data/services';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.name,
    description: service.description,
  };
}

// Generate static params so these pages are pre-rendered at build time
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const priceMap: Record<string, string> = {
  'web-development': 'From ₹50,000',
  'social-media-marketing': '₹10,000/mo',
  'cybersecurity': 'From ₹20,000/yr',
  'ai-automation': 'Custom Quote',
  'saas-licensing': 'Custom Quote',
  'data-processing': 'Custom Quote',
  'contractor-management': 'Custom Quote',
};

const timelineMap: Record<string, string> = {
  'web-development': '3-6 Weeks',
  'social-media-marketing': 'Ongoing Monthly',
  'cybersecurity': '1-3 Weeks + Ongoing',
  'ai-automation': '2-8 Weeks',
  'saas-licensing': '1-2 Weeks + Ongoing',
  'data-processing': 'Varies by volume',
  'contractor-management': '1-2 Weeks',
};

export default function ServicePage({ params: { slug } }: { params: { slug: string } }) {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const price = priceMap[service.slug] || 'Custom Quote';
  const timeline = timelineMap[service.slug] || 'Project Dependent';

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
      <section className="w-full bg-[#0E0E0E] border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 py-8 gap-6">
            <div>
              <p className="text-[11px] text-muted font-mono uppercase mb-2">Service Type</p>
              <p className="text-sm font-medium text-white">{service.name.split(' ')[0]}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted font-mono uppercase mb-2">Starting Price</p>
              <p className="text-sm font-medium text-white">{price}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted font-mono uppercase mb-2">Est. Timeline</p>
              <p className="text-sm font-medium text-white">{timeline}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted font-mono uppercase mb-2">Agreement</p>
              <p className="text-sm font-medium text-white">Written Contract</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Deliverables */}
      <section className="py-24 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Col (Overview) */}
            <div className="lg:col-span-4 lg:sticky lg:top-[120px] self-start">
              <h2 className="text-display-m text-white mb-6">Overview</h2>
              <p className="text-[16px] text-muted leading-relaxed">
                {service.description}
              </p>
              
              <div className="mt-12">
                <p className="text-micro text-violet mb-4">INCLUDED</p>
                <ul className="flex flex-col gap-3">
                  {service.deliverables.map(d => (
                    <li key={d} className="text-sm text-muted flex items-start gap-3">
                      <span className="text-violet mt-0.5">→</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Col (Process) */}
            <div className="lg:col-span-8 flex flex-col">
              <h2 className="text-display-m text-white mb-10">How It Works</h2>
              <div className="flex flex-col">
                {service.process.map((step, i) => (
                  <div
                    key={step.step}
                    className="w-full flex items-center justify-between py-8 border-b border-[#1F1F1F] group hover:bg-surface/50 transition-colors px-2 -mx-2"
                  >
                    <div className="flex items-center gap-6 lg:gap-10">
                      <div className="hidden lg:block w-[3px] h-12 rounded-full bg-transparent group-hover:bg-violet/30 transition-colors duration-300" />
                      
                      <span className="font-display text-4xl lg:text-5xl font-black text-[#1F1F1F] group-hover:text-violet/30 transition-colors duration-300">
                        {String(step.step).padStart(2, '0')}
                      </span>

                      <div className="flex flex-col gap-2">
                        <h3 className="font-display text-xl lg:text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed max-w-lg">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    
                    <span className="text-xs font-mono text-muted hidden md:block whitespace-nowrap">
                      {step.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-surface border-y border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-display-m text-white">Pricing & Plans</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.pricing.map((plan) => (
              <div key={plan.label} className="p-8 border border-[#1F1F1F] bg-[#0E0E0E] flex flex-col h-full hover:border-[#333] transition-colors">
                <h3 className="font-display text-2xl font-bold text-white mb-6 w-full pb-6 border-b border-[#1F1F1F]">
                  {plan.label}
                </h3>
                <p className="font-display text-4xl lg:text-5xl font-black text-white mb-2">
                  {plan.amount}
                </p>
                <p className="text-sm font-mono text-[#525252] mt-4 leading-relaxed mb-auto">
                  {plan.note}
                </p>
                <Link
                  href="/contact"
                  className="mt-8 px-6 py-3 w-full text-center border border-[#1F1F1F] text-sm text-white hover:bg-white hover:text-black transition-colors"
                  data-cursor="pointer"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-canvas">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-display-m text-white mb-12 text-center">Questions?</h2>
          <div className="flex flex-col border-t border-[#1F1F1F]">
            {service.faqs.map((faq, i) => (
              <details key={i} className="group border-b border-[#1F1F1F]">
                <summary className="flex items-center justify-between py-6 cursor-pointer list-none" data-cursor="pointer">
                  <h3 className="text-lg font-medium text-white pr-8">{faq.q}</h3>
                  <ChevronDown className="w-5 h-5 text-muted group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pb-6 pr-12">
                  <p className="text-[15px] text-muted leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
