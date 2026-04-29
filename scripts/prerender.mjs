/**
 * 静态预渲染脚本（postbuild）
 *
 * 构建后将关键页面的 SEO meta 标签注入到对应的 static HTML 文件中，
 * 使得爬虫在无需执行 JavaScript 的情况下也能获取到正确的 meta 信息。
 *
 * 工作原理：
 * 1. 读取已构建的 dist/index.html
 * 2. 为每个预渲染路由创建对应的 HTML 副本
 * 3. 注入路由特定的 <title>/<meta>/JSON-LD 标签
 * 4. 输出到 dist/{route}/index.html
 *
 * 对于 Vercel 部署，这些文件会优先于 SPA rewrite 被服务。
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const indexPath = join(distDir, 'index.html')

// 路由配置
const routes = [
  {
    path: '/',
    title: 'Style Forge - 场景化 UI 设计配置器',
    description: '场景化 UI 设计配置器，在真实组件中预览效果，一键导出 Tailwind Config 和 AI 提示词。支持 6 大场景、13+ 模板，移动端/PC 端双端预览。',
    canonical: 'https://style.atmedia.fun',
    ogTitle: 'Style Forge - 场景化 UI 设计配置器',
    ogDescription: '在真实组件中预览 UI 效果，一键导出 Tailwind Config 和 AI 提示词',
    ogImage: 'https://style.atmedia.fun/og-image.png',
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Style Forge',
      description: '场景化 UI 设计配置器，在真实组件中预览效果，一键导出 Tailwind Config 和 AI 提示词',
      url: 'https://style.atmedia.fun',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: ['8维配置矩阵', '双端预览（移动端+PC端）', '6大场景13+模板', 'Tailwind Config 导出', 'AI 提示词导出', 'URL 参数分享'],
    },
  },
  {
    path: '/designer/workbench',
    title: '编辑器 - Style Forge | UI 设计配置器',
    description: '使用 Style Forge 场景化编辑器配置电商、落地页等场景的设计样式，实时预览效果，一键导出 Tailwind Config、CSS 变量和 AI 提示词。',
    canonical: 'https://style.atmedia.fun/designer/workbench',
    ogTitle: 'Style Forge 编辑器 - UI 设计配置器',
    ogDescription: '配置电商、落地页等场景的设计样式，支持 Tailwind/AI Prompt 导出。',
    ogImage: 'https://style.atmedia.fun/og-image.png',
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Style Forge 编辑器',
      description: '场景化 UI 设计配置器编辑器，支持多场景模板和设计系统配置',
      url: 'https://style.atmedia.fun/designer/workbench',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  {
    path: '/placeholder/workbench',
    title: '占位图生成器 - Style Forge | 免费图片占位符工具',
    description: '免费在线占位图生成器，支持自定义尺寸、颜色、文字、圆角、边框，一键下载 PNG/JPG/WebP/SVG 格式。',
    canonical: 'https://style.atmedia.fun/placeholder/workbench',
    ogTitle: '占位图生成器 - Style Forge',
    ogDescription: '免费在线占位图生成器，自定义尺寸/颜色/文字，一键下载多种格式',
    ogImage: 'https://style.atmedia.fun/og-image.png',
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Style Forge 占位图生成器',
      description: '免费在线占位图生成器，支持自定义尺寸、颜色、文字、圆角、边框，一键下载 PNG/JPG/WebP/SVG 格式。',
      url: 'https://style.atmedia.fun/placeholder/workbench',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
]

// 构建 meta 标签 HTML
function buildMetaTags(route) {
  const tags = []

  tags.push(`<title>${route.title}</title>`)
  tags.push(`<meta name="description" content="${route.description}" />`)
  if (route.robots) {
    tags.push(`<meta name="robots" content="${route.robots}" />`)
  }
  if (route.canonical) {
    tags.push(`<link rel="canonical" href="${route.canonical}" />`)
  }
  if (route.ogTitle) {
    tags.push(`<meta property="og:title" content="${route.ogTitle}" />`)
  }
  if (route.ogDescription) {
    tags.push(`<meta property="og:description" content="${route.ogDescription}" />`)
  }
  if (route.ogImage) {
    tags.push(`<meta property="og:image" content="${route.ogImage}" />`)
  }
  if (route.ogTitle) {
    tags.push(`<meta name="twitter:title" content="${route.ogTitle}" />`)
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`)
  }
  if (route.ogDescription) {
    tags.push(`<meta name="twitter:description" content="${route.ogDescription}" />`)
  }
  if (route.ogImage) {
    tags.push(`<meta name="twitter:image" content="${route.ogImage}" />`)
  }
  if (route.jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`)
  }

  return tags.join('\n    ')
}

function main() {
  if (!existsSync(indexPath)) {
    console.error(`[prerender] dist/index.html not found at ${indexPath}`)
    console.error('[prerender] Run "npm run build" first or ensure the build completed successfully.')
    process.exit(1)
  }

  const indexHtml = readFileSync(indexPath, 'utf-8')

  for (const route of routes) {
    // 构建带 SEO meta 的 HTML
    const metaTags = buildMetaTags(route)

    // 替换 index.html 中的默认 meta 区域（保留 Vite 生成的 script/link 标签）
    const routeHtml = indexHtml.replace(
      /<!-- 默认 SEO[\s\S]*?(?=<script)/,
      `<!-- 预渲染 SEO（${route.path}） -->\n    ${metaTags}`
    )

    if (route.path === '/') {
      // 根路由直接覆盖 dist/index.html
      writeFileSync(indexPath, routeHtml, 'utf-8')
      console.log(`[prerender] OK /index.html (${route.title})`)
    } else {
      // 子路由创建目录结构
      const outputDir = join(distDir, route.path.slice(1))
      const outputFile = join(outputDir, 'index.html')
      mkdirSync(outputDir, { recursive: true })
      writeFileSync(outputFile, routeHtml, 'utf-8')
      console.log(`[prerender] OK ${route.path}/index.html (${route.title})`)
    }
  }

  console.log('[prerender] 预渲染完成')
}

main()
