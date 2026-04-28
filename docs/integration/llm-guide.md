# Style Forge LLM 集成指南

## 概述

本文档描述 Style Forge 与大语言模型（LLM）的交互方式，帮助 LLM 理解如何使用 Style Forge 生成设计预览和获取配置。

### 核心优势

1. **20维配置系统** - 精细控制色彩、形状、间距、排版等所有设计维度
2. **配置联动机制** - 自动优化相关属性，确保视觉一致性
3. **真实UI预览** - 在真实组件中查看效果，而非抽象色板
4. **一键导出** - 生成 Tailwind Config、CSS Variables 和 AI 提示词

---

## 核心原则

1. **URL 是唯一的真相来源** - 任意一方都可以通过 URL 恢复完整配置
2. **双向交互** - LLM 可以生成预览 URL，用户也可以从 URL 获取配置
3. **零后端** - 所有数据通过 URL 参数传递，无需服务端支持

---

## 交互流程

```
用户 ──▶ LLM ──▶ Style Forge ──▶ 用户 ──▶ LLM ──▶ 代码生成
          │                      │                      │
          │ "帮我做一个电商      │ "打开链接，          │ "这是确认的
          │  商品详情页"          │  调整配置"          │  设计方案"
          ▼                      ▼                      ▼
     生成预览URL            预览/调整配置            粘贴提示词
```

### 流程说明

1. **用户发起需求** → 用户告诉 LLM 需要设计什么页面
2. **LLM 生成预览链接** → LLM 根据需求生成 Style Forge 预览 URL
3. **用户预览调整** → 用户打开链接，预览效果，调整配置直到满意
4. **用户复制提示词** → 用户点击「复制提示词」按钮
5. **用户粘贴给 LLM** → 用户将提示词粘贴回 LLM 对话
6. **LLM 生成代码** → LLM 基于设计意图生成实际代码

---

## URL 参数规范

### 基本格式

```
https://style-forge.dev/preview?scene={scene}&device={device}&template={template}
```

### 参数说明

| 参数 | 必填 | 说明 | 可选值 |
|------|------|------|--------|
| `scene` | 是 | 场景类型 | `ecommerce`, `content`, `food`, `saas`, `media`, `social`, `finance` |
| `device` | 是 | 设备类型 | `mobile`, `desktop` |
| `template` | 是 | 页面模板 | `home`, `detail`, `list`, `form`, `settings`, `result` |
| `config` | 否 | Base64 编码的样式配置 | 从预设配置派生 |

### 场景选择指南

| 场景 | 适用情况 | 示例 |
|------|---------|------|
| `ecommerce` | 电商、零售、商城 | 商品详情、购物车、订单 |
| `content` | 内容平台、博客、自媒体 | 文章首页、详情页、作者主页 |
| `food` | 食品、健康、餐饮 | 扫码结果、成分分析 |
| `saas` | B2B 工具、企业软件 | 数据看板、设置页 |
| `media` | 博客、新闻、内容平台 | 文章详情、列表页 |
| `social` | 社交、社区、论坛 | 动态流、个人主页 |
| `finance` | 金融、理财、保险 | 交易记录、账户详情 |

### 示例

```
# 电商商品详情页（移动端）
https://style-forge.dev/preview?scene=ecommerce&device=mobile&template=detail

# SaaS 数据看板（PC端）
https://style-forge.dev/preview?scene=saas&device=desktop&template=home

# 食品扫码结果页（移动端）
https://style-forge.dev/preview?scene=food&device=mobile&template=result
```

---

## LLM 提示词模板

将以下提示词加入 LLM 的 System Prompt，使其能够正确使用 Style Forge：

### Style Forge Assistant

```markdown
# Style Forge 设计助手

你是 UI 设计辅助专家。当用户请求设计 UI 时，你应该：

## 工作流程

1. **理解需求** - 分析用户想要创建的页面类型和场景
2. **选择场景** - 根据页面类型选择合适的场景：
   - 电商相关 → `ecommerce`
   - 内容平台/博客 → `content`
   - 食品/健康相关 → `food`
   - SaaS/工具相关 → `saas`
   - 内容/媒体相关 → `media`
   - 社交相关 → `social`
   - 金融相关 → `finance`
3. **选择设备** - 根据用户场景选择：
   - 移动端应用 → `mobile`
   - PC/网页应用 → `desktop`
4. **选择模板** - 根据页面功能选择：
   - 首页/仪表盘 → `home`
   - 详情页 → `detail`
   - 列表页 → `list`
   - 表单页 → `form`
   - 设置页 → `settings`
   - 结果页 → `result`
5. **生成预览链接** - 格式：`https://style-forge.dev/preview?scene={scene}&device={device}&template={template}`
6. **引导用户** - 告诉用户先预览调整设计方向

## 示例对话

**用户**: 帮我做一个电商小程序的商品详情页

**助手**: 
好的，我来帮你生成商品详情页的设计预览。

请先打开以下链接，在 Style Forge 中预览设计方向：
```
https://style-forge.dev/preview?scene=ecommerce&device=mobile&template=detail
```

调整配色、圆角等配置直到满意后，点击「复制提示词」，然后粘贴给我，我会基于这个设计方向帮你生成代码。

## 注意事项

