"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CheckCircle2, Loader2, Shield } from "lucide-react";
import { services as serviceCatalog } from "@/lib/data/services";
import { hasMaliciousInput } from "@/lib/security";
import { OFFICE_HOURS, AGENCY_EMAIL } from "@/lib/constants";
import { AnimatedCheckbox } from "@/components/ui/AnimatedCheckbox";

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
  sensitiveDataConsent: z.boolean().optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

type F = z.infer<typeof schema>;
type SubmitState = "idle" | "validating" | "submitting" | "redirecting" | "success" | "error";

const SERVICES = [...serviceCatalog.map((service) => service.name), "Other"];
const BUDGETS = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹5,00,000",
  "₹5,00,000+",
  "Not Sure",
];
const SERVICE_BUDGET_RANGES: Record<string, (typeof BUDGETS)[number]> = {
  "AI Automation": "₹5,00,000+",
  "Performance Marketing": "₹50,000–₹1,00,000",
  Cybersecurity: "₹1,00,000–₹5,00,000",
  "App & Website Development": "₹5,00,000+",
  Branding: "₹1,00,000–₹5,00,000",
  Other: "Not Sure",
};
const TIMELINES = ["ASAP", "Within 1 month", "Within 3 months", "Flexible"];
const WHATSAPP_NUMBER = "919694322131"; // +91 9694322131

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

const inferServiceBudgetRange = (serviceName: string, serviceOptions: string[]) => {
  if (!serviceName) return "";
  if (!serviceOptions.includes(serviceName)) return "";
  if (SERVICE_BUDGET_RANGES[serviceName]) return SERVICE_BUDGET_RANGES[serviceName];

  const service = serviceCatalog.find((item) => item.name === serviceName);
  if (!service) return "";

  const planAmounts = service.pricing
    .map((plan) => extractMaxAmount(plan.amount))
    .filter((amount): amount is number => amount !== null);

  if (planAmounts.length > 0) {
    return inferBudgetRange(String(Math.max(...planAmounts)));
  }

  return inferBudgetRange(service.priceLabel);
};

const getRecommendedInitialBudget = ({
  service,
  serviceBudget,
  queryBudget,
}: {
  service: string;
  serviceBudget: string;
  queryBudget: string;
}) => {
  if (service && serviceBudget) return serviceBudget;
  return queryBudget;
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

const getSelectionSummary = (searchParams: ReturnType<typeof useSearchParams>) => {
  const selectionType = searchParams.get("selectionType");
  const planName = searchParams.get("planName") ?? searchParams.get("plan");
  const bundleName = searchParams.get("bundleName");
  const departmentName = searchParams.get("departmentName");
  const serviceName = searchParams.get("serviceName") ?? searchParams.get("service");
  const price = searchParams.get("price") ?? searchParams.get("planAmount");
  const durationLabel = searchParams.get("durationLabel") ?? searchParams.get("planPeriod");

  if (!selectionType && !planName && !bundleName && !price) return null;

  const title =
    selectionType === "bundle"
      ? bundleName
      : [departmentName ?? serviceName, planName].filter(Boolean).join(" - ");

  const details = [price, durationLabel].filter(Boolean).join(" - ");

  return {
    title: title || serviceName || "Selected option",
    details,
    label:
      selectionType === "bundle"
        ? "Bundle selected"
        : selectionType === "service"
          ? "Service selected"
          : "Plan selected",
  };
};

const SELECTION_QUERY_KEYS = [
  "selectionType",
  "planName",
  "plan",
  "bundleName",
  "departmentName",
  "serviceName",
  "price",
  "durationLabel",
  "durationNote",
  "planAmount",
  "planPeriod",
  "planNote",
];

const FORM_FIELD_ORDER: (keyof F)[] = [
  "name",
  "email",
  "service",
  "budget",
  "timeline",
  "message",
  "privacy",
];

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
    `Sensitive data consent: ${data.sensitiveDataConsent ? "Yes" : "No"}`,
  ];

  return lines.filter(Boolean).join("\n");
};

