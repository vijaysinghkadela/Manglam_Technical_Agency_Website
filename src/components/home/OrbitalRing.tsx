'use client'

import { memo, useMemo } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Shield,
  Bot,
  Cloud,
  Share2,
  Palette,
  Globe,
  Smartphone,
  Cpu,
} from 'lucide-react'

const SERVICES = [
  { name: 'Cybersecurity', icon: Shield },
  { name: 'AI Automation', icon: Bot },
  { name: 'SaaS Products', icon: Cloud },
  { name: 'Social Media', icon: Share2 },
  { name: 'Content Creation', icon: Palette },
  { name: 'Web Development', icon: Globe },
  { name: 'App Development', icon: Smartphone },
  { name: 'AI Agents', icon: Cpu },
]

const ACCENT = '#6B1A1A'
const ACCENT_LIGHT = 'rgba(107,26,26,0.6)'
const ACCENT_FADE = 'rgba(107,26,26,0.2)'
const ACCENT_GLOW = 'rgba(107,26,26,0.35)'

// Calculate orbital positions
const calculatePosition = (index: number, total: number, radius: number = 48) => {
  const angle = (360 / total) * index - 90
  const rad = (angle * Math.PI) / 180
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
    angle,
  }
}

// Circular Service Badge with icon inside circle and text below
const ServiceBadge = memo(function ServiceBadge({
  service,
  icon: Icon,
  x,
  y,
  prefersReduced,
}: {
  service: string
  icon: React.ElementType
  x: number
  y: number
  prefersReduced: boolean | null
}) {
  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="flex flex-col items-center gap-2"
        style={{
          willChange: prefersReduced ? 'auto' : 'transform',
        }}
      >
        {/* Circular Icon Container */}
        <motion.div
          className="relative flex items-center justify-center rounded-full cursor-pointer"
          style={{
            width: '56px',
            height: '56px',
            background: `linear-gradient(135deg, rgba(107,26,26,0.9) 0%, rgba(74,18,18,0.95) 100%)`,
            border: '2px solid rgba(255,255,255,0.3)',
            boxShadow: `
              0 8px 32px rgba(107,26,26,0.4),
              0 0 0 1px rgba(255,255,255,0.1),
              inset 0 2px 4px rgba(255,255,255,0.2),
              inset 0 -2px 4px rgba(0,0,0,0.3)
            `,
          }}
          whileHover={{
            scale: 1.15,
            boxShadow: `
              0 12px 40px rgba(107,26,26,0.6),
              0 0 0 2px rgba(255,255,255,0.2),
              inset 0 2px 4px rgba(255,255,255,0.3),
              inset 0 -2px 4px rgba(0,0,0,0.3)
            `,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Inner glow ring */}
          <div
            className="absolute inset-1 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)`,
            }}
          />
          <Icon className="w-5 h-5 text-white relative z-10" strokeWidth={2} />
          
          {/* Animated pulse on hover */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.4, opacity: [0.5, 0] }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Text Label - Below the circle */}
        <motion.span
          className="text-[9px] font-bold whitespace-nowrap tracking-wider uppercase px-2 py-1 rounded-full"
          style={{
            color: 'rgba(255,255,255,0.9)',
            backgroundColor: 'rgba(107,26,26,0.3)',
            border: '1px solid rgba(107,26,26,0.4)',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: 'rgba(107,26,26,0.5)',
          }}
        >
          {service}
        </motion.span>
      </motion.div>
    </div>
  )
})

