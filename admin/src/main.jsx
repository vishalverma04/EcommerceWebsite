import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  { Toaster } from 'react-hot-toast';
import { ContextProvider } from './contexts/categoryContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <ContextProvider>
    <App />
  </ContextProvider>
  </AuthProvider>
  <Toaster/>
  </StrictMode>,
)
