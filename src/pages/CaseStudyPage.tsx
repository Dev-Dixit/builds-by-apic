import { useEffect, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { archive, projects } from '../content'
import { ChevronLeft } from '../components/Icons'
import { CloudBank, Stars } from '../components/Scenery'
import Mockup from '../components/Mockup'
import ArchiveList from '../components/ArchiveList'
import Contact from '../components/Contact'
import { useInView } from '../hooks/useInView'
import './case.css'

function Figure({ kind }: { kind: Parameters<typeof Mockup>[0]['kind'] }) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <figure ref={ref} className={`case-figure reveal ${inView ? 'is-in' : ''}`}>
      <Mockup kind={kind} />
    </figure>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    if (project) document.title = `${project.title} — Case study`
  }, [project])

  if (!project) return <Navigate to="/works" replace />

  const others = [
    ...projects.filter((p) => p.slug !== project.slug).map((p) => ({ title: p.title, mockup: p.mockup, date: p.date, to: `/works/${p.slug}` })),
    ...archive.map((a) => ({ title: a.title, mockup: a.mockup, date: 'Archive' })),
  ]

  return (
    <main className="page page--case light-bg">
      <div className="case-sky" aria-hidden="true">
        <Stars count={40} seed={31} />
        <CloudBank className="case-sky__clouds" puffs={16} seed={33} spread={0.6} />
      </div>

      <header className="case-head">
        <Link to="/works" className="back-btn">
          <ChevronLeft /> Back
        </Link>
        <h1 className="display case-head__title blur-in">{project.title}</h1>
        <p className="case-head__summary blur-in" style={{ '--delay': '0.2s' } as CSSProperties}>
          {project.summary}
        </p>
      </header>

      <div className="case-hero blur-in" style={{ '--delay': '0.35s' } as CSSProperties}>
        <Mockup kind="phones" />
        <span className="case-hero__badge">
          <b>{project.logo}</b>
          {project.client}
        </span>
      </div>

      <div className="case-body">
        <aside className="case-meta">
          <dl>
            <dt>Client</dt>
            <dd>{project.client}</dd>
            <dt>Work</dt>
            <dd>{project.work}</dd>
            <dt>Time period</dt>
            <dd>{project.period}</dd>
          </dl>
          <a className="btn-dark" href="#documentation">
            Documentation
          </a>
        </aside>

        <article className="case-article">
          {project.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="display">{s.heading}</h2>
              {s.body.map((b, i) => (
                <p key={i}>{b}</p>
              ))}
              {s.figure && <Figure kind={s.figure} />}
            </section>
          ))}
        </article>
      </div>

      <section className="case-others" aria-labelledby="others-heading">
        <h2 id="others-heading" className="display grad-ink case-others__title">
          Other Works
        </h2>
        <ArchiveList items={others} />
      </section>

      <Contact />
    </main>
  )
}
