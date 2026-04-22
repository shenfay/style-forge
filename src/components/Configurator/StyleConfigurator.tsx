import type { StyleConfig } from '../../types/config'
import { getBorderRadius } from '../../utils/design-tokens'

interface StyleConfiguratorProps {
  config: StyleConfig
  onChange: (config: StyleConfig) => void
  activeSection?: 'colors' | 'shape' | 'spacing' | 'typography'
}

export function StyleConfigurator({ config, onChange, activeSection }: StyleConfiguratorProps) {
  const updateConfig = (key: keyof StyleConfig, value: string) => {
    onChange({ ...config, [key]: value })
  }

  const SectionHeader = ({ number, title, icon }: { 
    number: string 
    title: string 
    icon: React.ReactNode 
  }) => (
    <div className="pb-4 mb-6" style={{ borderBottom: '1px solid #E8E6E1' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#1A1A1A' }}>
            {number}
          </div>
          <div className="text-base font-medium" style={{ color: '#1A1A1A' }}>{title}</div>
        </div>
        <div className="flex items-center gap-2">
          {icon}
        </div>
      </div>
    </div>
  )

  const ConfigItem = ({ label, children }: { 
    label: string
    children: React.ReactNode 
  }) => (
    <div className="space-y-3">
      <div className="text-sm font-normal" style={{ color: '#4A4A4A' }}>
        {label}
      </div>
      {children}
    </div>
  )

  // 根据 activeSection 显示对应配置
  const renderSection = () => {
    switch (activeSection) {
      case 'colors':
        return <ColorsSection />
      case 'shape':
        return <ShapeSection />
      case 'spacing':
        return <SpacingSection />
      case 'typography':
        return <TypographySection />
      default:
        return null
    }
  }

  const ColorsSection = () => (
    <div>
      <SectionHeader
        number="01"
        title="色彩系统"
        icon={
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        }
      />
      <div className="space-y-6">
        <ConfigItem label="主色">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono flex-1" style={{ color: '#999999' }}>{config.primaryColor}</span>
            <input
              type="color"
              value={config.primaryColor}
              onChange={(e) => updateConfig('primaryColor', e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border-0"
            />
          </div>
        </ConfigItem>

        <ConfigItem label="背景色">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono flex-1" style={{ color: '#999999' }}>{config.backgroundColor}</span>
            <input
              type="color"
              value={config.backgroundColor}
              onChange={(e) => updateConfig('backgroundColor', e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border-0"
            />
          </div>
        </ConfigItem>

        <ConfigItem label="标题颜色">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono flex-1" style={{ color: '#999999' }}>{config.titleColor}</span>
            <input
              type="color"
              value={config.titleColor}
              onChange={(e) => updateConfig('titleColor', e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border-0"
            />
          </div>
        </ConfigItem>
      </div>
    </div>
  )

  const ShapeSection = () => (
    <div>
      <SectionHeader
        number="02"
        title="形状系统"
        icon={
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
        }
      />
      <div className="space-y-6">
        <ConfigItem label="圆角半径">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '小', value: 'small' },
              { label: '中', value: 'medium' },
              { label: '大', value: 'large' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateConfig('cornerRadius', opt.value)}
                className="px-3 py-2.5 text-sm rounded-lg transition-all font-normal"
                style={{
                  backgroundColor: config.cornerRadius === opt.value ? '#1A1A1A' : 'transparent',
                  color: config.cornerRadius === opt.value ? '#FFFFFF' : '#4A4A4A',
                  border: config.cornerRadius === opt.value ? 'none' : '1px solid #E8E6E1',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ConfigItem>

        <ConfigItem label="卡片样式">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '边框', value: 'border' },
              { label: '阴影', value: 'shadow' },
              { label: '无边', value: 'borderless' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateConfig('cardStyle', opt.value)}
                className="px-3 py-2.5 text-sm rounded-lg transition-all font-normal"
                style={{
                  backgroundColor: config.cardStyle === opt.value ? '#1A1A1A' : 'transparent',
                  color: config.cardStyle === opt.value ? '#FFFFFF' : '#4A4A4A',
                  border: config.cardStyle === opt.value ? 'none' : '1px solid #E8E6E1',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ConfigItem>

        <ConfigItem label="按钮样式">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '渐变', value: 'gradient' },
              { label: '纯色', value: 'solid' },
              { label: '线框', value: 'wireframe' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateConfig('buttonStyle', opt.value)}
                className="px-3 py-2.5 text-sm rounded-lg transition-all font-normal"
                style={{
                  backgroundColor: config.buttonStyle === opt.value ? '#1A1A1A' : 'transparent',
                  color: config.buttonStyle === opt.value ? '#FFFFFF' : '#4A4A4A',
                  border: config.buttonStyle === opt.value ? 'none' : '1px solid #E8E6E1',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ConfigItem>

        <ConfigItem label="标签样式">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: '圆角', value: 'rounded' },
              { label: '文字', value: 'text-only' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateConfig('badgeStyle', opt.value)}
                className="px-3 py-2.5 text-sm rounded-lg transition-all font-normal"
                style={{
                  backgroundColor: config.badgeStyle === opt.value ? '#1A1A1A' : 'transparent',
                  color: config.badgeStyle === opt.value ? '#FFFFFF' : '#4A4A4A',
                  border: config.badgeStyle === opt.value ? 'none' : '1px solid #E8E6E1',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ConfigItem>

        <ConfigItem label="标题栏样式">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '下划线', value: 'white-underline' },
              { label: '毛玻璃', value: 'frosted-glass' },
              { label: '背景色', value: 'colored-bg' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateConfig('titleBarStyle', opt.value)}
                className="px-3 py-2.5 text-sm rounded-lg transition-all font-normal"
                style={{
                  backgroundColor: config.titleBarStyle === opt.value ? '#1A1A1A' : 'transparent',
                  color: config.titleBarStyle === opt.value ? '#FFFFFF' : '#4A4A4A',
                  border: config.titleBarStyle === opt.value ? 'none' : '1px solid #E8E6E1',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ConfigItem>

        <ConfigItem label="切换器样式">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '下划线', value: 'underline' },
              { label: '药丸', value: 'pill' },
              { label: '胶囊', value: 'capsule' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateConfig('switcherStyle', opt.value)}
                className="px-3 py-2.5 text-sm rounded-lg transition-all font-normal"
                style={{
                  backgroundColor: config.switcherStyle === opt.value ? '#1A1A1A' : 'transparent',
                  color: config.switcherStyle === opt.value ? '#FFFFFF' : '#4A4A4A',
                  border: config.switcherStyle === opt.value ? 'none' : '1px solid #E8E6E1',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ConfigItem>
      </div>
    </div>
  )


  const SpacingSection = () => (
    <div>
      <SectionHeader
        number="03"
        title="间距系统"
        icon={
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 16v4m0 0h4m16-12V4m0 0h-4m4 12v4m0 0h-4" />
          </svg>
        }
      />
      <div className="space-y-6">
        <ConfigItem label="内边距">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={['compact', 'medium', 'relaxed'].indexOf(config.padding)}
                onChange={(e) => updateConfig('padding', ['compact', 'medium', 'relaxed'][parseInt(e.target.value)])}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1A1A1A 0%, #1A1A1A ${(['compact', 'medium', 'relaxed'].indexOf(config.padding) / 2) * 100}%, #E8E6E1 ${(['compact', 'medium', 'relaxed'].indexOf(config.padding) / 2) * 100}%, #E8E6E1 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: '#999999' }}>
              <span>紧凑</span>
              <span>适中</span>
              <span>宽松</span>
            </div>
          </div>
        </ConfigItem>

        <ConfigItem label="卡片间距">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={['small', 'medium', 'large'].indexOf(config.cardGap)}
                onChange={(e) => updateConfig('cardGap', ['small', 'medium', 'large'][parseInt(e.target.value)])}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1A1A1A 0%, #1A1A1A ${(['small', 'medium', 'large'].indexOf(config.cardGap) / 2) * 100}%, #E8E6E1 ${(['small', 'medium', 'large'].indexOf(config.cardGap) / 2) * 100}%, #E8E6E1 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: '#999999' }}>
              <span>小</span>
              <span>中</span>
              <span>大</span>
            </div>
          </div>
        </ConfigItem>

        <ConfigItem label="区块间距">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={['small', 'medium', 'large'].indexOf(config.sectionGap)}
                onChange={(e) => updateConfig('sectionGap', ['small', 'medium', 'large'][parseInt(e.target.value)])}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1A1A1A 0%, #1A1A1A ${(['small', 'medium', 'large'].indexOf(config.sectionGap) / 2) * 100}%, #E8E6E1 ${(['small', 'medium', 'large'].indexOf(config.sectionGap) / 2) * 100}%, #E8E6E1 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: '#999999' }}>
              <span>小</span>
              <span>中</span>
              <span>大</span>
            </div>
          </div>
        </ConfigItem>

        <ConfigItem label="元素间距">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={['compact', 'medium', 'relaxed'].indexOf(config.elementGap)}
                onChange={(e) => updateConfig('elementGap', ['compact', 'medium', 'relaxed'][parseInt(e.target.value)])}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1A1A1A 0%, #1A1A1A ${(['compact', 'medium', 'relaxed'].indexOf(config.elementGap) / 2) * 100}%, #E8E6E1 ${(['compact', 'medium', 'relaxed'].indexOf(config.elementGap) / 2) * 100}%, #E8E6E1 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: '#999999' }}>
              <span>紧凑</span>
              <span>适中</span>
              <span>宽松</span>
            </div>
          </div>
        </ConfigItem>
      </div>
    </div>
  )

  const TypographySection = () => (
    <div>
      <SectionHeader
        number="04"
        title="文字排版"
        icon={
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        }
      />
      <div className="space-y-6">
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
                className="flex-1 px-3 py-2.5 text-sm rounded-lg transition-all font-normal"
                style={{
                  backgroundColor: config.titleWeight === opt.value ? '#1A1A1A' : 'transparent',
                  color: config.titleWeight === opt.value ? '#FFFFFF' : '#4A4A4A',
                  border: config.titleWeight === opt.value ? 'none' : '1px solid #E8E6E1',
                  fontWeight: opt.value === 'bold' ? 'bold' : opt.value === 'medium' ? 500 : 'normal',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ConfigItem>

        <ConfigItem label="标题装饰">
          <div className="space-y-2">
            {[
              { value: 'left-accent', label: '左侧装饰线' },
              { value: 'right-accent', label: '右侧装饰线' },
              { value: 'bottom-accent', label: '底部装饰线' },
              { value: 'plain', label: '无装饰' },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all"
                style={{
                  backgroundColor: config.titleStyle === opt.value ? '#F8F8F8' : 'transparent',
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
                  <div className="w-4 h-4 rounded-full border-2 transition-all" style={{
                    borderColor: config.titleStyle === opt.value ? '#1A1A1A' : '#D1D1D1',
                  }}>
                    {config.titleStyle === opt.value && (
                      <div className="w-2 h-2 rounded-full mx-auto mt-0.5" style={{ backgroundColor: '#1A1A1A' }} />
                    )}
                  </div>
                </div>
                <span className="text-sm" style={{ color: config.titleStyle === opt.value ? '#1A1A1A' : '#666666' }}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </ConfigItem>

        <ConfigItem label="标题大小">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={['small', 'medium', 'large'].indexOf(config.titleSize)}
                onChange={(e) => updateConfig('titleSize', ['small', 'medium', 'large'][parseInt(e.target.value)])}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1A1A1A 0%, #1A1A1A ${(['small', 'medium', 'large'].indexOf(config.titleSize) / 2) * 100}%, #E8E6E1 ${(['small', 'medium', 'large'].indexOf(config.titleSize) / 2) * 100}%, #E8E6E1 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: '#999999' }}>
              <span>小</span>
              <span>中</span>
              <span>大</span>
            </div>
          </div>
        </ConfigItem>

        <ConfigItem label="正文字号">
          <select
            value={config.bodySize}
            onChange={(e) => updateConfig('bodySize', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border text-sm transition-all"
            style={{
              borderColor: '#E8E6E1',
              color: '#1A1A1A',
              backgroundColor: '#FFFFFF',
            }}
          >
            <option value="small">小 (12px)</option>
            <option value="medium">中 (14px)</option>
            <option value="large">大 (16px)</option>
          </select>
        </ConfigItem>

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
                backgroundColor: ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 0 ? '#F5F5F5' : '#FFFFFF',
                color: ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 0 ? '#CCCCCC' : '#1A1A1A',
                border: '1px solid #E8E6E1',
              }}
              disabled={['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
              </svg>
            </button>
            <div className="flex-1 text-center">
              <div className="text-lg font-medium" style={{ color: '#1A1A1A' }}>
                {{ compact: '1.3', medium: '1.5', relaxed: '1.8' }[config.lineHeight]}
              </div>
              <div className="text-xs" style={{ color: '#999999' }}>
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
                backgroundColor: ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 2 ? '#F5F5F5' : '#FFFFFF',
                color: ['compact', 'medium', 'relaxed'].indexOf(config.lineHeight) === 2 ? '#CCCCCC' : '#1A1A1A',
                border: '1px solid #E8E6E1',
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

  return (
    <div>
      {renderSection()}
    </div>
  )
}
