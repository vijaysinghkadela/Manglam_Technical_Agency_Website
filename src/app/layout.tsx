import type { Metadata } from "next";
import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/providers/LenisProvider";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { JsonLd } from "@/components/seo/JsonLd";
import { DeferredSiteChatbot } from "@/components/chat/DeferredSiteChatbot";
import { ConsentBanner } from "@/components/ui/ConsentBanner";
import { ConsentControlledAnalytics } from "@/components/ui/ConsentControlledAnalytics";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import "@/styles/globals.css";

const SITE_URL = "https://manglamtechnicalagency.com";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: import("next").Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#090706" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Manglam Technical Agency — Practical Technology Support",
    template: "%s | Manglam Technical Agency",
  },
  description:
    "Practical technology services for Indian businesses: web development, AI automation, cybersecurity, social media, and digital operations. Based in Rajasthan.",

  keywords: [
    "web development Rajasthan",
    "web development Jaipur",
    "AI automation India",
    "cybersecurity Rajasthan",
    "digital agency Rajasthan",
    "NGO website development India",
    "social media marketing Jaipur",
    "SaaS development India",
    "n8n automation India",
    "IT services Rajasthan",
    "Manglam Technical Agency",
    "MTA technology",
  ],

  authors: [{ name: "Manglam Technical Agency", url: SITE_URL }],
  creator: "Manglam Technical Agency",
  publisher: "Manglam Technical Agency",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Manglam Technical Agency",
    title: "Manglam Technical Agency — Practical Technology Support",
    description:
      "End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, and more. Based in Rajasthan.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Manglam Technical Agency — Practical Technology Support",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Manglam Technical Agency — Practical Technology Support",
    description:
      "End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, and more.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: [
      { url: "/images/mta-logo-dark.png", sizes: "512x512", type: "image/png" },
      { url: "/images/mta-logo-64.png", sizes: "64x64", type: "image/png" },
      { url: "/images/mta-logo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/images/mta-logo-128.png", sizes: "128x128", type: "image/png" },
    ],
    shortcut: "/images/mta-logo-dark.png",
  },
  manifest: "/site.webmanifest",

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${dmSans.variable} ${jetBrainsMono.variable} bg-canvas text-foreground`}
        suppressHydrationWarning
      >
        {/* Global structured data — Organisation + Website */}
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LenisProvider>
            <ScrollProgress />
            <MagneticCursor />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold focus:outline-none"
              style={{ backgroundColor: 'var(--color-violet)', color: '#fff' }}
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="relative w-full overflow-x-clip">{children}</main>
            <Footer />
            <DeferredSiteChatbot />
            <ConsentBanner />
            <ConsentControlledAnalytics />
            <ScrollToTop />
            <Toaster
              position="bottom-left"
              toastOptions={{
                style: {
                  background: "var(--color-card)",
                  color: "var(--color-foreground)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  boxShadow: "0 18px 48px rgba(0,0,0,0.26)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                },
                success: {
                  iconTheme: {
                    primary: "var(--color-accent)",
                    secondary: "var(--color-card)",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "var(--color-violet-dark)",
                    secondary: "var(--color-card)",
                  },
                } }}
            />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
