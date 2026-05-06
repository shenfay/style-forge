import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleConfigurator, SceneSelector, TemplateSelector } from './components/Designer'
import { MobilePreview } from './components/Preview/MobilePreview'
import { DesktopPreview } from './components/Preview/DesktopPreview'
import { defaultConfig, type StyleConfig } from './types/config'
import { useUrlConfig } from './hooks/useUrlConfig'
import { loadTemplates, findTemplate, type TemplateConfig } from './utils/templateLoader'
import { encodeConfig } from './utils/configEncoder'
import { generateTailwindConfig, generateCSSVariables } from './utils/tailwindGenerator'
import { generateAIPrompt } from './utils/promptGenerator'
import { generateSkillDoc } from './utils/skillGenerator'
import { LanguageSwitcher } from './i18n/LanguageSwitcher'
import type { SceneType, DeviceType, PageType } from './types/template'

type ConfigSection = 'template' | 'colors' | 'shape' | 'spacing' | 'typography'

function templateStyleToStyleConfig(templateStyle: any): StyleConfig {
  return { ...defaultConfig, ...templateStyle }
}

export default function App() {
  const { t } = useTranslation('designer')
  const { t: tc } = useTranslation('common')
  const [urlConfig] = useUrlConfig()
  const [config, setConfig] = useState<StyleConfig>(defaultConfig)
  const [showExport, setShowExport] = useState<string | null>(null)
  const [templates, setTemplates] = useState<TemplateConfig[]>([])
  const [currentTemplate, setCurrentTemplate] = useState<TemplateConfig | null>(null)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [activeSection, setActiveSection] = useState<ConfigSection>('template')

  const menuItems: Array<{ id: ConfigSection; name: string; icon: string }> = [
    { id: 'template', name: t('menu.templateSelect'), icon: '📋' },
    { id: 'colors', name: t('menu.colorSystem'), icon: '🎨' },
    { id: 'shape', name: t('menu.shapeSystem'), icon: '◻' },
    { id: 'spacing', name: t('menu.spacingSystem'), icon: '📏' },
    { id: 'typography', name: t('menu.typography'), icon: '📝' },
  ]

  const currentScene = urlConfig.scene || 'ecommerce'

  useEffect(() => {
    const load = async () => {
      const scene = urlConfig.scene || 'ecommerce'
      const loaded = await loadTemplates(scene)
      setTemplates(loaded)
      const device = urlConfig.device || 'desktop'
      const template = urlConfig.template || 'home'
      const found = findTemplate(scene, device, template as PageType)
      if (found) {
        setCurrentTemplate(found)
        if (urlConfig.config === undefined) {
          setConfig(templateStyleToStyleConfig(found.defaultStyle))
        }
      }
    }
    load()
  }, [urlConfig])

  useEffect(() => {
    if (urlConfig.config === undefined || JSON.stringify(urlConfig.config) !== JSON.stringify(config)) {
      const params = new URLSearchParams()
      if (urlConfig.scene) params.set('scene', urlConfig.scene)
      if (urlConfig.device) params.set('device', urlConfig.device)
      if (urlConfig.template) params.set('template', urlConfig.template)
      params.set('config', encodeConfig(config))
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
    }
  }, [config])

  const handleSceneChange = (scene: SceneType) => {
    const params = new URLSearchParams()
    params.set('scene', scene)
    params.set('device', urlConfig.device || 'desktop')
    params.set('template', urlConfig.template || 'home')
    params.set('config', encodeConfig(config))
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
    window.location.reload()
  }

  const handleDeviceChange = (device: DeviceType) => {
    const params = new URLSearchParams()
    if (urlConfig.scene) params.set('scene', urlConfig.scene)
    params.set('device', device)
    if (urlConfig.template) params.set('template', urlConfig.template)
    params.set('config', encodeConfig(config))
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
    window.location.reload()
  }

  const handleTemplateChange = (template: TemplateConfig) => {
    const currentDevice = urlConfig.device || 'desktop'
    const matchedTemplate = templates.find(
      t => t.type === template.type && t.device === currentDevice
    ) || template
    setCurrentTemplate(matchedTemplate)
    const params = new URLSearchParams()
    if (urlConfig.scene) params.set('scene', urlConfig.scene)
    if (urlConfig.device) params.set('device', urlConfig.device)
    params.set('template', template.type)
    params.set('config', encodeConfig(config))
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  const handleExport = (type: 'tailwind' | 'css' | 'prompt' | 'skill') => {
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
        content = generateAIPrompt(config, currentTemplate?.name || 'Style Config', currentTemplate || undefined)
        filename = 'ai-prompt.md'
        break
      case 'skill':
        content = generateSkillDoc(config, urlConfig.scene || 'ecommerce', urlConfig.device || 'mobile', currentTemplate || undefined)
        filename = 'design-spec.md'
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
    const prompt = generateAIPrompt(config, currentTemplate?.name || 'Style Config', currentTemplate || undefined)
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
      <header className="h-14 bg-white flex items-center justify-between px-6 shrink-0 border-b" style={{ borderColor: '#E8E6E1' }}>
        <div className="flex items-center gap-6">
          <h1 className="text-base font-normal" style={{ color: '#1A1A1A' }}>{tc('nav.styleForge')}</h1>
          <nav className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm font-normal transition-colors" style={{ color: '#4A4A4A' }}>
              {t('topBar.project')}
            </button>
            <button className="px-3 py-1.5 text-sm font-normal transition-colors" style={{ color: '#4A4A4A' }}>
              {t('topBar.edit')}
            </button>
            <button className="px-3 py-1.5 text-sm font-normal transition-colors" style={{ color: '#4A4A4A' }}>
              {t('topBar.view')}
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/placeholder/workbench"
            className="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
            style={{ color: '#242424', backgroundColor: '#F0F0F0' }}
          >
            {t('topBar.placeholderGenerator')}
          </a>
          <button className="px-4 py-2 text-sm font-normal rounded-lg transition-colors text-white" style={{ backgroundColor: '#1A1A1A' }}>
            {tc('actions.export')}
          </button>
          <div className="border-l h-5" style={{ borderColor: '#E5E4E0' }} />
          <LanguageSwitcher />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
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

        <aside className={`${showLeftPanel ? 'w-56' : 'w-0'} overflow-y-auto shrink-0 transition-all duration-300`} style={{ backgroundColor: '#F5F3EF', borderRight: '1px solid #E8E6E1' }}>
          <div className="p-3 min-w-[224px]">
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

        <main className="flex-1 overflow-auto" style={{ backgroundColor: '#FAFAFA' }}>
          <div className="sticky top-0 z-10 px-6 py-3 border-b" style={{ backgroundColor: '#FAFAFA', borderColor: '#E8E6E1' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-normal" style={{ color: '#1A1A1A' }}>
                  {currentTemplate?.name || 'Metrics Grid'}
                </span>
                <span className="text-sm" style={{ color: '#999999' }}>
                  {urlConfig.device === 'desktop' ? t('previewToolbar.dimensions') : t('previewToolbar.mobileDimensions')}
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

          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-12">
            {urlConfig.device === 'desktop' ? (
              <div className="w-full max-w-5xl bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <DesktopPreview config={config} pageType={currentTemplate?.type || 'home'} scene={currentScene} />
              </div>
            ) : (
              <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-xl overflow-hidden border-8 border-gray-900 relative flex flex-col">
                <MobilePreview config={config} pageType={currentTemplate?.type || 'result'} scene={currentScene} />
              </div>
            )}
          </div>
        </main>

        <aside className="w-80 overflow-y-auto shrink-0 bg-white" style={{ borderLeft: '1px solid #E8E6E1' }}>
          <div className="p-4">
            {activeSection === 'template' && (
              <div className="space-y-6">
                <div>
                  <div className="pb-4 mb-6" style={{ borderBottom: '1px solid #E8E6E1' }}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#1A1A1A' }}>01</div>
                      <div className="text-base font-medium" style={{ color: '#1A1A1A' }}>{t('templateSection.scene')}</div>
                    </div>
                  </div>
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
                    <div className="pb-4 mb-6" style={{ borderBottom: '1px solid #E8E6E1' }}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#1A1A1A' }}>02</div>
                        <div className="text-base font-medium" style={{ color: '#1A1A1A' }}>{t('templateSection.template')}</div>
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
            {activeSection !== 'template' && (
              <StyleConfigurator config={config} onChange={setConfig} activeSection={activeSection as 'colors' | 'shape' | 'spacing' | 'typography'} />
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
