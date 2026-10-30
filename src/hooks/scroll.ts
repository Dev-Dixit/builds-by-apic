import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * One requestAnimationFrame loop for everything scroll-linked.
 *
 * - Drives Lenis (smooth wheel scrolling, as on the reference) when it is enabled.
 * - Calls subscribers only on frames where the scroll position, viewport height or layout changed.
 * - `layout` increments whenever the page resizes, so subscribers know to re-measure.
 *
 * Subscribers must only write styles (transforms, custom properties); they never trigger React renders.
 */
export type ScrollState = { y: number; vh: number; layout: number }
type Subscriber = (s: ScrollState) => void

const subs = new Set<Subscriber>()
const state: ScrollState = { y: 0, vh: 0, layout: 0 }
let lenis: Lenis | null = null
let frame = 0
let dirty = true
let observer: ResizeObserver | null = null

function tick(time: number) {
  frame = requestAnimationFrame(tick)
  lenis?.raf(time)
  const y = window.scrollY
  const vh = window.innerHeight
  if (!dirty && y === state.y && vh === state.vh) return
  if (vh !== state.vh) state.layout++
  dirty = false
  state.y = y
  state.vh = vh
  subs.forEach((fn) => fn(state))
}

function start() {
  if (frame) return
  observer = new ResizeObserver(() => refreshScroll())
  observer.observe(document.body)
  frame = requestAnimationFrame(tick)
}

/** Re-measure every subscriber on the next frame (after fonts, images or route changes). */
export function refreshScroll() {
  state.layout++
  dirty = true
}

export function subscribeScroll(fn: Subscriber) {
  subs.add(fn)
  start()
  dirty = true
  return () => {
    subs.delete(fn)
  }
}

export function setSmoothScroll(on: boolean) {
  start()
  if (on && !lenis) {
    // lerp 0.1 is Lenis' default and matches the glide of the reference's Framer smooth scroll.
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false })
  } else if (!on && lenis) {
    lenis.destroy()
    lenis = null
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
  refreshScroll()
}

/** Smooth-scroll to a section of the page (Lenis when enabled, native smooth scrolling otherwise). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 24
  if (lenis) lenis.scrollTo(top, { duration: 1.4 })
  else window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

/** Pause/resume user scrolling (used while the preloader is up). */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
