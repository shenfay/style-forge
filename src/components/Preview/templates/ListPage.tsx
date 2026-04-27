/**
 * 移动端列表页模板
 */

import type { StyleConfig } from '../../../types/config'
import { StatusBar } from '../../UI/StatusBar'
import { Card } from '../../UI/Card'
import { colors, fontSize, fontWeight, getBorderRadius, withOpacity, generateComponentTokens } from '../../../utils/design-tokens'

interface ListPageProps {
  config: StyleConfig
}

export function ListPage({ config }: ListPageProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  const bodyFontSize = tokens.typography.bodySize
  const lineHeight = tokens.typography.lineHeight

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: config.backgroundColor }}>
      <StatusBar />

      {/* 搜索栏 */}
      <div className="px-6 py-3">
        <div className="flex items-center gap-2 px-4 py-2" style={{
          borderRadius: radius,
          background: colors.background.card,
          border: `1px solid ${colors.border.light}`,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>搜索...</span>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="flex gap-2 px-6 py-2 overflow-x-auto">
        {['全部', '分类一', '分类二', '分类三'].map((filter, i) => (
          <button key={i} className="px-4 py-1.5 whitespace-nowrap" style={{
            borderRadius: '999px',
            background: i === 0 ? config.primaryColor : '#FFFFFF',
            color: i === 0 ? '#FFFFFF' : '#666666',
            fontSize: bodyFontSize,
            lineHeight,
          }}>
            {filter}
          </button>
        ))}
      </div>

      {/* 列表内容 */}
      <div className="px-6 py-3 pb-24 space-y-3">
        {[
          { title: '列表项一', desc: '描述文字', tag: '热门' },
          { title: '列表项二', desc: '描述文字', tag: '推荐' },
          { title: '列表项三', desc: '描述文字', tag: '最新' },
          { title: '列表项四', desc: '描述文字', tag: '' },
          { title: '列表项五', desc: '描述文字', tag: '精选' },
        ].map((item, i) => (
          <Card key={i} config={config} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium" style={{ color: colors.text.primary, fontSize: bodyFontSize, lineHeight, fontWeight: fontWeight.medium }}>{item.title}</div>
              {item.tag && (
                <span className="px-2 py-0.5 text-[10px]" style={{
                  borderRadius: config.badgeStyle === 'rounded' ? '999px' : '0',
                  background: withOpacity(config.primaryColor, 0.08),
                  color: config.primaryColor,
                  fontSize: fontSize.xs,
                }}>
                  {item.tag}
                </span>
              )}
            </div>
            <div style={{ color: colors.text.tertiary, fontSize: bodyFontSize, lineHeight }}>{item.desc}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
