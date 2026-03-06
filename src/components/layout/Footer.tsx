'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Linkedin, Instagram, Twitter } from 'lucide-react'
import {
  AGENCY_NAME,
  AGENCY_EMAIL,
  AGENCY_PHONE,
  AGENCY_LOCATION,
  AGENCY_WHATSAPP,
} from '@/lib/constants'
import { services } from '@/lib/data/services'

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Research', href: '/research' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Legal Hub', href: '/legal' },
  { label: 'DPDPA Privacy Policy', href: '/legal/privacy-policy' },
  { label: 'Terms', href: '/legal/terms-of-service' },
  { label: 'NDA', href: '/legal/nda' },
  { label: 'Trust Center & Ethics', href: '/trust-center' },
  { label: 'Master Services Agreement', href: '/legal/master-services-agreement' },
]

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-sm text-muted hover:text-white transition-colors duration-200 py-1"
      data-cursor="pointer"
    >
      {label}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-canvas">
      {/* Statement Header */}
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 lg:pt-20 pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <h2 className="font-display font-black text-white tracking-tight leading-[0.92]"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}>
            Let&apos;s Build Together
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-black font-display font-black text-[15px] hover:bg-violet hover:text-white transition-all duration-250"
            data-cursor="pointer"
          >
            Get a Quote →
          </Link>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="border-t border-border" />
      </div>

      {/* 4-Column Grid */}
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Logo & Social */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/mta-logo.png"
                  alt="MTA Logo"
                  width={32}
                  height={32}
                  className="shrink-0"
                />
                <span className="font-display font-black text-[15px] text-white tracking-tight">MTA</span>
              </div>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                Technology services for Indian businesses ready to scale. Based in Rajasthan.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-muted hover:text-white transition-colors"
                  aria-label={label}
                  data-cursor="pointer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
              <a
                href={AGENCY_WHATSAPP}
                className="text-muted hover:text-emerald-400 transition-colors text-xs font-medium"
                aria-label="WhatsApp"
                data-cursor="pointer"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-mono text-label text-muted tracking-[0.18em] uppercase mb-5">Services</h4>
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`} label={s.name} />
            ))}
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-mono text-label text-muted tracking-[0.18em] uppercase mb-5">Company</h4>
            {companyLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-mono text-label text-muted tracking-[0.18em] uppercase mb-5">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <p>{AGENCY_LOCATION}</p>
              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="hover:text-white transition-colors"
                data-cursor="pointer"
              >
                {AGENCY_EMAIL}
              </a>
              <a
                href={`tel:${AGENCY_PHONE}`}
                className="hover:text-white transition-colors"
                data-cursor="pointer"
              >
                {AGENCY_PHONE}
              </a>
              <p className="mt-2 text-xs">Made in Rajasthan 🇮🇳</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-dead font-mono"
          >
            © {new Date().getFullYear()} {AGENCY_NAME} — Classification: MTA Proprietary
          </motion.p>
          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap justify-center">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-dead hover:text-muted transition-colors font-mono"
                data-cursor="pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
