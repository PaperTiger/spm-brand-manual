import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Urbanist is declared in index.css as an alias off the Fontsource variable
// files, which covers the 500 / 550 / 600 weights the stylesheet calls for.
// Old Standard TT ships static files: the brand uses the italic only.
import '@fontsource/old-standard-tt/400-italic.css'
import './index.css'
import App from './App.tsx'

const markerProjectId = import.meta.env.VITE_MARKER_PROJECT_ID
if (markerProjectId) {
  import('@marker.io/browser').then(({ default: markerSDK }) => {
    markerSDK.loadWidget({ project: markerProjectId })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
