import type { CSSProperties } from 'react'
import PlaceholderArt, { type ArtKind } from './PlaceholderArt'
import './cards.css'

type Props = {
  caption?: string
  art: ArtKind
  src?: string
  rot?: number
  className?: string
  style?: CSSProperties
}

export default function Polaroid({ caption, art, src, rot, className = '', style }: Props) {
  return (
    <figure className={`polaroid ${className}`} style={{ ...(rot !== undefined && { '--rot': `${rot}deg` }), ...style } as CSSProperties}>
      <div className="polaroid__photo">{src ? <img src={src} alt={caption ?? ''} loading="lazy" /> : <PlaceholderArt kind={art} label={caption} />}</div>
      <figcaption className="polaroid__caption">{caption}</figcaption>
    </figure>
  )
}
