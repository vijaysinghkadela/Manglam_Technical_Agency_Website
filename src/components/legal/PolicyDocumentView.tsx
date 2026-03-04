import PageHero from '@/components/ui/PageHero'
import { PolicyDocument } from '@/lib/data/legal'

interface PolicyDocumentViewProps {
  policy: PolicyDocument
}

export function PolicyDocumentView({ policy }: PolicyDocumentViewProps) {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbBase="Legal"
        breadcrumbBaseHref="/legal"
        breadcrumbCurrent={policy.title}
        label="POLICY DOCUMENT"
        title={policy.title}
        subheading={policy.summary}
      />

      <section className="py-20 bg-surface border-t border-border">
        <div className="container-site max-w-4xl">
          <div className="border border-border bg-card p-6 sm:p-8 lg:p-10">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-8">
              Last updated: {policy.lastUpdated}
            </p>

            <div className="space-y-8">
              {policy.sections.map((section, index) => (
                <section key={section.heading} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                  <h2 className="font-display font-black text-2xl text-white mb-3">
                    {index + 1}. {section.heading}
                  </h2>
                  <p className="text-[15px] text-muted leading-[1.75]">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
