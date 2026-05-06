/**
 * 预设尺寸库组件
 */

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SizePreset {
  name: string
  width: number
  height: number
}

const SIZE_PRESETS_DATA: Record<string, SizePreset[]> = {
  'socialMedia': [
    { name: 'Facebook 封面', width: 820, height: 312 },
    { name: 'Twitter 头部', width: 1500, height: 500 },
    { name: 'Instagram 帖子', width: 1080, height: 1080 },
    { name: 'Instagram Stories', width: 1080, height: 1920 },
    { name: 'YouTube 缩略图', width: 1280, height: 720 },
    { name: 'LinkedIn Banner', width: 1584, height: 396 },
  ],
  'deviceScreen': [
    { name: '桌面 1920×1080', width: 1920, height: 1080 },
    { name: '桌面 1440×900', width: 1440, height: 900 },
    { name: '笔记本 1366×768', width: 1366, height: 768 },
    { name: '手机 375×812', width: 375, height: 812 },
    { name: '手机 414×896', width: 414, height: 896 },
    { name: '平板 768×1024', width: 768, height: 1024 },
  ],
  'adSlots': [
    { name: 'Banner 728×90', width: 728, height: 90 },
    { name: 'Medium Rectangle 300×250', width: 300, height: 250 },
    { name: 'Leaderboard 970×90', width: 970, height: 90 },
    { name: 'Half Page 300×600', width: 300, height: 600 },
    { name: 'Mobile Banner 320×50', width: 320, height: 50 },
  ],
  'commonSizes': [
    { name: '1920×1080', width: 1920, height: 1080 },
    { name: '1280×720', width: 1280, height: 720 },
    { name: '800×600', width: 800, height: 600 },
    { name: '400×300', width: 400, height: 300 },
    { name: '200×200', width: 200, height: 200 },
  ],
}

const CATEGORY_KEYS: Array<{ key: string; i18nKey: string }> = [
  { key: 'socialMedia', i18nKey: 'sizePresets.socialMedia' },
  { key: 'deviceScreen', i18nKey: 'sizePresets.deviceScreen' },
  { key: 'adSlots', i18nKey: 'sizePresets.adSlots' },
  { key: 'commonSizes', i18nKey: 'sizePresets.commonSizes' },
]

interface SizePresetsProps {
  currentWidth: number
  currentHeight: number
  onSizeSelect: (width: number, height: number) => void
}

export function SizePresets({ currentWidth, currentHeight, onSizeSelect }: SizePresetsProps) {
  const { t } = useTranslation('placeholder')
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    commonSizes: true,
  })

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-2 space-y-1">
        {CATEGORY_KEYS.map(({ key, i18nKey }) => {
          const presets = SIZE_PRESETS_DATA[key]
          if (!presets) return null
          const isExpanded = expandedCategories[key] ?? false
          const hasSelected = presets.some(
            (p) => p.width === currentWidth && p.height === currentHeight
          )

          return (
            <div key={key}>
              <button
                onClick={() => toggleCategory(key)}
                className="w-full flex items-center justify-between rounded-lg cursor-pointer transition-all"
                style={{
                  padding: '10px 12px',
                  backgroundColor: (hasSelected && !isExpanded) ? 'rgba(0,0,0,0.03)' : 'transparent',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!(hasSelected && !isExpanded)) {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!(hasSelected && !isExpanded)) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 transition-transform" style={{ color: '#3F3F46', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm font-normal" style={{ color: '#09090B' }}>
                    {t(i18nKey)}
                  </span>
                </div>
                <span className="text-sm" style={{ color: '#3F3F46' }}>
                  {presets.length}
                </span>
              </button>

              {isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {presets.map((preset) => {
                    const isSelected = currentWidth === preset.width && currentHeight === preset.height
                    return (
                      <button
                        key={preset.name}
                        onClick={() => onSizeSelect(preset.width, preset.height)}
                        className="w-full text-left rounded-lg cursor-pointer transition-all"
                        style={{
                          padding: '10px 12px',
                          backgroundColor: isSelected ? 'rgba(0,0,0,0.03)' : 'transparent',
                          color: isSelected ? '#09090B' : '#3F3F46',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <div className="text-sm font-normal">
                          {preset.width}×{preset.height}
                        </div>
                        <div className="text-xs mt-0.5 truncate" style={{ color: '#71717A' }}>
                          {preset.name}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
