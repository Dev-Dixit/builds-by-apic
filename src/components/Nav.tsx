import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import SectionLink from './SectionLink'
import { site } from '../content'
import { useInteractive } from '../hooks/interactive'
import { scrollToTop } from '../hooks/scroll'
import { userAsset } from '../userAssets'
import './nav.css'

// The Works and About pages are switched off (see App.tsx): their links scroll to the matching section of the home page.
type NavItem = { to: string; end: boolean; label: string; section?: undefined } | { section: string; label: string; to?: undefined; end?: undefined }
const links: NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { section: 'works', label: 'Works' },
  { section: 'about', label: 'About me' },
]

function ModeToggle() {
  const { interactive, toggle } = useInteractive()
  const stars = userAsset('toggle-stars')
  return (
    <button className="mode-toggle" onClick={toggle} role="switch" aria-checked={interactive} aria-label="Interactive mode">
      <span className="mode-toggle__label">
        Interactive
        <br />
        Mode
      </span>
      <span className={`mode-toggle__track ${interactive ? 'is-on' : ''}`}>
        {stars && <img className="mode-toggle__stars" src={stars} alt="" draggable={false} />}
        <span className="mode-toggle__knob" />
        <span className="mode-toggle__text">{interactive ? 'ON' : 'OFF'}</span>
      </span>
    </button>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav className="side-nav" aria-label="Primary">
        <div className="side-nav__glow" aria-hidden="true" />
        {links.map((l) =>
          l.section ? (
            <SectionLink key={l.label} to={l.section} className="side-nav__link">
              {l.label}
            </SectionLink>
          ) : (
            <NavLink key={l.label} to={l.to!} end={l.end} className="side-nav__link" onClick={() => scrollToTop()}>
              {l.label}
            </NavLink>
          ),
        )}
        <a className="side-nav__link" href={site.resumeUrl} target="_blank" rel="noreferrer">
          Resume
        </a>
        <ModeToggle />
      </nav>

      <div className={`mobile-nav ${open ? 'is-open' : ''}`}>
        <button className="mobile-nav__burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
          <span />
        </button>
        <div id="mobile-menu" className="mobile-nav__panel" hidden={!open}>
          {links.map((l) =>
            l.section ? (
              <SectionLink key={l.label} to={l.section} className="mobile-nav__link" onClick={() => setOpen(false)}>
                {l.label === 'About me' ? 'About Me' : l.label}
              </SectionLink>
            ) : (
              <NavLink key={l.label} to={l.to!} end={l.end} className="mobile-nav__link" onClick={() => scrollToTop()}>
                {l.label}
              </NavLink>
            ),
          )}
          <a className="mobile-nav__link" href={site.resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </div>
    </>
  )
}
