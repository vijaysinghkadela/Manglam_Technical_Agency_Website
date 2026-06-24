import { services } from '@/lib/data/services';

const SERVICE_NAME_BY_SLUG = Object.fromEntries(
  services.map((service) => [service.slug, service.name]),
) as Record<string, string>;

export const DEPARTMENT_SERVICE_MAP: Record<string, string> = {
  'ai-automation': SERVICE_NAME_BY_SLUG['ai-automation'] || 'AI Automation',
  branding: SERVICE_NAME_BY_SLUG.branding || 'Branding',
  cybersecurity: SERVICE_NAME_BY_SLUG.cybersecurity || 'Cybersecurity',
  'performance-marketing': SERVICE_NAME_BY_SLUG['performance-marketing'] || 'Performance Marketing',
  'saas-products': SERVICE_NAME_BY_SLUG['saas-products'] || 'App & Website Development',
};

export const DEPARTMENT_NAME_MAP: Record<string, string> = {
  'ai-automation': 'AI & Automation',
  branding: 'Branding & Identity',
  cybersecurity: 'Cybersecurity',
  'performance-marketing': 'Performance Marketing',
  'saas-products': 'SaaS & Web Development',
};

const BUDGET_RANGES = [
  { max: 25000, label: 'Under ₹25,000' },
  { max: 50000, label: '₹25,000–₹50,000' },
  { max: 100000, label: '₹50,000–₹1,00,000' },
  { max: 500000, label: '₹1,00,000–₹5,00,000' },
] as const;

export function inferBudget(price: string): string {
  const amounts = price
    .match(/\d[\d,]*/g)
    ?.map((value) => Number(value.replace(/,/g, '')))
    .filter((value) => Number.isFinite(value));
  const num = amounts?.length ? Math.max(...amounts) : NaN;
  if (!num || isNaN(num)) return 'Not Sure';
  for (const r of BUDGET_RANGES) {
    if (num <= r.max) return r.label;
  }
  return '₹5,00,000+';
}

export function inferTimeline(label: string, note?: string): string {
  const text = `${label} ${note || ''}`.toLowerCase();
  if (
    text.includes('ongoing') ||
    text.includes('retainer') ||
    text.includes('monthly') ||
    text.includes('partnership') ||
    text.includes('amc') ||
    text.includes('maintain') ||
    text.includes('iterat')
  )
    return 'Flexible';
  if (
    text.includes('1-month') ||
    text.includes('1 month') ||
    text.includes('fixed') ||
    text.includes('build') ||
    text.includes('setup') ||
    text.includes('package') ||
    text.includes('assessment') ||
    text.includes('engagement')
  )
    return 'Within 1 month';
  if (
    text.includes('3-4') ||
    text.includes('4-6') ||
    text.includes('6-month') ||
    text.includes('12-month') ||
    text.includes('quarterly') ||
    text.includes('sprint') ||
    text.includes('phased') ||
    text.includes('managed') ||
    text.includes('contract')
  )
    return 'Within 3 months';
  return 'Within 3 months';
}

export function buildPlanContactHref(
  slug: string,
  planName: string,
  departmentName: string,
  price: string,
  durationLabel: string,
  durationNote?: string,
): string {
  const service = DEPARTMENT_SERVICE_MAP[slug] || departmentName;
  const budget = inferBudget(price);
  const timeline = inferTimeline(durationLabel, durationNote);
  const message = `I'm interested in the ${planName} plan for ${departmentName} at ${price} (${durationLabel}). Please share more details and next steps.`;

  const params = new URLSearchParams({
    service,
    budget,
    timeline,
    message,
    selectionType: 'plan',
    planName,
    departmentName,
    serviceName: service,
    price,
    durationLabel,
  });

  if (durationNote) params.set('durationNote', durationNote);

  return `/contact?${params.toString()}`;
}

export function buildBundleContactHref(
  bundleName: string,
  total: string,
  plans: { department: string; plan: string; price: string }[],
): string {
  const firstDept = plans[0]?.department || 'Other';
  const service =
    Object.entries(DEPARTMENT_NAME_MAP).find(
      ([, v]) => v === firstDept,
    )?.[0] || 'Other';
  const serviceName = DEPARTMENT_SERVICE_MAP[service] || firstDept;
  const budget = inferBudget(total);
  const plansList = plans
    .map((p) => `- ${p.department}: ${p.plan} (${p.price})`)
    .join('\n');
  const message = `I'm interested in the ${bundleName} bundle:\n${plansList}\nTotal: ${total}. Please share more details and next steps.`;

  const params = new URLSearchParams({
    service: serviceName,
    budget,
    timeline: 'Flexible',
    message,
    selectionType: 'bundle',
    bundleName,
    departmentName: firstDept,
    serviceName,
    price: total,
    durationLabel: 'Flexible',
  });

  return `/contact?${params.toString()}`;
}
