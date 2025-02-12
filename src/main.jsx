import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PropertyProvider } from './Context.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <PropertyProvider>
      <App />
    </PropertyProvider>
    </BrowserRouter>
  </StrictMode>,
)
