import { notFound } from "next/navigation";
import { services, getService } from "@/lib/data/services";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { ServicePricingSection } from "@/components/pricing/ServicePricingSection";
import { departments as pricingDepartments } from "@/lib/data/pricing";

type Params = { slug: string };
type ServiceData = NonNullable<ReturnType<typeof getService>>;
type ServicePlan = ServiceData["pricing"][number];

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `https://manglamtechnicalagency.com/services/${slug}` },
  };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function inferBudgetRange(priceLabel: string): string {
  const matches = priceLabel.match(/\d[\d,]*/g);
  if (!matches || matches.length === 0) return "Not Sure";

  const maxAmount = Math.max(
    ...matches.map((value) => Number(value.replace(/,/g, ""))),
  );
  if (maxAmount <= 25000) return "Under ₹25,000";
  if (maxAmount <= 50000) return "₹25,000–₹50,000";
  if (maxAmount <= 100000) return "₹50,000–₹1,00,000";
  if (maxAmount <= 500000) return "₹1,00,000–₹5,00,000";
  return "₹5,00,000+";
}

function inferTimeline(period?: string, subtext?: string): string {
  const text = `${period ?? ""} ${subtext ?? ""}`.toLowerCase();
  if (!text.trim()) return "Flexible";
  if (
    text.includes("ongoing") ||
    text.includes("retainer") ||
    text.includes("monthly") ||
    text.includes("partnership")
  ) {
    return "Flexible";
  }
  if (
    text.includes("1-month") ||
    text.includes("1 month") ||
    text.includes("setup") ||
    text.includes("build")
  ) {
    return "Within 1 month";
  }
  if (
    text.includes("3-4") ||
    text.includes("4-6") ||
    text.includes("6-month") ||
    text.includes("12-month")
  ) {
    return "Within 3 months";
  }
  return "Within 3 months";
}

function buildPrefilledMessage(service: ServiceData, plan?: ServicePlan) {
  const lines = [
    "I selected this service from the MTA services page:",
    `Service: ${service.name}`,
    `Tagline: ${service.tagline}`,
    `Starting price: ${service.priceLabel}`,
    `Core features: ${service.features.join(" • ")}`,
    `Overview: ${service.description}`,
  ];

  if (plan) {
    lines.push("", "Selected pricing plan:");
    lines.push(`Plan: ${plan.label}`);
    lines.push(`Plan price: ${plan.amount}`);
    if (plan.period) lines.push(`Plan period: ${plan.period}`);
    if (plan.subtext) lines.push(`Plan notes: ${plan.subtext}`);
    lines.push(`Plan features: ${plan.features.join(" • ")}`);
  }

  lines.push(
    "",
    "Please review the above requirements and reply on WhatsApp with next steps.",
  );

  return lines.filter(Boolean).join("\n");
}

function buildContactHref(service: ServiceData, plan?: ServicePlan) {
  const params = new URLSearchParams();
  params.set("service", service.name);
  params.set("budget", inferBudgetRange(plan?.amount ?? service.priceLabel));
  params.set("timeline", inferTimeline(plan?.period, plan?.subtext));
  params.set("message", buildPrefilledMessage(service, plan));
  params.set("selectionType", plan ? "plan" : "service");
  params.set("serviceName", service.name);
  params.set("departmentName", service.name);
  params.set("price", plan?.amount ?? service.priceLabel);
  params.set("durationLabel", plan?.period ?? "Discovery");
  if (plan?.label) params.set("planName", plan.label);
  if (plan?.subtext) params.set("durationNote", plan.subtext);

  return `/contact?${params.toString()}`;
}

