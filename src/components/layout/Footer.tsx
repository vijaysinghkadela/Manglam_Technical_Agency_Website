"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import {
  AGENCY_NAME,
  AGENCY_EMAIL,
  AGENCY_PHONE,
  AGENCY_LOCATION,
  AGENCY_WHATSAPP,
  AGENCY_X_URL,
  AGENCY_INSTAGRAM_URL,
} from "@/lib/constants";
import { services } from "@/lib/data/services";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Legal Hub", href: "/legal" },
  { label: "DPDPA Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms", href: "/legal/terms-of-service" },
  { label: "NDA", href: "/legal/nda" },
  { label: "Trust Center & Ethics", href: "/trust-center" },
  {
    label: "Master Services Agreement",
    href: "/legal/master-services-agreement",
  },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-[44px] items-center justify-between gap-4 py-2.5 text-sm text-muted transition-colors duration-200 touch-manipulation hover-foreground"
      data-cursor="pointer"
      style={{ touchAction: "manipulation" }}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-60" />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="safe-area-bottom w-full border-t border-border bg-canvas">
      <div className="container-site py-12 sm:py-16 lg:py-24">
        <motion.div
          className="mx-auto w-full max-w-[960px] xl:max-w-[1100px] overflow-hidden rounded-[28px] border border-[rgba(107,26,26,0.25)] bg-[rgba(107,26,26,0.04)] px-5 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:px-8 sm:py-14 lg:py-16 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <span
            className="font-mono uppercase"
            style={{
              fontSize: "11px",
              color: "var(--color-violet-light)",
              letterSpacing: "0.24em",
            }}
          >
            ✦ START A PROJECT
          </span>
          <h2
            className="mt-6 font-display font-black tracking-normal leading-[0.92]"
            style={{
              fontSize: "clamp(2.1rem, 6vw, 5.5rem)",
              color: "var(--color-foreground)",
            }}
          >
            Let&apos;s Build
            <br />
            <span style={{ color: "#6B1A1A" }}>Something Better</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-[420px]"
            style={{
              fontSize: "15px",
              lineHeight: 1.72,
              color: "var(--color-muted)",
            }}
          >
            One conversation is all it takes to know whether we&apos;re the
            right fit.
          </p>
          <div className="mt-8 w-full flex items-center justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-[15px] font-black transition-all duration-300 group"
              style={{
                backgroundColor: "#6B1A1A",
                boxShadow: "0 16px 40px rgba(107,26,26,0.24)",
                color: "#FFFFFF",
              }}
              data-cursor="pointer"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#4f1111";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#6B1A1A";
              }}
            >
              Get a Quote
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="container-site">
        <div className="border-t border-border" />
      </div>

      <div className="container-site py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <motion.div
            className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0, ease: EASE }}
          >
            <div>
              <div className="mb-3 flex items-center gap-3">
                <Image
                  src="/images/mta-logo-transparent.png"
                  alt="MTA Logo"
                  width={40}
                  height={40}
                  sizes="40px"
                  className="h-10 w-10 shrink-0 object-contain"
                />
                <span
                  className="font-display text-[15px] font-black tracking-normal"
                  style={{ color: "var(--color-foreground)" }}
                >
                  MTA
                </span>
              </div>
              <p
                className="max-w-[28ch] text-sm leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                Technology services for Indian businesses ready to scale. Based
                in Bikaner, Rajasthan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {[
                { Icon: Linkedin, href: null, label: "LinkedIn" },
                {
                  Icon: Instagram,
                  href: AGENCY_INSTAGRAM_URL,
                  label: "Instagram",
                },
                { Icon: Twitter, href: AGENCY_X_URL, label: "X (Twitter)" },
              ].map(({ Icon, href, label }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-violet/50 hover-foreground"
                    aria-label={label}
                    data-cursor="pointer"
                    style={{ touchAction: "manipulation" }}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ) : (
                  <span
                    key={label}
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border text-muted/30"
                    aria-label={`${label} (coming soon)`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                ),
              )}
              <a
                href={AGENCY_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border px-3 font-mono text-sm transition-colors hover:border-violet/40 hover-foreground"
                style={{
                  color: "var(--color-muted)",
                  touchAction: "manipulation",
                }}
                aria-label="WhatsApp"
                data-cursor="pointer"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#25D366";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--color-muted)";
                }}
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07, ease: EASE }}
          >
            <h4
              className="mb-5 font-mono uppercase tracking-[0.18em]"
              style={{ fontSize: "11px", color: "var(--color-dead)" }}
            >
              Services
            </h4>
            {services.map((s) => (
              <FooterLink
                key={s.slug}
                href={`/services/${s.slug}`}
                label={s.name}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
          >
            <h4
              className="mb-5 font-mono uppercase tracking-[0.18em]"
              style={{ fontSize: "11px", color: "var(--color-dead)" }}
            >
              Company
            </h4>
            {companyLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.21, ease: EASE }}
          >
            <h4
              className="mb-5 font-mono uppercase tracking-[0.18em]"
              style={{ fontSize: "11px", color: "var(--color-dead)" }}
            >
              Contact
            </h4>
            <div
              className="flex flex-col gap-3 text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              <p>{AGENCY_LOCATION}</p>
              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="break-all transition-colors hover-foreground"
                data-cursor="pointer"
              >
                {AGENCY_EMAIL}
              </a>
              <a
                href={AGENCY_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-[#25D366]"
                data-cursor="pointer"
              >
                <span>{AGENCY_PHONE}</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <p
                className="font-mono pt-1"
                style={{ fontSize: "11px", color: "var(--color-dead)" }}
              >
                Mon–Sat · 10 AM – 7 PM IST
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-site">
        <div className="border-t border-border py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-xs font-mono text-center sm:text-left"
              style={{ color: "var(--color-dead)" }}
            >
              © {new Date().getFullYear()} {AGENCY_NAME} — Classification: MTA
              Proprietary
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-[32px] items-center rounded-full px-1 text-xs font-mono transition-colors hover-foreground"
                  style={{
                    color: "var(--color-dead)",
                    touchAction: "manipulation",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-muted)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-dead)";
                  }}
                  data-cursor="pointer"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
