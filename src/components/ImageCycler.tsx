import { useCallback, useEffect, useRef, useState } from 'react'

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches

interface Props {
  images: string[]
  alt: string
  width?: number
  height?: number
  eager?: boolean
}

/**
 * Stacked crossfading images. Hovering (desktop) or pressing and holding
 * (touch) cycles through the set; releasing stops on the current frame.
 */
export function ImageCycler({ images, alt, width, height, eager }: Props) {
  const [active, setActive] = useState(0)
  const timer = useRef<number | null>(null)

  const stop = useCallback(() => {
    if (timer.current !== null) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (images.length < 2 || timer.current !== null) return
    setActive((i) => (i + 1) % images.length)
    timer.current = window.setInterval(
      () => setActive((i) => (i + 1) % images.length),
      1500,
    )
  }, [images.length])

  useEffect(() => stop, [stop])

  return (
    <div
      className="cycler"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') start()
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') stop()
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') start()
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== 'mouse') stop()
      }}
      onPointerCancel={stop}
      onContextMenu={(e) => {
        // long-press on touch should cycle, not open the context menu
        if (timer.current !== null) e.preventDefault()
      }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          width={width}
          height={height}
          loading={eager || i === 0 ? undefined : 'lazy'}
          className={i === active ? 'cycler-img cycler-img-active' : 'cycler-img'}
          style={REDUCED ? { transition: 'none' } : undefined}
          draggable={false}
        />
      ))}
      {images.length > 1 && (
        <span className="cycler-dots" aria-hidden="true">
          {images.map((src, i) => (
            <i key={src} className={i === active ? 'on' : undefined} />
          ))}
        </span>
      )}
    </div>
  )
}
