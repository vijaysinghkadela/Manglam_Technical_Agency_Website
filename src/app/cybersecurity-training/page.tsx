import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { Shield, Users, Award, ArrowRight, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cybersecurity Training & Workshops | Manglam Technical Agency',
  description: 'Hands-on ethical hacking workshops and DPDP compliance training for Rajasthan gyms, clinics, and SMBs.',
}

const workshopOfferings = [
  {
    icon: Shield,
    title: 'Ethical Hacking for Gym Owners',
    duration: '4 hours',
    price: '₹25,000',
    priceDetail: 'per session (up to 15 participants)',
    location: 'On-site (Nagaur, Bikaner, Jaipur) or Virtual',
    content: [
      'Live demo of real gym website exploitation',
      'OWASP Top 3 threats for fitness businesses',
      'DPDP compliance for member data',
      'Certificate of completion',
    ],
    target: 'Gym owners, trainers, admin staff',
  },
  {
    icon: Users,
    title: 'Employee Security Awareness Training',
    duration: 'Half-day (3 hours)',
    price: '₹15,000',
    priceDetail: 'per session',
    content: [
      'Phishing simulation with real examples',
      'Password security and MFA setup',
      'UPI and WhatsApp payment safety',
      'Incident reporting procedures',
    ],
    target: 'All employees handling customer data',
  },
  {
    icon: Award,
    title: 'DPDP Compliance Masterclass',
    duration: 'Full day (6 hours)',
    price: '₹35,000',
    priceDetail: 'per session',
    content: [
      'Complete DPDP Act 2023 walkthrough',
      'Breach notification timelines (24h/72h)',
      'Data Principal rights implementation',
      'Documentation templates provided',
    ],
    target: 'Business owners, compliance officers, IT managers',
  },
]

const whyMTA = [
  {
    title: 'Rajasthan-Focused',
    description: 'Local examples from Nagaur, Bikaner, Jaipur businesses',
  },
  {
    title: 'Hands-On',
    description: 'Live demonstrations, not just slides',
  },
  {
    title: 'Compliance-First',
    description: 'Every workshop includes DPDP and CERT-In guidance',
  },
  {
    title: 'Certification',
    description: 'Professional completion certificates with UDYAM registration',
  },
]

const trainingProcess = [
  {
    step: '01',
    title: 'Pre-Assessment',
    description: 'Identify your current security posture, 1 week before',
  },
  {
    step: '02',
    title: 'Customization',
    description: 'Tailor content to your industry, 2 days before',
  },
  {
    step: '03',
    title: 'Live Workshop',
    description: 'Interactive training with hands-on labs, Workshop day',
  },
  {
    step: '04',
    title: 'Post-Training Support',
    description: '30-day email support, Q&A access',
  },
]

