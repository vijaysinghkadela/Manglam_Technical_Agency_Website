import type { Metadata } from 'next'
import { JsonLd }           from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schemas'
import { HeroSection }         from '@/components/home/HeroSection'
import { MarqueeTicker }       from '@/components/home/MarqueeTicker'
import { ServicesHorizontal }  from '@/components/home/ServicesHorizontal'
import { StatsSection }        from '@/components/home/StatsSection'
import { FeaturedProject }     from '@/components/home/FeaturedProject'
import { ProcessSection }      from '@/components/home/ProcessSection'
import { ComplianceByDesign }  from '@/components/home/ComplianceByDesign'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { WhyMTA }              from '@/components/home/WhyMTA'
import { TechStackMarquee }    from '@/components/home/TechStackMarquee'
import { CTABanner }           from '@/components/home/CTABanner'

export const metadata: Metadata = {
  title:       'Manglam Technical Agency — Technology That Transforms',
  description: 'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, social media & digital operations. Based in Rajasthan since 2021.',
  alternates:  { canonical: 'https://manglamtechnicalagency.com' },
  openGraph: {
    title:       'Manglam Technical Agency — Technology That Transforms',
    description: 'Web development, AI automation, cybersecurity & digital operations for Indian businesses. Based in Rajasthan since 2021.',
    url:         'https://manglamtechnicalagency.com',
    type:        'website',
  },
}

const Divider = () => (
  <div aria-hidden style={{ width:'100%', height:'1px', backgroundColor:'var(--color-border)' }} />
)

export default function Home() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }])} />
      <HeroSection />
      <MarqueeTicker />
      <ServicesHorizontal />
      <Divider />
      <FeaturedProject />
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
