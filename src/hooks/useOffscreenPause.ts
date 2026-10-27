import { useEffect, type RefObject } from 'react'

/**
 * Freezes every looping animation inside `ref` while it is scrolled out of view, so the marquee, twinkling
 * stars, butterflies and status ping stop costing frames once the visitor has moved on.
 * CSS animations are paused through the `is-offscreen` class; script-driven (Web Animations) ones directly.
 */
export function useOffscreenPause(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        const off = !entry.isIntersecting
        el.classList.toggle('is-offscreen', off)
        for (const a of el.getAnimations({ subtree: true })) {
          if (a instanceof CSSAnimation || a instanceof CSSTransition) continue
          if (off) a.pause()
          else a.play()
        }
      },
      { rootMargin: '120px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
