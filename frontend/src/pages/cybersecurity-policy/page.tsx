import PageHero from '@/components/ui/PageHero'
import { ShieldAlert, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cybersecurity Trust Center & Policies',
  description: 'MTA legal baseline, explicit authorization, incident response SLAs, and operational policies for cybersecurity services.',
}

export default function CybersecurityPolicyPage() {
  return (
    <main className="bg-canvas min-h-screen pb-32">
      <PageHero
        breadcrumbBase="Compliance"
        breadcrumbBaseHref="#"
        breadcrumbCurrent="Cybersecurity Policy"
        label="TRUST CENTER"
        title="Cybersecurity Policies"
        subheading="Operational guidelines, SLAs, and legal baseline for our cybersecurity services."
      />

      <div className="w-full max-w-[1000px] mx-auto px-6 lg:px-12 mt-16 flex flex-col gap-12">

        {/* Section 1: Prominent Legal Baseline */}
        <section className="bg-[#111] border border-red-900/50 p-8 lg:p-12 rounded-3xl relative overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.05)]">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <ShieldAlert className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="font-display font-black text-white text-2xl lg:text-3xl">
              1. Legal Baseline & Explicit Authorisation
            </h2>
          </div>
          <p className="text-muted leading-relaxed mb-6">
            Manglam Technical Agency (MTA) operates strictly under explicit, written authorization. Active testing, vulnerability scanning, and incident response operations will only commence upon the execution of a formal, mutually signed Rules of Engagement (RoE) document and Non-Disclosure Agreement (NDA).
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "All activities comply strictly with the Information Technology Act, 2000 (India).",
              "Client must prove ownership or explicit authorization for target systems.",
              "MTA assumes no liability for downtime outside agreed testing windows.",
              "Unauthorized testing requests will be immediately declined and reported if malicious intent is suspected."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                <ShieldCheck className="w-4 h-4 mt-0.5 text-red-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4: Data Table for SLAs */}
        <section>
          <h2 className="font-display font-black text-white text-2xl mb-6">4. Incident Response SLAs</h2>
          <div className="w-full overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-black/20">
                  <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Severity Level</th>
                  <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Initial Response</th>
                  <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Update Frequency</th>
                  <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Target Resolution</th>
                </tr>
              </thead>
              <tbody className="text-sm text-white/90">
                <tr className="border-b border-border hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Critical (P1)
                  </td>
                  <td className="p-4">15 Minutes</td>
                  <td className="p-4">Every 1 Hour</td>
                  <td className="p-4">Best Effort / ASAP</td>
                </tr>
                <tr className="border-b border-border hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-orange-500" /> High (P2)
                  </td>
                  <td className="p-4">1 Hour</td>
                  <td className="p-4">Every 4 Hours</td>
                  <td className="p-4">&lt; 24 Hours</td>
                </tr>
                <tr className="border-b border-border hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" /> Medium (P3)
                  </td>
                  <td className="p-4">4 Hours</td>
                  <td className="p-4">Daily</td>
                  <td className="p-4">&lt; 3 Days</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Low (P4)
                  </td>
                  <td className="p-4">24 Hours</td>
                  <td className="p-4">Weekly</td>
                  <td className="p-4">Next Maintenance Window</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accordions for remaining sections */}
        <section className="flex flex-col gap-4">
          <h2 className="font-display font-black text-white text-2xl mb-2">Operational Guidelines</h2>
          
          <details className="group border border-border bg-surface rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-white transition-colors hover:bg-white/5" data-cursor="pointer">
              2. Categorised Scope of Services
              <span className="text-violet-light group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
            </summary>
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-border mt-2">
              <p>Our cybersecurity offerings are strictly categorized into:</p>
              <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
                <li><strong>Proactive Assurance:</strong> Vulnerability Assessments (VA), Penetration Testing (PT), and Architecture Reviews.</li>
                <li><strong>Defensive Operations:</strong> Managed Detection & Response (MDR), SIEM deployment, and continuous monitoring.</li>
                <li><strong>Reactive Response:</strong> Digital Forensics and Incident Response (DFIR) following a confirmed breach.</li>
                <li><strong>Compliance & Governance:</strong> Audits against ISO 27001, CERT-In guidelines, and the IT Act 2000.</li>
              </ul>
            </div>
          </details>

          <details className="group border border-border bg-surface rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-white transition-colors hover:bg-white/5" data-cursor="pointer">
              3. Pricing and Financial Architecture
              <span className="text-violet-light group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
            </summary>
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-border mt-2">
              <p>Pricing is transparent and modular, tied to the exact scope documented in the Statement of Work (SoW).</p>
              <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
                <li><strong>Retainer Models:</strong> Billed monthly; covers MDR and continuous monitoring.</li>
                <li><strong>Fixed-Bid Engagements:</strong> Used for point-in-time VAPT or audits. Payment milestones are strictly 50% upfront, 50% upon final report delivery.</li>
                <li><strong>Incident Response:</strong> Billed hourly under an emergency rate unless strictly covered by an active retainer SLA.</li>
              </ul>
            </div>
          </details>

          <details className="group border border-border bg-surface rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-white transition-colors hover:bg-white/5" data-cursor="pointer">
              5. Rules of Engagement and Data Handling
              <span className="text-violet-light group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
            </summary>
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-border mt-2">
              <p>Tests are executed strictly adhering to the approved RoE.</p>
              <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
                <li>No exfiltration of Personally Identifiable Information (PII) or sensitive operational data.</li>
                <li>Exploitation pauses immediately if systemic instability is observed.</li>
                <li>All client data generated or collected during assessments is stored on encrypted, offline volumes and securely destroyed 30 days post-engagement.</li>
              </ul>
            </div>
          </details>

          <details className="group border border-border bg-surface rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-white transition-colors hover:bg-white/5" data-cursor="pointer">
              6. Limitation of Liability and Termination
              <span className="text-violet-light group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
            </summary>
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-border mt-2">
              <p>While testing is designed to be non-disruptive, MTA’s liability is strictly capped at the total fee paid for the specific engagement.</p>
              <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
                <li>Either party may terminate the engagement with 15 days written notice.</li>
                <li>Immediate termination rights apply in cases of legal violation or deliberate scope deviation by the client.</li>
              </ul>
            </div>
          </details>

          <details className="group border border-border bg-surface rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-white transition-colors hover:bg-white/5" data-cursor="pointer">
              7. Technical Testing Methodology Annexure
              <span className="text-violet-light group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
            </summary>
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-border mt-2">
              <p>Our testing frameworks align with global industry standards:</p>
              <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
                <li><strong>Web Applications:</strong> OWASP Top 10 integration.</li>
                <li><strong>Infrastructure:</strong> PTES (Penetration Testing Execution Standard) and OSSTMM.</li>
                <li><strong>Red Teaming:</strong> MITRE ATT&CK framework mapping.</li>
              </ul>
            </div>
          </details>

          <details className="group border border-border bg-surface rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-white transition-colors hover:bg-white/5" data-cursor="pointer">
              8. Secure Transmission & Credential Transfer SOP
              <span className="text-violet-light group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
            </summary>
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-border mt-2">
              <p>Strict operational security (OpSec) protocols apply to all communication:</p>
              <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
                <li>Credentials must exclusively be transferred via our designated secure, self-destructing zero-knowledge channels (e.g., Bitwarden Send).</li>
                <li>Reports containing sensitive vulnerabilities are delivered over end-to-end encrypted messaging or PGP-encrypted email.</li>
              </ul>
            </div>
          </details>

          <details className="group border border-border bg-surface rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-white transition-colors hover:bg-white/5" data-cursor="pointer">
              9. Post-Incident Review (PIR) Requirements
              <span className="text-violet-light group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
            </summary>
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-border mt-2">
              <p>Following any critical incident or major engagement conclusion, a formal PIR must be documented within 5 business days.</p>
              <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
                <li>Root Cause Analysis (RCA) delivery.</li>
                <li>Timeline of attacker actions and responder containment steps.</li>
                <li>Strategic recommendations to prevent re-occurrence.</li>
              </ul>
            </div>
          </details>
        </section>

      </div>
    </main>
  )
}
