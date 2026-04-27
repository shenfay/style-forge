/**
 * 滑块选择器组件
 * 用于范围选择的配置项
 */

import React from 'react'
import { colors, fontSize, spacing } from '../../../../tokens'
import { ConfigItem } from './ConfigItem'

interface Option {
  label: string
  value: string
}

interface RangeSliderProps {
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export function RangeSlider({ label, options, value, onChange }: RangeSliderProps) {
  const currentIndex = options.findIndex(opt => opt.value === value)
  const progress = options.length > 1 ? (currentIndex / (options.length - 1)) * 100 : 0

  return (
    <ConfigItem label={label}>
      <div className="space-y-3">
        <div className="relative">
          <input
            type="range"
            min="0"
            max={options.length - 1}
            step="1"
            value={currentIndex}
            onChange={(e) => onChange(options[parseInt(e.target.value)].value)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${colors.gray[800]} 0%, ${colors.gray[800]} ${progress}%, ${colors.border.light} ${progress}%, ${colors.border.light} 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between" style={{ color: colors.text.secondary, fontSize: fontSize.sm }}>
          {options.map((opt, idx) => (
            <span key={idx}>{opt.label}</span>
          ))}
        </div>
      </div>
    </ConfigItem>
  )
}
