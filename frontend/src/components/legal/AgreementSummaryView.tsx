import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { AgreementSummary, documentRegistry } from '@/lib/data/legal'
import { DocumentRequestForm } from './DocumentRequestForm'

interface AgreementSummaryViewProps {
  agreement: AgreementSummary
}

export function AgreementSummaryView({ agreement }: AgreementSummaryViewProps) {
  const requestableDocs = documentRegistry.filter((item) => item.requestable)

  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbBase="Legal"
        breadcrumbBaseHref="/legal"
        breadcrumbCurrent={agreement.name}
        label="AGREEMENT SUMMARY"
        title={agreement.name}
        subheading={agreement.publicSummary}
      />

      <section className="py-20 bg-surface border-t border-border">
        <div className="container-site grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          <article className="border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="font-mono text-[11px] text-violet-light tracking-[0.18em] uppercase">{agreement.code}</span>
              <span className="font-mono text-[11px] text-muted tracking-[0.12em] uppercase">Visibility: {agreement.visibility}</span>
            </div>

            <section className="mb-8">
              <h2 className="font-display font-black text-2xl text-white mb-3">When to Use</h2>
              <p className="text-[15px] text-muted leading-[1.7]">{agreement.whenRequired}</p>
            </section>

            <section className="mb-8">
              <h2 className="font-display font-black text-2xl text-white mb-3">Primary Use</h2>
              <p className="text-[15px] text-muted leading-[1.7]">{agreement.primaryUse}</p>
            </section>

            <section className="mb-8">
              <h2 className="font-display font-black text-2xl text-white mb-4">Key Clauses</h2>
              <ul className="flex flex-col gap-3">
                {agreement.keyClauses.map((clause) => (
                  <li key={clause} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                    <span className="text-violet-light mt-0.5">→</span>
                    <span>{clause}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display font-black text-2xl text-white mb-4">Governing Laws</h2>
              <div className="flex flex-wrap gap-2">
                {agreement.governingLaws.map((law) => (
                  <span key={law} className="px-3 py-1 border border-border bg-canvas text-xs text-muted font-mono uppercase tracking-[0.1em]">
                    {law}
                  </span>
                ))}
              </div>
            </section>

            {agreement.companionAgreements.length > 0 && (
              <section>
                <h2 className="font-display font-black text-2xl text-white mb-4">Companion Agreements</h2>
                <div className="flex flex-wrap gap-2">
                  {agreement.companionAgreements.map((code) => (
                    <span key={code} className="px-3 py-1 border border-violet/30 text-xs text-violet-light font-mono uppercase tracking-[0.1em]">
                      {code}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="flex flex-col gap-6">
            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-violet-light mb-3">Access Model</p>
              <h3 className="font-display font-black text-xl text-white mb-3">Template Distribution</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Public summaries are provided here. Full templates are shared only through request-and-review workflow.
              </p>
              <Link href="/legal" className="text-sm text-violet-light hover:text-white transition-colors">
                View legal hub matrix →
              </Link>
            </div>
            <DocumentRequestForm docs={requestableDocs.map(({ id, name, notes }) => ({ id, name, notes }))} />
          </aside>
        </div>
      </section>
    </main>
  )
}
