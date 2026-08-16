import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, Environment, Lightformer } from '@react-three/drei'
import { gsap } from 'gsap'
import { GranuleField } from './GranuleField'
import { Effects } from './Effects'
import { PerfGuard } from './PerfGuard'
import { MAX_DELTA } from '../lib/frame'
import { BG } from '../lib/palette'

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Runs the render loop only while the canvas is on screen. Driven from inside
 * the canvas so scrolling past the hero never re-renders the React tree.
 */
function VisibilityGate() {
  const gl = useThree((s) => s.gl)
  const setFrameloop = useThree((s) => s.setFrameloop)

  useEffect(() => {
    const el = gl.domElement
    const io = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'never'),
      { threshold: 0.01 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      setFrameloop('always')
    }
  }, [gl, setFrameloop])

  return null
}

// Slow opening dolly (matches the ~3.5s granule arrival), then a gentle
// idle sway with pointer parallax. No scroll choreography: calm by design.
function CameraRig() {
  const { camera } = useThree()
  const dolly = useRef({ z: REDUCED ? 56 : 72 })
  const parallax = useRef(new THREE.Vector2())
  // own clock, advanced by clamped delta, so pausing never jumps the sway
  const time = useRef(0)

  useEffect(() => {
    if (REDUCED) return
    const tween = gsap.to(dolly.current, { z: 56, duration: 3.8, ease: 'power2.inOut' })
    return () => {
      tween.kill()
    }
  }, [])

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_DELTA)
    let x = 0
    let y = 1.5
    if (!REDUCED) {
      time.current += delta
      const t = time.current
      x += Math.sin(t * 0.2) * 0.5
      y += Math.sin(t * 0.16 + 2) * 0.35
      const d = 1 - Math.exp(-delta * 3)
      parallax.current.x += (state.pointer.x - parallax.current.x) * d
      parallax.current.y += (state.pointer.y - parallax.current.y) * d
      x += parallax.current.x * 1.2
      y += parallax.current.y * 0.8
    }
    camera.position.set(x, y, dolly.current.z)
    camera.lookAt(0, 0, 0)
  })

  return null
}

interface Props {
  count: number
  dof: boolean
  onReady: () => void
}

export function Experience({ count, dof, onReady }: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      // drop resolution automatically if frames start dropping, restore when calm
      performance={{ min: 0.6, debounce: 220 }}
      camera={{ fov: 42, near: 0.1, far: 400, position: [0, 1.5, 72] }}
      gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.0
      }}
    >
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 52, 165]} />

      {/* studio-style HDRI built from lightformers, fully offline */}
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2.2} position={[0, 9, -9]} scale={[14, 7, 1]} />
        <Lightformer
          intensity={1.1}
          color="#9db8e8"
          position={[-10, 2, 4]}
          rotation-y={Math.PI / 2}
          scale={[12, 5, 1]}
        />
        <Lightformer
          intensity={1.2}
          color="#ffe3bd"
          position={[10, -2, 3]}
          rotation-y={-Math.PI / 2}
          scale={[12, 5, 1]}
        />
      </Environment>
      <directionalLight position={[8, 12, 10]} intensity={2.3} />
      <directionalLight position={[-10, -4, -6]} intensity={0.4} color="#7d92c9" />

      <GranuleField count={count} onReady={onReady} />
      <CameraRig />
      <Effects dof={dof} />
      <VisibilityGate />
      <PerfGuard />
      <AdaptiveDpr />
    </Canvas>
  )
}
