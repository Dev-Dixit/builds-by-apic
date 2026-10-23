import { useId, useMemo, type CSSProperties } from 'react'
import { seeded } from './rand'
import './scenery.css'

export type CloudKind = 'bank-wide' | 'bank-tall' | 'puff' | 'wisp' | 'floor'
const CLOUD_KINDS: CloudKind[] = ['bank-wide', 'puff', 'bank-tall', 'floor']

/** One of the generated volumetric cloud textures (public/assets/images/clouds, see scripts/gen-clouds.mjs). */
export function CloudImage({ kind, className = '', style, eager }: { kind: CloudKind; className?: string; style?: CSSProperties; eager?: boolean }) {
  return (
    <img
      src={`/assets/images/clouds/${kind}.webp`}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      className={`cloud-img ${className}`}
      style={style}
    />
  )
}

type CloudProps = {
  /** Picks a texture when `kind` is not given (kept for older call sites). */
  seed?: number
  kind?: CloudKind
  className?: string
  style?: CSSProperties
  /** Unused since the move to cloud textures; accepted so existing call sites keep compiling. */
  puffs?: number
  spread?: number
  tint?: string
}

/** A cloud bank filling its (absolutely positioned) box, anchored to the bottom. */
export function CloudBank({ seed = 1, kind, className = '', style }: CloudProps) {
  return (
    <div className={`cloud-bank ${className}`} style={style} aria-hidden="true">
      <CloudImage kind={kind ?? CLOUD_KINDS[seed % CLOUD_KINDS.length]} />
    </div>
  )
}

/** Field of twinkling stars. */
export function Stars({ count = 90, seed = 7, className = '' }: { count?: number; seed?: number; className?: string }) {
  const stars = useMemo(() => {
    const r = seeded(seed)
    return Array.from({ length: count }, () => ({
      x: r() * 100,
      y: r() * 100,
      s: r() < 0.12 ? 3 : r() < 0.5 ? 2 : 1.2,
      d: (r() * 4).toFixed(2),
      t: (2.5 + r() * 3).toFixed(2),
    }))
  }, [count, seed])

  return (
    <div className={`stars ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }}
        />
      ))}
    </div>
  )
}

/** Striped hot-air balloon that bobs gently. */
export function Balloon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const id = useId()
  return (
    <svg className={`balloon ${className}`} style={style} viewBox="0 0 60 90" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}s`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#5b2a7a" stopOpacity=".35" />
        </radialGradient>
        <clipPath id={`${id}c`}>
          <path d="M30 2C14 2 3 14 3 28c0 15 13 26 20 36h14c7-10 20-21 20-36C57 14 46 2 30 2z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}c)`}>
        <rect width="60" height="70" fill="#f3b38c" />
        <rect x="9" width="9" height="70" fill="#e98a7a" />
        <rect x="26" width="8" height="70" fill="#f6d2a2" />
        <rect x="42" width="9" height="70" fill="#e98a7a" />
        <rect width="60" height="70" fill={`url(#${id}s)`} />
      </g>
      <path d="M23 64l3 12M37 64l-3 12" stroke="#8a5a4a" strokeWidth="1" />
      <rect x="24.5" y="75" width="11" height="9" rx="2" fill="#9a6440" />
    </svg>
  )
}

/** Swirling galaxy glow used as a background accent. */
export function Galaxy({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <div className={`galaxy ${className}`} style={style} aria-hidden="true" />
}

/** Four-point sparkle. */
export function Sparkle({ className = '', style, color = '#9ee8d0' }: { className?: string; style?: CSSProperties; color?: string }) {
  const id = useId()
  return (
    <svg className={`sparkle ${className}`} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity=".7" />
        </linearGradient>
      </defs>
      <path d="M20 0c1.6 10 5 13.6 20 20-15 6.4-18.4 10-20 20-1.6-10-5-13.6-20-20 15-6.4 18.4-10 20-20z" fill={`url(#${id})`} />
    </svg>
  )
}
