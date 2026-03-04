import type { Metadata } from 'next'
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'
import { LenisProvider }  from '@/providers/LenisProvider'
import { MagneticCursor } from '@/components/ui/MagneticCursor'
import { ScrollToTop }    from '@/components/ui/ScrollToTop'
import { Navbar }         from '@/components/layout/Navbar'
import { Footer }         from '@/components/layout/Footer'
import { Toaster }        from 'react-hot-toast'
import { ThemeProvider }  from 'next-themes'
import '@/styles/globals.css'

const inter     = Inter({ subsets:['latin'], variable:'--font-body',    display:'swap' })
const syne      = Syne({ subsets:['latin'], variable:'--font-display',  display:'swap', weight:['600','700','800'] })
const jetbrains = JetBrains_Mono({ subsets:['latin'], variable:'--font-mono', display:'swap' })

export const metadata: Metadata = {
  title:        { default:'Manglam Technical Agency', template:'%s | MTA' },
  description:  'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, and more. Based in Rajasthan.',
  metadataBase: new URL('https://manglamtechnicalagency.com'),
  openGraph:    { type:'website', locale:'en_IN', siteName:'Manglam Technical Agency' },
  robots:       { index:true, follow:true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
        <LenisProvider>
          <MagneticCursor />
          <Navbar />
          <main className="w-full relative" style={{ overflowX:'hidden' }}>
            {children}
          </main>
          <Footer />
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
