/**
 * 可视化选项组组件
 * 用于形状、样式等需要视觉预览的配置项
 */

import React from 'react'
import { colors, borderRadius, fontSize } from '../../../../tokens'
import { ConfigItem } from './ConfigItem'

interface VisualOption {
  label: string
  value: string
  preview: React.ReactNode
}

interface VisualOptionGroupProps {
  label: string
  options: VisualOption[]
  value: string
  onChange: (value: string) => void
  columns?: 2 | 3
}

export function VisualOptionGroup({ label, options, value, onChange, columns = 3 }: VisualOptionGroupProps) {
  return (
    <ConfigItem label={label}>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="flex flex-col items-center gap-1.5 cursor-pointer overflow-hidden"
            style={{
              padding: '8px',
              backgroundColor: value === opt.value ? '#ECEAE5' : colors.white,
              color: value === opt.value ? '#1A1A1A' : colors.text.secondary,
              border: value === opt.value ? 'none' : `1px solid ${colors.border.light}`,
              borderRadius: borderRadius.sm,
            }}
          >
            <div className="w-full flex items-center justify-center" style={{ minHeight: '32px' }}>
              {opt.preview}
            </div>
            <span style={{ fontSize: fontSize.sm, fontWeight: 400 }}>{opt.label}</span>
          </button>
        ))}
      </div>
    </ConfigItem>
  )
}
