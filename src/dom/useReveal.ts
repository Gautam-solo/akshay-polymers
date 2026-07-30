import { useEffect, useRef } from 'react'

/**
 * Adds the `in` class once the element scrolls into view (one-shot).
 *
 * Deliberately triggers on the first visible pixel. An earlier version waited
 * for 15% of the element to be on screen, which a block taller than ~6 screens
 * can never reach, leaving that section blank forever on small phones.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => el.classList.add('in')

    if (
      typeof IntersectionObserver === 'undefined' ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      show()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show()
            io.disconnect()
          }
        }
      },
      // any pixel on screen counts; the bottom margin delays it just enough
      // to feel like a reveal rather than a pop
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)

    // Safety net: never leave content hidden if the observer somehow misses.
    const failsafe = window.setTimeout(show, 2500)

    return () => {
      io.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  return ref
}
