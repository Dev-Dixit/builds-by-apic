import { useId, type ReactNode } from 'react'

export type ArtKind = 'portrait' | 'track' | 'campus' | 'team' | 'sketch' | 'band' | 'guitar' | 'landscape'

/**
 * Original flat illustrations used wherever a real photo has not been supplied.
 * Each one is a small 4:3.4 scene drawn with simple shapes.
 */
export default function PlaceholderArt({ kind, label }: { kind: ArtKind; label?: string }) {
  const id = useId()
  const g = (n: string) => `${id}${n}`

  return (
    <svg viewBox="0 0 200 170" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label ?? `${kind} illustration`}>
      <defs>
        <linearGradient id={g('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[kind][0]} />
          <stop offset="1" stopColor={sky[kind][1]} />
        </linearGradient>
        <linearGradient id={g('shade')} x1="0" y1="0" x2="0" y2="1">
          <stop offset=".55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".18" />
        </linearGradient>
      </defs>
      <rect width="200" height="170" fill={`url(#${g('sky')})`} />
      {scenes[kind]}
      <rect width="200" height="170" fill={`url(#${g('shade')})`} />
    </svg>
  )
}

const sky: Record<ArtKind, [string, string]> = {
  portrait: ['#cfd6e4', '#8f9bb3'],
  track: ['#3b4a6b', '#c86b4a'],
  campus: ['#9fd0ff', '#e6f3ff'],
  team: ['#f2ece6', '#d8cfc6'],
  sketch: ['#f4f1ea', '#e2dccf'],
  band: ['#1f6b5c', '#46b39a'],
  guitar: ['#e7e1d6', '#b9ae9c'],
  landscape: ['#8ec5ff', '#ffe3b0'],
}

const person = (x: number, y: number, s: number, shirt: string, skin = '#c78d68', hair = '#2b211c') => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-22 60c2-24 10-34 22-34s20 10 22 34z" fill={shirt} />
    <circle cx="0" cy="8" r="13" fill={skin} />
    <path d="M-13 6c0-11 6-16 13-16s13 5 13 16c-3-6-8-8-13-8s-10 2-13 8z" fill={hair} />
  </g>
)

const scenes: Record<ArtKind, ReactNode> = {
  portrait: (
    <>
      <path d="M40 170V60c0-30 27-48 60-48s60 18 60 48v110z" fill="#e9e4dc" />
      <path d="M62 170V70c0-22 17-36 38-36s38 14 38 36v100z" fill="#2c2f38" />
      {person(100, 92, 1.5, '#1d2a4a')}
      <path d="M96 132l4 30 4-30z" fill="#3c63b8" />
    </>
  ),
  track: (
    <>
      <rect y="112" width="200" height="58" fill="#b5543a" />
      <path d="M0 128h200M0 146h200" stroke="#f3d9cf" strokeWidth="1.6" opacity=".7" />
      {person(78, 70, 1.25, '#1e2228')}
      {person(128, 62, 1.35, '#2f9b5a')}
      <rect x="116" y="104" width="22" height="14" rx="2" fill="#fff" />
      <text x="127" y="115" fontSize="10" textAnchor="middle" fontFamily="Arial" fontWeight="700" fill="#222">
        21
      </text>
    </>
  ),
  campus: (
    <>
      <rect x="62" y="58" width="76" height="40" fill="#efe9df" />
      <path d="M56 60h88l-44-26z" fill="#d9cfc1" />
      <circle cx="100" cy="40" r="10" fill="#cfc4b4" />
      <rect x="78" y="70" width="10" height="28" fill="#b9ae9c" />
      <rect x="112" y="70" width="10" height="28" fill="#b9ae9c" />
      <path d="M0 170V96c30 4 60 4 100 4s70 0 100-4v74z" fill="#4e8b45" />
      <path d="M86 170l10-70h8l10 70z" fill="#d8c9a8" />
      <circle cx="30" cy="92" r="20" fill="#3f7a3a" />
      <circle cx="172" cy="90" r="22" fill="#3f7a3a" />
    </>
  ),
  team: (
    <>
      <rect x="20" y="20" width="160" height="70" rx="6" fill="#fff" opacity=".7" />
      <rect x="84" y="32" width="32" height="32" rx="9" fill="#ff6a1a" />
      <path d="M100 40a8 8 0 0 1 0 16 8 8 0 0 1 0-16z" fill="#fff" />
      {person(44, 92, 0.95, '#8a7fd6')}
      {person(76, 88, 1, '#e5e5e5')}
      {person(112, 90, 1, '#2d3a5e')}
      {person(146, 86, 1.05, '#c94b4b')}
      <rect y="150" width="200" height="20" fill="#cbbfb3" />
    </>
  ),
  sketch: (
    <>
      <rect x="40" y="18" width="120" height="140" rx="2" fill="#fbfaf6" stroke="#d9d3c5" />
      <path d="M70 120c0-30 12-58 30-58s30 28 30 58" fill="none" stroke="#555" strokeWidth="2" />
      <circle cx="100" cy="58" r="20" fill="none" stroke="#444" strokeWidth="2" />
      <path d="M88 56h6M106 56h6M95 68c3 2 7 2 10 0" stroke="#444" strokeWidth="1.6" fill="none" />
      <path d="M150 150l30-60" stroke="#5c6bc0" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  band: (
    <>
      <rect y="118" width="200" height="52" fill="#7a3b2e" />
      <circle cx="40" cy="30" r="10" fill="#fff4a8" opacity=".8" />
      <circle cx="160" cy="26" r="8" fill="#ffd1f0" opacity=".8" />
      {person(60, 66, 1.1, '#f0f0f0')}
      {person(110, 60, 1.2, '#222')}
      {person(156, 70, 1.05, '#d0443e')}
      <rect x="92" y="112" width="40" height="8" rx="3" fill="#c48a3a" transform="rotate(-18 112 116)" />
    </>
  ),
  guitar: (
    <>
      <rect x="140" y="10" width="50" height="80" fill="#cfe3f2" />
      {person(92, 64, 1.4, '#2f62c9')}
      <ellipse cx="96" cy="130" rx="30" ry="20" fill="#b02a26" />
      <rect x="110" y="112" width="70" height="7" rx="3" fill="#3a2a22" transform="rotate(-24 110 115)" />
      <circle cx="96" cy="130" r="6" fill="#2a1a15" />
    </>
  ),
  landscape: (
    <>
      <circle cx="150" cy="44" r="16" fill="#fff1c9" />
      <path d="M0 120c30-24 60-30 100-20s70 4 100-12v82H0z" fill="#7aa86a" />
      <path d="M0 140c40-14 80-14 120-6s60 4 80-4v40H0z" fill="#e2c35d" />
      <path d="M40 60c10-6 24-6 34 0M120 70c8-4 18-4 26 0" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".8" />
    </>
  ),
}
