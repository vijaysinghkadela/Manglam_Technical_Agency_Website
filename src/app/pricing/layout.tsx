import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | MTA",
  description:
    "Complete 2026 pricing structure for social media marketing, web development, cybersecurity, AI automation, branding, and content creation. Includes benchmark pricing and contract terms.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
