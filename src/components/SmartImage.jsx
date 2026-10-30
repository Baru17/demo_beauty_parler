import { useState } from 'react'

const FALLBACK = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <rect width="800" height="1000" fill="#E8DED1"/>
    <text x="400" y="492" text-anchor="middle" font-family="Georgia, serif" font-size="52" letter-spacing="15" fill="#7A746D">AURELLE</text>
    <text x="400" y="528" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" letter-spacing="4" fill="#9C958C">IMAGE UNAVAILABLE</text>
  </svg>`,
)}`

/**
 * Responsive, lazy-loaded image with explicit dimensions (prevents layout
 * shift) and a graceful branded fallback if a file is missing.
 */
export default function SmartImage({
  image,
  sizes = '100vw',
  priority = false,
  className = '',
  style,
  ...rest
}) {
  const [failed, setFailed] = useState(false)

  if (!image?.src) return null

  const { src, small, width, height, alt } = image
  const smallWidth = image.smallWidth ?? Math.round(width / 2)

  return (
    <img
      src={failed ? FALLBACK : src}
      srcSet={failed || !small ? undefined : `${small} ${smallWidth}w, ${src} ${width}w`}
      sizes={failed ? undefined : sizes}
      width={width}
      height={height}
      alt={alt ?? ''}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
      className={className}
      style={style}
      {...rest}
    />
  )
}
