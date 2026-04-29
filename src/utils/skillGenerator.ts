import type { StyleConfig } from '../types/config'
import { radiusMap } from '../types/config'
import type { TemplateConfig } from '../types/template'

// 颜色命名辅助函数
function getColorName(hex: string): string {
  const colorNames: Record<string, string> = {
    '#FFFFFF': 'Pure White',
    '#F9F8F4': 'Warm Sand',
    '#FFFDF5': 'Light Yellow',
    '#F5FAF5': 'Light Green',
    '#2E7D32': 'Forest Green',
    '#5F7D2E': 'Grass Green',
    '#2E7D67': 'Teal Green',
    '#000000': 'Pure Black',
    '#333333': 'Dark Gray',
    '#666666': 'Medium Gray',
    '#1A1A1A': 'Ink Black',
    '#52C41A': 'Bright Green',
    '#FAAD14': 'Golden Yellow',
    '#FF4D4F': 'Bright Red',
    '#DC2626': 'Danger Red',
    '#D97706': 'Warning Orange',
    '#16A34A': 'Safe Green',
  }
  return colorNames[hex.toUpperCase()] || hex
}

// 生成 Tailwind 配置代码片段
function generateTailwindSnippet(config: StyleConfig): string {
  return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${config.primaryColor}',
        secondary: '${config.secondaryColor}',
        accent: '${config.accentColor}',
        background: '${config.backgroundColor}',
        card: '${config.cardBackgroundColor}',
        title: '${config.titleColor}',
        'text-primary': '${config.textPrimary}',
        'text-secondary': '${config.textSecondary}',
        success: '${config.successColor}',
        warning: '${config.warningColor}',
        error: '${config.errorColor}',
      },
      borderRadius: {
        custom: '${radiusMap[config.cornerRadius]}',
      },
      spacing: {
        'card-gap': '${config.cardGap === 'small' ? '8px' : config.cardGap === 'medium' ? '16px' : '24px'}',
        'section-gap': '${config.sectionGap === 'small' ? '16px' : config.sectionGap === 'medium' ? '24px' : '32px'}',
        'element-gap': '${config.elementGap === 'compact' ? '4px' : config.elementGap === 'medium' ? '8px' : '12px'}',
      },
    },
  },
}`
}

// 生成 CSS 变量代码片段
function generateCSSVariablesSnippet(config: StyleConfig): string {
  return `:root {
  /* 色彩系统 */
  --color-primary: ${config.primaryColor};
  --color-secondary: ${config.secondaryColor};
  --color-accent: ${config.accentColor};
  --color-background: ${config.backgroundColor};
  --color-card-bg: ${config.cardBackgroundColor};
  --color-title: ${config.titleColor};
  --color-text-primary: ${config.textPrimary};
  --color-text-secondary: ${config.textSecondary};
  --color-success: ${config.successColor};
  --color-warning: ${config.warningColor};
  --color-error: ${config.errorColor};

  /* 形状系统 */
  --radius-custom: ${radiusMap[config.cornerRadius]};
  
  /* 间距系统 */
  --spacing-card-gap: ${config.cardGap === 'small' ? '8px' : config.cardGap === 'medium' ? '16px' : '24px'};
  --spacing-section-gap: ${config.sectionGap === 'small' ? '16px' : config.sectionGap === 'medium' ? '24px' : '32px'};
  --spacing-element-gap: ${config.elementGap === 'compact' ? '4px' : config.elementGap === 'medium' ? '8px' : '12px'};
}`
}

// 生成卡片样式代码
function generateCardStyle(config: StyleConfig): string {
  const styles: Record<string, string> = {
    border: `border: 1px solid #E5E4E0;
box-shadow: none;`,
    shadow: `border: none;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);`,
    borderless: `border: none;
box-shadow: none;
background: ${config.cardBackgroundColor};`,
  }
  return styles[config.cardStyle] || styles.borderless
}

// 生成按钮样式代码
function generateButtonStyle(config: StyleConfig, variant: 'primary' | 'secondary' = 'primary'): string {
  const color = variant === 'primary' ? config.primaryColor : config.secondaryColor
  
  if (config.buttonStyle === 'gradient') {
    return `background: linear-gradient(135deg, ${color}, ${color}CC);
color: #FFFFFF;
border: none;
border-radius: ${radiusMap[config.cornerRadius]};
padding: 12px 24px;
font-weight: 500;`
  } else if (config.buttonStyle === 'solid') {
    return `background: ${color};
color: #FFFFFF;
border: none;
border-radius: ${radiusMap[config.cornerRadius]};
padding: 12px 24px;
font-weight: 500;`
  } else {
    return `background: transparent;
color: ${color};
border: 1px solid ${color};
border-radius: ${radiusMap[config.cornerRadius]};
padding: 12px 24px;
font-weight: 500;`
  }
}

export function generateSkillDoc(
  config: StyleConfig,
  scene: string = 'E-commerce',
  device: string = 'mobile',
  template?: TemplateConfig
): string {
  const templateName = template?.name || 'Default Template'
  const pageTitle = `${scene} - ${templateName} Design Specification`

  return `# ${pageTitle}

## 1. System Overview

- **Scene**: ${scene}
- **Device**: ${device}
- **Page Type**: ${template?.type || 'N/A'}
- **Template**: ${templateName}

