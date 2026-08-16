/**
 * Renders a WebP source with the original JPEG as fallback.
 *
 * scripts/optimize-images.mjs writes a .webp next to every .jpg in public/, so
 * the WebP path is derived from the src. Browsers without WebP support (old
 * Safari, older Android) quietly fall back to the JPEG.
 */
interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export function Picture({ src, alt, ...rest }: Props) {
  const webp = src.replace(/\.(jpe?g|png)$/i, '.webp')
  return (
    <picture>
      {webp !== src && <source srcSet={webp} type="image/webp" />}
      <img src={src} alt={alt} {...rest} />
    </picture>
  )
}
