'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { services } from '@/lib/data/services'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

const ThemeToggle = dynamic(() => import('@/components/ui/ThemeToggle'), { ssr: false })

const NAV_LINKS = [
  { href:'/',          label:'Home'                     },
  { href:'/about',     label:'About'                    },
  { href:'/services',  label:'Services', hasMega: true  },
  { href:'/portfolio', label:'Portfolio'                },
  { href:'/pricing',   label:'Pricing'                  },
  { href:'/research',  label:'Research'                 },
  { href:'/legal',     label:'Legal'                    },
  { href:'/blog',      label:'Blog'                     },
  { href:'/contact',   label:'Contact'                  },
]

export function Navbar() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [mega, setMega] = useState(false)

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Auto-close on navigation
  useEffect(() => { 
    setTimeout(() => {
      setMobile(false)
      setMega(false)
    }, 0)
  }, [path])

  // Mobile scroll lock
  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [mobile])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-100 transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(8,8,8,0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        {/* Full-width inner — 68px tall */}
        <div
          className="relative w-full mx-auto flex items-center justify-between h-[68px]"
          style={{ maxWidth:'1440px', padding:'0 clamp(1.5rem, 4vw, 3rem)' }}
        >
          {/* Logo — left */}
          <Link 
            href="/" 
            data-cursor="pointer" 
            className="flex items-center gap-3 shrink-0 z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet p-1 rounded-sm"
          >
            <Image
              src="/images/mta-logo.png"
              alt="MTA Logo"
              width={32}
              height={32}
              className="shrink-0"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-[15px] text-white tracking-tight">MTA</span>
              <span
                className="font-mono uppercase hidden sm:block text-muted"
                style={{ fontSize:'9px', letterSpacing:'0.14em' }}
              >
                Manglam Technical Agency
              </span>
            </div>
          </Link>

          {/* Nav links — ABSOLUTE CENTRE (independent of logo + CTA widths) */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(link => link.hasMega ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <button
                  data-cursor="pointer"
                  onFocus={() => setMega(true)}
                  onBlur={() => setTimeout(() => setMega(false), 200)}
                  aria-expanded={mega}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet rounded-sm',
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
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4"> {/* Hover bridge */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 gap-2 p-5 bg-surface border border-border shadow-2xl relative"
                        style={{
                          width: '560px',
                        }}
                      >
                        {services.map((s, idx) => (
                          <motion.div
                            key={s.slug}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link 
                              href={`/services/${s.slug}`}
                              data-cursor="pointer"
                              className="flex items-start gap-3 p-3 border border-transparent
                                         hover:border-border hover:bg-canvas focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet focus-visible:bg-canvas focus-visible:border-border
                                         transition-all group rounded-sm"
                            >
                              <div
                                className="w-8 h-8 flex items-center justify-center shrink-0 border border-border transition-colors group-hover:border-violet group-focus-visible:border-violet"
                              >
                                <s.Icon
                                  className="w-4 h-4 text-muted transition-colors group-hover:text-violet-light group-focus-visible:text-violet-light"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[13px] font-semibold text-white leading-tight">{s.name}</p>
                                <p
                                  className="text-[11px] mt-1 leading-snug truncate text-muted"
                                >
                                  {s.tagline}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="pointer"
                aria-current={
                  (link.href === '/blog' && path.startsWith('/blog')) ||
                  (link.href === '/legal' && path.startsWith('/legal')) ||
                  (link.href === '/research' && path.startsWith('/research')) ||
                  path === link.href
                    ? 'page'
                    : undefined
                }
                className="relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet rounded-sm"
                style={{
                  color:
                    (link.href === '/blog' && path.startsWith('/blog')) ||
                    (link.href === '/legal' && path.startsWith('/legal')) ||
                    (link.href === '/research' && path.startsWith('/research')) ||
                    path === link.href
                      ? '#FAFAFA'
                      : 'var(--color-muted)',
                }}
              >
                {link.label}
                {((link.href === '/blog' && path.startsWith('/blog')) ||
                  (link.href === '/legal' && path.startsWith('/legal')) ||
                  (link.href === '/research' && path.startsWith('/research')) ||
                  path === link.href) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-2 left-3 right-3 h-[1.5px] bg-violet origin-left"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA — right */}
          <div className="flex items-center gap-3 z-10">
            <ThemeToggle />
            <Link href="/contact" data-cursor="pointer"
              className="hidden sm:inline-flex items-center px-4 py-2 text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded-sm"
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
              aria-expanded={mobile}
              data-cursor="pointer"
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center border border-border text-muted transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded-sm"
            >
              {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-99 flex flex-col pt-[68px] overflow-hidden bg-canvas"
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

            <div className="relative flex flex-col px-6 pt-8 overflow-y-auto pb-24">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setMobile(false)}
                    aria-current={path === link.href ? 'page' : undefined}
                    className="block py-4 font-display font-black transition-colors duration-200 border-b border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded-sm"
                    style={{
                      fontSize:    '30px',
                      color:       path === link.href ? '#FAFAFA' : 'var(--color-dead)',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08 + 0.1 }}
                className="mt-8"
              >
                <Link href="/contact" onClick={() => setMobile(false)}
                  className="block w-full text-center py-4 text-white font-display font-black text-xl bg-violet transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
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
