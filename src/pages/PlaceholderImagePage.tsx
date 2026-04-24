/**
 * 占位图图片输出页面
 * 路由：/placeholder?width=800&height=600&color=xxx
 * 用途：直接返回图片，可作为 img src 使用
 */

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { decodePlaceholderConfig, defaultPlaceholderConfig } from '../utils/placeholderConfig'
import { generatePlaceholderCanvas, generateSVG } from '../utils/placeholderGenerator'

export default function PlaceholderImagePage() {
  const [searchParams] = useSearchParams()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // 解码配置
    const config = {
      ...defaultPlaceholderConfig,
      ...decodePlaceholderConfig(searchParams),
    }

    // 生成图片
    if (config.format === 'svg') {
      // SVG 格式：直接输出
      const svg = generateSVG(config)
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      
      // 重定向到 blob URL
      window.location.href = url
    } else {
      // Canvas 格式：转换为图片
      const canvas = generatePlaceholderCanvas(config)
      canvasRef.current = canvas
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          // 重定向到 blob URL
          window.location.href = url
        }
      }, `image/${config.format}`)
    }
  }, [searchParams])

  // 显示加载状态
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">生成图片中...</p>
      </div>
    </div>
  )
}
