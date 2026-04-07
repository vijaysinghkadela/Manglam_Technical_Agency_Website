'use client'

import dynamic from 'next/dynamic'

const HeroSection = dynamic(
  () => import('@/components/home/HeroSection').then((mod) => mod.HeroSection),
  { ssr: false },
)

export function HomeHero() {
  return <HeroSection />
}
