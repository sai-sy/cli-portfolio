import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CwdProvider } from './context/CwdContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <CwdProvider>
    <App />
  </CwdProvider>
  </StrictMode>,
)
