'use client'
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [hit, setHit] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    setTimeout(() => setHit(mq.matches), 0)
    const fn = (e: MediaQueryListEvent) => setHit(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return hit
}
