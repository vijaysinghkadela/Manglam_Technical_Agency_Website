import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AgreementSummaryView } from '@/components/legal/AgreementSummaryView'
import { getAgreementBySlug } from '@/lib/data/legal'

export const metadata: Metadata = {
  title: 'NDA Template',
  description: 'Non-Disclosure Agreement summary and controlled template request workflow.',
  alternates: { canonical: 'https://manglamtechnicalagency.com/legal/nda' },
}

export default function NDAPage() {
  const agreement = getAgreementBySlug('nda')
  if (!agreement) {
    notFound()
  }

  return <AgreementSummaryView agreement={agreement} />
}
