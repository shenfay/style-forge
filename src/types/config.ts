export interface StyleConfig {
  backgroundColor: string
  primaryColor: string
  cornerRadius: 'small' | 'medium' | 'large'
  cardStyle: 'border' | 'shadow' | 'borderless'
  titleBarStyle: 'white-underline' | 'frosted-glass' | 'colored-bg'
  switcherStyle: 'underline' | 'pill' | 'capsule'
  buttonStyle: 'gradient' | 'solid' | 'wireframe'
  badgeStyle: 'rounded' | 'text-only'
  // 标题样式配置
  titleStyle: 'left-accent' | 'right-accent' | 'bottom-accent' | 'plain'
  titleSize: 'small' | 'medium' | 'large'
  titleWeight: 'normal' | 'medium' | 'bold'
  titleColor: string
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
  backgroundColor: '#F9F8F4',
  primaryColor: '#2E7D32',
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
}

export const presets: PresetConfig[] = [
  {
    id: 'airy',
    name: '轻盈留白',
    description: '暖沙底色，阴影分层，无边框',
    config: {
      backgroundColor: '#F9F8F4',
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
