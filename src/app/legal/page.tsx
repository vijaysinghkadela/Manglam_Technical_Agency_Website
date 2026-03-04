import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import {
  agreementApplicabilityMatrix,
  agreementSummaries,
  documentRegistry,
  policyDocuments,
} from '@/lib/data/legal'
import { DocumentRequestForm } from '@/components/legal/DocumentRequestForm'

export const metadata: Metadata = {
  title: 'Legal Hub',
  description:
    'Agreement summaries, service applicability matrix, and controlled request workflow for legal templates used by MTA.',
}

export default function LegalHubPage() {
  const requestableDocs = documentRegistry.filter((item) => item.requestable)
  const visibleAgreements = agreementSummaries.filter((agreement) => agreement.visibility !== 'internal')

  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Legal"
        label="LEGAL & COMPLIANCE"
        title="Legal Hub"
        subheading="Agreement summaries, applicability matrix, and request-only template access designed for client-safe transparency."
      />

      <section className="py-20 bg-surface border-t border-border">
        <div className="container-site grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          <div className="flex flex-col gap-8">
            <article className="border border-border bg-card p-6 sm:p-8">
              <h2 className="font-display font-black text-3xl text-white mb-6">Agreement Catalog</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleAgreements.map((agreement) => (
                  <Link
                    key={agreement.slug}
                    href={`/legal/agreements/${agreement.slug}`}
                    className="border border-border bg-canvas p-4 hover:border-violet/40 transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-violet-light mb-2">{agreement.code}</p>
                    <h3 className="font-display font-bold text-white text-lg leading-tight mb-2">{agreement.name}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-3">{agreement.publicSummary}</p>
                    <p className="text-xs text-muted uppercase tracking-[0.12em]">
                      {agreement.requestable ? 'Requestable Template' : 'Summary Only'}
                    </p>
                  </Link>
                ))}
              </div>
            </article>

            <article className="border border-border bg-card p-6 sm:p-8 overflow-x-auto">
              <h2 className="font-display font-black text-3xl text-white mb-6">Service Applicability Matrix</h2>
              <table className="w-full min-w-[720px] border-collapse">
                <thead>
                  <tr className="border-b border-border bg-canvas">
                    <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">Service</th>
                    <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">Required</th>
                    <th className="text-left p-3 text-xs font-mono tracking-[0.14em] uppercase text-muted">Conditional</th>
                  </tr>
                </thead>
                <tbody>
                  {agreementApplicabilityMatrix.map((row) => (
                    <tr key={row.service} className="border-b border-border/70">
                      <td className="p-3 text-sm text-white font-medium">{row.service}</td>
                      <td className="p-3 text-sm text-muted">{row.required.join(', ')}</td>
                      <td className="p-3 text-sm text-muted">{row.conditional.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="border border-border bg-card p-6 sm:p-8">
              <h2 className="font-display font-black text-3xl text-white mb-6">Policy Documents</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {policyDocuments.map((policy) => (
                  <Link
                    key={policy.slug}
                    href={`/legal/${policy.slug}`}
                    className="border border-border bg-canvas p-4 hover:border-violet/40 transition-colors"
                  >
                    <h3 className="font-display font-bold text-white text-lg mb-1">{policy.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-2">{policy.summary}</p>
                    <p className="text-xs text-muted uppercase tracking-[0.12em]">Last updated: {policy.lastUpdated}</p>
                  </Link>
                ))}
              </div>
            </article>
          </div>

          <aside>
            <DocumentRequestForm docs={requestableDocs.map(({ id, name, notes }) => ({ id, name, notes }))} />
          </aside>
        </div>
      </section>
    </main>
  )
}
