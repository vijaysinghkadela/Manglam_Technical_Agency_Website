import { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import { Shield, Lock, FileKey2, Cpu } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Trust Center & AI Ethics | Manglam Technical Agency',
  description: 'Our commitment to DPDPA 2023, IT Act 2000, NIST CSF 2.0, and ethical AI deployment.',
}

export default function TrustCenterPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbBase="Legal"
        breadcrumbBaseHref="#"
        breadcrumbCurrent="Trust Center"
        label="GOVERNANCE & SECURITY"
        title="Built on strict accountability."
        subheading="At MTA, trust is a technical architecture, not just a promise. We align strictly with Indian regulations and global cybersecurity frameworks."
      />

      {/* Compliance Badges */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            <div>
              <h2 className="font-display font-black text-white text-2xl mb-2">Regulatory Alignment</h2>
              <p className="text-sm text-muted max-w-md">Our systems and internal processes are audited against these core frameworks.</p>
            </div>
            
            <div className="flex flex-wrap gap-4 lg:gap-8">
              {[
                { name: 'DPDPA 2023', region: 'India' },
                { name: 'IT Act 2000', region: 'India' },
                { name: 'NIST CSF 2.0', region: 'Global' },
                { name: 'ISO/IEC 27001', region: 'Global' },
              ].map(badge => (
                <div key={badge.name} className="flex items-center gap-3 p-4 border border-border bg-card">
                  <Shield className="w-5 h-5 text-violet" />
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-sm">{badge.name}</span>
                    <span className="text-[10px] font-mono text-muted uppercase tracking-widest">{badge.region}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Pillars */}
      <section className="py-28 bg-canvas">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16">
            
            <div className="flex flex-col sticky top-32 self-start">
              <span className="font-mono text-[11px] text-violet-light tracking-[0.22em] uppercase mb-4">INFRASTRUCTURE</span>
              <h2 className="font-display font-black text-white leading-[0.92] tracking-tight mb-6"
                style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
                Security Pillars
              </h2>
              <p className="text-[15px] text-muted leading-[1.7]">
                We do not compromise on security. Every server we provision, every app we deploy, and every internal account we manage adheres to zero-trust principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Lock className="w-6 h-6" />,
                  title: 'AES-256 Encryption',
                  desc: 'All data is encrypted at rest using AES-256 standard, and in transit via TLS 1.3 protocol.'
                },
                {
                  icon: <FileKey2 className="w-6 h-6" />,
                  title: 'Mandatory MFA',
                  desc: 'We enforce Time-Based One-Time Password (TOTP) or Hardware Key MFA across all client and internal portals.'
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: '72-Hour Breach Protocol',
                  desc: 'Aligned with CERT-In directives, our IR playbooks mandate critical incident notification to you within 72 hours of verification.'
                },
                {
                  icon: <Cpu className="w-6 h-6" />,
                  title: 'RBAC Enforcement',
                  desc: 'Role-Based Access Control is enforced by default. Principle of Least Privilege (PoLP) dictates all system access.'
                }
              ].map((pillar, i) => (
                <div key={i} className="p-8 border border-border bg-surface hover:border-violet/40 transition-colors">
                  <div className="w-12 h-12 bg-violet/10 flex items-center justify-center text-violet mb-6">
                    {pillar.icon}
                  </div>
                  <h3 className="font-display font-bold text-white text-[19px] mb-3">{pillar.title}</h3>
                  <p className="text-[14px] text-muted leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* AI Ethics Policy */}
      <section className="py-28 bg-surface border-t border-border">
        <div className="w-full max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="font-mono text-[11px] text-violet-light tracking-[0.22em] uppercase mb-4 block">CHAPTER 2 - MTA POLICY HANDBOOK</span>
            <h2 className="font-display font-black text-white leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              AI Ethics & Deployment
            </h2>
          </div>

          <div className="prose prose-invert prose-p:text-muted prose-p:text-[15px] prose-p:leading-[1.7] prose-headings:font-display prose-headings:text-white prose-headings:font-bold prose-h3:text-xl prose-li:text-muted max-w-none">
            
            <p className="text-lg text-white mb-8 border-l-2 border-violet pl-6">
              Artificial Intelligence is a multiplier of human capability, not a replacement for human accountability. Manglam Technical Agency adheres to the following strict guidelines when utilizing Machine Learning (ML) and Large Language Models (LLMs) in client projects.
            </p>

            <h3>1. Absolute Data Sovereignty</h3>
            <p>
              Under no circumstances do we allow client proprietary data or Personally Identifiable Information (PII) to be used to train public instances of AI models. We utilize Zero Data Retention (ZDR) endpoints exclusively (e.g., OpenAI Enterprise API) where data is explicitly partitioned.
            </p>

            <h3>2. Human-in-the-Loop (HITL) Verification</h3>
            <p>
              While we leverage AI for research, structuring, and code generation acceleration, all final deliverables—whether marketing copy, application code, or strategic briefs—are subjected to rigorous human auditing. We do not ship raw LLM outputs.
            </p>

            <h3>3. Algorithmic Transparency</h3>
            <p>
              If an automated system or LLM is making decisions or providing significant utility within a product we build for you, we will disclose that architecture during the Discovery Workshop. Your end-users deserve to know when they are interacting with an AI.
            </p>

            <h3>4. Bias and Fairness Auditing</h3>
            <p>
              We acknowledge that base foundation models carry inherent biases. For explicit AI Automation projects, we build and test RAG (Retrieval-Augmented Generation) systems against controlled, equitable datasets to minimize discriminatory outputs.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
