/**
 * 暗色模式设计令牌
 * 
 * 基于亮色模式 tokens 扩展，保持相同的结构但使用暗色配色
 */

export const darkColors = {
  white: '#FFFFFF',
  black: '#0A0A0A',
  gray: {
    50: '#1A1A1A',
    100: '#262626',
    200: '#404040',
    300: '#525252',
    400: '#737373',
    500: '#A3A3A3',
    600: '#D4D4D4',
    700: '#E5E5E5',
    800: '#F5F5F5',
    900: '#FAFAFA',
  },
  text: {
    primary: '#FAFAFA',
    secondary: '#A3A3A3',
    tertiary: '#737373',
  },
  border: {
    light: '#262626',
    medium: '#404040',
  },
  background: {
    page: '#0A0A0A',
    card: '#1A1A1A',
  },
} as const

export const darkEditorTokens = {
  layout: {
    sidebar: {
      width: '240px',
      padding: '20px',
      backgroundColor: darkColors.gray[50],
      borderColor: darkColors.border.light,
    },
    panel: {
      width: '320px',
      padding: '20px',
      backgroundColor: darkColors.gray[100],
      borderColor: darkColors.border.light,
    },
    header: {
      height: '60px',
      padding: '0 20px',
      backgroundColor: darkColors.gray[100],
      borderColor: darkColors.border.light,
    },
  },
  components: {
    menuItem: {
      padding: '10px 12px',
      activeBackgroundColor: 'rgba(255,255,255,0.05)',
      hoverBackgroundColor: 'rgba(255,255,255,0.08)',
    },
    button: {
      primary: {
        backgroundColor: darkColors.gray[800],
        color: darkColors.gray[50],
        borderRadius: '8px',
      },
      secondary: {
        backgroundColor: darkColors.gray[100],
        color: darkColors.gray[800],
        borderRadius: '8px',
      },
    },
  },
} as const
