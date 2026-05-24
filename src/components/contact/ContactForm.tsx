"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Loader2, Shield } from "lucide-react";
import { services as serviceCatalog } from "@/lib/data/services";
import { hasMaliciousInput } from "@/lib/security";
import { OFFICE_HOURS, AGENCY_EMAIL } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Explicit consent required under DPDP Act 2023",
  }),
  followUpConsent: z.boolean().optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

type F = z.infer<typeof schema>;

const SERVICES = [...serviceCatalog.map((service) => service.name), "Other"];
const BUDGETS = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹5,00,000",
  "₹5,00,000+",
  "Not Sure",
];
const TIMELINES = ["ASAP", "Within 1 month", "Within 3 months", "Flexible"];
const WHATSAPP_NUMBER = "919694322131";

const normalizeOption = (value: string | null, options: string[]) => {
  if (!value) return "";
  return options.includes(value) ? value : "";
};

const extractMaxAmount = (text: string) => {
  const matches = text.match(/\d[\d,]*/g);
  if (!matches) return null;

  const amounts = matches
    .map((value) => Number(value.replace(/,/g, "")))
    .filter((value) => Number.isFinite(value));

  if (amounts.length === 0) return null;
  return Math.max(...amounts);
};

const inferBudgetRange = (price: string) => {
  const amount = extractMaxAmount(price);
  if (amount === null) return "Not Sure";
  if (amount <= 25000) return "Under ₹25,000";
  if (amount <= 50000) return "₹25,000–₹50,000";
  if (amount <= 100000) return "₹50,000–₹1,00,000";
  if (amount <= 500000) return "₹1,00,000–₹5,00,000";
  return "₹5,00,000+";
};

const inferTimeline = (hint: string) => {
  const text = hint.toLowerCase();
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
};

const buildWhatsAppMessage = (data: F) => {
  const lines = [
    "New enquiry from the MTA website",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Company: ${data.company}` : null,
    `Service: ${data.service}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    "",
    "Project details:",
    data.message,
    "",
    `Privacy consent: Yes`,
    `Follow-up consent: ${data.followUpConsent ? "Yes" : "No"}`,
  ];

  return lines.filter(Boolean).join("\n");
};

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialService = normalizeOption(searchParams.get("service"), SERVICES);
  const planAmount = searchParams.get("planAmount");
  const planPeriod = searchParams.get("planPeriod");
  const planNote = searchParams.get("planNote");
  const initialBudget = normalizeOption(
    searchParams.get("budget") ??
      (planAmount ? inferBudgetRange(planAmount) : ""),
    BUDGETS,
  );
  const initialTimeline = normalizeOption(
    searchParams.get("timeline") ??
      (planPeriod || planNote
        ? inferTimeline(`${planPeriod ?? ""} ${planNote ?? ""}`)
        : ""),
    TIMELINES,
  );
  const initialMessage = searchParams.get("message") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      privacy: false,
      followUpConsent: false,
      service: initialService,
      budget: initialBudget,
      timeline: initialTimeline,
      message: initialMessage,
    },
  });

  const onSubmit = async (data: F) => {
    if (
      hasMaliciousInput(data.name) ||
      hasMaliciousInput(data.email) ||
      hasMaliciousInput(data.service) ||
      hasMaliciousInput(data.budget) ||
      hasMaliciousInput(data.timeline) ||
      hasMaliciousInput(data.message)
    ) {
      toast.error("Invalid characters detected in form input");
      return;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
    window.location.assign(whatsappUrl);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
      noValidate
    >
      {/* Honeypot — hidden from humans, visible to bots */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
        <label htmlFor="honeypot">Leave this empty</label>
        <input id="honeypot" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-5">
        <SectionLabel
          index="01"
          label="About You"
          hint="Use the best details for a fast reply."
        />
        <Row>
          <Field label="Full Name *" error={errors.name?.message}>
            <Input
              {...register("name")}
              autoComplete="name"
              placeholder="Your name"
            />
          </Field>
          <Field label="Email Address *" error={errors.email?.message}>
            <Input
              {...register("email")}
              autoComplete="email"
              type="email"
              placeholder="you@example.com"
            />
          </Field>
        </Row>
        <Field label="Phone Number">
          <Input
            {...register("phone")}
            autoComplete="tel"
            type="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
          />
        </Field>
        <Field label="Company">
          <Input
            {...register("company")}
            autoComplete="organization"
            placeholder="Your company or organisation"
          />
        </Field>
      </div>

      <div className="flex flex-col gap-5">
        <SectionLabel
          index="02"
          label="Your Project"
          hint="Scope, budget, and timing help us quote accurately."
        />
        <Row>
          <Field label="Service Needed *" error={errors.service?.message}>
            <Select {...register("service")}>
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Budget Range *" error={errors.budget?.message}>
            <Select {...register("budget")}>
              <option value="">Select budget</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
          </Field>
        </Row>
        <Field label="Timeline *" error={errors.timeline?.message}>
          <Select {...register("timeline")}>
            <option value="">Select timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Message *" error={errors.message?.message}>
          <Textarea
            {...register("message")}
            rows={6}
            placeholder="Describe your project, goals, and any specific requirements..."
          />
        </Field>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-lg border border-border bg-surface p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-[24px_1fr] sm:gap-3">
            <input
              {...register("privacy")}
              type="checkbox"
              id="privacy"
              className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded"
              style={{ accentColor: "var(--color-violet)" }}
            />
            <label
              htmlFor="privacy"
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              I explicitly consent to Manglam Technical Agency processing my
              personal data for the purpose of responding to this inquiry under
              the{" "}
              <a
                href="/legal/privacy-policy"
                className="transition-colors hover-foreground"
                style={{ color: "var(--color-violet)" }}
              >
                Privacy Policy
              </a>
              . This consent is free, specific, informed, and unambiguous. I
              understand I may withdraw this consent at any time by contacting{" "}
              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="transition-colors hover-foreground"
                style={{ color: "var(--color-violet)" }}
              >
                {AGENCY_EMAIL}
              </a>
              .
            </label>
          </div>
          {errors.privacy && (
            <p
              className="mt-3 font-mono"
              style={{ fontSize: "11px", color: "#ef4444" }}
            >
              {errors.privacy.message}
            </p>
          )}

          <div className="mt-4 grid gap-3 border-t border-border pt-4">
            <label className="grid gap-3 sm:grid-cols-[24px_1fr]">
              <input
                {...register("followUpConsent")}
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded"
                style={{ accentColor: "var(--color-violet)" }}
              />
              <span
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                I agree to receive project follow-up emails related to this
                inquiry. This does not add me to a newsletter.
              </span>
            </label>
          </div>

          <p
            className="mt-4 text-xs font-mono"
            style={{ color: "var(--color-dead)" }}
          >
            <Shield className="mr-1 inline-block h-3 w-3" />
            DPDP Act 2023 (India) compliant •
            UDYAM-RJ-15-0094091
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          data-cursor="pointer"
          className="btn btn-primary btn-lg w-full font-black uppercase tracking-wide"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            "Send Message →"
          )}
        </button>

        <p
          className="text-center font-mono"
          style={{
            fontSize: "11px",
            color: "var(--color-dead)",
            letterSpacing: "0.1em" }}
        >
          Avg. response · 2–4 hours · {OFFICE_HOURS.weekdays}
        </p>
      </div>
    </form>
  );
}

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
    {children}
  </div>
);

