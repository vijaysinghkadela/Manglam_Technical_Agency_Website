import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | MTA',
  description: 'Transparent pricing for web development, cybersecurity, and automation. No hidden fees, no tiers nobody needs. See our exact rates.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
