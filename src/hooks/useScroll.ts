import { useEffect, useRef, type RefObject } from 'react'
import { subscribeScroll } from './scroll'

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

/**
 * Calls `onProgress` on every frame the page scrolls.
 * - "pin": 0 when the element's top hits the viewport top, 1 when its bottom hits the viewport bottom
 *   (for tall sections with a sticky child).
 * - "through": 0 when the element's top enters the bottom of the viewport, 1 when its bottom leaves the top.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (p: number, el: T) => void,
  mode: 'pin' | 'through' = 'pin',
  enabled = true,
) {
  const cb = useRef(onProgress)
  cb.current = onProgress

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    let top = 0
    let height = 0
    let layout = -1
    return subscribeScroll(({ y, vh, layout: l }) => {
      if (l !== layout) {
        layout = l
        const r = el.getBoundingClientRect()
        top = r.top + y
        height = r.height
      }
      const rel = top - y
      const p = mode === 'pin' ? -rel / Math.max(1, height - vh) : (vh - rel) / (vh + height)
      cb.current(clamp(p), el)
    })
  }, [ref, mode, enabled])
}
