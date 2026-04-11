import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AgreementSummaryView } from '@/components/legal/AgreementSummaryView'
import { getAgreementBySlug } from '@/lib/data/legal'

export const metadata: Metadata = {
  title: 'Master Services Agreement',
  description: 'Master Services Agreement summary and request-only template workflow.',
}

export default function MasterServicesAgreementPage() {
  const agreement = getAgreementBySlug('master-services-agreement')
  if (!agreement) {
    notFound()
  }

  return <AgreementSummaryView agreement={agreement} />
}
