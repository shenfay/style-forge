/**
 * 预览页面（独立预览模式）
 * 路由：/designer?scene=xxx&template=xxx&device=xxx&config=xxx
 */

import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { MobilePreview } from '../components/Preview/MobilePreview'
import { DesktopPreview } from '../components/Preview/DesktopPreview'
import { decodeConfig } from '../utils/configEncoder'
import type { StyleConfig } from '../types/config'
import { findTemplate, loadTemplates, type TemplateConfig } from '../utils/templateLoader'
import type { PageType, SceneType, DeviceType } from '../types/template'
import { useSEOMeta } from '../hooks/useSEOMeta'

export default function PreviewPage() {
  const [searchParams] = useSearchParams()
  const [config, setConfig] = useState<StyleConfig | null>(null)
  const [template, setTemplate] = useState<TemplateConfig | null>(null)

  // 从 URL 读取当前场景
  const scene = (searchParams.get('scene') || 'ecommerce') as SceneType
  const templateType = (searchParams.get('template') || 'home') as PageType
  const device = (searchParams.get('device') || 'desktop') as DeviceType

  // SEO: noindex + canonical→编辑页
  const sceneLabels: Record<string, string> = { ecommerce: '电商', landing: '落地页', content: '内容社区' }
  const sceneLabel = sceneLabels[scene] || scene
  const templateLabels: Record<string, string> = { home: '首页', list: '列表页', detail: '详情页', profile: '个人中心', settings: '设置页', form: '表单页', result: '结果页', messages: '消息页', landing: '首页', pricing: '定价页', 'content-home': '首页', 'content-detail': '详情页', 'content-profile': '个人中心' }
  const templateLabel = templateLabels[templateType] || templateType
  const canonicalUrl = `/designer/workbench?scene=${scene}&template=${templateType}&device=${device}`
  useSEOMeta({
    title: `预览 - ${sceneLabel}${templateLabel} | Style Forge`,
    description: `Style Forge 设计预览：${sceneLabel}场景的${templateLabel}模板，包含色彩、形状、间距、排版等配置效果展示。`,
    robots: 'noindex, follow',
    canonical: canonicalUrl,
    og: {
      title: `${sceneLabel}${templateLabel} - Style Forge 设计预览`,
      description: `查看 ${sceneLabel} 场景下 ${templateLabel} 模板的设计配置效果`,
      image: 'https://style.atmedia.fun/og-image.png',
      type: 'website',
    },
  })

  useEffect(() => {
    const load = async () => {
      // 从 URL 参数获取配置
      const scene = (searchParams.get('scene') || 'ecommerce') as SceneType
      const templateType = (searchParams.get('template') || 'home') as PageType
      const device = (searchParams.get('device') || 'desktop') as DeviceType
      const configParam = searchParams.get('config')

      // 先加载模板数据
      await loadTemplates(scene)

      // 再查找模板
      const found = findTemplate(scene, device, templateType)
      if (found) {
        setTemplate(found)
      }

      // 解码配置
      if (configParam) {
        try {
          const decoded = decodeConfig(configParam)
          setConfig(decoded)
        } catch (e) {
          console.error('Failed to decode config:', e)
        }
      }
    }

    load()
  }, [searchParams])

  if (!template) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">模板未找到</h1>
          <Link 
            to="/designer/workbench" 
            className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            返回编辑器
          </Link>
        </div>
      </div>
    )
  }

  const finalConfig = config || {
    ...template.defaultStyle,
    // 添加缺失的默认值
    secondaryColor: template.defaultStyle.primaryColor,
    accentColor: template.defaultStyle.primaryColor,
    cardBackgroundColor: '#FFFFFF',
    titleColor: '#1A1A1A',
    textPrimary: '#333333',
    textSecondary: '#666666',
    successColor: '#52C41A',
    warningColor: '#FAAD14',
    errorColor: '#FF4D4F',
    padding: 'medium' as const,
    cardGap: 'medium' as const,
    sectionGap: 'medium' as const,
    elementGap: 'medium' as const,
    titleStyle: 'left-accent' as const,
    titleSize: 'medium' as const,
    titleWeight: 'bold' as const,
    bodySize: 'medium' as const,
    lineHeight: 'medium' as const,
  }

  return (
    <div className="h-screen flex items-start justify-center overflow-y-auto bg-white">
      {/* 预览内容 */}
      <div className="relative py-8 w-full flex justify-center">
        {device === 'desktop' ? (
          <div className="w-4/5 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
            <DesktopPreview 
              config={finalConfig} 
              pageType={template.type || 'home'}
              scene={scene}
            />
          </div>
        ) : (
          <div className="w-[375px] h-[812px] bg-gray-900 rounded-[40px] shadow-2xl border-8 border-gray-800 overflow-hidden flex flex-col">
            <MobilePreview 
              config={finalConfig} 
              pageType={template.type || 'home'}
              scene={scene}
            />
          </div>
        )}
      </div>

      {/* 浮动退出按钮 */}
      <Link
        to={`/designer/workbench?${searchParams.toString()}`}
        className="fixed bottom-8 left-8 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
        title="返回编辑"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      {/* 设备切换 */}
      <div className="fixed top-8 right-8 flex gap-2">
        <Link
          to={`/designer?${new URLSearchParams({ ...Object.fromEntries(searchParams), device: 'mobile' }).toString()}`}
          className={`p-3 rounded-lg backdrop-blur-sm transition-all ${
            device === 'mobile' 
              ? 'bg-white text-gray-900' 
              : 'bg-white/50 text-white hover:bg-white/70'
          }`}
          title="移动端预览"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </Link>
        <Link
          to={`/designer?${new URLSearchParams({ ...Object.fromEntries(searchParams), device: 'desktop' }).toString()}`}
          className={`p-3 rounded-lg backdrop-blur-sm transition-all ${
            device === 'desktop' 
              ? 'bg-white text-gray-900' 
              : 'bg-white/50 text-white hover:bg-white/70'
          }`}
          title="桌面端预览"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
