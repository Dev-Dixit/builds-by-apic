import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { site } from '../content'
import { useInteractive } from '../hooks/interactive'
import { userAsset } from '../userAssets'
import './nav.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/works', label: 'Works', end: false },
  { to: '/about-me', label: 'About me', end: false },
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
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className="side-nav__link">
            {l.label}
          </NavLink>
        ))}
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
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="mobile-nav__link">
              {l.label}
            </NavLink>
          ))}
          <a className="mobile-nav__link" href={site.resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </div>
    </>
  )
}
