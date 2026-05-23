'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Shield, Bot, Cloud, Share2, Palette, Globe, Smartphone, Cpu,
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

const pos = (i: number, n: number, r = 48) => {
  const a = ((360 / n) * i - 90) * Math.PI / 180
  return { x: +(50 + r * Math.cos(a)).toFixed(2), y: +(50 + r * Math.sin(a)).toFixed(2) }
}

function OrbitalRingComponent() {
  const prefersReduced = useReducedMotion()
  const count = SERVICES.length
  const positions = useMemo(() => SERVICES.map((_, i) => pos(i, count)), [count])

  return (
    <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[640px] lg:h-[640px] flex items-center justify-center mx-auto">
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '95%', height: '95%',
          background: 'radial-gradient(circle, rgba(var(--color-accent-rgb),0.35) 0%, rgba(var(--color-accent-rgb),0.2) 40%, transparent 70%)',
          filter: 'blur(80px)' }}
      />

      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ border: '2px solid rgba(var(--color-accent-rgb),0.2)', boxShadow: 'inset 0 0 80px rgba(var(--color-accent-rgb),0.35), 0 0 50px rgba(var(--color-accent-rgb),0.2)' }}
      />

      <div className="absolute inset-0">
        {SERVICES.map((s, i) => (
          <div key={s.name} className="absolute" style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%`, transform: 'translate(-50%, -50%)' }}>
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: 56, height: 56,
                  background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb),0.9) 0%, rgba(74,18,18,0.95) 100%)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(var(--color-accent-rgb),0.4), 0 0 0 1px rgba(255,255,255,0.1), inset 0 2px 4px rgba(255,255,255,0.2)' }}
                whileHover={{ scale: 1.15, boxShadow: '0 12px 40px rgba(var(--color-accent-rgb),0.6), 0 0 0 2px rgba(255,255,255,0.2), inset 0 2px 4px rgba(255,255,255,0.3)' }}
              >
                <div className="absolute inset-1 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }} />
                <s.icon className="w-5 h-5 text-white relative z-10" strokeWidth={2} />
              </motion.div>
              <span
                className="text-[9px] font-bold whitespace-nowrap tracking-wider uppercase px-2 py-1 rounded-full"
                style={{ color: 'rgba(255,255,255,0.9)', backgroundColor: 'rgba(var(--color-accent-rgb),0.3)', border: '1px solid rgba(var(--color-accent-rgb),0.4)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                {s.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Central Logo */}
      <motion.div
        className="absolute z-30 flex items-center justify-center"
        style={{ width: 140, height: 140 }}
        animate={prefersReduced ? {} : { scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid rgba(var(--color-accent-rgb),0.3)', borderTopColor: 'var(--color-violet)', borderBottomColor: 'var(--color-violet)' }}
          animate={prefersReduced ? {} : { rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: '90%', height: '90%', border: '1px dashed rgba(var(--color-accent-rgb),0.4)' }}
          animate={prefersReduced ? {} : { rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute rounded-full" style={{ width: '85%', height: '85%', background: 'radial-gradient(circle, rgba(var(--color-accent-rgb),0.3) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        <motion.div
          className="relative flex items-center justify-center rounded-full overflow-hidden"
          style={{
            width: 110, height: 110,
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-violet) 60%, #000) 0%, var(--color-violet) 50%, color-mix(in srgb, var(--color-violet) 30%, #000) 100%)',
            border: '3px solid rgba(255,255,255,0.4)',
            boxShadow: '0 0 60px rgba(var(--color-accent-rgb),0.6), 0 20px 60px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.2)' }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="absolute inset-2 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)' }} />
          <div className="relative w-20 h-20 flex items-center justify-center">
            <Image src="/images/mta-logo-transparent-white.png" alt="MTA" fill sizes="80px" className="object-contain drop-shadow-2xl" />
          </div>
        </motion.div>
        <motion.div
          className="absolute rounded-full border-2 border-white/20"
          style={{ width: 140, height: 140 }}
          animate={prefersReduced ? {} : { scale: [1, 1.6, 1.6], opacity: [0.5, 0, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  )
}

export default OrbitalRingComponent
