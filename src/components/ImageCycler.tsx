import { useCallback, useEffect, useRef, useState } from 'react'
import { Picture } from './Picture'

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches

interface Props {
  images: string[]
  alt: string
  width?: number
  height?: number
  eager?: boolean
  /**
   * Render real, focusable controls. Turn this off when the cycler sits inside
   * a link: a button inside an anchor is invalid markup and traps taps.
   */
  interactive?: boolean
}

/**
 * Stacked crossfading photos. On a mouse, hovering cycles them. Everyone else
 * gets numbered buttons underneath, which keeps every photo reachable by tap,
 * keyboard and screen reader rather than hover only.
 */
export function ImageCycler({
  images,
  alt,
  width,
  height,
  eager,
  interactive = true,
}: Props) {
  const [active, setActive] = useState(0)
  const timer = useRef<number | null>(null)
  const multiple = images.length > 1

  const stop = useCallback(() => {
    if (timer.current !== null) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (images.length < 2 || timer.current !== null || REDUCED) return
    setActive((i) => (i + 1) % images.length)
    timer.current = window.setInterval(
      () => setActive((i) => (i + 1) % images.length),
      1500,
    )
  }, [images.length])

  useEffect(() => stop, [stop])

  return (
    <div className="cycler-wrap">
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
          if (timer.current !== null) e.preventDefault()
        }}
      >
        {images.map((src, i) => (
          <Picture
            key={src}
            src={src}
            alt={i === 0 ? alt : ''}
            width={width}
            height={height}
            loading={eager || i === 0 ? undefined : 'lazy'}
            decoding="async"
            className={i === active ? 'cycler-img cycler-img-active' : 'cycler-img'}
            style={REDUCED ? { transition: 'none' } : undefined}
            draggable={false}
            aria-hidden={i === active ? undefined : true}
          />
        ))}
        {multiple && !interactive && (
          <span className="cycler-dots" aria-hidden="true">
            {images.map((src, i) => (
              <i key={src} className={i === active ? 'on' : undefined} />
            ))}
          </span>
        )}
      </div>

      {multiple && interactive && (
        <div className="cycler-controls" role="group" aria-label={`${alt}: photos`}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={i === active ? 'cycler-dot cycler-dot-on' : 'cycler-dot'}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => {
                stop()
                setActive(i)
              }}
            >
              <span />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
