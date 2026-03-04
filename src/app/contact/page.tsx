import PageHero from '@/components/ui/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactContent } from '@/components/contact/ContactContent'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Contact"
        label="GET IN TOUCH"
        title="Start a Conversation"
        subheading="Ready to build? Drop us a line. We promise a technical engineer will read it, not a salesperson."
      />

      {/* Asymmetric Split Layout Section */}
      <section className="w-full relative bg-canvas border-t border-border">
        {/* Abstract Texture */}
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto">
          <ContactContent formNode={<ContactForm />} />
        </div>
      </section>
    </main>
  )
}
