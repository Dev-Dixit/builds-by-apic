import { Suspense, lazy, useMemo, useRef, type CSSProperties } from 'react'
import { useOffscreenPause } from '../hooks/useOffscreenPause'
import { site } from '../content'
import { ArrowUpRight, SocialGlyph } from './Icons'
import Parallax from './Parallax'
import { CloudImage } from './Scenery'
import { userAsset } from '../userAssets'
import { seeded } from './rand'
import './contact.css'

const W = 1440
const CX = 720
const CY = 430
const RX = 1000
const RY = 300
const hillTop = (x: number) => CY - RY * Math.sqrt(Math.max(0, 1 - ((x - CX) / RX) ** 2))

function Meadow() {
  const { blades, flowers } = useMemo(() => {
    const r = seeded(42)
    const blades = Array.from({ length: 420 }, () => {
      const x = r() * W
      const y = hillTop(x) + r() * 40
      const h = 14 + r() * 46
      const lean = (r() - 0.5) * 18
      const shade = ['#3f8f3a', '#5aa845', '#77c25a', '#2f7a33', '#8fd06b'][Math.floor(r() * 5)]
      return { d: `M${x.toFixed(1)} ${y.toFixed(1)}q${(lean / 2).toFixed(1)} ${(-h / 2).toFixed(1)} ${lean.toFixed(1)} ${(-h).toFixed(1)}`, shade }
    })
    const flowers = Array.from({ length: 140 }, () => {
      const x = r() * W
      const y = hillTop(x) - 6 - r() * 40 + r() * 80
      const c = ['#ff9ec7', '#ffd166', '#9ad0ff', '#ffffff', '#c7a6ff', '#ff7aa8'][Math.floor(r() * 6)]
      return { x, y, s: 2 + r() * 4.5, c }
    })
    return { blades, flowers }
  }, [])

  return (
    <svg className="meadow__svg" viewBox={`0 0 ${W} 430`} preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <defs>
        <radialGradient id="hill" cx="50%" cy="20%" r="80%">
          <stop offset="0" stopColor="#9fdc6a" />
          <stop offset=".45" stopColor="#5fae45" />
          <stop offset="1" stopColor="#2f6f35" />
        </radialGradient>
        <radialGradient id="haze" cx="50%" cy="0%" r="70%">
          <stop offset="0" stopColor="#d9f5ff" stopOpacity=".55" />
          <stop offset="1" stopColor="#d9f5ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="url(#hill)" />
      <ellipse cx={CX} cy={CY - 40} rx={RX * 0.7} ry={RY * 0.6} fill="url(#haze)" />
      <g strokeLinecap="round" strokeWidth="2" fill="none">
        {blades.map((b, i) => (
          <path key={i} d={b.d} stroke={b.shade} />
        ))}
      </g>
      {flowers.map((f, i) => (
        <g key={i}>
          <circle cx={f.x} cy={f.y} r={f.s} fill={f.c} />
          <circle cx={f.x} cy={f.y} r={f.s * 0.35} fill="#ffe680" />
        </g>
      ))}
    </svg>
  )
}

// Generic stand-in butterflies, used only when the reference's wing images are absent.
const plainFlyers = [
  { left: 1304, top: 764, c: '#ff9a3c', d: '0s' },
  { left: 1110, top: 600, c: '#5ec8ff', d: '1.2s' },
  { left: 340, top: 630, c: '#ffd34d', d: '.6s' },
  { left: 12, top: 640, c: '#ff7a3c', d: '1.8s' },
  { left: 950, top: 610, c: '#ff6b8a', d: '2.4s' },
]

// Local study mode only: the butterfly motion data is not bundled into production builds.
const Butterflies = import.meta.env.DEV ? lazy(() => import('./Butterflies')) : null

/** Social tiles at the reference's positions; "r" is each tile's resting tilt, which straightens on hover. */
const socialSlots = {
  instagram: { x: 525, y: 563, r: -4 },
  linkedin: { x: 661, y: 555, r: 0 },
  medium: { x: 797, y: 555, r: 4 },
} as const

/**
 * The "Send a Mail" glow: two hill-shaped gradients that cross-fade. The dark one is the resting glow (clipped out
 * of sight below the button); the violet-to-lavender one rises into the button on hover. Paths and colours are the
 * reference's.
 */
function HillGlow() {
  return (
    <>
      <svg className="send__hill send__hill--rest" viewBox="0 0 261 70.115" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="send-hill-rest" x1="0.4975" x2="0.5025" y1="0" y2="1">
            <stop offset="0" stopColor="rgb(22,19,64)" stopOpacity="0.62" />
            <stop offset="0.5495" stopColor="rgb(55,38,101)" stopOpacity="0.91" />
            <stop offset="1" stopColor="rgb(49,47,90)" />
          </linearGradient>
        </defs>
        <g opacity="0.75">
          <path
            d="M 1.856 27.885 C 1.856 27.885 30.623 36.202 51.507 36.202 C 72.392 36.202 119.649 -1.173 160.5 0.028 C 201.351 1.229 238.384 34.644 252.897 42.075 C 267.41 49.507 258.001 70.115 258.001 70.115 L 0 70.115 Z"
            fill="url(#send-hill-rest)"
          />
        </g>
      </svg>
      <svg className="send__hill send__hill--hover" viewBox="0 0 393 70" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="send-hill-hover" x1="0.4975" x2="0.5025" y1="0" y2="1">
            <stop offset="0" stopColor="rgb(49,38,207)" stopOpacity="0.31" />
            <stop offset="0.5495" stopColor="rgb(97,67,177)" />
            <stop offset="1" stopColor="rgb(185,180,243)" />
          </linearGradient>
        </defs>
        <g opacity="0.7">
          <path
            d="M 2.795 27.84 C 2.795 27.84 46.111 36.143 77.557 36.143 C 109.004 36.143 180.161 -1.171 241.672 0.028 C 303.184 1.227 358.946 34.587 380.799 42.006 C 402.651 49.426 388.485 70 388.485 70 L 0 70 Z"
            fill="url(#send-hill-hover)"
          />
        </g>
      </svg>
    </>
  )
}

export default function Contact() {
  const original = Boolean(userAsset('hill'))
  const stars = userAsset('button-stars')
  const root = useRef<HTMLElement>(null)
  useOffscreenPause(root)
  return (
    <footer ref={root} className="finale" aria-labelledby="contact-heading">
      <div className="finale__abs">
        {original ? (
          <>
            <img className="og og__back" src={userAsset('grass-back')} alt="" />
            <div className="og__land">
              <img className="og__hill" src={userAsset('hill')} alt="" />
              <span className="og__shadow og__shadow--a" />
              <span className="og__shadow og__shadow--b" />
              <span className="og__shadow og__shadow--c" />
            </div>
          </>
        ) : (
          <div className="meadow">
            <Meadow />
          </div>
        )}

        <ul className="socials">
          {site.socials.map((s) => {
            const slot = socialSlots[s.icon]
            const img = userAsset(`social-${s.icon}`)
            return (
              <li key={s.label} style={{ '--x': `${slot.x}px`, '--y': `${slot.y}px`, '--r': `${slot.r}deg` } as CSSProperties}>
                <a href={s.href} target="_blank" rel="noreferrer" className={`social social--${s.icon} ${img ? 'social--img' : ''}`} aria-label={s.label}>
                  {img ? <img src={img} alt="" draggable={false} /> : <SocialGlyph icon={s.icon} />}
                </a>
              </li>
            )
          })}
        </ul>

        {original && <img className="og og__front" src={userAsset('grass-front')} alt="" />}

        {/* the two floating islands the reference adds below 1000px */}
        {userAsset('island-a') && (
          <div className="islands">
            <img className="islands__a" src={userAsset('island-a')} alt="" />
            <img className="islands__cloud" src={userAsset('footer-cloud')} alt="" />
            <img className="islands__b" src={userAsset('island-b')} alt="" />
          </div>
        )}

        {original && Butterflies ? (
          <Suspense fallback={null}>
            <Butterflies />
          </Suspense>
        ) : (
          plainFlyers.map((b, i) => (
            <span key={i} className="butterfly" style={{ left: `calc(50% - 720px + ${b.left}px)`, top: b.top, '--c': b.c, animationDelay: b.d } as CSSProperties} aria-hidden="true">
              <i />
              <i />
            </span>
          ))
        )}

        <Parallax rate={0.04} anchor="page" className="finale__cloud">
          {userAsset('footer-cloud') ? <img className="cloud-img" src={userAsset('footer-cloud')} alt="" /> : <CloudImage kind="floor" />}
        </Parallax>

        <div className="finale__fade">
          <p className="finale__note">
            {site.name} © {new Date().getFullYear()}. {site.footerNote}
          </p>
        </div>
      </div>

      <p className="status">
        <span className="status__dot" aria-hidden="true">
          <i className="status__ping" />
          <i className="status__core" />
        </span>
        <span className="status__text">Open to new opportunities</span>
      </p>

      <div className="finale__contact">
        <h2 id="contact-heading" className="contact__heading">
          <span>Let’s build something meaningful together</span>
        </h2>
        <a className="send" href={`mailto:${site.email}`}>
          <span className="send__btn">
            {stars && <img className="send__stars" src={stars} alt="" draggable={false} />}
            <span className="send__glow">
              <HillGlow />
            </span>
            <span className="send__label">
              <span>Send a Mail</span>
            </span>
          </span>
        </a>
        <p className="contact__email">
          <span>{site.email}</span>
        </p>
        <a className="arrow-link contact__resume" href={site.resumeUrl} target="_blank" rel="noreferrer">
          View my Resume <ArrowUpRight />
        </a>
      </div>
    </footer>
  )
}
