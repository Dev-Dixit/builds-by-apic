import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { subscribeScroll } from '../hooks/scroll'
import { useInteractive } from '../hooks/interactive'

type Anchor = 'center' | 'page'

/**
 * Moves an element at its own scroll rate, as measured on the reference: translateY = rate × scroll distance.
 * 0 moves with the page; positive values lag behind it (further away); negative values outrun it.
 *
 * anchor "center": the offset is zero when the element's box is centred in the viewport.
 * anchor "page":   the offset is zero at the top of the page (Framer's scroll-speed effect).
 * minWidth:        below this viewport width the element stays put (for desktop-calibrated offsets).
 */
export function useParallax(ref: RefObject<HTMLElement | null>, rate: number, anchor: Anchor = 'center', minWidth = 0) {
  const { interactive } = useInteractive()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!interactive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transform = ''
      return
    }
    let base = 0
    let layout = -1
    const unsub = subscribeScroll(({ y, vh, layout: l }) => {
      if (window.innerWidth < minWidth) {
        el.style.transform = ''
        layout = -1
        return
      }
      if (l !== layout) {
        layout = l
        if (anchor === 'page') base = 0
        else {
          el.style.transform = ''
          const r = el.getBoundingClientRect()
          base = r.top + y + r.height / 2 - vh / 2
        }
      }
      el.style.transform = `translate3d(0, ${(rate * (y - base)).toFixed(2)}px, 0)`
    })
    return () => {
      unsub()
      el.style.transform = ''
    }
  }, [ref, rate, anchor, minWidth, interactive])
}

type Props = {
  rate: number
  anchor?: Anchor
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** A decorative layer that moves at its own scroll rate (transform only, one shared rAF loop). */
export default function Parallax({ rate, anchor = 'center', className, style, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useParallax(ref, rate, anchor)
  return (
    <div ref={ref} className={`parallax ${className ?? ''}`} style={style} aria-hidden="true">
      {children}
    </div>
  )
}
