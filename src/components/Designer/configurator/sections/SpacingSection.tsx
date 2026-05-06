/**
 * 间距系统配置区域
 */

import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { StyleConfig } from '../../../../types/config'
import { SectionHeader, RangeSlider, CollapsePanel } from '../shared'

interface SpacingSectionProps {
  config: StyleConfig
  onChange: (key: keyof StyleConfig, value: string) => void
}

export const SpacingSection = memo(function SpacingSection({ config, onChange }: SpacingSectionProps) {
  const { t } = useTranslation('designer')
  return (
    <div>
      <SectionHeader
        number="03"
        title={t('section.spacing')}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#999999' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 16v4m0 0h4m16-12V4m0 0h-4m4 12v4m0 0h-4" />
          </svg>
        }
      />
      <div className="space-y-2">
        <CollapsePanel title={t('spacing.padding')} defaultExpanded={true}>
          <RangeSlider
            label=""
            options={[
              { label: t('spacing.compact'), value: 'compact' },
              { label: t('spacing.medium'), value: 'medium' },
              { label: t('spacing.relaxed'), value: 'relaxed' },
            ]}
            value={config.padding}
            onChange={(value) => onChange('padding', value)}
          />
        </CollapsePanel>

        <CollapsePanel title={t('spacing.cardGap')}>
          <RangeSlider
            label=""
            options={[
              { label: t('spacing.small'), value: 'small' },
              { label: t('spacing.medium_opt'), value: 'medium' },
              { label: t('spacing.large'), value: 'large' },
            ]}
            value={config.cardGap}
            onChange={(value) => onChange('cardGap', value)}
          />
        </CollapsePanel>

        <CollapsePanel title={t('spacing.sectionGap')}>
          <RangeSlider
            label=""
            options={[
              { label: t('spacing.small'), value: 'small' },
              { label: t('spacing.medium_opt'), value: 'medium' },
              { label: t('spacing.large'), value: 'large' },
            ]}
            value={config.sectionGap}
            onChange={(value) => onChange('sectionGap', value)}
          />
        </CollapsePanel>

        <CollapsePanel title={t('spacing.elementGap')}>
          <RangeSlider
            label=""
            options={[
              { label: t('spacing.compact'), value: 'compact' },
              { label: t('spacing.medium'), value: 'medium' },
              { label: t('spacing.relaxed'), value: 'relaxed' },
            ]}
            value={config.elementGap}
            onChange={(value) => onChange('elementGap', value)}
          />
        </CollapsePanel>
      </div>
    </div>
  )
})
