import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PolicyDocumentView } from '@/components/legal/PolicyDocumentView'
import { getPolicyBySlug } from '@/lib/data/legal'

export const metadata: Metadata = {
  title: 'DPDP Implementation Checklist',
  description: 'Digital Personal Data Protection Act 2023 Implementation Checklist for Manglam Technical Agency.',
  alternates: { canonical: 'https://manglamtechnicalagency.com/legal/dpdp-implementation-checklist' },
}

export default function DPDPChecklistPage() {
  const policy = getPolicyBySlug('dpdp-implementation-checklist')
  if (!policy) {
    notFound()
  }

  return <PolicyDocumentView policy={policy} />
}
