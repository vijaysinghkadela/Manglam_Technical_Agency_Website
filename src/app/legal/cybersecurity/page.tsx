import PageHero from '@/components/ui/PageHero'
import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, FileText, AlertTriangle, Clock, Download, Lock, ShieldCheck, ChevronRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Cybersecurity Legal Resources',
  description: 'Rules of Engagement, DPDP breach notification templates, and CERT-In compliance documentation for ethical hacking engagements.',
  alternates: { canonical: 'https://manglamtechnicalagency.com/legal/cybersecurity' },
}

export default function CybersecurityLegalPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbBase="Legal"
        breadcrumbBaseHref="/legal"
        breadcrumbCurrent="Cybersecurity Legal"
        label="LEGAL FRAMEWORK"
        title="Cybersecurity Legal Resources"
        subheading="Plain-language legal resources for authorized security work, including rules of engagement, breach-notification templates, and CERT-In documentation."
      />

      <section className="py-20 bg-surface border-t border-border">
        <div className="container-site space-y-16">

          {/* Section 1: Critical Legal Baseline */}
          <section className="relative overflow-hidden rounded-3xl bg-card border border-red-900/50 p-8">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet" />
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-violet/20 border border-violet/40 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-violet" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-display font-black text-2xl text-foreground mb-3">Explicit Authorization Required</h2>
                <p className="text-[15px] text-muted leading-[1.75] mb-6">
                  No penetration testing begins without signed Rules of Engagement (RoE) and NDA. MTA operates strictly under IT Act 2000 with Jaipur jurisdiction.
                </p>
                <ul className="space-y-3">
                  {[
                    'Written authorization mandatory (no exceptions)',
                    'Client must prove ownership of target systems',
                    'Testing windows strictly enforced',
                    'All client data deleted within 7 days post-engagement',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-muted">
                      <ShieldCheck className="w-4 h-4 text-violet shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Document Templates */}
          <section>
            <div className="mb-8">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-violet-light block mb-2">01 / DOCUMENTS</span>
              <h2 className="font-display font-black text-3xl text-foreground">Document Templates</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Rules of Engagement */}
              <div className="group border border-border bg-card hover:border-violet/40 transition-colors rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-violet-light" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted bg-canvas px-2 py-1 rounded">MTA-ROE</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">Rules of Engagement</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    Defines scope, boundaries, and legal authorization for penetration testing.
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-dead mb-2">Includes:</p>
                    <ul className="space-y-1.5">
                      {['IP ranges and applications in scope', 'Testing windows and emergency contacts', 'Exclusions and prohibited actions', 'Data handling obligations'].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-muted">
                          <span className="w-1 h-1 rounded-full bg-violet-light" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Badge variant="subtle" size="sm">
                    Public template available on request
                  </Badge>
                </div>
              </div>

              {/* Card 2: DPDP Breach Notification Pack */}
              <div className="group border border-border bg-card hover:border-red-900/50 transition-colors rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-violet" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted bg-canvas px-2 py-1 rounded">MTA-DPDP-BREACH</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">DPDP Breach Notification Pack</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    Templates for personal data breach notifications under DPDP Act 2023.
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-dead mb-2">Includes:</p>
                    <ul className="space-y-1.5">
                      {['Data Principal notice (plain language)', 'DPB detailed report (72-hour)', 'Processor-to-Fiduciary alert (24-hour)'].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-muted">
                          <span className="w-1 h-1 rounded-full bg-violet" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet/10 border border-violet/30 text-xs font-mono text-accent">
                    <Lock className="w-3 h-3" />
                    Mandatory for all engagements
                  </span>
                </div>
              </div>

              {/* Card 3: CERT-In Compliance Addendum */}
              <div className="group border border-border bg-card hover:border-violet/40 transition-colors rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-violet-light" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted bg-canvas px-2 py-1 rounded">MTA-CERT-IN</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">CERT-In Compliance Addendum</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    Compliance with CERT-In Directions 2022 for incident reporting.
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-dead mb-2">Includes:</p>
                    <ul className="space-y-1.5">
                      {['6-hour incident reporting requirement', '180-day log retention in India', 'NTP synchronization', 'Cooperation obligations'].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-muted">
                          <span className="w-1 h-1 rounded-full bg-violet-light" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Badge variant="subtle" size="sm">
                    Required for body corporates
                  </Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: DPDP Breach Notification Timeline */}
          <section>
            <div className="mb-8">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-violet-light block mb-2">02 / TIMELINE</span>
              <h2 className="font-display font-black text-3xl text-foreground">DPDP Breach Notification Timeline</h2>
            </div>

            <div className="border border-border bg-card rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {/* Timeline connector */}
                <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-violet/30 via-violet/50 to-violet/30" />

                {[
                  {
                    step: '1',
                    title: 'Breach Detected',
                    description: 'MTA as Processor identifies breach during testing',
                    time: 'Detection',
                    icon: AlertTriangle,
                  },
                  {
                    step: '2',
                    title: '24 Hours',
                    description: 'MTA notifies Client/Fiduciary without undue delay',
                    time: '24h',
                    icon: Clock,
                  },
                  {
                    step: '3',
                    title: 'Without Undue Delay',
                    description: 'Client notifies affected Data Principals',
                    time: 'Immediate',
                    icon: Shield,
                  },
                  {
                    step: '4',
                    title: '72 Hours',
                    description: 'Client submits detailed report to DPB',
                    time: '72h',
                    icon: FileText,
                  },
                ].map((item, index) => (
                  <div key={item.step} className="relative flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative z-10 ${
                      index === 1 ? 'bg-violet/20 border-2 border-violet' : 'bg-violet/10 border border-violet/30'
                    }`}>
                      <item.icon className={`w-7 h-7 ${index === 1 ? 'text-violet' : 'text-violet-light'}`} />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-1">Step {item.step}</span>
                    <h4 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h4>
                    <p className="text-xs text-muted leading-relaxed mb-3">{item.description}</p>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wide ${
                      index === 1 ? 'bg-violet/20 text-accent' : 'bg-surface text-muted'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-violet/10 border border-violet/30">
                  <AlertTriangle className="w-5 h-5 text-violet shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Important reminder</p>
                    <p className="text-xs text-muted">DPDP penalties can be significant, so breach roles and timelines should be confirmed in each engagement.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Compliance Requirements Matrix */}
          <section>
            <div className="mb-8">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-violet-light block mb-2">03 / COMPLIANCE</span>
              <h2 className="font-display font-black text-3xl text-foreground">Compliance Requirements Matrix</h2>
            </div>

            <div className="border border-border bg-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-canvas/50">
                      <th className="text-left px-6 py-4 font-mono text-[11px] tracking-[0.14em] uppercase text-muted">Requirement</th>
                      <th className="text-left px-6 py-4 font-mono text-[11px] tracking-[0.14em] uppercase text-violet-light">DPDP Act 2023</th>
                      <th className="text-left px-6 py-4 font-mono text-[11px] tracking-[0.14em] uppercase text-violet-light">CERT-In 2022</th>
                      <th className="text-left px-6 py-4 font-mono text-[11px] tracking-[0.14em] uppercase text-violet-light">IT Act 2000</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        requirement: 'Breach Notification',
                        dpdp: '24h (Processor→Fiduciary), 72h (Fiduciary→DPB)',
                        cert: '6 hours',
                        it: 'N/A',
                      },
                      {
                        requirement: 'Log Retention',
                        dpdp: 'Reasonable period',
                        cert: '180 days',
                        it: 'As prescribed',
                      },
                      {
                        requirement: 'Data Deletion',
                        dpdp: 'Within 30 days post-termination',
                        cert: 'N/A',
                        it: 'N/A',
                      },
                      {
                        requirement: 'Encryption',
                        dpdp: 'Technical safeguard recommended',
                        cert: 'Required for sensitive data',
                        it: 'Section 43',
                      },
                    ].map((row) => (
                      <tr key={row.requirement} className="border-b border-border last:border-b-0 hover:bg-canvas/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{row.requirement}</td>
                        <td className="px-6 py-4 text-sm text-muted">{row.dpdp}</td>
                        <td className="px-6 py-4 text-sm text-muted">{row.cert}</td>
                        <td className="px-6 py-4 text-sm text-muted">{row.it}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 5: Request Documents */}
          <section className="bg-card border border-border rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
                    <Download className="w-5 h-5 text-violet-light" />
                  </div>
                  <h2 className="font-display font-black text-2xl text-foreground">Request Legal Templates</h2>
                </div>
                <p className="text-[15px] text-muted leading-[1.75] mb-6 max-w-2xl">
                  All cybersecurity legal templates are available upon request. We review each request to ensure appropriate use.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Submit request', 'MTA review', 'Template delivery', 'Pre-engagement consultation'].map((step, index) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-violet/10 border border-violet/30 flex items-center justify-center text-[10px] font-mono text-violet-light">
                        {index + 1}
                      </span>
                      <span className="text-sm text-muted">{step}</span>
                      {index < 3 && <ChevronRight className="w-4 h-4 text-dead" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet text-white font-medium text-sm hover:bg-violet-light transition-colors"
                >
                  Request Templates
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-dead mb-4">Documents Available</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'MTA-ROE Template', formats: 'Word/PDF' },
                  { name: 'MTA-DPDP-BREACH Templates', formats: 'Word/PDF' },
                  { name: 'MTA-CERT-IN Addendum', formats: 'Word/PDF' },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center gap-3 p-4 rounded-xl bg-canvas border border-border">
                    <FileText className="w-5 h-5 text-muted" />
                    <div>
                      <p className="text-sm text-foreground font-medium">{doc.name}</p>
                      <p className="text-[10px] text-dead font-mono uppercase">{doc.formats}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </section>
    </main>
  )
}
