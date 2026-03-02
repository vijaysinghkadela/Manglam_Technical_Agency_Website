import PageHero from '@/components/ui/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Contact"
        label="GET IN TOUCH"
        title="Start a Conversation"
        subheading="Ready to build? Drop us a line. We promise a technical engineer will read it, not a salesperson."
      />

      <section className="w-full py-16 lg:py-24 bg-canvas">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <aside className="lg:col-span-2 border border-border bg-surface p-8">
              <p className="text-[11px] text-violet-400 font-mono tracking-[0.2em] uppercase mb-3">MTA</p>
              <h2 className="text-display-md text-white mb-4">Tell us what you need</h2>
              <p className="text-sm text-muted leading-relaxed">
                We handle web development, automation, cybersecurity, and digital operations support for Indian
                businesses.
              </p>
              <div className="mt-6 pt-6 border-t border-border text-xs text-muted font-mono tracking-widest uppercase">
                Response: 2-4 hours
              </div>
            </aside>

            <div className="lg:col-span-3 border border-border bg-canvas p-8 lg:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
