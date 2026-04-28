# Style Forge 模板扩展指南

本文档指导你如何为 Style Forge 添加新的场景和模板。

---

## 模板系统架构

### 模板层级结构

```
场景 (Scene)
  ├── 移动端模板 (Mobile Templates)
  │   ├── 首页 (home)
  │   ├── 详情页 (detail)
  │   ├── 列表页 (list)
  │   ├── 作者页 (profile)
  │   ├── 消息页 (messages)
  │   ├── 表单页 (form)
  │   ├── 设置页 (settings)
  │   └── 结果页 (result)
  └── 桌面端模板 (Desktop Templates)
      ├── 首页 (home)
      ├── 详情页 (detail)
      ├── 列表页 (list)
      ├── 作者页 (profile)
      ├── 消息页 (messages)
      ├── 表单页 (form)
      ├── 设置页 (settings)
      └── 结果页 (result)
```

### 模板文件组织

```
src/templates/
├── ecommerce.json      # 电商场景
├── content.json        # 内容平台场景
└── ...                 # 后续场景按需添加
```

---

## 模板 JSON 结构详解

### 完整模板示例

```json
{
  "id": "ecommerce-homepage",
  "name": "B2C商城首页",
  "scene": "ecommerce",
  "device": "mobile",
  "type": "home",
  "description": "B2C电商商城首页，包含搜索、轮播、分类导航等核心模块",
  
  "components": [
    {
      "type": "Navigation",
      "props": {
        "position": "top",
        "items": ["search-bar", "scan-icon", "message-icon"],
        "height": "44px"
      }
    }
  ],
  
  "defaultStyle": {
    "backgroundColor": "#F9F8F4",
    "primaryColor": "#FF6B35",
    "cornerRadius": "medium",
    "cardStyle": "shadow",
    "titleBarStyle": "white-underline",
    "switcherStyle": "pill",
    "buttonStyle": "gradient",
    "badgeStyle": "rounded"
  },
  
  "layout": {
    "type": "single-column",
    "regions": [
      {
        "id": "header",
        "name": "顶部导航",
        "type": "header",
        "height": "44px",
        "components": ["back-button", "share-button", "more-menu"]
      }
    ]
  },
  
  "aiPrompt": {
    "title": "电商商品详情页（移动端）",
    "sections": [
      {
        "heading": "## 页面结构",
        "content": "顶部导航、商品图片轮播、价格信息区..."
      }
    ]
  }
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 模板唯一标识（建议格式：`{scene}-{type}-{device}`） |
| `name` | string | ✅ | 模板显示名称 |
| `scene` | string | ✅ | 场景类型（`ecommerce`, `food`, `saas` 等） |
| `device` | string | ✅ | 设备类型（`mobile` 或 `desktop`） |
| `type` | string | ✅ | 页面类型（`home`, `detail`, `list`, `profile`, `messages`, `form`, `settings`, `result` 等） |
| `description` | string | ✅ | 模板描述 |
| `components` | array | ❌ | 组件列表（用于动态渲染） |
| `defaultStyle` | object | ❌ | 默认样式配置 |
| `layout` | object | ❌ | 布局定义 |
| `aiPrompt` | object | ❌ | AI 提示词模板 |

---

# 添加新场景模板

添加一个全新的场景（如从零创建内容平台场景）需要修改以下文件：

| # | 文件 | 操作 |
|---|------|------|
| 1 | `src/templates/{scene}.json` | 创建场景模板定义文件 |
| 2 | `src/types/template.ts` | 扩展 `SceneType` 联合类型 |
| 3 | `src/hooks/useUrlConfig.ts` | 更新场景和页面类型白名单 |
| 4 | `src/components/Designer/SceneSelector.tsx` | 添加场景选项 |
| 5 | `src/components/Preview/templates/index.ts` | 导出新模板组件 |
| 6 | `src/components/Preview/MobilePreview.tsx` | 注册移动端模板路由 |
| 7 | `src/components/Preview/DesktopPreview.tsx` | 注册桌面端模板路由 |
| 8 | `src/utils/templateLoader.ts`（可选） | 模板加载器已自动支持动态导入 |

---

### 步骤 1: 创建场景 JSON 文件

在 `src/templates/` 目录下创建新文件，例如 `content.json`：

```json
[
  {
    "id": "content-home-desktop",
    "name": "内容首页",
    "scene": "content",
    "device": "desktop",
    "type": "home",
    "description": "内容平台首页，图文杂志风，双列瀑布流",
    "defaultStyle": {
      "backgroundColor": "#F9F8F4",
      "primaryColor": "#262626",
      "cornerRadius": "medium",
      "cardStyle": "shadow",
      "titleBarStyle": "white-underline",
      "switcherStyle": "pill",
      "buttonStyle": "solid",
      "badgeStyle": "rounded"
    },
    "layout": {
      "type": "two-column",
      "regions": []
    },
    "aiPrompt": {
      "title": "内容平台首页（桌面端）",
      "sections": []
    }
  }
]
```

**注意事项**：
- 文件必须导出一个数组（`TemplateConfig[]`）
- 每个场景至少需要定义移动端和桌面端的对应模板
- `id` 格式：`{scene}-{type}-{device}`（如 `content-home-desktop`）
- `device` 字段约定：`"desktop"`（不要使用 `"pc"`）
- 每个场景可以有多个页面类型模板，共用同一个 JSON 文件
- 对于 `ecommerce` 场景，不需要额外的 `defaultStyle` 字段（使用系统默认配置）
  其他场景建议提供 `defaultStyle`，以便切换场景时有匹配的默认配色

---

### 步骤 2: 扩展 SceneType

```typescript
// src/types/template.ts
export type SceneType = 'ecommerce' | 'content' | 'food' | 'saas' | 'media' | 'social' | 'finance'
```

---

### 步骤 3: 更新白名单

`useUrlConfig` 中有两个白名单需要更新：

```typescript
// src/hooks/useUrlConfig.ts

