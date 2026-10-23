import { useEffect, useRef } from 'react'
import { site } from '../content'
import { useInteractive } from '../hooks/interactive'
import { Sparkle } from './Scenery'
import './monitor.css'

const dock = ['#ff5f57', '#7a5cff', '#29c46a', '#ffb02e', '#1fa1ff', '#ff6ab3']

/** Original hero illustration: a chunky retro monitor on a glass pedestal. */
export default function MonitorScene() {
  const ref = useRef<HTMLDivElement>(null)
  const { interactive } = useInteractive()

  // Subtle pointer parallax + googly eyes that follow the cursor.
  useEffect(() => {
    const el = ref.current
    if (!el || !interactive) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5
        el.style.setProperty('--mx', x.toFixed(3))
        el.style.setProperty('--my', y.toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
    }
  }, [interactive])

  return (
    <div className="scene" ref={ref}>
      <div className="scene__pedestal" aria-hidden="true">
        <span className="scene__pedestal-top" />
      </div>

      <svg className="scene__blob" viewBox="0 0 620 190" aria-hidden="true">
        <defs>
          <radialGradient id="blob-fill" cx="50%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ff9be8" />
            <stop offset=".5" stopColor="#d43fd0" />
            <stop offset="1" stopColor="#8c22b4" />
          </radialGradient>
        </defs>
        <path
          d="M28 100 L160 74 L214 16 L276 66 L372 62 L462 14 L514 78 L594 104 L514 132 L414 174 L206 174 L120 132 Z"
          fill="url(#blob-fill)"
          stroke="url(#blob-fill)"
          strokeWidth="30"
          strokeLinejoin="round"
        />
      </svg>

      <div className="scene__monitor layer-1" aria-hidden="true">
        <div className="monitor__screen">
          <div className="screen__sky" />
          <div className="screen__cloud" />
          <div className="screen__hill" />
          <div className="screen__dock">
            {dock.map((c) => (
              <span key={c} style={{ background: c }} />
            ))}
          </div>
          <div className="screen__app">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="screen__hello">
            Hello There,
            <br />
            Visitor <span className="wave">👋</span>
          </div>
        </div>
        <div className="monitor__side">
          <span className="knob knob--pink" />
          <span className="knob knob--gold" />
        </div>
        <span className="note note--green" />
        <span className="note note--yellow" />
      </div>

      <div className="scene__neck" aria-hidden="true" />
      <div className="scene__base layer-1">
        <a className="base__label" href={site.resumeUrl} target="_blank" rel="noreferrer">
          View resume
        </a>
        <span className="base__slot" />
        <span className="base__foot" />
      </div>

      <div className="scene__mug layer-2" aria-hidden="true">
        <span className="mug__handle" />
        <span className="mug__body">
          <span className="eye">
            <i />
          </span>
          <span className="eye">
            <i />
          </span>
        </span>
      </div>

      <div className="scene__ball layer-2" aria-hidden="true" />

      <Sparkle className="scene__spark scene__spark--teal layer-3" color="#5fe0b8" />
      <Sparkle className="scene__spark scene__spark--pink layer-3" color="#ff6fb1" />
    </div>
  )
}
