import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn how the Rajasthan-based MTA team works with clients across websites, automation, security, content, and digital operations.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
