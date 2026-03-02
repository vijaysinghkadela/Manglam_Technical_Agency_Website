'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Share2, Shield, Bot, Key, Database, Users, ArrowRight } from 'lucide-react';
import { services } from '@/lib/data/services';
import { cn } from '@/lib/utils';

type Service = typeof services[number];

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5 text-[#525252] group-hover:text-violet-400 transition-colors duration-300" />,
  Share2: <Share2 className="w-5 h-5 text-[#525252] group-hover:text-violet-400 transition-colors duration-300" />,
  Shield: <Shield className="w-5 h-5 text-[#525252] group-hover:text-violet-400 transition-colors duration-300" />,
  Brain: <Bot className="w-5 h-5 text-[#525252] group-hover:text-violet-400 transition-colors duration-300" />,
  Bot: <Bot className="w-5 h-5 text-[#525252] group-hover:text-violet-400 transition-colors duration-300" />,
  Key: <Key className="w-5 h-5 text-[#525252] group-hover:text-violet-400 transition-colors duration-300" />,
  Database: <Database className="w-5 h-5 text-[#525252] group-hover:text-violet-400 transition-colors duration-300" />,
  Users: <Users className="w-5 h-5 text-[#525252] group-hover:text-violet-400 transition-colors duration-300" />,
};

const priceMap: Record<string, string> = {
  'web-development': 'From ₹50,000',
  'social-media-marketing': '₹10,000/mo',
  'cybersecurity': 'From ₹20,000/yr',
  'ai-automation': 'Custom Quote',
  'saas-licensing': 'Custom Quote',
  'data-processing': 'Custom Quote',
  'contractor-management': 'Custom Quote',
};

// Extracted mobile component to reduce code size
function MobileServiceCard({ service, index }: { service: Service; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  const price = priceMap[service.slug] || 'Custom Quote';
  const features = service.deliverables?.slice(0, 3) || [];

  return (
    <div className="w-full border border-[#1F1F1F] bg-[#0E0E0E] p-8 flex flex-col relative group">
      <span className="text-[60px] font-black text-[#1A1A1A] leading-none mb-4 select-none group-hover:text-[#2A1A4A] transition-colors">{num}</span>
      <div className="w-10 h-10 border border-[#1F1F1F] flex items-center justify-center mb-6 group-hover:border-violet-800 transition-colors">
        {iconMap[service.icon] || <Globe className="w-5 h-5 text-[#525252] group-hover:text-violet-400" />}
      </div>
      <h3 className="text-xl font-bold text-white leading-tight mb-2">{service.name}</h3>
      <p className="text-sm text-[#525252] mb-4">{service.tagline}</p>
      
      <ul className="flex flex-col gap-1.5 mb-4">
        {features.map(f => <li key={f} className="text-xs text-[#525252] font-mono">— {f}</li>)}
      </ul>
      <div className="text-xs text-violet-400 font-mono mb-4">{price}</div>
      <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm text-white group-hover:text-violet-300 transition-colors mt-auto">
        Explore Service <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-violet-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
    </div>
  );
}

export default function ServicesHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate scroll distance: each card 400px + 24px gap, minus one viewport
  const CARD_WIDTH = 400;
  const GAP = 24;
  const CARDS_COUNT = services.length;
  const TRACK_WIDTH = CARD_WIDTH * CARDS_COUNT + GAP * (CARDS_COUNT - 1);
  // Section height = viewport height + horizontal scroll distance
  // This creates enough vertical scroll room to traverse all cards
  const SECTION_HEIGHT = `calc(100vh + ${TRACK_WIDTH}px)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px', `-${TRACK_WIDTH - (typeof window !== 'undefined' ? window.innerWidth - 96 : 1200)}px`]
  );

  if (isMobile) {
    return (
      <section className="w-full py-20 bg-[#080808]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="flex flex-col gap-2 mb-12">
            <span className="text-[11px] font-mono tracking-[0.2em] text-violet-400 uppercase block mb-1">
              WHAT WE DO
            </span>
            <h2 className="text-4xl font-black text-white tracking-tight leading-[0.92]">
              Services That Scale
            </h2>
            <span className="text-[#525252] font-mono text-sm mt-2">
              {String(CARDS_COUNT).padStart(2, '0')} Services
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {services.map((service, i) => (
              <MobileServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    // Outer section — tall enough to create scroll distance
    <section
      ref={sectionRef}
      style={{ height: SECTION_HEIGHT }}
      className="relative w-full bg-[#080808]"
    >
      {/* Sticky inner — stays fixed in viewport while outer scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        
        {/* Section header — inside sticky, above cards */}
        <div className="flex items-end justify-between px-6 lg:px-12 pt-20 pb-10 flex-shrink-0">
          <div>
            <span className="text-[11px] font-mono tracking-[0.2em] text-violet-400 uppercase block mb-3">
              WHAT WE DO
            </span>
            <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.92]">
              Services That Scale
            </h2>
          </div>
          <span className="text-[#525252] font-mono text-sm">
            {String(CARDS_COUNT).padStart(2, '0')} Services
          </span>
        </div>

        {/* Cards track — horizontally scrollable */}
        <div className="flex-1 flex items-stretch overflow-hidden px-6 lg:px-12">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 items-stretch pb-10" // added padding-bottom to separate from progress bar
          >
            {services.map((service, i) => {
              const features = service.deliverables?.slice(0, 3) || [];
              const price = priceMap[service.slug] || 'Custom Quote';

              return (
                <div
                  key={service.slug}
                  style={{ width: `${CARD_WIDTH}px`, flexShrink: 0 }}
                  className="h-[calc(100%-1rem)] border border-[#1F1F1F] bg-[#0E0E0E] p-10 flex flex-col rounded-none relative group"
                >
                  {/* Number */}
                  <span className="text-[80px] font-black text-[#1A1A1A] leading-none group-hover:text-[#2A1A4A] transition-colors duration-500 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className="w-10 h-10 border border-[#1F1F1F] flex items-center justify-center mt-4 group-hover:border-violet-800 transition-colors duration-300">
                    {iconMap[service.icon] || <Globe className="w-5 h-5 text-[#525252] group-hover:text-violet-400 transition-colors duration-300" />}
                  </div>

                  {/* Content */}
                  <div className="mt-auto flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#525252] leading-relaxed">
                      {service.tagline}
                    </p>
                    
                    {/* Features */}
                    <ul className="flex flex-col gap-2">
                      {features.map(f => (
                        <li key={f} className="text-xs text-[#525252] font-mono">
                          — {f}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="text-xs text-violet-400 font-mono">
                      {price}
                    </div>

                    {/* Link */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-white group-hover:text-violet-300 transition-colors duration-300 mt-2"
                    >
                      Explore Service
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>

                  {/* Left accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-violet-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-[#1F1F1F] mx-6 lg:mx-12 mb-0 flex-shrink-0">
          <motion.div
            className="h-full bg-violet-600 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* Bottom hint */}
        <div className="px-6 lg:px-12 py-6 flex-shrink-0 bg-[#080808] z-10 w-full">
          <span className="text-[10px] text-[#2A2A2A] font-mono tracking-widest uppercase">
            Scroll to explore services →
          </span>
        </div>
      </div>
    </section>
  );
}
