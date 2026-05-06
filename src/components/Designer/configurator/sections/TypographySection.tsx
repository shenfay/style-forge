/**
 * 文字排版配置区域
 */

import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { StyleConfig } from '../../../../types/config'
import { SectionHeader, ConfigItem } from '../shared'
import { colors, borderRadius, fontSize } from '../../../../tokens'

interface TypographySectionProps {
  config: StyleConfig
  onChange: (key: keyof StyleConfig, value: string) => void
}

export const TypographySection = memo(function TypographySection({ config, onChange }: TypographySectionProps) {
  const { t } = useTranslation('designer')
  const updateConfig = (key: keyof StyleConfig, value: string) => {
    onChange(key, value)
  }

  return (
    <div>
      <SectionHeader
        number="04"
        title={t('section.typography')}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#999999' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        }
      />
      <div className="space-y-6">
        {/* 标题字重 */}
        <ConfigItem label={t('typography.titleWeight')}>
          <div className="flex gap-2">
            {[
              { label: t('typography.titleWeightNormal'), value: 'normal' },
              { label: t('typography.titleWeightMedium'), value: 'medium' },
              { label: t('typography.titleWeightBold'), value: 'bold' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateConfig('titleWeight', opt.value)}
                className="flex-1 px-2 py-1 text-sm rounded-lg flex flex-col items-center gap-0 cursor-pointer"
                style={{
                  backgroundColor: config.titleWeight === opt.value ? '#ECEAE5' : 'transparent',
                  color: config.titleWeight === opt.value ? '#1A1A1A' : colors.text.secondary,
                  border: config.titleWeight === opt.value ? 'none' : `1px solid ${colors.border.light}`,
                  fontWeight: opt.value === 'bold' ? 'bold' : opt.value === 'medium' ? 500 : 'normal',
                }}
              >
                <span className="text-base">T</span>
                <span style={{ fontSize: fontSize.sm }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </ConfigItem>

        {/* 标题装饰 */}
        <ConfigItem label={t('typography.titleDecoration')}>
          <div className="space-y-2">
            {[
              { value: 'left-accent', label: t('typography.titleDecorationLeft'), icon: '◀' },
              { value: 'right-accent', label: t('typography.titleDecorationRight'), icon: '▶' },
              { value: 'bottom-accent', label: t('typography.titleDecorationBottom'), icon: '▼' },
              { value: 'plain', label: t('typography.titleDecorationNone'), icon: '—' },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all"
                style={{
                  backgroundColor: config.titleStyle === opt.value ? colors.gray[50] : 'transparent',
                }}
              >
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="titleStyle"
                    value={opt.value}
                    checked={config.titleStyle === opt.value}
                    onChange={() => updateConfig('titleStyle', opt.value)}
                    className="sr-only"
                  />
                  <div className="w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center" style={{
                    borderColor: config.titleStyle === opt.value ? colors.gray[800] : colors.gray[300],
                  }}>
                    {config.titleStyle === opt.value && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.gray[800] }} />
                    )}
                  </div>
                </div>
                <span className="text-base" style={{ color: config.titleStyle === opt.value ? colors.gray[800] : colors.text.tertiary }}>
                  {opt.icon}
                </span>
                <span style={{ fontSize: fontSize.sm, fontWeight: 400, flex: 1, color: config.titleStyle === opt.value ? colors.gray[800] : colors.text.primary }}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </ConfigItem>

        {/* 标题大小 */}
        <ConfigItem label={t('typography.titleSize')}>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: t('typography.titleSizeSmall'), value: 'small', size: '14px' },
                { label: t('typography.titleSizeMedium'), value: 'medium', size: '16px' },
                { label: t('typography.titleSizeLarge'), value: 'large', size: '18px' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('titleSize', opt.value)}
                  className="px-2 py-1 text-sm rounded-lg flex flex-col items-center gap-0 cursor-pointer"
                  style={{
                    backgroundColor: config.titleSize === opt.value ? '#ECEAE5' : 'transparent',
                    color: config.titleSize === opt.value ? '#1A1A1A' : colors.text.secondary,
                    border: config.titleSize === opt.value ? 'none' : `1px solid ${colors.border.light}`,
                    fontSize: opt.size,
                  }}
                >
                  <span className="font-bold text-base">A</span>
                  <span style={{ fontSize: fontSize.sm }}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </ConfigItem>

        {/* 正文字号 */}
        <ConfigItem label={t('typography.bodySize')}>
          <select
            value={config.bodySize}
            onChange={(e) => updateConfig('bodySize', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border text-sm transition-all"
            style={{
              borderColor: colors.border.light,
              color: colors.text.primary,
              backgroundColor: colors.white,
            }}
          >
            <option value="small">{t('typography.bodySizeSmall')}</option>
            <option value="medium">{t('typography.bodySizeMedium')}</option>
            <option value="large">{t('typography.bodySizeLarge')}</option>
          </select>
        </ConfigItem>

        {/* 行高设置 */}
        <ConfigItem label={t('typography.lineHeight')}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const currentIndex = ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight)
                if (currentIndex > 0) {
                  updateConfig('lineHeight', ['compact', 'medium', 'relaxed'][currentIndex - 1])
                }
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-all"
              style={{
                backgroundColor: ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 0 ? colors.gray[100] : colors.white,
                color: ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 0 ? colors.gray[300] : colors.gray[800],
                border: `1px solid ${colors.border.light}`,
              }}
              disabled={['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
              </svg>
            </button>
            <div className="flex-1 text-center">
              <div className="text-base font-medium" style={{ color: colors.text.primary }}>
                {{ compact: '1.3', medium: '1.5', relaxed: '1.8' }[config.lineHeight]}
              </div>
              <div style={{ fontSize: fontSize.sm, color: colors.text.tertiary }}>
                {{ compact: t('typography.lineHeightCompact'), medium: t('typography.lineHeightMedium'), relaxed: t('typography.lineHeightRelaxed') }[config.lineHeight]}
              </div>
            </div>
            <button
              onClick={() => {
                const currentIndex = ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight)
                if (currentIndex < 2) {
                  updateConfig('lineHeight', ['compact', 'medium', 'relaxed'][currentIndex + 1])
                }
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-all"
              style={{
                backgroundColor: ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 2 ? colors.gray[100] : colors.white,
                color: ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 2 ? colors.gray[300] : colors.gray[800],
                border: `1px solid ${colors.border.light}`,
              }}
              disabled={['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 2}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </ConfigItem>
      </div>
    </div>
  )
})
