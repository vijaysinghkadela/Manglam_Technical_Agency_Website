"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type TierRow = {
  label: string;
  amount: string;
  note: string;
};

type PricingCard = {
  name: string;
  price: string;
  type: string;
  summary: string;
  features: string[];
  href: string;
  recommended?: boolean;
  tiers: TierRow[];
};

const plans: PricingCard[] = [
  {
    name: "SaaS & Web Development",
    price: "From ₹65,000",
    type: "Sprint / Build / Platform",
    summary: "Boutique-quality Next.js / Flutter delivery at Tier-2 pricing.",
    features: [
      "Landing pages and brochure sites",
      "Web applications and SaaS builds",
      "Auth, databases, and APIs",
      "Maintenance and retainer options",
    ],
    href: "/services/saas-products",
    recommended: true,
    tiers: [
      {
        label: "Sprint",
        amount: "₹65,000",
        note: "1-month delivery · 6-mo ₹55,000/sprint · 12-mo ₹50,000/sprint",
      },
      {
        label: "Build",
        amount: "₹2,80,000",
        note: "3-4 month project · 6-mo phased ₹3,00,000 · 12-mo ₹3,36,000",
      },
      {
        label: "Platform",
        amount: "₹8,00,000",
        note: "6-12 month platform · 12-mo iterate ₹10,80,000 · revenue-share option",
      },
    ],
  },
  {
    name: "Social Media Marketing",
    price: "From ₹18,000/mo",
    type: "Starter / Growth / Scale",
    summary: "Paid social retainers with ad spend billed separately.",
    features: [
      "Campaign strategy and objective setting",
      "Pixel / CAPI / event setup",
      "Creative production",
      "Retargeting and A/B testing",
    ],
    href: "/services/social-media-marketing",
    tiers: [
      {
        label: "Starter",
        amount: "₹18,000/mo",
        note: "6-mo ₹15,500/mo · 12-mo ₹13,500/mo",
      },
      {
        label: "Growth",
        amount: "₹35,000/mo",
        note: "6-mo ₹30,000/mo · 12-mo ₹26,000/mo",
      },
      {
        label: "Scale",
        amount: "₹65,000/mo",
        note: "6-mo ₹55,000/mo · 12-mo ₹48,000/mo",
      },
    ],
  },
  {
    name: "Cybersecurity",
    price: "From ₹50,000",
    type: "Shield / Guard / Fortress",
    summary: "PTES-based audits and managed security retainers.",
    features: [
      "VAPT and privacy audits",
      "DPDP and sector compliance",
      "Staff training and retests",
      "Incident response support",
    ],
    href: "/services/cybersecurity",
    tiers: [
      {
        label: "Shield",
        amount: "₹50,000",
        note: "6-mo ₹8,500/mo · 12-mo ₹6,500/mo",
      },
      {
        label: "Guard",
        amount: "₹1,30,000",
        note: "6-mo ₹20,000/mo · 12-mo ₹16,500/mo",
      },
      {
        label: "Fortress",
        amount: "₹2,50,000",
        note: "6-mo ₹45,000/mo · 12-mo ₹38,000/mo",
      },
    ],
  },
  {
    name: "AI Automation",
    price: "From ₹85,000",
    type: "Spark / Neural / Cortex",
    summary: "Agentic workflows, RAG systems, and transparent API cost policy.",
    features: [
      "n8n and workflow engineering",
      "Custom AI agents",
      "RAG knowledge bases",
      "WhatsApp and CRM integrations",
    ],
    href: "/services/ai-automation",
    tiers: [
      { label: "Spark", amount: "₹85,000", note: "1-month build" },
      {
        label: "Neural",
        amount: "₹28,000/mo",
        note: "6-month retainer · total ₹1,68,000",
      },
      {
        label: "Cortex",
        amount: "₹38,000/mo",
        note: "12-month partnership · total ₹4,56,000",
      },
    ],
  },
  {
    name: "Branding & Identity",
    price: "From ₹35,000",
    type: "Stamp / Mark / Signature",
    summary: "Identity systems, brand books, and managed creative support.",
    features: [
      "Logo systems and color rules",
      "Brand strategy and guidelines",
      "Source file handover",
      "Brand refresh support",
    ],
    href: "/services/branding",
    tiers: [
      {
        label: "Stamp",
        amount: "₹35,000",
        note: "6-mo ₹8,500/mo · 12-mo ₹6,500/mo",
      },
      {
        label: "Mark",
        amount: "₹1,20,000",
        note: "6-mo ₹14,000/mo · 12-mo ₹11,000/mo",
      },
      {
        label: "Signature",
        amount: "₹2,50,000",
        note: "6-mo ₹22,000/mo · 12-mo ₹17,000/mo",
      },
    ],
  },
  {
    name: "Content Creation",
    price: "From ₹28,000",
    type: "Seed / Grow / Lead",
    summary:
      "Human-edited content systems across social, blog, email, and thought leadership.",
    features: [
      "Blog writing and SEO articles",
      "Social captions and graphics",
      "Reels and short-form scripts",
      "Email and LinkedIn content",
    ],
    href: "/services/content-creation",
    tiers: [
      {
        label: "Seed",
        amount: "₹28,000",
        note: "6-mo ₹25,000/mo · 12-mo ₹20,000/mo",
      },
      {
        label: "Grow",
        amount: "₹80,000",
        note: "6-mo ₹70,000/mo · 12-mo ₹55,000/mo",
      },
      {
        label: "Lead",
        amount: "₹1,50,000",
        note: "6-mo ₹1,30,000/mo · 12-mo ₹1,10,000/mo",
      },
    ],
  },
];

