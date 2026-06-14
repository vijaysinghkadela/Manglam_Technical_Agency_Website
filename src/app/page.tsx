import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schemas'
import { AboutContent } from '@/components/about/AboutContent'
import { ContactContent } from '@/components/contact/ContactContent'
import ContactForm from '@/components/contact/ContactForm'
import { HomeHero } from '@/components/home/HomeHero'
import { MarqueeTicker } from '@/components/home/MarqueeTicker'
import { ServicesHorizontal } from '@/components/home/ServicesHorizontal'
import { PortfolioContent } from '@/components/portfolio/PortfolioContent'

export const metadata: Metadata = {
  title: 'Manglam Technical Agency | Web, AI Automation & Cybersecurity in Rajasthan',
  description:
    'Bikaner-based technical team for websites, AI workflows, cybersecurity, and digital growth. Clear scope, direct communication, and documented delivery.',
  alternates: { canonical: 'https://manglamtechnicalagency.com' },
  openGraph: {
    title: 'Manglam Technical Agency | Web, AI Automation & Cybersecurity in Rajasthan',
    description:
      'Websites, AI workflows, cybersecurity, and digital growth for Rajasthan businesses.',
    url: 'https://manglamtechnicalagency.com',
    type: 'website',
  },
}

const Divider = () => <div className="section-divide" aria-hidden />

export default function Home() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }])} />
      <div id="home" className="scroll-mt-[var(--nav-offset)]">
        <HomeHero />
      </div>
      <MarqueeTicker />
      <div id="about" className="scroll-mt-[var(--nav-offset)]">
        <AboutContent />
      </div>
      <Divider />
      <div id="services" className="scroll-mt-[var(--nav-offset)]">
        <ServicesHorizontal />
      </div>
      <Divider />
      <div id="portfolio" className="scroll-mt-[var(--nav-offset)]">
        <PortfolioContent />
      </div>
      <Divider />
      <div id="contact" className="scroll-mt-[var(--nav-offset)]">
        <ContactContent formNode={<ContactForm />} />
      </div>
    </>
  )
}
