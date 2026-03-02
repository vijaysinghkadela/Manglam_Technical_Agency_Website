'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration:        1.25,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:     'vertical',
      smoothWheel:     true,
      touchMultiplier: 2,
    })

    let id: number
    const raf = (time: number) => { lenis.raf(time); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)

    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  return <>{children}</>
}
