/**
 * 占位图配置 URL 编解码工具
 */

export interface PlaceholderConfig {
  width: number
  height: number
  bgColor: string
  textColor: string
  text: string
  fontSize: number
  borderRadius: number
  borderColor: string
  borderWidth: number
  format: 'png' | 'jpg' | 'webp' | 'svg'
}

export const defaultPlaceholderConfig: PlaceholderConfig = {
  width: 1920,
  height: 1080,
  bgColor: '#CCCCCC',
  textColor: '#666666',
  text: '{width}×{height}',
  fontSize: 48,
  borderRadius: 0,
  borderColor: '#999999',
  borderWidth: 0,
  format: 'png',
}

/**
 * 将配置编码为 URL 参数
 */
export function encodePlaceholderConfig(config: PlaceholderConfig): string {
  const params = new URLSearchParams({
    width: config.width.toString(),
    height: config.height.toString(),
    bg: config.bgColor,
    text: config.textColor,
    content: config.text,
    fontSize: config.fontSize.toString(),
    radius: config.borderRadius.toString(),
    borderColor: config.borderColor,
    borderWidth: config.borderWidth.toString(),
    format: config.format,
  })
  return params.toString()
}

/**
 * 从 URL 参数解码配置
 */
export function decodePlaceholderConfig(params: URLSearchParams): Partial<PlaceholderConfig> {
  const config: Partial<PlaceholderConfig> = {}

  if (params.has('width')) {
    config.width = parseInt(params.get('width')!, 10)
  }
  if (params.has('height')) {
    config.height = parseInt(params.get('height')!, 10)
  }
  if (params.has('bg')) {
    config.bgColor = params.get('bg')!
  }
  if (params.has('text')) {
    config.textColor = params.get('text')!
  }
  if (params.has('content')) {
    config.text = params.get('content')!
  }
  if (params.has('fontSize')) {
    config.fontSize = parseInt(params.get('fontSize')!, 10)
  }
  if (params.has('radius')) {
    config.borderRadius = parseInt(params.get('radius')!, 10)
  }
  if (params.has('borderColor')) {
    config.borderColor = params.get('borderColor')!
  }
  if (params.has('borderWidth')) {
    config.borderWidth = parseInt(params.get('borderWidth')!, 10)
  }
  if (params.has('format')) {
    config.format = params.get('format') as PlaceholderConfig['format']
  }

  return config
}

/**
 * 处理文字中的占位符
 */
export function processTextTemplate(text: string, width: number, height: number): string {
  return text
    .replace(/\{width\}/g, width.toString())
    .replace(/\{height\}/g, height.toString())
}
