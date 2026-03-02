import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Plan } from '@/types';

interface PricingCardProps {
  plan: Plan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <GlassCard
      className={`relative ${plan.popular ? 'border-brand/40 shadow-lg shadow-brand/10' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-brand text-white text-xs font-bold rounded-full">
          Popular
        </div>
      )}
      <h3 className="text-lg font-semibold text-text-primary mb-1">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-heading font-bold gradient-text">{plan.price}</span>
        <span className="text-sm text-text-muted">{plan.period}</span>
      </div>
      <ul className="space-y-2.5 my-6">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted">
            <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={plan.ctaLink}
        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
          plan.popular
            ? 'bg-brand text-white hover:bg-brand-light hover:shadow-lg hover:shadow-brand/25'
            : 'border border-brand/30 text-text-primary hover:border-brand hover:bg-brand/5'
        }`}
        id={`pricing-cta-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </GlassCard>
  );
}
