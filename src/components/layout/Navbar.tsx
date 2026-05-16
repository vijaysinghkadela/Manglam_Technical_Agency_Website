'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import { services } from '@/lib/data/services'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useIsClient } from '@/hooks/useIsClient'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

import { useTheme } from 'next-themes'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services', hasMega: true },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/research', label: 'Research' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

// Style constants matching ThemeToggle
const getNavStyles = (isLight: boolean, scrolled: boolean) => ({
  container: {
    backgroundColor: scrolled
      ? isLight
        ? 'rgba(250, 247, 244, 0.95)'
        : 'rgba(13, 13, 14, 0.95)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
    borderBottom: scrolled ? `1px solid ${isLight ? 'rgba(107, 26, 26, 0.08)' : 'rgba(255, 255, 255, 0.06)'}` : '1px solid transparent',
    boxShadow: scrolled
      ? isLight
        ? '0 4px 30px rgba(0, 0, 0, 0.04)'
        : '0 4px 30px rgba(0, 0, 0, 0.2)'
      : 'none',
  },
  navPill: {
    backgroundColor: isLight
      ? 'rgba(107, 26, 26, 0.04)'
      : 'rgba(255, 255, 255, 0.04)',
    border: `1px solid ${isLight ? 'rgba(107, 26, 26, 0.08)' : 'rgba(255, 255, 255, 0.08)'}`,
    boxShadow: isLight
      ? '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      : '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  },
  link: {
    default: {
      backgroundColor: 'transparent',
      border: '1px solid transparent',
    },
    hover: {
      backgroundColor: isLight ? 'rgba(107, 26, 26, 0.08)' : 'rgba(255, 255, 255, 0.08)',
      borderColor: isLight ? 'rgba(107, 26, 26, 0.15)' : 'rgba(255, 255, 255, 0.15)',
    },
    active: {
      backgroundColor: isLight ? 'rgba(107, 26, 26, 0.12)' : 'rgba(255, 255, 255, 0.1)',
      borderColor: isLight ? 'rgba(107, 26, 26, 0.2)' : 'rgba(255, 255, 255, 0.2)',
    },
  },
  megaMenu: {
    backgroundColor: isLight ? 'rgba(250, 247, 244, 0.98)' : 'rgba(13, 13, 14, 0.98)',
    borderColor: isLight ? 'rgba(107, 26, 26, 0.12)' : 'rgba(255, 255, 255, 0.08)',
    boxShadow: isLight
      ? '0 25px 50px -12px rgba(107, 26, 26, 0.15), 0 0 0 1px rgba(107, 26, 26, 0.05)'
      : '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
  },
  megaItem: {
    default: {
      backgroundColor: 'transparent',
      border: '1px solid transparent',
    },
    hover: {
      backgroundColor: isLight ? 'rgba(107, 26, 26, 0.06)' : 'rgba(255, 255, 255, 0.06)',
      borderColor: isLight ? 'rgba(107, 26, 26, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    },
  },
  iconBox: {
    backgroundColor: isLight ? 'rgba(107, 26, 26, 0.08)' : 'rgba(255, 255, 255, 0.06)',
    border: `1px solid ${isLight ? 'rgba(107, 26, 26, 0.12)' : 'rgba(255, 255, 255, 0.1)'}`,
  },
  ctaButton: {
    default: {
      backgroundColor: isLight ? 'rgba(107, 26, 26, 0.08)' : 'rgba(255, 255, 255, 0.06)',
      border: `1px solid ${isLight ? 'rgba(107, 26, 26, 0.12)' : 'rgba(255, 255, 255, 0.1)'}`,
      color: isLight ? 'var(--color-violet)' : '#FFFFFF',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    },
    hover: {
      backgroundColor: isLight ? 'rgba(107, 26, 26, 0.12)' : 'rgba(255, 255, 255, 0.1)',
      borderColor: isLight ? 'rgba(107, 26, 26, 0.2)' : 'rgba(255, 255, 255, 0.2)',
      boxShadow: isLight ? '0 4px 20px rgba(107, 26, 26, 0.15)' : '0 4px 20px rgba(255, 255, 255, 0.1)',
    },
    pressed: {
      backgroundColor: isLight ? 'rgba(107, 26, 26, 0.15)' : 'rgba(255, 255, 255, 0.12)',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  },
  mobileButton: {
    default: {
      backgroundColor: isLight ? 'rgba(107, 26, 26, 0.06)' : 'rgba(255, 255, 255, 0.06)',
      border: `1px solid ${isLight ? 'rgba(107, 26, 26, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
    },
    active: {
      backgroundColor: 'var(--color-violet)',
      border: '1px solid var(--color-violet)',
    },
  },
})

export function Navbar() {
  const path = usePathname()
  const isClient = useIsClient()
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [mega, setMega] = useState(false)
  const { resolvedTheme } = useTheme()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [pressedLink, setPressedLink] = useState<string | null>(null)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [ctaPressed, setCtaPressed] = useState(false)

  const prefersReducedMotion = useReducedMotion()
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)')

  const isLight = useMemo(() => {
    if (isClient) return resolvedTheme !== 'dark'
    return true // default to light during SSR
  }, [isClient, resolvedTheme])
  const styles = useMemo(() => getNavStyles(isLight, scrolled), [isLight, scrolled])
  const logoSrc = isLight
    ? '/images/mta-logo-transparent.png'
    : '/images/mta-logo-transparent-white.png'
  const animateLogo = !prefersReducedMotion && !isTouchDevice

  // Scroll detection with RAF throttling
  useEffect(() => {
    let prev = window.scrollY > 20
    let rafId: number | null = null

    const fn = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        const next = window.scrollY > 20
        if (next !== prev) {
          prev = next
          setScrolled(next)
        }
        rafId = null
      })
    }

    window.addEventListener('scroll', fn, { passive: true })
    return () => {
      window.removeEventListener('scroll', fn)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  // Auto-close on navigation
  useEffect(() => {
    const id = setTimeout(() => {
      setMobile(false)
      setMega(false)
    }, 0)
    return () => clearTimeout(id)
  }, [path])

  // Mobile scroll lock
  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobile])

  const isActive = useCallback((link: (typeof NAV_LINKS)[0]) => {
    if (link.href === '/') return path === '/'
    if (link.href === '/blog') return path.startsWith('/blog')
    if (link.href === '/legal') return path.startsWith('/legal')
    if (link.href === '/research') return path.startsWith('/research')
    if (link.href === '/services') return path.startsWith('/services')
    return path === link.href
  }, [path])

  const getLinkStyle = (link: (typeof NAV_LINKS)[0]) => {
    const active = isActive(link)
    const hovered = hoveredLink === link.href
    const pressed = pressedLink === link.href

    return {
      backgroundColor: active
        ? styles.link.active.backgroundColor
        : pressed
          ? styles.link.hover.backgroundColor
          : hovered
            ? styles.link.hover.backgroundColor
            : styles.link.default.backgroundColor,
      borderColor: active
        ? styles.link.active.borderColor
        : pressed
          ? styles.link.hover.borderColor
          : hovered
            ? styles.link.hover.borderColor
            : styles.link.default.backgroundColor,
      boxShadow: pressed
        ? 'inset 0 2px 4px rgba(0,0,0,0.1)'
        : hovered
          ? '0 4px 12px rgba(107, 26, 26, 0.1)'
          : 'none',
      transform: pressed ? 'scale(0.98)' : 'scale(1)',
    }
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Main navbar container */}
        <div
          className="transition-all duration-500 ease-out"
          style={styles.container}
        >
          {/* Inner container */}
          <div
            className="w-full mx-auto flex items-center justify-between h-[64px] sm:h-[72px] lg:h-[80px] xl:h-[88px]"
            style={{ maxWidth: '1600px', padding: '0 clamp(1rem, 5vw, 4rem)' }}
          >
            {/* Logo */}
            <Link
              href="/"
              data-cursor="pointer"
              className="flex items-center gap-3 sm:gap-4 shrink-0 group"
            >
              <motion.div
                className="relative"
                whileHover={animateLogo ? { scale: 1.05 } : undefined}
                transition={animateLogo ? { duration: 0.2 } : { duration: 0 }}
              >
                <Image
                  src={logoSrc}
                  alt="Manglam Technical Agency"
                  width={40}
                  height={40}
                  sizes="(max-width: 640px) 36px, 40px"
                  className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
                  loading="eager"
                />
              </motion.div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-display font-black text-[14px] tracking-tight text-foreground">
                  MTA
                </span>
                <span className="font-mono uppercase text-muted text-[8px] tracking-wider">
                  Agency
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Pill Container */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
              <div
                className="flex items-center gap-1 xl:gap-1.5 px-2 py-1.5 rounded-full transition-all duration-300"
                style={styles.navPill}
              >
                {NAV_LINKS.map((link) =>
                  link.hasMega ? (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setMega(true)}
                      onMouseLeave={() => setMega(false)}
                    >
                      <motion.button
                        data-cursor="pointer"
                        onFocus={() => setMega(true)}
                        onBlur={() => setTimeout(() => setMega(false), 200)}
                        aria-label={mega ? 'Close services menu' : 'Open services menu'}
                        aria-expanded={mega}
                        aria-haspopup="true"
                        className={cn(
                          'flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200',
                          isActive(link) ? 'text-foreground' : 'text-muted'
                        )}
                        style={getLinkStyle(link)}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.label}
                        <motion.div
                          animate={{ rotate: mega ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                        </motion.div>
                      </motion.button>

                      {/* Mega Menu */}
                      <AnimatePresence>
                        {mega && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                          >
                            <div
                              className="p-5 rounded-2xl border backdrop-blur-xl"
                              style={{
                                width: '560px',
                                ...styles.megaMenu,
                              }}
                            >
                              <div className="grid grid-cols-2 gap-3">
                                {services.map((s, idx) => (
                                  <motion.div
                                    key={s.slug}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                  >
                                    <Link
                                      href={`/services/${s.slug}`}
                                      data-cursor="pointer"
                                      className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group"
                                      style={styles.megaItem.default}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.megaItem.hover.backgroundColor
                e.currentTarget.style.border = `1px solid ${styles.megaItem.hover.borderColor}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.megaItem.default.backgroundColor
                e.currentTarget.style.border = styles.megaItem.default.border
              }}
                                    >
                                      <div
                                        className="w-10 h-10 flex items-center justify-center shrink-0 rounded-xl transition-colors duration-200"
                                        style={styles.iconBox}
                                      >
                                        <s.Icon className="w-4 h-4 text-violet" />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-[13px] font-semibold text-foreground leading-tight">
                                          {s.name}
                                        </p>
                                        <p className="text-[11px] text-muted mt-1 leading-snug truncate">
                                          {s.tagline}
                                        </p>
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onMouseDown={() => setPressedLink(link.href)}
                      onMouseUp={() => setPressedLink(null)}
                    >
                      <Link
                        href={link.href}
                        data-cursor="pointer"
                        className={cn(
                          'block px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-200',
                          isActive(link) ? 'text-foreground' : 'text-muted'
                        )}
                        style={getLinkStyle(link)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2 sm:gap-3 xl:gap-4">
              {/* Get Quote Button - Styled like ThemeToggle but darker */}
              <motion.div
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => { setCtaHovered(false); setCtaPressed(false) }}
                onMouseDown={() => setCtaPressed(true)}
                onMouseUp={() => setCtaPressed(false)}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  data-cursor="pointer"
                  className="hidden sm:inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full text-[13px] font-semibold transition-all duration-300 group relative overflow-hidden"
                  style={{
                    backgroundColor: ctaPressed
                      ? isLight ? 'rgba(107, 26, 26, 0.2)' : 'rgba(124, 58, 237, 0.25)'
                      : ctaHovered
                        ? isLight ? 'rgba(107, 26, 26, 0.14)' : 'rgba(124, 58, 237, 0.18)'
                        : isLight ? 'rgba(107, 26, 26, 0.1)' : 'rgba(124, 58, 237, 0.12)',
                    border: `1px solid ${ctaPressed
                      ? isLight ? 'rgba(107, 26, 26, 0.3)' : 'rgba(124, 58, 237, 0.4)'
                      : ctaHovered
                        ? isLight ? 'rgba(107, 26, 26, 0.25)' : 'rgba(124, 58, 237, 0.35)'
                        : isLight ? 'rgba(107, 26, 26, 0.2)' : 'rgba(124, 58, 237, 0.25)'}`,
                    color: isLight ? 'var(--color-violet)' : '#FFFFFF',
                    boxShadow: ctaPressed
                      ? 'inset 0 2px 4px rgba(0,0,0,0.1)'
                      : ctaHovered
                        ? isLight ? '0 4px 20px rgba(107, 26, 26, 0.2)' : '0 4px 20px rgba(124, 58, 237, 0.25)'
                        : '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* Subtle gradient background like ThemeToggle */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    initial={false}
                    animate={{
                      background: ctaHovered
                        ? isLight
                          ? 'radial-gradient(circle at 30% 30%, rgba(107, 26, 26, 0.12), transparent 70%)'
                          : 'radial-gradient(circle at 70% 30%, rgba(124, 58, 237, 0.15), transparent 70%)'
                        : 'transparent',
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10">Get Quote</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 relative z-10" />
                </Link>
              </motion.div>

              <ThemeToggle />

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobile((v) => !v)}
                aria-label={mobile ? 'Close menu' : 'Open menu'}
                aria-expanded={mobile}
                data-cursor="pointer"
                className="lg:hidden h-11 w-11 min-w-[44px] flex items-center justify-center rounded-full transition-all duration-200"
                style={mobile ? styles.mobileButton.active : styles.mobileButton.default}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {mobile ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 text-muted" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{
              backgroundColor: isLight
                ? 'rgba(250, 247, 244, 0.98)'
                : 'rgba(13, 13, 14, 0.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span
                className="font-display font-black text-[30vw] select-none"
                style={{
                  color: isLight ? 'rgba(107, 26, 26, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                }}
              >
                MTA
              </span>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col pt-[80px] px-6">
              <div className="flex-1 overflow-y-auto">
                <nav className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobile(false)}
                        className={cn(
                          'flex items-center justify-between py-4 border-b transition-colors duration-200',
                          isActive(link)
                            ? 'text-foreground border-violet/30'
                            : 'text-muted border-border hover:text-foreground'
                        )}
                        style={{
                          borderColor: isActive(link)
                            ? 'rgba(124, 58, 237, 0.2)'
                            : isLight
                              ? 'rgba(107, 26, 26, 0.08)'
                              : 'rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <span
                          className="font-display font-black text-2xl"
                          style={{
                            color: isActive(link) ? 'var(--color-violet)' : 'var(--color-foreground)',
                          }}
                        >
                          {link.label}
                        </span>
                        {isActive(link) && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="w-2 h-2 rounded-full bg-violet"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 + 0.1 }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobile(false)}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-display font-black text-lg transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--color-violet)',
                      boxShadow: isLight
                        ? '0 8px 30px rgba(107, 26, 26, 0.3)'
                        : '0 8px 30px rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    Get a Quote
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>

              {/* Bottom info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="py-6 text-center"
              >
                <p className="font-mono text-[10px] text-muted tracking-wider uppercase">
                  Manglam Technical Agency • UDYAM-RJ-15-0094091
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
