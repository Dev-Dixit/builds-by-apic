import { useEffect, useMemo, useRef } from 'react'
import { subscribeScroll } from '../hooks/scroll'
import { seeded } from './rand'
import './techcloud.css'

const icons = import.meta.glob<string>('../assets/tech/*.svg', { eager: true, query: '?url', import: 'default' })
const iconUrl = (id: string) => icons[`../assets/tech/${id}.svg`]

type Tech = { id: string; label: string }
export const techGroups: { label: string; items: Tech[] }[] = [
  {
    label: 'Languages',
    items: [
      { id: 'html5', label: 'HTML5' },
      { id: 'css3', label: 'CSS' },
      { id: 'sass', label: 'SCSS' },
      { id: 'javascript', label: 'JavaScript' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'c', label: 'C' },
      { id: 'cplusplus', label: 'C++' },
      { id: 'php', label: 'PHP' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { id: 'react', label: 'React.js' },
      { id: 'nextjs', label: 'Next.js' },
      { id: 'angular', label: 'Angular.js' },
      { id: 'redux', label: 'Redux' },
      { id: 'tanstack', label: 'TanStack Query' },
      { id: 'tailwind', label: 'Tailwind CSS' },
      { id: 'bootstrap', label: 'Bootstrap' },
      { id: 'mui', label: 'Material UI' },
      { id: 'shadcn', label: 'Shadcn UI' },
      { id: 'gsap', label: 'GSAP' },
      { id: 'framer', label: 'Framer Motion' },
      { id: 'threejs', label: 'Three.js' },
    ],
  },
  {
    label: 'Backend & real-time',
    items: [
      { id: 'nodejs', label: 'Node.js' },
      { id: 'express', label: 'Express.js' },
      { id: 'socketio', label: 'Socket.IO' },
      { id: 'firebase', label: 'Firebase' },
      { id: 'api', label: 'RESTful APIs' },
    ],
  },
  {
    label: 'Databases',
    items: [
      { id: 'mongodb', label: 'MongoDB' },
      { id: 'postgresql', label: 'PostgreSQL' },
      { id: 'redis', label: 'Redis' },
    ],
  },
  {
    label: 'Developer tools',
    items: [
      { id: 'git', label: 'Git' },
      { id: 'github', label: 'GitHub' },
      { id: 'bitbucket', label: 'BitBucket' },
      { id: 'postman', label: 'Postman' },
      { id: 'vscode', label: 'VS Code' },
      { id: 'webpack', label: 'Webpack' },
      { id: 'chrome', label: 'Chrome DevTools' },
      { id: 'npm', label: 'npm' },
      { id: 'pnpm', label: 'pnpm' },
    ],
  },
  {
    label: 'Cloud, payments & web3',
    items: [
      { id: 'aws', label: 'AWS' },
      { id: 'docker', label: 'Docker' },
      { id: 'stripe', label: 'Stripe' },
      { id: 'razorpay', label: 'Razorpay' },
      { id: 'hostinger', label: 'Hostinger' },
      { id: 'ethereum', label: 'Ethereum' },
    ],
  },
]

/** No brand mark exists for "RESTful APIs": a request/response glyph instead. */
function ApiGlyph() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="4" y="9" width="40" height="30" rx="7" fill="#5b4bf5" />
      <path d="M17 19l-5 5 5 5M31 19l5 5-5 5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 18l-4 12" stroke="#ffd166" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * The tech stack as dust: every logo starts as a faint speck far away, at its own random spot, and as the section
 * scrolls into view they all drift in, spinning and sharpening, until they settle into their groups. It is tied to
 * the scroll position, so scrolling back up scatters them again.
 */
export default function TechCloud() {
  const root = useRef<HTMLDivElement>(null)
  const tiles = useRef<(HTMLLIElement | null)[]>([])
  const groups = useRef<(HTMLDivElement | null)[]>([])

  const specks = useMemo(() => {
    const r = seeded(2026)
    let n = 0
    return techGroups.map((g) => ({
      ...g,
      items: g.items.map((it) => {
        const a = r() * Math.PI * 2
        const d = 380 + r() * 760
        return { ...it, n: n++, dx: Math.cos(a) * d * 1.25, dy: Math.sin(a) * d * 0.8 - 120, rot: (r() - 0.5) * 520, delay: r() * 0.42 }
      }),
    }))
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const paintTile = (t: (typeof specks)[number]['items'][number], p: number) => {
      const node = tiles.current[t.n]
      if (!node) return
      const local = clamp((p - t.delay) / (1 - t.delay * 0.6))
      const e = easeOut(local)
      if (e >= 1) {
        node.style.transform = ''
        node.style.opacity = ''
        node.style.filter = ''
        node.classList.add('is-settled')
        return
      }
      node.classList.remove('is-settled')
      const k = 1 - e
      node.style.transform = `translate3d(${(t.dx * k).toFixed(1)}px, ${(t.dy * k).toFixed(1)}px, 0) rotate(${(t.rot * k).toFixed(1)}deg) scale(${(0.18 + 0.82 * e).toFixed(3)})`
      node.style.opacity = (0.15 + 0.85 * e).toFixed(3)
      node.style.filter = `blur(${(k * 7).toFixed(1)}px)`
    }
    if (reduce) {
      specks.forEach((g) => g.items.forEach((t) => paintTile(t, 1)))
      return
    }
    // each group forms as it reaches the lower part of the screen, so the groups further down are still dust until you get to them
    const last: number[] = []
    return subscribeScroll(({ vh }) => {
      specks.forEach((g, gi) => {
        const el = groups.current[gi]
        if (!el) return
        const p = clamp((vh * 0.96 - el.getBoundingClientRect().top) / (vh * 0.55))
        if (last[gi] !== undefined && Math.abs(p - last[gi]) < 0.0005) return
        last[gi] = p
        g.items.forEach((t) => paintTile(t, p))
      })
    })
  }, [specks])

  return (
    <div ref={root} className="tech" role="list" aria-label="Tech stack">
      {specks.map((g, gi) => (
        <div key={g.label} ref={(node) => void (groups.current[gi] = node)} className="tech__group" role="group" aria-label={g.label}>
          <h3 className="tech__label">{g.label}</h3>
          <ul className="tech__grid">
            {g.items.map((t) => (
              <li key={t.id} ref={(node) => void (tiles.current[t.n] = node)} className="tech__tile" style={{ '--f': `${(t.n % 7) * 0.45}s` } as React.CSSProperties}>
                <span className="tech__face">
                  {t.id === 'api' ? <ApiGlyph /> : <img src={iconUrl(t.id)} alt="" draggable={false} />}
                </span>
                <span className="tech__name">{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