// Animated floating particle
const FloatingParticle = memo(function FloatingParticle({
  angle,
  radius,
  size,
  delay,
  duration = 3,
}: {
  angle: number
  radius: number
  size: number
  delay: number
  duration?: number
}) {
  const rad = (angle * Math.PI) / 180
  const x = 50 + radius * Math.cos(rad)
  const y = 50 + radius * Math.sin(rad)

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${ACCENT} 0%, ${ACCENT_LIGHT} 50%, transparent 70%)`,
        boxShadow: `0 0 ${size * 6}px ${size * 2}px ${ACCENT_GLOW}`,
      }}
      animate={{
        opacity: [0.3, 0.9, 0.3],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
})

// Concentric orbital ring
const OrbitalRing = memo(function OrbitalRingLine({
  radius,
  opacity,
  isDashed = false,
  thickness = 1,
}: {
  radius: number
  opacity: number
  isDashed?: boolean
  thickness?: number
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${radius}%`,
        height: `${radius}%`,
        border: `${thickness}px solid ${ACCENT}`,
        opacity,
        borderStyle: isDashed ? 'dashed' : 'solid',
        boxShadow: `
          0 0 30px ${ACCENT_GLOW},
          inset 0 0 30px ${ACCENT_GLOW}
        `,
      }}
    />
  )
})

// Animated data flow line
const DataFlowLine = memo(function DataFlowLine({
  count,
  radius,
  prefersReduced,
}: {
  count: number
  radius: number
  prefersReduced: boolean | null
}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i - 90
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: '2px',
              height: `${radius}%`,
              background: `linear-gradient(to bottom, transparent, ${ACCENT_FADE}, transparent)`,
              transformOrigin: 'top center',
              transform: `rotate(${angle + 90}deg)`,
            }}
            animate={prefersReduced ? {} : {
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
})

