import type { StyleConfig } from '../types/config'
import { radiusMap } from '../types/config'

export function generateTailwindConfig(config: StyleConfig): string {
  return `// tailwind.config.js
// 由 Style Forge 生成 - https://styleforge.dev

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${config.primaryColor}',
        background: '${config.backgroundColor}',
        danger: '#DC2626',
        warning: '#D97706',
        safe: '#16A34A',
      },
      borderRadius: {
        custom: '${radiusMap[config.cornerRadius]}',
      },
    },
  },
}
`
}

export function generateCSSVariables(config: StyleConfig): string {
  return `/* Style Forge 生成的 CSS 变量 */
:root {
  --color-primary: ${config.primaryColor};
  --color-background: ${config.backgroundColor};
  --color-danger: #DC2626;
  --color-warning: #D97706;
  --color-safe: #16A34A;
  --radius-custom: ${radiusMap[config.cornerRadius]};
}
`
}
