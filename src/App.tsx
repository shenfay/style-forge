import { useState, useEffect } from 'react'
import { StyleConfigurator } from './components/Configurator/StyleConfigurator'
import { ScanResultPreview } from './components/Preview/ScanResultPreview'
import { defaultConfig, type StyleConfig } from './types/config'
import { encodeConfig, decodeConfig } from './utils/configEncoder'
import { generateTailwindConfig, generateCSSVariables } from './utils/tailwindGenerator'
import { generateAIPrompt } from './utils/promptGenerator'

export default function App() {
  const [config, setConfig] = useState<StyleConfig>(defaultConfig)
  const [showExport, setShowExport] = useState<string | null>(null)

  // 从URL加载配置
  useEffect(() => {
    const params = window.location.search
    if (params) {
      const decoded = decodeConfig(params)
      if (decoded) {
        setConfig(decoded)
      }
    }
  }, [])

  // 同步配置到URL
  useEffect(() => {
    const encoded = encodeConfig(config)
    const newUrl = `${window.location.pathname}?${encoded}`
    window.history.replaceState({}, '', newUrl)
  }, [config])

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
    const prompt = generateAIPrompt(config)
    await navigator.clipboard.writeText(prompt)
    setShowExport('copied')
    setTimeout(() => setShowExport(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Style Forge</h1>
            <p className="text-sm text-gray-500">场景化设计配置器 - 实时预览,一键导出</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('tailwind')}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              {showExport === 'tailwind' ? '已下载!' : '导出 Tailwind'}
            </button>
            <button
              onClick={() => handleExport('prompt')}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showExport === 'prompt' ? '已下载!' : '导出 AI提示词'}
            </button>
            <button
              onClick={copyPrompt}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:border-gray-900 transition-colors"
            >
              {showExport === 'copied' ? '已复制!' : '复制提示词'}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* 左侧配置面板 */}
          <div className="col-span-5">
            <StyleConfigurator config={config} onChange={setConfig} />
          </div>

          {/* 右侧预览 */}
          <div className="col-span-7 flex justify-center sticky top-24">
            <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-900">
              <ScanResultPreview config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
