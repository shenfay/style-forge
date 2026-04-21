import { useState, useEffect } from 'react'
import { StyleConfigurator } from './components/Configurator/StyleConfigurator'
import { MobilePreview } from './components/Preview/MobilePreview'
import { DesktopPreview } from './components/Preview/DesktopPreview'
import { SceneSelector } from './components/Configurator/SceneSelector'
import { TemplateSelector } from './components/Configurator/TemplateSelector'
import { defaultConfig, type StyleConfig } from './types/config'
import { useUrlConfig } from './hooks/useUrlConfig'
import { loadTemplates, findTemplate, type TemplateConfig } from './utils/templateLoader'
import { encodeConfig } from './utils/configEncoder'
import { generateTailwindConfig, generateCSSVariables } from './utils/tailwindGenerator'
import { generateAIPrompt } from './utils/promptGenerator'
import type { SceneType, DeviceType, PageType } from './types/template'

type ConfigSection = 'scene' | 'colors' | 'shape' | 'components' | 'title'

const menuItems: Array<{ id: ConfigSection; name: string; icon: string }> = [
  { id: 'scene', name: '场景与模板', icon: '🛒' },
  { id: 'colors', name: '色彩配置', icon: '🎨' },
  { id: 'shape', name: '形状与结构', icon: '◻' },
  { id: 'components', name: '组件风格', icon: '▦' },
  { id: 'title', name: '标题样式', icon: 'T' },
]