const marketBenchmarks = [
  {
    segment: "Freelancer / Solo consultant",
    monthlyRange: "₹15,000 – ₹45,000",
  },
  {
    segment: "Boutique agency (Jaipur / Tier-1)",
    monthlyRange: "₹50,000 – ₹1,50,000",
  },
  {
    segment: "Small biz / local SMM agencies",
    monthlyRange: "₹15,000 – ₹40,000",
  },
  { segment: "% of ad spend model", monthlyRange: "10%–20% of managed spend" },
];

const contractTerms = [
  "Ad spend is not included; the client pays Meta directly and MTA only charges the management fee.",
  "Onboarding fee: ₹5,000 one-time for new accounts, waived for 6-month and 12-month commitments.",
  "Rolling monthly contracts require 1 month notice for cancellation.",
  "6-month and 12-month contracts are billed at 50% advance + monthly installments.",
  "Creative rights remain with MTA until full payment is received.",
];

const servicePositioning =
  "MTA sits in the boutique-agency tier at Tier-2 pricing - competitive against Jaipur/Delhi rates while delivering comparable quality.";

export default function PricingPage() {
  return (
    <main
      style={{ backgroundColor: "var(--color-canvas)", minHeight: "100vh" }}
    >
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[92svh] flex flex-col overflow-hidden grain"
        style={{ backgroundColor: "var(--color-canvas)" }}
      >
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: "-10%",
            top: "15%",
            width: "clamp(300px, 40vw, 700px)",
            height: "clamp(300px, 40vw, 700px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(107,26,26,0.07) 0%, transparent 68%)",
          }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 pt-24 sm:pt-28 lg:pt-36 pb-10 sm:pb-12 lg:pb-16">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2 font-mono mb-10 lg:mb-20"
            style={{
              fontSize: "11px",
              color: "var(--color-dead)",
              letterSpacing: "0.18em",
            }}
          >
            <Link href="/" className="hover-foreground transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span style={{ color: "var(--color-muted)" }}>PRICING</span>
          </motion.nav>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
              className="font-mono uppercase block mb-6"
              style={{
                fontSize: "11px",
                color: "var(--color-violet-light)",
                letterSpacing: "0.22em",
              }}
            >
              ✦ TIER-2 BOUTIQUE PRICING
            </motion.span>

            <div className="flex flex-col" style={{ gap: "0.02em" }}>
              <TextReveal
                text="COMPLETE"
                as="h1"
                delay={0.1}
                className="font-display font-black leading-none tracking-normal uppercase"
                style={{
                  fontSize: "clamp(3rem, 9vw, 9rem)",
                  color: "var(--color-foreground)",
                }}
              />
              <TextReveal
                text="STRUCTURE."
                as="h1"
                delay={0.22}
                className="font-display font-black leading-none tracking-normal uppercase"
                style={{
                  fontSize: "clamp(3rem, 9vw, 9rem)",
                  color: "var(--color-violet)",
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-8 lg:mt-10"
              style={{
                fontSize: "16px",
                lineHeight: 1.72,
                color: "var(--color-muted)",
                maxWidth: "480px",
              }}
            >
              The site now shows the real commercial stack: tiered retainers,
              benchmark pricing, and the contract terms that govern delivery.
            </motion.p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between mt-10 lg:mt-14">
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "11px",
                color: "var(--color-violet-light)",
                letterSpacing: "0.22em",
              }}
            >
              ✦ ALL PRICES IN INR
            </span>
            <div className="hidden lg:flex flex-col items-center gap-2">
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "10px",
                  color: "var(--color-dead)",
                  letterSpacing: "0.22em",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Scroll
              </span>
              <div
                style={{
                  width: "1px",
                  height: "48px",
                  backgroundColor: "var(--color-border)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANS — Editorial rows ────────────────────────── */}
      <section
        className="border-t border-border"
        style={{
          backgroundColor: "var(--color-canvas)",
          padding: "clamp(64px, 10vw, 120px) 0",
        }}
      >
        <div className="container-site">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12 lg:mb-16"
          >
            <div>
              <span
                className="font-mono uppercase block mb-3"
                style={{
                  fontSize: "11px",
                  color: "var(--color-violet-light)",
                  letterSpacing: "0.22em",
                }}
              >
                STARTING RATES
              </span>
              <h2
                className="font-display font-black leading-tight"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
                  color: "var(--color-foreground)",
                }}
              >
                What You&apos;ll Pay
              </h2>
            </div>
            <p
              className="font-mono text-xs"
              style={{ color: "var(--color-dead)", letterSpacing: "0.1em" }}
            >
              Indicative pricing aligned with MTA service catalog
            </p>
          </motion.div>

          {/* Plan rows */}
          <div style={{ borderTop: "1px solid var(--color-border)" }}>
            {plans.map((plan, i) => {
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: EASE }}
                  className="group relative"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  {/* Violet left accent on hover */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: "var(--color-violet)" }}
                  />

                  {/* Recommended banner */}
                  {plan.recommended && (
                    <div className="flex items-center gap-2 px-6 lg:px-8 pt-5">
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5"
                        style={{
                          border: "1px solid rgba(107,26,26,0.4)",
                          color: "var(--color-violet-light)",
                          backgroundColor: "rgba(107,26,26,0.06)",
                        }}
                      >
                        ✦ Popular
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_220px_160px] gap-6 lg:gap-0 px-6 lg:px-8 py-8 lg:py-10 items-center">
                    {/* Left: name + features */}
                    <div className="flex flex-col gap-4 lg:pr-12">
                      <div>
                        <h3
                          className="font-display font-bold"
                          style={{
                            fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                            color: "var(--color-foreground)",
                            lineHeight: 1.2,
                          }}
                        >
                          {plan.name}
                        </h3>
                        {plan.type !== "scoped project" && (
                          <span
                            className="font-mono uppercase mt-1 block"
                            style={{
                              fontSize: "10px",
                              color: "var(--color-dead)",
                              letterSpacing: "0.16em",
                            }}
                          >
                            {plan.type}
                          </span>
                        )}
                      </div>

                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.68,
                          color: "var(--color-muted)",
                        }}
                      >
                        {plan.summary}
                      </p>

                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {plan.features.map((f) => (
                          <span
                            key={f}
                            className="flex items-center gap-1.5"
                            style={{
                              fontSize: "13px",
                              color: "var(--color-muted)",
                            }}
                          >
                            <Check
                              className="w-3 h-3 shrink-0"
                              style={{ color: "var(--color-violet)" }}
                            />
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        {plan.tiers.map((tier) => (
                          <div
                            key={tier.label}
                            className="rounded-2xl border border-border bg-surface p-3"
                            style={{ backgroundColor: "var(--color-surface)" }}
                          >
                            <div className="flex items-baseline justify-between gap-3">
                              <span
                                className="font-display text-[13px] font-bold"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                {tier.label}
                              </span>
                              <span
                                className="font-display text-[15px] font-black"
                                style={{ color: "var(--color-violet-light)" }}
                              >
                                {tier.amount}
                              </span>
                            </div>
                            <p
                              className="mt-1"
                              style={{
                                fontSize: "11px",
                                lineHeight: 1.55,
                                color: "var(--color-dead)",
                              }}
                            >
                              {tier.note}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Middle: price */}
                    <div className="lg:border-l lg:border-border lg:pl-8">
                      <p
                        className="font-display font-black leading-none"
                        style={{
                          fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                          color: plan.recommended
                            ? "var(--color-violet-light)"
                            : "var(--color-foreground)",
                        }}
                      >
                        {plan.price}
                      </p>
                    </div>

                    {/* Right: CTA */}
                    <div className="lg:border-l lg:border-border lg:pl-8 flex items-center">
                      <Link
                        href={plan.href}
                        data-cursor="link"
                        className="inline-flex items-center gap-2 font-display font-bold text-sm transition-colors duration-200 group-hover:text-violet"
                        style={{ color: "var(--color-muted)" }}
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p
            className="font-mono mt-8"
            style={{
              fontSize: "11px",
              color: "var(--color-dead)",
              letterSpacing: "0.1em",
            }}
          >
            All prices in INR · Final commercials are scoped after project
            discovery
          </p>
        </div>
      </section>

      {/* ── CONTRACT TERMS ──────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "clamp(40px, 6vw, 72px) 0",
        }}
      >
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start"
            style={{
              border: "1px solid rgba(107,26,26,0.3)",
              padding: "clamp(24px, 4vw, 48px)",
              backgroundColor: "rgba(107,26,26,0.03)",
            }}
          >
            <div>
              <span
                className="font-mono uppercase block mb-3"
                style={{
                  fontSize: "11px",
                  color: "var(--color-violet-light)",
                  letterSpacing: "0.22em",
                }}
              >
                COMMERCIAL TERMS
              </span>
              <h2
                className="font-display font-black mb-3"
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.9rem)",
                  color: "var(--color-foreground)",
                  lineHeight: 1.1,
                }}
              >
                The commercial architecture is fixed before delivery starts.
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.72,
                  color: "var(--color-muted)",
                  maxWidth: "520px",
                }}
              >
                These are the contract rules that govern all live retainers and
                project work.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <ul className="grid gap-3">
                {contractTerms.map((term) => (
                  <li
                    key={term}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <Check
                      className="mt-1 h-3.5 w-3.5 shrink-0"
                      style={{ color: "var(--color-violet)" }}
                    />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 font-display font-black text-[14px] hover:bg-violet hover:text-white transition-all duration-300 whitespace-nowrap"
                style={{
                  border: "1px solid var(--color-violet)",
                  color: "var(--color-violet-light)",
                }}
                data-cursor="pointer"
              >
                Book Discovery Call →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARKET BENCHMARKS ────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{
          backgroundColor: "var(--color-canvas)",
          padding: "clamp(64px, 10vw, 120px) 0",
        }}
      >
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-12 lg:mb-16"
          >
            <span
              className="font-mono uppercase block mb-3"
              style={{
                fontSize: "11px",
                color: "var(--color-violet-light)",
                letterSpacing: "0.22em",
              }}
            >
              MARKET BENCHMARKS
            </span>
            <h2
              className="font-display font-black"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                color: "var(--color-foreground)",
              }}
            >
              India, 2026
            </h2>
            <p
              className="mt-3"
              style={{
                fontSize: "15px",
                color: "var(--color-muted)",
                maxWidth: "480px",
                lineHeight: 1.72,
              }}
            >
              MTA sits in the boutique-agency tier at Tier-2 pricing -
              competitive against Jaipur and Delhi rates while delivering
              comparable quality.
            </p>
          </motion.div>

          <div
            className="border border-border overflow-hidden"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <div className="w-full overflow-x-auto relative">
              {/* Mobile fade */}
              <div
                className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10 lg:hidden"
                style={{
                  background:
                    "linear-gradient(to left, var(--color-card), transparent)",
                }}
              />
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <th
                      className="font-mono text-xs uppercase tracking-widest py-5 px-6 w-[55%]"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Segment
                    </th>
                    <th
                      className="font-mono text-xs uppercase tracking-widest py-5 px-6 w-[45%]"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Monthly Range
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {marketBenchmarks.map((row) => (
                    <tr
                      key={row.segment}
                      className="transition-colors duration-150"
                      style={{ borderBottom: "1px solid var(--color-border)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--color-surface)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <td
                        className="py-5 px-6 text-sm font-medium"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {row.segment}
                      </td>
                      <td
                        className="py-5 px-6 text-sm"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {row.monthlyRange}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-border bg-surface p-6">
              <span
                className="font-mono uppercase block mb-3"
                style={{
                  fontSize: "11px",
                  color: "var(--color-violet-light)",
                  letterSpacing: "0.22em",
                }}
              >
                Positioning
              </span>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.72,
                  color: "var(--color-muted)",
                }}
              >
                {servicePositioning}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "clamp(64px, 10vw, 120px) 0",
        }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span
                className="font-mono uppercase block mb-4"
                style={{
                  fontSize: "11px",
                  color: "var(--color-violet-light)",
                  letterSpacing: "0.22em",
                }}
              >
                GET STARTED
              </span>
              <h2
                className="font-display font-black mb-6 leading-tight"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                  color: "var(--color-foreground)",
                }}
              >
                Start Your
                <br />
                Project
              </h2>
              <p
                style={{
                  color: "var(--color-muted)",
                  lineHeight: 1.72,
                  maxWidth: "380px",
                }}
              >
                Free consultation and honest scope — no sales pitch, no lock-in.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 font-display font-black text-[15px] hover:bg-violet hover:text-white transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-foreground)",
                  color: "var(--color-canvas)",
                }}
                data-cursor="pointer"
              >
                Contact Us →
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 font-display font-bold text-[14px] hover:border-violet transition-all duration-300"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-muted)",
                }}
                data-cursor="pointer"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
