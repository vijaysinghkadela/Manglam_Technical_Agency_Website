/**
 * MTA Design System
 * Professional design tokens for Manglam Technical Agency
 * Based on UI/UX Pro Max and Frontend Design Skills
 */

// ============================================
// BRAND COLORS
// ============================================
export const BRAND = {
  // Primary deep red brand color
  primary: '#6B1A1A',
  primaryLight: '#8b2d2d',
  primaryLighter: '#a04040', // 4.5:1 contrast on #090706 (WCAG AA)
  primaryDark: '#4a1212',
  primarySoft: 'rgba(107, 26, 26, 0.08)',
  primaryMedium: 'rgba(107, 26, 26, 0.15)',
  primaryStrong: 'rgba(107, 26, 26, 0.5)',
  // WCAG compliant text colors
  primaryText: '#a04040', // 4.5:1 on dark bg (WCAG AA)
  primaryTextLight: '#c06060', // 7:1 on dark bg (WCAG AAA)
} as const

// ============================================
// SEMANTIC COLORS - maps to CSS custom properties
// Use these for consistency with Tailwind v4 @theme
// ============================================
export const COLORS = {
  // Status colors
  success: '#10b981',
  successSoft: 'rgba(16, 185, 129, 0.1)',
  info: '#3b82f6',
  infoSoft: 'rgba(59, 130, 246, 0.1)',
  warning: '#f59e0b',
  warningSoft: 'rgba(245, 158, 11, 0.1)',
  error: '#ef4444',
  errorSoft: 'rgba(239, 68, 68, 0.1)',
  // These map to CSS vars in globals.css @theme
  canvas: 'var(--color-canvas)',
  surface: 'var(--color-surface)',
  card: 'var(--color-card)',
  border: 'var(--color-border)',
  foreground: 'var(--color-foreground)',
  muted: 'var(--color-muted)',
  dead: 'var(--color-dead)',
} as const

// ============================================
// ANIMATION CONSTANTS
// ============================================
export const ANIMATION = {
  // Duration presets
  duration: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.5,
    slow: 0.7,
    reveal: 0.9,
    dramatic: 1.2,
  },
  // Easing curves - all arrays for consistency
  ease: [0.16, 1, 0.3, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  // Stagger delays
  stagger: 0.08,
  staggerFast: 0.05,
  staggerSlow: 0.12,
  // Parallax intensities
  parallax: {
    subtle: 8,
    medium: 16,
    strong: 24,
    extreme: 40,
  },
} as const

// ============================================
// SPACING SYSTEM
// ============================================
export const SPACING = {
  // Section padding (vertical)
  section: {
    xs: 'clamp(32px, 4vw, 48px)',
    sm: 'clamp(40px, 6vw, 64px)',
    md: 'clamp(56px, 8vw, 96px)',
    lg: 'clamp(64px, 10vw, 120px)',
    xl: 'clamp(80px, 12vw, 160px)',
  },
  // Container padding (horizontal)
  container: {
    xs: 'clamp(1rem, 4vw, 2rem)',
    sm: 'clamp(1rem, 5vw, 3rem)',
    md: 'clamp(1rem, 5vw, 4rem)',
    lg: 'clamp(1.5rem, 6vw, 5rem)',
  },
  // Gap sizes
  gap: {
    '2xs': '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
} as const

// ============================================
// TYPOGRAPHY SCALE
// ============================================
export const TYPOGRAPHY = {
  // Fluid type scale
  display: 'clamp(3rem, 8vw, 6rem)',
  hero: 'clamp(2.5rem, 5vw, 5rem)',
  section: 'clamp(1.75rem, 4vw, 3rem)',
  subsection: 'clamp(1.25rem, 2.5vw, 1.75rem)',
  bodyLg: '1.125rem',
  body: '1rem',
  bodySm: '0.9375rem',
  caption: '0.8125rem',
  label: '0.6875rem',
  micro: '0.625rem',
  nano: '0.5625rem',
  // Line heights
  leading: {
    tight: 0.92,
    snug: 1.1,
    normal: 1.5,
    relaxed: 1.72,
    loose: 2,
  },
  // Font weights
  weight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  // Letter spacing - semantic names
  tracking: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.1em',
    wider: '0.16em', // Used for labels/badges
    widest: '0.22em', // Used for section labels
  },
} as const

// ============================================
// BORDER RADIUS
// ============================================
export const RADIUS = {
  none: '0',
  xs: '6px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '28px',
  '3xl': '32px',
  full: '9999px',
} as const

// ============================================
// SHADOWS
// ============================================
export const SHADOW = {
  none: 'none',
  xs: '0 1px 2px rgba(0,0,0,0.02)',
  sm: '0 2px 8px rgba(0,0,0,0.04)',
  md: '0 4px 16px rgba(0,0,0,0.06)',
  lg: '0 8px 32px rgba(0,0,0,0.08)',
  xl: '0 16px 48px rgba(0,0,0,0.12)',
  '2xl': '0 24px 64px rgba(0,0,0,0.16)',
  // Special shadows
  glow: `0 0 40px ${BRAND.primaryMedium}`,
  glowStrong: `0 0 60px ${BRAND.primaryStrong}`,
  inner: 'inset 0 2px 4px rgba(0,0,0,0.06)',
} as const

// ============================================
// BREAKPOINTS
// ============================================
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// ============================================
// Z-INDEX SCALE
// ============================================
export const Z_INDEX = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  skipLink: 900,
} as const

// ============================================
// GRADIENTS
// ============================================
export const GRADIENT = {
  brand: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryLight} 100%)`,
  brandSoft: `linear-gradient(135deg, ${BRAND.primarySoft} 0%, rgba(255,255,255,0.02) 100%)`,
  surface: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-canvas) 100%)',
  glow: `radial-gradient(circle, ${BRAND.primaryMedium} 0%, transparent 70%)`,
  border: `linear-gradient(90deg, ${BRAND.primary}, transparent 80%)`,
} as const

// ============================================
// TRANSITIONS
// ============================================
export const TRANSITION = {
  fast: 'all 0.15s ease',
  normal: 'all 0.3s ease',
  slow: 'all 0.5s ease',
  spring: `all ${ANIMATION.duration.fast}s cubic-bezier(${ANIMATION.ease.join(',')})`,
} as const
