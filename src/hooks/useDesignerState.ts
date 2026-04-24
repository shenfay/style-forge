/**
 * Designer 状态管理 Hook
 * 统一管理编辑器的配置状态、模板加载和URL同步
 */

import { useState, useEffect, useCallback } from 'react'
import { defaultConfig, type StyleConfig } from '../types/config'
import { useUrlConfig } from './useUrlConfig'
import { loadTemplates, findTemplate, type TemplateConfig } from '../utils/templateLoader'
import { encodeConfig } from '../utils/configEncoder'
import type { SceneType, DeviceType, PageType } from '../types/template'

interface UseDesignerStateReturn {
  // 状态
  config: StyleConfig
  templates: TemplateConfig[]
  currentTemplate: TemplateConfig | null
  
  // 设置函数
  setConfig: (config: StyleConfig) => void
  setCurrentTemplate: (template: TemplateConfig) => void
  
  // 操作函数
  handleSceneChange: (scene: SceneType) => void
  handleDeviceChange: (device: DeviceType) => void
  handleTemplateChange: (template: TemplateConfig) => void
}

// 将 TemplateStyle 转换为完整的 StyleConfig
function templateStyleToStyleConfig(templateStyle: any): StyleConfig {
  return {
    ...defaultConfig,
    ...templateStyle,
  }
}

export function useDesignerState(): UseDesignerStateReturn {
  const [urlConfig] = useUrlConfig()
  const [config, setConfig] = useState<StyleConfig>(defaultConfig)
  const [templates, setTemplates] = useState<TemplateConfig[]>([])
  const [currentTemplate, setCurrentTemplate] = useState<TemplateConfig | null>(null)

  // 加载模板
  useEffect(() => {
    const load = async () => {
      const scene = urlConfig.scene || 'ecommerce'
      const loaded = await loadTemplates(scene)
      setTemplates(loaded)

      const params = new URLSearchParams(window.location.search)
      const templateFromUrl = params.get('template')
      
      const device = urlConfig.device || 'desktop'
      const template = templateFromUrl || urlConfig.template || 'home'
      const found = findTemplate(scene, device, template as PageType)
      if (found) {
        setCurrentTemplate(found)
        if (urlConfig.config === undefined) {
          setConfig(templateStyleToStyleConfig(found.defaultStyle))
        }
      }
    }
    load()
  }, [urlConfig.scene, urlConfig.device, urlConfig.config, urlConfig.template])

  // 同步配置到URL
  useEffect(() => {
    if (urlConfig.config === undefined || JSON.stringify(urlConfig.config) !== JSON.stringify(config)) {
      const params = new URLSearchParams()
      if (urlConfig.scene) params.set('scene', urlConfig.scene)
      if (urlConfig.device) params.set('device', urlConfig.device)
      if (urlConfig.template) params.set('template', urlConfig.template)
      
      params.set('config', encodeConfig(config))
      
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, '', newUrl)
    }
  }, [config])

  // 场景切换
  const handleSceneChange = useCallback((scene: SceneType) => {
    const params = new URLSearchParams()
    params.set('scene', scene)
    params.set('device', urlConfig.device || 'desktop')
    params.set('template', urlConfig.template || 'home')
    window.location.search = params.toString()
  }, [urlConfig.device, urlConfig.template])

  // 设备切换
  const handleDeviceChange = useCallback((device: DeviceType) => {
    const params = new URLSearchParams()
    if (urlConfig.scene) params.set('scene', urlConfig.scene)
    params.set('device', device)
    if (urlConfig.template) params.set('template', urlConfig.template)
    window.location.search = params.toString()
  }, [urlConfig.scene, urlConfig.template])

  // 模板切换
  const handleTemplateChange = useCallback((template: TemplateConfig) => {
    const currentDevice = urlConfig.device || 'desktop'
    const matchedTemplate = templates.find(
      t => t.type === template.type && t.device === currentDevice
    ) || template
    
    setCurrentTemplate(matchedTemplate)
    setConfig(templateStyleToStyleConfig(matchedTemplate.defaultStyle))
    const params = new URLSearchParams()
    if (urlConfig.scene) params.set('scene', urlConfig.scene)
    if (urlConfig.device) params.set('device', urlConfig.device)
    params.set('template', template.type)
    window.location.search = params.toString()
  }, [urlConfig.scene, urlConfig.device, templates])

  return {
    config,
    templates,
    currentTemplate,
    setConfig,
    setCurrentTemplate,
    handleSceneChange,
    handleDeviceChange,
    handleTemplateChange,
  }
}
