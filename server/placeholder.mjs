/**
 * 占位图 SVG 生成服务
 * 
 * 独立 HTTP 服务，处理 /placeholder 请求并返回 SVG 图片。
 * 在生产环境中作为 Nginx 的后端运行，替代 Vite 开发中间件。
 * 
 * 使用方式：
 *   node server/placeholder.mjs
 *   或通过 Docker Compose 自动启动
 * 
 * API: GET /placeholder?width=800&height=600&bg=CCCCCC&text=666666&content=xxx&fontSize=48&radius=0
 */

import http from 'http'
import { URL } from 'url'

const PORT = parseInt(process.env.PLACEHOLDER_PORT || '3001', 10)
const HOST = process.env.PLACEHOLDER_HOST || '0.0.0.0'

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function processTextTemplate(text, width, height) {
  return text
    .replace(/\{width\}/g, width.toString())
    .replace(/\{height\}/g, height.toString())
}

function generateSvg(width, height, options) {
  const bgColor = options.bg || '#CCCCCC'
  const textColor = options.text || '#666666'
  const content = options.content || '{width}x{height}'
  const fontSize = parseInt(options.fontSize || '48', 10) + 'px'
  const radius = parseInt(options.radius || '0', 10)
  const borderColor = options.borderColor || '#999999'
  const borderWidth = parseFloat(options.borderWidth || '0')

  const displayText = processTextTemplate(content, width, height)
  const bgAttr = bgColor === 'transparent' ? 'none' : bgColor

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`

  if (radius > 0) {
    svg += `\n  <rect width="${width}" height="${height}" fill="${bgAttr}" rx="${radius}"`
  } else {
    svg += `\n  <rect width="${width}" height="${height}" fill="${bgAttr}"`
  }
  if (borderWidth > 0) {
    svg += ` stroke="${borderColor}" stroke-width="${borderWidth}"`
  }
  svg += '/>'

  if (displayText) {
    svg += `\n  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-size="${fontSize}" font-family="-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, sans-serif">${escapeXml(displayText)}</text>`
  }

  svg += '\n</svg>'
  return svg
}

function parseOptions(url) {
  const options = {}
  for (const [key, value] of url.searchParams.entries()) {
    if (key !== 'width' && key !== 'height') {
      options[key] = value
    }
  }
  return options
}

const server = http.createServer((req, res) => {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  try {
    const url = new URL(req.url || '', `http://${HOST}:${PORT}`)

    // 健康检查
    if (url.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok', service: 'placeholder' }))
      return
    }

    // 占位图生成
    if (url.pathname === '/placeholder' && url.searchParams.has('width')) {
      const width = parseInt(url.searchParams.get('width') || '800', 10)
      const height = parseInt(url.searchParams.get('height') || '600', 10)
      const options = parseOptions(url)
      const svg = generateSvg(width, height, options)

      res.writeHead(200, {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      })
      res.end(svg)
      return
    }

    // 未匹配
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  } catch (err) {
    console.error('[placeholder] Error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Internal server error' }))
  }
})

server.listen(PORT, HOST, () => {
  console.log(`[placeholder] Server running at http://${HOST}:${PORT}`)
  console.log(`[placeholder] Example: http://localhost:${PORT}/placeholder?width=800&height=600&bg=CCCCCC`)
})
