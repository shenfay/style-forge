import type { StyleConfig } from '../types/config'

const paramMapping = {
  backgroundColor: 'bg',
  primaryColor: 'primary',
  cornerRadius: 'radius',
  cardStyle: 'card',
  titleBarStyle: 'title',
  switcherStyle: 'switch',
  buttonStyle: 'button',
  badgeStyle: 'badge',
} as const

const reverseMapping: Record<string, keyof StyleConfig> = {
  bg: 'backgroundColor',
  primary: 'primaryColor',
  radius: 'cornerRadius',
  card: 'cardStyle',
  title: 'titleBarStyle',
  switch: 'switcherStyle',
  button: 'buttonStyle',
  badge: 'badgeStyle',
}

const shortValues: Record<string, Record<string, string>> = {
  radius: { small: 's', medium: 'm', large: 'l' },
  card: { border: 'b', shadow: 's', borderless: 'n' },
  title: { 'white-underline': 'w', 'frosted-glass': 'f', 'colored-bg': 'c' },
  switch: { underline: 'u', pill: 'p', capsule: 'c' },
  button: { gradient: 'g', solid: 's', wireframe: 'w' },
  badge: { rounded: 'r', 'text-only': 't' },
}

const reverseValues: Record<string, Record<string, string>> = {
  radius: { s: 'small', m: 'medium', l: 'large' },
  card: { b: 'border', s: 'shadow', n: 'borderless' },
  title: { w: 'white-underline', f: 'frosted-glass', c: 'colored-bg' },
  switch: { u: 'underline', p: 'pill', c: 'capsule' },
  button: { g: 'gradient', s: 'solid', w: 'wireframe' },
  badge: { r: 'rounded', t: 'text-only' },
}

export function encodeConfig(config: StyleConfig): string {
  const params = new URLSearchParams()

  params.set('bg', config.backgroundColor.replace('#', ''))
  params.set('primary', config.primaryColor.replace('#', ''))
  params.set('radius', shortValues.radius[config.cornerRadius] || 'm')
  params.set('card', shortValues.card[config.cardStyle] || 'n')
  params.set('title', shortValues.title[config.titleBarStyle] || 'w')
  params.set('switch', shortValues.switch[config.switcherStyle] || 'u')
  params.set('button', shortValues.button[config.buttonStyle] || 's')
  params.set('badge', shortValues.badge[config.badgeStyle] || 'r')

  return params.toString()
}

export function decodeConfig(searchParams: string | URLSearchParams): StyleConfig | null {
  const params = typeof searchParams === 'string' 
    ? new URLSearchParams(searchParams) 
    : searchParams

  if (!params.has('bg') && !params.has('primary')) {
    return null
  }

  const bg = params.get('bg')
  const primary = params.get('primary')

  return {
    backgroundColor: bg ? `#${bg}` : '#F9F8F4',
    primaryColor: primary ? `#${primary}` : '#2E7D32',
    cornerRadius: reverseValues.radius[params.get('radius') || ''] || 'medium',
    cardStyle: reverseValues.card[params.get('card') || ''] || 'borderless',
    titleBarStyle: reverseValues.title[params.get('title') || ''] || 'white-underline',
    switcherStyle: reverseValues.switch[params.get('switch') || ''] || 'underline',
    buttonStyle: reverseValues.button[params.get('button') || ''] || 'solid',
    badgeStyle: reverseValues.badge[params.get('badge') || ''] || 'rounded',
  }
}
