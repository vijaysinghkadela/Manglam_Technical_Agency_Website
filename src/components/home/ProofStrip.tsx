import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { testimonials } from "@/lib/data/testimonials";
import { AGENCY_FOUNDED } from "@/lib/constants";

const liveProjects = projects.filter((project) => project.status === "live");
const clientProjects = liveProjects.filter((project) => project.type !== "product");

const proofItems = [
  {
    value: `${liveProjects.length}`,
    label: "live public portfolio entries",
    note: "Client work, managed handles, and inspectable MTA product demos.",
  },
  {
    value: `${clientProjects.length}`,
    label: "client-facing builds shown",
    note: "No hidden placeholder count or inflated project total.",
  },
  {
    value: `${services.length}`,
    label: "service departments",
    note: "Web, automation, security, marketing, and branding delivery.",
  },
  {
    value: `${testimonials.length}`,
    label: "published client voices",
    note: "Displayed from the current testimonial archive.",
  },
  {
    value: `${AGENCY_FOUNDED}`,
    label: "formal operating baseline",
    note: "Young agency, explicit about current scale and proof.",
  },
];

export function ProofStrip() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="mx-auto grid w-full max-w-[1600px] gap-px bg-[var(--color-border)] px-5 sm:px-9 md:grid-cols-2 lg:grid-cols-5 lg:px-16">
        {proofItems.map((item) => (
          <article key={item.label} className="bg-[var(--color-card)] py-7 md:px-5 lg:px-6">
            <p className="font-display text-4xl font-semibold leading-none tracking-normal text-[var(--color-foreground)]">
              {item.value}
            </p>
            <h2 className="mt-3 text-sm font-semibold leading-snug text-[var(--color-foreground)]">
              {item.label}
            </h2>
            <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">
              {item.note}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
