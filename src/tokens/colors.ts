/**
 * 颜色系统
 * 全局共享的颜色设计令牌
 */

export const colors = {
  // 中性色
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    25: '#FCFCFC',
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

export type ColorToken = typeof colors
