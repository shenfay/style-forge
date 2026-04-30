import type { StyleConfig } from '../../types/config'
import { generateComponentTokens, getBorderRadius } from '../../utils/tokenResolver'

interface SectionHeaderProps {
  config: StyleConfig
  title: string
  showDecoration?: boolean
  align?: 'left' | 'center' | 'right' | 'bottom'
  onMoreClick?: () => void
}

/**
 * SectionHeader - 区块标题组件
 * 
 * 用途：页面各区块的标题（如"限时抢购"、"品牌专区"、"新品推荐"）
 * 
 * 配置映射：
 * - 标题文字 → tokens.sectionHeader.titleSize, titleColor, titleWeight
 * - 装饰条 → tokens.colors.primary, decorationThickness, decorationGap
 */
export function SectionHeader({ 
  config, 
  title, 
  showDecoration = true,
  align = 'left',
  onMoreClick 
}: SectionHeaderProps) {
  const tokens = generateComponentTokens(config)
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="relative" style={{
        paddingLeft: align === 'left' && showDecoration ? '16px' : '0',
        paddingRight: align === 'right' && showDecoration ? '16px' : '0',
        paddingBottom: align === 'bottom' ? '10px' : '0',
      }}>
        {/* 左侧装饰条 */}
        {align === 'left' && showDecoration && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2" style={{
            backgroundColor: tokens.colors.primary,
            borderRadius: '2px',
            width: tokens.sectionHeader.decorationThickness,
            height: tokens.sectionHeader.decorationGap,
          }} />
        )}
        
        {/* 右侧装饰条 */}
        {align === 'right' && showDecoration && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{
            backgroundColor: tokens.colors.primary,
            borderRadius: '2px',
            width: tokens.sectionHeader.decorationThickness,
            height: tokens.sectionHeader.decorationGap,
          }} />
        )}
        
        {/* 底部装饰条 */}
        {align === 'bottom' && showDecoration && (
          <div className="absolute bottom-0 left-0 right-0" style={{
            backgroundColor: tokens.colors.primary,
            borderRadius: '2px',
            height: tokens.sectionHeader.decorationThickness,
          }} />
        )}
        
        {/* 标题文字 */}
        <div style={{ 
          color: tokens.sectionHeader.titleColor,
          fontSize: tokens.sectionHeader.titleSize,
          fontWeight: tokens.sectionHeader.titleWeight,
        }}>
          {title}
        </div>
      </div>
      
      {/* 查看更多按钮 */}
      {onMoreClick && (
        <button 
          onClick={onMoreClick}
          style={{ 
            fontSize: tokens.typography.bodySize, 
            lineHeight: tokens.typography.lineHeight, 
            color: tokens.colors.textSecondary 
          }}
        >
          查看全部 ›
        </button>
      )}
    </div>
  )
}
