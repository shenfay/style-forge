# 文件命名规范

## 规范概述

本项目遵循 React 项目通用命名约定，确保代码库的一致性和可维护性。

## 命名规则

| 文件类型 | 命名风格 | 示例 | 说明 |
|---------|---------|------|------|
| **React 组件** | PascalCase | `NavBar.tsx`, `StatusBar.tsx`, `HomePage.tsx` | 组件文件名首字母大写 |
| **Custom Hooks** | camelCase | `useDesignerState.ts`, `useSEOMeta.ts`, `useTheme.ts` | 必须以 `use` 开头 |
| **工具函数** | camelCase | `configEncoder.ts`, `tokenResolver.ts`, `promptGenerator.ts` | 小驼峰命名 |
| **类型定义** | camelCase | `config.ts`, `template.ts` | 类型文件小驼峰 |
| **设计令牌** | kebab-case | `border-radius.ts`, `dark-mode.ts`, `editor-tokens.ts` | 符合 CSS 命名习惯 |
| **配置文件** | camelCase | `vite.config.ts`, `eslint.config.js` | 构建配置小驼峰 |
| **文档文件** | kebab-case | `development-plan.md`, `integration-guide.md` | 文档使用中划线 |

## 目录结构示例

```
src/
├── components/          # PascalCase
│   ├── UI/
│   │   ├── NavBar.tsx
│   │   └── Card.tsx
│   └── Preview/
│       ├── DesktopPreview.tsx
│       └── templates/
│           └── HomePage.tsx
├── hooks/               # camelCase (use 前缀)
│   ├── useDesignerState.ts
│   └── useTheme.ts
├── types/               # camelCase
│   ├── config.ts
│   └── template.ts
├── tokens/              # kebab-case
│   ├── border-radius.ts
│   ├── colors.ts
│   └── dark-mode.ts
└── utils/               # camelCase
    ├── configEncoder.ts
    ├── tokenResolver.ts
    └── promptGenerator.ts
```

## 命名原则

1. **组件用 PascalCase**：与 JSX 元素名一致，便于识别
2. **Hooks 用 camelCase**：必须以 `use` 开头，符合 React 规范
3. **工具函数用 camelCase**：与 JavaScript 函数命名一致
4. **设计令牌用 kebab-case**：与 CSS 变量命名风格统一
5. **避免特殊字符**：仅使用字母、数字、中划线（kebab-case）或无分隔符（camelCase/PascalCase）

## 导入路径规范

```typescript
// ✅ 正确
import { NavBar } from '../../UI/NavBar'
import { useTheme } from '../../hooks/useTheme'
import { colors } from '../../tokens/colors'
import { generateComponentTokens } from '../../utils/tokenResolver'

// ❌ 错误
import { navbar } from '../../UI/navbar'  // 组件应 PascalCase
import { Theme } from '../../hooks/Theme'  // Hook 应 use 前缀 + camelCase
```

## 历史说明

本项目早期存在命名不统一问题，已于 2026-04-30 完成规范统一：
- `config-helpers.ts` → `configHelpers.ts`
- `design-tokens.ts` → `tokenResolver.ts`（令牌解析器，准确表达"配置→组件令牌"的转换职责）
- 所有引用路径已同步更新