---

## 2. Color System (10 Dimensions)

### 2.1 Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary | \`${config.primaryColor}\` (${getColorName(config.primaryColor)}) | Main buttons, links, active states |
| Secondary | \`${config.secondaryColor}\` (${getColorName(config.secondaryColor)}) | Secondary buttons, tags |
| Accent | \`${config.accentColor}\` (${getColorName(config.accentColor)}) | Icons, decorative elements |

### 2.2 Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| Page Background | \`${config.backgroundColor}\` (${getColorName(config.backgroundColor)}) | Page base background |
| Card Background | \`${config.cardBackgroundColor}\` (${getColorName(config.cardBackgroundColor)}) | Cards, panels |

### 2.3 Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| Title | \`${config.titleColor}\` (${getColorName(config.titleColor)}) | All level headings |
| Primary Text | \`${config.textPrimary}\` (${getColorName(config.textPrimary)}) | Body content |
| Secondary Text | \`${config.textSecondary}\` (${getColorName(config.textSecondary)}) | Hints, timestamps |

### 2.4 Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| Success | \`${config.successColor}\` (${getColorName(config.successColor)}) | Success states, safe labels |
| Warning | \`${config.warningColor}\` (${getColorName(config.warningColor)}) | Warning messages |
| Error | \`${config.errorColor}\` (${getColorName(config.errorColor)}) | Error states, danger labels |

---

## 3. Shape System (6 Dimensions)

### 3.1 Border Radius

- **Size**: \`${radiusMap[config.cornerRadius]}\` (\`${config.cornerRadius}\`)
- **Applied to**: Buttons, cards, inputs, badges

### 3.2 Card Style

**Style**: \`${config.cardStyle}\`

\`\`\`css
.card {
  ${generateCardStyle(config)}
}
\`\`\`

### 3.3 Button Style

**Style**: \`${config.buttonStyle}\`

#### Primary Button
\`\`\`css
.btn-primary {
  ${generateButtonStyle(config, 'primary')}
}
\`\`\`

#### Secondary Button
\`\`\`css
.btn-secondary {
  ${generateButtonStyle(config, 'secondary')}
}
\`\`\`

### 3.4 Badge Style

**Style**: \`${config.badgeStyle}\`

${config.badgeStyle === 'rounded' ? `\`\`\`css
.badge {
  border-radius: 999px;
  background: ${config.primaryColor}14;
  color: ${config.primaryColor};
  padding: 4px 12px;
}
\`\`\`` : `\`\`\`css
.badge {
  background: transparent;
  color: ${config.primaryColor};
  padding: 4px 8px;
}
\`\`\``}

### 3.5 Title Bar Style

**Style**: \`${config.titleBarStyle}\`

${config.titleBarStyle === 'white-underline' ? `\`\`\`css
.title-bar {
  background: #FFFFFF;
  border-bottom: 1px solid #E5E4E0;
}
\`\`\`` : config.titleBarStyle === 'frosted-glass' ? `\`\`\`css
.title-bar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}
\`\`\`` : `\`\`\`css
.title-bar {
  background: ${config.primaryColor};
  color: #FFFFFF;
}
\`\`\``}

### 3.6 Switcher Style

**Style**: \`${config.switcherStyle}\`

${config.switcherStyle === 'underline' ? `Bottom border underline style` : config.switcherStyle === 'pill' ? `Pill-shaped container with rounded background` : `Capsule style with border`}

---

## 4. Spacing System (4 Dimensions)

### 4.1 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| Padding | \`${config.padding}\` | Container internal spacing |
| Card Gap | \`${config.cardGap}\` | Between cards |
| Section Gap | \`${config.sectionGap}\` | Between sections |
| Element Gap | \`${config.elementGap}\` | Between small elements |

---

## 5. Typography System (5 Dimensions)

### 5.1 Heading System

- **Decoration**: \`${config.titleStyle}\`
- **Size**: \`${config.titleSize}\`
- **Weight**: \`${config.titleWeight}\`

### 5.2 Body Text

- **Size**: \`${config.bodySize}\`
- **Line Height**: \`${config.lineHeight}\`

---

## 6. Component Guidelines

### 6.1 Component List

Standard UI components based on template structure and page type.

---

## 7. Configuration Linkage Rules

- **Large Radius** → Stronger shadow + Larger padding
- **Large Title** → Thicker decoration line + Larger spacing
- **Relaxed Line Height** → Larger paragraph gap

---

## 8. Page Structure

${template?.aiPrompt?.sections ? template.aiPrompt.sections.map((s) => `### ${s.heading}\n${s.content}`).join('\n\n---\n\n') : 'Standard page layout based on template type.'}

---

## 9. Interaction Requirements

- All interactive elements use primary color for active states
- Hover effects follow button style configuration
- Transitions are smooth and consistent

---

## 10. Tailwind Configuration

\`\`\`javascript
${generateTailwindSnippet(config)}
\`\`\`

---

## 11. CSS Variables

\`\`\`css
${generateCSSVariablesSnippet(config)}
\`\`\`

---

## 12. Preview Link

Access the interactive preview at the provided URL to see live updates.

---

**Generated by Style Forge** | Design System Configuration Tool
`
}
