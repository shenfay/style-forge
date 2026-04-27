export interface StyleConfig {
  // === 色彩系统 ===
  primaryColor: string          // 主色
  secondaryColor: string        // 辅助色
  accentColor: string           // 强调色
  backgroundColor: string       // 页面背景色
  cardBackgroundColor: string   // 卡片背景色
  titleColor: string            // 标题颜色
  textPrimary: string           // 正文颜色
  textSecondary: string         // 辅助颜色
  successColor: string          // 成功色
  warningColor: string          // 警告色
  errorColor: string            // 错误色
  
  // === 形状系统 ===
  cornerRadius: 'small' | 'medium' | 'large'  // 圆角半径
  cardStyle: 'border' | 'shadow' | 'borderless'  // 卡片样式
  buttonStyle: 'gradient' | 'solid' | 'wireframe'  // 按钮样式
  badgeStyle: 'rounded' | 'text-only'  // 标签徽章样式
  titleBarStyle: 'white-underline' | 'frosted-glass' | 'colored-bg'  // 标题栏样式
  switcherStyle: 'underline' | 'pill' | 'capsule'  // 切换器样式
  
  // === 间距系统 ===
  padding: 'compact' | 'medium' | 'relaxed'  // 内边距
  cardGap: 'small' | 'medium' | 'large'  // 卡片间距
  sectionGap: 'small' | 'medium' | 'large'  // 区块间距
  elementGap: 'compact' | 'medium' | 'relaxed'  // 元素间距
  
  // === 文字排版 ===
  titleStyle: 'left-accent' | 'right-accent' | 'bottom-accent' | 'plain'  // 标题装饰
  titleSize: 'small' | 'medium' | 'large'  // 标题大小
  titleWeight: 'normal' | 'medium' | 'bold'  // 标题字重
  bodySize: 'small' | 'medium' | 'large'  // 正文字号
  lineHeight: 'compact' | 'medium' | 'relaxed'  // 行高
}

export interface PresetConfig {
  id: string
  name: string
  description: string
  config: StyleConfig
}

export const radiusMap: Record<string, string> = {
  small: '8px',
  medium: '16px',
  large: '24px',
}

export const defaultConfig: StyleConfig = {
  // 色彩系统
  primaryColor: '#2E7D32',
  secondaryColor: '#5F7D2E',
  accentColor: '#2E7D67',
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#FFFFFF',
  titleColor: '#1A1A1A',
  textPrimary: '#333333',
  textSecondary: '#666666',
  successColor: '#52C41A',
  warningColor: '#FAAD14',
  errorColor: '#FF4D4F',
  
  // 形状系统
  cornerRadius: 'medium',
  cardStyle: 'borderless',
  buttonStyle: 'solid',
  badgeStyle: 'rounded',
  titleBarStyle: 'white-underline',
  switcherStyle: 'underline',
  
  // 间距系统
  padding: 'medium',
  cardGap: 'medium',
  sectionGap: 'medium',
  elementGap: 'medium',
  
  // 文字排版
  titleStyle: 'left-accent',
  titleSize: 'medium',
  titleWeight: 'bold',
  bodySize: 'medium',
  lineHeight: 'medium',
}

export const presets: PresetConfig[] = [
  {
    id: 'airy',
    name: '轻盈留白',
    description: '暖沙底色，阴影分层，无边框',
    config: {
      ...defaultConfig,
      backgroundColor: '#FFFFFF',
      primaryColor: '#2E7D32',
      cornerRadius: 'large',
      cardStyle: 'shadow',
      titleBarStyle: 'white-underline',
      switcherStyle: 'pill',
      buttonStyle: 'solid',
      badgeStyle: 'rounded',
      titleStyle: 'left-accent',
      titleSize: 'medium',
      titleWeight: 'bold',
      titleColor: '#1A1A1A',
    },
  },
  {
    id: 'minimal',
    name: '极简克制',
    description: '纯白底色，纯黑主色，分割线',
    config: {
      ...defaultConfig,
      backgroundColor: '#FFFFFF',
      primaryColor: '#000000',
      cornerRadius: 'small',
      cardStyle: 'borderless',
      titleBarStyle: 'white-underline',
      switcherStyle: 'underline',
      buttonStyle: 'wireframe',
      badgeStyle: 'text-only',
      titleStyle: 'plain',
      titleSize: 'medium',
      titleWeight: 'bold',
      titleColor: '#000000',
    },
  },
  {
    id: 'warm-yellow',
    name: '淡黄草绿',
    description: '淡黄底，草绿主色，下划线切换',
    config: {
      ...defaultConfig,
      backgroundColor: '#FFFDF5',
      primaryColor: '#5F7D2E',
      cornerRadius: 'medium',
      cardStyle: 'borderless',
      titleBarStyle: 'white-underline',
      switcherStyle: 'underline',
      buttonStyle: 'solid',
      badgeStyle: 'rounded',
      titleStyle: 'left-accent',
      titleSize: 'medium',
      titleWeight: 'bold',
      titleColor: '#1A1A1A',
    },
  },
  {
    id: 'mint-green',
    name: '淡绿青绿',
    description: '淡绿底，青绿主色，毛玻璃标题栏',
    config: {
      ...defaultConfig,
      backgroundColor: '#F5FAF5',
      primaryColor: '#2E7D67',
      cornerRadius: 'medium',
      cardStyle: 'borderless',
      titleBarStyle: 'frosted-glass',
      switcherStyle: 'pill',
      buttonStyle: 'solid',
      badgeStyle: 'rounded',
      titleStyle: 'left-accent',
      titleSize: 'medium',
      titleWeight: 'bold',
      titleColor: '#1A1A1A',
    },
  },
  {
    id: 'pure-white',
    name: '纯白黑白',
    description: '纯白底，纯黑主色，药丸切换',
    config: {
      ...defaultConfig,
      backgroundColor: '#FFFFFF',
      primaryColor: '#000000',
      cornerRadius: 'medium',
      cardStyle: 'borderless',
      titleBarStyle: 'white-underline',
      switcherStyle: 'pill',
      buttonStyle: 'solid',
      badgeStyle: 'rounded',
      titleStyle: 'plain',
      titleSize: 'medium',
      titleWeight: 'bold',
      titleColor: '#000000',
    },
  },
  {
    id: 'fusion',
    name: '配色融合',
    description: '极简结构，彩色点缀，渐变按钮',
    config: {
      ...defaultConfig,
      backgroundColor: '#FFFFFF',
      primaryColor: '#2E7D32',
      cornerRadius: 'medium',
      cardStyle: 'borderless',
      titleBarStyle: 'white-underline',
      switcherStyle: 'underline',
      buttonStyle: 'gradient',
      badgeStyle: 'rounded',
      titleStyle: 'left-accent',
      titleSize: 'medium',
      titleWeight: 'bold',
      titleColor: '#1A1A1A',
    },
  },
]
