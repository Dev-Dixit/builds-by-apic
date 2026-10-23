import { useEffect, useRef } from 'react'
import lottie, { type AnimationItem } from 'lottie-web/build/player/lottie_light'

/** A looping Lottie that only plays while it is on screen. */
export default function LottieScreen({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const anim: AnimationItem = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: src,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    })
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !reduce ? anim.play() : anim.pause()), { threshold: 0.2 })
    io.observe(el)
    return () => {
      io.disconnect()
      anim.destroy()
    }
  }, [src])

  return <div ref={ref} className="lottie-screen" aria-hidden="true" />
}
