import PageHero from '@/components/ui/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { TextReveal } from '@/components/ui/TextReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-canvas)]">
      <PageHero
        breadcrumbCurrent="Contact"
        label="GET IN TOUCH"
        title="Start a Conversation"
        subheading="Ready to build? Drop us a line. We promise a technical engineer will read it, not a salesperson."
      />

      {/* Asymmetric Split Layout Section */}
      <section className="w-full relative bg-canvas border-t border-border">
        {/* Abstract Texture */}
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] relative z-10">
            {/* Left Column: Contact Info & Typography */}
            <aside className="p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-border bg-surface flex flex-col justify-between">
              <div>
                <p className="text-[11px] text-violet font-mono tracking-[0.2em] mb-8 font-semibold uppercase">
                  Direct Line
                </p>
                
                <h2 className="text-[clamp(40px,5vw,72px)] font-display font-black text-white leading-[0.95] tracking-tight mb-8">
                  <TextReveal text="Let's Build Something Real." delay={0.1} />
                </h2>
                
                <p className="text-[15px] text-muted leading-relaxed max-w-sm mb-12">
                  We handle web development, automation, cybersecurity, and digital operations support for Indian businesses. Skip the red tape and speak directly with our engineering team.
                </p>

                <div className="flex flex-col gap-6">
                  {/* Email */}
                  <div>
                    <p className="text-[10px] text-dead font-mono tracking-[0.15em] uppercase mb-1">Email Us</p>
                    <a href="mailto:hello@manglam.tech" className="text-lg font-display font-medium text-white hover:text-violet-light transition-colors">
                      hello@manglam.tech
                    </a>
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <p className="text-[10px] text-dead font-mono tracking-[0.15em] uppercase mb-1">Call / WhatsApp</p>
                    <a href="tel:+919876543210" className="text-lg font-display font-medium text-white hover:text-violet-light transition-colors">
                      +91 98765 43210
                    </a>
                  </div>

                  {/* Office */}
                  <div>
                    <p className="text-[10px] text-dead font-mono tracking-[0.15em] uppercase mb-1">Office</p>
                    <p className="text-lg font-display font-medium text-white">Rajasthan, India</p>
                  </div>
                </div>
              </div>

              {/* Sticky bottom CTA / Response time */}
              <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.2em] text-muted uppercase">
                  Avg Response: 2-4 hrs
                </span>
                
                <MagneticButton className="w-12 h-12 bg-[#0A0A0A] border border-border rounded-full flex items-center justify-center hover:border-violet transition-colors group">
                  <span className="text-muted group-hover:text-violet-light transition-colors">↓</span>
                </MagneticButton>
              </div>
            </aside>

            {/* Right Column: Interactive Form */}
            <div className="p-8 lg:p-16 bg-canvas">
              <div className="max-w-2xl">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
