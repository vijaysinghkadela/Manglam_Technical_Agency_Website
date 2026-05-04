import type { Metadata } from "next";
import { LenisProvider } from "@/providers/LenisProvider";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@/styles/globals.css";

const SITE_URL = "https://manglamtechnicalagency.com";

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
    default: "Manglam Technical Agency — Empowering Your Digital Future",
    template: "%s | Manglam Technical Agency",
  },
  description:
    "End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, social media, and digital operations. Based in Rajasthan and Udyam-registered in 2025.",

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
    title: "Manglam Technical Agency — Empowering Your Digital Future",
    description:
      "End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, and more. Based in Rajasthan.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Manglam Technical Agency — Empowering Your Digital Future",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Manglam Technical Agency — Empowering Your Digital Future",
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
      <body className="bg-canvas text-foreground" suppressHydrationWarning>
        {/* Global structured data — Organisation + Website */}
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LenisProvider>
            <MagneticCursor />
            <Navbar />
            <main className="relative w-full overflow-x-clip">{children}</main>
            <Footer />
            <Analytics />
            <SpeedInsights />
            <ScrollToTop />
            <Toaster
              position="bottom-right"
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
                },
              }}
            />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
