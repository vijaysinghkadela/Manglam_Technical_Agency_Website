'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  actionPlan,
  agencyComparison,
  agencyTaxonomy,
  gapAnalysis,
  operatingModels,
  pipelineStrategies,
  reportHighlights,
  researchSections,
} from '@/lib/data/research'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const toc = [
  { id: 'summary', label: '01 — Summary' },
  { id: 'taxonomy', label: '02 — Taxonomy' },
  { id: 'operations', label: '03 — Operations' },
  { id: 'pipeline', label: '04 — Pipeline' },
  { id: 'comparison', label: '05 — Comparison' },
  { id: 'strategies', label: '06 — Strategies' },
  { id: 'gap-analysis', label: '07 — Gap Analysis' },
  { id: 'action-plan', label: '08 — Action Plan' },
]

function SectionHeader({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE }}
      className="max-w-4xl"
    >
      <span className="font-mono uppercase block mb-4" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.22em' }}>
        {label}
      </span>
      <h2 className="font-display font-black mb-5 leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--color-foreground)' }}>
        {title}
      </h2>
      <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--color-muted)' }}>{body}</p>
    </motion.div>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border bg-card" style={{ padding: 'clamp(18px, 2.5vw, 28px)' }}>
      {children}
    </div>
  )
}

export function ResearchPageContent() {
  return (
    <div className="border-t border-border" style={{ backgroundColor: 'var(--color-canvas)', padding: 'clamp(56px, 8vw, 108px) 0' }}>
      <div className="container-site grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16 lg:gap-20 items-start">
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="lg:sticky lg:top-32 self-start"
        >
          <span className="font-mono uppercase block mb-6" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.22em' }}>
            CHAPTERS
          </span>
          <nav className="flex flex-col" style={{ borderTop: '1px solid var(--color-border)' }}>
            {toc.map((entry) => (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className="flex items-center py-4 text-sm font-mono transition-colors hover-foreground"
                style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-muted)', letterSpacing: '0.05em' }}
              >
                {entry.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3 text-xs font-mono" style={{ color: 'var(--color-violet-light)' }}>
            <Link href="/portfolio" className="hover-foreground transition-colors">Open Portfolio →</Link>
            <Link href="/contact" className="hover-foreground transition-colors">Book a discovery call →</Link>
          </div>
        </motion.aside>

        <div className="flex flex-col gap-24">
          <section id="summary">
            <SectionHeader
              label="01 — SUMMARY"
              title="What the report says"
              body="This report maps the Indian agency landscape, shows how agencies actually win and deliver work, and then applies the findings to Manglam Technical Agency."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              {reportHighlights.map((item) => (
                <Card key={item.title}>
                  <p className="font-mono uppercase mb-3" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.18em' }}>{item.title}</p>
                  <p style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)' }}>{item.summary}</p>
                </Card>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {researchSections.map((section) => (
                <Card key={section.id}>
                  <h3 className="font-display font-bold mb-3" style={{ fontSize: '20px', color: 'var(--color-foreground)' }}>{section.title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)' }}>{section.summary}</p>
                </Card>
              ))}
            </div>
          </section>

          <section id="taxonomy">
            <SectionHeader
              label="02 — TAXONOMY"
              title="How Indian agencies cluster"
              body="Most agencies fall into a few common categories. The labels change, but the buying logic and delivery patterns are similar."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
              {agencyTaxonomy.map((item) => (
                <Card key={item.category}>
                  <h3 className="font-display font-bold mb-3" style={{ fontSize: '18px', color: 'var(--color-foreground)' }}>{item.category}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-muted)' }}>{item.description}</p>
                  <p className="mt-4 font-mono uppercase" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Examples</p>
                  <p className="mt-2" style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--color-muted)' }}>{item.examples.join(', ')}</p>
                </Card>
              ))}
            </div>
          </section>

          <section id="operations">
            <SectionHeader
              label="03 — OPERATIONS"
              title="Operating models and pricing"
              body="Small, mid-size, and enterprise agencies differ mainly in team structure, sales sophistication, and pricing discipline."
            />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-10">
              {operatingModels.map((item) => (
                <Card key={item.title}>
                  <h3 className="font-display font-bold mb-2" style={{ fontSize: '20px', color: 'var(--color-foreground)' }}>{item.title}</h3>
                  <p className="mb-4" style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)' }}>{item.summary}</p>
                  <div className="space-y-3 text-sm">
                    <div><span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Team</span><span style={{ color: 'var(--color-muted)' }}>{item.team}</span></div>
                    <div><span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Pricing</span><span style={{ color: 'var(--color-muted)' }}>{item.pricing}</span></div>
                    <div><span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Stack</span><span style={{ color: 'var(--color-muted)' }}>{item.stack}</span></div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="pipeline">
            <SectionHeader
              label="04 — PIPELINE"
              title="The lead-to-delivery funnel"
              body="Across agencies, the funnel stays consistent: lead generation, discovery, proposal, contracting, delivery, and retention."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {researchSections.slice(0, 3).map((section) => (
                <Card key={section.id}>
                  <h3 className="font-display font-bold mb-3" style={{ fontSize: '18px', color: 'var(--color-foreground)' }}>{section.title}</h3>
                  <ul className="space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.65 }}>
                        <span style={{ color: 'var(--color-violet-light)', flexShrink: 0 }}>→</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>

          <section id="comparison">
            <SectionHeader
              label="05 — COMPARISON"
              title="Representative agency table"
              body="A condensed view of 15 Indian agencies across service focus, client type, pipeline style, deal size, and tools."
            />
            <div className="overflow-x-auto border border-border mt-10" style={{ backgroundColor: 'var(--color-card)' }}>
              <table className="w-full min-w-[1100px] border-collapse text-left">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                    {['Agency', 'Services', 'Clients', 'Pipeline', 'Deal Size', 'Tools'].map((h) => (
                      <th key={h} className="font-mono text-xs uppercase tracking-widest py-4 px-5" style={{ color: 'var(--color-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agencyComparison.map((row, index) => (
                    <tr key={`${row.agency}-${index}`} style={{ borderBottom: index < agencyComparison.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                      <td className="py-4 px-5 text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                        {row.agency}
                        <span className="block text-xs font-normal mt-1" style={{ color: 'var(--color-dead)' }}>{row.location}</span>
                      </td>
                      <td className="py-4 px-5 text-sm" style={{ color: 'var(--color-muted)' }}>{row.services}</td>
                      <td className="py-4 px-5 text-sm" style={{ color: 'var(--color-muted)' }}>{row.clients}</td>
                      <td className="py-4 px-5 text-sm" style={{ color: 'var(--color-muted)' }}>{row.pipeline}</td>
                      <td className="py-4 px-5 text-sm" style={{ color: 'var(--color-muted)' }}>{row.dealSize}</td>
                      <td className="py-4 px-5 text-sm" style={{ color: 'var(--color-muted)' }}>{row.tools}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="strategies">
            <SectionHeader
              label="06 — STRATEGIES"
              title="Pipeline models for Manglam"
              body="Three pipeline strategies cover boutique, growth, and enterprise positioning. Each one changes the roles, stack, and KPIs."
            />
            <div className="grid grid-cols-1 gap-4 mt-10">
              {pipelineStrategies.map((item) => (
                <Card key={item.name}>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
                    <div>
                      <h3 className="font-display font-bold mb-2" style={{ fontSize: '20px', color: 'var(--color-foreground)' }}>{item.name}</h3>
                      <p className="mb-4" style={{ fontSize: '14px', lineHeight: 1.72, color: 'var(--color-muted)' }}>{item.audience}</p>
                      <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Timeline</p>
                      <p style={{ fontSize: '14px', color: 'var(--color-muted)' }}>{item.timeline}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Steps</p>
                        <ul className="space-y-2">
                          {item.steps.map((step) => <li key={step} className="text-sm" style={{ color: 'var(--color-muted)' }}>• {step}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Roles</p>
                        <ul className="space-y-2 mb-4">
                          {item.roles.map((role) => <li key={role} className="text-sm" style={{ color: 'var(--color-muted)' }}>• {role}</li>)}
                        </ul>
                        <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>KPI Focus</p>
                        <ul className="space-y-2">
                          {item.kpis.map((kpi) => <li key={kpi} className="text-sm" style={{ color: 'var(--color-muted)' }}>• {kpi}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {item.stack.map((tool) => (
                          <span key={tool} className="font-mono text-[10px] px-2 py-1 uppercase tracking-widest" style={{ border: '1px solid rgba(124,58,237,0.35)', color: 'var(--color-violet-light)' }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="gap-analysis">
            <SectionHeader
              label="07 — GAP ANALYSIS"
              title="Where Manglam is weak today"
              body="The report is positive about transparency and legal posture, but the website still needs stronger proof, sharper messaging, and deeper SEO."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
              {gapAnalysis.map((item) => (
                <Card key={item.area}>
                  <h3 className="font-display font-bold mb-3" style={{ fontSize: '18px', color: 'var(--color-foreground)' }}>{item.area}</h3>
                  <div className="space-y-3 text-sm">
                    <p><span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Current</span><span style={{ color: 'var(--color-muted)' }}>{item.current}</span></p>
                    <p><span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Recommendation</span><span style={{ color: 'var(--color-muted)' }}>{item.recommendation}</span></p>
                    <p><span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Impact</span><span style={{ color: 'var(--color-muted)' }}>{item.impact}</span></p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="action-plan">
            <SectionHeader
              label="08 — ACTION PLAN"
              title="30 / 90 / 180 day rollout"
              body="A phased plan converts the report into visible execution: content fixes first, then pipeline building, then optimization and scale."
            />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-10">
              {actionPlan.map((phase) => (
                <Card key={phase.phase}>
                  <h3 className="font-display font-bold mb-2" style={{ fontSize: '20px', color: 'var(--color-foreground)' }}>{phase.phase}</h3>
                  <p className="mb-4 text-sm" style={{ color: 'var(--color-dead)' }}>{phase.window}</p>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>Priorities</p>
                      <ul className="space-y-2">{phase.priorities.map((item) => <li key={item} style={{ color: 'var(--color-muted)' }}>• {item}</li>)}</ul>
                    </div>
                    <div>
                      <p className="font-mono uppercase mb-2" style={{ fontSize: '10px', color: 'var(--color-dead)', letterSpacing: '0.16em' }}>KPIs</p>
                      <ul className="space-y-2">{phase.kpis.map((item) => <li key={item} style={{ color: 'var(--color-muted)' }}>• {item}</li>)}</ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 border border-border bg-surface p-5 text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.72 }}>
              The report&apos;s core recommendation is simple: make the website prove the work, not just describe it.
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
