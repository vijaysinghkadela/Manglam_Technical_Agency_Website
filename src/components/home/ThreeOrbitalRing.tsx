'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SERVICES = [
  'AI Automation',
  'Social Media',
  'Cybersecurity',
  'SaaS',
  'Branding',
  'Content',
]

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export default function ThreeOrbitalRing() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || reduced) return
    if (!canUseWebGL()) {
      queueMicrotask(() => setFallback(true))
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0.2, 8.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.domElement.setAttribute('role', 'img')
    renderer.domElement.setAttribute(
      'aria-label',
      'Interactive diagram showing MTA services: AI Automation, Social Media, Cybersecurity, SaaS Development, Branding, and Content Creation',
    )
    mount.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 1.8)
    const key = new THREE.DirectionalLight(0xffe2d7, 3.2)
    key.position.set(3, 4, 6)
    scene.add(ambient, key)

    const group = new THREE.Group()
    scene.add(group)

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#7B1C1C'),
      metalness: 0.72,
      roughness: 0.28,
      emissive: new THREE.Color('#260505'),
      emissiveIntensity: 0.35,
    })

    const torus = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.055, 16, 160), material)
    const inner = new THREE.Mesh(new THREE.TorusGeometry(1.78, 0.03, 12, 120), material.clone())
    inner.rotation.x = Math.PI / 2.8
    group.add(torus, inner)

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C0392B'),
      metalness: 0.38,
      roughness: 0.22,
      emissive: new THREE.Color('#7B1C1C'),
      emissiveIntensity: 0.55,
    })

    const nodes = SERVICES.map((_, index) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 16), nodeMaterial)
      mesh.userData.offset = (index / SERVICES.length) * Math.PI * 2
      group.add(mesh)
      return mesh
    })

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.82, 2),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F5F0EB'),
        metalness: 0.18,
        roughness: 0.42,
        emissive: new THREE.Color('#7B1C1C'),
        emissiveIntensity: 0.18,
      }),
    )
    group.add(core)

    const resize = () => {
      const rect = mount.getBoundingClientRect()
      const size = Math.max(320, Math.min(rect.width, rect.height || rect.width))
      renderer.setSize(size, size, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }

    let raf = 0
    let lastFrame = 0
    const frameInterval = 1000 / 60
    const startTime = performance.now()
    const animate = (now = 0) => {
      if (now - lastFrame < frameInterval) {
        raf = requestAnimationFrame(animate)
        return
      }
      lastFrame = now
      const t = (now - startTime) / 1000
      group.rotation.y = t * 0.22
      group.rotation.x = Math.sin(t * 0.35) * 0.12
      core.rotation.x = t * 0.25
      core.rotation.y = t * 0.38
      nodes.forEach((node) => {
        const a = t * 0.55 + node.userData.offset
        node.position.set(Math.cos(a) * 2.8, Math.sin(a * 1.6) * 0.42, Math.sin(a) * 1.1)
      })
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      renderer.dispose()
      torus.geometry.dispose()
      inner.geometry.dispose()
      core.geometry.dispose()
      material.dispose()
      nodeMaterial.dispose()
      mount.replaceChildren()
    }
  }, [reduced])

  if (fallback || reduced) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-full border border-[rgba(var(--color-accent-rgb),0.22)] bg-[rgba(var(--color-accent-rgb),0.07)]">
        <span className="font-display text-7xl font-black text-violet">MTA</span>
      </div>
    )
  }

  return (
    <div className="relative aspect-square w-full max-w-[620px]" ref={mountRef}>
      <div className="pointer-events-none absolute inset-8 rounded-full border border-[rgba(var(--color-accent-rgb),0.14)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(var(--color-accent-rgb),0.18),transparent_64%)] blur-2xl" aria-hidden />
    </div>
  )
}
