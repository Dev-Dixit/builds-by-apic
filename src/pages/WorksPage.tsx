import type { CSSProperties } from 'react'
import { archive, projects, worksPage } from '../content'
import { CloudBank, Stars } from '../components/Scenery'
import ProjectCard from '../components/ProjectCard'
import ArchiveList from '../components/ArchiveList'
import Contact from '../components/Contact'
import { useInView } from '../hooks/useInView'
import './works.css'

function Corkboard() {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={`cork reveal ${inView ? 'is-in' : ''}`}>
      <div className="cork__board">
        {worksPage.posters.map((p, i) => (
          <article key={p.title} className={`poster poster--${i}`} style={{ background: p.bg, color: p.ink, '--rot': `${p.rot}deg` } as CSSProperties}>
            {i % 3 === 1 && <span className="poster__tape" aria-hidden="true" />}
            <span className="poster__kicker">club · 2026</span>
            <h3 className="poster__title">{p.title}</h3>
            <span className="poster__sub">{p.sub}</span>
            <span className="poster__shape" aria-hidden="true" />
          </article>
        ))}
      </div>
    </div>
  )
}

export default function WorksPage() {
  return (
    <main className="page page--works">
      <section className="works-hero">
        <Stars count={110} seed={4} className="works-hero__stars" />
        <div className="works-hero__inner">
          <h1 className="display grad-white works-hero__title blur-in">{worksPage.heading}</h1>
          <p className="works-hero__body blur-in" style={{ '--delay': '0.2s' } as CSSProperties}>
            {worksPage.body}
          </p>
          <p className="works-hero__hint blur-in" style={{ '--delay': '0.4s' } as CSSProperties}>
            Scroll down to see my projects
          </p>
        </div>
        <CloudBank className="works-hero__clouds" puffs={28} seed={9} spread={0.6} />
      </section>

      <section className="works-section container">
        <div className="section-text">
          <h2 className="display h-section">
            <span className="line grad-ink">Stuff I’ve</span>
            <span className="line grad-ink">worked on</span>
          </h2>
          <p className="body-copy works-copy">
            I’ve worked on end-to-end product design for web and mobile applications, spanning user research, interaction design, prototyping, and UI
            execution. My projects cover consumer apps, productivity tools, and learning platforms.
          </p>
        </div>
        <div className="works-cards">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="works-section works-wall container">
        <div className="section-text">
          <h2 className="display h-section">
            {worksPage.wall.heading.map((h) => (
              <span key={h} className="line grad-ink">
                {h}
              </span>
            ))}
          </h2>
          <p className="body-copy works-copy">{worksPage.wall.body}</p>
        </div>
        <Corkboard />
      </section>

      <section className="works-archive container" aria-labelledby="archive-heading">
        <h2 id="archive-heading" className="display works-archive__title">
          From the Archives
        </h2>
        <ArchiveList items={archive} />
      </section>

      <Contact />
    </main>
  )
}