// 场景白名单
const VALID_SCENES: SceneType[] = ['food', 'ecommerce', 'saas', 'media', 'social', 'finance', 'content']

// 页面类型白名单
const VALID_PAGE_TYPES = ['home', 'detail', 'list', 'form', 'settings', 'result', 'profile', 'messages']
```

如不更新白名单，URL 中的场景/模板参数会被过滤掉，导致切换无效。

---

### 步骤 4: 注册 SceneSelector 选项

```typescript
// src/components/Designer/SceneSelector.tsx
{ id: 'content', name: '内容平台', icon: '✍️', description: '文章、专栏、作者主页' },
```

---

### 步骤 5: 创建模板预览组件

在 `src/components/Preview/templates/` 下创建对应页面类型的 React 组件：

```
src/components/Preview/templates/
├── index.ts                     # 组件导出索引
├── ContentHomePage.tsx          # 内容首页（移动端）
├── ContentDetailPage.tsx        # 文章详情页（移动端）
├── ContentProfilePage.tsx       # 作者主页（移动端）
└── ...
```

**组件设计规范**：
- 接收 `config: StyleConfig` 作为唯一参数
- 通过 `generateComponentTokens(config)` 获取设计令牌
- 所有样式必须通过设计令牌驱动，禁止硬编码
- 正文使用 `tokens.typography.bodySize`，标题大小比较使用 `config.bodySize` 而非 token 值
- 移动端采用 `Fragment > div.flex-1.overflow-y-auto` 滚动模式（避免嵌套 `flex-1`）
- 桌面端模板如果布局差异较大，应创建独立的 PC 组件文件（如 `ContentDesktopPages.tsx`），而不是直接复用移动端组件

完成后在 `index.ts` 中导出：

```typescript
// src/components/Preview/templates/index.ts
export { ContentHomePage } from './ContentHomePage'
export { ContentDetailPage } from './ContentDetailPage'
export { ContentProfilePage } from './ContentProfilePage'
```

---

### 步骤 6: 注册预览路由

**MobilePreview.tsx** — 添加场景分支：

```typescript
// src/components/Preview/MobilePreview.tsx
if (scene === 'content') {
  switch (pageType) {
    case 'home':
      return <ContentHomePage config={config} />
    case 'detail':
      return <ContentDetailPage config={config} />
    case 'profile':
      return <ContentProfilePage config={config} />
    default:
      return <DefaultPage config={config} />
  }
}
```

**DesktopPreview.tsx** — 同样添加场景分支：

```typescript
// src/components/Preview/DesktopPreview.tsx
if (scene === 'content') {
  return (
    <div>
      <header>{/* PC 顶部导航 */}</header>
      {pageType === 'home' && <ContentHomeDesktop config={config} />}
      {pageType === 'detail' && <ContentDetailDesktop config={config} />}
      {pageType === 'profile' && <ContentProfileDesktop config={config} />}
      <footer>{/* 页脚 */}</footer>
    </div>
  )
}
```

**注意事项**：
- MobilePreview 和 DesktopPreview 需要接收 `scene?: SceneType` prop
- `App.tsx` 中需要计算 `currentScene` 并传递给预览组件
- 场景/设备切换时注意保留 URL 中的 `config` 参数

---

### 步骤 7: 测试验证

```
http://localhost:5173/designer/workbench?scene=content&device=mobile&template=home&config=...
```

**验证清单**：
- [ ] 场景切换后模板正确加载
- [ ] 移动端和桌面端都有对应模板
- [ ] 所有正文使用 `bodyFontSize` 响应配置变化
- [ ] 移动端页面可正常滚动（无嵌套 flex-1 问题）
- [ ] 桌面端布局不像是"拉宽的移动端"
- [ ] URL 参数可分享且能正确恢复
- [ ] `tsc --noEmit` 零类型错误

---

## 模板设计最佳实践

### 1. 双端适配原则

为每个页面类型同时定义移动端和桌面端模板：

```json
// 移动端
{
  "id": "ecommerce-detail-mobile",
  "device": "mobile",
  "layout": {
    "type": "single-column",
    "regions": [
      { "id": "header", "type": "header" },
      { "id": "content", "type": "content" },
      { "id": "footer", "type": "footer" }
    ]
  }
}

