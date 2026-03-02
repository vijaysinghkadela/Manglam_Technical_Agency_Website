import { ContactForm } from '@/components/contact/ContactForm'

export function ContactContent() {
  return (
    <section className="w-full pb-20 lg:pb-28 bg-canvas">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 border border-border bg-surface p-8">
            <p className="text-[11px] text-violet-400 font-mono tracking-[0.2em] uppercase mb-4">Contact</p>
            <h2 className="text-display-md text-white mb-4">Let&apos;s Build Together</h2>
            <p className="text-sm text-muted leading-relaxed">
              Share your project goals and constraints. A technical team member from MTA will respond within 2–4
              hours.
            </p>
          </div>
          <div className="lg:col-span-3 border border-border bg-canvas p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactContent
