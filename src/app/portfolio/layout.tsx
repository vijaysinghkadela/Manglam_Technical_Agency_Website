import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | MTA Portfolio',
  description: 'Explore our recent web development, cybersecurity, and automation case studies. Built in Rajasthan, delivered globally.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
