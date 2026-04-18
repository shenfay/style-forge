import { useState, useEffect, useCallback } from 'react'
import type { StyleConfig } from '../types/config'
import { encodeConfig, decodeConfig } from '../utils/configEncoder'
import type { SceneType, DeviceType, PageType } from '../types/template'

export interface UrlConfig {
  scene?: SceneType
  device?: DeviceType
  template?: PageType
  config?: StyleConfig
}

export function useUrlConfig(): [UrlConfig, (updates: Partial<UrlConfig>) => void] {
  const [config, setConfig] = useState<UrlConfig>(() => parseUrlParams())

  useEffect(() => {
    const handlePopState = () => {
      setConfig(parseUrlParams())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const updateUrl = useCallback((updates: Partial<UrlConfig>) => {
    const newConfig = { ...config, ...updates }
    const params = new URLSearchParams()

    if (newConfig.scene) params.set('scene', newConfig.scene)
    if (newConfig.device) params.set('device', newConfig.device)
    if (newConfig.template) params.set('template', newConfig.template)
    if (newConfig.config) {
      const encoded = encodeConfig(newConfig.config)
      params.set('config', encoded)
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState(newConfig, '', newUrl)
    setConfig(newConfig)
  }, [config])

  return [config, updateUrl]
}

function parseUrlParams(): UrlConfig {
  const params = new URLSearchParams(window.location.search)
  const config: UrlConfig = {}

  const scene = params.get('scene')
  if (scene && ['food', 'ecommerce', 'saas', 'media', 'social', 'finance'].includes(scene)) {
    config.scene = scene as SceneType
  }

  const device = params.get('device')
  if (device && ['mobile', 'desktop'].includes(device)) {
    config.device = device as DeviceType
  }

  const template = params.get('template')
  if (template && ['home', 'detail', 'list', 'form', 'settings', 'result'].includes(template)) {
    config.template = template as PageType
  }

  const encoded = params.get('config')
  if (encoded) {
    try {
      config.config = decodeConfig(encoded)
    } catch (e) {
      console.error('Failed to decode config from URL:', e)
    }
  }

  return config
}
