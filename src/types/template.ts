export type SceneType = 'ecommerce'
export type DeviceType = 'mobile' | 'desktop'
export type PageType = 'home' | 'detail' | 'list' | 'form' | 'settings' | 'result' | 'profile' | 'messages'

export interface TemplateConfig {
  id: string
  name: string
  scene: SceneType
  device: DeviceType
  type: PageType
  description: string
  previewImage?: string
  defaultStyle: TemplateStyle
  layout: LayoutDefinition
  aiPrompt: AIPromptTemplate
}

export interface TemplateStyle {
  backgroundColor: string
  primaryColor: string
  cornerRadius: 'small' | 'medium' | 'large'
  cardStyle: 'border' | 'shadow' | 'borderless'
  titleBarStyle: 'white-underline' | 'frosted-glass' | 'colored-bg'
  switcherStyle: 'underline' | 'pill' | 'capsule'
  buttonStyle: 'gradient' | 'solid' | 'wireframe'
  badgeStyle: 'rounded' | 'text-only'
}

export interface LayoutDefinition {
  type: 'single-column' | 'two-column' | 'grid'
  regions: Region[]
  breakpoints?: BreakpointLayout[]
}

export interface Region {
  id: string
  name: string
  type: 'header' | 'content' | 'footer' | 'sidebar'
  height?: string
  components: string[]
}

export interface BreakpointLayout {
  name: string
  minWidth: number
  layout: Record<string, any>
}

export interface AIPromptTemplate {
  title: string
  sections: PromptSection[]
}

export interface PromptSection {
  heading: string
  content: string
}
