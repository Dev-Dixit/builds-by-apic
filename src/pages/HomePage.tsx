import { Suspense, lazy, useEffect, useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { intro, journey, projects, site, statement, wisdom } from '../content'
import { useInteractive } from '../hooks/interactive'
import { useInView } from '../hooks/useInView'
import { smooth, useScrollProgress } from '../hooks/useScroll'
import { subscribeScroll } from '../hooks/scroll'
import { ArrowUpRight } from '../components/Icons'
import { Balloon, CloudImage, Galaxy } from '../components/Scenery'
import Parallax, { useParallax } from '../components/Parallax'
import MonitorScene from '../components/MonitorScene'
import { useOffscreenPause } from '../hooks/useOffscreenPause'
import Polaroid from '../components/Polaroid'
import ProjectCard from '../components/ProjectCard'
import Books from '../components/Books'
import Contact from '../components/Contact'
import { userAsset } from '../userAssets'
import './home.css'

/*
 * Decorative layers that move at their own scroll rate. Positions are the reference's document
 * coordinates at 1440px (page-anchored, like Framer's scroll-speed effect), rates are the measured
 * translateY / scrollY ratios. See REWORK_PLAN.md.
 */
/** The reference's own image when it is present (local study mode), otherwise the generated/SVG stand-in. */
function Pic({ k, className, fallback }: { k: string; className?: string; fallback: ReactNode }) {
  const src = userAsset(k)
  return src ? <img className={`cloud-img ${className ?? ''}`} src={src} alt="" draggable={false} decoding="async" /> : <>{fallback}</>
}

function Decor() {
  const books = useRef<HTMLDivElement>(null)
  const galaxy = useRef<HTMLDivElement>(null)
  const { interactive } = useInteractive()

  // The mirrored cloud fades 0 → 0.9 and slides 88px in x between scroll 5600 and 6400 (measured on the reference).
  useEffect(() => {
    const el = books.current
    if (!el || !interactive) return
    let start = 5600
    let layout = -1
    const unsub = subscribeScroll(({ y, layout: l }) => {
      if (l !== layout) {
        layout = l
        // 1490px below the top of the Wisdom block on the reference (5600 when that block starts at 4110)
        const w = document.querySelector('.wisdom')
        if (w) start = w.getBoundingClientRect().top + y + 1490
      }
      const t = smooth(start, start + 800, y)
      el.style.opacity = (t * 0.9).toFixed(3)
      el.style.translate = `${(-88 * (1 - t)).toFixed(1)}px 0`
    })
    return () => {
      unsub()
      el.style.opacity = ''
      el.style.translate = ''
    }
  }, [interactive])
  // The galaxy turns in 3D while it drifts down the page.
  useScrollProgress(galaxy, (p, el) => el.style.setProperty('--spin', p.toFixed(4)), 'through', interactive)

  return (
    <div className="decor" aria-hidden="true">
      <div className="decor__hero">
        <div className="decor__hero-glow">{userAsset('hero-glow') && <img className="cloud-img" src={userAsset('hero-glow')} alt="" />}</div>
        <Parallax rate={0.21} anchor="page" className="decor__hero-cloud decor__hero-cloud--l">
          <Pic k="hero-cloud" fallback={<CloudImage kind="bank-wide" eager />} />
        </Parallax>
        <Parallax rate={0.21} anchor="page" className="decor__hero-cloud decor__hero-cloud--r">
          <Pic k="hero-cloud" fallback={<CloudImage kind="puff" eager />} />
        </Parallax>
        <Parallax rate={-0.5} anchor="page" className="decor__mist">
          {userAsset('hero-ellipse') && (
            <>
              <img className="cloud-img decor__mist-ellipse" src={userAsset('hero-ellipse')} alt="" />
              <img className="cloud-img decor__mist-purple" src={userAsset('hero-mist')} alt="" />
            </>
          )}
        </Parallax>
      </div>
      <div className="decor__hero-glow decor__works-glow">{userAsset('hero-glow') && <img className="cloud-img" src={userAsset('hero-glow')} alt="" />}</div>
      <Parallax rate={0.41} anchor="page" className="decor__cloud2">
        <Pic k="cloud-2" fallback={<CloudImage kind="bank-wide" />} />
      </Parallax>
      <Parallax rate={0.3} anchor="page" className="decor__balloon">
        <Pic k="balloon" className="decor__balloon-img" fallback={<Balloon />} />
      </Parallax>
      <Parallax rate={0.5} anchor="page" park={0.48} className="decor__galaxy">
        <div ref={galaxy}>
          <Pic k="galaxy" className="decor__galaxy-img" fallback={<Galaxy />} />
        </div>
      </Parallax>
      <Parallax rate={0.31} anchor="page" className="decor__cloud3">
        <Pic k="cloud-3" className="decor__cloud3-img" fallback={<CloudImage kind="floor" />} />
      </Parallax>
      <Parallax rate={0.41} anchor="page" className="decor__cloud2b">
        <div ref={books} className="decor__cloud2b-inner">
          <Pic k="cloud-2" fallback={<CloudImage kind="bank-tall" />} />
        </div>
      </Parallax>
    </div>
  )
}

// Local study mode only: removed from production builds together with the study/ folder.
const SplineHero = import.meta.env.DEV ? lazy(() => import('../study/SplineHero')) : null

/** True when the viewport is at least `px` wide; the reference switches layouts at exactly 1000px. */
function useMinWidth(px: number) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(`(min-width: ${px}px)`)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(`(min-width: ${px}px)`).matches,
    () => true,
  )
}

