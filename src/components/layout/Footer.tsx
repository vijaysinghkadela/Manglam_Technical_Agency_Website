'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Twitter } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import TextReveal from '@/components/ui/TextReveal';
import {
  AGENCY_NAME,
  AGENCY_EMAIL,
  AGENCY_PHONE,
  AGENCY_LOCATION,
  AGENCY_WHATSAPP,
} from '@/lib/constants';
import { services } from '@/lib/data/services';

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/legal/privacy-policy' },
  { label: 'Terms', href: '/legal/terms-of-service' },
  { label: 'NDA', href: '/legal/nda' },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-sm text-muted hover:text-white transition-colors duration-200 py-1"
      data-cursor="pointer"
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1F1F1F] bg-canvas">
      {/* Statement Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <TextReveal className="text-display-m text-white max-w-xl">
            Let&apos;s Build Together
          </TextReveal>
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-white border border-[#1F1F1F] hover:bg-white hover:text-[#080808] hover:border-white transition-all duration-300"
              data-cursor="pointer"
            >
              Get a Quote →
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* Separator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#1F1F1F]" />
      </div>

      {/* 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo & Social */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-display text-xl font-bold tracking-[-0.05em] text-white">
                MTA
              </span>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                Technology services for Indian businesses ready to scale. Based in Rajasthan.
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
                  className="text-muted hover:text-white transition-colors"
                  aria-label={label}
                  data-cursor="pointer"
                >
                  <Icon className="w-[18px] h-[18px]" />
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
            <h4 className="text-micro text-muted mb-5">Services</h4>
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`} label={s.name} />
            ))}
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-micro text-muted mb-5">Company</h4>
            {companyLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-micro text-muted mb-5">Contact</h4>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#1F1F1F] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-dead font-mono"
          >
            © {new Date().getFullYear()} {AGENCY_NAME}
          </motion.p>
          <div className="flex items-center gap-4">
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
  );
}
