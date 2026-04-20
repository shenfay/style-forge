import type { StyleConfig, PresetConfig } from '../../types/config'
import { presets } from '../../types/config'
import { colors } from '../../utils/design-tokens'

interface StyleConfiguratorProps {
  config: StyleConfig
  onChange: (config: StyleConfig) => void
}

export function StyleConfigurator({ config, onChange }: StyleConfiguratorProps) {
  const updateConfig = (key: keyof StyleConfig, value: string) => {
    onChange({ ...config, [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* 色彩配置 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          色彩配置
        </h3>
        <div className="space-y-4">
          {/* 背景色 */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block">背景色 (Background)</label>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg border border-gray-200 shadow-sm" style={{ background: config.backgroundColor }} />
              <input
                type="text"
                value={config.backgroundColor}
                onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 主题色 */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block">主题色 (Primary)</label>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg border border-gray-200 shadow-sm" style={{ background: config.primaryColor }} />
              <input
                type="text"
                value={config.primaryColor}
                onChange={(e) => updateConfig('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 形状与结构 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          形状与结构
        </h3>
        <div className="space-y-4">
          {/* 圆角 */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block">圆角半径 (Radius)</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '0px', value: 'small' },
                { label: '8px', value: 'medium' },
                { label: '16px', value: 'large' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('cornerRadius', opt.value)}
                  className={`px-3 py-2.5 text-sm rounded-lg transition-all font-medium ${
                    config.cornerRadius === opt.value
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 组件样式 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          组件样式
        </h3>
        <div className="space-y-4">
          {/* 标题栏 */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block">标题栏样式</label>
            <div className="space-y-2">
              {[
                { label: '纯白+下划线', value: 'white-underline' },
                { label: '毛玻璃', value: 'frosted-glass' },
                { label: '彩色底色', value: 'colored-bg' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('titleBarStyle', opt.value)}
                  className={`w-full px-3 py-2.5 text-sm text-left rounded-lg transition-all ${
                    config.titleBarStyle === opt.value
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 按钮 */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block">按钮样式</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '渐变', value: 'gradient' },
                { label: '纯色', value: 'solid' },
                { label: '线框', value: 'wireframe' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('buttonStyle', opt.value)}
                  className={`px-3 py-2.5 text-sm rounded-lg transition-all font-medium ${
                    config.buttonStyle === opt.value
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

