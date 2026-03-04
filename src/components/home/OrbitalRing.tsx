'use client'
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

export default function OrbitalRing() {
  const prefersReduced = useReducedMotion()
  const count = SERVICES.length

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

      {/* Decorative inner rings */}
      <div
        className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full"
        style={{ border: '1px solid rgba(124,58,237,0.2)' }}
      />
      <div
        className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full"
        style={{ border: '1px dashed rgba(124,58,237,0.1)' }}
      />

      {/* Outer orbit track */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      />

      {/* Rotating container — whole group rotates */}
      <motion.div
        className="absolute inset-0"
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        {SERVICES.map((service, i) => {
          const angle = (360 / count) * i
          const rad = (angle * Math.PI) / 180
          const radius = 50
          const x = 50 + radius * Math.sin(rad)
          const y = 50 - radius * Math.cos(rad)

          return (
            <div
              key={service}
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
                  willChange: 'transform',
                }}
              >
                {service}
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* Inner counter-orbit ring with dots */}
      <motion.div
        className="absolute w-[55%] h-[55%] rounded-full"
        style={{ border: '1px solid rgba(124,58,237,0.15)', willChange: 'transform' }}
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const r = 50
          const x = 50 + r * Math.sin(rad)
          const y = 50 - r * Math.cos(rad)
          return (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(124,58,237,0.6)',
              }}
            />
          )
        })}
      </motion.div>
    </div>
  )
}
