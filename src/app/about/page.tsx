import { TextReveal } from '@/components/ui/TextReveal'
import { AboutContent } from '@/components/about/AboutContent'
import PageHero from '@/components/ui/PageHero'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-canvas flex flex-col">
      <PageHero
        breadcrumbCurrent="About"
        label="THE AGENCY"
        title="We are engineers, not salespeople."
        subheading="Manglam Technical Agency (MTA) is a Rajasthan-based IT agency delivering end-to-end digital infrastructure for Indian businesses that are ready to scale."
      />

      {/* 1. Hero Section (The Statement) */}
      <section className="relative w-full py-32 lg:py-48 bg-canvas border-t border-border overflow-hidden">
        {/* Grain Texture & Grid Line Background */}
        <div className="absolute inset-0 grain opacity-40 pointer-events-none mix-blend-overlay z-0" />
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none z-0" />
        
        <div className="container-site relative z-10 flex flex-col items-center text-center">
          <p className="font-mono text-[11px] text-violet tracking-[0.2em] mb-8 font-semibold uppercase">
            ✦ EST. RAJASTHAN, INDIA
          </p>
          
          <h1 className="text-[clamp(40px,8vw,120px)] font-display font-black text-white leading-[0.9] tracking-tighter uppercase max-w-5xl mx-auto">
            <TextReveal text="WE ENGINEER" delay={0.1} />
            <br />
            <TextReveal text="DIGITAL" delay={0.2} />
            <br />
            <TextReveal text="CLARITY." delay={0.3} />
          </h1>
        </div>
      </section>

      {/* Client Component handling the interactive segments */}
      <AboutContent />
    </main>
  )
}
