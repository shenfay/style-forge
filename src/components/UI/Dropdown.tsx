/**
 * 通用下拉菜单组件
 * 基于设计令牌的实现
 */

import React, { useState, useRef, useEffect } from 'react'
import { colors } from '../../tokens/colors'
import { borderRadius } from '../../tokens/border-radius'
import { shadows } from '../../tokens/shadows'

interface DropdownProps {
  /** 触发按钮内容 */
  trigger: React.ReactNode
  /** 下拉菜单内容 */
  children: React.ReactNode
  /** 对齐方式 */
  align?: 'left' | 'right'
  /** 自定义样式 */
  className?: string
}

export function Dropdown({ trigger, children, align = 'left', className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* 触发按钮 */}
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {/* 下拉菜单 */}
      {isOpen && (
        <div
          className="absolute top-full mt-2 bg-white rounded-lg shadow-lg border py-2 z-50"
          style={{
            [align === 'left' ? 'left' : 'right']: 0,
            borderRadius: borderRadius.lg,
            boxShadow: shadows.lg,
            borderColor: colors.border.light,
            minWidth: '192px',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function DropdownItem({ children, className = '', style, ...props }: DropdownItemProps) {
  const baseStyles: React.CSSProperties = {
    width: '100%',
    padding: '8px 16px',
    textAlign: 'left',
    fontSize: '13px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }

  return (
    <button
      className={className}
      style={{ ...baseStyles, ...style }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.gray[50]
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownDivider() {
  return (
    <div
      className="my-2"
      style={{
        borderTop: `1px solid ${colors.border.light}`,
      }}
    />
  )
}
