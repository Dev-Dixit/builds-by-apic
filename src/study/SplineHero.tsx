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
