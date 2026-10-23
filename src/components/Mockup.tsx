import type { CSSProperties, ReactNode } from 'react'
import './mockup.css'

export type MockupKind = 'hand-phone' | 'screens' | 'table' | 'grocery' | 'laptop-warm' | 'laptop-cool' | 'flow' | 'phones' | 'org'

/** Original CSS-drawn UI mockups used as project thumbnails and case-study figures. */
export default function Mockup({ kind }: { kind: MockupKind }) {
  return (
    <div className={`mock mock--${kind}`} aria-hidden="true">
      {renderers[kind]()}
    </div>
  )
}

const Lines = ({ n, w = [90, 70, 80] }: { n: number; w?: number[] }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <span key={i} className="mock-line" style={{ width: `${w[i % w.length]}%` }} />
    ))}
  </>
)

const Phone = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mock-phone ${className}`}>
    <div className="mock-phone__screen">{children}</div>
  </div>
)

const AppScreen = ({ title }: { title: string }) => (
  <>
    <span className="mock-title">{title}</span>
    <div className="mock-card">
      <Lines n={2} />
      <div className="mock-stats">
        <b>133</b>
        <b>18</b>
      </div>
    </div>
    <div className="mock-card">
      <Lines n={3} />
    </div>
    <span className="mock-pill" />
  </>
)

const renderers: Record<MockupKind, () => ReactNode> = {
  'hand-phone': () => (
    <>
      <div className="mock-cloud" />
      <div className="mock-hand" />
      <Phone className="tilt">
        <span className="mock-title">We’re bringing</span>
        <span className="mock-big">value to products you use after work.</span>
        <Lines n={3} />
        <span className="mock-btn">Get started</span>
      </Phone>
    </>
  ),
  screens: () => (
    <div className="mock-grid">
      {['Partners', 'Today', 'Leads', 'Insights', 'Tasks', 'Profile'].map((t) => (
        <div key={t} className="mock-mini">
          <span className="mock-title">{t}</span>
          <Lines n={4} />
          <span className="mock-pill" />
        </div>
      ))}
    </div>
  ),
  table: () => (
    <div className="mock-sheet">
      <div className="mock-sheet__bar">
        <span>User uploads</span>
      </div>
      {Array.from({ length: 14 }, (_, i) => (
        <div key={i} className="mock-row">
          <span />
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  ),
  grocery: () => (
    <div className="mock-panel">
      <span className="mock-title">Plan your meals</span>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="mock-item">
          <span className="mock-thumb" />
          <Lines n={2} w={[70, 45]} />
        </div>
      ))}
    </div>
  ),
  'laptop-warm': () => (
    <div className="mock-laptop">
      <div className="mock-laptop__screen">
        <span className="mock-wheel" />
        <span className="mock-headline">Stories worth reading</span>
      </div>
    </div>
  ),
  'laptop-cool': () => (
    <div className="mock-laptop">
      <div className="mock-laptop__screen light">
        <div className="mock-kanban">
          {[3, 2, 4, 2].map((n, i) => (
            <div key={i}>
              {Array.from({ length: n }, (_, j) => (
                <span key={j} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  flow: () => (
    <div className="mock-flow">
      {['Product', 'Cart', 'Address', 'Pay'].map((t, i) => (
        <div key={t} className="mock-flow__step" style={{ '--i': i } as CSSProperties}>
          <span className="mock-flow__dot">{i + 1}</span>
          {t}
        </div>
      ))}
    </div>
  ),
  phones: () => (
    <div className="mock-phones">
      <Phone>
        <AppScreen title="Leaderboard" />
      </Phone>
      <Phone className="front">
        <span className="mock-title">Good morning!</span>
        <AppScreen title="My performance" />
      </Phone>
      <Phone>
        <AppScreen title="Partners" />
      </Phone>
    </div>
  ),
  org: () => (
    <div className="mock-org">
      <span className="node root">Head</span>
      <div className="mock-org__col">
        <span className="node">City lead</span>
        <span className="node">City lead</span>
        <span className="node">City lead</span>
      </div>
      <div className="mock-org__col">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="node am">
            Account mgr
          </span>
        ))}
      </div>
      <div className="mock-org__col">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="node partner">
            Partner
          </span>
        ))}
      </div>
    </div>
  ),
}
