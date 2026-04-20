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
    <div className="space-y-4">
      {/* 预设模板 */}
      <ConfigSection title="快速预设">
        <div className="grid grid-cols-3 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onChange(preset.config)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-left ${
                JSON.stringify(config) === JSON.stringify(preset.config)
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">{preset.name}</div>
              <div className="text-[10px] opacity-75 mt-0.5">{preset.description}</div>
            </button>
          ))}
        </div>
      </ConfigSection>

      {/* 底色 */}
      <ConfigSection title="页面底色">
        <ColorOptions
          options={[
            { name: '纯白', value: '#FFFFFF' },
            { name: '暖沙', value: '#F9F8F4' },
            { name: '淡黄', value: '#FFFDF5' },
            { name: '淡绿', value: '#F5FAF5' },
          ]}
          selected={config.backgroundColor}
          onChange={(v) => updateConfig('backgroundColor', v)}
        />
      </ConfigSection>

      {/* 主题色 */}
      <ConfigSection title="主题色">
        <ColorOptions
          options={[
            { name: '森林绿', value: '#2E7D32' },
            { name: '草绿', value: '#5F7D2E' },
            { name: '青绿', value: '#2E7D67' },
            { name: '纯黑', value: '#000000' },
          ]}
          selected={config.primaryColor}
          onChange={(v) => updateConfig('primaryColor', v)}
        />
      </ConfigSection>

      {/* 圆角 */}
      <ConfigSection title="圆角大小">
        <OptionButtons
          options={[
            { label: '小 8px', value: 'small' },
            { label: '中 16px', value: 'medium' },
            { label: '大 24px', value: 'large' },
          ]}
          selected={config.cornerRadius}
          onChange={(v) => updateConfig('cornerRadius', v)}
        />
      </ConfigSection>

      {/* 标题栏 */}
      <ConfigSection title="标题栏样式">
        <OptionButtons
          options={[
            { label: '纯白+下划线', value: 'white-underline' },
            { label: '毛玻璃', value: 'frosted-glass' },
            { label: '彩色底色', value: 'colored-bg' },
          ]}
          selected={config.titleBarStyle}
          onChange={(v) => updateConfig('titleBarStyle', v)}
        />
      </ConfigSection>

      {/* 切换器 */}
      <ConfigSection title="风险切换器">
        <OptionButtons
          options={[
            { label: '下划线', value: 'underline' },
            { label: '药丸容器', value: 'pill' },
            { label: '胶囊', value: 'capsule' },
          ]}
          selected={config.switcherStyle}
          onChange={(v) => updateConfig('switcherStyle', v)}
        />
      </ConfigSection>

      {/* 按钮 */}
      <ConfigSection title="按钮样式">
        <OptionButtons
          options={[
            { label: '渐变', value: 'gradient' },
            { label: '纯色', value: 'solid' },
            { label: '线框', value: 'wireframe' },
          ]}
          selected={config.buttonStyle}
          onChange={(v) => updateConfig('buttonStyle', v)}
        />
      </ConfigSection>

      {/* 标签 */}
      <ConfigSection title="标签样式">
        <OptionButtons
          options={[
            { label: '圆角底色', value: 'rounded' },
            { label: '纯文字', value: 'text-only' },
          ]}
          selected={config.badgeStyle}
          onChange={(v) => updateConfig('badgeStyle', v)}
        />
      </ConfigSection>
    </div>
  )
}

function ConfigSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-medium" style={{ color: colors.gray[700] }}>{title}</h3>
      {children}
    </div>
  )
}

function ColorOptions({ options, selected, onChange }: { options: Array<{ name: string; value: string }>; selected: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
            selected === opt.value ? 'border-gray-900' : 'border-transparent hover:border-gray-300'
          }`}
        >
          <div className="w-8 h-8 rounded-full border" style={{ background: opt.value, borderColor: colors.gray[200] }} />
          <span className="text-xs" style={{ color: colors.gray[600] }}>{opt.name}</span>
        </button>
      ))}
    </div>
  )
}

function OptionButtons({ options, selected, onChange }: { options: Array<{ label: string; value: string }>; selected: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
            selected === opt.value
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
