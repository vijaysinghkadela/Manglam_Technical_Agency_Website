import HeroSection from '@/components/home/HeroSection';
import MarqueeTicker from '@/components/home/MarqueeTicker';
import ServicesHorizontal from '@/components/home/ServicesHorizontal';
import StatsSection from '@/components/home/StatsSection';
import FeaturedProject from '@/components/home/FeaturedProject';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyMTA from '@/components/home/WhyMTA';
import TechStackMarquee from '@/components/home/TechStackMarquee';
import CTABanner from '@/components/home/CTABanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manglam Technical Agency | Digital Infrastructure for India',
  description: 'MTA builds custom websites, cybersecurity solutions, and AI automation workflows for growing businesses in Rajasthan and across India.',
  openGraph: {
    title: 'Manglam Technical Agency',
    description: 'Technology That Transforms.',
    url: 'https://manglamtechnicalagency.com',
    siteName: 'MTA',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="relative w-full bg-[#080808]" style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO — min-height 100vh */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <HeroSection />
      </section>

      {/* 2. MARQUEE TICKER — fixed height, no overflow */}
      <div className="w-full h-12 border-y border-[#1F1F1F] overflow-hidden flex-shrink-0">
        <MarqueeTicker />
      </div>

      {/* 3. SERVICES HORIZONTAL — self-contained tall section */}
      {/* This section manages its OWN height via the sticky inner mechanism */}
      <ServicesHorizontal />

      {/* Explicit separator */}
      <div className="w-full h-px bg-[#1F1F1F]" />

      {/* 4. STATS — isolated, explicit background */}
      <section className="w-full py-24 bg-[#080808] border-t border-[#1F1F1F] overflow-hidden">
        <StatsSection />
      </section>

      {/* Explicit separator */}
      <div className="w-full h-px bg-[#1F1F1F]" />

      {/* 5. FEATURED PROJECT */}
      <section className="w-full py-28 bg-[#0E0E0E] border-t border-[#1F1F1F] overflow-hidden">
        <FeaturedProject />
      </section>

      {/* 6. PROCESS */}
      <section className="w-full py-28 bg-[#080808] border-t border-[#1F1F1F] overflow-hidden">
        <ProcessSection />
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="w-full py-24 bg-[#0E0E0E] border-t border-[#1F1F1F] overflow-hidden">
        <TestimonialsSection />
      </section>

      {/* 8. WHY MTA */}
      <section className="w-full py-28 bg-[#080808] border-t border-[#1F1F1F] overflow-hidden">
        <WhyMTA />
      </section>

      {/* 9. TECH STACK MARQUEE */}
      <div className="w-full py-14 bg-[#0E0E0E] border-t border-[#1F1F1F] overflow-hidden">
        <TechStackMarquee />
      </div>

      {/* 10. CTA BANNER */}
      <section className="w-full py-32 bg-[#7C3AED] overflow-hidden">
        <CTABanner />
      </section>

    </main>
  );
}
