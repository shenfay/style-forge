/**
 * LanguageSwitcher - 语言切换下拉组件
 *
 * 单个下拉按钮，显示当前语言标记，
 * 展开后提供 zh-CN / en-US 切换选项。
 */

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en-US', label: 'EN' },
] as const

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer select-none"
        style={{
          backgroundColor: '#373737',
          color: '#FBFBFB',
        }}
      >
        {currentLang.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 py-0.5 min-w-[72px] rounded-md overflow-hidden z-50"
          style={{
            backgroundColor: '#1C1C1C',
            border: '1px solid #333333',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code)
                setOpen(false)
              }}
              className="w-full text-left px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
              style={{
                color: i18n.language === lang.code ? '#FBFBFB' : '#71717A',
                backgroundColor: i18n.language === lang.code ? '#373737' : 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = i18n.language === lang.code ? '#373737' : '#2A2A2A'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = i18n.language === lang.code ? '#373737' : 'transparent'
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
