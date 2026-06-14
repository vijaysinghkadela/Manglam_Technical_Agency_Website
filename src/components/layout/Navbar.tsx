'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, MessageCircle, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useIsClient } from '@/hooks/useIsClient'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { services } from '@/lib/data/services'
import { AGENCY_WHATSAPP } from '@/lib/constants'

const NAV_LINKS = [
  { id: 'home', href: '/#home', label: 'Home' },
  { id: 'about', href: '/#about', label: 'About' },
  { id: 'services', href: '/#services', label: 'Services', hasMega: true },
  { id: 'portfolio', href: '/#portfolio', label: 'Portfolio' },
  { id: 'contact', href: '/#contact', label: 'Contact' },
]

const getNavStyles = (isLight: boolean, scrolled: boolean) => ({
  container: {
    // Glass handled by CSS class `glass-nav`
  },
  navPill: {
    // Glass handled by CSS class `glass-strong`
    boxShadow: scrolled
      ? '0 18px 48px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.74)'
      : '0 12px 34px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.70)',
  },
  link: {
    default: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    hover: {
      backgroundColor: isLight ? 'rgba(255, 255, 255, 0.54)' : 'rgba(255, 255, 255, 0.08)',
      borderColor: isLight ? 'rgba(255, 255, 255, 0.82)' : 'rgba(255, 255, 255, 0.16)',
    },
    active: {
      backgroundColor: isLight ? 'rgba(255, 255, 255, 0.62)' : 'rgba(255, 255, 255, 0.12)',
      borderColor: isLight ? 'rgba(31, 122, 122, 0.34)' : 'rgba(255, 255, 255, 0.22)',
    },
  },
  mobileButton: {
    default: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.76), rgba(255,255,255,0.36))',
      border: `1px solid ${isLight ? 'rgba(255,255,255,0.86)' : 'rgba(255, 255, 255, 0.14)'}`,
      boxShadow: '0 12px 28px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.90)',
    },
    active: {
      background: 'linear-gradient(135deg, rgba(23,21,18,0.98), rgba(31,122,122,0.88))',
      border: '1px solid rgba(255,255,255,0.42)',
      boxShadow: '0 12px 28px rgba(23,21,18,0.18), inset 0 1px 0 rgba(255,255,255,0.22)',
    },
  },
})

