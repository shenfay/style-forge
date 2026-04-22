/**
 * 设计令牌系统
 * 统一管理颜色、圆角、间距、阴影等设计常量
 */

// 颜色系统
export const colors = {
  // 中性色
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // 文本色
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    tertiary: '#999999',
  },
  
  // 边框色
  border: {
    light: '#E5E5E5',
    medium: '#D4D4D4',
  },
  
  // 背景色
  background: {
    page: '#FAFAFA',
    card: '#FFFFFF',
  },
} as const

// 圆角映射
export const borderRadius = {
  small: '6px',
  medium: '12px',
  large: '20px',
  pill: '999px',
} as const

// 阴影系统
export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.04)',
  md: '0 2px 8px rgba(0,0,0,0.06)',
  lg: '0 4px 12px rgba(0,0,0,0.08)',
  xl: '0 8px 24px rgba(0,0,0,0.12)',
  '2xl': '0 16px 48px rgba(0,0,0,0.16)',
} as const

// 间距系统
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const

// 字体大小
export const fontSize = {
  xs: '10px',
  sm: '11px',
  base: '13px',
  lg: '14px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '22px',
} as const

// 字体粗细
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

// 过渡动画
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// 辅助函数:获取圆角值
export function getBorderRadius(size: 'small' | 'medium' | 'large'): string {
  return borderRadius[size]
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
        ? (isLargeShape ? shadows.lg : isCompactShape ? shadows.sm : shadows.md)
        : 'none',
      border: config.cardStyle === 'border' ? `1px solid ${colors.border.light}` : 'none',
      backgroundColor: config.cardBackgroundColor || colors.background.card,
      // 联动：大圆角时增加内边距
      padding: isLargeShape ? spacing.md : isCompactShape ? spacing.sm : spacing.sm,
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
      color: config.buttonStyle === 'wireframe' ? config.primaryColor : colors.white,
      // 联动：大圆角时增加按钮内边距，更饱满
      padding: isLargeShape ? '12px 24px' : isCompactShape ? '6px 12px' : '8px 16px',
      // 联动：根据字重配置调整按钮文字
      fontWeight: config.titleWeight === 'bold' ? fontWeight.bold : fontWeight.medium,
    },
    
    // Tag/Badge 组件
    tag: {
      borderRadius: config.badgeStyle === 'rounded' ? borderRadius.pill : borderRadius.small,
      backgroundColor: withOpacity(config.primaryColor, 0.1),
      color: config.primaryColor,
    },
    
    // SectionHeader 组件
    sectionHeader: {
      titleSize: config.titleSize === 'small' ? fontSize.xl : config.titleSize === 'large' ? fontSize['3xl'] : fontSize['2xl'],
      titleWeight: config.titleWeight === 'bold' ? fontWeight.bold : config.titleWeight === 'medium' ? fontWeight.semibold : fontWeight.medium,
      titleColor: config.titleColor || colors.text.primary,
      decoration: config.titleStyle,
      // 联动：大标题时增加装饰线粗度和间距
      decorationThickness: config.titleSize === 'large' ? '3px' : '2px',
      decorationGap: config.titleSize === 'large' ? '16px' : '12px',
    },
    
    // Typography 组件
    typography: {
      bodySize: config.bodySize === 'small' ? fontSize.sm : config.bodySize === 'large' ? fontSize.lg : fontSize.base,
      lineHeight: config.lineHeight === 'compact' ? '1.4' : config.lineHeight === 'relaxed' ? '2.0' : '1.6',
      // 联动：宽松行高时增加段落间距
      paragraphGap: config.lineHeight === 'relaxed' ? spacing.md : spacing.sm,
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
