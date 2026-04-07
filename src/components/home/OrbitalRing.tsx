'use client'
import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const SERVICES = [
  'Cybersecurity',
  'AI Automation',
  'SaaS Products',
  'Social Media Marketing',
  'Content Creation',
  'Branding',
  'Web Development',
  'Application Development',
  'AI Agents',
]

// Pre-calculate positions for services on the ring
const calculatePosition = (index: number, total: number) => {
  const angle = (360 / total) * index
  const rad = (angle * Math.PI) / 180
  const radius = 50
  return {
    x: 50 + radius * Math.sin(rad),
    y: 50 - radius * Math.cos(rad),
  }
}

// Memoized service badge component
const ServiceBadge = memo(function ServiceBadge({ 
  service, 
  x, 
  y, 
  prefersReduced 
}: { 
  service: string
  x: number
  y: number
  prefersReduced: boolean | null
}) {
  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      {/* Counter-rotate badge so text stays upright */}
      <motion.div
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap backdrop-blur-sm transition-colors duration-300 cursor-default"
        style={{
          backgroundColor: 'rgba(17,17,17,0.85)',
          border: '1px solid var(--color-border)',
          color: '#FAFAFA',
          boxShadow: '0 0 12px rgba(124,58,237,0.3)',
          // GPU optimization: only use will-change when animating
          willChange: prefersReduced ? 'auto' : 'transform',
          // Force GPU layer
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >
        {service}
      </motion.div>
    </div>
  )
})

// Memoized inner ring dot
const InnerDot = memo(function InnerDot({ angle }: { angle: number }) {
  const rad = (angle * Math.PI) / 180
  const r = 50
  const x = 50 + r * Math.sin(rad)
  const y = 50 - r * Math.cos(rad)
  
  return (
    <div
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(124,58,237,0.6)',
      }}
    />
  )
})

function OrbitalRing() {
  const prefersReduced = useReducedMotion()
  const count = SERVICES.length

  // Pre-calculate all positions
  const positions = useMemo(() => 
    SERVICES.map((_, i) => calculatePosition(i, count)),
    [count]
  )

  // Animation transition config - memoized
  const orbitTransition = useMemo(() => ({
    duration: 30,
    repeat: Infinity,
    ease: 'linear' as const,
  }), [])

  const innerOrbitTransition = useMemo(() => ({
    duration: 20,
    repeat: Infinity,
    ease: 'linear' as const,
  }), [])

  // Inner dot angles
  const innerDotAngles = useMemo(() => [0, 120, 240], [])

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] flex items-center justify-center mx-auto">
      {/* Central MTA badge */}
      <div
        className="absolute z-10 flex items-center justify-center w-20 h-20 rounded-full"
        style={{
          backgroundColor: 'var(--color-violet)',
          border: '2px solid var(--color-violet-light)',
          boxShadow: '0 0 40px rgba(124,58,237,0.5)',
        }}
      >
        <span className="text-white font-black text-xl tracking-tight font-display">MTA</span>
      </div>

      {/* Decorative inner rings - static, no animation needed */}
      <div
        className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full"
        style={{ border: '1px solid rgba(124,58,237,0.2)' }}
      />
      <div
        className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full"
        style={{ border: '1px dashed rgba(124,58,237,0.1)' }}
      />

      {/* Outer orbit track - static */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: '1px solid var(--color-border)' }}
      />

      {/* Rotating container — whole group rotates */}
      <motion.div
        className="absolute inset-0"
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={orbitTransition}
        style={{ 
          willChange: prefersReduced ? 'auto' : 'transform',
          // Force GPU layer for smooth rotation
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
        }}
      >
        {SERVICES.map((service, i) => (
          <ServiceBadge
            key={service}
            service={service}
            x={positions[i].x}
            y={positions[i].y}
            prefersReduced={prefersReduced}
          />
        ))}
      </motion.div>

      {/* Inner counter-orbit ring with dots */}
      <motion.div
        className="absolute w-[55%] h-[55%] rounded-full"
        style={{ 
          border: '1px solid rgba(124,58,237,0.15)', 
          willChange: prefersReduced ? 'auto' : 'transform',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={innerOrbitTransition}
      >
        {innerDotAngles.map((angle) => (
          <InnerDot key={angle} angle={angle} />
        ))}
      </motion.div>
    </div>
  )
}

export default memo(OrbitalRing)
