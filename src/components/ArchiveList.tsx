import { Link } from 'react-router-dom'
import Mockup, { type MockupKind } from './Mockup'
import './cards.css'

export type ArchiveItem = { title: string; mockup: MockupKind; tags?: string[]; date?: string; to?: string }

/** Compact list of projects: thumbnail + title + tags or date. */
export default function ArchiveList({ items }: { items: ArchiveItem[] }) {
  return (
    <ul className="archive">
      {items.map((it) => {
        const inner = (
          <>
            <span className="archive__thumb">
              <Mockup kind={it.mockup} />
            </span>
            <span className="archive__meta">
              <span className="archive__title">{it.title}</span>
              {it.tags && (
                <span className="archive__tags">
                  {it.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </span>
              )}
              {it.date && <span className="archive__date">{it.date}</span>}
            </span>
          </>
        )
        return (
          <li key={it.title}>
            {it.to ? (
              <Link to={it.to} className="archive__row">
                {inner}
              </Link>
            ) : (
              <div className="archive__row">{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
