/**
 * 通用输入框组件
 * 基于设计令牌的实现
 */

import React from 'react'
import { colors } from '../../tokens/colors'
import { borderRadius } from '../../tokens/border-radius'
import { fontSize, fontWeight } from '../../tokens/typography'
import { transitions } from '../../tokens/transitions'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 标签文本 */
  label?: string
  /** 错误信息 */
  error?: string
  /** 输入框尺寸 */
  inputSize?: 'sm' | 'md' | 'lg'
  /** 自定义样式 */
  style?: React.CSSProperties
}

export function Input({
  label,
  error,
  inputSize = 'md',
  style,
  className = '',
  ...props
}: InputProps) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '6px 12px',
      fontSize: fontSize.sm,
    },
    md: {
      padding: '8px 12px',
      fontSize: fontSize.base,
    },
    lg: {
      padding: '12px 16px',
      fontSize: fontSize.lg,
    },
  }

  const baseStyles: React.CSSProperties = {
    width: '100%',
    borderRadius: borderRadius.sm,
    border: `1px solid ${error ? '#DC2626' : colors.border.light}`,
    backgroundColor: colors.white,
    color: colors.text.primary,
    fontWeight: fontWeight.normal,
    transition: transitions.base,
    outline: 'none',
    ...sizeStyles[inputSize],
    ...style,
  }

  return (
    <div className={className}>
      {label && (
        <label
          className="block mb-2"
          style={{
            fontSize: fontSize.base,
            fontWeight: fontWeight.medium,
            color: colors.text.primary,
          }}
        >
          {label}
        </label>
      )}
      <input
        style={baseStyles}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = colors.gray[800]
          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(0,0,0,0.05)`
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? '#DC2626' : colors.border.light
          e.currentTarget.style.boxShadow = 'none'
        }}
        {...props}
      />
      {error && (
        <p
          className="mt-1"
          style={{
            fontSize: fontSize.sm,
            color: '#DC2626',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
