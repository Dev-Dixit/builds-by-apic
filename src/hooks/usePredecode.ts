import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Large photos and scenery are decoded the first time they scroll into view, which stalls a frame for
 * 100ms+ each. Once the page has settled, decode them one at a time in the background instead so that
 * scrolling only has to paint them.
 */
export function usePredecode() {
  const { pathname } = useLocation()
  useEffect(() => {
    let cancelled = false
    const idle = (fn: () => void) => (typeof requestIdleCallback === 'function' ? requestIdleCallback(fn, { timeout: 400 }) : setTimeout(fn, 60))

    const run = async () => {
      // biggest first: they are the ones that hurt
      const imgs = [...document.images].sort((a, b) => b.naturalWidth * b.naturalHeight - a.naturalWidth * a.naturalHeight)
      for (const img of imgs) {
        if (cancelled) return
        if (img.loading === 'lazy' && !img.complete) img.loading = 'eager'
        try {
          await img.decode()
        } catch {
          /* broken or removed image */
        }
        await new Promise<void>((r) => idle(r))
      }
    }

    const start = () => window.setTimeout(() => !cancelled && run(), 1200)
    let t = 0
    if (document.readyState === 'complete') t = start()
    else window.addEventListener('load', () => (t = start()), { once: true })
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [pathname])
}
