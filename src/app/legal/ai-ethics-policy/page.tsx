import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PolicyDocumentView } from '@/components/legal/PolicyDocumentView'
import { getPolicyBySlug } from '@/lib/data/legal'

export const metadata: Metadata = {
  title: 'AI Ethics Policy',
  description: 'AI Ethics Policy for Social Media Marketing at Manglam Technical Agency.',
}

export default function AIEthicsPolicyPage() {
  const policy = getPolicyBySlug('ai-ethics-policy')
  if (!policy) {
    notFound()
  }

  return <PolicyDocumentView policy={policy} />
}
