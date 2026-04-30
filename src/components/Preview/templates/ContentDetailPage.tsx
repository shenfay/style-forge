/**
 * 内容平台 - 文章详情页（移动端）
 * 阅读体验优先，含文章正文、作者信息、评论和底部操作
 * 所有样式通过全局配置与设计令牌驱动
 */

import { Fragment } from 'react'
import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { Placeholder } from '../Placeholder'
import { colors, fontSize, fontWeight, getBorderRadius, shadows, withOpacity, generateComponentTokens } from '../../../utils/tokenResolver'

interface ContentDetailPageProps {
  config: StyleConfig
}

export function ContentDetailPage({ config }: ContentDetailPageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  return (
    <Fragment>
      {/* 滚动内容区 */}
      <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
        <StatusBar />

        {/* 1. 顶部导航 */}
        <div className="flex items-center px-4 py-3" style={{
          background: colors.white,
          borderBottom: `1px solid ${colors.border.light}`,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          <div className="flex-1 text-center text-sm font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, fontWeight: fontWeight.medium }}>文章</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </div>

        {/* 2. 文章头图 */}
        <div className="w-full">
          <Placeholder width={420} height={236} type="banner" />
        </div>

        {/* 3. 文章内容 */}
        <div className="px-5 py-4 space-y-4">
          {/* 文章标题 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-[10px] font-medium rounded" style={{
                background: withOpacity(config.primaryColor, 0.1),
                color: config.primaryColor,
              }}>
                设计
              </span>
              <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>阅读时长 8 分钟</span>
            </div>
            <h1 className="text-xl font-bold leading-tight mb-3" style={{
              color: colors.text.primary,
              fontSize: config.bodySize === 'large' ? '24px' : config.bodySize === 'small' ? '20px' : '22px',
              fontWeight: fontWeight.bold,
            }}>
              2024 年度最佳设计工具盘点：提升效率的 10 款神器
            </h1>
            
            {/* 作者信息 */}
            <div className="flex items-center gap-3 py-3" style={{
              borderTop: `1px solid ${colors.border.light}`,
              borderBottom: `1px solid ${colors.border.light}`,
            }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: config.primaryColor }}>
                设
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, fontWeight: fontWeight.medium }}>设计之声</div>
                <div style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>资深设计师 · 2024年12月20日</div>
              </div>
              <button className="px-4 py-1.5 text-sm font-medium rounded cursor-pointer" style={{
                background: config.primaryColor,
                color: colors.white,
                fontSize: bodyFontSize,
                borderRadius: '999px',
              }}>
                关注
              </button>
            </div>
          </div>

          {/* 文章正文 */}
          <div className="space-y-4 leading-relaxed" style={{
            color: colors.text.primary,
            fontSize: bodyFontSize,
            lineHeight: tokens.typography.lineHeight,
          }}>
            <p>在当今快节奏的设计行业中，选择正确的工具可以显著提升工作效率。无论你是 UI/UX 设计师、平面设计师还是插画师，一套得心应手的工具组合都是必不可少的。</p>
            <p>本文将从用户界面设计、原型制作、协作平台和资源管理四个维度，为你盘点 2024 年最值得关注的 10 款设计工具。</p>
            
            <h2 className="text-lg font-bold" style={{ fontSize: config.bodySize === 'large' ? '18px' : '20px', fontWeight: fontWeight.bold, color: colors.text.primary, marginTop: '24px' }}>
              一、用户界面设计工具
            </h2>
            <p>Figma 依然是 UI 设计领域的不二之选。2024 年，Figma 推出了 AI 辅助设计功能，可以自动生成组件变体和布局建议，进一步巩固了其市场地位。</p>
            <p>与此同时，Penpot 作为开源替代方案也在快速崛起，吸引了大量注重数据安全和预算有限的团队。</p>

            {/* 插入图片 */}
            <div className="my-4" style={{ borderRadius: radius, overflow: 'hidden' }}>
              <Placeholder width={380} height={200} type="banner" />
            </div>

            <h2 className="text-lg font-bold" style={{ fontSize: config.bodySize === 'large' ? '18px' : '20px', fontWeight: fontWeight.bold, color: colors.text.primary, marginTop: '24px' }}>
              二、原型制作工具
            </h2>
            <p>ProtoPie 在 2024 年推出了更强大的交互引擎，支持复杂的条件逻辑和传感器交互，使高保真原型可以媲美真实应用。</p>
            <p>Axure RP 也推出了云端协作功能，让传统原型工具焕发了新的生机。</p>

            <h2 className="text-lg font-bold" style={{ fontSize: config.bodySize === 'large' ? '18px' : '20px', fontWeight: fontWeight.bold, color: colors.text.primary, marginTop: '24px' }}>
              三、协作与反馈平台
            </h2>
            <p>Zeplin 和 Avocode 等协作工具在 2024 年进一步整合了 AI 能力，可以自动生成开发标注和代码片段，显著缩短了设计到开发的交付周期。</p>
          </div>

          {/* 4. 评论区域 */}
          <div className="pt-4" style={{ borderTop: `1px solid ${colors.border.light}` }}>
            <h3 className="text-base font-bold mb-4" style={{
              color: colors.text.primary,
              fontSize: config.bodySize === 'large' ? '16px' : '18px',
              fontWeight: fontWeight.bold,
            }}>
              评论 <span style={{ color: colors.text.tertiary, fontWeight: fontWeight.normal }}>(12)</span>
            </h3>

            {/* 评论输入框 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: config.primaryColor }}>
                我
              </div>
              <div className="flex-1 px-3 py-2 text-sm" style={{
                borderRadius: radius,
                background: colors.background.card,
                border: `1px solid ${colors.border.light}`,
                color: colors.text.tertiary,
                fontSize: bodyFontSize,
              }}>
                写下你的评论...
              </div>
            </div>

            {/* 评论列表 */}
            {[
              { name: '李明', time: '2小时前', content: '非常实用的盘点，Figma 的 AI 功能确实好用，推荐大家试试！', likes: '28' },
              { name: '小王', time: '5小时前', content: 'Penpot 最近在关注，开源替代方案越来越成熟了。', likes: '15' },
              { name: '设计师阿花', time: '1天前', content: 'ProtoPie 的交互引擎太强大了，做高保真原型首选。', likes: '42' },
            ].map((comment, i) => (
              <div key={i} className="flex gap-3 py-3" style={{
                borderBottom: i < 2 ? `1px solid ${colors.border.light}` : 'none',
              }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: withOpacity(config.primaryColor, 0.3) }}>
                  {comment.name.substring(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, fontWeight: fontWeight.medium }}>{comment.name}</span>
                    <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{comment.time}</span>
                  </div>
                  <div className="text-sm mb-1.5" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight }}>{comment.content}</div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>{comment.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center px-4 py-2" style={{ 
          background: colors.white,
          borderTop: `1px solid ${colors.border.light}`,
        }}>
          {/* 点赞 */}
          <button className="flex flex-col items-center gap-0.5 px-4 py-1 cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>368</span>
          </button>

          {/* 评论 */}
          <button className="flex flex-col items-center gap-0.5 px-4 py-1 cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>12</span>
          </button>

          {/* 收藏 */}
          <button className="flex flex-col items-center gap-0.5 px-4 py-1 cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span style={{ color: colors.text.tertiary, fontSize: fontSize.xs }}>收藏</span>
          </button>

          {/* 分享 */}
          <button className="flex-1 ml-4 py-2.5 text-sm font-medium text-center cursor-pointer" style={{
            borderRadius: '999px',
            background: config.buttonStyle === 'gradient'
              ? `linear-gradient(135deg, ${config.primaryColor}, ${withOpacity(config.primaryColor, 0.8)})`
              : config.buttonStyle === 'wireframe'
              ? 'transparent'
              : config.primaryColor,
            color: config.buttonStyle === 'wireframe' ? config.primaryColor : colors.white,
            border: config.buttonStyle === 'wireframe' ? `1px solid ${config.primaryColor}` : 'none',
            fontSize: bodyFontSize,
            fontWeight: fontWeight.medium,
          }}>
            分享
          </button>
        </div>
      </div>
    </Fragment>
  )
}
