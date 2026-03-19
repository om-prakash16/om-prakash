'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Cinematic, buttery smooth feel
      duration: 1.6,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // exponentialOut
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,   // slightly slower = feels more premium
      touchMultiplier: 1.8,    // responsive on mobile
      infinite: false,
      syncTouch: false,
    })

    // Expose lenis globally so anchor links (#section) scroll smoothly too
    ;(window as any).__lenis = lenis

    // Handle anchor clicks for smooth in-page navigation
    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      e.preventDefault()
      const id = anchor.getAttribute('href')!.slice(1)
      const el = document.getElementById(id)
      if (el) {
        lenis.scrollTo(el, {
          offset: -80,       // offset for fixed navbar height
          duration: 1.8,
          easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        })
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // RAF loop
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', handleAnchorClick)
      delete (window as any).__lenis
    }
  }, [])

  return <>{children}</>
}
