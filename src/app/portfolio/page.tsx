import { projects } from '@/lib/data/projects'
import Link from 'next/link'
import { ExternalLink, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PortfolioPage() {
  return (
    <div className="w-full pt-[68px]">
      
      {/* Header */}
      <section className="w-full py-24 lg:py-32 bg-canvas overflow-hidden relative">
        <div className="absolute inset-0 grid-bg opacity-30 mix-blend-screen pointer-events-none" />
        <div className="w-full max-w-site mx-auto px-6 lg:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 w-fit px-4 py-2 rounded-full bg-violet/10 border border-violet/20">
             <div className="w-2 h-2 rounded-full bg-violet animate-pulse-violet" />
             <p className="text-[11px] font-mono text-violet tracking-widest uppercase">OUR WORK</p>
          </div>
          <h1 className="font-display font-black text-white leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
            Digital Products<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-[#444]">That Drive Growth</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            From e-commerce platforms to scalable NGO portals. Browse our recent client deliveries and internal case studies.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full py-24 bg-surface rounded-t-[60px] border-t border-border">
        <div className="w-full max-w-site mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col gap-12 lg:gap-24">
            {projects.map((p) => (
              <div key={p.id} className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start group">
                
                {/* Left — Mockup wrapper in White Bento Card */}
                <div className="w-full bg-white rounded-[40px] p-8 lg:p-12 shadow-dark-xl flex flex-col justify-center transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className={cn(
                    "w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-12 text-center bg-linear-to-br border border-black/10",
                    p.gradient
                  )} style={{ aspectRatio: '16/10' }}>
                    
                    {p.status === 'live' ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg">
                          <span className="font-display font-black text-white text-2xl">{p.title[0]}</span>
                        </div>
                        <div>
                          <p className="font-display font-bold text-white text-xl">{p.title}</p>
                          <p className="text-white/60 text-sm mt-1">{p.url}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="px-4 py-2 border border-white/20 rounded-full text-xs font-mono text-white bg-black/40 backdrop-blur-md">
                          IN PROGRESS
                        </div>
                        <span className="font-display font-black text-white/40 text-2xl tracking-tight">
                          Case Study Coming Soon
                        </span>
                      </div>
                    )}

                  </div>
                </div>

                {/* Right — Project Info inside Bento Cards */}
                <div className="flex flex-col gap-6">
                  {/* Main Info Bento */}
                  <div className="bg-[#111] rounded-3xl p-8 lg:p-10 border border-border flex flex-col gap-6 transform group-hover:-translate-y-2 transition-transform duration-500 group-hover:shadow-violet-sm group-hover:border-violet/30 min-h-[300px]">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {p.category.map(t => (
                        <span key={t} className="text-[11px] font-mono px-3 py-1 rounded-full border border-border text-muted">{t}</span>
                      ))}
                      {p.featured && (
                        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-royal text-white font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                          ✦ Signature Project
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-black text-white tracking-tight leading-[0.9]"
                      style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}>
                      {p.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted text-base leading-relaxed">
                      {p.description}
                    </p>

                    {/* CTA */}
                    {p.status === 'live' && p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 bg-lime text-black px-6 py-4 rounded-2xl text-sm font-display font-bold hover:bg-white transition-all duration-300 w-full lg:w-fit mt-auto"
                      >
                        View Live Site
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Secondary Meta Bentos Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Metrics Bento */}
                    <div className="bg-[#111] rounded-3xl p-6 border border-border">
                      <div className="flex flex-col gap-4">
                        <div>
                          <span className="text-[10px] text-muted font-mono tracking-widest uppercase block mb-1">DURATION</span>
                          <span className="text-white font-display text-lg font-bold">{p.duration}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted font-mono tracking-widest uppercase block mb-1">CLIENT</span>
                          <span className="text-white font-display text-lg font-bold truncate max-w-[200px] block" title={p.client}>{p.client}</span>
                        </div>
                        
                        {/* Stack */}
                        {p.stack.length > 0 && (
                          <>
                            <div className="h-px w-full bg-border my-1" />
                            <div>
                               <p className="text-[10px] text-muted font-mono tracking-widest uppercase mb-2">TECH STACK</p>
                               <div className="flex flex-wrap gap-1.5">
                                 {p.stack.slice(0, 3).map(t => (
                                   <span key={t} className="text-[10px] font-mono text-white bg-surface px-2 py-1 rounded-full border border-border">
                                     {t}
                                   </span>
                                 ))}
                                 {p.stack.length > 3 && (
                                    <span className="text-[10px] font-mono text-muted px-1 py-1">+{p.stack.length - 3}</span>
                                 )}
                               </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Deliverables Bento */}
                    {p.deliverables.length > 0 && (
                      <div className="bg-royal text-white rounded-3xl p-6 transform hover:scale-[1.02] transition-transform duration-300 shadow-lg">
                        <p className="font-display font-bold text-lg mb-4">Deliverables</p>
                        <ul className="flex flex-col gap-3">
                          {p.deliverables.slice(0, 4).map(d => (
                            <li key={d} className="flex items-start gap-2.5 text-sm font-medium">
                              <Check className="w-4 h-4 mt-0.5 text-white shrink-0" />
                              <span className="leading-snug">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
