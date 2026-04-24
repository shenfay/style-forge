/**
 * 字体系统
 * 全局共享的字体设计令牌
 */

export const fontSize = {
  xs: '10px',
  sm: '11px',
  base: '13px',
  lg: '14px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '22px',
} as const

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

export const lineHeight = {
  tight: '1.3',
  normal: '1.5',
  relaxed: '1.8',
} as const

export type FontSizeToken = typeof fontSize
export type FontWeightToken = typeof fontWeight
export type LineHeightToken = typeof lineHeight
