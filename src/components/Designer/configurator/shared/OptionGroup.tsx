/**
 * 选项组组件
 * 用于按钮选项组的统一渲染
 */

import React from 'react'
import { colors, borderRadius, fontSize, fontWeight } from '../../../../tokens'
import { ConfigItem } from './ConfigItem'

interface Option {
  label: string
  value: string
  icon?: string
}

interface OptionGroupProps {
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  columns?: 2 | 3
}

export function OptionGroup({ label, options, value, onChange, columns = 3 }: OptionGroupProps) {
  return (
    <ConfigItem label={label}>
      <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="px-3 py-3 text-sm rounded-lg transition-all flex flex-col items-center gap-1.5 font-normal cursor-pointer"
            style={{
              backgroundColor: value === opt.value ? colors.gray[800] : 'transparent',
              color: value === opt.value ? colors.white : colors.text.secondary,
              border: value === opt.value ? 'none' : `1px solid ${colors.border.light}`,
              borderRadius: borderRadius.sm,
            }}
          >
            {opt.icon && <span className="text-lg">{opt.icon}</span>}
            <span style={{ fontSize: fontSize.base }}>{opt.label}</span>
          </button>
        ))}
      </div>
    </ConfigItem>
  )
}
