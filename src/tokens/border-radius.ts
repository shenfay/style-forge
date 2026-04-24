/**
 * 圆角系统
 * 全局共享的圆角设计令牌
 */

export const borderRadius = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '12px',
  xl: '20px',
  pill: '999px',
} as const

export type BorderRadiusToken = typeof borderRadius
