/**
 * Designer 状态管理 Store (Zustand)
 * 
 * 替代 useDesignerState Hook，提供更高效的跨组件状态管理
 */

import { create } from 'zustand'
import type { StyleConfig } from '../types/config'
import { defaultConfig } from '../types/config'
import type { TemplateConfig } from '../utils/templateLoader'
import type { SceneType, DeviceType } from '../types/template'
import { encodeConfig } from '../utils/configEncoder'
import { loadTemplates, findTemplate } from '../utils/templateLoader'
import type { PageType } from '../types/template'

interface DesignerState {
  // 状态
  config: StyleConfig
  templates: TemplateConfig[]
  currentTemplate: TemplateConfig | null
  scene: SceneType
  device: DeviceType
  
  // Actions
  setConfig: (config: StyleConfig) => void
  setTemplates: (templates: TemplateConfig[]) => void
  setCurrentTemplate: (template: TemplateConfig | null) => void
  setScene: (scene: SceneType) => void
  setDevice: (device: DeviceType) => void
  
  // 复合操作
  loadScene: (scene: SceneType) => Promise<void>
  switchTemplate: (template: TemplateConfig) => void
  switchDevice: (device: DeviceType) => void
  syncToUrl: () => void
}

// 将 TemplateStyle 转换为完整的 StyleConfig
function templateStyleToStyleConfig(templateStyle: any): StyleConfig {
  return {
    ...defaultConfig,
    ...templateStyle,
  }
}

export const useDesignerStore = create<DesignerState>((set, get) => ({
  // 初始状态
  config: defaultConfig,
  templates: [],
  currentTemplate: null,
  scene: 'ecommerce',
  device: 'desktop',
  
  // 基础 Actions
  setConfig: (config) => set({ config }),
  setTemplates: (templates) => set({ templates }),
  setCurrentTemplate: (currentTemplate) => set({ currentTemplate }),
  setScene: (scene) => set({ scene }),
  setDevice: (device) => set({ device }),
  
  // 复合操作：加载场景
  loadScene: async (scene) => {
    const templates = await loadTemplates(scene)
    set({ scene, templates })
    
    // 查找默认模板
    const device = get().device
    const defaultTemplate = findTemplate(scene, device, 'home' as PageType)
    if (defaultTemplate) {
      set({
        currentTemplate: defaultTemplate,
        config: templateStyleToStyleConfig(defaultTemplate.defaultStyle),
      })
    }
  },
  
  // 复合操作：切换模板
  switchTemplate: (template) => {
    const { device } = get()
    const matchedTemplate = get().templates.find(
      t => t.type === template.type && t.device === device
    ) || template
    
    set({
      currentTemplate: matchedTemplate,
      config: templateStyleToStyleConfig(matchedTemplate.defaultStyle),
    })
    
    // 同步到 URL
    get().syncToUrl()
  },
  
  // 复合操作：切换设备
  switchDevice: (device) => {
    set({ device })
    
    // 查找当前模板的设备版本
    const { currentTemplate, scene } = get()
    if (currentTemplate) {
      const matchedTemplate = findTemplate(scene, device, currentTemplate.type as PageType)
      if (matchedTemplate) {
        set({
          currentTemplate: matchedTemplate,
          config: templateStyleToStyleConfig(matchedTemplate.defaultStyle),
        })
      }
    }
    
    // 同步到 URL
    get().syncToUrl()
  },
  
  // 同步状态到 URL
  syncToUrl: () => {
    const { config, scene, device, currentTemplate } = get()
    const params = new URLSearchParams()
    
    if (scene) params.set('scene', scene)
    if (device) params.set('device', device)
    if (currentTemplate) params.set('template', currentTemplate.type)
    params.set('config', encodeConfig(config))
    
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
  },
}))
