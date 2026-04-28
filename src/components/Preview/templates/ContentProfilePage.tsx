/**
 * 内容平台 - 作者专栏主页（移动端）
 * 展示作者信息、文章列表和专栏内容
 * 所有样式通过全局配置与设计令牌驱动
 */

import { Fragment } from 'react'
import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { Placeholder } from '../Placeholder'
import { colors, fontSize, fontWeight, getBorderRadius, shadows, withOpacity, generateComponentTokens } from '../../../utils/design-tokens'

interface ContentProfilePageProps {
  config: StyleConfig
}

export function ContentProfilePage({ config }: ContentProfilePageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  const articles = [
    { title: '2024 年度最佳设计工具盘点', date: '2024-12-20', views: '2.3万', tag: '设计' },
    { title: 'Figma AI 功能深度评测：设计工具的未来', date: '2024-12-15', views: '1.8万', tag: '科技' },
    { title: '从零开始学 UI 设计：入门指南', date: '2024-12-10', views: '3.5万', tag: '设计' },
    { title: '设计师必备的 10 个资源网站', date: '2024-12-05', views: '1.2万', tag: '资源' },
    { title: '2025 年设计趋势预测', date: '2024-11-28', views: '4.1万', tag: '设计' },
  ]

  return (
    <Fragment>
      {/* 滚动内容区 */}
      <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
        <StatusBar />

        {/* 1. 顶部导航 */}
        <div className="flex items-center justify-between px-4 py-3" style={{
          background: colors.white,
          borderBottom: `1px solid ${colors.border.light}`,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          <span className="text-sm font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, fontWeight: fontWeight.medium }}>作者主页</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </div>

        {/* 2. 作者信息 */}
        <div className="px-5 py-6 text-center" style={{
          background: `linear-gradient(180deg, ${withOpacity(config.primaryColor, 0.06)} 0%, transparent 100%)`,
        }}>
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3" style={{ background: config.primaryColor }}>
            设
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: colors.text.primary, fontSize: '20px', fontWeight: fontWeight.bold }}>设计之声</h1>
          <p className="text-sm mb-4" style={{ color: colors.text.secondary, fontSize: bodyFontSize, lineHeight }}>资深 UI/UX 设计师，10 年从业经验。分享设计思考、工具评测和行业洞察。</p>
          
          {/* 统计数据 */}
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: colors.text.primary, fontSize: '18px', fontWeight: fontWeight.bold }}>128</div>
              <div className="text-xs" style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>文章</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: colors.text.primary, fontSize: '18px', fontWeight: fontWeight.bold }}>3.2万</div>
              <div className="text-xs" style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>关注</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: colors.text.primary, fontSize: '18px', fontWeight: fontWeight.bold }}>15.6万</div>
              <div className="text-xs" style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>获赞</div>
            </div>
          </div>

          <button className="px-8 py-2 text-sm font-medium rounded-full cursor-pointer" style={{
            background: config.buttonStyle === 'wireframe' ? 'transparent' : config.primaryColor,
            color: config.buttonStyle === 'wireframe' ? config.primaryColor : colors.white,
            border: config.buttonStyle === 'wireframe' ? `1px solid ${config.primaryColor}` : 'none',
            fontSize: bodyFontSize,
            fontWeight: fontWeight.medium,
            borderRadius: '999px',
          }}>
            + 关注
          </button>
        </div>

        {/* 3. Tab 切换 */}
        <div className="flex px-5" style={{
          borderBottom: `1px solid ${colors.border.light}`,
        }}>
          {['文章', '专栏', '简介'].map((tab, i) => (
            <button key={i} className="flex-1 py-3 text-center text-sm font-medium cursor-pointer" style={{
              color: i === 0 ? config.primaryColor : colors.text.tertiary,
              fontSize: bodyFontSize,
              fontWeight: i === 0 ? fontWeight.medium : fontWeight.normal,
              borderBottom: i === 0 ? `2px solid ${config.primaryColor}` : '2px solid transparent',
              transition: 'all 0.2s ease',
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* 4. 文章列表 */}
        <div className="px-5 py-3 space-y-3">
          {articles.map((item, i) => (
            <div key={i} className="flex gap-3 py-3" style={{
              borderBottom: i < articles.length - 1 ? `1px solid ${colors.border.light}` : 'none',
            }}>
              <div className="w-24 h-24 shrink-0 overflow-hidden" style={{ borderRadius: radius }}>
                <Placeholder width={96} height={96} type="product" text={item.title.length > 10 ? item.title.slice(0, 10) + '..' : item.title} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="font-medium line-clamp-2 mb-1 leading-snug" style={{
                    color: colors.text.primary,
                    fontSize: bodyFontSize,
                    fontWeight: fontWeight.medium,
                  }}>
                    {item.title}
                  </div>
                  <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium rounded" style={{
                    background: withOpacity(config.primaryColor, 0.1),
                    color: config.primaryColor,
                  }}>
                    {item.tag}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.date}</span>
                  <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.views} 阅读</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部 Tab 导航 */}
        <div className="px-4 py-2" style={{ 
          background: colors.white,
          borderTop: `1px solid ${colors.border.light}`,
        }}>
          <div className="flex justify-around">
            {[
              { icon: 'home', label: '首页' },
              { icon: 'compass', label: '发现' },
              { icon: 'message', label: '消息' },
              { icon: 'user', label: '我的' },
            ].map((tab, i) => (
              <button key={i} className="flex flex-col items-center gap-0.5 cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={i === 3 ? config.primaryColor : colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {tab.icon === 'home' && <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
                  {tab.icon === 'compass' && <><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></>}
                  {tab.icon === 'message' && <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>}
                  {tab.icon === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
                </svg>
                <span style={{ fontSize: bodyFontSize, color: i === 3 ? config.primaryColor : colors.text.tertiary }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
