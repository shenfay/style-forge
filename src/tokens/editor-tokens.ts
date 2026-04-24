/**
 * 编辑器专属设计令牌
 * Designer 模块特有的样式配置
 */

import { colors } from './colors'
import { spacing } from './spacing'
import { borderRadius } from './border-radius'

export const editorTokens = {
  // 编辑器布局
  layout: {
    sidebar: {
      width: '240px',
      padding: spacing.lg,
      backgroundColor: colors.gray[50],
      borderColor: colors.border.light,
    },
    panel: {
      width: '320px',
      padding: spacing.lg,
      backgroundColor: colors.white,
      borderColor: colors.border.light,
    },
    header: {
      height: '60px',
      padding: `0 ${spacing.lg}`,
      backgroundColor: colors.white,
      borderColor: colors.border.light,
    },
    preview: {
      padding: spacing.xl,
      backgroundColor: colors.gray[50],
    },
  },

  // 编辑器组件样式
  components: {
    menuItem: {
      padding: `${spacing.sm} ${spacing.md}`,
      activeBackgroundColor: 'rgba(0,0,0,0.03)',
      hoverBackgroundColor: 'rgba(0,0,0,0.05)',
      activeColor: colors.gray[900],
      inactiveColor: colors.gray[600],
    },
    button: {
      primary: {
        backgroundColor: colors.gray[800],
        color: colors.white,
        borderRadius: borderRadius.md,
      },
      secondary: {
        backgroundColor: colors.gray[100],
        color: colors.gray[800],
        borderRadius: borderRadius.md,
      },
    },
    sectionHeader: {
      paddingBottom: spacing.md,
      marginBottom: spacing.lg,
      borderColor: colors.border.light,
    },
  },
} as const

export type EditorTokens = typeof editorTokens