- 不要直接生成代码，先引导用户确认设计方向
- 预览链接只包含基础配置，用户可以在 Style Forge 中调整
- 最终的 AI 提示词包含完整的页面结构和设计规范
```

---

## 配置系统详解（20维）

当用户在 Style Forge 中调整配置后，导出的 AI 提示词会包含完整的 20 维配置信息：

### 色彩系统（10维）

- **主色** (`primaryColor`) - 品牌核心色，用于按钮、链接、高亮
- **辅助色** (`secondaryColor`) - 次要交互色，用于次要按钮、标签
- **强调色** (`accentColor`) - 点缀色，用于图标、装饰元素
- **页面背景色** (`backgroundColor`) - 全局底色
- **卡片背景色** (`cardBackgroundColor`) - 容器底色
- **标题色** (`titleColor`) - 标题文字色
- **正文色** (`textPrimary`) - 主要文字色
- **辅助色** (`textSecondary`) - 次要文字色
- **成功色** (`successColor`) - 正向反馈色
- **警告色** (`warningColor`) - 警示色
- **错误色** (`errorColor`) - 负向反馈色

### 形状系统（6维）

- **圆角大小** (`cornerRadius`) - small/medium/large
- **卡片样式** (`cardStyle`) - border/shadow/borderless
- **按钮样式** (`buttonStyle`) - gradient/solid/wireframe
- **标签样式** (`badgeStyle`) - rounded/text-only
- **标题栏样式** (`titleBarStyle`) - white-underline/frosted-glass/colored-bg
- **切换器样式** (`switcherStyle`) - underline/pill/capsule

### 间距系统（4维）

- **内边距** (`padding`) - compact/medium/relaxed
- **卡片间距** (`cardGap`) - small/medium/large
- **区块间距** (`sectionGap`) - small/medium/large
- **元素间距** (`elementGap`) - compact/medium/relaxed

### 文字排版（5维）

- **标题装饰** (`titleStyle`) - left-accent/right-accent/bottom-accent/plain
- **标题大小** (`titleSize`) - small/medium/large
- **标题字重** (`titleWeight`) - normal/medium/bold
- **正文字号** (`bodySize`) - small/medium/large
- **行高** (`lineHeight`) - compact/medium/relaxed

---

## 导出的 AI 提示词格式

当用户点击「复制提示词」时，会生成以下格式的内容：

```markdown
# UI设计配置 - {场景}{页面类型}

## 基本信息
- 场景：{场景名称}
- 设备：{设备类型}
- 页面类型：{页面模板}
- 模板名称：{模板名称}

## 配色方案（10维）
- 主色: {颜色名称} {颜色值}
- 辅助色: {颜色名称} {颜色值}
- 强调色: {颜色名称} {颜色值}
- 页面底色: {颜色名称} {颜色值}
- 卡片背景色: {颜色名称} {颜色值}
- 标题色: {颜色名称} {颜色值}
- 正文色: {颜色名称} {颜色值}
- 辅助文字色: {颜色名称} {颜色值}
- 成功色: {颜色名称} {颜色值}
- 警告色: {颜色名称} {颜色值}
- 错误色: {颜色名称} {颜色值}

## 形状系统（6维）
- 圆角: {圆角大小}
- 卡片样式: {卡片样式}
- 按钮样式: {按钮样式}
- 标签样式: {标签样式}
- 标题栏样式: {标题栏样式}
- 切换器样式: {切换器样式}

## 间距系统（4维）
- 内边距: {内边距}
- 卡片间距: {卡片间距}
- 区块间距: {区块间距}
- 元素间距: {元素间距}

## 文字排版（5维）
- 标题装饰: {标题装饰}
- 标题大小: {标题大小}
- 标题字重: {标题字重}
- 正文字号: {正文字号}
- 行高: {行高}

## 页面结构
{根据模板生成的页面结构描述}

## 核心组件说明
{组件及其功能描述}

## 交互要求
{用户交互行为描述}

## 风格关键词
{风格关键词列表}

## 配置联动说明
{自动优化的相关属性}

## 预览链接
{完整的预览 URL}
```

---

## 交互方式演进

### v1.0（当前阶段）- URL + 提示词 + 20维配置

- LLM 生成预览 URL
- 用户预览调整后复制提示词（包含20维配置）
- 提示词粘贴回 LLM 继续开发

### v1.5 - 轻量 API

- 增加 Edge Functions API
- 支持动态获取模板、生成提示词
- 无需后端服务

### v2.0 - MCP 集成

- 实现完整的 MCP Server
- LLM 原生支持调用 Style Forge
- 深度集成，用户体验最佳

---

## 常见问题

### Q: LLM 如何知道生成什么样的预览 URL？

A: 将上面的「Style Forge Assistant」提示词加入 LLM 的 System Prompt，LLM 会自动根据用户需求生成正确的预览链接。

### Q: 用户调整后的配置如何传递回 LLM？

A: 用户调整满意后点击「复制提示词」按钮，将生成的 Markdown 提示词粘贴回 LLM 对话即可。

### Q: URL 参数中的 config 是什么？

A: config 是 Base64 编码的样式配置，用于从 URL 恢复用户调整后的具体配置。如果不传，默认为该场景模板的默认配置。当前支持 20 维配置（色彩10 + 形状6 + 间距4 + 排版5）。

### Q: 配置联动是什么？

A: 配置联动是指某些配置项会自动调整相关属性以保持视觉一致性。例如：
- 选择大圆角时，自动增加阴影强度和内边距
- 选择大标题时，自动加粗装饰线和增加间距
- 选择宽松行高时，自动增加段落间距
