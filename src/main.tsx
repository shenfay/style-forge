import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './i18n'
import './index.css'
import HomePage from './pages/HomePage.tsx'
import DesignerPage from './pages/DesignerPage.tsx'
import PreviewPage from './pages/PreviewPage.tsx'
import PlaceholderPage from './pages/PlaceholderPage.tsx'
import PlaceholderImagePage from './pages/PlaceholderImagePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

function LangSync() {
  const { i18n } = useTranslation()
  document.documentElement.lang = i18n.language
  return null
}

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LangSync />
      <Routes>
        {/* 首页 */}
        <Route path="/" element={<HomePage />} />
        
        {/* Designer - 编辑器 */}
        <Route path="/designer" element={<PreviewPage />} />
        <Route path="/designer/workbench" element={<DesignerPage />} />
        
        {/* Placeholder - 占位图生成器 */}
        <Route path="/placeholder/workbench" element={<PlaceholderPage />} />
        <Route path="/placeholder" element={<PlaceholderImagePage />} />
        
        {/* 旧的预览路由（保留兼容） */}
        <Route path="/preview/:templateId" element={<PreviewPage />} />
        
        {/* 404 catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
