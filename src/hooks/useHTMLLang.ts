/**
 * useHTMLLang - 同步 HTML lang 属性到当前 i18n 语言
 */

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useHTMLLang() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])
}
