import type { Metadata } from 'next'
import { ContactContent } from '@/components/contact/ContactContent'
import { ContactForm }    from '@/components/contact/ContactForm'
import { JsonLd }         from '@/components/seo/JsonLd'
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Contact Us — Start a Project',
  description:
    'Ready to build? Drop us a line. MTA engineers respond within 2–4 hours, Mon–Sat 9AM–7PM IST. Web development, AI automation, cybersecurity — Rajasthan.',
  keywords: ['contact digital agency Rajasthan', 'hire web developer Jaipur', 'get a quote AI automation', 'cybersecurity consultation India'],
  openGraph: {
    title:       'Contact Manglam Technical Agency — Start a Project',
    description: 'Ready to build? Engineers respond within 2–4 hours. Web development, AI automation, cybersecurity.',
    type:        'website',
  },
  alternates: { canonical: 'https://manglamtechnicalagency.com/contact' },
}

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])} />
      <JsonLd schema={webPageSchema({ url: '/contact', title: 'Contact Manglam Technical Agency', description: 'Get in touch with MTA engineers. Web development, AI automation, cybersecurity projects — Rajasthan.' })} />
      <ContactContent formNode={<ContactForm />} />
    </main>
  )
}
