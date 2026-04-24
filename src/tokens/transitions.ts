/**
 * 动画系统
 * 全局共享的动画和过渡设计令牌
 */

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const

export type TransitionToken = typeof transitions
