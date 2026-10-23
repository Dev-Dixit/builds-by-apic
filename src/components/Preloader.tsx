import { useEffect, useRef, useState } from 'react'
import { useInteractive } from '../hooks/interactive'
import { lockScroll, refreshScroll } from '../hooks/scroll'
import { CloudImage } from './Scenery'
import './preloader.css'

// Images the first viewport needs; the counter tracks these plus the web fonts.
const CRITICAL = ['/assets/images/clouds/bank-wide.webp', '/assets/images/clouds/puff.webp', '/assets/images/clouds/floor.webp']
const MIN_MS = 1400

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = src
  })
}

/**
 * Full-screen loader with a percentage counter and progress bar, as on the reference.
 * Sets `html.is-loaded` when it leaves, which starts the hero's intro animation.
 * Skipped in lite mode, for reduced motion, and on client-side navigations.
 */
export default function Preloader() {
  const { interactive } = useInteractive()
  const [skip] = useState(() => !interactive || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [gone, setGone] = useState(skip)
  const [leaving, setLeaving] = useState(false)
  const pctRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = document.documentElement
    if (skip) {
      root.classList.add('is-loaded')
      return
    }
    lockScroll(true)
    let target = 0
    let shown = 0
    let done = 0
    let raf = 0
    let finished = false
    const t0 = performance.now()
    let last = t0
    const tasks = [document.fonts.ready.then(() => undefined), ...CRITICAL.map(loadImage)]
    tasks.forEach((t) => t.then(() => (target = ++done / tasks.length)))

    const step = (now: number) => {
      // never run ahead of the clock-based minimum, so the counter is always readable
      const cap = Math.min(1, (now - t0) / MIN_MS)
      // time-based easing (τ ≈ 160ms) so the count finishes even if frames are throttled
      const k = 1 - Math.exp(-(now - last) / 160)
      last = now
      shown += (Math.min(target, cap) - shown) * k
      if (target >= 1 && cap >= 1 && shown > 0.985) shown = 1
      const pct = Math.max(1, Math.round(shown * 100))
      if (pctRef.current) pctRef.current.textContent = `${pct}%`
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`
      if (shown >= 1 && !finished) {
        finished = true
        setLeaving(true)
        root.classList.add('is-loaded')
        lockScroll(false)
        refreshScroll()
        window.setTimeout(() => setGone(true), 900)
        return
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      lockScroll(false)
    }
  }, [skip])

  if (gone) return null
  return (
    <div className={`preloader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite" aria-label="Loading">
      <div className="preloader__sky" aria-hidden="true">
        <CloudImage kind="floor" className="preloader__cloud preloader__cloud--a" />
        <CloudImage kind="bank-wide" className="preloader__cloud preloader__cloud--b" />
      </div>
      <div className="preloader__center">
        <span ref={pctRef} className="preloader__pct">
          1%
        </span>
        <span className="preloader__bar" aria-hidden="true">
          <span ref={barRef} />
        </span>
      </div>
      <p className="preloader__hint">
        For a faster experience,
        <br />
        turn off Interactive mode.
        <svg viewBox="0 0 40 56" aria-hidden="true">
          <path d="M22 2c10 12 10 30-6 46M16 48l1-12M16 48l11-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </p>
    </div>
  )
}