const servicePageNav = [
  { href: "#overview", label: "Overview" },
  { href: "#plans", label: "Plans" },
  { href: "#compliance", label: "Compliance" },
  { href: "#faq", label: "FAQ" },
] as const;

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main
      style={{ backgroundColor: "var(--color-canvas)", minHeight: "100vh" }}
    >
      {/* ── HERO — Full viewport ─────────────────────────── */}
      <section
        className="relative w-full min-h-[92svh] flex flex-col overflow-hidden grain"
        style={{ backgroundColor: "var(--color-canvas)" }}
      >
        <div className="absolute inset-0 bg-line-grid opacity-20 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            right: "-8%",
            top: "10%",
            width: "clamp(300px, 38vw, 660px)",
            height: "clamp(300px, 38vw, 660px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(var(--color-accent-rgb),0.07) 0%, transparent 68%)" }}
        />

        <div className="relative z-10 container-site flex flex-col flex-1 page-hero-safe pb-12 sm:pb-16 lg:pb-20">
          {/* Breadcrumb + label */}
          <div className="flex items-start justify-between gap-4 mb-12 lg:mb-24">
            <nav
              className="flex items-center gap-2 font-mono"
              style={{
                fontSize: "11px",
                color: "var(--color-dead)",
                letterSpacing: "0.18em" }}
            >
              <Link href="/" className="inline-flex min-h-[44px] items-center hover-foreground transition-colors">
                HOME
              </Link>
              <span>/</span>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center hover-foreground transition-colors"
              >
                SERVICES
              </Link>
              <span>/</span>
              <span style={{ color: "var(--color-muted)" }}>
                {service.name.toUpperCase()}
              </span>
            </nav>
            <span
              className="hidden lg:block font-mono uppercase shrink-0"
              style={{
                fontSize: "11px",
                color: "var(--color-violet-light)",
                letterSpacing: "0.22em" }}
            >
              SERVICE OVERVIEW
            </span>
          </div>

          {/* Main statement */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Service icon + category */}
            <div className="flex items-center gap-3 mb-10">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  border: "1px solid rgba(var(--color-accent-rgb),0.35)",
                  backgroundColor: "rgba(var(--color-accent-rgb),0.08)" }}
              >
                <service.Icon
                  className="w-5 h-5"
                  style={{ color: "var(--color-violet-light)" }}
                />
              </div>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "11px",
                  color: "var(--color-violet-light)",
                  letterSpacing: "0.22em" }}
              >
                ✦ MTA SERVICE
              </span>
            </div>

            {/* Service name — massive */}
            <h1
              aria-label={service.name}
              className="max-w-[min(100%,920px)] break-words font-display font-black leading-none tracking-normal"
              style={{
                fontSize: "var(--text-display-xl)",
                lineHeight: 0.92,
                color: "var(--color-foreground)" }}
            >
              {service.name.split(" ").map((word, i, arr) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    color:
                      i === arr.length - 1 && arr.length > 1
                        ? "var(--color-violet)"
                        : "var(--color-foreground)" }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Tagline + price row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-10 lg:mt-14">
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.7,
                  color: "var(--color-muted)",
                  maxWidth: "480px",
                  fontStyle: "italic" }}
              >
                {service.tagline}
              </p>

              <div className="flex items-center gap-4 shrink-0">
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: "10px",
                    color: "var(--color-dead)",
                    letterSpacing: "0.14em" }}
                >
                  Starting at
                </span>
                <span
                  className="font-display font-black"
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                    color: "var(--color-foreground)" }}
                >
                  {service.priceLabel.replace(/^(From |Starting at )/, "")}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between mt-12 lg:mt-16">
            <Link
              href={buildContactHref(service)}
              className="inline-flex items-center gap-2 px-8 py-5 font-display font-black text-[15px] hover:bg-violet-light transition-all duration-300"
              style={{
                backgroundColor: "var(--color-violet)",
                color: "#fff" }}
              data-cursor="pointer"
            >
              Book Discovery Workshop →
            </Link>

            <div className="hidden lg:flex flex-col items-center gap-2">
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "10px",
                  color: "var(--color-dead)",
                  letterSpacing: "0.22em",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)" }}
              >
                Scroll
              </span>
              <div
                style={{
                  width: "1px",
                  height: "48px",
                  backgroundColor: "var(--color-border)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── METADATA STRIP ──────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["SERVICE", service.name],
                ["STARTING PRICE", service.priceLabel],
                ["CORE DELIVERABLE", service.features[0]],
                ["AGREEMENT SET", service.requiredAgreements.join(", ")],
              ] as const
            ).map(([label, val], i) => (
              <div
                key={label}
                className="px-8 py-6"
                style={{
                  borderRight: i < 3 ? "1px solid var(--color-border)" : "none",
                  borderBottom:
                    i < 2 ? "1px solid var(--color-border)" : "none" }}
              >
                <p
                  className="font-mono uppercase mb-1"
                  style={{
                    fontSize: "10px",
                    color: "var(--color-dead)",
                    letterSpacing: "0.15em" }}
                >
                  {label}
                </p>
                <p
                  className="font-mono text-sm font-semibold"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav
        aria-label={`${service.name} page sections`}
        className="border-t border-b border-border bg-canvas"
      >
        <div className="container-site flex gap-2 overflow-x-auto py-3">
          {servicePageNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] shrink-0 items-center rounded-full border border-border px-4 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:border-violet/50 hover:text-violet-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── OVERVIEW + PROCESS ──────────────────────────── */}
      <section
        id="overview"
        className="border-t border-border"
        style={{
          backgroundColor: "var(--color-canvas)",
          padding: "clamp(72px, 10vw, 128px) 0" }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.65fr] gap-20 lg:gap-28 items-start">
            {/* LEFT — sticky overview */}
            <div className="lg:sticky top-32 flex flex-col gap-12">
              {/* Description */}
              <div>
                <span
                  className="font-mono uppercase block mb-4"
                  style={{
                    fontSize: "11px",
                    color: "var(--color-violet-light)",
                    letterSpacing: "0.22em" }}
                >
                  OVERVIEW
                </span>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.78,
                    color: "var(--color-muted)" }}
                >
                  {service.description}
                </p>
              </div>

              {/* Included features */}
              <div>
                <span
                  className="font-mono uppercase block mb-4"
                  style={{
                    fontSize: "11px",
                    color: "var(--color-dead)",
                    letterSpacing: "0.22em" }}
                >
                  INCLUDED
                </span>
                <ul className="flex flex-col gap-3">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3"
                      style={{ fontSize: "14px", color: "var(--color-muted)" }}
                    >
                      <span
                        style={{
                          color: "var(--color-violet-light)",
                          flexShrink: 0,
                          marginTop: "1px" }}
                      >
                        →
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal box */}
              <div
                style={{
                  border: "1px solid var(--color-border)",
                  padding: "28px",
                  backgroundColor: "var(--color-surface)" }}
              >
                <span
                  className="font-mono uppercase block mb-4"
                  style={{
                    fontSize: "10px",
                    color: "var(--color-violet-light)",
                    letterSpacing: "0.18em" }}
                >
                  LEGAL & COMPLIANCE
                </span>

                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.72,
                    color: "var(--color-muted)",
                    marginBottom: "16px" }}
                >
                  {service.dpaTrigger}
                </p>



                <ul className="flex flex-col gap-1.5">
                  {service.governingLaws.map((law) => (
                    <li
                      key={law}
                      style={{ fontSize: "12px", color: "var(--color-dead)" }}
                    >
                      · {law}
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: "1px solid var(--color-border)" }}
                >
                  <p
                    className="font-mono uppercase mb-2"
                    style={{
                      fontSize: "10px",
                      color: "var(--color-dead)",
                      letterSpacing: "0.15em" }}
                  >
                    DELIVERY STAGES
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {service.deliveryStages.map((stage) => (
                      <span
                        key={stage}
                        className="font-mono text-xs px-2 py-1"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-muted)" }}
                      >
                        {String(stage).padStart(2, "0")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={buildContactHref(service)}
                className="inline-flex items-center gap-2 w-fit px-8 py-5 font-display font-black text-[15px] hover:bg-violet-light transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-violet)",
                  color: "#fff" }}
                data-cursor="pointer"
              >
                Get a Quote →
              </Link>
            </div>

            {/* RIGHT — process steps */}
            <div>
              <span
                className="font-mono uppercase block mb-12"
                style={{
                  fontSize: "11px",
                  color: "var(--color-violet-light)",
                  letterSpacing: "0.22em" }}
              >
                HOW IT WORKS
              </span>

              <div style={{ borderTop: "1px solid var(--color-border)" }}>
                {service.process.map((step) => (
                  <div
                    key={step.step}
                    className="group"
                    style={{
                      borderBottom: "1px solid var(--color-border)",
                      padding: "40px 0" }}
                  >
                    <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[100px_1fr] gap-6 lg:gap-8">
                      {/* Big watermark number */}
                      <span
                        className="font-display font-black leading-none transition-colors duration-500 group-hover:text-violet"
                        style={{
                          fontSize: "clamp(3rem, 5vw, 4.5rem)",
                          color: "rgba(var(--color-accent-rgb),0.15)" }}
                      >
                        {String(step.step).padStart(2, "0")}
                      </span>

                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-4">
                          <h3
                            className="font-display font-bold"
                            style={{
                              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                              color: "var(--color-foreground)" }}
                          >
                            {step.title}
                          </h3>
                          <span
                            className="font-mono text-xs shrink-0 mt-1"
                            style={{ color: "var(--color-dead)" }}
                          >
                            {step.duration}
                          </span>
                        </div>

                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: 1.72,
                            color: "var(--color-muted)" }}
                        >
                          {step.summary}
                        </p>

                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: 1.65,
                            color: "var(--color-dead)",
                            borderLeft: "2px solid var(--color-border)",
                            paddingLeft: "12px",
                            marginTop: "4px" }}
                        >
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────── */}
      {service.pricing.length > 0 &&
        (pricingDepartments.some((d) => d.slug === service.slug) ? (
          <div id="plans">
            <ServicePricingSection departmentSlug={service.slug} />
          </div>
        ) : (
          <div id="plans">
            <OldPricingSectionInline service={service} />
          </div>
        ))}

      {/* ── COMPLIANCE BANNER ───────────────────────────── */}
      <section
        id="compliance"
        className="border-t border-border"
        style={{
          backgroundColor: "var(--color-canvas)",
          padding: "clamp(56px, 8vw, 96px) 0" }}
      >
        <div className="container-site">
          <div
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
            style={{
              border: "1px solid var(--color-border)",
              padding: "clamp(28px, 4vw, 56px)",
              backgroundColor: "var(--color-surface)" }}
          >
            <div>
              <span
                className="font-mono uppercase block mb-3"
                style={{
                  fontSize: "11px",
                  color: "var(--color-violet-light)",
                  letterSpacing: "0.22em" }}
              >
                COMPLIANCE BY DESIGN
              </span>
              <h2
                className="font-display font-black"
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.9rem)",
                  color: "var(--color-foreground)",
                  lineHeight: 1.1 }}
              >
                This service is mapped to MTA&apos;s
                <br />
                documented delivery pipeline.
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.72,
                  color: "var(--color-muted)",
                  marginTop: "10px",
                  maxWidth: "480px" }}
              >
                Service execution is gated through signed agreements,
                payment-linked transitions, and documented handover controls.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section
        id="faq"
        className="border-t border-border"
        style={{
          backgroundColor: "var(--color-canvas)",
          padding: "clamp(72px, 10vw, 128px) 0" }}
      >
        <div className="container-site" style={{ maxWidth: "860px" }}>
          <span
            className="font-mono uppercase block mb-5"
            style={{
              fontSize: "11px",
              color: "var(--color-violet-light)",
              letterSpacing: "0.22em" }}
          >
            FAQ
          </span>
          <h2
            className="font-display font-black mb-14 lg:mb-20"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
              color: "var(--color-foreground)" }}
          >
            Questions?
          </h2>

          <div style={{ borderTop: "1px solid var(--color-border)" }}>
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                className="group"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <summary
                  className="flex items-center justify-between py-7 list-none"
                  data-cursor="pointer"
                  style={{ cursor: "none" }}
                >
                  <h3
                    className="font-display font-bold pr-8"
                    style={{
                      fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                      color: "var(--color-foreground)" }}
                  >
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className="w-5 h-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                    style={{ color: "var(--color-muted)" }}
                  />
                </summary>
                <div className="pb-8 pr-10">
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.78,
                      color: "var(--color-muted)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ────────────────────────────── */}
      <section
        className="border-t border-border"
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "clamp(56px, 8vw, 112px) 0" }}
      >
        <div className="container-site">
          <span
            className="font-mono uppercase block mb-4"
            style={{
              fontSize: "11px",
              color: "var(--color-violet-light)",
              letterSpacing: "0.22em" }}
          >
            OTHER SERVICES
          </span>
          <h2
            className="font-display font-black mb-12"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
              color: "var(--color-foreground)" }}
          >
            Keep Exploring
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services
              .filter((s) => s.slug !== slug)
              .slice(0, 2)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  data-cursor="link"
                  className="group flex items-start gap-6 p-10 transition-all duration-300 border border-border hover:border-violet/35"
                  style={{ backgroundColor: "var(--color-card)" }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-violet/40 group-hover:bg-violet/5"
                    style={{ border: "1px solid var(--color-border)" }}
                  >
                    <s.Icon
                      className="w-5 h-5"
                      style={{ color: "var(--color-muted)" }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3
                      className="font-display font-bold"
                      style={{
                        fontSize: "18px",
                        color: "var(--color-foreground)" }}
                    >
                      {s.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--color-muted)",
                        lineHeight: 1.6 }}
                    >
                      {s.tagline}
                    </p>
                    <span
                      className="font-mono text-xs mt-2 transition-colors group-hover:text-violet"
                      style={{ color: "var(--color-dead)" }}
                    >
                      Explore Service →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function OldPricingSectionInline({ service }: { service: ServiceData }) {
  const slug = service.slug;
  return (
    <section
      className="border-t border-border"
      style={{
        backgroundColor: "var(--color-surface)",
        padding: "clamp(72px, 10vw, 128px) 0" }}
    >
      <div className="container-site">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 lg:mb-20">
          <div>
            <span
              className="font-mono uppercase block mb-3"
              style={{
                fontSize: "11px",
                color: "var(--color-violet-light)",
                letterSpacing: "0.22em" }}
            >
              PRICING
            </span>
            <h2
              className="font-display font-black leading-tight"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
                color: "var(--color-foreground)" }}
            >
              Plans &<br />
              Investment
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {service.pricing.map((plan) => (
            <div
              key={plan.label}
              className="flex flex-col overflow-hidden"
              style={{
                border: plan.highlight
                  ? "1px solid var(--color-violet)"
                  : "1px solid var(--color-border)",
                backgroundColor: plan.highlight
                  ? "rgba(var(--color-accent-rgb),0.04)"
                  : "var(--color-card)" }}
            >
              {plan.highlight && (
                <div
                  style={{
                    backgroundColor: "var(--color-violet)",
                    padding: "6px 20px" }}
                >
                  <span className="font-mono text-xs text-white uppercase tracking-widest">
                    ✦ Recommended
                  </span>
                </div>
              )}

              <div className="flex flex-col flex-1 p-10 gap-8">
                <div>
                  <p
                    className="font-display font-bold mb-3"
                    style={{
                      fontSize: "17px",
                      color: "var(--color-foreground)" }}
                  >
                    {plan.label}
                  </p>
                  <p
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      color: plan.highlight
                        ? "var(--color-violet-light)"
                        : "var(--color-foreground)" }}
                  >
                    {plan.amount}
                  </p>
                  {plan.period && (
                    <p
                      className="font-mono text-xs mt-1.5 uppercase tracking-wider"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {plan.period}
                    </p>
                  )}
                </div>

                {plan.subtext && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--color-dead)",
                      borderLeft: "2px solid var(--color-violet)",
                      paddingLeft: "10px",
                      lineHeight: 1.65 }}
                  >
                    {plan.subtext}
                  </p>
                )}

                <div
                  style={{
                    height: "1px",
                    backgroundColor: "var(--color-border)" }}
                />

                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5"
                      style={{
                        fontSize: "13px",
                        color: "var(--color-muted)" }}
                    >
                      <span
                        className="shrink-0 rounded-full"
                        style={{
                          marginTop: "6px",
                          width: "5px",
                          height: "5px",
                          backgroundColor: "var(--color-violet)",
                          opacity: 0.6 }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={buildContactHref(service, plan)}
                  className="mt-auto inline-flex items-center justify-center gap-2 py-3 font-display font-bold text-sm transition-all duration-300 hover:bg-violet-light hover:border-violet rounded-xl"
                  style={{
                    border: plan.highlight
                      ? "1px solid var(--color-violet)"
                      : "1px solid var(--color-border)",
                    backgroundColor: "var(--color-violet)",
                    color: "#fff" }}
                >
                  {plan.amount === "Custom"
                    ? "Request Quote"
                    : "Get Started"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {slug === "performance-marketing" && (
          <p
            className="font-mono text-center mt-8"
            style={{
              fontSize: "11px",
              color: "var(--color-dead)",
              letterSpacing: "0.1em" }}
          >
            * Ad spend is billed separately. 6-month and 12-month
            commitments unlock discounted monthly pricing.
          </p>
        )}
      </div>
    </section>
  );
}
