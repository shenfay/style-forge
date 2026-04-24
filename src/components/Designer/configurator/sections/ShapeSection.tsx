/**
 * 形状系统配置区域
 */

import React from 'react'
import type { StyleConfig } from '../../../../types/config'
import { SectionHeader, OptionGroup, RangeSlider } from '../shared'

interface ShapeSectionProps {
  config: StyleConfig
  onChange: (key: keyof StyleConfig, value: string) => void
}

export function ShapeSection({ config, onChange }: ShapeSectionProps) {
  return (
    <div>
      <SectionHeader
        number="02"
        title="形状系统"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#999999' }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
        }
      />
      <div className="space-y-6">
        <RangeSlider
          label="圆角半径"
          options={[
            { label: '小 (4px)', value: 'small' },
            { label: '中 (8px)', value: 'medium' },
            { label: '大 (12px)', value: 'large' },
          ]}
          value={config.cornerRadius}
          onChange={(value) => onChange('cornerRadius', value)}
        />

        <OptionGroup
          label="卡片样式"
          options={[
            { label: '边框', icon: '▭', value: 'border' },
            { label: '阴影', icon: '▱', value: 'shadow' },
            { label: '无边', icon: '□', value: 'borderless' },
          ]}
          value={config.cardStyle}
          onChange={(value) => onChange('cardStyle', value)}
        />

        <OptionGroup
          label="按钮样式"
          options={[
            { label: '渐变', icon: '▰', value: 'gradient' },
            { label: '纯色', icon: '■', value: 'solid' },
            { label: '线框', icon: '▢', value: 'wireframe' },
          ]}
          value={config.buttonStyle}
          onChange={(value) => onChange('buttonStyle', value)}
        />

        <OptionGroup
          label="标签样式"
          options={[
            { label: '圆角', icon: '●', value: 'rounded' },
            { label: '文字', icon: 'T', value: 'text-only' },
          ]}
          value={config.badgeStyle}
          onChange={(value) => onChange('badgeStyle', value)}
          columns={2}
        />

        <OptionGroup
          label="标题栏样式"
          options={[
            { label: '下划线', icon: '▁', value: 'white-underline' },
            { label: '毛玻璃', icon: '▤', value: 'frosted-glass' },
            { label: '背景色', icon: '■', value: 'colored-bg' },
          ]}
          value={config.titleBarStyle}
          onChange={(value) => onChange('titleBarStyle', value)}
        />

        <OptionGroup
          label="切换器样式"
          options={[
            { label: '下划线', icon: '▁', value: 'underline' },
            { label: '药丸', icon: '▬', value: 'pill' },
            { label: '胶囊', icon: '⬮', value: 'capsule' },
          ]}
          value={config.switcherStyle}
          onChange={(value) => onChange('switcherStyle', value)}
        />
      </div>
    </div>
  )
}
