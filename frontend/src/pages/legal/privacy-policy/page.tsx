import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PolicyDocumentView } from '@/components/legal/PolicyDocumentView'
import { getPolicyBySlug } from '@/lib/data/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy summary for Manglam Technical Agency.',
}

export default function PrivacyPolicyPage() {
  const policy = getPolicyBySlug('privacy-policy')
  if (!policy) {
    notFound()
  }

  return <PolicyDocumentView policy={policy} />
}
