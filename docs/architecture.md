# Style Forge 架构设计文档

## 系统架构概览

Style Forge 采用**零后端架构**，所有状态通过 URL 参数管理，模板数据以静态 JSON 文件存储，实现完全的前端驱动。

```
┌─────────────────────────────────────────────────────────────┐
│                      用户浏览器                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  左侧导航栏   │  │  中间预览区   │  │  右侧配置面板  │       │
│  │  (224px)     │  │  (自适应)     │  │  (320px)     │       │
│  │              │  │              │  │              │       │
│  │ • 模板选择    │  │ • 手机预览    │  │ • 场景选择    │       │
│  │ • 色彩系统    │  │ • PC预览     │  │ • 模板选择    │       │
│  │ • 形状系统    │  │ • 设备切换    │  │ • 20维配置    │       │
│  │ • 间距系统    │  │              │  │              │       │
│  │ • 文字排版    │  │              │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   URL 状态管理    │
                    │  (?scene=...&    │
                    │   device=...&    │
                    │   template=...&  │
                    │   config=...)    │
                    └──────────────────┘
```

---

## 核心架构分层

### 1. 展示层 (Presentation Layer)

#### 1.1 布局架构

**四栏专业布局**：
- **顶栏** (56px): 全局操作（项目/编辑/视图菜单 + 导出按钮）
- **左侧导航** (224px): 配置分类菜单
- **中间预览** (自适应): 设备模拟器 + 预览内容
- **右侧面板** (320px): 属性配置区

#### 1.2 核心组件

```
App.tsx (主应用)
├── Header (顶栏)
├── LeftSidebar (左侧导航)
│   └── MenuItems (配置菜单)
├── MainPreview (中间预览)
│   ├── PreviewToolbar (预览工具栏)
│   ├── MobilePreview (手机预览)
│   └── DesktopPreview (PC预览)
└── RightPanel (右侧面板)
    ├── SceneSelector (场景选择器)
    ├── TemplateSelector (模板选择器)
    └── StyleConfigurator (样式配置器)
        ├── ColorSection (色彩配置)
        ├── ShapeSection (形状配置)
        ├── SpacingSection (间距配置)
        └── TypographySection (排版配置)
```

### 2. 配置层 (Configuration Layer)

#### 2.1 20维配置矩阵

```typescript
StyleConfig {
  // 色彩系统 (10维)
  primaryColor, secondaryColor, accentColor,
  backgroundColor, cardBackgroundColor,
  titleColor, textPrimary, textSecondary,
  successColor, warningColor, errorColor,
  
  // 形状系统 (6维)
  cornerRadius, cardStyle, buttonStyle,
  badgeStyle, titleBarStyle, switcherStyle,
  
  // 间距系统 (4维)
  padding, cardGap, sectionGap, elementGap,
  
  // 文字排版 (5维)
  titleStyle, titleSize, titleWeight,
  bodySize, lineHeight
}
```

#### 2.2 配置联动机制

**设计令牌系统** (`design-tokens.ts`):

```
StyleConfig (用户配置)
       ↓
generateComponentTokens() (转换函数)
       ↓
ComponentTokens (组件可用的样式值)
       ↓
  - card: { borderRadius, boxShadow, border, ... }
  - button: { borderRadius, backgroundColor, border, ... }
  - tag: { borderRadius, backgroundColor, color }
  - sectionHeader: { titleSize, titleWeight, decoration, ... }
  - typography: { bodySize, lineHeight, paragraphGap }
```

**联动规则示例**：
- 大圆角 (`large`) → 更强阴影 (`shadows.lg`) + 更大内边距 (`spacing.md`)
- 大标题 (`large`) → 更粗装饰线 (`4px`) + 更大间距 (`18px`)
- 宽松行高 (`relaxed`) → 更大段落间距 (`spacing.md`)

### 3. 数据层 (Data Layer)

#### 3.1 模板系统

**模板 JSON 结构**：

```json
{
  "id": "ecommerce-homepage",
  "name": "B2C商城首页",
  "scene": "ecommerce",
  "device": "mobile | desktop",
  "type": "home | detail | list | form | settings | result",
  "description": "...",
  "components": [...],
  "defaultStyle": { ... },
  "layout": {
    "type": "single-column | two-column | grid",
    "regions": [...]
  },
  "aiPrompt": {
    "title": "...",
    "sections": [...]
  }
}
```

**模板加载流程**：

```
URL参数 (?scene=ecommerce&device=desktop&template=home)
       ↓
templateLoader.loadTemplates(scene) (加载场景所有模板)
       ↓
templateLoader.findTemplate(scene, device, type) (查找匹配模板)
       ↓
返回 TemplateConfig 对象
```

#### 3.2 URL 状态管理

**编码策略**：
- 基础参数：明文传递 (`scene`, `device`, `template`)
- 自定义配置：Base64 编码 (`config`)

**同步机制**：
```
用户操作 → 更新 config state → useEffect 监听 → 编码为 Base64 → 更新 URL
URL 变化 → useUrlConfig Hook 解析 → 解码 Base64 → 更新 config state
```

### 4. 工具层 (Utility Layer)

#### 4.1 核心工具函数

| 工具文件 | 功能 | 主要函数 |
|---------|------|---------|
| `configEncoder.ts` | 配置编解码 | `encodeConfig()`, `decodeConfig()` |
| `design-tokens.ts` | 设计令牌生成 | `generateComponentTokens()` |
| `tailwindGenerator.ts` | Tailwind 配置生成 | `generateTailwindConfig()`, `generateCSSVariables()` |
| `promptGenerator.ts` | AI 提示词生成 | `generateAIPrompt()` |
| `templateLoader.ts` | 模板加载 | `loadTemplates()`, `findTemplate()` |
| `config-helpers.ts` | 配置辅助函数 | 各种配置相关的辅助函数 |

