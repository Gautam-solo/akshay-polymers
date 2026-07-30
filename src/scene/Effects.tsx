import { Bloom, DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing'

export function Effects({ dof }: { dof: boolean }) {
  if (!dof) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={0.4} luminanceThreshold={0.85} luminanceSmoothing={0.25} />
        <Vignette offset={0.28} darkness={0.7} />
      </EffectComposer>
    )
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom mipmapBlur intensity={0.45} luminanceThreshold={0.85} luminanceSmoothing={0.25} />
      {/* bokeh runs at half resolution: same look, far less fill rate */}
      <DepthOfField
        worldFocusDistance={50}
        worldFocusRange={16}
        bokehScale={3.2}
        resolutionScale={0.5}
      />
      <Vignette offset={0.28} darkness={0.7} />
    </EffectComposer>
  )
}
