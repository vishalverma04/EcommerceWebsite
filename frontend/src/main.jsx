import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { CategoryProvider } from './contexts/categoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
  <CategoryProvider>
  <ProductProvider>
  <AuthProvider>
    <App />
    </AuthProvider>
    </ProductProvider>
    </CategoryProvider>
    <Toaster />
    </Router>
  </StrictMode>,
)
