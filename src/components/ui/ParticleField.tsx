'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { isSafari, isSaveDataEnabled } from '@/lib/browser-detect'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
}

function subscribeBrowserLimit() {
  return () => {}
}

function getBrowserLimitSnapshot() {
  return isSafari()
}

function getServerBrowserLimitSnapshot() {
  return false
}

export function ParticleField({
  count = 48,
  color = '123, 28, 28',
  className,
}: {
  count?: number
  color?: string
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const touch = useMediaQuery('(hover: none), (pointer: coarse)')
  const constrainedMotion = useMediaQuery('(max-width: 1023px), (update: slow)')
  const browserLimited = useSyncExternalStore(
    subscribeBrowserLimit,
    getBrowserLimitSnapshot,
    getServerBrowserLimitSnapshot,
  )

  useEffect(() => {
    if (reduced || touch || constrainedMotion || browserLimited || isSaveDataEnabled()) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number | null = null
    let width = 0
    let height = 0
    let mouseX = 0
    let mouseY = 0
    let lastFrame = 0
    let inView = false
    const particles: Particle[] = []
    const particleCount = Math.min(count, 40)
    const frameInterval = 1000 / 30

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles.length = 0
      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -0.08 - Math.random() * 0.18,
          r: 0.8 + Math.random() * 2.4,
          alpha: 0.1 + Math.random() * 0.3,
        })
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (event.clientX - rect.left - width / 2) * 0.0008
      mouseY = (event.clientY - rect.top - height / 2) * 0.0008
    }

    const stop = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    const tick = (now: number) => {
      if (!inView || document.hidden) {
        stop()
        return
      }

      if (now - lastFrame < frameInterval) {
        raf = requestAnimationFrame(tick)
        return
      }

      lastFrame = now
      ctx.clearRect(0, 0, width, height)
      for (const particle of particles) {
        particle.x += particle.vx + mouseX
        particle.y += particle.vy + mouseY
        if (particle.y < -10) particle.y = height + 10
        if (particle.x < -10) particle.x = width + 10
        if (particle.x > width + 10) particle.x = -10
        ctx.beginPath()
        ctx.fillStyle = `rgba(${color}, ${particle.alpha})`
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (raf !== null || !inView || document.hidden) return
      lastFrame = 0
      raf = requestAnimationFrame(tick)
    }

    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    resize()
    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = Boolean(entry?.isIntersecting)
              if (inView) start()
              else stop()
            },
            { threshold: 0.01 },
          )
        : null
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : null

    if (observer) observer.observe(canvas)
    else {
      inView = true
      start()
    }

    if (resizeObserver) resizeObserver.observe(canvas)
    else window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)
    canvas.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      observer?.disconnect()
      if (resizeObserver) resizeObserver.disconnect()
      else window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
      canvas.removeEventListener('pointermove', onPointerMove)
      stop()
    }
  }, [browserLimited, color, count, constrainedMotion, reduced, touch])

  if (reduced || touch || constrainedMotion || browserLimited) return null
  return <canvas ref={canvasRef} className={className ?? 'pointer-events-none absolute inset-0 h-full w-full'} aria-hidden />
}
