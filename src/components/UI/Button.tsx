/**
 * 通用按钮组件
 * 基于设计令牌的按钮实现
 */

import React from 'react'
import { colors } from '../../tokens/colors'
import { borderRadius } from '../../tokens/border-radius'
import { fontWeight } from '../../tokens/typography'
import { transitions } from '../../tokens/transitions'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体 */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否加载中 */
  loading?: boolean
  /** 自定义样式 */
  style?: React.CSSProperties
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  style,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: fontWeight.medium,
    borderRadius: borderRadius.md,
    transition: transitions.base,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.gray[800],
      color: colors.white,
    },
    secondary: {
      backgroundColor: colors.gray[100],
      color: colors.gray[800],
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.gray[700],
    },
  }

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '6px 12px',
      fontSize: '12px',
    },
    md: {
      padding: '8px 16px',
      fontSize: '13px',
    },
    lg: {
      padding: '12px 24px',
      fontSize: '14px',
    },
  }

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    opacity: disabled || loading ? 0.5 : 1,
    ...style,
  }

  return (
    <button
      className={className}
      style={combinedStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}
