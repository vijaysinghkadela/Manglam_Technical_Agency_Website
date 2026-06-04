'use client'

import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
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

  useEffect(() => {
    if (reduced || touch) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let mouseX = 0
    let mouseY = 0
    const particles: Particle[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles.length = 0
      for (let i = 0; i < count; i += 1) {
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

    const tick = () => {
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

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onPointerMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(raf)
    }
  }, [color, count, reduced, touch])

  if (reduced || touch) return null
  return <canvas ref={canvasRef} className={className ?? 'pointer-events-none absolute inset-0 h-full w-full'} aria-hidden />
}