// 桌面端
{
  "id": "ecommerce-detail-desktop",
  "device": "desktop",
  "layout": {
    "type": "two-column",
    "regions": [
      { "id": "header", "type": "header" },
      { "id": "main", "type": "content" },
      { "id": "sidebar", "type": "aside" },
      { "id": "footer", "type": "footer" }
    ]
  }
}
```

---

### 2. 默认样式配置原则

**根据场景特点选择配色**：

| 场景 | 推荐背景色 | 推荐主色 | 风格关键词 |
|------|-----------|---------|-----------|
| 电商 | #F9F8F4 (暖沙) | #FF6B35 (橙) | 活力、信任、转化 |
| 食品 | #F5FAF5 (淡绿) | #2E7D67 (青绿) | 自然、健康、安全 |
| SaaS | #FFFFFF (纯白) | #2E7D32 (森林绿) | 专业、高效、清晰 |
| 媒体 | #FFFDF5 (淡黄) | #5F7D2E (草绿) | 温暖、阅读、舒适 |
| 社交 | #F5F3EF (暖白) | #2E7D67 (青绿) | 亲和、活跃、互动 |
| 金融 | #FFFFFF (纯白) | #000000 (纯黑) | 安全、专业、稳重 |
| **内容** | #F9F8F4 (暖沙) | #262626 (深黑) | 沉浸、阅读、杂志感 |

---

### 3. 组件设计原则

**组件应该是**：
- ✅ **配置驱动的** - 接收 `config` props 并应用样式
- ✅ **可复用的** - 可在多个模板中使用
- ✅ **自包含的** - 不依赖外部状态
- ✅ **响应式的** - 根据设备类型调整布局

**示例 - 配置驱动的卡片组件**：

```tsx
const Card = ({ config, children }: CardProps) => {
  const tokens = generateComponentTokens(config)
  
  return (
    <div style={{
      borderRadius: tokens.card.borderRadius,
      boxShadow: tokens.card.boxShadow,
      border: tokens.card.border,
      backgroundColor: tokens.card.backgroundColor,
      padding: tokens.card.padding,
    }}>
      {children}
    </div>
  )
}
```

---

### 4. AI Prompt 编写指南

AI Prompt 用于导出给 LLM 生成代码，应该包含：

#### 必填内容

1. **页面概述** - 一句话描述页面功能
2. **页面结构** - 从上到下的区域列表
3. **核心组件** - 关键组件及其功能
4. **交互要求** - 用户可执行的操作
5. **设计规范** - 间距、圆角、颜色等约束

#### 示例

```json
"aiPrompt": {
  "title": "电商商品详情页（移动端）",
  "sections": [
    {
      "heading": "## 页面概述",
      "content": "典型的电商移动端商品详情页，展示商品信息、规格选择、用户评价，并提供购买操作。"
    },
    {
      "heading": "## 页面结构（从上到下）",
      "content": "1. 顶部导航栏（返回、分享、更多）\n2. 商品图片轮播（支持缩放）\n3. 价格信息区（现价、原价、促销标签）\n4. 商品标题和描述\n5. 规格选择器（颜色、尺码）\n6. 商品详情图文\n7. 用户评价\n8. 底部操作栏（客服、加购、购买）"
    },
    {
      "heading": "## 核心组件说明",
      "content": "**图片轮播**：支持手势滑动和双指缩放，带页码指示器\n**价格区**：大字显示现价，小字显示原价，促销标签使用主题色\n**规格选择**：点击弹出选择面板，支持多规格组合\n**底部操作**：固定在底部，包含客服图标、加入购物车（次按钮）、立即购买（主按钮）"
    },
    {
      "heading": "## 交互要求",
      "content": "1. 图片轮播支持自动播放和手动滑动\n2. 点击规格选择弹出底部抽屉\n3. 加入购物车有成功提示\n4. 立即购买跳转订单确认页"
    },
    {
      "heading": "## 设计规范",
      "content": "1. 卡片圆角：8-12px（根据配置）\n2. 卡片间距：12px\n3. 价格颜色：主题色（红色系）\n4. 按钮样式：根据配置（渐变/纯色/描边）\n5. 整体风格：现代、简洁、留白充足"
    }
  ]
}
```

---

## 常见场景模板参考

### 1. 食品健康场景 (food)

**典型页面**：
- 扫码结果页（核心）
- 成分分析页
- 食品对比页
- 历史记录页

**设计要点**：
- 强调安全感和信任感
- 使用绿色系传达健康理念
- 清晰的信息层级（安全评分最重要）
- 适合使用毛玻璃标题栏

---

### 2. SaaS 工具场景 (saas)

**典型页面**：
- 数据看板（核心）
- 设置页
- 用户管理页
- 报表页

**设计要点**：
- 高效的信息密度
- 清晰的导航结构
- 适合使用边框卡片（专业感）
- 纯白背景 + 深色文字

---

### 3. 内容媒体场景 (media)

**典型页面**：
- 文章详情页（核心）
- 列表页
- 分类页
- 阅读设置页

**设计要点**：
- 阅读体验优先
- 舒适的行高和字号
- 淡黄背景减少视觉疲劳
- 纯文本标签减少干扰

---

### 4. 社交社区场景 (social)

**典型页面**：
- 动态流（核心）
- 个人主页
- 聊天页
- 发布页

**设计要点**：
- 无边框卡片（沉浸感）
- 药丸切换器（现代感）
- 充足的留白
- 强调用户头像和内容

---

### 5. 金融服务场景 (finance)

**典型页面**：
- 账户总览（核心）
- 交易记录
- 理财详情
- 转账页

**设计要点**：
- 极强的专业感
- 纯黑主色（权威感）
- 小圆角（严谨）
- 分割线代替阴影

---

## 模板测试清单

在提交新模板前，请验证：

### 功能性测试
- [ ] 模板可通过 URL 参数加载
- [ ] 移动端和 PC 端都正确渲染
- [ ] 配置调整实时反映在预览中
- [ ] URL 可分享且能正确恢复状态

### 视觉测试
- [ ] 默认样式符合场景特点
- [ ] 所有配置维度都可正常应用
- [ ] 极端配置值不会破坏布局（如最大圆角、最小间距）
- [ ] 文字对比度符合 WCAG 标准

### 导出测试
- [ ] Tailwind Config 导出包含模板配置
- [ ] CSS Variables 导出正确
- [ ] AI Prompt 包含完整的页面描述
- [ ] 导出的配置可用于实际项目开发

---

## 模板版本管理

### 命名规范

```
{scene}-{type}-{device}-v{version}.json

