import type { Metadata } from 'next'
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'
import { LenisProvider }  from '@/providers/LenisProvider'
import { MagneticCursor } from '@/components/ui/MagneticCursor'
import { ScrollToTop }    from '@/components/ui/ScrollToTop'
import { Navbar }         from '@/components/layout/Navbar'
import { Footer }         from '@/components/layout/Footer'
import { Toaster }        from 'react-hot-toast'
import { ThemeProvider }  from 'next-themes'
import { SpeedInsights }  from '@vercel/speed-insights/next'
import { Analytics }      from '@vercel/analytics/next'
import { JsonLd }         from '@/components/seo/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/seo/schemas'
import '@/styles/globals.css'

const inter     = Inter({ subsets:['latin'], variable:'--font-body',    display:'swap' })
const syne      = Syne({ subsets:['latin'], variable:'--font-display',  display:'swap', weight:['600','700','800'] })
const jetbrains = JetBrains_Mono({ subsets:['latin'], variable:'--font-mono', display:'swap' })

const SITE_URL = 'https://manglamtechnicalagency.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  'Manglam Technical Agency — Technology That Transforms',
    template: '%s | Manglam Technical Agency',
  },
  description:
    'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, social media, and digital operations. Based in Rajasthan since 2021.',

  keywords: [
    'web development Rajasthan',
    'web development Jaipur',
    'AI automation India',
    'cybersecurity Rajasthan',
    'digital agency Rajasthan',
    'NGO website development India',
    'social media marketing Jaipur',
    'SaaS development India',
    'n8n automation India',
    'IT services Rajasthan',
    'Manglam Technical Agency',
    'MTA technology',
  ],

  authors:   [{ name: 'Manglam Technical Agency', url: SITE_URL }],
  creator:   'Manglam Technical Agency',
  publisher: 'Manglam Technical Agency',

  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:          SITE_URL,
    siteName:    'Manglam Technical Agency',
    title:       'Manglam Technical Agency — Technology That Transforms',
    description: 'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, and more. Based in Rajasthan.',
    images: [
      {
        url:    '/opengraph-image.png',
        width:  1200,
        height: 630,
        alt:    'Manglam Technical Agency — Technology That Transforms',
        type:   'image/png',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Manglam Technical Agency — Technology That Transforms',
    description: 'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, and more.',
    images:      ['/opengraph-image.png'],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon:    '/favicon.ico',
    apple:   '/apple-icon.png',
    shortcut:'/favicon.ico',
  },

  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#7C3AED" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body suppressHydrationWarning>
        {/* Global structured data — Organisation + Website */}
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
        <LenisProvider>
          <MagneticCursor />
          <Navbar />
          <main className="w-full relative" style={{ overflowX:'hidden' }}>
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
          <ScrollToTop />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background:  'var(--color-card)',
                color:       '#FAFAFA',
                border:      '1px solid var(--color-border)',
                borderRadius:'2px',
                fontFamily:  'var(--font-mono)',
                fontSize:    '12px',
              },
              success: { iconTheme: { primary:'var(--color-violet)', secondary:'#FAFAFA' } },
            }}
          />
        </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