export function Navbar() {
  const isClient = useIsClient()
  const pathname = usePathname()
  const servicesMenuRef = useRef<HTMLDivElement | null>(null)
  const serviceItemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const closeServicesTimerRef = useRef<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [pressedLink, setPressedLink] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)')

  const isLight = true
  const styles = useMemo(() => getNavStyles(isLight, scrolled), [isLight, scrolled])
  const logoSrc = '/images/mta-logo-transparent.png'
  const animateLogo = !prefersReducedMotion && !isTouchDevice
  const servicesMenuId = 'services-menu'
  const mobileServicesMenuId = 'mobile-services-menu'

  const clearServicesCloseTimer = () => {
    if (closeServicesTimerRef.current !== null) {
      window.clearTimeout(closeServicesTimerRef.current)
      closeServicesTimerRef.current = null
    }
  }

  const openServicesMenu = () => {
    clearServicesCloseTimer()
    setHoveredLink('services')
    setServicesOpen(true)
  }

  const scheduleServicesClose = () => {
    clearServicesCloseTimer()
    closeServicesTimerRef.current = window.setTimeout(() => {
      setHoveredLink(null)
      setServicesOpen(false)
      closeServicesTimerRef.current = null
    }, 140)
  }

  useEffect(() => {
    let prev = window.scrollY > 80
    let rafId: number | null = null

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        const next = window.scrollY > 80
        if (next !== prev) {
          prev = next
          setScrolled(next)
        }
        rafId = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace('#', '')
      if (NAV_LINKS.some((link) => link.id === id)) setActiveSection(id)
    }

    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const targets = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (section): section is HTMLElement => Boolean(section),
    )
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.08, 0.16, 0.32, 0.5] },
    )

    targets.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobile(false)
        setServicesOpen(false)
        setHoveredLink(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!servicesOpen) return

    const handleOutsidePress = (event: Event) => {
      if (!servicesMenuRef.current?.contains(event.target as Node)) {
        clearServicesCloseTimer()
        setHoveredLink(null)
        setServicesOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsidePress)
    return () => document.removeEventListener('pointerdown', handleOutsidePress)
  }, [servicesOpen])

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobile])

  useEffect(() => {
    return () => clearServicesCloseTimer()
  }, [])

  const getLinkStyle = (id: string) => {
    const active = id === 'services' ? activeSection === id || pathname.startsWith('/services') : activeSection === id
    const hovered = hoveredLink === id
    const pressed = pressedLink === id

    return {
      backgroundColor: active
        ? styles.link.active.backgroundColor
        : pressed || hovered
          ? styles.link.hover.backgroundColor
          : styles.link.default.backgroundColor,
      borderColor: active
        ? styles.link.active.borderColor
        : pressed || hovered
          ? styles.link.hover.borderColor
          : styles.link.default.borderColor,
      boxShadow: pressed
        ? 'inset 0 2px 4px rgba(0,0,0,0.1)'
        : hovered
          ? '0 12px 28px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.78)'
          : active
            ? '0 8px 22px rgba(31,122,122,0.10), inset 0 1px 0 rgba(255,255,255,0.86)'
            : 'none',
      backdropFilter: active || hovered || pressed ? 'blur(18px) saturate(180%)' : undefined,
      WebkitBackdropFilter: active || hovered || pressed ? 'blur(18px) saturate(180%)' : undefined,
      transform: pressed ? 'scale(0.98)' : 'scale(1)',
    }
  }

  const focusServiceItem = (index: number) => {
    serviceItemRefs.current[index]?.focus()
  }

  const handleServicesKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openServicesMenu()
      window.setTimeout(() => focusServiceItem(0), 0)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      clearServicesCloseTimer()
      setHoveredLink(null)
      setServicesOpen(false)
    }
  }

  const handleServicesMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = serviceItemRefs.current.filter(Boolean)
    const currentIndex = items.findIndex((item) => item === document.activeElement)

    if (event.key === 'Escape') {
      event.preventDefault()
      clearServicesCloseTimer()
      setHoveredLink(null)
      setServicesOpen(false)
      servicesMenuRef.current?.querySelector<HTMLButtonElement>('button[aria-controls="services-menu"]')?.focus()
      return
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || items.length === 0) return

    event.preventDefault()
    if (event.key === 'Home') {
      items[0]?.focus()
    } else if (event.key === 'End') {
      items[items.length - 1]?.focus()
    } else if (event.key === 'ArrowDown') {
      items[(currentIndex + 1) % items.length]?.focus()
    } else if (event.key === 'ArrowUp') {
      items[(currentIndex - 1 + items.length) % items.length]?.focus()
    }
  }

  return (
    <>
      <motion.nav aria-label="Main navigation" className="glass-nav fixed left-0 right-0 top-0 z-[100]" initial={false}>
        <div className="transition-all duration-500 ease-out" style={styles.container}>
          <div
            className="mx-auto flex h-[72px] w-full items-center justify-between sm:h-[80px] lg:h-[80px] xl:h-[84px]"
            style={{ maxWidth: '1440px', padding: '0 clamp(1.1rem, 4vw, 3.5rem)' }}
          >
            <Link
              href="/#home"
              data-cursor="pointer"
              className="group flex shrink-0 items-center gap-2.5 rounded-[22px] border border-white/80 bg-white/45 px-3 py-2 shadow-[0_18px_42px_rgba(15,23,42,0.09),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_22px_54px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] sm:gap-3.5 sm:px-3.5"
            >
              <motion.div
                className="relative flex h-10 w-10 items-center justify-center rounded-[16px] border border-white/80 bg-white/58 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_22px_rgba(15,23,42,0.08)] sm:h-11 sm:w-11"
                whileHover={animateLogo ? { scale: 1.05, rotate: 360 } : undefined}
                transition={animateLogo ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
              >
                <Image
                  src={logoSrc}
                  alt="Manglam Technical Agency logo"
                  width={40}
                  height={40}
                  sizes="(max-width: 640px) 36px, 40px"
                  className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
                  loading="eager"
                  preload
                />
              </motion.div>
              <div className="flex min-w-0 pr-1 leading-none sm:flex lg:hidden xl:flex">
                <span
                  className="max-w-[170px] truncate whitespace-nowrap font-display text-[12px] font-bold tracking-normal text-foreground sm:text-[14px] xl:text-[15px]"
                  style={{ textShadow: isLight ? '0 1px 0 rgba(255,255,255,0.72)' : '0 1px 10px rgba(0,0,0,0.55)' }}
                >
                  <span className="sm:hidden">Manglam Technical Agency</span>
                  <span className="hidden sm:inline xl:hidden">MTA</span>
                  <span className="hidden xl:inline">Manglam Technical Agency</span>
                </span>
              </div>
            </Link>

            <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
              <div className="glass-strong relative flex items-center gap-1.5 overflow-visible rounded-full px-2.5 py-2 transition-all duration-300 xl:gap-2" style={styles.navPill}>
                <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/90" />
                <span className="pointer-events-none absolute -left-10 top-1/2 h-16 w-24 -translate-y-1/2 rounded-full bg-white/35 blur-2xl" />
                {NAV_LINKS.map((link) => {
                  const active = link.id === 'services' ? activeSection === link.id || pathname.startsWith('/services') : activeSection === link.id
                  if (link.hasMega) {
                    return (
                      <motion.div
                        key={link.id}
                        ref={servicesMenuRef}
                        className="relative"
                        onMouseEnter={() => {
                          openServicesMenu()
                        }}
                        onMouseLeave={() => {
                          scheduleServicesClose()
                        }}
                        onFocus={() => {
                          openServicesMenu()
                        }}
                        onBlur={(event) => {
                          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                            scheduleServicesClose()
                          }
                        }}
                        onMouseDown={() => setPressedLink(link.id)}
                        onMouseUp={() => setPressedLink(null)}
                      >
                        <button
                          type="button"
                          data-cursor="pointer"
                          aria-current={active ? 'page' : undefined}
                          aria-expanded={servicesOpen}
                          aria-haspopup="menu"
                          aria-controls={servicesMenuId}
                          onClick={openServicesMenu}
                          onKeyDown={handleServicesKeyDown}
                          onPointerDown={() => clearServicesCloseTimer()}
                          className={`relative flex min-h-[44px] items-center gap-1.5 overflow-hidden rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-rgb),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                            active ? 'text-foreground' : 'text-muted'
                          }`}
                          style={getLinkStyle(link.id)}
                        >
                          <span className="relative z-10">{link.label}</span>
                          <ChevronDown className={`relative z-10 h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                          {(hoveredLink === link.id || active) && (
                            <motion.span
                              layoutId="desktopNavIndicator"
                              className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-violet"
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                        </button>
                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              id={servicesMenuId}
                              role="menu"
                              aria-label="Services"
                              onKeyDown={handleServicesMenuKeyDown}
                              onMouseEnter={clearServicesCloseTimer}
                              onMouseLeave={scheduleServicesClose}
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.98 }}
                              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute left-1/2 top-full z-[110] w-[min(600px,calc(100vw-2rem))] -translate-x-1/2 pt-3"
                            >
                              <div
                              className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-card)]/95 p-3 shadow-[0_12px_34px_rgba(23,21,18,0.10),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255,254,250,0.88), rgba(251,250,246,0.62))',
                                borderColor: 'rgba(255,255,255,0.86)',
                                backdropFilter: 'blur(28px) saturate(190%)',
                                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                              }}
                            >
                              <div className="grid grid-cols-2 gap-2">
                                <Link
                                  href="/#services"
                                  role="menuitem"
                                  ref={(el) => {
                                    serviceItemRefs.current[0] = el
                                  }}
                                  className="group col-span-2 rounded-2xl border border-[rgba(var(--color-accent-rgb),0.18)] bg-[rgba(var(--color-accent-rgb),0.08)] px-4 py-3 text-sm font-medium text-[var(--color-violet-dark)] transition hover:border-[rgba(var(--color-accent-rgb),0.32)] hover:bg-[rgba(var(--color-accent-rgb),0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-rgb),0.55)]"
                                  onClick={() => setServicesOpen(false)}
                                >
                                  View all services
                                </Link>
                                {services.map((service, index) => (
                                  <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    role="menuitem"
                                    ref={(el) => {
                                      serviceItemRefs.current[index + 1] = el
                                    }}
                                    className="group rounded-2xl border border-white/70 bg-white/55 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[rgba(var(--color-accent-rgb),0.28)] hover:bg-white/75 hover:shadow-[0_8px_24px_rgba(23,21,18,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-rgb),0.55)]"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    <span className="block text-sm font-semibold text-slate-950">{service.name}</span>
                                    <span className="mt-1 block line-clamp-2 text-xs leading-5 text-slate-500">{service.tagline}</span>
                                  </Link>
                                ))}
                              </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  }
                  return (
                    <motion.div
                      key={link.id}
                      className="relative"
                      onMouseEnter={() => setHoveredLink(link.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onMouseDown={() => setPressedLink(link.id)}
                      onMouseUp={() => setPressedLink(null)}
                    >
                      <Link
                        href={link.href}
                        data-cursor="pointer"
                        aria-current={active ? 'page' : undefined}
                        className={`relative flex min-h-[44px] items-center overflow-hidden rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-rgb),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                          active ? 'text-foreground' : 'text-muted'
                        }`}
                        style={getLinkStyle(link.id)}
                      >
                        <span className="relative z-10">{link.label}</span>
                        {(hoveredLink === link.id || active) && (
                          <motion.span
                            layoutId="desktopNavIndicator"
                            className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-violet"
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-3.5 xl:gap-4">
              <Link
                href="/#contact"
                data-cursor="pointer"
                className="hidden min-h-[48px] items-center gap-2 rounded-full bg-[#171512] px-4 font-body text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_8px_24px_rgba(23,21,18,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-rgb),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas lg:inline-flex"
                style={{ color: '#fff' }}
              >
                Start Project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <motion.button
                type="button"
                onClick={() => setMobile((v) => !v)}
                aria-label={mobile ? 'Close menu' : 'Open menu'}
                aria-expanded={mobile}
                disabled={!isClient}
                data-cursor="pointer"
                className="glass-strong flex h-11 min-w-[44px] items-center justify-center rounded-[14px] transition-all duration-200 disabled:cursor-wait disabled:opacity-60 lg:hidden"
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
                      <X className="h-5 w-5 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5 text-muted" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-overlay fixed inset-0 z-[90] lg:hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(251,250,246,0.86), rgba(255,254,250,0.68) 48%, rgba(244,241,234,0.82))',
            }}
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <span
                className="select-none font-display text-[30vw] font-black"
                style={{ color: isLight ? 'rgba(var(--color-accent-rgb), 0.03)' : 'rgba(255, 255, 255, 0.02)' }}
              >
                MTA
              </span>
            </div>

            <div className="relative flex h-full flex-col px-6 pt-[92px]">
              <div className="flex-1 overflow-y-auto">
                <nav aria-label="Mobile navigation" className="space-y-2">
                  {NAV_LINKS.map((link, index) => {
                    const active = link.id === 'services' ? activeSection === link.id || pathname.startsWith('/services') : activeSection === link.id
                    return (
                      <motion.div
                        key={link.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {link.hasMega ? (
                          <div>
                            <button
                              type="button"
                              onClick={() => setMobileServicesOpen((open) => !open)}
                              aria-expanded={mobileServicesOpen}
                              aria-controls={mobileServicesMenuId}
                              className={`flex w-full items-center justify-between rounded-[24px] border bg-white/42 px-5 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-rgb),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                                active ? 'border-violet/30 text-foreground' : 'border-border text-muted hover:text-foreground'
                              }`}
                              style={{
                                borderColor: active ? 'rgba(var(--color-accent-rgb), 0.2)' : 'rgba(var(--color-accent-rgb), 0.08)',
                              }}
                            >
                              <span
                                className="font-display text-2xl font-black"
                                style={{ color: active ? 'var(--color-violet)' : 'var(--color-foreground)' }}
                              >
                                {link.label}
                              </span>
                              <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence initial={false}>
                              {mobileServicesOpen && (
                                <motion.div
                                  id={mobileServicesMenuId}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.22 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 grid gap-2 pl-4">
                                    <Link
                                      href="/#services"
                                      onClick={() => setMobile(false)}
                                      className="rounded-2xl border border-white/75 bg-white/52 px-4 py-3 font-display text-base font-medium text-[var(--color-violet-dark)] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-xl"
                                    >
                                      All Services
                                    </Link>
                                    {services.map((service) => (
                                      <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        onClick={() => setMobile(false)}
                                        className="rounded-2xl border border-white/60 bg-white/36 px-4 py-3 text-sm font-medium text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-xl transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-rgb),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                                      >
                                        {service.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={() => setMobile(false)}
                            aria-current={active ? 'page' : undefined}
                            className={`flex items-center justify-between rounded-[24px] border bg-white/42 px-5 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-accent-rgb),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                              active ? 'border-violet/30 text-foreground' : 'border-border text-muted hover:text-foreground'
                            }`}
                            style={{
                              borderColor: active ? 'rgba(var(--color-accent-rgb), 0.2)' : 'rgba(var(--color-accent-rgb), 0.08)',
                            }}
                          >
                            <span
                              className="font-display text-2xl font-black"
                              style={{ color: active ? 'var(--color-violet)' : 'var(--color-foreground)' }}
                            >
                              {link.label}
                            </span>
                            {active && <motion.span layoutId="mobileActiveIndicator" className="h-2 w-2 rounded-full bg-violet" />}
                          </Link>
                        )}
                      </motion.div>
                    )
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.04 + 0.1 }}
                  className="mt-8 px-1"
                >
                  <Link
                    href="/#contact"
                    onClick={() => setMobile(false)}
                    className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-[#171512] px-5 font-display text-base font-medium text-white shadow-[0_8px_24px_rgba(23,21,18,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                    style={{ color: '#fff' }}
                  >
                    Start Project
                    <ArrowRight className="h-4 w-4 text-white" />
                  </Link>
                  <a
                    href={AGENCY_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[24px] border border-white/75 bg-white/45 px-5 font-display text-base font-bold text-foreground shadow-[0_14px_34px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    WhatsApp Us
                  </a>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="py-6 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  Manglam Technical Agency • Bikaner, Rajasthan
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
