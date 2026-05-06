/**
 * 形状系统配置区域
 */

import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { StyleConfig } from '../../../../types/config'
import { SectionHeader, RangeSlider, VisualOptionGroup } from '../shared'

interface ShapeSectionProps {
  config: StyleConfig
  onChange: (key: keyof StyleConfig, value: string) => void
}

export const ShapeSection = memo(function ShapeSection({ config, onChange }: ShapeSectionProps) {
  const { t } = useTranslation('designer')
  return (
    <div>
      <SectionHeader
        number="02"
        title={t('section.shape')}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#999999' }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
        }
      />
      <div className="space-y-6">
        <RangeSlider
          label={t('shape.cornerRadius')}
          options={[
            { label: '0', value: 'none' },
            { label: `${t('spacing.small')} (4px)`, value: 'small' },
            { label: `${t('spacing.medium_opt')} (8px)`, value: 'medium' },
            { label: `${t('spacing.large')} (12px)`, value: 'large' },
          ]}
          value={config.cornerRadius}
          onChange={(value) => onChange('cornerRadius', value)}
        />

        <VisualOptionGroup
          label={t('shape.cardStyle')}
          options={[
            {
              label: t('shape.border'),
              value: 'border',
              preview: (
                <svg width="32" height="24" viewBox="0 0 32 24">
                  <rect x="2" y="2" width="28" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ),
            },
            {
              label: t('shape.shadow'),
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
              label: t('shape.borderless'),
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
          label={t('shape.buttonStyle')}
          options={[
            {
              label: t('shape.gradient'),
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
              label: t('shape.solid'),
              value: 'solid',
              preview: (
                <svg width="48" height="20" viewBox="0 0 48 20">
                  <rect x="0" y="0" width="48" height="20" rx="10" fill="currentColor"/>
                </svg>
              ),
            },
            {
              label: t('shape.wireframe'),
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
          label={t('shape.badgeStyle')}
          options={[
            {
              label: t('shape.rounded'),
              value: 'rounded',
              preview: (
                <svg width="40" height="20" viewBox="0 0 40 20">
                  <rect x="4" y="4" width="32" height="12" rx="6" fill="currentColor" opacity="0.2"/>
                </svg>
              ),
            },
            {
              label: t('shape.textOnly'),
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
          label={t('shape.titleBarStyle')}
          options={[
            {
              label: t('shape.underline'),
              value: 'white-underline',
              preview: (
                <svg width="60" height="24" viewBox="0 0 60 24">
                  <rect x="0" y="4" width="60" height="12" fill="currentColor" opacity="0.05"/>
                  <line x1="0" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ),
            },
            {
              label: t('shape.frostedGlass'),
              value: 'frosted-glass',
              preview: (
                <svg width="60" height="24" viewBox="0 0 60 24">
                  <rect x="0" y="4" width="60" height="16" rx="4" fill="currentColor" opacity="0.1"/>
                </svg>
              ),
            },
            {
              label: t('shape.coloredBg'),
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
          label={t('shape.switcherStyle')}
          options={[
            {
              label: t('shape.underline'),
              value: 'underline',
              preview: (
                <svg width="60" height="20" viewBox="0 0 60 20">
                  <line x1="0" y1="16" x2="25" y2="16" stroke="currentColor" strokeWidth="2"/>
                  <line x1="35" y1="16" x2="60" y2="16" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                </svg>
              ),
            },
            {
              label: t('shape.pill'),
              value: 'pill',
              preview: (
                <svg width="60" height="20" viewBox="0 0 60 20">
                  <rect x="0" y="6" width="25" height="8" rx="4" fill="currentColor"/>
                  <rect x="35" y="6" width="25" height="8" rx="4" fill="currentColor" opacity="0.2"/>
                </svg>
              ),
            },
            {
              label: t('shape.capsule'),
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
