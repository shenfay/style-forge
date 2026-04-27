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
      <div style={{ fontSize: '13px', fontWeight: 500, color: colors.gray[600] }}>
        {label}
      </div>
      {children}
    </div>
  )
}
