/**
 * 样式配置器主组件（容器）
 * 负责根据 activeSection 分发到对应的配置区域
 */

import React from 'react'
import type { StyleConfig } from '../../../types/config'
import { ColorsSection, ShapeSection, SpacingSection, TypographySection } from './sections'

interface StyleConfiguratorProps {
  config: StyleConfig
  onChange: (config: StyleConfig) => void
  activeSection: string
}

export function StyleConfigurator({ config, onChange, activeSection }: StyleConfiguratorProps) {
  const updateConfig = (key: keyof StyleConfig, value: string) => {
    onChange({ ...config, [key]: value })
  }

  // 根据 activeSection 显示对应配置
  const renderSection = () => {
    switch (activeSection) {
      case 'colors':
        return <ColorsSection config={config} onChange={updateConfig} />
      case 'shape':
        return <ShapeSection config={config} onChange={updateConfig} />
      case 'spacing':
        return <SpacingSection config={config} onChange={updateConfig} />
      case 'typography':
        return <TypographySection config={config} onChange={updateConfig} />
      default:
        return null
    }
  }

  return <div>{renderSection()}</div>
}