function Hero() {
  const wide = useMinWidth(1000)
  const { interactive } = useInteractive()
  const original = import.meta.env.DEV && document.documentElement.dataset.original === '1'
  const words = [...site.marquee, ...site.marquee]
  const root = useRef<HTMLElement>(null)
  useOffscreenPause(root)
  return (
    <section ref={root} className="hero" aria-label="Introduction">
      <div className="hero__stars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={`hero__star hero__star--${i}`} />
        ))}
      </div>
      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {words.map((w, i) => (
            <span key={i} className="hero__marquee-item">
              {w}
              <i className="hero__marquee-dot" />
            </span>
          ))}
        </div>
      </div>
      <div className="hero__title">
        <h1 className="display">
          <span className="hero__hi grad-white blur-in">Hi, I’m</span>
          <span className="hero__name grad-white blur-in" style={{ '--delay': '0.1s' } as CSSProperties}>
            {site.name}
          </span>
        </h1>
        <p className="hero__sub blur-in" style={{ '--delay': '0.2s' } as CSSProperties}>
          <span>{site.tagline[0]}</span> <span>{site.tagline[1]}</span>
        </p>
      </div>
      {original && SplineHero && wide && interactive ? (
        // direct child of the hero: its box is 120vw × 110vh at (-10vw, 64px - 10vh), like the reference's embed
        <Suspense fallback={null}>
          <SplineHero />
        </Suspense>
      ) : original && userAsset('hero-static') ? (
        // below 1000px the reference shows a static render in a 100vw × 50vh box instead of the live scene
        // lite mode on wide screens: the same render, framed like the live scene (120vw x 100vh)
        <img className={`hero__static ${wide ? 'hero__static--wide' : ''}`} src={userAsset('hero-static')} alt="" />
      ) : (
        <div className="hero__scene blur-in" style={{ '--delay': '0.3s' } as CSSProperties}>
          <MonitorScene />
        </div>
      )}
    </section>
  )
}

function SectionText({ heading, children, tone = 'white', className = '' }: { heading: string[]; children?: ReactNode; tone?: 'white' | 'ink'; className?: string }) {
  return (
    <div className={`section-text ${className}`}>
      <h2 className="display h-section">
        {heading.map((h, i) => (
          <span key={i} className={`line grad-${tone}`}>
            {h}
          </span>
        ))}
      </h2>
      {children}
    </div>
  )
}

function Who() {
  const [ref, inView] = useInView<HTMLDivElement>('0px 0px -15% 0px')
  return (
    <section className="who container" aria-label="About me">
      <SectionText heading={[intro.heading]} className="who__text">
        <p className="body-copy">{intro.body}</p>
        <Link to="/about-me" className="arrow-link">
          Know more about me <ArrowUpRight />
        </Link>
      </SectionText>
      <div ref={ref} className={`who__collage ${inView ? 'is-in' : ''}`}>
        {intro.photos.map((p, i) => (
          <Polaroid
            key={p.caption}
            caption={p.caption}
            art={p.art}
            src={p.src}
            rot={p.rot}
            className={`who__photo who__photo--${i}`}
            style={{ '--delay': `${i * 0.12}s` } as CSSProperties}
          />
        ))}
      </div>
    </section>
  )
}

