import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
}

export default function GradientText({ children, className, as: Tag = 'span' }: GradientTextProps) {
  return (
    <Tag
      className={cn(
        'bg-gradient-to-r from-violet-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent',
        '[-webkit-background-clip:text] [-webkit-text-fill-color:transparent]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
