'use client';

import { useRef } from 'react';

const items = [
  'WEB DEVELOPMENT',
  'SOCIAL MEDIA',
  'CYBERSECURITY',
  'AI AUTOMATION',
  'SAAS',
  'DATA PROCESSING',
  'CONTRACTOR MANAGEMENT',
];

function TickerContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-6 whitespace-nowrap">
          <span className="text-[11px] font-medium text-muted tracking-[0.2em] uppercase">
            {item}
          </span>
          <span className="text-violet text-xs">✦</span>
        </span>
      ))}
    </>
  );
}

export default function MarqueeTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full h-12 bg-card border-y border-[#1F1F1F] overflow-hidden flex items-center group">
      <div
        ref={trackRef}
        className="marquee-track animate-marquee gap-6 group-hover:[animation-play-state:paused]"
      >
        <TickerContent />
        <TickerContent />
        <TickerContent />
      </div>
    </section>
  );
}
