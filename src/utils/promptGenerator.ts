import type { StyleConfig } from '../types/config'
import { radiusMap } from '../types/config'

const colorNames: Record<string, string> = {
  '#FFFFFF': '纯白',
  '#F9F8F4': '暖沙',
  '#FFFDF5': '淡黄',
  '#F5FAF5': '淡绿',
  '#2E7D32': '森林绿',
  '#5F7D2E': '草绿',
  '#2E7D67': '青绿',
  '#000000': '纯黑',
}

const styleKeywords: Record<string, string[]> = {
  '#F9F8F4': ['温暖', '舒适', '食品', '农业'],
  '#FFFFFF': ['极简', '专业', '现代', '科技'],
  '#FFFDF5': ['自然', '柔和', '温馨', '亲和'],
  '#F5FAF5': ['清新', '医疗', '清洁', '健康'],
  '#2E7D32': ['安全', '可靠', '自然', '信任'],
  '#5F7D2E': ['自然', '有机', '健康', '活力'],
  '#2E7D67': ['专业', '信任', '健康', '冷静'],
  '#000000': ['高级', '极简', '克制', '专业'],
}

export function generateAIPrompt(config: StyleConfig, scene: string = '食品扫描小程序扫码结果页'): string {
  const bgName = colorNames[config.backgroundColor] || config.backgroundColor
  const primaryName = colorNames[config.primaryColor] || config.primaryColor
  const keywords = [...(styleKeywords[config.backgroundColor] || []), ...(styleKeywords[config.primaryColor] || [])]
  const uniqueKeywords = [...new Set(keywords)].slice(0, 6).join('、')

  return `# UI设计配置提示词

## 项目背景
设计一个${scene}

## 配色方案
- 页面底色: ${bgName}色 ${config.backgroundColor}
- 主题色: ${primaryName}色 ${config.primaryColor}
- 危险色: 红色 #DC2626 (用于警告/错误)
- 警告色: 橙色 #D97706 (注意/提醒)
- 安全色: 绿色 #16A34A (成功/通过)

## 设计规范
- 圆角: ${radiusMap[config.cornerRadius]} (${config.cornerRadius === 'small' ? '小' : config.cornerRadius === 'medium' ? '中' : '大'}圆角, 用于按钮、卡片、标签)
- 卡片: ${config.cardStyle === 'border' ? '边框样式' : config.cardStyle === 'shadow' ? '纯阴影样式' : '无边框无阴影,纯排版布局'}
- 标题栏: ${config.titleBarStyle === 'white-underline' ? '纯白背景+下划线分割' : config.titleBarStyle === 'frosted-glass' ? '毛玻璃效果(背景模糊)' : '彩色底色(使用主题色)'}
- 切换器: ${config.switcherStyle === 'underline' ? '下划线式,彩色文字' : config.switcherStyle === 'pill' ? '药丸容器,圆形背景' : '胶囊样式,带边框'}
- 按钮: ${config.buttonStyle === 'gradient' ? '渐变背景(135度)' : config.buttonStyle === 'solid' ? '纯色填充(主题色)' : '线框样式(仅边框,无填充)'}
- 标签: ${config.badgeStyle === 'rounded' ? '圆角底色(半透明背景+彩色文字)' : '纯文字(无背景)'}

## 组件要求
1. 风险结论区: 大图标+标题+描述文字
2. 产品信息卡: 名称+规格列表
3. 成分分析表: 名称+描述+风险标签
4. 底部操作栏: 收藏+确认食用按钮

## 风格关键词
${uniqueKeywords}
`
}
