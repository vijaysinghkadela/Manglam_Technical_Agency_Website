import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Start a conversation with Manglam Technical Agency. A technical team member will read your note and respond within 2-4 hours during business hours.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
