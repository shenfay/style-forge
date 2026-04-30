import { colors, fontSize } from '../../utils/tokenResolver'

interface StatusBarProps {
  time?: string
}

export function StatusBar({ time = '9:41' }: StatusBarProps) {
  return (
    <div className="flex justify-between items-center px-6 pt-4 pb-2" style={{ color: colors.text.tertiary }}>
      <span style={{ fontSize: fontSize.sm }}>{time}</span>
      <div className="flex items-center gap-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
        </svg>
      </div>
    </div>
  )
}
