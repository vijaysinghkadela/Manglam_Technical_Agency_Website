import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Engineering | MTA',
  description: 'Insights on modern web architecture, business automation, and scaling digital infrastructure. No fluff, just signal.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
