'use client';

const techRow1 = ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Python', 'Firebase'];
const techRow2 = ['Cloudinary', 'Vercel', 'AWS', 'n8n', 'OpenAI', 'Figma', 'GitHub', 'Meta Ads'];

function TechItem({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-6 whitespace-nowrap">
      <span className="text-[13px] font-medium text-muted uppercase tracking-[0.1em] hover:text-white transition-colors">
        {name}
      </span>
      <span className="w-[1px] h-4 bg-[#1F1F1F]" />
    </span>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div className={`marquee-track gap-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items, ...items].map((item, i) => (
          <TechItem key={`${item}-${i}`} name={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechStackMarquee() {
  return (
    <section className="w-full bg-surface py-14 border-y border-[#1F1F1F]">
      <div className="text-center mb-8">
        <p className="text-[10px] text-dead tracking-[0.25em] uppercase font-body">
          TECHNOLOGIES WE USE
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <MarqueeRow items={techRow1} />
        <MarqueeRow items={techRow2} reverse />
      </div>
    </section>
  );
}
