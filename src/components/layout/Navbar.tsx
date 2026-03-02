'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { services } from '@/lib/data/services'
import { cn } from '@/lib/utils'

const NAV = [
  { href:'/',          label:'Home'      },
  { href:'/about',     label:'About'     },
  { href:'/services',  label:'Services', mega:true },
  { href:'/portfolio', label:'Portfolio' },
  { href:'/pricing',   label:'Pricing'   },
  { href:'/blog',      label:'Blog'      },
  { href:'/contact',   label:'Contact'   },
]

export function Navbar() {
  const path    = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobile,   setMobile]   = useState(false)
  const [mega,     setMega]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobile(false); setMega(false) }, [path])

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-100 transition-all duration-300',
        scrolled ? 'bg-canvas/88 backdrop-blur-2xl border-b border-border' : 'bg-transparent',
      )}>
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" data-cursor="pointer" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-violet flex items-center justify-center">
              <span className="text-white font-display font-black text-sm leading-none">M</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-[15px] text-white tracking-tight">MTA</span>
              <span className="text-[9px] text-muted font-mono tracking-[0.14em] uppercase hidden sm:block">
                Manglam Technical Agency
              </span>
            </div>
          </Link>

          {/* Centre links */}
          <div className="hidden lg:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {NAV.map(link => link.mega ? (
              <div key={link.href} className="relative"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <button data-cursor="pointer"
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors',
                    path.startsWith('/services') ? 'text-white' : 'text-muted hover:text-white',
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', mega && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {mega && (
                    <motion.div
                      initial={{ opacity:0, y:8 }}
                      animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y:8 }}
                      transition={{ duration:0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] bg-surface border border-border mt-1 p-5 grid grid-cols-2 gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                    >
                      {services.map(s => (
                        <Link key={s.slug} href={`/services/${s.slug}`} data-cursor="pointer"
                          className="flex items-start gap-3 p-3 hover:bg-canvas border border-transparent hover:border-border transition-all group"
                        >
                          <div className="w-8 h-8 border border-border flex items-center justify-center shrink-0 group-hover:border-violet/50 transition-colors">
                            <s.Icon className="w-4 h-4 text-muted group-hover:text-violet-light transition-colors" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-white leading-tight">{s.name}</p>
                            <p className="text-[11px] text-muted mt-0.5 leading-snug line-clamp-1">{s.tagline}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.href} href={link.href} data-cursor="pointer"
                className={cn(
                  'relative px-3 py-2 text-[13px] font-medium transition-colors group',
                  path === link.href ? 'text-white' : 'text-muted hover:text-white',
                )}
              >
                {link.label}
                <span className={cn(
                  'absolute bottom-1.5 left-3 right-3 h-[1.5px] bg-violet transition-transform origin-left duration-250',
                  path === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                )} />
              </Link>
            ))}
          </div>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/contact" data-cursor="pointer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold
                         text-violet-light border border-violet/40
                         hover:bg-violet hover:text-white hover:border-violet
                         transition-all duration-200"
            >
              Get a Quote
            </Link>
            <button onClick={() => setMobile(v => !v)}
              data-cursor="pointer" aria-label="Toggle menu"
              className="lg:hidden w-9 h-9 flex items-center justify-center border border-border
                         text-muted hover:text-white hover:border-[#333] transition-colors"
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
            className="fixed inset-0 z-99 bg-canvas flex flex-col pt-[68px] overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-display font-black text-[44vw] text-white opacity-[0.022] leading-none">
                MTA
              </span>
            </div>
            <div className="relative flex flex-col px-6 pt-8">
              {NAV.map((link, i) => (
                <motion.div key={link.href}
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay: i * 0.055, duration:0.38, ease:[0.16,1,0.3,1] }}
                >
                  <Link href={link.href} onClick={() => setMobile(false)}
                    className={cn(
                      'block py-4 text-[30px] font-display font-black border-b border-border transition-colors',
                      path === link.href ? 'text-white' : 'text-dead hover:text-white',
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: NAV.length * 0.055 }}
                className="mt-8"
              >
                <Link href="/contact" onClick={() => setMobile(false)}
                  className="block w-full text-center py-4 bg-violet text-white font-display font-black text-xl hover:bg-violet-dark transition-colors"
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
