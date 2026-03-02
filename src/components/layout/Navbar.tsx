'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Menu } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { useQuoteStore } from '@/stores/useQuoteStore';
import { services } from '@/lib/data/services';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services', hasDropdown: true },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const quoteOpen = useQuoteStore((s) => s.open);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on pathname change
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setMobileOpen(false);
      setServicesOpen(false);
    }
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/85 backdrop-blur-xl border-b border-[#1F1F1F]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
          {/* Logo */}
            <Link href="/" className="flex flex-col" data-cursor="pointer">
              <span className="font-display text-xl font-bold tracking-[-0.05em] text-white">
                MTA
              </span>
              <span className="text-[10px] text-muted tracking-[0.15em] uppercase font-body hidden sm:block">
                Manglam Technical Agency
              </span>
            </Link>

            {/* Desktop Nav — centred */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-medium transition-colors underline-slide ${
                          isActive ? 'text-white' : 'text-muted hover:text-white'
                        }`}
                        data-cursor="pointer"
                      >
                        {link.label}
                        <ChevronDown className="w-2.5 h-2.5" />
                      </Link>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 py-2 bg-card border border-[#1F1F1F] rounded-lg"
                          >
                            {services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="block px-4 py-2.5 text-[13px] text-muted hover:text-white hover:bg-white/[0.03] transition-colors"
                                data-cursor="pointer"
                              >
                                {service.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-[13px] font-medium transition-colors underline-slide ${
                      isActive ? 'text-white' : 'text-muted hover:text-white'
                    }`}
                    data-cursor="pointer"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right — CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <MagneticButton className="hidden lg:block">
                <button
                  onClick={() => quoteOpen()}
                  className="px-5 py-2 text-[13px] font-medium text-violet border border-violet rounded-full hover:bg-violet hover:text-white transition-all duration-300 shimmer"
                  data-cursor="pointer"
                >
                  Get a Quote
                </button>
              </MagneticButton>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-[#080808] flex flex-col items-center justify-center"
          >
            {/* Giant watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-display text-[200px] font-black text-white/[0.03] select-none">
                MTA
              </span>
            </div>

            <nav className="relative z-10 flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-3xl font-display font-bold py-3 transition-colors ${
                      pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                        ? 'text-white'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                <button
                  onClick={() => { setMobileOpen(false); quoteOpen(); }}
                  className="px-8 py-3.5 bg-violet text-white font-semibold text-sm rounded-md"
                >
                  Get a Quote
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