export default function ContactForm({
  serviceOptions = SERVICES,
}: {
  serviceOptions?: string[];
} = {}) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasServiceOptions = serviceOptions.length > 0;
  const initialService = normalizeOption(searchParams.get("service"), serviceOptions);
  const planAmount = searchParams.get("planAmount") ?? searchParams.get("price");
  const planPeriod = searchParams.get("planPeriod") ?? searchParams.get("durationLabel");
  const planNote = searchParams.get("planNote") ?? searchParams.get("durationNote");
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
  const initialServiceBudget = inferServiceBudgetRange(initialService, serviceOptions);
  const initialRecommendedBudget = getRecommendedInitialBudget({
    service: initialService,
    serviceBudget: initialServiceBudget,
    queryBudget: initialBudget,
  });
  const selectedSummary = getSelectionSummary(searchParams);

  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      privacy: false,
      followUpConsent: false,
      sensitiveDataConsent: false,
      service: initialService,
      budget: initialRecommendedBudget,
      timeline: initialTimeline,
      message: initialMessage,
    },
  });

  const selectedService = useWatch({ control, name: "service" });
  const selectedBudget = useWatch({ control, name: "budget" });
  const lastServiceSyncedBudget = useRef(initialRecommendedBudget);
  const suggestedBudget = useMemo(
    () => inferServiceBudgetRange(selectedService, serviceOptions),
    [selectedService, serviceOptions],
  );

  useEffect(() => {
    if (!selectedService || !suggestedBudget) return;

    const budgetWasNotManuallyChanged =
      !selectedBudget || selectedBudget === lastServiceSyncedBudget.current;

    if (budgetWasNotManuallyChanged && selectedBudget !== suggestedBudget) {
      lastServiceSyncedBudget.current = suggestedBudget;
      setValue("budget", suggestedBudget, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [selectedBudget, selectedService, setValue, suggestedBudget]);

  const clearSelection = () => {
    const params = new URLSearchParams(searchParams.toString());
    SELECTION_QUERY_KEYS.forEach((key) => params.delete(key));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const onInvalid = (fieldErrors: FieldErrors<F>) => {
    setSubmitState("error");
    const first = FORM_FIELD_ORDER.find((field) => fieldErrors[field]);
    if (first) setFocus(first);
  };

  const onSubmit = async (data: F) => {
    setSubmitState("validating");
    if (
      hasMaliciousInput(data.name) ||
      hasMaliciousInput(data.email) ||
      hasMaliciousInput(data.company ?? "") ||
      hasMaliciousInput(data.service) ||
      hasMaliciousInput(data.budget) ||
      hasMaliciousInput(data.timeline) ||
      hasMaliciousInput(data.message)
    ) {
      setSubmitState("error");
      toast.error("Invalid characters detected in form input");
      return;
    }

    try {
      setSubmitState("submitting");
      const consentTimestamp = new Date().toISOString();
      const nextWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: data.service,
          budget: data.budget,
          timeline: data.timeline,
          message: data.message,
          privacy: data.privacy,
          followUpConsent: Boolean(data.followUpConsent),
          sensitiveDataConsent: Boolean(data.sensitiveDataConsent),
          consentTimestamp,
          consentPurpose: "contact-form-submission",
          consentUserAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setWhatsappUrl(nextWhatsappUrl);
        setSubmitState("redirecting");
        toast.error(
          body?.message || "Could not save the enquiry. Opening WhatsApp with your details.",
        );
        window.location.assign(nextWhatsappUrl);
        return;
      }

      setWhatsappUrl(nextWhatsappUrl);
      setSubmitState("success");
      toast.success("Enquiry submitted securely. You can continue on WhatsApp if urgent.");
    } catch {
      const nextWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
      setWhatsappUrl(nextWhatsappUrl);
      setSubmitState("redirecting");
      toast.error("Could not save the enquiry. Opening WhatsApp with your details.");
      window.location.assign(nextWhatsappUrl);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col gap-8"
      noValidate
    >
      {/* Honeypot — hidden from humans, visible to bots */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
        <label htmlFor="honeypot">Leave this empty</label>
        <input id="honeypot" {...register("honeypot")} tabIndex={-1} autoComplete="off" suppressHydrationWarning />
      </div>

      {selectedSummary && (
        <div
          className="rounded-2xl border border-[rgba(var(--color-accent-rgb),0.22)] bg-[rgba(var(--color-accent-rgb),0.06)] p-4 sm:p-5"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{ color: "var(--color-violet-light)" }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "var(--color-violet-light)" }}
              >
                {selectedSummary.label}
              </p>
              <p
                className="mt-1 text-sm font-semibold leading-snug"
                style={{ color: "var(--color-foreground)" }}
              >
                You selected {selectedSummary.title}
                {selectedSummary.details ? ` - ${selectedSummary.details}` : ""}.
              </p>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                The form below has been pre-filled from that selection.
              </p>
              <button
                type="button"
                onClick={clearSelection}
                className="mt-3 inline-flex min-h-[36px] items-center rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:border-violet hover:text-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                style={{ color: "var(--color-muted)" }}
              >
                Change selection
              </button>
            </div>
          </div>
        </div>
      )}

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
              required
              placeholder="Your name"
            />
          </Field>
          <Field label="Email Address *" error={errors.email?.message}>
            <Input
              {...register("email")}
              autoComplete="email"
              type="email"
              required
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
            placeholder="Your phone number (10 digits)"
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
          <div className="relative">
            <label
              htmlFor="field-service-needed"
              className="pointer-events-none absolute left-4 top-2 z-10 font-mono text-[10px] uppercase tracking-[0.16em] text-dead transition-all duration-200"
            >
              Service Needed *
            </label>
            <Controller
              control={control}
              name="service"
              render={({ field }) => (
                <Select
                  id="field-service-needed"
                  name={field.name}
                  value={field.value ?? ""}
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value);
                    const budget = inferServiceBudgetRange(value, serviceOptions);
                    if (budget) {
                      lastServiceSyncedBudget.current = budget;
                      setValue("budget", budget, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }
                  }}
                  required
                  disabled={!hasServiceOptions}
                  aria-required="true"
                  aria-invalid={errors.service ? "true" : "false"}
                  aria-describedby={errors.service ? "field-service-needed-error" : undefined}
                >
                  <option value="">
                    {hasServiceOptions
                      ? "Select a service"
                      : "Service options failed to load. Please refresh."}
                  </option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.service && (
              <p
                id="field-service-needed-error"
                role="alert"
                className="mt-2 font-mono"
                style={{ fontSize: "11px", color: "#ef4444" }}
              >
                {errors.service.message}
              </p>
            )}
          </div>
          <Field label="Budget Range *" error={errors.budget?.message}>
            <Select {...register("budget")} required>
              <option value="">Select budget</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
            {selectedService && suggestedBudget && (
              <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                Suggested for {selectedService}: {suggestedBudget}. You can change it if your scope is different.
              </p>
            )}
          </Field>
        </Row>
        <Field label="Timeline *" error={errors.timeline?.message}>
          <Select {...register("timeline")} required>
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
            <AnimatedCheckbox
              {...register("privacy")}
              id="privacy"
              required
              aria-required="true"
              aria-invalid={errors.privacy ? "true" : "false"}
              aria-describedby={errors.privacy ? "privacy-error" : undefined}
            />
            <label
              htmlFor="privacy"
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              I explicitly consent to Manglam Technical Agency processing my
              personal data for the purpose of responding to this inquiry under
              the{" "}
              <span
                className="transition-colors"
                style={{ color: "var(--color-violet)" }}
              >
                Privacy Policy
              </span>
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
              id="privacy-error"
              className="mt-3 font-mono"
              role="alert"
              style={{ fontSize: "11px", color: "#ef4444" }}
            >
              {errors.privacy.message}
            </p>
          )}

          <div className="mt-4 grid gap-3 border-t border-border pt-4">
            <label className="grid gap-3 sm:grid-cols-[24px_1fr]">
              <AnimatedCheckbox
                {...register("followUpConsent")}
                id="followUpConsent"
              />
              <span
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                I agree to receive project follow-up emails related to this
                inquiry. This does not add me to a newsletter.
              </span>
            </label>
            <label className="grid gap-3 sm:grid-cols-[24px_1fr]">
              <AnimatedCheckbox
                {...register("sensitiveDataConsent")}
                id="sensitiveDataConsent"
              />
              <span
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                If my enquiry includes health, biometric, or FitNexora-related
                data, I explicitly consent to MTA reviewing that sensitive
                information only for this enquiry.
              </span>
            </label>
          </div>

          <p
            className="mt-4 text-xs font-mono"
            style={{ color: "var(--color-dead)" }}
          >
            <Shield className="mr-1 inline-block h-3 w-3" />
            DPDP Act 2023 consent captured. Business registration details are available where relevant.
          </p>
        </div>

        {submitState === "success" && (
          <div
            className="rounded-lg border p-4"
            role="status"
            aria-live="polite"
            style={{
              borderColor: "rgba(var(--color-accent-rgb),0.24)",
              backgroundColor: "rgba(var(--color-accent-rgb),0.06)",
            }}
          >
            <p
              className="font-display text-base font-black"
              style={{ color: "var(--color-foreground)" }}
            >
              Enquiry submitted securely.
            </p>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              We captured your consent record and project details. For urgent
              work, you can also continue on WhatsApp with the same details.
            </p>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-border px-5 font-display text-sm font-bold transition-colors hover:border-violet hover:text-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                Continue on WhatsApp →
              </a>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || submitState === "submitting" || submitState === "redirecting"}
          data-cursor="pointer"
          className="btn btn-primary btn-lg w-full font-black uppercase tracking-wide"
        >
          {submitState === "validating" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Checking...
            </>
          ) : submitState === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : submitState === "redirecting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Opening WhatsApp...
            </>
          ) : submitState === "error" ? (
            <>
              <span className="inline-block animate-[shake_420ms_ease-in-out]">Try Again →</span>
            </>
          ) : submitState === "success" ? (
            "Submit Another Enquiry →"
          ) : (
            "Submit Enquiry →"
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
  const required = label.includes("*");
  const enhanceControl = (child: React.ReactElement) =>
    React.cloneElement(child, {
      id,
      ...(required ? { "aria-required": "true" } : {}),
      "aria-invalid": error ? "true" : "false",
      ...(error
        ? { "aria-describedby": errId, "aria-invalid": "true" }
        : {}),
    } as Partial<unknown>);
  const enhancedChildren = React.isValidElement(children)
    ? enhanceControl(children)
    : (() => {
        const childArray = React.Children.toArray(children);
        const controlIndex = childArray.findIndex((child) => React.isValidElement(child));
        return childArray.map((child, index) =>
          React.isValidElement(child) && index === controlIndex
            ? enhanceControl(child)
            : child,
        );
      })();

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 z-10 font-mono text-[10px] uppercase tracking-[0.16em] text-dead transition-all duration-200 peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-xs peer-placeholder-shown:tracking-[0.12em] peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-[0.16em] peer-focus:text-violet"
      >
        {label}
      </label>
      {enhancedChildren}
      {error && (
        <p
          id={errId}
          role="alert"
          className="mt-2 font-mono"
          style={{ fontSize: "11px", color: "#ef4444" }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    suppressHydrationWarning
    className="peer contact-control placeholder:text-transparent"
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
    suppressHydrationWarning
    className="peer mta-select contact-control contact-select"
    onFocus={(e) => {
      e.target.style.borderColor = "var(--color-violet)";
      e.target.style.boxShadow = "0 0 0 4px rgba(var(--color-accent-rgb),0.08)";
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "var(--color-border)";
      e.target.style.boxShadow = "inset 0 1px 0 rgba(var(--color-accent-rgb), 0.04)";
    }}
  >
    {children}
  </select>
);

const Textarea = ({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    suppressHydrationWarning
    className="peer contact-control contact-textarea placeholder:text-transparent"
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
