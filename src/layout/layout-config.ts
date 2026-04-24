/**
 * 应用级布局配置
 * 定义全局布局规范
 */

import { spacing } from '../tokens/spacing'
import { colors } from '../tokens/colors'

export const layoutConfig = {
  // 顶栏配置
  header: {
    height: '60px',
    padding: `0 ${spacing.lg}`,
    backgroundColor: colors.white,
    borderColor: colors.border.light,
  },

  // 侧边栏配置
  sidebar: {
    width: '240px',
    padding: spacing.lg,
    backgroundColor: colors.gray[50],
    borderColor: colors.border.light,
  },

  // 面板配置
  panel: {
    width: '320px',
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderColor: colors.border.light,
  },

  // 预览区配置
  preview: {
    padding: spacing.xl,
    backgroundColor: colors.gray[50],
  },

  // 主内容区配置
  main: {
    padding: spacing.xl,
    backgroundColor: colors.gray[50],
  },
} as const

export type LayoutConfig = typeof layoutConfig
