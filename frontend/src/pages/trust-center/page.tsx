import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { legalFrameworks } from '@/lib/data/research'

export const metadata: Metadata = {
  title: 'Trust Center & AI Ethics | Manglam Technical Agency',
  description: 'Executive summary of MTA compliance, security, and ethical AI controls with links to legal and research documentation.',
}

const operationalPillars = [
  {
    title: 'Contract-First Delivery',
    body: 'No billable execution starts before signed service agreements and required legal attachments are in place.',
  },
  {
    title: 'Data Protection by Default',
    body: 'Personal-data handling runs under documented processor controls and DPA-driven obligations.',
  },
  {
    title: 'Authorization-Gated Security Testing',
    body: 'Cyber testing proceeds only under explicit written authorization and scoped rules of engagement.',
  },
  {
    title: 'Human-Accountable AI',
    body: 'AI deployment includes human oversight, transparency obligations, and consent-aware data usage boundaries.',
  },
]

export default function TrustCenterPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbBase="Home"
        breadcrumbBaseHref="/"
        breadcrumbCurrent="Trust Center"
        label="GOVERNANCE & SECURITY"
        title="Trust Is an Operating System"
        subheading="This page is the executive layer. Detailed pipeline, legal matrices, and template-access workflow live in Research and Legal hub pages."
      />

      <section className="py-12 lg:py-20 bg-surface border-t border-border">
        <div className="container-site grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
          <article className="border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display font-black text-3xl text-white mb-6">Operational Pillars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {operationalPillars.map((pillar) => (
                <div key={pillar.title} className="border border-border bg-canvas p-5">
                  <h3 className="font-display font-bold text-white text-xl mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-label tracking-[0.18em] uppercase text-violet-light mb-3">Explore Depth</p>
            <h3 className="font-display font-black text-2xl text-white mb-4">Documentation Layers</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/research" className="text-violet-light hover:text-white transition-colors py-2 min-h-[44px] flex items-center">
                Research: lead-to-delivery pipeline & risk map →
              </Link>
              <Link href="/legal" className="text-violet-light hover:text-white transition-colors py-2 min-h-[44px] flex items-center">
                Legal Hub: agreements, applicability matrix, request workflow →
              </Link>
              <Link href="/legal/privacy-policy" className="text-violet-light hover:text-white transition-colors py-2 min-h-[44px] flex items-center">
                Privacy Policy →
              </Link>
              <Link href="/legal/terms-of-service" className="text-violet-light hover:text-white transition-colors py-2 min-h-[44px] flex items-center">
                Terms of Service →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-canvas border-t border-border">
        <div className="container-site">
          <h2 className="font-display font-black text-3xl text-white mb-6">Regulatory Alignment Snapshot</h2>
          <div className="overflow-x-auto border border-border bg-card">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left p-3 text-xs font-mono uppercase tracking-[0.14em] text-muted">Framework</th>
                  <th className="text-left p-3 text-xs font-mono uppercase tracking-[0.14em] text-muted">Scope</th>
                  <th className="text-left p-3 text-xs font-mono uppercase tracking-[0.14em] text-muted">Usage</th>
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
          </div>
        </div>
      </section>
    </main>
  )
}