export default function CybersecurityTrainingPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbBase="Services"
        breadcrumbBaseHref="/services"
        breadcrumbCurrent="Cybersecurity Training"
        label="SECURITY EDUCATION"
        title="Cybersecurity Training & Workshops"
        subheading="Hands-on ethical hacking education for gym owners, clinic administrators, and Rajasthan SMBs. Learn to identify threats before attackers do."
      />

      {/* Section 1: Free DPDP Gap Assessment Lead Magnet */}
      <section className="border-t border-border bg-surface">
        <div className="container-site py-16 lg:py-24">
          <div className="bg-card border border-border p-8 lg:p-12 rounded-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex-1">
                <span className="font-mono text-label tracking-[0.18em] uppercase text-violet-light block mb-4">
                  LEAD MAGNET
                </span>
                <h2 className="font-display font-black text-2xl lg:text-3xl text-white mb-4">
                  Free DPDP Compliance Gap Assessment
                </h2>
                <p className="text-muted text-base lg:text-lg leading-relaxed max-w-2xl mb-6">
                  Not sure if your gym or clinic meets DPDP Act 2023 requirements? Get a complimentary 30-minute assessment identifying your top 3 compliance gaps.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['No obligation', 'Rajasthan-specific guidance', 'Immediate action items'].map((benefit) => (
                    <span
                      key={benefit}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-canvas border border-border rounded-full text-sm text-muted"
                    >
                      <Check className="w-3.5 h-3.5 text-violet-light" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-canvas font-display font-black text-base hover:bg-violet transition-colors duration-300"
                >
                  Request Free Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Workshop Offerings */}
      <section className="border-t border-border bg-canvas">
        <div className="container-site py-16 lg:py-24">
          <div className="mb-12 lg:mb-16">
            <span className="font-mono text-label tracking-[0.22em] uppercase text-violet-light block mb-4">
              WORKSHOPS
            </span>
            <h2 className="font-display font-black text-3xl lg:text-4xl text-white">
              Training Programs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshopOfferings.map((workshop) => (
              <div
                key={workshop.title}
                className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col hover:border-violet/30 transition-colors duration-300"
              >
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-violet/35 bg-violet/8">
                      <workshop.icon className="w-5 h-5 text-violet-light" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">
                      {workshop.duration}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    {workshop.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display font-black text-2xl text-foreground">
                      {workshop.price}
                    </span>
                    <span className="text-sm text-muted">{workshop.priceDetail}</span>
                  </div>
                  {workshop.location && (
                    <p className="text-sm text-muted">{workshop.location}</p>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {workshop.content.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="text-violet-light mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <span className="text-xs text-dead font-mono uppercase tracking-wider block mb-1">
                      Target Audience
                    </span>
                    <span className="text-sm text-muted">{workshop.target}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Live Demo Preview */}
      <section className="border-t border-border bg-surface">
        <div className="container-site py-16 lg:py-24">
          <div className="bg-surface border border-border p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <span className="font-mono text-label tracking-[0.22em] uppercase text-violet-light block mb-4">
                  LIVE DEMO
                </span>
                <h2 className="font-display font-black text-2xl lg:text-3xl text-white mb-4">
                  Watch a Real Exploitation Demo
                </h2>
                <p className="text-muted text-base leading-relaxed mb-6">
                  See how we gained unauthorized access to a multi-tenant gym management system (FitNexora simulation) in under 3 minutes.
                </p>
                <div className="flex items-center gap-2 text-sm text-dead">
                  <Shield className="w-4 h-4 text-violet-light" />
                  <span>All demos use synthetic data in isolated environments. No production systems affected.</span>
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-white mb-4">Demo Highlights</h3>
                <ul className="flex flex-col gap-3">
                  {[
                    'Cross-gym data access via IDOR vulnerability',
                    'Real-time session hijacking',
                    'DPDP breach implications',
                    'Immediate remediation steps',
                  ].map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why MTA Training? */}
      <section className="border-t border-border bg-canvas">
        <div className="container-site py-16 lg:py-24">
          <div className="mb-12 lg:mb-16">
            <span className="font-mono text-label tracking-[0.22em] uppercase text-violet-light block mb-4">
              WHY MTA
            </span>
            <h2 className="font-display font-black text-3xl lg:text-4xl text-white">
              Why Choose MTA Training?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyMTA.map((item) => (
              <div key={item.title} className="bg-surface border border-border p-6">
                <h3 className="font-display font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Training Process */}
      <section className="border-t border-border bg-surface">
        <div className="container-site py-16 lg:py-24">
          <div className="mb-12 lg:mb-16">
            <span className="font-mono text-label tracking-[0.22em] uppercase text-violet-light block mb-4">
              PROCESS
            </span>
            <h2 className="font-display font-black text-3xl lg:text-4xl text-white">
              How Training Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingProcess.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-canvas border border-border p-6 h-full">
                  <span className="font-display font-black text-5xl text-violet/20 block mb-4">
                    {step.step}
                  </span>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: CTA Section */}
      <section className="border-t border-border bg-canvas">
        <div className="container-site py-16 lg:py-24">
          <div className="bg-card border border-border text-center p-10 lg:p-16">
            <h2 className="font-display font-black text-2xl lg:text-3xl text-white mb-4">
              Ready to Train Your Team?
            </h2>
            <p className="text-muted text-base lg:text-lg max-w-2xl mx-auto mb-8">
              Book a workshop or request your free DPDP gap assessment today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-canvas font-display font-black text-base hover:bg-violet transition-colors duration-300"
              >
                Schedule Training
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/cybersecurity"
                className="inline-flex items-center gap-2 px-6 py-4 border border-border text-muted font-mono text-sm hover:text-white hover:border-violet/35 transition-colors duration-300"
              >
                View VAPT Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
