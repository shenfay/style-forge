/**
 * 间距系统配置区域
 */

import React from 'react'
import type { StyleConfig } from '../../../../types/config'
import { SectionHeader, RangeSlider } from '../shared'

interface SpacingSectionProps {
  config: StyleConfig
  onChange: (key: keyof StyleConfig, value: string) => void
}

export function SpacingSection({ config, onChange }: SpacingSectionProps) {
  return (
    <div>
      <SectionHeader
        number="03"
        title="间距系统"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#999999' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 16v4m0 0h4m16-12V4m0 0h-4m4 12v4m0 0h-4" />
          </svg>
        }
      />
      <div className="space-y-6">
        <RangeSlider
          label="内边距"
          options={[
            { label: '紧凑', value: 'compact' },
            { label: '适中', value: 'medium' },
            { label: '宽松', value: 'relaxed' },
          ]}
          value={config.padding}
          onChange={(value) => onChange('padding', value)}
        />

        <RangeSlider
          label="卡片间距"
          options={[
            { label: '小', value: 'small' },
            { label: '中', value: 'medium' },
            { label: '大', value: 'large' },
          ]}
          value={config.cardGap}
          onChange={(value) => onChange('cardGap', value)}
        />

        <RangeSlider
          label="区块间距"
          options={[
            { label: '小', value: 'small' },
            { label: '中', value: 'medium' },
            { label: '大', value: 'large' },
          ]}
          value={config.sectionGap}
          onChange={(value) => onChange('sectionGap', value)}
        />

        <RangeSlider
          label="元素间距"
          options={[
            { label: '紧凑', value: 'compact' },
            { label: '适中', value: 'medium' },
            { label: '宽松', value: 'relaxed' },
          ]}
          value={config.elementGap}
          onChange={(value) => onChange('elementGap', value)}
        />
      </div>
    </div>
  )
}
