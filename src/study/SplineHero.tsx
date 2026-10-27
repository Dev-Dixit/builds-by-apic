import { useEffect, useRef } from 'react'
import { Application } from '@splinetool/runtime'
import sceneUrl from '../../study-assets/scene/scene.splinecode?url'

/**
 * The reference's hero scene (local study mode only): a 120vw × 110vh canvas at (-10vw, 64px - 10vh).
 *
 * The scene renders continuously, which is the most expensive thing on the page. It is paused whenever the
 * hero is off screen or the tab is hidden, so scrolling past it costs nothing.
 */
export default function SplineHero() {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current
    const wrap = box.current
    if (!el || !wrap) return
    const app = new Application(el)
    let loaded = false
    let visible = true
    let disposed = false

    // Adaptive resolution: when the scene cannot hold ~18fps the canvas is re-rendered at a lower
    // resolution (CSS still stretches it to the full box), stepping down 100% -> 80% -> 65%.
    const scales = [1, 0.8, 0.65]
    let step = 0
    let samples: number[] = []
    let windowStart = 0
    let last = 0
    let raf = 0
    const watch = (t: number) => {
      raf = requestAnimationFrame(watch)
      const dt = t - last
      last = t
      // a long gap means the scene was paused (off screen, hidden tab) rather than slow
      if (!loaded || app.isStopped || dt > 3000 || dt <= 0) {
        samples = []
        return
      }
      if (!samples.length) windowStart = t
      samples.push(Math.min(dt, 250))
      // judge over a ~2s window (at least 3 frames, however slow they are)
      if (t - windowStart < 2000 || samples.length < 3) return
      const median = [...samples].sort((a, b) => a - b)[samples.length >> 1]
      samples = []
      if (median > 55 && step < scales.length - 1) {
        step++
        app.setSize(Math.round(wrap.clientWidth * scales[step]), Math.round(wrap.clientHeight * scales[step]))
      }
    }
    raf = requestAnimationFrame(watch)
    // setSize() switches the runtime's own auto-resize off, so keep the stepped-down size in line with the box
    const onResize = () => step > 0 && app.setSize(Math.round(wrap.clientWidth * scales[step]), Math.round(wrap.clientHeight * scales[step]))
    window.addEventListener('resize', onResize)

    const sync = () => {
      if (!loaded || disposed) return
      const run = visible && !document.hidden
      if (run && app.isStopped) app.play()
      else if (!run && !app.isStopped) app.stop()
    }

    app
      .load(sceneUrl)
      .then(() => {
        loaded = true
        sync()
      })
      .catch((e) => console.error('Spline scene failed to load', e))

    // The canvas spans the hero and overhangs it, so "visible" is measured against the hero's own height.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0 },
    )
    io.observe(wrap.parentElement ?? wrap)
    document.addEventListener('visibilitychange', sync)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      app.dispose()
    }
  }, [])

  // The runtime sizes the canvas from its parent, so the parent carries the viewport-relative box.
  return (
    <div ref={box} className="spline-hero" aria-hidden="true">
      <canvas ref={canvas} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
