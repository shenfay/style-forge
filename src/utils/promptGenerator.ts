import type { StyleConfig } from '../types/config'
import { radiusMap } from '../types/config'
import type { TemplateConfig } from '../types/template'

// 颜色命名辅助函数
function getColorName(hex: string): string {
  const colorNames: Record<string, string> = {
    '#FFFFFF': '纯白',
    '#F9F8F4': '暖沙',
    '#FFFDF5': '淡黄',
    '#F5FAF5': '淡绿',
    '#2E7D32': '森林绿',
    '#5F7D2E': '草绿',
    '#2E7D67': '青绿',
    '#000000': '纯黑',
    '#333333': '深灰',
    '#666666': '中灰',
    '#1A1A1A': '墨黑',
    '#52C41A': '亮绿',
    '#FAAD14': '金黄',
    '#FF4D4F': '亮红',
    '#DC2626': '危险红',
    '#D97706': '警告橙',
    '#16A34A': '安全绿',
  }
  return colorNames[hex.toUpperCase()] || hex
}

// 风格关键词映射
function getStyleKeywords(config: StyleConfig): string[] {
  const keywords: string[] = []
  
  // 基于背景色
  const bgKeywords: Record<string, string[]> = {
    '#F9F8F4': ['温暖', '舒适', '食品', '农业'],
    '#FFFFFF': ['极简', '专业', '现代', '科技'],
    '#FFFDF5': ['自然', '柔和', '温馨', '亲和'],
    '#F5FAF5': ['清新', '医疗', '清洁', '健康'],
  }
  keywords.push(...(bgKeywords[config.backgroundColor] || ['现代', '简洁']))
  
  // 基于主色
  const primaryKeywords: Record<string, string[]> = {
    '#2E7D32': ['安全', '可靠', '自然', '信任'],
    '#5F7D2E': ['自然', '有机', '健康', '活力'],
    '#2E7D67': ['专业', '信任', '健康', '冷静'],
    '#000000': ['高级', '极简', '克制', '专业'],
  }
  keywords.push(...(primaryKeywords[config.primaryColor] || ['现代', '专业']))
  
  // 基于圆角
  if (config.cornerRadius === 'large') keywords.push('圆润', '亲和')
  else if (config.cornerRadius === 'small') keywords.push('锐利', '严谨')
  
  // 基于按钮样式
  if (config.buttonStyle === 'gradient') keywords.push('渐变', '活力')
  else if (config.buttonStyle === 'wireframe') keywords.push('线框', '克制')
  
  return [...new Set(keywords)].slice(0, 8)
}

export function generateAIPrompt(
  config: StyleConfig,
  scene: string = '电商小程序',
  template?: TemplateConfig
): string {
  const bgName = getColorName(config.backgroundColor)
  const primaryName = getColorName(config.primaryColor)
  const keywords = getStyleKeywords(config).join('、')

  // 构建页面结构描述
  let structureSection = ''
  if (template?.aiPrompt?.sections) {
    const structureContent = template.aiPrompt.sections
      .map((s) => `${s.heading}\n${s.content}`)
      .join('\n\n')
    structureSection = `\n## 页面结构\n${structureContent}`
  }

  return `# UI设计配置提示词

## 项目背景
设计一个${scene}

## 配色方案（10维）
### 品牌色
- 主色: ${primaryName} ${config.primaryColor}
- 辅助色: ${getColorName(config.secondaryColor)} ${config.secondaryColor}
- 强调色: ${getColorName(config.accentColor)} ${config.accentColor}

### 背景色
- 页面底色: ${bgName} ${config.backgroundColor}
- 卡片背景: ${getColorName(config.cardBackgroundColor)} ${config.cardBackgroundColor}

### 文字色
- 标题色: ${getColorName(config.titleColor)} ${config.titleColor}
- 正文色: ${getColorName(config.textPrimary)} ${config.textPrimary}
- 辅助色: ${getColorName(config.textSecondary)} ${config.textSecondary}

### 语义色
- 成功色: ${getColorName(config.successColor)} ${config.successColor}
- 警告色: ${getColorName(config.warningColor)} ${config.warningColor}
- 错误色: ${getColorName(config.errorColor)} ${config.errorColor}

## 设计规范（15维）
### 形状系统（6维）
- 圆角: ${radiusMap[config.cornerRadius]} (${config.cornerRadius})
- 卡片: ${config.cardStyle === 'border' ? '边框样式' : config.cardStyle === 'shadow' ? '阴影样式' : '无边框无阴影'}
- 按钮: ${config.buttonStyle === 'gradient' ? '渐变背景' : config.buttonStyle === 'solid' ? '纯色填充' : '线框样式'}
- 标签: ${config.badgeStyle === 'rounded' ? '圆角底色' : '纯文字'}
- 标题栏: ${config.titleBarStyle === 'white-underline' ? '白色背景+下划线' : config.titleBarStyle === 'frosted-glass' ? '毛玻璃效果' : '彩色背景'}
- 切换器: ${config.switcherStyle === 'underline' ? '下划线式' : config.switcherStyle === 'pill' ? '药丸形' : '胶囊形'}

### 间距系统（4维）
- 内边距: ${config.padding}
- 卡片间距: ${config.cardGap}
- 区块间距: ${config.sectionGap}
- 元素间距: ${config.elementGap}

### 文字排版（5维）
- 标题装饰: ${config.titleStyle}
- 标题大小: ${config.titleSize}
- 标题字重: ${config.titleWeight}
- 正文字号: ${config.bodySize}
- 行高: ${config.lineHeight}
${structureSection}

## 风格关键词
${keywords}
`
}
