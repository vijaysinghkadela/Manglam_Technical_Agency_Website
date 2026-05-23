import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schemas'
import { HomeHero } from '@/components/home/HomeHero'
import { MarqueeTicker } from '@/components/home/MarqueeTicker'
import { ServicesHorizontal } from '@/components/home/ServicesHorizontal'
import { StatsSection } from '@/components/home/StatsSection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { ComplianceByDesign } from '@/components/home/ComplianceByDesign'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { WhyMTA } from '@/components/home/WhyMTA'
import { TechStackMarquee } from '@/components/home/TechStackMarquee'
import { CTABanner } from '@/components/home/CTABanner'

export const metadata: Metadata = {
  title: 'Manglam Technical Agency — Empowering Your Digital Future',
  description:
    'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, social media & digital operations. Based in Rajasthan and Udyam-registered in 2025.',
  alternates: { canonical: 'https://manglamtechnicalagency.com' },
  openGraph: {
    title: 'Manglam Technical Agency — Empowering Your Digital Future',
    description:
      'Web development, AI automation, cybersecurity & digital operations for Indian businesses. Based in Rajasthan and Udyam-registered in 2025.',
    url: 'https://manglamtechnicalagency.com',
    type: 'website',
  },
}

const Divider = () => <div className="section-divide" aria-hidden />

export default function Home() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }])} />
      <HomeHero />
      <MarqueeTicker />
      <ServicesHorizontal />
      <Divider />
      <StatsSection />
      <Divider />
      <ProcessSection />
      <Divider />
      <ComplianceByDesign />
      <Divider />
      <TestimonialsSection />
      <Divider />
      <WhyMTA />
      <TechStackMarquee />
      <CTABanner />
    </>
  )
}