#### 4.2 导出功能

支持三种导出格式：

1. **Tailwind Config** (`tailwind.config.js`):
   - 生成完整的 Tailwind 配置文件
   - 包含 colors、borderRadius、spacing 等自定义配置

2. **CSS Variables** (`style-forge.css`):
   - 生成 CSS 自定义属性
   - 便于在非 Tailwind 项目中使用

3. **AI Prompt** (`ai-prompt.md`):
   - 生成结构化的设计描述
   - 包含配色方案、设计规范、页面结构、风格关键词

---

## 数据流架构

### 单向数据流

```
用户交互 (右侧配置面板)
    ↓
更新 State (setConfig)
    ↓
触发 Effect (useEffect)
    ↓
更新 URL (history.replaceState)
    ↓
预览组件自动更新 (config props)
    ↓
设计令牌重新计算 (generateComponentTokens)
    ↓
UI 重新渲染
```

### URL 同步流程

```
页面加载
    ↓
useUrlConfig Hook 解析 URL
    ↓
提取 scene, device, template, config
    ↓
解码 config (如果是 Base64)
    ↓
加载对应模板 (templateLoader)
    ↓
初始化 config state
    ↓
渲染预览组件
```

---

## 组件设计模式

### 1. 预览组件模式

**职责分离**：
- `MobilePreview`: 负责移动端布局 (375×812)
- `DesktopPreview`: 负责 PC 端布局 (1440×900)
- 两者共享相同的 `config` props，但布局逻辑独立

**模板渲染**：
```tsx
<MobilePreview 
  config={config} 
  pageType={currentTemplate?.type || 'result'}
/>
```

### 2. 配置器模式

**分段配置**：
```tsx
<StyleConfigurator 
  config={config} 
  onChange={setConfig}
  activeSection={activeSection} // 'colors' | 'shape' | 'spacing' | 'typography'
/>
```

**配置项组件化**：
- 每个配置维度独立组件
- 统一的 `onChange` 回调
- 支持实时预览

### 3. 模板驱动模式

**数据驱动渲染**：
```json
// 模板定义
{
  "components": [
    { "type": "Navigation", "props": {...} },
    { "type": "Carousel", "props": {...} }
  ]
}
```

```tsx
// 动态渲染
{template.components.map((comp, idx) => {
  const Component = componentMap[comp.type]
  return <Component key={idx} {...comp.props} config={config} />
})}
```

---

## 扩展性设计

### 1. 场景扩展

**添加新场景步骤**：

1. 创建场景模板 JSON (`src/templates/{scene}.json`)
2. 定义场景内的多个模板（移动端 + PC端）
3. 更新 `SceneType` 类型定义
4. 预览组件自动支持（通过 templateLoader）

### 2. 配置维度扩展

**添加新配置维度**：

1. 更新 `StyleConfig` 接口 (`src/types/config.ts`)
2. 更新 `defaultConfig` 默认值
3. 在 `StyleConfigurator` 中添加配置 UI
4. 在 `generateComponentTokens` 中添加联动逻辑
5. 更新导出工具（Tailwind/AI Prompt）

### 3. 组件扩展

**添加新预览组件**：

1. 创建组件文件 (`src/components/Preview/{Component}.tsx`)
2. 接收 `config` props 并应用设计令牌
3. 在模板 JSON 中引用组件类型
4. 在预览组件中添加组件映射

---

## 性能优化策略

### 1. 配置联动缓存

```typescript
// 记忆化令牌生成
const tokens = useMemo(() => 
  generateComponentTokens(config), 
  [config]
)
```

### 2. 模板懒加载

```typescript
// 按需加载场景模板
const loadTemplates = async (scene: SceneType) => {
  const module = await import(`../templates/${scene}.json`)
  return module.default
}
```

### 3. URL 同步节流

```typescript
// 避免频繁更新 URL
useEffect(() => {
  const timer = setTimeout(() => {
    // 更新 URL
  }, 300)
  return () => clearTimeout(timer)
}, [config])
```

---

## 技术栈选型

| 层级 | 技术 | 选型理由 |
|------|------|---------|
| 框架 | React 18 + TypeScript | 类型安全、生态成熟 |
| 构建 | Vite 5 | 快速热更新、轻量 |
| 样式 | Tailwind CSS 3 | 原子化 CSS、配置友好 |
| 状态 | React Hooks + URL | 零后端、可分享 |
| 路由 | URL 参数 | 简单、无需额外依赖 |

---

## 部署架构

```
开发者 ──▶ Git Push ──▶ Vercel/Cloudflare Pages
                                  │
                                  ▼
                          自动构建 + 部署
                                  │
                                  ▼
                        全球 CDN 分发 (静态文件)
                                  │
                                  ▼
                            用户浏览器
```

**零后端优势**：
- 无需服务器维护
- 自动扩展
- 全球 CDN 加速
- 成本极低（免费额度充足）

---

## 安全考虑

### 1. XSS 防护

- 模板数据为静态 JSON，不涉及用户输入
- URL 参数仅用于配置恢复，不直接渲染

### 2. CSP 策略

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

---

## 未来架构演进

### v1.5 - Edge Functions

```
用户 ──▶ Edge Function (动态模板生成)
              ↓
         静态 JSON (基础模板)
              ↓
         返回完整模板配置
```

### v2.0 - MCP Server

```
LLM ──▶ MCP Protocol ──▶ Style Forge MCP Server
                              ↓
                         调用工具函数
                         - get_templates
                         - generate_config
                         - export_prompt
```

---

**文档版本**: 1.0  
**最后更新**: 2026-04-19  
**维护者**: Style Forge Team
