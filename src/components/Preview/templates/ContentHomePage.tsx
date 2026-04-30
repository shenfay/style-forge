/**
 * 内容平台 - 图文杂志首页（移动端）
 * 双列瀑布流卡片布局，图片驱动，杂志风排版
 * 所有样式通过全局配置与设计令牌驱动
 */

import { Fragment } from 'react'
import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { Placeholder } from '../Placeholder'
import { colors, fontSize, fontWeight, getBorderRadius, shadows, withOpacity, generateComponentTokens } from '../../../utils/tokenResolver'

interface ContentHomePageProps {
  config: StyleConfig
}

export function ContentHomePage({ config }: ContentHomePageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  const tags = ['推荐', '科技', '设计', '生活方式', '旅行', '美食', '摄影', '读书']

  const articles = [
    { title: '2024 年度最佳设计工具盘点', tag: '设计', author: '设计之声', time: '3天前', likes: '2.3k' },
    { title: '如何用一杯咖啡开启高效一天', tag: '生活方式', author: '生活美学', time: '5天前', likes: '1.8k' },
    { title: '京都红叶季深度游攻略', tag: '旅行', author: '旅人日记', time: '1周前', likes: '3.5k' },
    { title: '极简主义摄影入门指南', tag: '摄影', author: '光影之间', time: '3天前', likes: '1.2k' },
    { title: '2024 年最值得关注的科技趋势', tag: '科技', author: '科技前沿', time: '2天前', likes: '4.1k' },
    { title: '周末在家做一杯手冲咖啡', tag: '美食', author: '咖啡猎人', time: '4天前', likes: '982' },
    { title: '北欧风格家居搭配灵感', tag: '设计', author: '家居志', time: '6天前', likes: '2.7k' },
    { title: '城市跑步路线推荐 - 北京篇', tag: '生活方式', author: '跑者世界', time: '1周前', likes: '1.5k' },
  ]

  return (
    <Fragment>
      {/* 滚动内容区 */}
      <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
        <StatusBar />

        {/* 1. 顶部导航 */}
        <div className="sticky top-0 z-10 px-4 py-3" style={{ background: config.backgroundColor }}>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 px-3 py-2" style={{
              borderRadius: radius,
              background: colors.background.card,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <span className="flex-1" style={{ color: colors.text.tertiary, fontSize: bodyFontSize }}>搜索文章</span>
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
        </div>

        {/* 2. 分类标签 */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {tags.map((tag, i) => (
              <button key={i} className="shrink-0 px-3.5 py-1.5 whitespace-nowrap rounded-full cursor-pointer" style={{
                background: i === 0 ? config.primaryColor : withOpacity(config.primaryColor, 0.08),
                color: i === 0 ? colors.white : config.primaryColor,
                fontSize: bodyFontSize,
                fontWeight: i === 0 ? fontWeight.medium : fontWeight.normal,
                borderRadius: '999px',
              }}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 双列瀑布流 */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {articles.map((item, i) => (
              <div key={i} className="overflow-hidden" style={{
                borderRadius: radius,
                background: colors.background.card,
                boxShadow: shadows.sm,
              }}>
                <div className="w-full">
                  <Placeholder width={180} height={i % 3 === 0 ? 240 : 180} type="product" text={item.title.length > 10 ? item.title.slice(0, 10) + '..' : item.title} />
                </div>
                <div className="p-3 space-y-2">
                  {/* 标签 */}
                  <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded" style={{
                    background: withOpacity(config.primaryColor, 0.1),
                    color: config.primaryColor,
                  }}>
                    {item.tag}
                  </span>
                  {/* 标题 */}
                  <div className="font-medium line-clamp-2 leading-snug" style={{
                    color: colors.text.primary,
                    fontSize: bodyFontSize,
                    fontWeight: fontWeight.medium,
                  }}>
                    {item.title}
                  </div>
                  {/* 作者和互动 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full" style={{ background: withOpacity(config.primaryColor, 0.2) }} />
                      <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? config.primaryColor : colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {tab.icon === 'home' && <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
                  {tab.icon === 'compass' && <><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></>}
                  {tab.icon === 'message' && <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>}
                  {tab.icon === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
                </svg>
                <span style={{ fontSize: bodyFontSize, color: i === 0 ? config.primaryColor : colors.text.tertiary }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
