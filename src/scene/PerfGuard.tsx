import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MAX_DELTA } from '../lib/frame'

// Frame budget before we treat the scene as struggling (~45fps).
const SLOW_MS = 1 / 45
// Smoothing factor for the rolling average: high enough to ignore one-off
// hitches (a GC pause, an image decode) but react within a few frames.
const EMA = 0.1

/**
 * Watches real frame times and puts R3F into performance regression while the
 * scene is struggling. AdaptiveDpr listens to that and lowers the render
 * resolution, then restores it once frames are comfortable again. Nothing in
 * R3F calls regress() on its own, so this is what makes AdaptiveDpr work.
 */
export function PerfGuard() {
  const regress = useThree((s) => s.performance.regress)
  const avg = useRef(1 / 60)

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_DELTA)
    avg.current += (delta - avg.current) * EMA
    // Calling this every slow frame keeps the quality pinned low until the
    // average recovers; once it does, R3F restores full resolution by itself.
    if (avg.current > SLOW_MS) regress()
  })

  return null
}
