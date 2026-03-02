import type { Metadata } from 'next'
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'
import { Navbar }         from '@/components/layout/Navbar'
import { Footer }         from '@/components/layout/Footer'
import { MagneticCursor } from '@/components/ui/MagneticCursor'
import { ScrollToTop }    from '@/components/ui/ScrollToTop'
import { LenisProvider }  from '@/providers/LenisProvider'
import { Toaster }        from 'react-hot-toast'
import '@/styles/globals.css'

const inter     = Inter({ subsets:['latin'], variable:'--font-inter',     display:'swap' })
const syne      = Syne({ subsets:['latin'], variable:'--font-syne',       display:'swap', weight:['600','700','800'] })
const jetbrains = JetBrains_Mono({ subsets:['latin'], variable:'--font-jetbrains', display:'swap' })

export const metadata: Metadata = {
  title:       { default:'Manglam Technical Agency', template:'%s | MTA' },
  description: 'End-to-end technology services for Indian businesses — web development, AI automation, cybersecurity, and more. Based in Rajasthan.',
  metadataBase: new URL('https://manglamtechnicalagency.com'),
  openGraph: { type:'website', locale:'en_IN', siteName:'Manglam Technical Agency' },
  robots: { index:true, follow:true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"
      className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-canvas text-white font-body antialiased overflow-x-hidden">
        <LenisProvider>
          <MagneticCursor />
          <Navbar />
          <main className="w-full relative overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Toaster position="bottom-right" toastOptions={{
            style: {
              background:'#111', color:'#FAFAFA',
              border:'1px solid #1F1F1F', borderRadius:'2px',
              fontFamily:'var(--font-jetbrains)', fontSize:'12px',
            },
            success: { iconTheme: { primary:'#7C3AED', secondary:'#FAFAFA' } },
          }} />
        </LenisProvider>
      </body>
    </html>
  )
}
