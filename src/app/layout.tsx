import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QuoteModal from '@/components/layout/QuoteModal';
import MagneticCursor from '@/components/ui/MagneticCursor';
import ScrollToTop from '@/components/ui/ScrollToTop';
import LenisProvider from '@/providers/LenisProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://manglamtechnicalagency.com'),
  title: {
    default: 'Manglam Technical Agency | Technology That Transforms',
    template: '%s | Manglam Technical Agency',
  },
  description:
    'Manglam Technical Agency (MTA) — a Rajasthan-based IT agency delivering web development, social media marketing, cybersecurity, AI automation, SaaS licensing, data processing, and contractor management services.',
  keywords: [
    'manglam technical agency',
    'web development rajasthan',
    'IT agency india',
    'social media marketing',
    'cybersecurity services',
    'AI automation',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Manglam Technical Agency',
    title: 'Manglam Technical Agency | Technology That Transforms',
    description:
      'Rajasthan-based IT agency delivering web development, cybersecurity, AI automation, and more.',
    url: 'https://manglamtechnicalagency.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manglam Technical Agency',
    description: 'Technology That Transforms — Web Dev, Cybersecurity, AI Automation & More',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-canvas text-white font-body antialiased">
        <LenisProvider>
          <Navbar />
          <main className="w-full">{children}</main>
          <Footer />
          <QuoteModal />
          <MagneticCursor />
          <ScrollToTop />
          <Toaster position="bottom-right" />
        </LenisProvider>
      </body>
    </html>
  );
}
