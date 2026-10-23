import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...p}>
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
  </svg>
)

export const ChevronLeft = (p: P) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M10 3.5L5.5 8l4.5 4.5" />
  </svg>
)

export type SocialIcon = 'instagram' | 'linkedin' | 'medium'

/** Social glyphs drawn as simple original marks for a rounded tile. */
export function SocialGlyph({ icon }: { icon: SocialIcon }) {
  if (icon === 'instagram')
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="11" y="11" width="26" height="26" rx="8" fill="none" stroke="#fff" strokeWidth="3.4" />
        <circle cx="24" cy="24" r="6.2" fill="none" stroke="#fff" strokeWidth="3.4" />
        <circle cx="31.5" cy="16.5" r="2" fill="#fff" />
      </svg>
    )
  if (icon === 'linkedin')
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="12" y="20" width="5" height="16" rx="1" fill="#fff" />
        <circle cx="14.5" cy="13.5" r="3" fill="#fff" />
        <path d="M21 20h4.6v2.4c1-1.7 3-2.9 5.6-2.9 4.2 0 5.8 2.6 5.8 7V36h-5v-8.6c0-2.2-.7-3.6-2.7-3.6-2.1 0-3.3 1.5-3.3 3.8V36h-5z" fill="#fff" />
      </svg>
    )
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="17" cy="24" rx="8.5" ry="9" fill="#fff" />
      <ellipse cx="30.5" cy="24" rx="4" ry="8.5" fill="#fff" />
      <ellipse cx="37.5" cy="24" rx="1.6" ry="7.5" fill="#fff" />
    </svg>
  )
}
