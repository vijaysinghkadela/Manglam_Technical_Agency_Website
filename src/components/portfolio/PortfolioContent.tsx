'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Clock, IndianRupee, Award } from 'lucide-react';
import MotionWrapper from '@/components/ui/MotionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { projects, getProjectsByCategory } from '@/lib/data/projects';

const categories = ['All', 'Web Dev', 'Social Media', 'Cybersecurity'];

export default function PortfolioContent() {
  const [active, setActive] = useState('All');
  const filtered = getProjectsByCategory(active);

  return (
    <>
      {/* Filter tabs */}
      <section className="px-4 mb-8">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                active === cat ? 'bg-brand text-white' : 'bg-surface border border-border text-text-muted hover:text-text-primary hover:border-brand/30'
              }`}
              id={`portfolio-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding pt-0">
        <div className="max-w-6xl mx-auto space-y-6">
          {filtered.map((project, idx) => (
            <MotionWrapper key={project.slug} delay={idx * 0.1}>
              {project.featured ? (
                <GlassCard className="p-0 overflow-hidden" hover={false}>
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Browser mock */}
                    <div className="p-6 md:p-8 bg-surface/40">
                      <div className="rounded-xl border border-border overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 bg-surface-2 border-b border-border">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-error/60" />
                            <div className="w-3 h-3 rounded-full bg-warning/60" />
                            <div className="w-3 h-3 rounded-full bg-success/60" />
                          </div>
                          <div className="flex-1 ml-3">
                            <div className="bg-dark/60 rounded-md px-3 py-1 text-xs text-text-muted max-w-xs">{project.url}</div>
                          </div>
                        </div>
                        <div className="p-8 min-h-[200px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-brand/10 via-accent/5 to-brand/5">
                          <div className="w-14 h-14 rounded-2xl bg-brand/20 border border-brand/40 flex items-center justify-center mb-3">
                            <span className="text-xl font-heading font-bold text-brand-light">{project.title[0]}</span>
                          </div>
                          <div className="text-sm font-semibold text-text-primary">{project.client}</div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="brand">{project.category}</Badge>
                        <Badge variant="accent">{project.type}</Badge>
                        {project.badge && <Badge className="bg-accent-alt/10 border-accent-alt/30 text-accent-alt"><Award className="w-3 h-3" /> {project.badge}</Badge>}
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">{project.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed mb-4">{project.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div><span className="text-text-muted">Duration:</span><div className="text-text-primary font-medium flex items-center gap-1 mt-0.5"><Clock className="w-3.5 h-3.5" /> {project.duration}</div></div>
                        <div><span className="text-text-muted">Value:</span><div className="text-text-primary font-medium flex items-center gap-1 mt-0.5"><IndianRupee className="w-3.5 h-3.5" /> {project.value.replace('₹', '')}</div></div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.stack.map((t) => <span key={t} className="text-xs bg-surface-2 px-2 py-1 rounded border border-border text-text-muted">{t}</span>)}
                      </div>
                      {project.deliverables.length > 0 && (
                        <ul className="space-y-1 mb-4">
                          {project.deliverables.slice(0, 4).map((d) => (
                            <li key={d} className="text-xs text-text-muted flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-success mt-1.5 shrink-0" /> {d}
                            </li>
                          ))}
                        </ul>
                      )}
                      {project.url && (
                        <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-brand-light hover:text-brand transition-colors">
                          <ExternalLink className="w-4 h-4" /> View Live Site
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ) : (
                <GlassCard className={`${project.comingSoon ? 'opacity-60 pointer-events-none' : ''} relative`}>
                  {project.comingSoon && (
                    <div className="absolute inset-0 backdrop-blur-sm bg-dark/30 z-10 flex items-center justify-center rounded-2xl">
                      <Badge variant="brand">Case Study Coming Soon</Badge>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0" style={{ background: project.color }}>
                      {project.title[0]}
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2 mb-1">
                        <Badge variant="brand" className="text-[10px]">{project.category}</Badge>
                      </div>
                      <h4 className="text-base font-heading font-semibold text-text-primary">{project.title}</h4>
                      <p className="text-xs text-text-muted mt-1 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.stack.map((t) => <span key={t} className="text-[10px] bg-surface-2 px-1.5 py-0.5 rounded border border-border text-text-muted">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              )}
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface/50">
        <div className="max-w-2xl mx-auto text-center">
          <MotionWrapper>
            <h2 className="text-2xl font-heading font-bold gradient-text mb-3">Have a Project in Mind?</h2>
            <p className="text-sm text-text-muted mb-6">Tell us about your requirements and we&apos;ll create a tailored proposal.</p>
            <Link href="/contact"><Button variant="gradient" size="lg">Start a Project</Button></Link>
          </MotionWrapper>
        </div>
      </section>
    </>
  );
}
