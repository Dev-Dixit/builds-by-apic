import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const KEY = 'interactive-mode'

type Ctx = { interactive: boolean; toggle: () => void }
const InteractiveContext = createContext<Ctx>({ interactive: true, toggle: () => {} })

function readStored(): boolean {
  try {
    const v = localStorage.getItem(KEY)
    if (v !== null) return v === 'on'
  } catch {
    /* storage unavailable */
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function InteractiveProvider({ children }: { children: ReactNode }) {
  const [interactive, setInteractive] = useState(readStored)

  useEffect(() => {
    document.documentElement.dataset.mode = interactive ? 'interactive' : 'lite'
    try {
      localStorage.setItem(KEY, interactive ? 'on' : 'off')
    } catch {
      /* storage unavailable */
    }
  }, [interactive])

  const toggle = useCallback(() => setInteractive((v) => !v), [])
  return <InteractiveContext.Provider value={{ interactive, toggle }}>{children}</InteractiveContext.Provider>
}

export const useInteractive = () => useContext(InteractiveContext)
