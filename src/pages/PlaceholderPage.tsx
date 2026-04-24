/**
 * 占位图生成器主页面
 */

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
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

export default function PlaceholderPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [config, setConfig] = useState<PlaceholderConfig>(defaultPlaceholderConfig)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // 从 URL 加载配置
  useEffect(() => {
    const decoded = decodePlaceholderConfig(searchParams)
    if (Object.keys(decoded).length > 0) {
      setConfig({ ...defaultPlaceholderConfig, ...decoded })
    }
  }, [searchParams])

  // 生成占位图
  useEffect(() => {
    const generateImage = () => {
      if (config.format === 'svg') {
        // SVG 格式
        const svg = generateSVG(config)
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        setImageUrl(url)
      } else {
        // Canvas 格式
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

    // 清理旧的 Blob URL
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [config])

  // 同步配置到 URL
  useEffect(() => {
    const params = encodePlaceholderConfig(config)
    setSearchParams(new URLSearchParams(params), { replace: true })
  }, [config])

  // SEO Meta
  useEffect(() => {
    document.title = '占位图生成器 - Style Forge | 免费图片占位符工具'
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      '免费在线占位图生成器，支持自定义尺寸、颜色、文字、圆角、边框，一键下载 PNG/JPG/WebP/SVG 格式。'
    )

    return () => {
      // 恢复默认标题
      document.title = 'Style Forge - 场景化 UI 设计配置器'
    }
  }, [])

  // 处理配置变更
  const handleConfigChange = (partial: Partial<PlaceholderConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }))
  }

  // 处理尺寸选择
  const handleSizeSelect = (width: number, height: number) => {
    setConfig((prev) => ({ ...prev, width, height }))
  }

  // 下载图片
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
    showNotificationMessage('下载已开始')
  }

  // 复制分享链接
  const handleCopyLink = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    showNotificationMessage('分享链接已复制到剪贴板')
  }

  // 复制图片到剪贴板
  const handleCopyImage = async () => {
    if (!canvasRef.current) {
      const canvas = generatePlaceholderCanvas(config)
      canvasRef.current = canvas
    }
    
    const success = await copyImageToClipboard(canvasRef.current!)
    if (success) {
      showNotificationMessage('图片已复制到剪贴板')
    } else {
      showNotificationMessage('复制失败，请尝试下载')
    }
  }

  // 显示通知
  const showNotificationMessage = (message: string) => {
    setShowNotification(message)
    setTimeout(() => setShowNotification(null), 2000)
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 左侧导航 */}
      <aside className="w-60 overflow-y-auto shrink-0 flex flex-col" style={{ backgroundColor: '#FAFAFA', borderRight: '1px solid #E5E4E0' }}>
        {/* Logo - 点击回到首页 */}
        <Link to="/" className="p-4 flex items-center gap-3" style={{ backgroundColor: '#FAFAFA' }}>
          <img src="/favicon.svg" alt="" className="w-8 h-8" />
          <h1 className="text-base font-medium" style={{ color: '#09090B' }}>Style Forge</h1>
        </Link>
        
        {/* 预设尺寸库 */}
        <div className="flex-1 min-h-0">
          <SizePresets
            currentWidth={config.width}
            currentHeight={config.height}
            onSizeSelect={handleSizeSelect}
          />
        </div>
      </aside>

      {/* 右侧大布局容器 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶栏 */}
        <header className="h-15 flex items-center justify-end px-6 shrink-0 border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E4E0' }}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (imageUrl) {
                  window.open(imageUrl, '_blank')
                }
              }}
              className="px-3 py-1.5 text-sm font-medium rounded-[10px] cursor-pointer transition-colors"
              style={{ backgroundColor: '#F0F0F0', color: '#242424' }}
              disabled={!imageUrl}
            >
              预览
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-sm font-medium rounded-[10px] text-white cursor-pointer transition-colors"
              style={{ backgroundColor: '#373737' }}
            >
              下载
            </button>
          </div>
        </header>

        {/* 主体区域 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 中部预览 */}
          <PreviewArea
            imageUrl={imageUrl}
            width={config.width}
            height={config.height}
          />

          {/* 右侧配置面板 */}
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

      {/* 通知提示 */}
      {showNotification && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg z-50">
          {showNotification}
        </div>
      )}
    </div>
  )
}
