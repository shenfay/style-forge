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

  // 加载模板
  useEffect(() => {
    const load = async () => {
      const scene = urlConfig.scene || 'food'
      const loaded = await loadTemplates(scene)
      setTemplates(loaded)

      // 查找匹配的模板
      const device = urlConfig.device || 'mobile'
      const template = urlConfig.template || 'result'
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
    params.set('template', urlConfig.template || 'result')
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
      {/* 顶栏 - 全局操作与项目状态 */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-base font-bold text-gray-900">Style Forge</h1>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">场景:</span>
            <span className="font-medium text-gray-900">{currentTemplate?.name || '未选择'}</span>
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">设备:</span>
            <span className="font-medium text-gray-900">{urlConfig.device === 'desktop' ? 'PC端' : '移动端'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={copyPreviewLink}
            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:border-gray-900 transition-colors"
          >
            {showExport === 'link-copied' ? '✓ 已复制' : '复制链接'}
          </button>
          <button
            onClick={copyPrompt}
            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:border-gray-900 transition-colors"
          >
            {showExport === 'copied' ? '✓ 已复制' : '复制提示词'}
          </button>
          <button
            onClick={() => handleExport('tailwind')}
            className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            {showExport === 'tailwind' ? '✓ 已下载' : '导出 Tailwind'}
          </button>
          <button
            onClick={() => handleExport('prompt')}
            className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
          >
            {showExport === 'prompt' ? '✓ 已下载' : '导出 AI提示词'}
          </button>
        </div>
      </header>

      {/* 主体区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧导航 - 场景与模板 */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto shrink-0">
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">场景选择</h3>
              <SceneSelector
                selectedScene={urlConfig.scene || 'food'}
                selectedDevice={urlConfig.device || 'mobile'}
                selectedTemplate={urlConfig.template || 'result'}
                onSceneChange={handleSceneChange}
                onDeviceChange={handleDeviceChange}
                onTemplateChange={() => {}}
              />
            </div>
            
            {templates.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">模板选择</h3>
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
        <main className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-8">
          {urlConfig.device === 'desktop' ? (
            <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <DesktopPreview config={config} />
            </div>
          ) : (
            <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-900">
              <MobilePreview 
                config={config} 
                pageType={currentTemplate?.type || 'result'}
              />
            </div>
          )}
        </main>

        {/* 右侧操作面板 - 8维配置 */}
        <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto shrink-0">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">样式配置</h3>
            <StyleConfigurator config={config} onChange={setConfig} />
          </div>
        </aside>
      </div>
    </div>
  )
}
