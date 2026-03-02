'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { services } from '@/lib/data/services'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href:'/',          label:'Home'                     },
  { href:'/about',     label:'About'                    },
  { href:'/services',  label:'Services', hasMega: true  },
  { href:'/portfolio', label:'Portfolio'                },
  { href:'/pricing',   label:'Pricing'                  },
  { href:'/blog',      label:'Blog'                     },
  { href:'/contact',   label:'Contact'                  },
]

export function Navbar() {
  const path     = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobile,   setMobile]   = useState(false)
  const [mega,     setMega]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { 
    setTimeout(() => { setMobile(false); setMega(false) }, 0) 
  }, [path])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-100 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(24px)'       : 'none',
          borderBottom:    scrolled ? '1px solid var(--color-border)' : 'none',
        }}
      >
        {/* Full-width inner — 68px tall */}
        <div
          className="relative w-full mx-auto flex items-center justify-between h-[68px]"
          style={{ maxWidth:'1440px', padding:'0 clamp(1.5rem, 4vw, 3rem)' }}
        >
          {/* Logo — left */}
          <Link href="/" data-cursor="pointer" className="flex items-center gap-2.5 shrink-0 z-10">
            <div
              className="w-8 h-8 flex items-center justify-center shrink-0"
              style={{ backgroundColor:'var(--color-violet)' }}
            >
              <span className="text-white font-display font-black text-sm leading-none">M</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-[15px] text-white tracking-tight">MTA</span>
              <span
                className="font-mono uppercase hidden sm:block"
                style={{ fontSize:'9px', color:'var(--color-muted)', letterSpacing:'0.14em' }}
              >
                Manglam Technical Agency
              </span>
            </div>
          </Link>

          {/* Nav links — ABSOLUTE CENTRE (independent of logo + CTA widths) */}
          <div className="hidden lg:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(link => link.hasMega ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <button
                  data-cursor="pointer"
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 transition-colors duration-200',
                    path.startsWith('/services') ? 'text-white' : 'hover:text-white',
                  )}
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: path.startsWith('/services') ? '#FAFAFA' : 'var(--color-muted)',
                  }}
                >
                  {link.label}
                  <ChevronDown
                    className={cn('w-3 h-3 transition-transform duration-200', mega && 'rotate-180')}
                  />
                </button>

                <AnimatePresence>
                  {mega && (
                    <motion.div
                      initial={{ opacity:0, y:8 }}
                      animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y:8 }}
                      transition={{ duration:0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 grid grid-cols-2 gap-2 p-5"
                      style={{
                        width:       '560px',
                        marginTop:   '4px',
                        background:  'var(--color-surface)',
                        border:      '1px solid var(--color-border)',
                        boxShadow:   '0 24px 64px rgba(0,0,0,0.7)',
                      }}
                    >
                      {services.map(s => (
                        <Link key={s.slug} href={`/services/${s.slug}`}
                          data-cursor="pointer"
                          className="flex items-start gap-3 p-3 border border-transparent
                                     hover:border-border hover:bg-canvas
                                     transition-all group"
                        >
                          <div
                            className="w-8 h-8 flex items-center justify-center shrink-0 border transition-colors group-hover:border-violet"
                            style={{ borderColor:'var(--color-border)' }}
                          >
                            <s.Icon
                              className="w-4 h-4 transition-colors"
                              style={{ color:'var(--color-muted)' }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-white leading-tight">{s.name}</p>
                            <p
                              className="text-[11px] mt-0.5 leading-snug truncate"
                              style={{ color:'var(--color-muted)' }}
                            >
                              {s.tagline}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.href} href={link.href}
                data-cursor="pointer"
                className="relative px-3 py-2 text-[13px] font-medium transition-colors duration-200 group"
                style={{ color: path === link.href ? '#FAFAFA' : 'var(--color-muted)' }}
              >
                {link.label}
                <span
                  className="absolute bottom-1.5 left-3 right-3 h-[1.5px] bg-violet transition-transform duration-200 origin-left"
                  style={{ transform: path === link.href ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </Link>
            ))}
          </div>

          {/* CTA — right */}
          <div className="flex items-center gap-3 z-10">
            <Link href="/contact" data-cursor="pointer"
              className="hidden sm:inline-flex items-center px-4 py-2 text-[13px] font-semibold transition-all duration-200"
              style={{
                color:        'var(--color-violet-light)',
                border:       '1px solid rgba(124,58,237,0.45)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-violet)'
                ;(e.currentTarget as HTMLElement).style.color = '#FAFAFA'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--color-violet-light)'
              }}
            >
              Get a Quote
            </Link>
            <button
              onClick={() => setMobile(v => !v)}
              aria-label={mobile ? 'Close menu' : 'Open menu'}
              data-cursor="pointer"
              className="lg:hidden w-9 h-9 flex items-center justify-center border transition-colors"
              style={{ borderColor:'var(--color-border)', color:'var(--color-muted)' }}
            >
              {mobile ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-99 flex flex-col pt-[68px] overflow-hidden"
            style={{ backgroundColor:'var(--color-canvas)' }}
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span
                className="font-display font-black leading-none text-white"
                style={{ fontSize:'44vw', opacity:0.022 }}
              >
                MTA
              </span>
            </div>

            <div className="relative flex flex-col px-6 pt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href}
                  initial={{ opacity:0, y:24 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay: i * 0.06, duration:0.4, ease:[0.16,1,0.3,1] }}
                >
                  <Link href={link.href} onClick={() => setMobile(false)}
                    className="block py-4 font-display font-black transition-colors duration-200 border-b"
                    style={{
                      fontSize:    '30px',
                      color:       path === link.href ? '#FAFAFA' : 'var(--color-dead)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 }}
                className="mt-8"
              >
                <Link href="/contact" onClick={() => setMobile(false)}
                  className="block w-full text-center py-4 text-white font-display font-black text-xl transition-colors"
                  style={{ backgroundColor:'var(--color-violet)' }}
                >
                  Get a Quote →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
