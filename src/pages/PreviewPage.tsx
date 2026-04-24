import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { MobilePreview } from '../components/Preview/MobilePreview'
import { DesktopPreview } from '../components/Preview/DesktopPreview'
import { defaultConfig, type StyleConfig } from '../types/config'
import { findTemplate, type TemplateConfig } from '../utils/templateLoader'
import type { PageType } from '../types/template'

export default function PreviewPage() {
  const { templateId } = useParams<{ templateId: string }>()
  const [searchParams] = useSearchParams()
  const [config] = useState<StyleConfig>(defaultConfig)
  const [template, setTemplate] = useState<TemplateConfig | null>(null)

  useEffect(() => {
    // 查找模板（尝试 mobile 和 desktop）
    const found = findTemplate('ecommerce', 'mobile', templateId as PageType) ||
                  findTemplate('ecommerce', 'desktop', templateId as PageType)
    if (found) {
      setTemplate(found)
    }
  }, [templateId])

  if (!template) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">模板未找到</h1>
          <Link 
            to="/workbench" 
            className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            返回编辑器
          </Link>
        </div>
      </div>
    )
  }

  const device = searchParams.get('device') || template.device || 'desktop'

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      {/* 预览内容 */}
      <div className="relative">
        {device === 'desktop' ? (
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden">
            <DesktopPreview 
              config={config} 
              pageType={template.type || 'home'}
            />
          </div>
        ) : (
          <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-800">
            <MobilePreview 
              config={config} 
              pageType={template.type || 'home'}
            />
          </div>
        )}
      </div>

      {/* 浮动退出按钮 */}
      <Link
        to={`/workbench?template=${templateId}&device=${device}`}
        className="fixed bottom-8 left-8 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
        title="返回编辑"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      {/* 设备切换 */}
      <div className="fixed top-8 right-8 flex gap-2">
        <Link
          to={`/preview/${templateId}?device=mobile`}
          className={`p-3 rounded-lg backdrop-blur-sm transition-all ${
            device === 'mobile' 
              ? 'bg-white text-gray-900' 
              : 'bg-white/50 text-white hover:bg-white/70'
          }`}
          title="移动端预览"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </Link>
        <Link
          to={`/preview/${templateId}?device=desktop`}
          className={`p-3 rounded-lg backdrop-blur-sm transition-all ${
            device === 'desktop' 
              ? 'bg-white text-gray-900' 
              : 'bg-white/50 text-white hover:bg-white/70'
          }`}
          title="桌面端预览"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
