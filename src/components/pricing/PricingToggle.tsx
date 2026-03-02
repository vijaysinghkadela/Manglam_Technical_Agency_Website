'use client';

interface PricingToggleProps {
  billingPeriod: 'monthly' | 'annual';
  onToggle: (period: 'monthly' | 'annual') => void;
}

export default function PricingToggle({ billingPeriod, onToggle }: PricingToggleProps) {
  return (
    <div className="max-w-xs mx-auto flex items-center bg-surface rounded-xl p-1 border border-brand/15">
      <button
        onClick={() => onToggle('monthly')}
        className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          billingPeriod === 'monthly' ? 'bg-brand text-white' : 'text-text-muted hover:text-text-primary'
        }`}
        aria-label="Show monthly pricing"
        id="pricing-toggle-monthly"
      >
        Monthly
      </button>
      <button
        onClick={() => onToggle('annual')}
        className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
          billingPeriod === 'annual' ? 'bg-brand text-white' : 'text-text-muted hover:text-text-primary'
        }`}
        aria-label="Show annual pricing"
        id="pricing-toggle-annual"
      >
        Annual
        <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-success text-white text-[10px] font-bold rounded-full">
          Save
        </span>
      </button>
    </div>
  );
}