// Central animated MTA Logo
const CenterLogo = memo(function CenterLogo({
  prefersReduced,
}: {
  prefersReduced: boolean | null
}) {
  return (
    <motion.div
      className="absolute z-30 flex items-center justify-center"
      style={{
        width: '140px',
        height: '140px',
      }}
      animate={
        prefersReduced
          ? {}
          : {
              scale: [1, 1.02, 1],
            }
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: '2px solid rgba(107,26,26,0.3)',
          borderTopColor: ACCENT,
          borderBottomColor: ACCENT,
        }}
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Middle rotating ring (reverse) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '90%',
          height: '90%',
          border: '1px dashed rgba(107,26,26,0.4)',
        }}
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: '85%',
          height: '85%',
          background: `radial-gradient(circle, rgba(107,26,26,0.3) 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Main circular container */}
      <motion.div
        className="relative flex items-center justify-center rounded-full overflow-hidden"
        style={{
          width: '110px',
          height: '110px',
          background: `linear-gradient(135deg, rgba(139,45,45,1) 0%, ${ACCENT} 50%, #3d0f0f 100%)`,
          border: '3px solid rgba(255,255,255,0.4)',
          boxShadow: `
            0 0 60px ${ACCENT_LIGHT},
            0 20px 60px rgba(0,0,0,0.5),
            inset 0 2px 10px rgba(255,255,255,0.2),
            inset 0 -2px 10px rgba(0,0,0,0.3)
          `,
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `
            0 0 80px ${ACCENT_LIGHT},
            0 25px 70px rgba(0,0,0,0.5),
            inset 0 2px 10px rgba(255,255,255,0.2),
            inset 0 -2px 10px rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* Inner highlight */}
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          }}
        />

        {/* Logo - No background container */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <Image
            src="/images/mta-logo-light.png"
            alt="MTA"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* Pulse rings */}
      <motion.div
        className="absolute rounded-full border-2 border-white/20"
        style={{ width: '140px', height: '140px' }}
        animate={prefersReduced ? {} : { scale: [1, 1.6, 1.6], opacity: [0.5, 0, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute rounded-full border-2 border-white/10"
        style={{ width: '140px', height: '140px' }}
        animate={prefersReduced ? {} : { scale: [1, 2, 2], opacity: [0.3, 0, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
      />
    </motion.div>
  )
})

function OrbitalRingComponent() {
  const prefersReduced = useReducedMotion()
  const count = SERVICES.length

  // Pre-calculate positions
  const positions = useMemo(
    () => SERVICES.map((_, i) => calculatePosition(i, count, 48)),
    [count]
  )

  // Animation configs
  const orbitTransition = useMemo(
    () => ({
      duration: 45,
      repeat: Infinity,
      ease: 'linear' as const,
    }),
    []
  )

  const innerOrbitTransition = useMemo(
    () => ({
      duration: 25,
      repeat: Infinity,
      ease: 'linear' as const,
    }),
    []
  )

  // Particle positions
  const particles = useMemo(
    () => [
      { angle: 0, radius: 28, size: 5, delay: 0, duration: 3 },
      { angle: 45, radius: 28, size: 3, delay: 0.4, duration: 2.5 },
      { angle: 90, radius: 28, size: 4, delay: 0.8, duration: 3.2 },
      { angle: 135, radius: 28, size: 3, delay: 1.2, duration: 2.8 },
      { angle: 180, radius: 28, size: 5, delay: 1.6, duration: 3 },
      { angle: 225, radius: 28, size: 3, delay: 2, duration: 2.5 },
      { angle: 270, radius: 28, size: 4, delay: 2.4, duration: 3.2 },
      { angle: 315, radius: 28, size: 3, delay: 2.8, duration: 2.8 },
      { angle: 22, radius: 36, size: 2, delay: 0.2, duration: 2 },
      { angle: 112, radius: 36, size: 2, delay: 0.7, duration: 2.3 },
      { angle: 202, radius: 36, size: 2, delay: 1.4, duration: 2.1 },
      { angle: 292, radius: 36, size: 2, delay: 2.1, duration: 2.4 },
    ],
    []
  )

  return (
    <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[640px] lg:h-[640px] flex items-center justify-center mx-auto">
      {/* Deep background glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '95%',
          height: '95%',
          background: `radial-gradient(circle, ${ACCENT_GLOW} 0%, ${ACCENT_FADE} 40%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary glow ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '75%',
          height: '75%',
          border: `3px solid ${ACCENT_FADE}`,
          boxShadow: `0 0 80px ${ACCENT_GLOW}, inset 0 0 80px ${ACCENT_GLOW}`,
          opacity: 0.3,
        }}
      />

      {/* Animated data flow lines */}
      <DataFlowLine count={count} radius={48} prefersReduced={prefersReduced} />

      {/* Multiple orbital rings */}
      <OrbitalRing radius={22} opacity={0.25} thickness={2} />
      <OrbitalRing radius={35} opacity={0.18} isDashed thickness={1} />
      <OrbitalRing radius={50} opacity={0.12} thickness={1} />
      <OrbitalRing radius={65} opacity={0.08} thickness={1} />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Center Logo with animations */}
      <CenterLogo prefersReduced={prefersReduced} />

      {/* Main outer orbit track */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${ACCENT_FADE}`,
          boxShadow: `
            inset 0 0 80px ${ACCENT_GLOW},
            0 0 50px ${ACCENT_FADE}
          `,
        }}
      />

      {/* Rotating container for service badges */}
      <motion.div
        className="absolute inset-0"
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={orbitTransition}
        style={{
          willChange: prefersReduced ? 'auto' : 'transform',
        }}
      >
        {SERVICES.map((service, i) => (
          <ServiceBadge
            key={service.name}
            service={service.name}
            icon={service.icon}
            x={positions[i].x}
            y={positions[i].y}
            prefersReduced={prefersReduced}
          />
        ))}
      </motion.div>

      {/* Inner counter-orbit ring with dots */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '45%',
          height: '45%',
          border: `2px solid ${ACCENT_LIGHT}`,
          boxShadow: `0 0 40px ${ACCENT_GLOW}`,
        }}
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={innerOrbitTransition}
      >
        {/* Decorative dots */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const r = 50
          const x = 50 + r * Math.cos(rad)
          const y = 50 + r * Math.sin(rad)
          return (
            <motion.div
              key={angle}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: ACCENT,
                boxShadow: `0 0 10px ${ACCENT}, 0 0 20px ${ACCENT_LIGHT}`,
              }}
              animate={prefersReduced ? {} : {
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </motion.div>
    </div>
  )
}

export default memo(OrbitalRingComponent)
