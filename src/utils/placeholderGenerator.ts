/**
 * 占位图生成核心逻辑
 * 支持 Canvas 和 SVG 两种生成方式
 */

import type { PlaceholderConfig } from './placeholderConfig'
import { processTextTemplate } from './placeholderConfig'

/**
 * 绘制圆角矩形路径
 */
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  // 限制圆角不超过宽高的一半
  const r = Math.min(radius, width / 2, height / 2)
  
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + width - r, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + r)
  ctx.lineTo(x + width, y + height - r)
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
  ctx.lineTo(x + r, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

/**
 * 生成占位图 Canvas
 */
export function generatePlaceholderCanvas(config: PlaceholderConfig): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = config.width
  canvas.height = config.height
  
  const ctx = canvas.getContext('2d')!
  
  // 处理文字模板
  const displayText = processTextTemplate(config.text, config.width, config.height)
  
  // 只有当背景色不是透明时才绘制背景
  if (config.bgColor !== 'transparent') {
    if (config.borderRadius > 0) {
      // 绘制圆角背景
      drawRoundRect(ctx, 0, 0, config.width, config.height, config.borderRadius)
      ctx.fillStyle = config.bgColor
      ctx.fill()
    } else {
      // 绘制矩形背景
      ctx.fillStyle = config.bgColor
      ctx.fillRect(0, 0, config.width, config.height)
    }
  }
  
  // 绘制边框
  if (config.borderWidth > 0) {
    if (config.borderRadius > 0) {
      drawRoundRect(ctx, 0, 0, config.width, config.height, config.borderRadius)
      ctx.strokeStyle = config.borderColor
      ctx.lineWidth = config.borderWidth
      ctx.stroke()
    } else {
      ctx.strokeStyle = config.borderColor
      ctx.lineWidth = config.borderWidth
      ctx.strokeRect(0, 0, config.width, config.height)
    }
  }
  
  // 绘制文字
  if (displayText) {
    ctx.fillStyle = config.textColor
    ctx.font = `${config.fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // 计算文字居中位置
    const x = config.width / 2
    const y = config.height / 2
    
    ctx.fillText(displayText, x, y)
  }
  
  return canvas
}

/**
 * 将 Canvas 转换为 Blob
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpg' | 'webp',
  quality: number = 0.95
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`
    canvas.toBlob(resolve, mimeType, quality)
  })
}

/**
 * 生成 SVG 字符串
 */
export function generateSVG(config: PlaceholderConfig): string {
  const displayText = processTextTemplate(config.text, config.width, config.height)
  
  const bgColorAttr = config.bgColor === 'transparent' ? 'none' : config.bgColor
  
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${config.width}" height="${config.height}" viewBox="0 0 ${config.width} ${config.height}">`
  
  // 背景
  if (config.borderRadius > 0) {
    svgContent += `\n  <rect width="${config.width}" height="${config.height}" fill="${bgColorAttr}" rx="${config.borderRadius}"`
    if (config.borderWidth > 0) {
      svgContent += ` stroke="${config.borderColor}" stroke-width="${config.borderWidth}"`
    }
    svgContent += `/>`
  } else {
    svgContent += `\n  <rect width="${config.width}" height="${config.height}" fill="${bgColorAttr}"`
    if (config.borderWidth > 0) {
      svgContent += ` stroke="${config.borderColor}" stroke-width="${config.borderWidth}"`
    }
    svgContent += `/>`
  }
  
  // 文字
  if (displayText) {
    svgContent += `\n  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${config.textColor}" font-size="${config.fontSize}" font-family="-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, sans-serif">${escapeXml(displayText)}</text>`
  }
  
  svgContent += `\n</svg>`
  
  return svgContent
}

/**
 * 转义 XML 特殊字符
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * 下载文件
 */
export function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 复制图片到剪贴板
 */
export async function copyImageToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    const blob = await canvasToBlob(canvas, 'png')
    if (!blob) return false
    
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      })
    ])
    return true
  } catch (error) {
    console.error('Failed to copy image to clipboard:', error)
    return false
  }
}
