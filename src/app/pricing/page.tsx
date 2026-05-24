import { Metadata } from 'next'
import { PricingPageClient } from '@/components/pricing/PricingPageClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Pricing | Manglam Technical Agency',
  description: 'Tier-2 boutique pricing across 6 departments, 18 plans, and flexible contract terms for Indian businesses.',
  alternates: { canonical: 'https://manglamtechnicalagency.com/pricing' },
}

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }])} />
      <JsonLd schema={webPageSchema({ url: '/pricing', title: 'Pricing | Manglam Technical Agency', description: 'Tier-2 boutique pricing across 6 departments, 18 plans, and flexible contract terms for Indian businesses.' })} />
      <PricingPageClient />
    </>
  );
}
