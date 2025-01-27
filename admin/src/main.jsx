import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  { Toaster } from 'react-hot-toast';
import { ContextProvider } from './contexts/categoryContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ContextProvider>
    <App />
    <Toaster/>
  </ContextProvider>
  </StrictMode>,
)