示例：
- ecommerce-home-mobile-v1.json
- ecommerce-home-mobile-v2.json
```

### 向后兼容

如果修改了现有模板：
1. 保留旧版本文件
2. 在新文件中添加 `version` 字段
3. 更新模板加载逻辑支持版本选择

---

## 贡献模板

### 提交流程

1. Fork 项目仓库
2. 在 `src/templates/` 下创建场景 JSON
3. 遵循模板设计最佳实践
4. 测试模板加载和渲染
5. 提交 Pull Request

### PR 描述模板

```markdown
## 场景名称
{场景名称}

## 包含模板
- [ ] 移动端首页
- [ ] PC端首页
- [ ] 移动端详情页
- [ ] PC端详情页
- ...

## 设计说明
{描述场景特点和设计思路}

## 测试截图
{移动端和PC端预览截图}
```

---

## 下一步优化方向

### 短期 (v1.0)
- [ ] 完成 6 个核心场景的模板定义
- [ ] 每个场景至少 3 个页面类型
- [ ] 完善 AI Prompt 模板

### 中期 (v1.5)
- [ ] 模板预览图生成
- [ ] 模板收藏和分享功能
- [ ] 模板市场（社区贡献）

### 长期 (v2.0)
- [ ] 可视化模板编辑器
- [ ] 模板版本管理
- [ ] 模板 A/B 测试

---

**文档版本**: 1.0  
**最后更新**: 2026-04-19  
**维护者**: Style Forge Team
