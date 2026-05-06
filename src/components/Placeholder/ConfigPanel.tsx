/**
 * 配置面板组件
 */

import { useTranslation } from 'react-i18next'
import type { PlaceholderConfig } from '../../utils/placeholderConfig'

interface ConfigPanelProps {
  config: PlaceholderConfig
  onChange: (config: Partial<PlaceholderConfig>) => void
  onCopyLink: () => void
  onCopyImage: () => void
}

const COLOR_PRESETS = [
  '#09090B', '#3F3F46', '#71717A', '#D4D4D4', '#FAFAFA', '#FFFFFF',
  '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444',
]

export function ConfigPanel({ config, onChange, onCopyLink, onCopyImage }: ConfigPanelProps) {
  const { t } = useTranslation('placeholder')
  const { t: tc } = useTranslation('common')

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* 尺寸配置 */}
      <div className="p-4 border-b" style={{ borderColor: '#E5E4E0' }}>
        <div className="text-sm font-medium mb-3" style={{ color: '#09090B' }}>{t('config.size')}</div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs mb-1 block" style={{ color: '#71717A' }}>{t('size.width')}</label>
            <input
              type="number" value={config.width}
              onChange={(e) => onChange({ width: parseInt(e.target.value, 10) || 100 })}
              className="w-full px-3 py-2 text-sm rounded-lg border" style={{ borderColor: '#E5E4E0' }}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs mb-1 block" style={{ color: '#71717A' }}>{t('size.height')}</label>
            <input
              type="number" value={config.height}
              onChange={(e) => onChange({ height: parseInt(e.target.value, 10) || 100 })}
              className="w-full px-3 py-2 text-sm rounded-lg border" style={{ borderColor: '#E5E4E0' }}
            />
          </div>
        </div>
      </div>

      {/* 颜色配置 */}
      <div className="p-4 border-b" style={{ borderColor: '#E5E4E0' }}>
        <div className="text-sm font-medium mb-3" style={{ color: '#09090B' }}>{t('config.color')}</div>
        <div className="space-y-3">
          <div>
            <label className="text-xs mb-2 block" style={{ color: '#71717A' }}>{t('color.bgColor')}</label>
            <div className="flex items-center gap-2">
              <input type="color" value={config.bgColor === 'transparent' ? '#FFFFFF' : config.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={config.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="flex-1 px-3 py-2 text-sm rounded-lg border" style={{ borderColor: '#E5E4E0' }}
                placeholder={t('color.placeholder')} />
            </div>
            <div className="flex gap-1 mt-2 flex-wrap">
              {COLOR_PRESETS.map((color) => (
                <button key={color} onClick={() => onChange({ bgColor: color })}
                  className="w-6 h-6 rounded cursor-pointer border" style={{ backgroundColor: color, borderColor: '#E5E4E0' }} />
              ))}
              <button onClick={() => onChange({ bgColor: 'transparent' })}
                className="w-6 h-6 rounded border text-xs cursor-pointer" style={{ borderColor: '#E5E4E0' }} title={t('color.transparent')}>∅</button>
            </div>
          </div>

          <div>
            <label className="text-xs mb-2 block" style={{ color: '#71717A' }}>{t('color.textColor')}</label>
            <div className="flex items-center gap-2">
              <input type="color" value={config.textColor}
                onChange={(e) => onChange({ textColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={config.textColor}
                onChange={(e) => onChange({ textColor: e.target.value })}
                className="flex-1 px-3 py-2 text-sm rounded-lg border" style={{ borderColor: '#E5E4E0' }}
                placeholder={t('color.textPlaceholder')} />
            </div>
          </div>
        </div>
      </div>

      {/* 文字配置 */}
      <div className="p-4 border-b" style={{ borderColor: '#E5E4E0' }}>
        <div className="text-sm font-medium mb-3" style={{ color: '#09090B' }}>{t('config.text')}</div>
        <div className="space-y-3">
          <div>
            <label className="text-xs mb-2 block" style={{ color: '#71717A' }}>
              {t('text.content', { braceWidth: '{width}', braceHeight: '{height}' })}
            </label>
            <input type="text" value={config.text}
              onChange={(e) => onChange({ text: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border" style={{ borderColor: '#E5E4E0' }}
              placeholder="{width}×{height}" />
          </div>
          <div>
            <label className="text-xs mb-2 block" style={{ color: '#71717A' }}>
              {t('text.fontSize', { size: config.fontSize })}
            </label>
            <input type="range" min="12" max="200" value={config.fontSize}
              onChange={(e) => onChange({ fontSize: parseInt(e.target.value, 10) })}
              className="w-full" />
          </div>
        </div>
      </div>

      {/* 样式配置 */}
      <div className="p-4 border-b" style={{ borderColor: '#E5E4E0' }}>
        <div className="text-sm font-medium mb-3" style={{ color: '#09090B' }}>{t('config.style')}</div>
        <div className="space-y-3">
          <div>
            <label className="text-xs mb-2 block" style={{ color: '#71717A' }}>
              {t('style.borderRadius', { radius: config.borderRadius })}
            </label>
            <input type="range" min="0" max="100" value={config.borderRadius}
              onChange={(e) => onChange({ borderRadius: parseInt(e.target.value, 10) })}
              className="w-full" />
          </div>
          <div>
            <label className="text-xs mb-2 block" style={{ color: '#71717A' }}>
              {t('style.borderWidth', { width: config.borderWidth })}
            </label>
            <input type="range" min="0" max="20" value={config.borderWidth}
              onChange={(e) => onChange({ borderWidth: parseInt(e.target.value, 10) })}
              className="w-full" />
          </div>
          {config.borderWidth > 0 && (
            <div>
              <label className="text-xs mb-2 block" style={{ color: '#71717A' }}>{t('style.borderColor')}</label>
              <div className="flex items-center gap-2">
                <input type="color" value={config.borderColor}
                  onChange={(e) => onChange({ borderColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
                <input type="text" value={config.borderColor}
                  onChange={(e) => onChange({ borderColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border" style={{ borderColor: '#E5E4E0' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 格式配置 */}
      <div className="p-4 border-b" style={{ borderColor: '#E5E4E0' }}>
        <div className="text-sm font-medium mb-3" style={{ color: '#09090B' }}>{t('config.format')}</div>
        <div className="grid grid-cols-4 gap-2">
          {(['png', 'jpg', 'webp', 'svg'] as const).map((format) => (
            <button key={format} onClick={() => onChange({ format })}
              className="px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors"
              style={{
                backgroundColor: config.format === format ? '#373737' : '#F5F5F5',
                color: config.format === format ? '#FBFBFB' : '#3F3F46',
              }}>
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="p-4 space-y-2">
        <button onClick={onCopyLink}
          className="w-full px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-colors"
          style={{ backgroundColor: '#F0F0F0', color: '#242424' }}>
          {tc('actions.copyLink')}
        </button>
        <button onClick={onCopyImage}
          className="w-full px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-colors"
          style={{ backgroundColor: '#F0F0F0', color: '#242424' }}>
          {tc('actions.copyImage')}
        </button>
      </div>
    </div>
  )
}
