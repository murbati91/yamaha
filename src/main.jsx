import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { fixProductionCSS } from './utils/css-fix'

// Force dark theme and fix production CSS issues
document.documentElement.classList.add('dark')
document.body.style.backgroundColor = '#0A0A0A'
document.body.style.color = '#FFFFFF'

// Apply production CSS fixes
fixProductionCSS()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)