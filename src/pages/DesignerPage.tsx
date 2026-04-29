import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StyleConfigurator, SceneSelector, TemplateSelector } from '../components/Designer'
import { MobilePreview } from '../components/Preview/MobilePreview'
import { DesktopPreview } from '../components/Preview/DesktopPreview'
import { defaultConfig, type StyleConfig } from '../types/config'
import { useUrlConfig } from '../hooks/useUrlConfig'
import { useDesignerState } from '../hooks/useDesignerState'
import { encodeConfig } from '../utils/configEncoder'
import { generateTailwindConfig, generateCSSVariables } from '../utils/tailwindGenerator'
import { generateAIPrompt } from '../utils/promptGenerator'

type ConfigSection = 'template' | 'colors' | 'shape' | 'spacing' | 'typography'

const menuItems: Array<{ id: ConfigSection; name: string; icon: string }> = [
  { id: 'template', name: '模板选择', icon: '📋' },
  { id: 'colors', name: '色彩系统', icon: '🎨' },
  { id: 'shape', name: '形状系统', icon: '◻' },
  { id: 'spacing', name: '间距系统', icon: '📏' },
  { id: 'typography', name: '文字排版', icon: '📝' },
]

export default function DesignerPage() {
  const [urlConfig] = useUrlConfig()
  
  // 使用 Designer 状态管理 Hook
  const {
    config,
    templates,
    currentTemplate,
    setConfig,
    handleSceneChange,
    handleDeviceChange,
    handleTemplateChange,
  } = useDesignerState()
  
  const [showExport, setShowExport] = useState<string | null>(null)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [activeSection, setActiveSection] = useState<ConfigSection>('template')

  const handleExport = (type: 'tailwind' | 'css' | 'prompt') => {
    let content = ''
    let filename = ''
    const mimeType = 'text/plain'

    switch (type) {
      case 'tailwind':
        content = generateTailwindConfig(config)
        filename = 'tailwind.config.js'
        break
      case 'css':
        content = generateCSSVariables(config)
        filename = 'style-forge.css'
        break
      case 'prompt':
        content = generateAIPrompt(config)
        filename = 'ai-prompt.md'
        break
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    setShowExport(type)
    setTimeout(() => setShowExport(null), 2000)
  }

  const copyPrompt = async () => {
    const sceneName = currentTemplate?.name || '设计配置'
    const prompt = generateAIPrompt(config, sceneName, currentTemplate || undefined)
    await navigator.clipboard.writeText(prompt)
    setShowExport('copied')
    setTimeout(() => setShowExport(null), 2000)
  }

  const copyPreviewLink = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setShowExport('link-copied')
    setTimeout(() => setShowExport(null), 2000)
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 左侧导航 - 到顶 */}
      <aside className={`${showLeftPanel ? 'w-60' : 'w-0'} overflow-y-auto shrink-0 transition-all duration-300 flex flex-col`} style={{ backgroundColor: '#FAFAFA', borderRight: '1px solid #E5E4E0' }}>
        {/* Logo - 图标 + 文字，点击回到首页 */}
        <Link to="/" className="p-4 flex items-center gap-3" style={{ backgroundColor: '#FAFAFA' }}>
          <img src="/favicon.svg" alt="" className="w-8 h-8" />
          <h1 className="text-base font-medium" style={{ color: '#09090B' }}>Style Forge</h1>
        </Link>
        
        <div className="p-4 min-w-[240px] flex-1">
          {/* 配置菜单 */}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="w-full flex items-center gap-2 transition-all text-left rounded-lg cursor-pointer"
                style={{
                  padding: '10px 12px',
                  backgroundColor: activeSection === item.id ? 'rgba(0,0,0,0.03)' : 'transparent',
                  color: activeSection === item.id ? '#09090B' : '#3F3F46',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="text-base">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-normal">{item.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* 设备切换 - 底部 */}
        <div className="p-4 border-t" style={{ borderColor: '#E5E4E0' }}>
          <div className="flex gap-2">
            <button
              onClick={() => handleDeviceChange('mobile')}
              className="flex-1 p-2 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              style={{
                backgroundColor: urlConfig.device === 'mobile' ? '#373737' : 'transparent',
                color: urlConfig.device === 'mobile' ? '#FBFBFB' : '#3F3F46'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">移动</span>
            </button>
            <button
              onClick={() => handleDeviceChange('desktop')}
              className="flex-1 p-2 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              style={{
                backgroundColor: urlConfig.device === 'desktop' ? '#373737' : 'transparent',
                color: urlConfig.device === 'desktop' ? '#FBFBFB' : '#3F3F46'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">桌面</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 右侧大布局容器 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶栏 - 简洁全局操作 */}
        <header className="h-15 flex items-center justify-end px-6 shrink-0 border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E4E0' }}>
          <div className="flex items-center gap-2">
            {/* 预览按钮 */}
            {currentTemplate && (
              <Link
                to={`/designer?scene=${urlConfig.scene || 'ecommerce'}&template=${currentTemplate.type}&device=${urlConfig.device || 'desktop'}&config=${encodeURIComponent(encodeConfig(config))}`}
                target="_blank"
                className="px-3 py-1.5 text-sm font-medium rounded-[10px] transition-colors"
                style={{ color: '#242424', backgroundColor: '#F0F0F0' }}
              >
                预览
              </Link>
            )}
            
            {/* 导出下拉 */}
            <div className="relative">
              <button 
                onClick={() => setShowExport(showExport === 'menu' ? null : 'menu')}
                className="px-3 py-1.5 text-sm font-medium rounded-[10px] transition-colors text-white" 
                style={{ backgroundColor: '#373737' }}
              >
                导出
              </button>
              {showExport === 'menu' && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50" style={{ borderColor: '#E5E4E0' }}>
                  <button onClick={() => handleExport('tailwind')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer">Tailwind 配置</button>
                  <button onClick={() => handleExport('css')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer">CSS 变量</button>
                  <button onClick={() => handleExport('prompt')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer">AI 提示词</button>
                  <div className="border-t my-2" style={{ borderColor: '#E5E4E0' }} />
                  <button onClick={copyPrompt} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer">复制提示词</button>
                  <button onClick={copyPreviewLink} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer">复制预览链接</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 主体区域 - 预览 + 配置面板 */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* 左侧面板切换按钮 - 跨在边框上 */}
          {showLeftPanel && (
            <button
              onClick={() => setShowLeftPanel(!showLeftPanel)}
              className="fixed top-1/2 -translate-y-1/2 z-50 p-2 bg-white rounded-lg shadow-lg text-gray-600 hover:text-gray-900 transition-all hover:shadow-xl"
              style={{ left: '224px', border: '1px solid #E5E4E0' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}
          {!showLeftPanel && (
            <button
              onClick={() => setShowLeftPanel(!showLeftPanel)}
              className="fixed top-1/2 -translate-y-1/2 z-50 p-2 bg-white rounded-lg shadow-lg text-gray-600 hover:text-gray-900 transition-all hover:shadow-xl"
              style={{ left: '-10px', border: '1px solid #E5E4E0' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* 中部预览 - 核心画布 */}
          <main className="flex-1 overflow-auto flex items-start justify-center" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="w-full flex items-start justify-center p-8">
              {urlConfig.device === 'desktop' ? (
                <div className="w-4/5 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
                  <DesktopPreview 
                    config={config} 
                    pageType={currentTemplate?.type || 'home'}
                    scene={urlConfig.scene || 'ecommerce'}
                  />
                </div>
              ) : (
                <div className="w-[375px] h-[812px] bg-gray-900 rounded-[40px] shadow-xl border-8 border-gray-900 shrink-0 overflow-hidden flex flex-col">
                  <MobilePreview 
                    config={config} 
                    pageType={currentTemplate?.type || 'result'}
                    scene={urlConfig.scene || 'ecommerce'}
                  />
                </div>
              )}
            </div>
          </main>

          {/* 右侧操作面板 - 属性配置 */}
          <aside className="w-80 overflow-y-auto shrink-0 bg-white" style={{ borderLeft: '1px solid #E5E4E0' }}>
            <div className="p-4">
              {/* 模板选择 */}
              {activeSection === 'template' && (
                <div className="space-y-6">
                  <div>
                    <div className="pb-4 mb-6" style={{ borderBottom: '1px solid #E5E4E0' }}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#373737' }}>
                          01
                        </div>
                        <div className="text-base font-medium" style={{ color: '#242424' }}>场景</div>
                      </div>
                    </div>
                    <SceneSelector
                      selectedScene={urlConfig.scene || 'ecommerce'}
                      selectedDevice={urlConfig.device || 'desktop'}
                      selectedTemplate={urlConfig.template || 'home'}
                      onSceneChange={handleSceneChange}
                      onDeviceChange={handleDeviceChange}
                      onTemplateChange={() => handleTemplateChange}
                    />
                  </div>
                  
                  {templates.length > 0 && (
                    <div>
                      <div className="pb-4 mb-6" style={{ borderBottom: '1px solid #E5E4E0' }}>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#373737' }}>
                            02
                          </div>
                          <div className="text-base font-medium" style={{ color: '#242424' }}>模板</div>
                        </div>
                      </div>
                      <TemplateSelector
                        templates={templates}
                        selectedTemplate={currentTemplate?.type || null}
                        onTemplateChange={handleTemplateChange}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 样式配置 */}
              {activeSection !== 'template' && (
                <StyleConfigurator 
                  config={config} 
                  onChange={setConfig}
                  activeSection={activeSection as 'colors' | 'shape' | 'spacing' | 'typography'}
                />
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