export default function App() {
  const [urlConfig] = useUrlConfig()
  const [config, setConfig] = useState<StyleConfig>(defaultConfig)
  const [showExport, setShowExport] = useState<string | null>(null)
  const [templates, setTemplates] = useState<TemplateConfig[]>([])
  const [currentTemplate, setCurrentTemplate] = useState<TemplateConfig | null>(null)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [activeSection, setActiveSection] = useState<ConfigSection>('scene')

  // 加载模板
  useEffect(() => {
    const load = async () => {
      const scene = urlConfig.scene || 'ecommerce'
      const loaded = await loadTemplates(scene)
      setTemplates(loaded)

      // 查找匹配的模板
      const device = urlConfig.device || 'desktop'
      const template = urlConfig.template || 'home'
      const found = findTemplate(scene, device, template as PageType)
      if (found) {
        setCurrentTemplate(found)
        // 使用模板默认配置
        if (urlConfig.config === undefined) {
          setConfig(found.defaultStyle)
        }
      }
    }
    load()
  }, [urlConfig])

  // 同步配置到URL
  useEffect(() => {
    if (urlConfig.config === undefined || JSON.stringify(urlConfig.config) !== JSON.stringify(config)) {
      const params = new URLSearchParams()
      if (urlConfig.scene) params.set('scene', urlConfig.scene)
      if (urlConfig.device) params.set('device', urlConfig.device)
      if (urlConfig.template) params.set('template', urlConfig.template)
      
      // 编码自定义配置
      params.set('config', encodeConfig(config))
      
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, '', newUrl)
    }
  }, [config])

  const handleSceneChange = (scene: SceneType) => {
    const params = new URLSearchParams()
    params.set('scene', scene)
    params.set('device', urlConfig.device || 'desktop')
    params.set('template', urlConfig.template || 'home')
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
    window.location.reload()
  }

  const handleDeviceChange = (device: DeviceType) => {
    const params = new URLSearchParams()
    if (urlConfig.scene) params.set('scene', urlConfig.scene)
    params.set('device', device)
    if (urlConfig.template) params.set('template', urlConfig.template)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
    window.location.reload()
  }

  const handleTemplateChange = (template: TemplateConfig) => {
    // 根据当前设备类型查找对应版本的模板
    const currentDevice = urlConfig.device || 'desktop'
    const matchedTemplate = templates.find(
      t => t.type === template.type && t.device === currentDevice
    ) || template
    
    setCurrentTemplate(matchedTemplate)
    setConfig(matchedTemplate.defaultStyle)
    const params = new URLSearchParams()
    if (urlConfig.scene) params.set('scene', urlConfig.scene)
    if (urlConfig.device) params.set('device', urlConfig.device)
    params.set('template', template.type)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  const handleExport = (type: 'tailwind' | 'css' | 'prompt') => {
    let content = ''
    let filename = ''
    let mimeType = 'text/plain'

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
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 顶栏 - 简洁全局操作 */}
      <header className="h-14 bg-white flex items-center justify-between px-6 shrink-0 border-b" style={{ borderColor: '#E8E6E1' }}>
        <div className="flex items-center gap-6">
          <h1 className="text-base font-normal" style={{ color: '#1A1A1A' }}>Style Forge</h1>
          <nav className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm font-normal transition-colors" style={{ color: '#4A4A4A' }}>
              项目
            </button>
            <button className="px-3 py-1.5 text-sm font-normal transition-colors" style={{ color: '#4A4A4A' }}>
              编辑
            </button>
            <button className="px-3 py-1.5 text-sm font-normal transition-colors" style={{ color: '#4A4A4A' }}>
              视图
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm transition-colors" style={{ color: '#4A4A4A' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button className="px-4 py-2 text-sm font-normal rounded-lg transition-colors text-white" style={{ backgroundColor: '#1A1A1A' }}>
            导出
          </button>
          <div className="w-px h-6" style={{ backgroundColor: '#E8E6E1' }} />
          <button className="p-2 transition-colors" style={{ color: '#4A4A4A' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* 主体区域 */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* 左侧面板切换按钮 - 固定在边框位置 */}
        {showLeftPanel && (
          <button
            onClick={() => setShowLeftPanel(!showLeftPanel)}
            className="fixed top-1/2 -translate-y-1/2 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900 transition-all hover:shadow-xl"
            style={{ left: '256px', transform: 'translate(-50%, -50%)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}
        {!showLeftPanel && (
          <button
            onClick={() => setShowLeftPanel(!showLeftPanel)}
            className="fixed top-1/2 -translate-y-1/2 left-0 z-50 p-2 bg-white rounded-r-lg shadow-lg border border-l-0 border-gray-200 text-gray-600 hover:text-gray-900 transition-all hover:shadow-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* 左侧导航 - 配置菜单 */}
        <aside className={`${showLeftPanel ? 'w-56' : 'w-0'} overflow-y-auto shrink-0 transition-all duration-300`} style={{ backgroundColor: '#F5F3EF', borderRight: '1px solid #E8E6E1' }}>
          <div className="p-3 min-w-[224px]">
            {/* 配置菜单 */}
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center gap-2 transition-all text-left rounded-lg"
                  style={{
                    padding: '10px 12px',
                    backgroundColor: activeSection === item.id ? '#ECEAE5' : 'transparent',
                    color: activeSection === item.id ? '#1A1A1A' : '#4A4A4A',
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
        </aside>

        {/* 中部预览 - 核心画布 */}
        <main className="flex-1 overflow-auto" style={{ backgroundColor: '#FAFAFA' }}>

          {/* 预览工具栏 - 停靠在顶部 */}
          <div className="sticky top-0 z-10 px-6 py-3 border-b" style={{ backgroundColor: '#FAFAFA', borderColor: '#E8E6E1' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-normal" style={{ color: '#1A1A1A' }}>
                  {currentTemplate?.name || 'Metrics Grid'}
                </span>
                <span className="text-sm" style={{ color: '#999999' }}>
                  {urlConfig.device === 'desktop' ? '1440 × 900' : '375 × 812'}
                </span>
                <span className="text-sm" style={{ color: '#999999' }}>100%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeviceChange('mobile')}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: urlConfig.device === 'mobile' ? '#1A1A1A' : 'transparent',
                    color: urlConfig.device === 'mobile' ? '#FFFFFF' : '#6B6B6B'
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeviceChange('desktop')}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: urlConfig.device === 'desktop' ? '#1A1A1A' : 'transparent',
                    color: urlConfig.device === 'desktop' ? '#FFFFFF' : '#6B6B6B'
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 预览内容 */}
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-12">
            {urlConfig.device === 'desktop' ? (
              <div className="w-full max-w-5xl bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <DesktopPreview 
                  config={config} 
                  pageType={currentTemplate?.type || 'home'}
                />
              </div>
            ) : (
              <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-xl overflow-hidden border-8 border-gray-900">
                <MobilePreview 
                  config={config} 
                  pageType={currentTemplate?.type || 'result'}
                />
              </div>
            )}
          </div>
        </main>

        {/* 右侧操作面板 - 属性配置 */}
        <aside className="w-80 overflow-y-auto shrink-0 bg-white" style={{ borderLeft: '1px solid #E8E6E1' }}>
          <div className="p-4">
            {/* 场景与模板 */}
            {activeSection === 'scene' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-normal mb-3" style={{ color: '#999999' }}>场景</h3>
                  <SceneSelector
                    selectedScene={urlConfig.scene || 'ecommerce'}
                    selectedDevice={urlConfig.device || 'desktop'}
                    selectedTemplate={urlConfig.template || 'home'}
                    onSceneChange={handleSceneChange}
                    onDeviceChange={handleDeviceChange}
                    onTemplateChange={() => {}}
                  />
                </div>
                
                {templates.length > 0 && (
                  <div>
                    <h3 className="text-xs font-normal mb-3" style={{ color: '#999999' }}>模板</h3>
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
            {activeSection !== 'scene' && (
              <StyleConfigurator 
                config={config} 
                onChange={setConfig}
                activeSection={activeSection}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
