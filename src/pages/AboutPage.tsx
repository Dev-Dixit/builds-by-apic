import { useEffect, useRef, type CSSProperties } from 'react'
import { aboutPage } from '../content'
import { useInteractive } from '../hooks/interactive'
import { clamp, smooth, useScrollProgress } from '../hooks/useScroll'
import { CloudBank, Stars } from '../components/Scenery'
import Polaroid from '../components/Polaroid'
import Contact from '../components/Contact'
import './about.css'

// Where each photo settles around the paragraph, as [x vw, y vh, rotation deg].
const layout4: [number, number, number][] = [
  [-27, -22, -6],
  [24, -24, 5],
  [-25, 21, 4],
  [27, 19, -5],
]
const layout7: [number, number, number][] = [
  [-26, -25, -5],
  [0, -26, 2],
  [26, -25, 3],
  [-33, 20, -3],
  [-11, 21, 4],
  [11, 20, -3],
  [33, 19, 4],
]

function FlyThrough() {
  const ref = useRef<HTMLElement>(null)
  const { interactive } = useInteractive()
  const n = aboutPage.chapters.length

  useScrollProgress(
    ref,
    (p, el) => {
      const P = p * (n - 0.2)
      el.querySelectorAll<HTMLElement>('.chapter').forEach((ch, i) => {
        const u = clamp(P - i)
        const last = i === n - 1
        const approach = smooth(0, 0.45, u)
        const leave = last ? 0 : smooth(0.78, 1, u)
        const scale = (0.18 + 0.82 * approach) * (1 + 1.4 * leave)
        const opacity = smooth(0, 0.12, u) * (1 - leave)
        const blur = (1 - smooth(0, 0.35, u)) * 8 + leave * 6
        ch.style.setProperty('--spread', approach.toFixed(3))
        ch.style.setProperty('--scale', scale.toFixed(3))
        ch.style.setProperty('--op', opacity.toFixed(3))
        ch.style.setProperty('--blur', `${blur.toFixed(2)}px`)
        ch.style.setProperty('--text', (smooth(0.3, 0.5, u) * (1 - leave)).toFixed(3))
        ch.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
      })
    },
    'pin',
    interactive,
  )

  // Leaving interactive mode: drop the scroll-driven inline styles so the static layout shows.
  useEffect(() => {
    if (interactive) return
    ref.current?.querySelectorAll<HTMLElement>('.chapter').forEach((ch) => {
      for (const prop of ['--spread', '--scale', '--op', '--blur', '--text', 'visibility']) ch.style.removeProperty(prop)
    })
  }, [interactive])

  return (
    <section ref={ref} className={`fly ${interactive ? 'is-live' : 'is-static'}`} style={{ '--chapters': n } as CSSProperties} aria-label="Personal space">
      <div className="fly__stage">
        {aboutPage.chapters.map((ch, i) => {
          const pos = ch.photos.length > 4 ? layout7 : layout4
          return (
            <div key={i} className="chapter" style={{ zIndex: n - i }}>
              <div className="chapter__photos">
                {ch.photos.map((ph, j) => (
                  <div
                    key={j}
                    className="chapter__photo"
                    style={{ '--tx': `${pos[j][0]}vw`, '--ty': `${pos[j][1]}vh`, '--r': `${pos[j][2]}deg` } as CSSProperties}
                  >
                    <Polaroid caption={ph.caption} art={ph.art} />
                  </div>
                ))}
              </div>
              <div className="chapter__text">
                {'heading' in ch && ch.heading && <h2 className="chapter__heading">{ch.heading}</h2>}
                <p>{ch.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <main className="page page--about">
      <div className="about-sky" aria-hidden="true">
        <div className="about-sky__haze" />
        <Stars count={140} seed={12} />
      </div>

      <section className="about-intro">
        <p className="about-intro__lead blur-in">
          {aboutPage.intro.map((s, i) => (s.b ? <strong key={i}>{s.t}</strong> : <span key={i}>{s.t}</span>))}
        </p>
        <p className="about-intro__hint blur-in" style={{ '--delay': '0.3s' } as CSSProperties}>
          Let me take you through my personal space.
          <br />
          Scroll down to continue
        </p>
      </section>

      <FlyThrough />

      <div className="about-end">
        <CloudBank className="about-end__clouds" puffs={24} seed={14} spread={0.6} />
        <Contact />
      </div>
    </main>
  )
}
