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
        {/* 首页 */}
        <Route path="/" element={<HomePage />} />
        
        {/* Designer - 编辑器 */}
        <Route path="/designer" element={<PreviewPage />} />
        <Route path="/designer/workbench" element={<DesignerPage />} />
        
        {/* Placeholder - 占位图生成器 */}
        <Route path="/placeholder" element={<PlaceholderPage />} />
        <Route path="/placeholder/workbench" element={<PlaceholderPage />} />
        
        {/* 旧的预览路由（保留兼容） */}
        <Route path="/preview/:templateId" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
