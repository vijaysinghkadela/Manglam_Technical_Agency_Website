import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import { ResearchPageContent } from '@/components/research/ResearchPageContent'

export const metadata: Metadata = {
  title: 'Research: Collaboration, Delivery Pipeline & Legal Framework',
  description:
    'Public-safe research brief covering MTA collaboration model, lead-to-delivery pipeline, legal framework, and delivery risk controls.',
}

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Research"
        label="INTERNAL RESEARCH (PUBLIC EXCERPT)"
        title="Client Collaboration & Delivery Framework"
        subheading="A structured view of how MTA qualifies leads, executes delivery, enforces legal controls, and protects confidentiality in every engagement."
      />
      <ResearchPageContent />
    </main>
  )
}
