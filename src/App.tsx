import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation, type Location } from 'react-router-dom'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import { useInteractive } from './hooks/interactive'
import { usePredecode } from './hooks/usePredecode'
import { lockScroll, refreshScroll, scrollToTop, setSmoothScroll } from './hooks/scroll'
import HomePage from './pages/HomePage'
// The Works, About and case-study pages are switched off for now; their links scroll to home sections instead.
// import WorksPage from './pages/WorksPage'
// import AboutPage from './pages/AboutPage'
// import CaseStudyPage from './pages/CaseStudyPage'
import { site } from './content'

const titles: Record<string, string> = {
  '/': `${site.name}’s Portfolio`,
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollToTop()
    if (titles[pathname]) document.title = titles[pathname]
  }, [pathname])
  return null
}

/** Lenis smooth scrolling in Interactive mode, native scrolling in lite mode or for reduced motion. */
function SmoothScroll() {
  const { interactive } = useInteractive()
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setSmoothScroll(interactive && !reduce.matches)
    apply()
    reduce.addEventListener('change', apply)
    // Late fonts and images change section heights; re-measure scroll-linked layers once they settle.
    document.fonts.ready.then(refreshScroll)
    window.addEventListener('load', refreshScroll)
    return () => {
      reduce.removeEventListener('change', apply)
      window.removeEventListener('load', refreshScroll)
    }
  }, [interactive])
  return null
}

/**
 * The reference's page transition: the old page closes like an iris towards the top centre of the screen while the
 * new page opens from the same point, then keeps growing until it covers everything (white shows around the circle).
 * Timings are fitted to frames recorded from the live site at 1440px: the old circle shrinks over 0.44s, the new one
 * starts 0.17s in, both meet at a radius of 0.46 × the width, and the new one then expands over ~1s.
 */
type Stage = { id: number; loc: Location; y: number; leaving: boolean }

function RouteStage({ id, loc, leaving }: { id: number; loc: Location; leaving: boolean }) {
  return (
    <div className={`stage ${leaving ? 'stage--leaving' : ''}`} data-stage={id} aria-hidden={leaving || undefined} inert={leaving || undefined}>
      <Nav />
      <Routes location={loc}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/works" element={<WorksPage />} /> */}
        {/* <Route path="/works/:slug" element={<CaseStudyPage />} /> */}
        {/* <Route path="/about-me" element={<AboutPage />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

const EXIT_MS = 440
const ENTER_DELAY_MS = 170
const OPEN_DELAY_MS = 490
const OPEN_MS = 1050

function Stages() {
  const location = useLocation()
  const nextId = useRef(0)
  const [stages, setStages] = useState<Stage[]>(() => [{ id: 0, loc: location, y: 0, leaving: false }])
  const [path, setPath] = useState(location.pathname)

  if (path !== location.pathname) {
    setPath(location.pathname)
    const still = document.documentElement.classList.contains('is-loaded') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setStages((s) => {
      const cur = s[s.length - 1]
      if (!still) return [{ id: cur.id, loc: location, y: 0, leaving: false }]
      return [
        { ...cur, y: window.scrollY, leaving: true },
        { id: ++nextId.current, loc: location, y: 0, leaving: false },
      ]
    })
  }

  const busy = stages.length > 1
  const live = useRef<{ anims: Animation[]; timers: number[] } | null>(null)
  const finish = () => {
    live.current?.anims.forEach((a) => a.cancel())
    live.current?.timers.forEach((t) => window.clearTimeout(t))
    live.current = null
    document.documentElement.classList.remove('is-transitioning')
    lockScroll(false)
    refreshScroll()
  }
  useEffect(() => finish, []) // eslint-disable-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!busy) return
    finish() // a second click mid-transition restarts from the current pages
    const [old, cur] = stages
    const oldEl = document.querySelector<HTMLElement>(`[data-stage="${old.id}"]`)
    const newEl = document.querySelector<HTMLElement>(`[data-stage="${cur.id}"]`)
    if (!oldEl || !newEl) {
      setStages([cur])
      return
    }
    const root = document.documentElement
    const vw = window.innerWidth
    const vh = window.innerHeight
    const full = Math.hypot(vw / 2, vh) + 40
    const rest = Math.min(full - 40, 0.4625 * vw)
    const circle = (r: number) => `circle(${r.toFixed(1)}px at 50% 0px)`
    const frame = (r: number) => ({ clipPath: circle(r) })

    root.classList.add('is-transitioning')
    lockScroll(true)
    oldEl.scrollTop = old.y // the leaving page keeps the scroll position it was left at
    scrollToTop()

    const anims = [
      oldEl.animate([frame(full), frame(rest)], { duration: EXIT_MS, easing: 'cubic-bezier(0.5, 0, 0.9, 0.6)', fill: 'both' }),
      newEl.animate([frame(0), frame(rest)], { duration: EXIT_MS - ENTER_DELAY_MS, delay: ENTER_DELAY_MS, easing: 'cubic-bezier(0.4, 0, 0.6, 1)', fill: 'both' }),
      newEl.animate([frame(rest), frame(full)], { duration: OPEN_MS, delay: OPEN_DELAY_MS, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' }),
    ]
    // from the moment both circles meet, the leaving page is entirely covered
    const drop = window.setTimeout(() => setStages((s) => s.filter((x) => !x.leaving)), OPEN_DELAY_MS + 30)
    const end = window.setTimeout(() => finish(), OPEN_DELAY_MS + OPEN_MS + 60)
    live.current = { anims, timers: [drop, end] }
    // (no cleanup here: dropping the leaving stage re-runs this effect while the new page is still opening)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy])

  return (
    <>
      {stages.map((st) => (
        <RouteStage key={st.id} id={st.id} loc={st.loc} leaving={st.leaving} />
      ))}
    </>
  )
}

export default function App() {
  usePredecode()
  return (
    <>
      <ScrollToTop />
      <SmoothScroll />
      <Preloader />
      <Stages />
    </>
  )
}
