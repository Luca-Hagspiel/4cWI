import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Aufgabe 4 - Lichtschalter/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
