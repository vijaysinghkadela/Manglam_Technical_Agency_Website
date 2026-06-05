"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Linkedin, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import {
  AGENCY_NAME,
  AGENCY_EMAIL,
  AGENCY_LOCATION,
  AGENCY_PHONE,
  AGENCY_WHATSAPP,
  AGENCY_X_URL,
  AGENCY_INSTAGRAM_URL,
  AGENCY_LINKEDIN_URL,
  OFFICE_HOURS,
} from "@/lib/constants";
import { services } from "@/lib/data/services";
import { useConsentStore } from "@/stores/useConsentStore";
import { useIsClient } from "@/hooks/useIsClient";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
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
      className="group flex min-h-[44px] items-center justify-between gap-4 py-2.5 text-sm text-muted transition-colors duration-200 touch-manipulation hover-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      data-cursor="pointer"
      style={{ touchAction: "manipulation" }}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-60" />
    </Link>
  );
}

function FooterButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[44px] w-full items-center justify-between gap-4 py-2.5 text-left text-sm text-muted transition-colors duration-200 touch-manipulation hover-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      data-cursor="pointer"
      style={{ touchAction: "manipulation" }}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-60" />
    </button>
  );
}

export function Footer() {
  const showBannerAgain = useConsentStore((state) => state.showBannerAgain);
  const { resolvedTheme } = useTheme();
  const isClient = useIsClient();
  const isLight = isClient ? resolvedTheme !== "dark" : true;
  const logoSrc = isLight
    ? "/images/mta-logo-transparent.png"
    : "/images/mta-logo-transparent-white.png";
  const openCookiePreferences = () => {
    showBannerAgain();
    window.dispatchEvent(new Event("mta:show-consent-banner"));
  };

  return (
    <motion.footer
      className="safe-area-bottom w-full border-t border-border bg-canvas"
      initial={{ clipPath: "inset(18% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: EASE }}
    >

      <div className="container-site">
        <div className="border-t border-border" />
      </div>

      <div className="container-site py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <motion.div
            className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0, ease: EASE }}
          >
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-canvas/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <Image
                    src={logoSrc}
                    alt="Manglam Technical Agency logo"
                    width={40}
                    height={40}
                    sizes="40px"
                    className="h-9 w-9 shrink-0 object-contain"
                  />
                </div>
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
                Practical technology support for small teams and growing
                businesses. Based in Bikaner, Rajasthan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {[
                { Icon: Linkedin, href: AGENCY_LINKEDIN_URL, label: "LinkedIn" },
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
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:scale-110 hover:rotate-[8deg] hover:border-violet/50 hover:text-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
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
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-violet/50 hover:text-[#25D366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                aria-label="WhatsApp"
                data-cursor="pointer"
                style={{ touchAction: "manipulation" }}
              >
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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
              style={{ fontSize: "11px", color: "var(--color-muted)" }}
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
              style={{ fontSize: "11px", color: "var(--color-muted)" }}
            >
              Legal
            </h4>
            {legalLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
            <FooterButton label="Cookie Preferences" onClick={openCookiePreferences} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.21, ease: EASE }}
          >
            <h4
              className="mb-5 font-mono uppercase tracking-[0.18em]"
              style={{ fontSize: "11px", color: "var(--color-muted)" }}
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
              style={{ fontSize: "11px", color: "var(--color-muted)" }}
            >
              Contact
            </h4>
            <div
              className="flex flex-col gap-3 text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(AGENCY_LOCATION)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                data-cursor="pointer"
              >
                {AGENCY_LOCATION}
              </a>
              <a
                href={`tel:${AGENCY_PHONE.replace(/[^\d+]/g, "")}`}
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                data-cursor="pointer"
              >
                {AGENCY_PHONE}
              </a>
              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="inline-flex min-h-[44px] items-center break-all transition-colors hover:text-violet"
                data-cursor="pointer"
              >
                {AGENCY_EMAIL}
              </a>
              <a
                href={AGENCY_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-2 transition-colors hover:text-[#25D366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                data-cursor="pointer"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-sm transition-colors text-muted hover-foreground">WhatsApp</span>
              </a>
              <p
                className="font-mono pt-1"
                style={{ fontSize: "11px", color: "var(--color-dead)" }}
              >
                {OFFICE_HOURS.weekdays}
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
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
