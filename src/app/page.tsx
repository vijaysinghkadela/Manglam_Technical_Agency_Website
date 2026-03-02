import { HeroSection }         from '@/components/home/HeroSection'
import { MarqueeTicker }       from '@/components/home/MarqueeTicker'
import { ServicesHorizontal }  from '@/components/home/ServicesHorizontal'
import { StatsSection }        from '@/components/home/StatsSection'
import { FeaturedProject }     from '@/components/home/FeaturedProject'
import { ProcessSection }      from '@/components/home/ProcessSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { WhyMTA }              from '@/components/home/WhyMTA'
import { TechStackMarquee }    from '@/components/home/TechStackMarquee'
import { CTABanner }           from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <ServicesHorizontal />
      {/* Hard border prevents any bleed between sections */}
      <div className="w-full h-px bg-border" aria-hidden />
      <StatsSection />
      <div className="w-full h-px bg-border" aria-hidden />
      <FeaturedProject />
      <div className="w-full h-px bg-border" aria-hidden />
      <ProcessSection />
      <div className="w-full h-px bg-border" aria-hidden />
      <TestimonialsSection />
      <div className="w-full h-px bg-border" aria-hidden />
      <WhyMTA />
      <TechStackMarquee />
      <CTABanner />
    </>
  )
}
