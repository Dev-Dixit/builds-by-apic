import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '@fontsource/montserrat/300'
import '@fontsource/montserrat/300-italic'
import '@fontsource/montserrat/400'
import '@fontsource/montserrat/400-italic'
import '@fontsource/montserrat/500'
import '@fontsource/montserrat/700'
import '@fontsource/inter/500'
import '@fontsource/inter/600'
import '@fontsource/inter/700'
import '@fontsource/inter/800'
import '@fontsource/caveat/400'
import '@fontsource/doto/700'
import '@fontsource/doto/800'
import './styles/fonts.css'
import './styles/global.css'

import { InteractiveProvider } from './hooks/interactive'
import { loadLicensedFonts } from './licensedFonts'

loadLicensedFonts()

// Local study mode (dev server only; ?original=0 turns it off). Dead code in production builds.
if (import.meta.env.DEV && new URLSearchParams(location.search).get('original') !== '0') {
  await (await import('./study/original')).enableOriginal()
}
// Imported after the study assets are registered: content.ts reads them at module load.
const { default: App } = await import('./App')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <InteractiveProvider>
        <App />
      </InteractiveProvider>
    </BrowserRouter>
  </StrictMode>,
)
