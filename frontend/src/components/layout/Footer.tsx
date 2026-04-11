'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Linkedin, Instagram, Twitter, ArrowUpRight } from 'lucide-react'
import {
  AGENCY_NAME,
  AGENCY_EMAIL,
  AGENCY_PHONE,
  AGENCY_LOCATION,
  AGENCY_WHATSAPP,
} from '@/lib/constants'
import { services } from '@/lib/data/services'

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1]

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
      className="group flex items-center justify-between text-sm text-muted hover-foreground transition-colors duration-200 py-1.5"
      data-cursor="pointer"
    >
      <span>{label}</span>
      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200" />
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-canvas">

      {/* CTA Header */}
      <div className="container-site pt-16 lg:pt-24 pb-14 lg:pb-20">
        <motion.div
          className="flex flex-col items-center text-center gap-7"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <span className="font-mono uppercase" style={{ fontSize: '11px', color: 'var(--color-violet-light)', letterSpacing: '0.24em' }}>
            ✦ START A PROJECT
          </span>
          <h2
            className="font-display font-black tracking-tight leading-[0.90]"
            style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', color:'var(--color-foreground)' }}
          >
            Let&apos;s Build<br />
            <span style={{ color: 'var(--color-violet)' }}>Together</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-muted)', maxWidth: '380px', lineHeight: 1.72 }}>
            One conversation is all it takes to know whether we&apos;re the right fit.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-display font-black text-[15px] transition-all duration-300 group"
            style={{ backgroundColor:'var(--color-foreground)', color:'var(--color-canvas)' }}
            data-cursor="pointer"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-violet)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-foreground)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-canvas)' }}
          >
            Get a Quote
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Separator */}
      <div className="container-site">
        <div className="border-t border-border" />
      </div>

      {/* 4-Column Grid */}
      <div className="container-site py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Col 1: Logo & info */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0, ease: EASE }}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/images/mta-logo.png"
                  alt="MTA Logo"
                  width={32}
                  height={32}
                  className="shrink-0"
                />
                <span className="font-display font-black text-[15px] tracking-tight" style={{ color:'var(--color-foreground)' }}>MTA</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Technology services for Indian businesses ready to scale. Based in Nagaur, Rajasthan.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {[
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-muted hover-foreground transition-colors"
                  aria-label={label}
                  data-cursor="pointer"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
              <a
                href={AGENCY_WHATSAPP}
                className="text-sm font-mono transition-colors"
                style={{ color: 'var(--color-muted)' }}
                aria-label="WhatsApp"
                data-cursor="pointer"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#25D366' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' }}
              >
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Col 2: Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07, ease: EASE }}
          >
            <h4 className="font-mono text-label tracking-[0.18em] uppercase mb-5" style={{ color: 'var(--color-dead)' }}>Services</h4>
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`} label={s.name} />
            ))}
          </motion.div>

          {/* Col 3: Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
          >
            <h4 className="font-mono text-label tracking-[0.18em] uppercase mb-5" style={{ color: 'var(--color-dead)' }}>Company</h4>
            {companyLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </motion.div>

          {/* Col 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.21, ease: EASE }}
          >
            <h4 className="font-mono text-label tracking-[0.18em] uppercase mb-5" style={{ color: 'var(--color-dead)' }}>Contact</h4>
            <div className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--color-muted)' }}>
              <p>{AGENCY_LOCATION}</p>
              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="hover-foreground transition-colors break-all"
                data-cursor="pointer"
              >
                {AGENCY_EMAIL}
              </a>
              <a
                href={`tel:${AGENCY_PHONE}`}
                className="hover-foreground transition-colors"
                data-cursor="pointer"
              >
                {AGENCY_PHONE}
              </a>
              <p className="font-mono mt-1" style={{ fontSize: '11px', color: 'var(--color-dead)' }}>Mon–Sat · 10 AM – 7 PM IST</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-site">
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono" style={{ color: 'var(--color-dead)' }}>
            © {new Date().getFullYear()} {AGENCY_NAME} — Classification: MTA Proprietary
          </p>
          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap justify-center">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-mono transition-colors"
                style={{ color: 'var(--color-dead)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-dead)' }}
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
