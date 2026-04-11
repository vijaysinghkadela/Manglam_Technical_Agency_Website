import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AgreementSummaryView } from '@/components/legal/AgreementSummaryView'
import { agreementSummaries, getAgreementBySlug } from '@/lib/data/legal'

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const agreement = getAgreementBySlug(slug)
  if (!agreement || agreement.visibility === 'internal') {
    return { title: 'Agreement Not Found' }
  }

  return {
    title: `${agreement.name} | Legal`,
    description: agreement.publicSummary,
  }
}

export function generateStaticParams() {
  return agreementSummaries
    .filter((agreement) => agreement.visibility !== 'internal')
    .map((agreement) => ({ slug: agreement.slug }))
}

export default async function AgreementPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const agreement = getAgreementBySlug(slug)

  if (!agreement || agreement.visibility === 'internal') {
    notFound()
  }

  return <AgreementSummaryView agreement={agreement} />
}
