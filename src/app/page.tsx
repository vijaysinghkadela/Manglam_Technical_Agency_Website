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

const Divider = () => (
  <div aria-hidden style={{ width:'100%', height:'1px', backgroundColor:'var(--color-border)' }} />
)

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <ServicesHorizontal />
      <Divider />
      <StatsSection />
      <Divider />
      <FeaturedProject />
      <Divider />
      <ProcessSection />
      <Divider />
      <TestimonialsSection />
      <Divider />
      <WhyMTA />
      <TechStackMarquee />
      <CTABanner />
    </>
  )
}
