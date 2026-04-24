/**
 * 配置项容器组件
 * 统一的配置项布局结构
 */

import React from 'react'
import { colors, fontSize, fontWeight } from '../../../../tokens'

interface ConfigItemProps {
  label: string
  children: React.ReactNode
}

export function ConfigItem({ label, children }: ConfigItemProps) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-normal" style={{ color: colors.text.secondary, fontSize: fontSize.base }}>
        {label}
      </div>
      {children}
    </div>
  )
}
