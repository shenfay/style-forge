import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Connect } from 'vite'

// 占位图 SVG 生成函数（纯函数，不依赖 DOM）
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function processTextTemplate(text: string, width: number, height: number): string {
  return text
    .replace(/\{width\}/g, width.toString())
    .replace(/\{height\}/g, height.toString())
}

function generateSvg(width: number, height: number, options: Record<string, string>): string {
  const bgColor = options.bg || '#CCCCCC'
  const textColor = options.text || '#666666'
  const content = options.content || '{width}×{height}'
  const fontSize = parseInt(options.fontSize || '48') + 'px'
  const radius = parseInt(options.radius || '0')
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
  svg += `/>`
  
  if (displayText) {
    svg += `\n  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-size="${fontSize}" font-family="-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, sans-serif">${escapeXml(displayText)}</text>`
  }
  
  svg += `\n</svg>`
  return svg
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'placeholder-image',
    configureServer(server) {
      // 中间件：拦截 /placeholder?xxx 请求，直接返回 SVG 图片
      server.middlewares.use((req: Connect.IncomingMessage, res: any, next: Connect.NextFunction) => {
        const url = new URL(req.url || '', 'http://localhost:5173')
        
        // 只处理 /placeholder?xxx（不是 /placeholder/workbench）
        if (url.pathname === '/placeholder' && url.searchParams.has('width')) {
          const width = parseInt(url.searchParams.get('width') || '800')
          const height = parseInt(url.searchParams.get('height') || '600')
          
          // 收集所有参数
          const options: Record<string, string> = {}
          for (const [key, value] of url.searchParams.entries()) {
            if (key !== 'width' && key !== 'height') {
              options[key] = value
            }
          }
          
          const svg = generateSvg(width, height, options)
          
          res.setHeader('Content-Type', 'image/svg+xml')
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(svg)
          return
        }
        
        next()
      })
    }
  }],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
          }
        },
      },
    },
  },
})
