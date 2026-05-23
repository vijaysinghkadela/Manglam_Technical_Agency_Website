'use client'
import { ChevronDown } from "lucide-react"

export interface FAQItem {
  q: string
  a: string
}

interface FAQSectionProps {
  label?: string
  title?: string
  items: FAQItem[]
  className?: string
}

export function FAQSection({
  label = "FAQ",
  title = "Questions?",
  items,
  className = "",
}: FAQSectionProps) {
  if (!items.length) return null

  return (
    <section
      className={`border-t border-border ${className}`}
      style={{
        backgroundColor: "var(--color-canvas)",
        padding: "clamp(72px, 10vw, 128px) 0",
      }}
    >
      <div className="container-site" style={{ maxWidth: "860px" }}>
        <span
          className="font-mono uppercase block mb-5"
          style={{
            fontSize: "11px",
            color: "var(--color-violet-light)",
            letterSpacing: "0.22em",
          }}
        >
          {label}
        </span>
        <h2
          className="font-display font-black mb-14 lg:mb-20"
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
            color: "var(--color-foreground)",
          }}
        >
          {title}
        </h2>

        <div style={{ borderTop: "1px solid var(--color-border)" }}>
          {items.map((faq, i) => (
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
                    color: "var(--color-foreground)",
                  }}
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
                    color: "var(--color-muted)",
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
