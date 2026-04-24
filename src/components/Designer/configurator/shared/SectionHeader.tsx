/**
 * 配置区域头部组件
 * 统一的区域标题样式
 */

import React from 'react'
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../../../tokens'

interface SectionHeaderProps {
  number: string
  title: string
  icon?: React.ReactNode
}

export function SectionHeader({ number, title, icon }: SectionHeaderProps) {
  return (
    <div className="pb-4 mb-6" style={{ borderBottom: `1px solid ${colors.border.light}` }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: colors.gray[800], borderRadius: borderRadius.sm }}
          >
            {number}
          </div>
          <div className="text-base font-medium" style={{ color: colors.text.primary, fontSize: fontSize.xl, fontWeight: fontWeight.medium }}>
            {title}
          </div>
        </div>
        {icon && (
          <div className="flex items-center gap-2">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
