/**
 * 主题管理 Hook
 * 
 * 提供亮色/暗色模式切换功能
 */

import { useState, useEffect } from 'react'
import { colors, editorTokens } from '../tokens'
import { darkColors, darkEditorTokens } from '../tokens/dark-mode'

export type ThemeMode = 'light' | 'dark'

interface ThemeTokens {
  colors: typeof colors | typeof darkColors
  editorTokens: typeof editorTokens | typeof darkEditorTokens
}

const themeMap: Record<ThemeMode, ThemeTokens> = {
  light: { colors, editorTokens },
  dark: { colors: darkColors, editorTokens: darkEditorTokens },
}

/**
 * 主题管理 Hook
 * 
 * @returns 当前主题和切换函数
 * 
 * @example
 * ```tsx
 * const { mode, tokens, toggleTheme } = useTheme()
 * 
 * return (
 *   <div style={{ backgroundColor: tokens.colors.background.page }}>
 *     <button onClick={toggleTheme}>
 *       {mode === 'light' ? '切换暗色' : '切换亮色'}
 *     </button>
 *   </div>
 * )
 * ```
 */
export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // 从 localStorage 读取主题偏好
    const saved = localStorage.getItem('theme-mode')
    return (saved as ThemeMode) || 'light'
  })

  // 应用主题到 document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setTheme = (theme: ThemeMode) => {
    setMode(theme)
  }

  return {
    mode,
    tokens: themeMap[mode],
    toggleTheme,
    setTheme,
  }
}
