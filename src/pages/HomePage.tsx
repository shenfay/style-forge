/**
 * 营销首页 - 产品介绍与用户转化
 */

import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function HomePage() {
  // SEO Meta
  useEffect(() => {
    document.title = 'Style Forge - 场景化 UI 设计配置器'
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      '场景化 UI 设计配置器，在真实组件中预览效果，一键导出 Tailwind Config 和 AI 提示词。支持 6 大场景、13+ 模板，移动端/PC 端双端预览。'
    )

    return () => {
      document.title = 'Style Forge - 场景化 UI 设计配置器'
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: '#E5E4E0' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" className="w-8 h-8" />
            <span className="text-lg font-medium" style={{ color: '#09090B' }}>Style Forge</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/placeholder/workbench"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{ color: '#242424', backgroundColor: '#F0F0F0' }}
            >
              占位图生成器
            </a>
            <Link
              to="/designer/workbench"
              className="px-5 py-2.5 text-sm font-medium rounded-lg text-white transition-colors"
              style={{ backgroundColor: '#373737' }}
            >
              开始使用
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#09090B', lineHeight: '1.2' }}>
            场景化 UI 设计配置器
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#71717A', lineHeight: '1.6' }}>
            在真实组件中预览设计效果，一键导出 Tailwind Config 和 AI 提示词。
            <br />
            支持 6 大场景、13+ 模板，移动端/PC 端双端预览。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/designer/workbench"
              className="px-8 py-3.5 text-base font-medium rounded-lg text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: '#373737' }}
            >
              立即开始
            </Link>
            <a
              href="#features"
              className="px-8 py-3.5 text-base font-medium rounded-lg transition-colors"
              style={{ color: '#242424', backgroundColor: '#F5F5F5' }}
            >
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section id="features" className="py-20 px-6" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: '#09090B' }}>
            核心功能
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 功能 1 */}
            <div className="p-8 bg-white rounded-xl border" style={{ borderColor: '#E5E4E0' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: '#F0F0F0' }}>
                <svg className="w-6 h-6" style={{ color: '#373737' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#09090B' }}>8 维配置矩阵</h3>
              <p style={{ color: '#71717A', lineHeight: '1.6' }}>
                从色彩、形状、间距到文字排版，全方位自定义你的设计系统，实时预览效果。
              </p>
            </div>

            {/* 功能 2 */}
            <div className="p-8 bg-white rounded-xl border" style={{ borderColor: '#E5E4E0' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: '#F0F0F0' }}>
                <svg className="w-6 h-6" style={{ color: '#373737' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#09090B' }}>双端预览</h3>
              <p style={{ color: '#71717A', lineHeight: '1.6' }}>
                同时支持移动端和桌面端预览，确保设计在不同设备上的一致性。
              </p>
            </div>

            {/* 功能 3 */}
            <div className="p-8 bg-white rounded-xl border" style={{ borderColor: '#E5E4E0' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: '#F0F0F0' }}>
                <svg className="w-6 h-6" style={{ color: '#373737' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#09090B' }}>一键导出</h3>
              <p style={{ color: '#71717A', lineHeight: '1.6' }}>
                导出 Tailwind Config、CSS 变量和 AI 提示词，无缝对接你的开发流程。
              </p>
            </div>

            {/* 功能 4 */}
            <div className="p-8 bg-white rounded-xl border" style={{ borderColor: '#E5E4E0' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: '#F0F0F0' }}>
                <svg className="w-6 h-6" style={{ color: '#373737' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                  <polyline points="21,15 16,10 5,21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#09090B' }}>占位图生成器</h3>
              <p style={{ color: '#71717A', lineHeight: '1.6' }}>
                快速生成自定义尺寸、颜色、样式的占位图片，支持 PNG/JPG/WebP/SVG 格式。
              </p>
            </div>

            {/* 功能 5 */}
            <div className="p-8 bg-white rounded-xl border" style={{ borderColor: '#E5E4E0' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: '#F0F0F0' }}>
                <svg className="w-6 h-6" style={{ color: '#373737' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#09090B' }}>6 大场景</h3>
              <p style={{ color: '#71717A', lineHeight: '1.6' }}>
                覆盖电商、数据面板、社交等主流场景，13+ 模板开箱即用。
              </p>
            </div>

            {/* 功能 6 */}
            <div className="p-8 bg-white rounded-xl border" style={{ borderColor: '#E5E4E0' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: '#F0F0F0' }}>
                <svg className="w-6 h-6" style={{ color: '#373737' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#09090B' }}>URL 分享</h3>
              <p style={{ color: '#71717A', lineHeight: '1.6' }}>
                通过 URL 参数分享你的设计配置，团队协作更轻松。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 使用流程 */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: '#09090B' }}>
            三步上手
          </h2>
          <div className="space-y-12">
            {/* 步骤 1 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#373737' }}>
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#09090B' }}>选择场景和模板</h3>
                <p style={{ color: '#71717A', lineHeight: '1.6' }}>
                  从 6 大场景中选择适合你的业务场景，然后挑选一个初始模板开始定制。
                </p>
              </div>
            </div>

            {/* 步骤 2 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#373737' }}>
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#09090B' }}>实时预览调整</h3>
                <p style={{ color: '#71717A', lineHeight: '1.6' }}>
                  在右侧面板调整色彩、形状、间距等配置，中部预览区实时展示效果。
                </p>
              </div>
            </div>

            {/* 步骤 3 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#373737' }}>
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#09090B' }}>导出配置</h3>
                <p style={{ color: '#71717A', lineHeight: '1.6' }}>
                  一键导出 Tailwind Config、CSS 变量或 AI 提示词，直接应用到你的项目中。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20 px-6" style={{ backgroundColor: '#09090B' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            准备好开始了吗？
          </h2>
          <p className="text-lg mb-10" style={{ color: '#A1A1AA' }}>
            立即体验 Style Forge，快速构建你的设计系统。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/designer/workbench"
              className="px-8 py-3.5 text-base font-medium rounded-lg bg-white transition-all hover:shadow-lg"
              style={{ color: '#09090B' }}
            >
              开始使用
            </Link>
            <a
              href="/placeholder/workbench"
              className="px-8 py-3.5 text-base font-medium rounded-lg transition-colors"
              style={{ color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              占位图生成器
            </a>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: '#E5E4E0' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" className="w-6 h-6" />
            <span className="text-sm font-medium" style={{ color: '#09090B' }}>Style Forge</span>
          </div>
          <div className="text-sm" style={{ color: '#71717A' }}>
            © 2026 Style Forge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
