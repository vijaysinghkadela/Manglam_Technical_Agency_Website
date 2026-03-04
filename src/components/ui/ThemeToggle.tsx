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
  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
      style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: 'var(--color-muted)',
      }}
      aria-label="Toggle theme"
      data-cursor="pointer"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
