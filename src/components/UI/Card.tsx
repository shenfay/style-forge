import type { StyleConfig } from '../../types/config'
import { colors, getBorderRadius, shadows } from '../../utils/design-tokens'

interface CardProps {
  config: StyleConfig
  children: React.ReactNode
  className?: string
  interactive?: boolean
  variant?: 'default' | 'gradient'
}

export function Card({ 
  config, 
  children, 
  className = '',
  interactive = false,
  variant = 'default'
}: CardProps) {
  const radius = getBorderRadius(config.cornerRadius as 'small' | 'medium' | 'large')
  
  const baseStyle = {
    borderRadius: radius,
    background: variant === 'gradient' 
      ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)` 
      : colors.background.card,
    border: config.cardStyle === 'border' ? `1px solid ${colors.border.light}` : 'none',
    boxShadow: config.cardStyle === 'shadow' ? shadows.md : 'none',
  }

  const interactiveClass = interactive ? 'card-interactive' : ''

  return (
    <div 
      className={`${interactiveClass} ${className}`.trim()} 
      style={baseStyle}
    >
      {children}
    </div>
  )
}
