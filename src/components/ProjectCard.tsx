import { Link } from 'react-router-dom'
import { Suspense, lazy, type CSSProperties } from 'react'
import type { Project } from '../content'
import Mockup from './Mockup'
import { userAsset } from '../userAssets'
import { useInView } from '../hooks/useInView'
import './cards.css'

// Local study mode only: the Lottie player is dead code (and not bundled) in production builds.
const LottieScreen = import.meta.env.DEV ? lazy(() => import('./LottieScreen')) : null

/** Renders `{word}` segments of an LCD title in the highlight colour. */
function LcdText({ text, highlight }: { text: string; highlight?: string }) {
  const parts = text.split(/(\{[^}]+\})/)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('{') ? (
          <span key={i} style={{ color: highlight }}>
            {p.slice(1, -1)}
          </span>
        ) : (
          p
        ),
      )}
    </>
  )
}

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const plain = project.lcd.replace(/[{}]/g, '')
  const orig = project.console
  const body = orig ? (
    <ConsoleOriginal project={project} />
  ) : (
    <>
      <span className="console__grille" />
      <span className="console__body" />
      <span className="console__screen">
        {project.screen ? <img className="console__img" src={project.screen} alt="" loading="lazy" /> : <Mockup kind={project.mockup} />}
      </span>
      <span className="console__lcd">
        <span className="console__logo" style={{ background: project.accent, color: project.accent === '#ffffff' ? '#111' : '#fff' }}>
          {project.logo}
        </span>
        <span className="console__lcd-text">
          <LcdText text={project.lcd} highlight={project.highlight} />
        </span>
      </span>
      <span className="console__pad">
        <span className="console__btn" />
        <span className="console__btn console__btn--b" />
      </span>
      <span className="console__dial" />
    </>
  )

  return (
    <div ref={ref} className={`console-wrap ${orig ? 'console-wrap--orig' : ''} reveal ${inView ? 'is-in' : ''}`} style={{ '--delay': `${index * 0.05}s` } as CSSProperties}>
      {project.external ? (
        <a className="console" href={project.external} target="_blank" rel="noreferrer" aria-label={plain}>
          {body}
        </a>
      ) : (
        <Link className="console" to={`/works/${project.slug}`} aria-label={plain}>
          {body}
        </Link>
      )}
    </div>
  )
}

/** The reference's own console renders (study mode): shell, LCD panel, Lottie screen and lit-button glow. */
function ConsoleOriginal({ project }: { project: Project }) {
  const c = project.console!
  const base = userAsset('console-base-white')
  const hoverBase = userAsset(`console-base-${c.hover}`)
  const glow = userAsset(`console-glow-${c.hover}`)
  return (
    <span className="co">
      <span className="co__stage">
        <span className="co__screen">{c.lottie && LottieScreen ? (
            <Suspense fallback={null}>
              <LottieScreen src={c.lottie} />
            </Suspense>
          ) : (
            <Mockup kind={project.mockup} />
          )}</span>
        <img className="co__led" src={c.led} alt="" loading="lazy" />
        <img className="co__base" src={base} alt="" loading="lazy" />
        {hoverBase && <img className="co__base co__hover" src={hoverBase} alt="" loading="lazy" />}
        {glow && <img className="co__base co__hover" src={glow} alt="" loading="lazy" />}
      </span>
    </span>
  )
}
