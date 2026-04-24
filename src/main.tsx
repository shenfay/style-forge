import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import EditorPage from './pages/EditorPage.tsx'
import PreviewPage from './pages/PreviewPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/workbench" element={<EditorPage />} />
        <Route path="/workbench/*" element={<EditorPage />} />
        <Route path="/preview/:templateId" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
