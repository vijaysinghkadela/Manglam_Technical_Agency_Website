'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

interface FloatingLabelProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  value: string;
  onChange: (val: string) => void;
  error?: string;
  required?: boolean;
  rows?: number;
}

export default function FloatingLabel({
  id, label, type = 'text', value, onChange, error, required, rows = 4,
}: FloatingLabelProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isActive = focused || hasValue;

  const baseClass = cn(
    'w-full bg-dark border rounded-xl px-4 pt-6 pb-2 text-sm text-text-primary outline-none transition-all duration-200',
    error ? 'border-error focus:border-error' : 'border-border focus:border-brand',
  );

  const labelClass = cn(
    'absolute left-4 transition-all duration-200 pointer-events-none',
    isActive ? 'top-2 text-xs' : 'top-4 text-sm',
    error ? 'text-error' : isActive ? 'text-brand-light' : 'text-text-muted',
  );

  return (
    <div className="relative">
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={rows}
          className={cn(baseClass, 'resize-none')}
          aria-label={label}
          aria-invalid={!!error}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass}
          aria-label={label}
          aria-invalid={!!error}
          required={required}
        />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}{required && ' *'}
      </label>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
