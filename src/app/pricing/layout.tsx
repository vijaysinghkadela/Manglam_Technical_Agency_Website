import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Clear pricing structure for social media marketing, web development, cybersecurity, AI automation, branding, and content creation.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
