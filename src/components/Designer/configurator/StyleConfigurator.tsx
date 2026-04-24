/**
 * 样式配置器主组件（容器）
 * 
 * 负责根据 activeSection 分发到对应的配置区域。
 * 这是一个纯容器组件，不包含任何 UI 渲染逻辑，
 * 所有的配置 UI 都由 sections/ 目录下的子组件提供。
 * 
 * @example
 * ```tsx
 * <StyleConfigurator
 *   config={styleConfig}
 *   onChange={handleConfigChange}
 *   activeSection="colors"
 * />
 * ```
 */

import React from 'react'
import type { StyleConfig } from '../../../types/config'
import { ColorsSection, ShapeSection, SpacingSection, TypographySection } from './sections'

interface StyleConfiguratorProps {
  /** 当前样式配置对象 */
  config: StyleConfig
  /** 配置变更回调函数 */
  onChange: (config: StyleConfig) => void
  /** 当前激活的配置区域 */
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
