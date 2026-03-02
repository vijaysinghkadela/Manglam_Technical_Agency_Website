'use client';

import Link from 'next/link';
import { ExternalLink, ArrowRight, Clock, IndianRupee, Award, Check, Lock } from 'lucide-react';
import MotionWrapper from '@/components/ui/MotionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function PortfolioPreview() {
  return (
    <section className="w-full py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="OUR WORK" title="Projects That Made an Impact" />

        {/* Featured — MNSS */}
        <MotionWrapper>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Browser mockup */}
              <div className="p-6 md:p-8 bg-white/[0.02]">
                <div className="rounded-xl overflow-hidden border border-white/15 shadow-2xl">
                  {/* Browser chrome */}
                  <div className="bg-[#1E1E2E] px-4 py-3 flex items-center gap-3 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 bg-[#2A2A3E] rounded-md px-3 py-1 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs text-white/40 font-mono">marutnarayansewasansthan.org</span>
                    </div>
                  </div>
                  {/* Website preview area */}
                  <div className="bg-gradient-to-br from-[#1a3a1a] via-[#0f2a0f] to-[#1a2a1a] aspect-[16/10] p-6 flex flex-col">
                    {/* Mock navbar */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-500/80" />
                        <div className="h-2 w-24 bg-white/20 rounded" />
                      </div>
                      <div className="flex gap-3">
                        {[1, 2, 3, 4].map((i) => <div key={i} className="h-1.5 w-10 bg-white/15 rounded" />)}
                      </div>
                    </div>
                    {/* Mock hero */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="h-2 w-32 bg-orange-400/40 rounded mb-3" />
                      <div className="h-5 w-3/4 bg-white/25 rounded mb-2" />
                      <div className="h-5 w-1/2 bg-white/20 rounded mb-4" />
                      <div className="h-2 w-full bg-white/10 rounded mb-2" />
                      <div className="h-2 w-4/5 bg-white/10 rounded mb-6" />
                      <div className="flex gap-3">
                        <div className="h-8 w-28 bg-orange-500/60 rounded-lg" />
                        <div className="h-8 w-24 bg-white/10 rounded-lg border border-white/20" />
                      </div>
                    </div>
                    {/* Mock stat cards */}
                    <div className="flex gap-2 mt-4">
                      {['Lives', 'Years', 'Programs'].map((label) => (
                        <div key={label} className="flex-1 bg-white/[0.08] rounded-lg p-2">
                          <div className="h-4 w-8 bg-green-400/60 rounded mb-1" />
                          <div className="h-1.5 w-full bg-white/15 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 flex flex-col gap-5 justify-center">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/25">NGO</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/25">Web Development</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">
                    <Award className="w-3 h-3 inline mr-1" />MTA Signature Project
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-2">MNSS Website</h3>
                  <p className="text-white/55 leading-relaxed text-sm">
                    Built from scratch for Marut Narayan Sewa Sansthan — a Rajasthan-based NGO running
                    rehabilitation, women&apos;s safety, and skill development programs across 5+ districts since 2009.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.08]">
                    <div className="flex items-center gap-2 text-xs text-white/40 mb-1"><Clock className="w-3 h-3" /> Duration</div>
                    <div className="text-white font-semibold">3 Weeks</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.08]">
                    <div className="flex items-center gap-2 text-xs text-white/40 mb-1"><IndianRupee className="w-3 h-3" /> Project Value</div>
                    <div className="text-white font-semibold">₹50,000</div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudinary', 'Vercel'].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-white/[0.05] text-white/70 border border-white/10">{tech}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">Delivered</p>
                  <ul className="space-y-1.5">
                    {['Responsive website (desktop + mobile)', 'Content integration & image optimisation', 'QA, testing & deployment', '1-year free maintenance & domain'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                        <Check className="w-3.5 h-3.5 text-green-400 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="https://www.marutnarayansewasansthan.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-[0_8px_30px_rgba(108,43,217,0.4)] hover:-translate-y-0.5 w-fit"
                >
                  <ExternalLink className="w-4 h-4" /> View Live Site
                </a>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Coming soon cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'E-Commerce Platform', category: 'Web Development', gradient: 'from-blue-600/20 to-violet-600/20' },
            { title: 'Healthcare Campaign', category: 'Social Media', gradient: 'from-green-600/20 to-cyan-600/20' },
            { title: 'Security Audit', category: 'Cybersecurity', gradient: 'from-red-600/20 to-amber-600/20' },
          ].map((project) => (
            <MotionWrapper key={project.title}>
              <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.03] aspect-[4/3]">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`} />
                <div className="absolute inset-0 backdrop-blur-[2px] bg-[#070710]/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white/50" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">{project.title}</p>
                    <p className="text-white/40 text-xs mt-1">{project.category}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/25 mt-1">
                    Case Study Coming Soon
                  </span>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <Link href="/portfolio">
            <Button variant="ghost" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">View Full Portfolio</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
