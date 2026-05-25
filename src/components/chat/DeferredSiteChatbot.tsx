'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const SiteChatbot = dynamic(
  () => import('@/components/chat/SiteChatbot').then((mod) => mod.SiteChatbot),
  { ssr: false },
)

export function DeferredSiteChatbot() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) return

    const show = () => setReady(true)
    const idle = window.requestIdleCallback?.(show, { timeout: 2500 })
    const fallback = window.setTimeout(show, 3500)

    const showOnIntent = () => show()
    window.addEventListener('pointerdown', showOnIntent, { once: true, passive: true })
    window.addEventListener('keydown', showOnIntent, { once: true })

    return () => {
      if (idle) window.cancelIdleCallback?.(idle)
      window.clearTimeout(fallback)
      window.removeEventListener('pointerdown', showOnIntent)
      window.removeEventListener('keydown', showOnIntent)
    }
  }, [ready])

  return ready ? <SiteChatbot /> : null
}
