import type { CSSProperties } from 'react'
import { books } from '../content'
import './cards.css'

/** The reference's "3D book" row: hover a book and it opens while its neighbours slide apart (see cards.css). */
export default function Books() {
  return (
    <>
      <svg className="paper-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="paper" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="8" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1" result="diffLight">
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>
      <ul className="books" aria-label="Books that shaped me">
        {books.map((b) => (
          <li key={b.title} className="book" style={{ '--spine': b.color, '--ink': b.ink } as CSSProperties}>
            <div className="book__stage">
              <div className="book__spine">
                <span className="book__paper" />
                <span className="book__title">{b.title}</span>
              </div>
              <div className="book__cover">
                <span className="book__paper book__paper--cover" />
                <span className="book__shine" />
                {b.cover ? <img className="book__img" src={b.cover} alt={`${b.title} cover`} loading="lazy" /> : <span className="book__blank" />}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
