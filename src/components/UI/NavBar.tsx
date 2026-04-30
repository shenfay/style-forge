import type { StyleConfig } from '../../types/config'
import { colors, fontSize, fontWeight, createGradient, withOpacity } from '../../utils/tokenResolver'

interface NavBarProps {
  config: StyleConfig
  title: string
  showBack?: boolean
  showSearch?: boolean
  onBack?: () => void
  onSearch?: () => void
}

export function NavBar({ 
  config, 
  title, 
  showBack = false, 
  showSearch = false,
  onBack,
  onSearch 
}: NavBarProps) {
  const isColoredBg = config.titleBarStyle === 'colored-bg'
  const textColor = isColoredBg ? colors.white : colors.text.primary
  const iconColor = isColoredBg ? colors.white : config.primaryColor

  return (
    <div 
      className="flex items-center justify-between px-6 py-3" 
      style={{
        borderBottom: config.titleBarStyle === 'white-underline' ? `1px solid ${colors.border.light}` : 'none',
        background: isColoredBg ? config.primaryColor : 'transparent',
      }}
    >
      {showBack ? (
        <button 
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          onClick={onBack}
          style={{ color: iconColor }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      ) : (
        <span className="text-[16px] font-semibold" style={{ color: textColor, fontSize: fontSize.xl, fontWeight: fontWeight.semibold }}>
          {title}
        </span>
      )}

      {!showBack && !showSearch && (
        <span className="flex-1 text-center text-[16px] font-semibold" style={{ color: textColor, fontSize: fontSize.xl, fontWeight: fontWeight.semibold }}>
          {title}
        </span>
      )}

      {showSearch && (
        <button 
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          onClick={onSearch}
          style={{ color: iconColor }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      )}

      {showBack && <div className="w-9" />}
    </div>
  )
}
