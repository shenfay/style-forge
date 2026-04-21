import type { StyleConfig } from '../../types/config'
import { colors } from '../../utils/design-tokens'
import { useState } from 'react'

interface StyleConfiguratorProps {
  config: StyleConfig
  onChange: (config: StyleConfig) => void
  activeSection?: 'scene' | 'colors' | 'shape' | 'components' | 'title'
}

export function StyleConfigurator({ config, onChange, activeSection }: StyleConfiguratorProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    colors: true,
    shape: true,
    components: false,
    title: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const updateConfig = (key: keyof StyleConfig, value: string) => {
    onChange({ ...config, [key]: value })
  }

  // 判断是否应该显示该区块
  const shouldShowSection = (sectionId: string) => {
    if (!activeSection) return true
    return activeSection === sectionId
  }

  const SectionHeader = ({ id, number, title, subtitle, icon }: { 
    id: string 
    number: string 
    title: string 
    subtitle?: string
    icon: React.ReactNode 
  }) => (
    <div className="pb-4 mb-4" style={{ borderBottom: '1px solid #E8E6E1' }}>
      <button
        onClick={() => !activeSection && toggleSection(id)}
        className="w-full flex items-center justify-between group transition-colors rounded-lg"
        style={{ padding: '10px 12px', cursor: activeSection ? 'default' : 'pointer' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded text-xs font-normal text-white" style={{ backgroundColor: '#1A1A1A' }}>
            {number}
          </div>
          <div className="text-left">
            <div className="text-sm font-normal" style={{ color: '#1A1A1A' }}>{title}</div>
            {subtitle && <div className="text-xs mt-0.5" style={{ color: '#999999' }}>{subtitle}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {icon}
          {!activeSection && (
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections[id] ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 色彩配置 */}
      {shouldShowSection('colors') && (
      <div>
        <SectionHeader
          id="colors"
          number="01"
          title="色彩配置"
          subtitle="Colors"
          icon={
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          }
        />
        {(expandedSections.colors || activeSection === 'colors') && (
          <div className="space-y-4">
          {/* 主题色 */}
          <div className="flex items-center justify-between" style={{ padding: '10px 0' }}>
            <label className="text-sm font-normal" style={{ color: '#4A4A4A' }}>主色 (Primary)</label>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono" style={{ color: '#999999' }}>{config.primaryColor}</span>
              <div className="relative">
                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => updateConfig('primaryColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                  style={{ background: config.primaryColor }}
                />
              </div>
            </div>
          </div>

          {/* 背景色 */}
          <div className="flex items-center justify-between" style={{ padding: '10px 0' }}>
            <label className="text-sm font-normal" style={{ color: '#4A4A4A' }}>背景 (Surface)</label>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono" style={{ color: '#999999' }}>{config.backgroundColor}</span>
              <div className="relative">
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                  style={{ background: config.backgroundColor }}
                />
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
      )}

      {/* 形状与结构 */}
      {shouldShowSection('shape') && (
      <div>
        <SectionHeader
          id="shape"
          number="02"
          title="形状与结构"
          subtitle="Shape"
          icon={
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          }
        />
        {(expandedSections.shape || activeSection === 'shape') && (
          <div className="space-y-4">
          {/* 圆角 - 使用滑块 */}
          <div style={{ padding: '10px 0' }}>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-normal" style={{ color: '#4A4A4A' }}>圆角半径 (Radius)</label>
              <span className="text-sm font-normal" style={{ color: '#1A1A1A' }}>
                {config.cornerRadius === 'small' ? '8px' : config.cornerRadius === 'medium' ? '16px' : '24px'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={config.cornerRadius === 'small' ? 0 : config.cornerRadius === 'medium' ? 1 : 2}
              onChange={(e) => {
                const values = ['small', 'medium', 'large'] as const
                updateConfig('cornerRadius', values[parseInt(e.target.value)])
              }}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                backgroundColor: '#E8E6E1',
                background: `linear-gradient(to right, #1A1A1A 0%, #1A1A1A ${(config.cornerRadius === 'small' ? 0 : config.cornerRadius === 'medium' ? 50 : 100)}%, #E8E6E1 ${(config.cornerRadius === 'small' ? 0 : config.cornerRadius === 'medium' ? 50 : 100)}%, #E8E6E1 100%)`,
              }}
            />
          </div>

          {/* 卡片样式 */}
          <div>
            <label className="text-sm font-normal mb-3 block" style={{ color: '#4A4A4A' }}>卡片样式 (Card Style)</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '边框', value: 'border' },
                { label: '阴影', value: 'shadow' },
                { label: '无框', value: 'borderless' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('cardStyle', opt.value)}
                  className="px-3 py-2 text-sm rounded-lg transition-all font-normal"
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
          </div>
          </div>
        )}
      </div>
      )}

      {/* 组件样式 */}
      {shouldShowSection('components') && (
      <div>
        <SectionHeader
          id="components"
          number="03"
          title="组件风格"
          subtitle="Component"
          icon={
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          }
        />
        {expandedSections.components && (
          <div className="space-y-4">
          {/* 按钮样式 */}
          <div>
            <label className="text-sm font-normal mb-3 block" style={{ color: '#4A4A4A' }}>按钮样式 (Button)</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '渐变', value: 'gradient' },
                { label: '纯色', value: 'solid' },
                { label: '线框', value: 'wireframe' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('buttonStyle', opt.value)}
                  className="px-3 py-2 text-sm rounded-lg transition-all font-normal"
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
          </div>

          {/* 标签样式 */}
          <div>
            <label className="text-sm font-normal mb-3 block" style={{ color: '#4A4A4A' }}>标签样式 (Badge)</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '圆角', value: 'rounded' },
                { label: '文字', value: 'text-only' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('badgeStyle', opt.value)}
                  className="px-3 py-2 text-sm rounded-lg transition-all font-normal"
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
          </div>
          </div>
        )}
      </div>
      )}

      {/* 标题样式 */}
      {shouldShowSection('title') && (
      <div>
        <SectionHeader
          id="title"
          number="04"
          title="标题样式"
          subtitle="Title"
          icon={
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          }
        />
        {expandedSections.title && (
          <div className="space-y-4">
          {/* 字体字重 */}
          <div>
            <label className="text-sm font-normal mb-3 block" style={{ color: '#4A4A4A' }}>字体字重 (Weight)</label>
            <div className="flex gap-2">
              {[
                { label: 'Light', value: 'normal' },
                { label: 'Base', value: 'medium' },
                { label: 'Bold', value: 'bold' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('titleWeight', opt.value)}
                  className="flex-1 px-3 py-2 text-sm rounded-lg transition-all font-normal"
                  style={{
                    backgroundColor: config.titleWeight === opt.value ? '#1A1A1A' : 'transparent',
                    color: config.titleWeight === opt.value ? '#FFFFFF' : '#4A4A4A',
                    border: config.titleWeight === opt.value ? 'none' : '1px solid #E8E6E1',
                    fontWeight: config.titleWeight === opt.value ? 'bold' : 'normal',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 背景条位置 */}
          <div>
            <label className="text-sm font-normal mb-3 block" style={{ color: '#4A4A4A' }}>位置对齐 (Align)</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 'left-accent', icon: '◀', label: '左' },
                { value: 'right-accent', icon: '▶', label: '右' },
                { value: 'bottom-accent', icon: '▼', label: '下' },
                { value: 'plain', icon: '—', label: '无' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('titleStyle', opt.value)}
                  className="px-3 py-2 text-sm rounded-lg transition-all flex flex-col items-center justify-center gap-1 font-normal"
                  style={{
                    backgroundColor: config.titleStyle === opt.value ? '#1A1A1A' : 'transparent',
                    color: config.titleStyle === opt.value ? '#FFFFFF' : '#4A4A4A',
                    border: config.titleStyle === opt.value ? 'none' : '1px solid #E8E6E1',
                  }}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 字体大小 */}
          <div>
            <label className="text-sm font-normal mb-3 block" style={{ color: '#4A4A4A' }}>字体大小 (Size)</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'S', value: 'small', desc: '14px' },
                { label: 'M', value: 'medium', desc: '16px' },
                { label: 'L', value: 'large', desc: '18px' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig('titleSize', opt.value)}
                  className="px-3 py-2 text-sm rounded-lg transition-all flex flex-col items-center justify-center gap-1 font-normal"
                  style={{
                    backgroundColor: config.titleSize === opt.value ? '#1A1A1A' : 'transparent',
                    color: config.titleSize === opt.value ? '#FFFFFF' : '#4A4A4A',
                    border: config.titleSize === opt.value ? 'none' : '1px solid #E8E6E1',
                  }}
                >
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-xs" style={{ color: '#999999' }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 标题颜色 */}
          <div className="flex items-center justify-between" style={{ padding: '10px 0' }}>
            <label className="text-sm font-normal" style={{ color: '#4A4A4A' }}>标题颜色 (Color)</label>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono" style={{ color: '#999999' }}>{config.titleColor}</span>
              <div className="relative">
                <input
                  type="color"
                  value={config.titleColor}
                  onChange={(e) => updateConfig('titleColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                  style={{ background: config.titleColor }}
                />
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
      )}
    </div>
  )
}

