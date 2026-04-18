import type { TemplateConfig, SceneType, DeviceType, PageType } from '../types/template'

export type { TemplateConfig, SceneType, DeviceType, PageType } from '../types/template'

const templateCache = new Map<string, TemplateConfig[]>()

export async function loadTemplates(scene: SceneType): Promise<TemplateConfig[]> {
  if (templateCache.has(scene)) {
    return templateCache.get(scene)!
  }

  try {
    const module = await import(`../templates/${scene}.json`)
    const templates = module.default as TemplateConfig[]
    templateCache.set(scene, templates)
    return templates
  } catch (error) {
    console.error(`Failed to load templates for scene: ${scene}`, error)
    return []
  }
}

export function findTemplate(
  scene: SceneType,
  device: DeviceType,
  type: PageType
): TemplateConfig | undefined {
  const cached = templateCache.get(scene)
  if (!cached) return undefined

  return cached.find(
    (t) => t.device === device && t.type === type
  )
}

export function getAllScenes(): SceneType[] {
  return ['food', 'ecommerce', 'saas', 'media', 'social', 'finance']
}

export function preloadTemplates(scenes: SceneType[]): Promise<TemplateConfig[][]> {
  return Promise.all(
    scenes.map((scene) => loadTemplates(scene))
  )
}
