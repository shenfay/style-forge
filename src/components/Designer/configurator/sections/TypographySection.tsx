/**
 * 文字排版配置区域
 */

import React, { memo } from 'react'
import type { StyleConfig } from '../../../../types/config'
import { SectionHeader, ConfigItem } from '../shared'
import { colors, borderRadius, fontSize } from '../../../../tokens'

interface TypographySectionProps {
  config: StyleConfig
  onChange: (key: keyof StyleConfig, value: string) => void
}

export const TypographySection = memo(function TypographySection({ config, onChange }: TypographySectionProps) {
  const updateConfig = (key: keyof StyleConfig, value: string) => {
    onChange(key, value)
  }

  return (
    <div>
      <SectionHeader
        number="04"
        title="文字排版"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#999999' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        }
      />
      <div className="space-y-6">
        {/* 标题字重 */}
        <ConfigItem label="标题字重">
          <div className="flex gap-2">
            {[
              { label: '常规', value: 'normal' },
              { label: '中等', value: 'medium' },
              { label: '加粗', value: 'bold' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateConfig('titleWeight', opt.value)}
                className="flex-1 px-3 py-3 text-sm rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer"
                style={{
                  backgroundColor: config.titleWeight === opt.value ? colors.gray[800] : 'transparent',
                  color: config.titleWeight === opt.value ? colors.white : colors.text.secondary,
                  border: config.titleWeight === opt.value ? 'none' : `1px solid ${colors.border.light}`,
                  fontWeight: opt.value === 'bold' ? 'bold' : opt.value === 'medium' ? 500 : 'normal',
                }}
              >
                <span className="text-xl">T</span>
                <span style={{ fontSize: fontSize.base }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </ConfigItem>

        {/* 标题装饰 */}
        <ConfigItem label="标题装饰">
          <div className="space-y-2">
            {[
              { value: 'left-accent', label: '左侧装饰线', icon: '◀' },
              { value: 'right-accent', label: '右侧装饰线', icon: '▶' },
              { value: 'bottom-accent', label: '底部装饰线', icon: '▼' },
              { value: 'plain', label: '无装饰', icon: '—' },
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
                <span className="text-lg" style={{ color: config.titleStyle === opt.value ? colors.gray[800] : colors.text.tertiary }}>
                  {opt.icon}
                </span>
                <span className="text-sm flex-1" style={{ color: config.titleStyle === opt.value ? colors.gray[800] : colors.text.primary }}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </ConfigItem>

        {/* 标题大小 */}
        <ConfigItem label="标题大小">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '小', value: 'small', size: '14px' },
                { label: '中', value: 'medium', size: '16px' },
                { label: '大', value: 'large', size: '18px' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('titleSize', opt.value)}
                  className="px-3 py-3 text-sm rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer"
                  style={{
                    backgroundColor: config.titleSize === opt.value ? colors.gray[800] : 'transparent',
                    color: config.titleSize === opt.value ? colors.white : colors.text.secondary,
                    border: config.titleSize === opt.value ? 'none' : `1px solid ${colors.border.light}`,
                    fontSize: opt.size,
                  }}
                >
                  <span className="font-bold">A</span>
                  <span className="text-xs">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </ConfigItem>

        {/* 正文字号 */}
        <ConfigItem label="正文字号">
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
            <option value="small">小 (12px)</option>
            <option value="medium">中 (14px)</option>
            <option value="large">大 (16px)</option>
          </select>
        </ConfigItem>

        {/* 行高设置 */}
        <ConfigItem label="行高设置">
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
              <div className="text-lg font-medium" style={{ color: colors.text.primary }}>
                {{ compact: '1.3', medium: '1.5', relaxed: '1.8' }[config.lineHeight]}
              </div>
              <div className="text-xs" style={{ color: colors.text.tertiary }}>
                {{ compact: '紧凑', medium: '适中', relaxed: '宽松' }[config.lineHeight]}
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
