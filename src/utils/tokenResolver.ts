/**
 * 设计令牌工具
 * 提供令牌辅助函数和组件令牌生成器
 * 所有基础令牌从 src/tokens/ 导入，保持单一数据源
 */

// 颜色系统
import { colors as _colors } from '../tokens/colors'
export { _colors as colors }
export type { ColorToken } from '../tokens/colors'

// 圆角系统
import { borderRadius as _borderRadius } from '../tokens/border-radius'
export { _borderRadius as borderRadius }
export type { BorderRadiusToken } from '../tokens/border-radius'

// 阴影系统
import { shadows as _shadows } from '../tokens/shadows'
export { _shadows as shadows }
export type { ShadowToken } from '../tokens/shadows'

// 间距系统
import { spacing as _spacing } from '../tokens/spacing'
export { _spacing as spacing }
export type { SpacingToken } from '../tokens/spacing'

// 字体系统
import { fontSize as _fontSize, fontWeight as _fontWeight, lineHeight as _lineHeight } from '../tokens/typography'
export { _fontSize as fontSize, _fontWeight as fontWeight, _lineHeight as lineHeight }
export type { FontSizeToken, FontWeightToken, LineHeightToken } from '../tokens/typography'

// 过渡动画
import { transitions as _transitions } from '../tokens/transitions'
export { _transitions as transitions }
export type { TransitionToken } from '../tokens/transitions'

// 辅助函数:获取圆角值
export function getBorderRadius(size: 'small' | 'medium' | 'large'): string {
  const mapping = { small: 'sm' as const, medium: 'md' as const, large: 'lg' as const }
  return _borderRadius[mapping[size]]
}

// 辅助函数:生成主题色透明度
export function withOpacity(color: string, opacity: number): string {
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0')
  return `${color}${alpha}`
}

// 辅助函数:生成渐变
export function createGradient(color: string, direction: '135deg' | '180deg' | '90deg' = '135deg'): string {
  return `linear-gradient(${direction}, ${color}, ${withOpacity(color, 0.8)})`
}

// === 组件令牌生成器 ===
// 将 StyleConfig 映射为组件可用的样式值
import type { StyleConfig } from '../types/config'

export const generateComponentTokens = (config: StyleConfig) => {
  // 配置联动：根据形状配置自动调整其他相关属性
  const isLargeShape = config.cornerRadius === 'large'
  const isCompactShape = config.cornerRadius === 'small'
  
  return {
    // Card 组件
    card: {
      borderRadius: getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large'),
      // 联动：大圆角时使用更强的阴影，增加视觉层次
      boxShadow: config.cardStyle === 'shadow' 
        ? (isLargeShape ? _shadows.lg : isCompactShape ? _shadows.sm : _shadows.md)
        : 'none',
      border: config.cardStyle === 'border' ? `1px solid ${_colors.border.light}` : 'none',
      backgroundColor: config.cardBackgroundColor || _colors.background.card,
      // 联动：大圆角时增加内边距
      padding: isLargeShape ? _spacing.md : isCompactShape ? _spacing.sm : _spacing.sm,
    },
    
    // Button 组件
    button: {
      borderRadius: getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large'),
      backgroundColor: config.buttonStyle === 'gradient' 
        ? createGradient(config.primaryColor)
        : config.buttonStyle === 'wireframe'
        ? 'transparent'
        : config.primaryColor,
      border: config.buttonStyle === 'wireframe' ? `2px solid ${config.primaryColor}` : 'none',
      color: config.buttonStyle === 'wireframe' ? config.primaryColor : _colors.white,
      // 联动：大圆角时增加按钮内边距，更饱满
      padding: isLargeShape ? '12px 24px' : isCompactShape ? '6px 12px' : '8px 16px',
      // 联动：根据字重配置调整按钮文字
      fontWeight: config.titleWeight === 'bold' ? _fontWeight.bold : _fontWeight.medium,
    },
    
    // Tag/Badge 组件
    tag: {
      borderRadius: config.badgeStyle === 'rounded' ? _borderRadius.pill : _borderRadius.sm,
      backgroundColor: withOpacity(config.primaryColor, 0.1),
      color: config.primaryColor,
    },
    
    // SectionHeader 组件
    sectionHeader: {
      titleSize: config.titleSize === 'small' ? _fontSize.xl : config.titleSize === 'large' ? _fontSize['3xl'] : _fontSize['2xl'],
      titleWeight: config.titleWeight === 'bold' ? _fontWeight.bold : config.titleWeight === 'medium' ? _fontWeight.semibold : _fontWeight.medium,
      titleColor: config.titleColor || _colors.text.primary,
      decoration: config.titleStyle,
      // 联动：大标题时增加装饰线粗度和间距
      decorationThickness: config.titleSize === 'large' ? '4px' : '3px',
      decorationGap: config.titleSize === 'large' ? '18px' : '14px',
    },
    
    // Typography 组件
    typography: {
      bodySize: config.bodySize === 'small' ? _fontSize.sm : config.bodySize === 'large' ? _fontSize.lg : _fontSize.base,
      lineHeight: config.lineHeight === 'compact' ? '1.4' : config.lineHeight === 'relaxed' ? '2.0' : '1.6',
      // 联动：宽松行高时增加段落间距
      paragraphGap: config.lineHeight === 'relaxed' ? _spacing.md : _spacing.sm,
    },
    
    // 颜色系统
    colors: {
      primary: config.primaryColor,
      secondary: config.secondaryColor,
      accent: config.accentColor,
      background: config.backgroundColor,
      textPrimary: config.textPrimary,
      textSecondary: config.textSecondary,
    },
  }
}
