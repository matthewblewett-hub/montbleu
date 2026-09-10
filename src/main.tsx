import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)

// Signal to vite-plugin-prerender that the app has rendered
// (used during build-time pre-rendering only)
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.dispatchEvent(new Event('render-event'))
  })
}