function Chip({ i }: { i: number }) {
  const c = statement.chips[i]
  // the reference draws the two wordmarks as images (study mode supplies them)
  if ('img' in c && c.img) return <img className="chip__img" src={c.img} alt={c.label} style={{ height: c.h }} />
  if (c.style === 'script')
    return (
      <span className="chip chip--script">
        {c.label} {'sub' in c && <small>{c.sub}</small>}
      </span>
    )
  if (c.style === 'badge')
    return (
      <span className="chip chip--badge">
        <b aria-hidden="true">✦</b>
        {c.label}
      </span>
    )
  return <span className="chip chip--plain">{c.label}</span>
}

function Statement() {
  const [ref, inView] = useInView<HTMLHeadingElement>('0px 0px -20% 0px')
  const tokens = statement.text.split(' ')
  // The headline drifts up at -0.1 × scrollY on the reference (-150px at 1500, -210px at 2100).
  const drift = useRef<HTMLDivElement>(null)
  useParallax(drift, -0.1, 'page', 810, 0.62)

  return (
    <section className="statement" aria-label="Experience in brief">
      <div ref={drift}>
        <h2 ref={ref} className={`statement__text display ${inView ? 'is-in' : ''}`}>
          {tokens.map((t, i) => {
            const chip = t.match(/^\{chip:(\d)\}$/)
            // desktop line breaks follow the reference; hidden on mobile where the column is narrow
            if (t === '{br}') return <br key={i} className="statement__br" />
            return (
              <span key={i} className="word" style={{ '--i': i } as CSSProperties}>
                {chip ? <Chip i={Number(chip[1])} /> : t}{' '}
              </span>
            )
          })}
        </h2>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="work container" aria-label="Selected work">
      <SectionText heading={['Stuff I’ve', 'worked on']}>
        <p className="body-copy">
          I’ve worked on end-to-end product design for web and mobile applications, spanning user research, interaction design, prototyping, and UI
          execution. My projects cover consumer apps, productivity tools, and learning platforms.
        </p>
        <Link to="/works" className="arrow-link">
          View more projects <ArrowUpRight />
        </Link>
      </SectionText>
      <div className="work__cards">
        {projects.slice(0, 3).map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}

function Wisdom() {
  return (
    <section className="wisdom container" aria-label="Books">
      <SectionText heading={wisdom.heading}>
        <p className="body-copy wisdom__quote">
          {wisdom.quote} <span>– {wisdom.author}</span>
        </p>
      </SectionText>
      <div className="wisdom__books">
        <Books />
      </div>
    </section>
  )
}

function Journey() {
  const ref = useRef<HTMLElement>(null)
  const { interactive } = useInteractive()
  useScrollProgress(ref, (p, el) => el.style.setProperty('--progress', p.toFixed(4)), 'pin', interactive)

  return (
    <section ref={ref} className="journey container" aria-label="Experience">
      <div className="journey__head">
        <SectionText heading={['Journey', 'so far']} tone="ink" />
      </div>
      <div className="journey__line" aria-hidden="true">
        <span className="journey__fill" />
      </div>
      <ol className="journey__list">
        {journey.map((j) => (
          <li key={j.org} className="journey__item">
            <div className="journey__sticky">
              <span className="journey__dot" aria-hidden="true" />
              <p className="journey__dates">{j.dates}</p>
              <div className="journey__row">
                <span className="journey__logo" style={{ background: j.tile, color: j.ink }} aria-hidden="true">
                  {j.logoSrc ? <img src={j.logoSrc} alt="" loading="lazy" /> : j.logo}
                </span>
                <div>
                  <p className="journey__role" aria-label={j.role}>
                    {j.role.split(' ').map((w, i) => (
                      <span key={i} aria-hidden="true">
                        {i > 0 && ' '}
                        {w[0]}
                        <span className="journey__sc">{w.slice(1)}</span>
                      </span>
                    ))}
                  </p>
                  <h3 className="journey__org display grad-dark">{j.org}</h3>
                  <p className="journey__text">{j.text}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="page page--home">
      <Decor />
      <Hero />
      <Who />
      <Statement />
      <Work />
      <Wisdom />
      <Journey />
      <Contact />
    </main>
  )
}
