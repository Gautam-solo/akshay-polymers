import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches

let lenisInstance: Lenis | null = null

/** Smooth-scroll to an in-page anchor, falling back to native scrolling. */
export function scrollToAnchor(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset: -72 })
  } else {
    ;(el as HTMLElement).scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' })
  }
}

export function SmoothScroll() {
  useEffect(() => {
    if (REDUCED) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisInstance = lenis
    if (import.meta.env.DEV) {
      ;(window as unknown as Record<string, unknown>).__lenis = lenis
    }
    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return null
}
