'use client'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'

// Hydration-safe mounted check without useEffect+setState
const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  if (!mounted) return <div className="w-[72px] h-[32px]" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-1.5 px-3 py-1.5 font-mono transition-all duration-200 hover:border-violet"
      style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-muted)',
        fontSize: '11px',
        letterSpacing: '0.08em',
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      data-cursor="pointer"
    >
      {isDark ? <Sun size={13} /> : <Moon size={13} />}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
