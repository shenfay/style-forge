/**
 * 移动端详情页模板
 */

import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { NavBar } from '../../UI/NavBar'
import { Card } from '../../UI/Card'
import { colors, fontSize, fontWeight, getBorderRadius, withOpacity, generateComponentTokens } from '../../../utils/design-tokens'

interface DetailPageProps {
  config: StyleConfig
}

export function DetailPage({ config }: DetailPageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  return (
    <div className="h-full overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />
      <NavBar config={config} title="详情" showBack />

      {/* 内容区 */}
      <div className="px-6 py-5 pb-24 space-y-4">
        {/* 标题区 */}
        <div>
          <h1 className="text-[22px] font-bold mb-2" style={{ color: colors.text.primary, fontSize: fontSize['3xl'], fontWeight: fontWeight.bold }}>详情标题</h1>
          <div className="flex items-center gap-3" style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>
            <span>作者</span>
            <span>2026-04-17</span>
          </div>
        </div>
      
        {/* 内容卡片 */}
        <Card config={config} className="p-5 space-y-3">
          <p className="text-sm leading-relaxed" style={{ color: colors.text.secondary }}>
            这是详情内容的正文部分。这里可以展示文章的详细内容,包括文字描述、图片展示等。
          </p>
          <p className="text-sm leading-relaxed" style={{ color: colors.text.secondary }}>
            支持多段落展示,内容排版清晰易读,符合用户阅读习惯。
          </p>
        </Card>

        {/* 标签区 */}
        <div className="flex flex-wrap gap-2">
          {['标签一', '标签二', '标签三'].map((tag, i) => (
            <span key={i} className="px-3 py-1 text-[11px]" style={{
              borderRadius: config.badgeStyle === 'rounded' ? '999px' : '0',
              background: config.badgeStyle === 'rounded' ? withOpacity(config.primaryColor, 0.08) : 'transparent',
              color: config.primaryColor,
              fontSize: fontSize.sm,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 底部操作 */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ 
        background: '#FFFFFF',
        borderTop: '1px solid #E5E5E5',
      }}>
        <div className="flex gap-3">
          <button className="flex-1 py-3 text-[13px] font-medium btn-interactive" style={{
            borderRadius: radius,
            border: `1px solid ${config.primaryColor}`,
            color: config.primaryColor,
          }}>
            收藏
          </button>
          <button className="flex-1 py-3 text-[13px] font-medium text-white btn-interactive" style={{
            borderRadius: radius,
            background: config.buttonStyle === 'gradient' 
              ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)` 
              : config.primaryColor,
          }}>
            分享
          </button>
        </div>
      </div>
    </div>
  )
}
