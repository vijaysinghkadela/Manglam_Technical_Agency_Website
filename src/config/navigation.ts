import { AGENCY_WHATSAPP } from "@/lib/constants";

export type PrimaryNavLink = {
  id: "home" | "about" | "services" | "portfolio" | "contact";
  href: string;
  label: string;
  hasMega?: boolean;
};

export const PRIMARY_NAV_LINKS: PrimaryNavLink[] = [
  { id: "home", href: "/", label: "Home" },
  { id: "about", href: "/about", label: "About" },
  { id: "services", href: "/services", label: "Services", hasMega: true },
  { id: "portfolio", href: "/portfolio", label: "Portfolio" },
  { id: "contact", href: "/contact", label: "Contact" },
];

export const COMPANY_NAV_LINKS = PRIMARY_NAV_LINKS.filter((link) =>
  ["about", "portfolio", "contact"].includes(link.id),
);

export const HERO_CTA_LINKS = {
  primary: { label: "Start your project", href: "/contact" },
  secondary: { label: "Chat on WhatsApp", href: AGENCY_WHATSAPP },
  tertiary: { label: "View case studies", href: "/portfolio" },
} as const;