const toId = (label: string) =>
  `field-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "")}`;

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => {
  const id = toId(label);
  const errId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono uppercase"
        style={{
          fontSize: "10px",
          color: "var(--color-dead)",
          letterSpacing: "0.15em" }}
      >
        {label}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            id,
            ...(error
              ? { "aria-describedby": errId, "aria-invalid": "true" }
              : {}),
          } as Partial<unknown>)
        : children}
      {error && (
        <p
          id={errId}
          role="alert"
          className="font-mono"
          style={{ fontSize: "11px", color: "#ef4444" }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  color: "var(--color-foreground)",
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  padding: "15px 16px",
  width: "100%",
  fontSize: "16px",
  minHeight: "52px",
  borderRadius: "12px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s, background-color 0.2s",
  boxShadow: "inset 0 1px 0 rgba(var(--color-accent-rgb), 0.04)",
};

const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="placeholder:text-dead"
    style={inputStyle}
    onFocus={(e) => {
      e.target.style.borderColor = "var(--color-violet)";
      e.target.style.boxShadow = "0 0 0 4px rgba(var(--color-accent-rgb),0.08)";
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "var(--color-border)";
      e.target.style.boxShadow = "inset 0 1px 0 rgba(var(--color-accent-rgb), 0.04)";
    }}
  />
);

const Select = ({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    style={{
      ...inputStyle,
      appearance: "none",
      backgroundImage:
        "linear-gradient(45deg, transparent 50%, var(--color-dead) 50%), linear-gradient(135deg, var(--color-dead) 50%, transparent 50%), linear-gradient(to right, transparent, transparent)",
      backgroundPosition:
        "calc(100% - 18px) calc(50% - 2px), calc(100% - 13px) calc(50% - 2px), 0 0",
      backgroundSize: "5px 5px, 5px 5px, 100% 100%",
      backgroundRepeat: "no-repeat",
      cursor: "pointer",
      paddingRight: "46px" }}
  >
    {children}
  </select>
);

const Textarea = ({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="resize-y placeholder:text-dead"
    style={{
      ...inputStyle,
      fontFamily: "var(--font-body)",
      resize: "vertical",
      minHeight: "144px" }}
    onFocus={(e) => {
      e.target.style.borderColor = "var(--color-violet)";
      e.target.style.boxShadow = "0 0 0 4px rgba(var(--color-accent-rgb),0.08)";
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "var(--color-border)";
      e.target.style.boxShadow = "inset 0 1px 0 rgba(var(--color-accent-rgb), 0.04)";
    }}
  />
);

const SectionLabel = ({
  index,
  label,
  hint,
}: {
  index: string;
  label: string;
  hint: string;
}) => (
  <div className="flex flex-col gap-2 rounded-[18px] border border-border bg-accent-soft px-4 py-3.5">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span
          className="font-display text-[1.5rem] font-black leading-none select-none"
          style={{ color: "rgba(var(--color-accent-rgb),0.22)" }}
        >
          {index}
        </span>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "11px",
            color: "var(--color-dead)",
            letterSpacing: "0.2em" }}
        >
          {label}
        </span>
      </div>
    </div>
    <p
      className="font-mono text-[11px] leading-relaxed"
      style={{ color: "var(--color-muted)" }}
    >
      {hint}
    </p>
  </div>
);
