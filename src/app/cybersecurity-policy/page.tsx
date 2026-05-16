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
        subheading="Operational guidelines, PTES methodology, DPDP Rule 6 compliance, and NIST CSF 2.0 alignment for cybersecurity services."
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

{/* Section 2: PTES Methodology */}
      <section className="bg-surface border border-border p-8 rounded-2xl">
        <h2 className="font-display font-black text-foreground text-2xl mb-4">
          2. Penetration Testing Execution Standard (PTES)
        </h2>
        <p className="text-muted leading-relaxed mb-6">
          MTA follows the 7-phase PTES methodology for all ethical hacking engagements. This framework ensures comprehensive coverage from pre-engagement through post-exploitation reporting.
        </p>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-black/20">
                <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Phase</th>
                <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Activity</th>
                <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Duration</th>
                <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Key Deliverable</th>
              </tr>
            </thead>
            <tbody className="text-sm text-foreground/90">
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">1. Pre-engagement</td>
                <td className="p-4">RoE signing, scope definition, authorization</td>
                <td className="p-4">1-2 days</td>
                <td className="p-4">Signed RoE with Jaipur jurisdiction</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">2. Intelligence Gathering</td>
                <td className="p-4">OSINT, passive/active reconnaissance</td>
                <td className="p-4">2-3 days</td>
                <td className="p-4">Intelligence report with asset list</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">3. Threat Modeling</td>
                <td className="p-4">DFD creation, STRIDE/LINDDUN analysis</td>
                <td className="p-4">2-3 days</td>
                <td className="p-4">Threat model diagram</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">4. Vulnerability Analysis</td>
                <td className="p-4">Scanning, manual verification, OWASP testing</td>
                <td className="p-4">3-5 days</td>
                <td className="p-4">CVSS-scored vulnerability list</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">5. Exploitation</td>
                <td className="p-4">Controlled exploitation, proof-of-concept</td>
                <td className="p-4">2-4 days</td>
                <td className="p-4">Exploitation evidence</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">6. Post-Exploitation</td>
                <td className="p-4">Pivot testing, lateral movement</td>
                <td className="p-4">1-2 days</td>
                <td className="p-4">Impact assessment</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">7. Reporting</td>
                <td className="p-4">Executive summary, technical report, retest</td>
                <td className="p-4">2-3 days</td>
                <td className="p-4">Full report + DPDP certificate</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Testing Types */}
      <section>
        <h2 className="font-display font-black text-foreground text-2xl mb-6">3. Testing Methodology Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border p-6 rounded-2xl">
            <h3 className="font-display font-bold text-foreground text-lg mb-2">Black-box</h3>
            <p className="text-muted text-sm mb-4">Zero prior knowledge (simulates external attacker)</p>
            <ul className="text-sm text-foreground/80 space-y-2">
              <li><span className="text-violet-light">Duration:</span> +20%</li>
              <li><span className="text-violet-light">Best for:</span> External perimeter testing</li>
            </ul>
          </div>
          <div className="bg-[#111] border border-[#6B1A1A]/30 p-6 rounded-lg relative">
            <div className="absolute top-0 right-0 bg-[#6B1A1A]/20 text-violet-light text-xs font-mono px-3 py-1 rounded-bl-lg">DEFAULT</div>
            <h3 className="font-display font-bold text-white text-lg mb-2 mt-2">Gray-box</h3>
            <p className="text-muted text-sm mb-4">Limited credentials and documentation</p>
            <ul className="text-sm text-white/80 space-y-2">
              <li><span className="text-violet-light">Duration:</span> Standard</li>
              <li><span className="text-violet-light">Best for:</span> Most cost-effective testing</li>
            </ul>
          </div>
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <h3 className="font-display font-bold text-foreground text-lg mb-2">White-box</h3>
            <p className="text-muted text-sm mb-4">Full source code and architecture access</p>
            <ul className="text-sm text-foreground/80 space-y-2">
              <li><span className="text-violet-light">Duration:</span> -10%</li>
              <li><span className="text-violet-light">Best for:</span> Deep in-app security review</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: DPDP Rule 6 Compliance */}
      <section className="bg-[#111] border border-[#6B1A1A]/30 p-8 rounded-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#6B1A1A]" />
        <h2 className="font-display font-black text-white text-2xl mb-4">
          4. DPDP Act 2023 Rule 6 Safeguards
        </h2>
        <p className="text-muted leading-relaxed mb-6">
          Rule 6 mandates minimum technical and organizational measures for personal data protection. Failure = up to ₹250 Crore penalty.
        </p>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-black/20">
                <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Safeguard Category</th>
                <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">Rule 6 Requirement</th>
                <th className="p-4 text-xs font-mono tracking-widest text-muted uppercase">MTA Implementation</th>
              </tr>
            </thead>
            <tbody className="text-sm text-white/90">
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">Technical Controls</td>
                <td className="p-4">Encryption, obfuscation, masking</td>
                <td className="p-4">Supabase pg_crypto, tokenisation</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">Access Control</td>
                <td className="p-4">Strict role-based access</td>
                <td className="p-4">RLS policies, MFA enforcement</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">Logging & Monitoring</td>
                <td className="p-4">Continuous logging, 1-year retention</td>
                <td className="p-4">Supabase audit triggers, 180-day retention</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">Breach Prevention</td>
                <td className="p-4">Vulnerability management</td>
                <td className="p-4">OWASP 2025 scanning, RLS compliance</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">Data Processor Obligations</td>
                <td className="p-4">Processor contracts mirror safeguards</td>
                <td className="p-4">DPA clause in every RoE</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold">Business Continuity</td>
                <td className="p-4">Backups + disaster recovery</td>
                <td className="p-4">Supabase backups, retest included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: NIST CSF 2.0 Alignment */}
      <section className="bg-surface border border-border p-8 rounded-2xl">
        <h2 className="font-display font-black text-foreground text-2xl mb-4">
          5. NIST Cybersecurity Framework 2.0
        </h2>
        <p className="text-muted leading-relaxed mb-6">
          Every VAPT report includes NIST CSF 2.0 heat-map showing compliance across 6 core functions.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-black/20 border border-border p-4 rounded-xl">
            <h3 className="font-display font-bold text-violet-light text-lg mb-1">Govern (GV)</h3>
            <p className="text-sm text-muted">Risk strategy, policy, oversight</p>
          </div>
          <div className="bg-black/20 border border-border p-4 rounded-xl">
            <h3 className="font-display font-bold text-violet-light text-lg mb-1">Identify (ID)</h3>
            <p className="text-sm text-muted">Asset management, threat modeling</p>
          </div>
          <div className="bg-black/20 border border-border p-4 rounded-xl">
            <h3 className="font-display font-bold text-violet-light text-lg mb-1">Protect (PR)</h3>
            <p className="text-sm text-muted">Access control, data security</p>
          </div>
          <div className="bg-black/20 border border-border p-4 rounded-xl">
            <h3 className="font-display font-bold text-violet-light text-lg mb-1">Detect (DE)</h3>
            <p className="text-sm text-muted">Continuous monitoring, anomalies</p>
          </div>
          <div className="bg-black/20 border border-border p-4 rounded-xl">
            <h3 className="font-display font-bold text-violet-light text-lg mb-1">Respond (RS)</h3>
            <p className="text-sm text-muted">Incident response, breach notification</p>
          </div>
          <div className="bg-black/20 border border-border p-4 rounded-xl">
            <h3 className="font-display font-bold text-violet-light text-lg mb-1">Recover (RC)</h3>
            <p className="text-sm text-muted">Resilience, backups, retest</p>
          </div>
        </div>
      </section>

      {/* Section 6: OWASP Top 10:2025 Testing */}
      <section className="bg-surface border border-border p-8 rounded-2xl">
        <h2 className="font-display font-black text-foreground text-2xl mb-4">
          6. OWASP Top 10:2025 Integration
        </h2>
        <p className="text-muted leading-relaxed mb-6">
          All web application testing aligns with the latest OWASP Top 10:2025 standard.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold">A01 Broken Access Control (IDOR, privilege escalation)</h4>
              <span className="text-red-400 text-sm font-mono">Critical</span>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold">A05 Injection (SQLi, XSS, command injection)</h4>
              <span className="text-red-400 text-sm font-mono">Critical</span>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold">A02 Security Misconfiguration</h4>
              <span className="text-orange-400 text-sm font-mono">High</span>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold">A04 Cryptographic Failures</h4>
              <span className="text-orange-400 text-sm font-mono">High</span>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold">A07 Authentication Failures</h4>
              <span className="text-orange-400 text-sm font-mono">High</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Client Case Studies */}
      <section className="bg-card border border-border p-8 rounded-2xl">
        <h2 className="font-display font-black text-foreground text-2xl mb-6">
          7. Real Client Implementations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border p-6 rounded-xl">
            <h3 className="font-display font-bold text-foreground text-lg mb-3">FitNexora (SaaS)</h3>
            <ul className="text-sm text-muted space-y-2">
              <li>• Multi-tenant Supabase RLS vulnerabilities discovered</li>
              <li>• IDOR threat on member data</li>
              <li>• DPDP Section 8(5) gap remediation</li>
            </ul>
          </div>
          <div className="bg-surface border border-border p-6 rounded-xl">
            <h3 className="font-display font-bold text-foreground text-lg mb-3">MNSS Healthcare</h3>
            <ul className="text-sm text-muted space-y-2">
              <li>• Next.js path traversal vulnerability</li>
              <li>• MongoDB patient PII exposure risk</li>
              <li>• HIPAA-aligned DPDP compliance</li>
            </ul>
          </div>
          <div className="bg-surface border border-border p-6 rounded-xl">
            <h3 className="font-display font-bold text-foreground text-lg mb-3">Doctor Appointment App</h3>
            <ul className="text-sm text-muted space-y-2">
              <li>• Weak authentication on booking API</li>
              <li>• WhatsApp phishing simulation</li>
              <li>• Consent flow testing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: Data Table for SLAs */}
      <section>
        <h2 className="font-display font-black text-foreground text-2xl mb-6">8. Incident Response SLAs</h2>
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
              <tbody className="text-sm text-foreground/90">
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

      {/* Section 9: CERT-In Compliance */}
      <section className="bg-surface border border-border p-8 rounded-2xl">
        <h2 className="font-display font-black text-foreground text-2xl mb-4">
          9. CERT-In Directions 2022
        </h2>
        <p className="text-muted leading-relaxed">
          CERT-In compliance mandatory for all body corporates with websites/apps. Includes 6-hour incident reporting, 180-day log retention in India, accurate NTP synchronization, and mandatory cooperation with CERT-In investigations.
        </p>
      </section>

      {/* Accordions for remaining sections */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display font-black text-foreground text-2xl mb-2">Operational Guidelines</h2>

        <details className="group border border-border bg-surface rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-foreground transition-colors hover:bg-white/5" data-cursor="pointer">
            10. Categorised Scope of Services
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
          <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-foreground transition-colors hover:bg-white/5" data-cursor="pointer">
            11. Pricing and Financial Architecture
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
          <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-foreground transition-colors hover:bg-white/5" data-cursor="pointer">
            12. Rules of Engagement and Data Handling
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
          <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-foreground transition-colors hover:bg-white/5" data-cursor="pointer">
            13. Limitation of Liability and Termination
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
          <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-foreground transition-colors hover:bg-white/5" data-cursor="pointer">
            14. Technical Testing Methodology Annexure
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
          <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-foreground transition-colors hover:bg-white/5" data-cursor="pointer">
            15. Secure Transmission & Credential Transfer SOP
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
          <summary className="flex items-center justify-between p-6 cursor-pointer font-display text-lg font-bold text-foreground transition-colors hover:bg-white/5" data-cursor="pointer">
            16. Post-Incident Review (PIR) Requirements
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
