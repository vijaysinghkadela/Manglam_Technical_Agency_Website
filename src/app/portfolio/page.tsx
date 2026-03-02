'use client';

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data/projects';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const filters = ['All', 'Web Dev', 'Social Media', 'Cybersecurity', 'AI Automation', 'E-Commerce'];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter || p.type === activeFilter;
  });

  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Portfolio"
        label="CASE STUDIES"
        title="Our Work"
        subheading="Real projects, real results. See how we've helped Indian businesses scale their digital infrastructure."
      />

      <section className="pb-24 pt-8 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-6 mb-16 border-b border-[#1F1F1F] pb-6">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[13px] font-medium transition-colors ${
                  activeFilter === filter ? 'text-white underline decoration-violet decoration-2 underline-offset-8' : 'text-muted hover:text-white/80'
                }`}
                data-cursor="pointer"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry-style Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const isFeatured = project.featured;

                return (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`relative overflow-hidden group border border-[#1F1F1F] aspect-[16/10] ${isFeatured ? 'md:col-span-2 aspect-[21/9] lg:aspect-[24/9]' : ''}`}
                    style={{ background: project.color ? `linear-gradient(135deg, ${project.color}20, ${project.color}05)` : '#0E0E0E' }}
                  >
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      
                      {/* Coming Soon state */}
                      {project.comingSoon ? (
                        <div className="absolute inset-0 bg-[#080808]/80 backdrop-blur-sm flex items-center justify-center z-10">
                          <span className="px-4 py-2 border border-[#1F1F1F] bg-card text-xs font-mono text-muted uppercase tracking-widest">
                            Coming Soon
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-8 flex flex-col justify-end">
                          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-[11px] font-mono text-violet uppercase tracking-widest mb-2 block">
                              {project.client}
                            </span>
                            <h3 className="font-display text-3xl font-bold text-white mb-2">
                              {project.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                              <span className="px-2 py-1 text-[10px] font-mono border border-white/10 text-white/70 bg-white/5">{project.category}</span>
                              <span className="px-2 py-1 text-[10px] font-mono border border-white/10 text-white/70 bg-white/5">{project.type}</span>
                            </div>
                            <Link href={project.url ? `https://${project.url}` : '#'} target="_blank" className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-violet transition-colors" data-cursor="link">
                              View Project <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      )}
                      
                      {/* Decorative Text */}
                      {!project.comingSoon && (
                         <div className="flex flex-col h-full justify-between opacity-50">
                           <div className="text-white/20 font-display text-5xl font-black">{project.title.substring(0,2)}</div>
                         </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
