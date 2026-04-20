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

export default function App() {
  const [urlConfig] = useUrlConfig()
  const [config, setConfig] = useState<StyleConfig>(defaultConfig)
  const [showExport, setShowExport] = useState<string | null>(null)
  const [templates, setTemplates] = useState<TemplateConfig[]>([])
  const [currentTemplate, setCurrentTemplate] = useState<TemplateConfig | null>(null)
  const [showLeftPanel, setShowLeftPanel] = useState(true)

  // 加载模板
  useEffect(() => {
    const load = async () => {
      const scene = urlConfig.scene || 'universal'
      const loaded = await loadTemplates(scene)
      setTemplates(loaded)

      // 查找匹配的模板
      const device = urlConfig.device || 'mobile'
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
    params.set('device', urlConfig.device || 'mobile')
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
    setConfig(template.defaultStyle)
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
      <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold text-gray-900">Style Forge</h1>
          <nav className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              项目
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              编辑
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              视图
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
            导出
          </button>
          <div className="w-px h-6 bg-gray-200" />
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
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

        {/* 左侧导航 - 层级结构 */}
        <aside className={`${showLeftPanel ? 'w-64' : 'w-0'} bg-white border-r border-gray-100 overflow-y-auto shrink-0 transition-all duration-300`}>
          <div className="p-4 min-w-[256px]">
            {/* 场景选择 */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">场景</h3>
              <SceneSelector
                selectedScene={urlConfig.scene || 'universal'}
                selectedDevice={urlConfig.device || 'mobile'}
                selectedTemplate={urlConfig.template || 'home'}
                onSceneChange={handleSceneChange}
                onDeviceChange={handleDeviceChange}
                onTemplateChange={() => {}}
              />
            </div>
            
            {templates.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">模板</h3>
                <TemplateSelector
                  templates={templates}
                  selectedTemplate={currentTemplate?.type || null}
                  onTemplateChange={handleTemplateChange}
                />
              </div>
            )}
          </div>
        </aside>

        {/* 中部预览 - 核心画布 */}
        <main className="flex-1 bg-gray-50 overflow-auto">

          {/* 预览工具栏 - 停靠在顶部 */}
          <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900">
                  {currentTemplate?.name || 'Metrics Grid'}
                </span>
                <span className="text-sm text-gray-500">
                  {urlConfig.device === 'desktop' ? '1440 × 900' : '375 × 812'}
                </span>
                <span className="text-sm text-gray-500">100%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeviceChange('mobile')}
                  className={`p-2 rounded-md transition-colors ${
                    urlConfig.device === 'mobile'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeviceChange('desktop')}
                  className={`p-2 rounded-md transition-colors ${
                    urlConfig.device === 'desktop'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                  }`}
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
        <aside className="w-80 bg-white border-l border-gray-100 overflow-y-auto shrink-0">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">属性面板</h3>
            <StyleConfigurator config={config} onChange={setConfig} />
          </div>
        </aside>
      </div>
    </div>
  )
}
