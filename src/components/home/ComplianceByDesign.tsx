import Link from 'next/link'

const highlights = [
  {
    title: 'NDA Before Discovery',
    detail: 'Sensitive discovery and architecture conversations are gated by signed confidentiality controls.',
  },
  {
    title: 'Service-Specific Contract Set',
    detail: 'Each engagement route maps to required agreements and conditional DPA attachments.',
  },
  {
    title: 'Payment-Gated Delivery Progression',
    detail: 'Phase transitions are tied to milestone clearance to protect delivery continuity.',
  },
  {
    title: 'Mandatory Handover Package',
    detail: 'Final delivery includes operational runbooks, documentation, and controlled asset transfer.',
  },
]

export function ComplianceByDesign() {
  return (
    <section className="bg-surface py-12 lg:py-24 border-t border-border">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-10">
          <div>
            <p className="font-mono text-label tracking-[0.22em] uppercase text-violet-light mb-3">
              LEGAL & COMPLIANCE BY DESIGN
            </p>
            <h2 className="font-display font-black text-white tracking-tight leading-[0.92]" style={{ fontSize: 'clamp(28px, 4vw, 54px)' }}>
              Delivery that stands up in a contract review.
            </h2>
          </div>
          <div className="flex items-center gap-4 flex-wrap text-sm">
            <Link href="/research" className="text-violet-light hover:text-white transition-colors">
              Read Research →
            </Link>
            <Link href="/legal" className="text-violet-light hover:text-white transition-colors">
              Open Legal Hub →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((item) => (
            <div key={item.title} className="border border-border bg-canvas p-6">
              <h3 className="font-display font-bold text-xl text-white mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
