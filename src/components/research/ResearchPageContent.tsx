'use client'

import Link from 'next/link'
import {
  leadToDeliveryPipeline,
  legalFrameworks,
  researchMeta,
  researchSections,
  riskMap,
} from '@/lib/data/research'

const toc = [
  { id: 'model', label: 'Agency Model' },
  { id: 'pipeline', label: 'Lead-to-Delivery Pipeline' },
  { id: 'framework', label: 'Legal Framework' },
  { id: 'risk-map', label: 'Risk Map' },
]

export function ResearchPageContent() {
  return (
    <section className="py-12 lg:py-20 bg-surface border-t border-border">
      <div className="container-site grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="lg:sticky lg:top-[120px] self-start border border-border bg-card p-5">
          <p className="font-mono text-label tracking-[0.18em] uppercase text-violet-light mb-4">Jump to Chapter</p>
          <nav className="flex flex-col gap-2 mb-6">
            {toc.map((entry) => (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className="text-sm text-muted hover:text-white transition-colors py-2 min-h-[44px] flex items-center"
              >
                {entry.label}
              </a>
            ))}
          </nav>
          <div className="h-px bg-border my-4" />
          <p className="text-xs text-muted leading-relaxed">
            {researchMeta.classification}
            <br />
            {researchMeta.version} · {researchMeta.basis}
            <br />
            {researchMeta.jurisdiction}
          </p>
        </aside>

        <div className="flex flex-col gap-10">
          <article id="model" className="border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display font-black text-3xl text-white mb-6">1. Agency Model & Client Collaboration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {researchSections.map((section) => (
                <div key={section.id} className="border border-border bg-canvas p-5">
                  <h3 className="font-display font-bold text-white text-xl mb-2">{section.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-3">{section.summary}</p>
                  <ul className="flex flex-col gap-2">
                    {section.bullets.map((item) => (
                      <li key={item} className="text-sm text-muted flex items-start gap-2 leading-relaxed">
                        <span className="text-violet-light mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article id="pipeline" className="border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display font-black text-3xl text-white mb-6">2. Complete Lead-to-Delivery Pipeline</h2>
            <div className="space-y-5">
              {leadToDeliveryPipeline.map((stage) => (
                <details key={stage.stage} className="group border border-border bg-canvas [&_summary::-webkit-details-marker]:hidden">
                  <summary className="cursor-pointer p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-label text-violet-light tracking-[0.18em] uppercase mb-1">Stage {stage.stage}</p>
                      <h3 className="font-display font-bold text-xl text-white">{stage.title}</h3>
                      <p className="text-sm text-muted mt-1">{stage.trigger}</p>
                    </div>
                    <span className="text-violet-light text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-5 border-t border-border pt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] mb-2">Actions</p>
                      <ul className="space-y-2">
                        {stage.actions.map((item) => (
                          <li key={item} className="text-sm text-muted leading-relaxed">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] mb-2">Outputs</p>
                      <ul className="space-y-2">
                        {stage.outputs.map((item) => (
                          <li key={item} className="text-sm text-muted leading-relaxed">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] mb-2">Controls</p>
                      <p className="text-sm text-muted leading-relaxed mb-3">{stage.control}</p>
                      {stage.legalInstruments.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {stage.legalInstruments.map((instrument) => (
                            <span key={instrument} className="px-2 py-1 text-[10px] border border-violet/30 text-violet-light font-mono uppercase tracking-widest">
                              {instrument}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </article>

          <article id="framework" className="border border-border bg-card p-6 sm:p-8 overflow-x-auto">
            <h2 className="font-display font-black text-3xl text-white mb-6">3. Legal & Regulatory Framework</h2>
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-border bg-canvas">
                  <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">Framework</th>
                  <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">Applies To</th>
                  <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">MTA Usage</th>
                </tr>
              </thead>
              <tbody>
                {legalFrameworks.map((framework) => (
                  <tr key={framework.framework} className="border-b border-border/70">
                    <td className="p-3 text-sm text-white font-medium">{framework.framework}</td>
                    <td className="p-3 text-sm text-muted">{framework.applicability}</td>
                    <td className="p-3 text-sm text-muted">{framework.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article id="risk-map" className="border border-border bg-card p-6 sm:p-8 overflow-x-auto">
            <h2 className="font-display font-black text-3xl text-white mb-6">4. Delivery Risk Map</h2>
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-border bg-canvas">
                  <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">Stage</th>
                  <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">Risk</th>
                  <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">Legal Exposure</th>
                  <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">Control</th>
                </tr>
              </thead>
              <tbody>
                {riskMap.map((item) => (
                  <tr key={`${item.stage}-${item.risk}`} className="border-b border-border/70">
                    <td className="p-3 text-sm text-white">{item.stage}</td>
                    <td className="p-3 text-sm text-muted">{item.risk}</td>
                    <td className="p-3 text-sm text-muted">{item.legalExposure}</td>
                    <td className="p-3 text-sm text-muted">{item.control}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 p-4 border border-violet/30 bg-violet/5">
              <p className="text-sm text-muted leading-relaxed">
                Need contract templates or implementation guidance? Visit the{' '}
                <Link href="/legal" className="text-violet-light hover:text-white transition-colors">
                  Legal Hub
                </Link>{' '}
                to request reviewed template packs.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
