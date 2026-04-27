/**
 * 形状系统配置区域
 */

import React, { memo } from 'react'
import type { StyleConfig } from '../../../../types/config'
import { SectionHeader, RangeSlider, VisualOptionGroup } from '../shared'

interface ShapeSectionProps {
  config: StyleConfig
  onChange: (key: keyof StyleConfig, value: string) => void
}

export const ShapeSection = memo(function ShapeSection({ config, onChange }: ShapeSectionProps) {
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
            { label: '0', value: 'none' },
            { label: '小 (4px)', value: 'small' },
            { label: '中 (8px)', value: 'medium' },
            { label: '大 (12px)', value: 'large' },
          ]}
          value={config.cornerRadius}
          onChange={(value) => onChange('cornerRadius', value)}
        />

        <VisualOptionGroup
          label="卡片样式"
          options={[
            {
              label: '边框',
              value: 'border',
              preview: (
                <svg width="32" height="24" viewBox="0 0 32 24">
                  <rect x="2" y="2" width="28" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ),
            },
            {
              label: '阴影',
              value: 'shadow',
              preview: (
                <svg width="32" height="24" viewBox="0 0 32 24">
                  <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <rect x="2" y="2" width="28" height="20" rx="4" fill="currentColor" filter="url(#shadow)" opacity="0.3"/>
                </svg>
              ),
            },
            {
              label: '无边',
              value: 'borderless',
              preview: (
                <svg width="32" height="24" viewBox="0 0 32 24">
                  <rect x="2" y="2" width="28" height="20" rx="4" fill="currentColor" opacity="0.1"/>
                </svg>
              ),
            },
          ]}
          value={config.cardStyle}
          onChange={(value) => onChange('cardStyle', value)}
        />

        <VisualOptionGroup
          label="按钮样式"
          options={[
            {
              label: '渐变',
              value: 'gradient',
              preview: (
                <svg width="48" height="20" viewBox="0 0 48 20">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#667eea' }} />
                      <stop offset="100%" style={{ stopColor: '#764ba2' }} />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="48" height="20" rx="10" fill="url(#gradient)"/>
                </svg>
              ),
            },
            {
              label: '纯色',
              value: 'solid',
              preview: (
                <svg width="48" height="20" viewBox="0 0 48 20">
                  <rect x="0" y="0" width="48" height="20" rx="10" fill="currentColor"/>
                </svg>
              ),
            },
            {
              label: '线框',
              value: 'wireframe',
              preview: (
                <svg width="48" height="20" viewBox="0 0 48 20">
                  <rect x="2" y="2" width="44" height="16" rx="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ),
            },
          ]}
          value={config.buttonStyle}
          onChange={(value) => onChange('buttonStyle', value)}
        />

        <VisualOptionGroup
          label="标签样式"
          options={[
            {
              label: '圆角',
              value: 'rounded',
              preview: (
                <svg width="40" height="20" viewBox="0 0 40 20">
                  <rect x="4" y="4" width="32" height="12" rx="6" fill="currentColor" opacity="0.2"/>
                </svg>
              ),
            },
            {
              label: '文字',
              value: 'text-only',
              preview: (
                <svg width="40" height="20" viewBox="0 0 40 20">
                  <text x="20" y="14" textAnchor="middle" fontSize="10" fill="currentColor">Aa</text>
                </svg>
              ),
            },
          ]}
          value={config.badgeStyle}
          onChange={(value) => onChange('badgeStyle', value)}
          columns={2}
        />

        <VisualOptionGroup
          label="标题栏样式"
          options={[
            {
              label: '下划线',
              value: 'white-underline',
              preview: (
                <svg width="60" height="24" viewBox="0 0 60 24">
                  <rect x="0" y="4" width="60" height="12" fill="currentColor" opacity="0.05"/>
                  <line x1="0" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ),
            },
            {
              label: '毛玻璃',
              value: 'frosted-glass',
              preview: (
                <svg width="60" height="24" viewBox="0 0 60 24">
                  <rect x="0" y="4" width="60" height="16" rx="4" fill="currentColor" opacity="0.1"/>
                </svg>
              ),
            },
            {
              label: '背景色',
              value: 'colored-bg',
              preview: (
                <svg width="60" height="24" viewBox="0 0 60 24">
                  <rect x="0" y="4" width="60" height="16" rx="4" fill="currentColor" opacity="0.2"/>
                </svg>
              ),
            },
          ]}
          value={config.titleBarStyle}
          onChange={(value) => onChange('titleBarStyle', value)}
        />

        <VisualOptionGroup
          label="切换器样式"
          options={[
            {
              label: '下划线',
              value: 'underline',
              preview: (
                <svg width="60" height="20" viewBox="0 0 60 20">
                  <line x1="0" y1="16" x2="25" y2="16" stroke="currentColor" strokeWidth="2"/>
                  <line x1="35" y1="16" x2="60" y2="16" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                </svg>
              ),
            },
            {
              label: '药丸',
              value: 'pill',
              preview: (
                <svg width="60" height="20" viewBox="0 0 60 20">
                  <rect x="0" y="6" width="25" height="8" rx="4" fill="currentColor"/>
                  <rect x="35" y="6" width="25" height="8" rx="4" fill="currentColor" opacity="0.2"/>
                </svg>
              ),
            },
            {
              label: '胶囊',
              value: 'capsule',
              preview: (
                <svg width="60" height="20" viewBox="0 0 60 20">
                  <rect x="0" y="4" width="25" height="12" rx="6" fill="currentColor"/>
                  <rect x="35" y="4" width="25" height="12" rx="6" fill="currentColor" opacity="0.2"/>
                </svg>
              ),
            },
          ]}
          value={config.switcherStyle}
          onChange={(value) => onChange('switcherStyle', value)}
        />
      </div>
    </div>
  )
})
