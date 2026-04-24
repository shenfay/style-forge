import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage.tsx'
import DesignerPage from './pages/DesignerPage.tsx'
import PreviewPage from './pages/PreviewPage.tsx'
import PlaceholderPage from './pages/PlaceholderPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workbench" element={<DesignerPage />} />
        <Route path="/workbench/*" element={<DesignerPage />} />
        <Route path="/preview/:templateId" element={<PreviewPage />} />
        <Route path="/placeholder" element={<PlaceholderPage />} />
        <Route path="/placeholder/:preset" element={<PlaceholderPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
