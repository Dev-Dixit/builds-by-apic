import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

// v2: the default flipped to OFF, so choices saved by the old ON-by-default build are ignored
const KEY = 'interactive-mode-v2'

type Ctx = { interactive: boolean; toggle: () => void }
const InteractiveContext = createContext<Ctx>({ interactive: false, toggle: () => {} })

function readStored(): boolean {
  try {
    const v = localStorage.getItem(KEY)
    if (v !== null) return v === 'on'
  } catch {
    /* storage unavailable */
  }
  return false
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
