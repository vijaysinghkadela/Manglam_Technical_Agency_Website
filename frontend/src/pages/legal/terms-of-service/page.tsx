import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PolicyDocumentView } from '@/components/legal/PolicyDocumentView'
import { getPolicyBySlug } from '@/lib/data/legal'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service summary for Manglam Technical Agency.',
}

export default function TermsOfServicePage() {
  const policy = getPolicyBySlug('terms-of-service')
  if (!policy) {
    notFound()
  }

  return <PolicyDocumentView policy={policy} />
}
