import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProviderProvider } from './context/ProviderContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProviderProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ProviderProvider>
    </AuthProvider>
  </StrictMode>,
);