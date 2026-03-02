import GradientText from './GradientText';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeader({
  label,
  badge,
  title,
  subtitle,
  centered = true,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const badgeText = badge || label;
  const isCentered = align === 'center' || centered;

  return (
    <div
      className={cn(
        'flex flex-col gap-3 max-w-2xl mb-12 lg:mb-16',
        isCentered ? 'text-center items-center mx-auto' : 'text-left items-start',
        className,
      )}
    >
      {badgeText && (
        <span className="text-xs font-bold tracking-[0.15em] uppercase text-violet-400">
          {badgeText}
        </span>
      )}
      <GradientText as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight">
        {title}
      </GradientText>
      {subtitle && (
        <p className="mt-1 text-white/55 text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
