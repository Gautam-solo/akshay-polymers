import * as THREE from 'three'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { FAMILIES } from '../lib/palette'

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches

// White polymer granules drifting in slow motion. All motion lives in the
// vertex shader: wispy cloud drift, per-pellet tumble, a staggered cinematic
// arrival on load, and a gentle pointer attraction/repulsion field.
const VERTEX_DECLS = /* glsl */ `
uniform float uTime;
uniform float uReveal;
uniform float uIdle;
uniform vec3 uPointer;
uniform float uPointerActive;
attribute vec4 aSeed;

mat3 rotAxis(vec3 axis, float a) {
  float s = sin(a), c = cos(a), oc = 1.0 - c;
  return mat3(
    oc * axis.x * axis.x + c,          oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
    oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
    oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c
  );
}

vec3 swirl(vec3 p, float t) {
  return vec3(
    sin(p.y * 0.35 + t) + sin(p.z * 0.21 + t * 1.3),
    sin(p.z * 0.33 + t * 0.8) + sin(p.x * 0.24 + t),
    sin(p.x * 0.31 + t * 1.1) + sin(p.y * 0.27 + t * 0.9)
  );
}

vec3 cloudPos(vec4 seed, float t) {
  vec3 base = (seed.xyz - 0.5) * vec3(135.0, 72.0, 150.0);
  base.z -= 24.0;
  // large-wavelength displacement folds the field into wisps with dark voids
  base += swirl(base * 0.045 + seed.w, t * 0.05) * 17.0;
  base += swirl(base * 0.2 + seed.w * 10.0, t * 0.15) * 1.8;
  return base;
}

mat3 gRot;
`

const VERTEX_NORMAL = /* glsl */ `
gRot = rotAxis(
  normalize(aSeed.xyz * 2.0 - 1.0),
  uTime * (0.12 + aSeed.w * 0.28) * uIdle + aSeed.w * 6.2832
);
vec3 objectNormal = gRot * normal;
`

const VERTEX_BODY = /* glsl */ `
float t = uTime * uIdle;

// staggered arrival: each pellet fades up and glides in on its own beat
float arrive = smoothstep(0.0, 1.0, clamp(uReveal * 1.35 - aSeed.w * 0.35, 0.0, 1.0));
float scl = (0.16 + aSeed.w * 0.14) * arrive;
vec3 transformed = gRot * (position * scl);

vec3 wp = cloudPos(aSeed, t);
wp.z -= (1.0 - arrive) * 55.0;
wp.x += (1.0 - arrive) * (aSeed.x - 0.5) * 36.0;

// pointer field: soft repulsion up close, gentle attraction further out
vec3 dp = wp - uPointer;
float r2 = dot(dp, dp);
vec3 dirp = dp * inversesqrt(r2 + 0.0001);
wp += dirp * (exp(-r2 * 0.05) * 2.6 - exp(-r2 * 0.006) * 0.8) * uPointerActive;

transformed += wp;
`

const FRAGMENT_DECLS = /* glsl */ `
uniform float uRim;
`

// fresnel rim fakes the translucent pellet edge and feeds the bloom pass
const FRAGMENT_RIM = /* glsl */ `
float rimT = pow(1.0 - saturate(dot(normalize(vNormal), normalize(vViewPosition))), 3.0);
outgoingLight += diffuseColor.rgb * rimT * uRim;
#include <opaque_fragment>
`

interface Props {
  count: number
  onReady: () => void
}

export function GranuleField({ count, onReady }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const pointerTarget = useRef(new THREE.Vector3(0, 0, -200))
  const pointerSmooth = useRef(new THREE.Vector3(0, 0, -200))
  const pointerMoved = useRef(false)
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])

  useEffect(() => {
    if (REDUCED) return
    const onMove = () => {
      pointerMoved.current = true
    }
    window.addEventListener('pointermove', onMove, { once: true, passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: REDUCED ? 1 : 0 },
      uIdle: { value: REDUCED ? 0 : 1 },
      uPointer: { value: new THREE.Vector3(0, 0, -200) },
      uPointerActive: { value: 0 },
      uRim: { value: 0.7 },
    }),
    [],
  )

  const geometry = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 6, 1)
    const seeds = new Float32Array(count * 4)
    for (let i = 0; i < count * 4; i++) seeds[i] = Math.random()
    g.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 4))
    return g
  }, [count])

  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.32,
      metalness: 0.04,
      envMapIntensity: 1.05,
    })
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms)
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>\n${VERTEX_DECLS}`)
        .replace('#include <beginnormal_vertex>', VERTEX_NORMAL)
        .replace('#include <begin_vertex>', VERTEX_BODY)
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>\n${FRAGMENT_DECLS}`)
        .replace('#include <opaque_fragment>', FRAGMENT_RIM)
    }
    m.customProgramCacheKey = () => 'akshay-granule-white'
    return m
  }, [uniforms])

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    const identity = new THREE.Matrix4()
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      mesh.setMatrixAt(i, identity)
      if (Math.random() < 0.22) {
        // natural white pellets mixed in, like a masterbatch sample tray
        const tone = 0.86 + Math.random() * 0.14
        const warm = (Math.random() - 0.5) * 0.03
        color.setRGB(tone + warm, tone, tone - warm)
      } else {
        color.set(FAMILIES[i % FAMILIES.length])
        color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.08)
      }
      mesh.setColorAt(i, color)
    }
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    // cinematic assemble, ~3.5s as the page opens
    const tween = REDUCED
      ? null
      : gsap.to(uniforms.uReveal, { value: 1, duration: 3.5, ease: 'power2.inOut', delay: 0.2 })
    onReady()
    return () => {
      tween?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, uniforms])

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame((state, delta) => {
    uniforms.uTime.value += delta

    if (pointerMoved.current) {
      state.raycaster.setFromCamera(state.pointer, state.camera)
      if (!state.raycaster.ray.intersectPlane(plane, pointerTarget.current)) {
        pointerTarget.current.set(0, 0, -200)
      }
      const d = 1 - Math.exp(-delta * 5)
      pointerSmooth.current.lerp(pointerTarget.current, d)
      uniforms.uPointer.value.copy(pointerSmooth.current)
      uniforms.uPointerActive.value = Math.min(1, uniforms.uPointerActive.value + delta * 2)
    }
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  )
}
