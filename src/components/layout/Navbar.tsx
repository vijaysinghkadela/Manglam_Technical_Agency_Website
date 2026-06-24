'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
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
  { href: '/contact', label: 'Contact' },
]

// Style constants matching ThemeToggle
const getNavStyles = (isLight: boolean, scrolled: boolean) => ({
  container: {
    backgroundColor: scrolled
      ? isLight
        ? 'rgba(248, 246, 244, 0.74)'
        : 'rgba(9, 7, 6, 0.72)'
      : isLight
        ? 'rgba(248, 246, 244, 0.50)'
        : 'rgba(9, 7, 6, 0.54)',
    backdropFilter: 'blur(18px) saturate(170%)',
    WebkitBackdropFilter: 'blur(18px) saturate(170%)',
    borderBottom: `1px solid ${isLight ? 'rgba(var(--color-accent-rgb), 0.12)' : 'rgba(255, 255, 255, 0.10)'}`,
    boxShadow: scrolled
      ? isLight
        ? '0 14px 40px rgba(26, 20, 18, 0.08), inset 0 1px 0 rgba(255,255,255,0.72)'
        : '0 14px 40px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.08)'
      : isLight
        ? '0 10px 32px rgba(26, 20, 18, 0.04), inset 0 1px 0 rgba(255,255,255,0.56)'
        : '0 10px 32px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  navPill: {
    backgroundColor: isLight
      ? 'rgba(255, 255, 255, 0.46)'
      : 'rgba(255, 255, 255, 0.07)',
    border: `1px solid ${isLight ? 'rgba(var(--color-accent-rgb), 0.14)' : 'rgba(255, 255, 255, 0.12)'}`,
    backdropFilter: 'blur(16px) saturate(160%)',
    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
    boxShadow: isLight
      ? '0 8px 24px rgba(26, 20, 18, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.76)'
      : '0 8px 24px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
  },
  link: {
    default: {
      backgroundColor: 'transparent',
      border: '1px solid transparent',
    },
    hover: {
      backgroundColor: isLight ? 'rgba(var(--color-accent-rgb), 0.08)' : 'rgba(255, 255, 255, 0.08)',
      borderColor: isLight ? 'rgba(var(--color-accent-rgb), 0.15)' : 'rgba(255, 255, 255, 0.15)',
    },
    active: {
      backgroundColor: isLight ? 'rgba(var(--color-accent-rgb), 0.12)' : 'rgba(255, 255, 255, 0.1)',
      borderColor: isLight ? 'rgba(var(--color-accent-rgb), 0.2)' : 'rgba(255, 255, 255, 0.2)',
    },
  },
  megaMenu: {
    backgroundColor: isLight ? 'rgba(248, 246, 244, 0.82)' : 'rgba(13, 13, 14, 0.82)',
    borderColor: isLight ? 'rgba(var(--color-accent-rgb), 0.16)' : 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(22px) saturate(170%)',
    WebkitBackdropFilter: 'blur(22px) saturate(170%)',
    boxShadow: isLight
      ? '0 25px 60px -18px rgba(var(--color-accent-rgb), 0.20), 0 0 0 1px rgba(var(--color-accent-rgb), 0.06)'
      : '0 25px 60px -18px rgba(0, 0, 0, 0.58), 0 0 0 1px rgba(255, 255, 255, 0.06)',
  },
  megaItem: {
    default: {
      backgroundColor: 'transparent',
      border: '1px solid transparent',
    },
    hover: {
      backgroundColor: isLight ? 'rgba(var(--color-accent-rgb), 0.06)' : 'rgba(255, 255, 255, 0.06)',
      borderColor: isLight ? 'rgba(var(--color-accent-rgb), 0.1)' : 'rgba(255, 255, 255, 0.1)',
    },
  },
  iconBox: {
    backgroundColor: isLight ? 'rgba(var(--color-accent-rgb), 0.08)' : 'rgba(255, 255, 255, 0.06)',
    border: `1px solid ${isLight ? 'rgba(var(--color-accent-rgb), 0.12)' : 'rgba(255, 255, 255, 0.1)'}`,
  },

  mobileButton: {
    default: {
      backgroundColor: isLight ? 'rgba(255,255,255,0.48)' : 'rgba(255, 255, 255, 0.08)',
      border: `1px solid ${isLight ? 'rgba(var(--color-accent-rgb), 0.16)' : 'rgba(255, 255, 255, 0.12)'}`,
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
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
  const servicesMenuRef = useRef<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [mega, setMega] = useState(false)
  const { resolvedTheme } = useTheme()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [pressedLink, setPressedLink] = useState<string | null>(null)

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
  const servicesMenuId = 'services-menu'

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

  // Escape key closes mobile menu and mega menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobile) setMobile(false)
        if (mega) setMega(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobile, mega])

  // Close the services menu when clicking outside it.
  useEffect(() => {
    if (!mega) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!servicesMenuRef.current?.contains(event.target as Node)) {
        setMega(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [mega])

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
    if (link.href === '/legal') return path.startsWith('/legal')
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
          ? '0 4px 12px rgba(var(--color-accent-rgb), 0.1)'
          : 'none',
      transform: pressed ? 'scale(0.98)' : 'scale(1)',
    }
  }

  return (
    <>
      <motion.nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-[160]"
        initial={false}
      >
        {/* Main navbar container */}
        <div
          className="transition-all duration-500 ease-out"
          style={styles.container}
        >
          {/* Inner container */}
          <div
            className="w-full mx-auto flex items-center justify-between h-[72px] sm:h-[80px] lg:h-[88px] xl:h-[96px]"
            style={{ maxWidth: '1440px', padding: '0 clamp(1.1rem, 4vw, 3.5rem)' }}
          >
            {/* Logo */}
            <Link
              href="/"
              data-cursor="pointer"
              className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group rounded-full border border-border/70 bg-card/60 px-3 py-2 sm:px-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-md transition-all duration-300 hover:border-violet/30 hover:bg-card/80 hover:shadow-[0_14px_36px_rgba(var(--color-accent-rgb),0.12)]"
            >
              <motion.div
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-canvas/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:h-11 sm:w-11"
                whileHover={animateLogo ? { scale: 1.05 } : undefined}
                transition={animateLogo ? { duration: 0.2 } : { duration: 0 }}
              >
                <Image
                  src={logoSrc}
                  alt="Manglam Technical Agency"
                  width={40}
                  height={40}
                  sizes="(max-width: 640px) 36px, 40px"
                  className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
                  loading="eager"
                />
              </motion.div>
              <div className="hidden sm:flex flex-col gap-0.5 pr-1 leading-none">
                <span
                  className="font-display font-black text-[14px] tracking-normal text-foreground xl:text-[15px]"
                  style={{ textShadow: isLight ? '0 1px 0 rgba(255,255,255,0.72)' : '0 1px 10px rgba(0,0,0,0.55)' }}
                >
                  <span className="xl:hidden">MTA</span>
                  <span className="hidden xl:inline">Manglam Technical</span>
                </span>
                <span
                  className="font-mono uppercase text-muted text-[8px] tracking-[0.22em] xl:text-[9px]"
                  style={{ textShadow: isLight ? '0 1px 0 rgba(255,255,255,0.72)' : '0 1px 10px rgba(0,0,0,0.55)' }}
                >
                  Agency
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Pill Container */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
              <div
                className="flex items-center gap-1.5 xl:gap-2 px-2.5 py-2 rounded-full transition-all duration-300"
                style={styles.navPill}
              >
                {NAV_LINKS.map((link) =>
                  link.hasMega ? (
                    <div
                      key={link.href}
                      ref={servicesMenuRef}
                      className="relative"
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <motion.button
                        data-cursor="pointer"
                        onClick={() => setMega((open) => !open)}
                        onKeyDown={(event) => {
                          if (event.key === 'ArrowDown') {
                            event.preventDefault()
                            setMega(true)
                            window.setTimeout(() => {
                              servicesMenuRef.current
                                ?.querySelector<HTMLElement>('[role="menuitem"]')
                                ?.focus()
                            }, 0)
                          }
                        }}
                        aria-label={mega ? 'Close services menu' : 'Open services menu'}
                        aria-expanded={mega}
                        aria-haspopup="menu"
                        aria-controls={servicesMenuId}
                        className={cn(
                          'flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
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
                            id={servicesMenuId}
                            role="menu"
                            aria-label="Services"
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
                                ...styles.megaMenu }}
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
                                      role="menuitem"
                                      onClick={() => setMega(false)}
                                      data-cursor="pointer"
                                      className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group hover:bg-[rgba(var(--color-accent-rgb),0.06)] dark:hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(var(--color-accent-rgb),0.1)] dark:hover:border-[rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                                      style={styles.megaItem.default}
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
                          'block px-4 py-2.5 text-[13px] font-semibold rounded-full transition-all duration-200',
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
            <div className="flex items-center gap-3 sm:gap-3.5 xl:gap-4">
              <ThemeToggle />

              <button
                type="button"
                popoverTarget="mobile-nav-popover"
                aria-label="Open menu"
                data-cursor="pointer"
                className="lg:hidden h-11 w-11 min-w-[44px] flex items-center justify-center rounded-full transition-all duration-200"
                style={styles.mobileButton.default}
              >
                <Menu className="w-5 h-5 text-muted" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div
        id="mobile-nav-popover"
        popover="auto"
        className="mta-mobile-popover fixed inset-0 z-[220] hidden overflow-hidden border-0 p-0 lg:hidden"
        style={{
          backgroundColor: isLight
            ? 'rgb(250, 247, 244)'
            : 'rgb(13, 13, 14)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-display font-black text-[30vw] select-none"
            style={{
              color: isLight ? 'rgba(var(--color-accent-rgb), 0.03)' : 'rgba(255, 255, 255, 0.02)' }}
          >
            MTA
          </span>
        </div>

        <div
          className="relative h-full flex flex-col"
          style={{ padding: '104px 24px 0' }}
        >
          <button
            type="button"
            popoverTarget="mobile-nav-popover"
            popoverTargetAction="hide"
            aria-label="Close menu"
            className="absolute right-6 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-violet text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex-1 overflow-y-auto">
            <nav aria-label="Mobile navigation" className="space-y-2">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center justify-between border transition-colors duration-200',
                      isActive(link)
                        ? 'text-foreground border-violet/30'
                        : 'text-muted border-border hover:text-foreground'
                    )}
                    style={{
                      borderRadius: '18px',
                      padding: '14px 20px',
                      borderColor: isActive(link)
                        ? 'rgba(var(--color-accent-rgb), 0.2)'
                        : isLight
                          ? 'rgba(var(--color-accent-rgb), 0.08)'
                          : 'rgba(255, 255, 255, 0.06)' }}
                  >
                    <span
                      className="font-display font-black text-xl"
                      style={{
                        color: isActive(link) ? 'var(--color-violet)' : 'var(--color-foreground)' }}
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
                </div>
              ))}
            </nav>
          </div>

          <div className="py-6 text-center">
            <p className="font-mono text-[10px] text-muted tracking-wider uppercase">
              Manglam Technical Agency • Bikaner, Rajasthan
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
