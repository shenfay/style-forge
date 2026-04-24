/**
 * 色彩系统配置区域
 */

import React, { memo, useCallback } from 'react'
import type { StyleConfig } from '../../../../types/config'
import { SectionHeader, ColorPickerField } from '../shared'

interface ColorsSectionProps {
  config: StyleConfig
  onChange: (key: keyof StyleConfig, value: string) => void
}

export const ColorsSection = memo(function ColorsSection({ config, onChange }: ColorsSectionProps) {
  return (
    <div>
      <SectionHeader
        number="01"
        title="色彩系统"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#999999' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        }
      />
      <div className="space-y-6">
        <ColorPickerField
          label="主色"
          value={config.primaryColor}
          colorKey="primaryColor"
          onChange={(key, value) => onChange(key as keyof StyleConfig, value)}
        />

        <ColorPickerField
          label="背景色"
          value={config.backgroundColor}
          colorKey="backgroundColor"
          onChange={(key, value) => onChange(key as keyof StyleConfig, value)}
        />

        <ColorPickerField
          label="标题颜色"
          value={config.titleColor}
          colorKey="titleColor"
          onChange={(key, value) => onChange(key as keyof StyleConfig, value)}
        />
      </div>
    </div>
  )
})
