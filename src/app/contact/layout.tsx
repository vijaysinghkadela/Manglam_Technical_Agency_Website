import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | MTA',
  description: 'Start a conversation with Manglam Technical Agency. We promise a technical engineer will read it and respond within 2-4 hours, not a salesperson.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
