/**
 * 阴影系统
 * 全局共享的阴影设计令牌
 */

export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.04)',
  md: '0 2px 8px rgba(0,0,0,0.06)',
  lg: '0 4px 12px rgba(0,0,0,0.08)',
  xl: '0 8px 24px rgba(0,0,0,0.12)',
  '2xl': '0 16px 48px rgba(0,0,0,0.16)',
} as const

export type ShadowToken = typeof shadows
