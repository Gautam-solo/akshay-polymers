import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { gsap } from 'gsap'
import { GranuleField } from './GranuleField'
import { Effects } from './Effects'
import { BG } from '../lib/palette'

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches

// Slow opening dolly (matches the ~3.5s granule arrival), then a gentle
// idle sway with pointer parallax. No scroll choreography: calm by design.
function CameraRig() {
  const { camera } = useThree()
  const dolly = useRef({ z: REDUCED ? 56 : 72 })
  const parallax = useRef(new THREE.Vector2())

  useEffect(() => {
    if (REDUCED) return
    const tween = gsap.to(dolly.current, { z: 56, duration: 3.8, ease: 'power2.inOut' })
    return () => {
      tween.kill()
    }
  }, [])

  useFrame((state, delta) => {
    let x = 0
    let y = 1.5
    if (!REDUCED) {
      const time = state.clock.elapsedTime
      x += Math.sin(time * 0.2) * 0.5
      y += Math.sin(time * 0.16 + 2) * 0.35
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
  active: boolean
  onReady: () => void
}

export function Experience({ count, dof, active, onReady }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      camera={{ fov: 42, near: 0.1, far: 400, position: [0, 1.5, 72] }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
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
      <directionalLight position={[8, 12, 10]} intensity={1.9} />
      <directionalLight position={[-10, -4, -6]} intensity={0.4} color="#7d92c9" />

      <GranuleField count={count} onReady={onReady} />
      <CameraRig />
      <Effects dof={dof} />
    </Canvas>
  )
}
