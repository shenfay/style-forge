/**
 * 占位图生成器主页面
 */

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SizePresets } from '../components/Placeholder/SizePresets'
import { ConfigPanel } from '../components/Placeholder/ConfigPanel'
import { PreviewArea } from '../components/Placeholder/PreviewArea'
import {
  defaultPlaceholderConfig,
  encodePlaceholderConfig,
  decodePlaceholderConfig,
  type PlaceholderConfig,
} from '../utils/placeholderConfig'
import {
  generatePlaceholderCanvas,
  canvasToBlob,
  generateSVG,
  downloadFile,
  copyImageToClipboard,
} from '../utils/placeholderGenerator'
import { useSEOMeta } from '../hooks/useSEOMeta'

export default function PlaceholderPage() {
  const { t: tp } = useTranslation('placeholder')
  const { t: tc } = useTranslation('common')
  const [searchParams, setSearchParams] = useSearchParams()
  const [config, setConfig] = useState<PlaceholderConfig>(defaultPlaceholderConfig)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const decoded = decodePlaceholderConfig(searchParams)
    if (Object.keys(decoded).length > 0) {
      setConfig({ ...defaultPlaceholderConfig, ...decoded })
    }
  }, [searchParams])

  useEffect(() => {
    const generateImage = () => {
      if (config.format === 'svg') {
        const svg = generateSVG(config)
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        setImageUrl(url)
      } else {
        const canvas = generatePlaceholderCanvas(config)
        canvasRef.current = canvas
        canvasToBlob(canvas, config.format).then((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            setImageUrl(url)
          }
        })
      }
    }
    generateImage()
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [config])

  useEffect(() => {
    const params = encodePlaceholderConfig(config)
    setSearchParams(new URLSearchParams(params), { replace: true })
  }, [config])

  useSEOMeta({
    title: `${tp('config.sizePresets.commonSizes')} - ${tc('nav.placeholderGenerator')} | Style Forge`,
    description: `${tc('nav.placeholderGenerator')} - Style Forge`,
    robots: 'index, follow',
    canonical: 'https://style.atmedia.fun/placeholder/workbench',
    og: {
      title: `${tc('nav.placeholderGenerator')} - Style Forge`,
      description: `${tc('nav.placeholderGenerator')} - Style Forge`,
      image: 'https://style.atmedia.fun/og-image.png',
      url: 'https://style.atmedia.fun/placeholder/workbench',
      type: 'website',
    },
  })

  const handleConfigChange = (partial: Partial<PlaceholderConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }))
  }

  const handleSizeSelect = (width: number, height: number) => {
    setConfig((prev) => ({ ...prev, width, height }))
  }

  const handleDownload = () => {
    if (config.format === 'svg') {
      const svg = generateSVG(config)
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      downloadFile(blob, `placeholder-${config.width}x${config.height}.svg`)
    } else {
      const canvas = generatePlaceholderCanvas(config)
      canvasToBlob(canvas, config.format).then((blob) => {
        if (blob) {
          downloadFile(blob, `placeholder-${config.width}x${config.height}.${config.format}`)
        }
      })
    }
    showNotificationMessage(tc('notification.downloadStarted'))
  }

  const handleCopyLink = async () => {
    const url = new URL(window.location.href)
    url.pathname = '/placeholder'
    await navigator.clipboard.writeText(url.toString())
    showNotificationMessage(tc('notification.linkCopied'))
  }

  const handleCopyImage = async () => {
    if (!canvasRef.current) {
      const canvas = generatePlaceholderCanvas(config)
      canvasRef.current = canvas
    }
    const success = await copyImageToClipboard(canvasRef.current!)
    if (success) {
      showNotificationMessage(tc('notification.imageCopied'))
    } else {
      showNotificationMessage(tc('notification.copyFailed'))
    }
  }

  const showNotificationMessage = (message: string) => {
    setShowNotification(message)
    setTimeout(() => setShowNotification(null), 2000)
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <aside className="w-60 overflow-y-auto shrink-0 flex flex-col" style={{ backgroundColor: '#FAFAFA', borderRight: '1px solid #E5E4E0' }}>
        <Link to="/" className="p-4 flex items-center gap-3" style={{ backgroundColor: '#FAFAFA' }}>
          <img src="/favicon.svg" alt="" className="w-8 h-8" />
          <h1 className="text-base font-medium" style={{ color: '#09090B' }}>Style Forge</h1>
        </Link>
        <div className="flex-1 min-h-0">
          <SizePresets
            currentWidth={config.width}
            currentHeight={config.height}
            onSizeSelect={handleSizeSelect}
          />
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-15 flex items-center justify-end px-6 shrink-0 border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E4E0' }}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (imageUrl) { window.open(imageUrl, '_blank') } }}
              className="px-3 py-1.5 text-sm font-medium rounded-[10px] cursor-pointer transition-colors"
              style={{ backgroundColor: '#F0F0F0', color: '#242424' }}
              disabled={!imageUrl}
            >
              {tc('actions.preview')}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-sm font-medium rounded-[10px] text-white cursor-pointer transition-colors"
              style={{ backgroundColor: '#373737' }}
            >
              {tc('actions.download')}
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <PreviewArea imageUrl={imageUrl} width={config.width} height={config.height} />
          <aside className="w-80 overflow-y-auto shrink-0 bg-white" style={{ borderLeft: '1px solid #E5E4E0' }}>
            <ConfigPanel
              config={config}
              onChange={handleConfigChange}
              onCopyLink={handleCopyLink}
              onCopyImage={handleCopyImage}
            />
          </aside>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg z-50">
          {showNotification}
        </div>
      )}
    </div>
  )
}
