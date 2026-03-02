import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | MTA',
  description: 'We are engineers, not salespeople. Learn about our mission, values, and the 100% in-house Rajasthan team behind MTA.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
