/**
 * 颜色选择器字段组件
 * 集成 ChromePicker 的颜色配置项
 */

import React, { useState, useRef, useEffect } from 'react'
import { ChromePicker } from 'react-color'
import { colors, borderRadius, spacing } from '../../../../tokens'
import { ConfigItem } from './ConfigItem'

interface ColorPickerFieldProps {
  label: string
  value: string
  colorKey: string
  onChange: (key: string, value: string) => void
}

export function ColorPickerField({ label, value, colorKey, onChange }: ColorPickerFieldProps) {
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭颜色选择器
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false)
      }
    }

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside, true)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [showPicker])

  return (
    <ConfigItem label={label}>
      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg cursor-pointer border-2 transition-all hover:scale-105"
            style={{
              backgroundColor: value,
              borderColor: colors.border.light,
              borderRadius: borderRadius.sm,
            }}
            onClick={() => setShowPicker(!showPicker)}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(colorKey, e.target.value)}
            className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border transition-all"
            style={{
              borderColor: colors.border.light,
              borderRadius: borderRadius.sm,
              color: colors.text.primary,
            }}
          />
        </div>

        {/* ChromePicker 颜色选择器 */}
        {showPicker && (
          <div className="absolute z-50 mt-2" ref={pickerRef}>
            <ChromePicker
              color={value}
              onChange={(color) => onChange(colorKey, color.hex)}
              disableAlpha={true}
            />
          </div>
        )}
      </div>
    </ConfigItem>
  )
}
