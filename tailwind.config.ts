import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas:  '#080808',
        surface: '#0E0E0E',
        card:    '#111111',
        border:  '#1F1F1F',
        muted:   '#737373',
        dead:    '#2A2A2A',
        violet: {
          DEFAULT: '#7C3AED',
          light:   '#A78BFA',
          dark:    '#5B21B6',
        },
        cyan:    '#06B6D4',
        amber:   '#F59E0B',
      },
      fontFamily: {
        display: ['var(--font-syne)',      'sans-serif'],
        body:    ['var(--font-inter)',      'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: {
        site: '1440px',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontSize: {
        'display-xl': ['clamp(64px, 9vw, 140px)',  { lineHeight: '0.90', letterSpacing: '-0.04em', fontWeight: '900' }],
        'display-lg': ['clamp(48px, 6vw, 96px)',    { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '900' }],
        'display-md': ['clamp(32px, 4vw, 60px)',    { lineHeight: '0.93', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-sm': ['clamp(24px, 2.5vw, 40px)',  { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '800' }],
        'body-lg':    ['18px', { lineHeight: '1.65', letterSpacing: '0' }],
        'body-md':    ['15px', { lineHeight: '1.65', letterSpacing: '0' }],
        'body-sm':    ['13px', { lineHeight: '1.5',  letterSpacing: '0' }],
        'label':      ['11px', { lineHeight: '1.3',  letterSpacing: '0.18em', fontWeight: '500' }],
        'mono-sm':    ['12px', { lineHeight: '1.4',  letterSpacing: '0.06em' }],
      },
    },
  },
  plugins: [],
}
export default config
