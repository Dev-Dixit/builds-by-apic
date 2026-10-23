import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import { useInteractive } from './hooks/interactive'
import { refreshScroll, scrollToTop, setSmoothScroll } from './hooks/scroll'
import HomePage from './pages/HomePage'
import WorksPage from './pages/WorksPage'
import AboutPage from './pages/AboutPage'
import CaseStudyPage from './pages/CaseStudyPage'
import { site } from './content'

const titles: Record<string, string> = {
  '/': `${site.name}’s Portfolio`,
  '/works': `Works — ${site.name}`,
  '/about-me': `About — ${site.name}`,
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

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SmoothScroll />
      <Preloader />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/:slug" element={<CaseStudyPage />} />
        <Route path="/about-me" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
