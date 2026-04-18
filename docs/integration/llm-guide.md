# Style Forge LLM 集成指南

## 概述

本文档描述 Style Forge 与大语言模型（LLM）的交互方式，帮助 LLM 理解如何使用 Style Forge 生成设计预览和获取配置。

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
| `scene` | 是 | 场景类型 | `food`, `ecommerce`, `saas`, `media`, `social`, `finance` |
| `device` | 是 | 设备类型 | `mobile`, `desktop` |
| `template` | 是 | 页面模板 | `home`, `detail`, `list`, `form`, `settings`, `result` |
| `config` | 否 | Base64 编码的样式配置 | 从预设配置派生 |

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

## 导出的 AI 提示词格式

当用户点击「复制提示词」时，会生成以下格式的内容：

```markdown
# UI设计配置 - {场景}{页面类型}

## 基本信息
- 场景：{场景名称}
- 设备：{设备类型}
- 页面类型：{页面模板}

## 配色方案
- 页面底色: {颜色名称} {颜色值}
- 主题色: {颜色名称} {颜色值}
- 危险色: 红色 #DC2626
- 警告色: 橙色 #D97706
- 安全色: 绿色 #16A34A

## 设计规范
- 圆角: {圆角大小}
- 卡片: {卡片样式}
- 标题栏: {标题栏样式}
- 切换器: {切换器样式}
- 按钮: {按钮样式}
- 标签: {标签样式}

## 页面结构
{根据模板生成的页面结构描述}

## 风格关键词
{风格关键词列表}

## 预览链接
{完整的预览 URL}
```

---

## 交互方式演进

### v1.0（当前阶段）- URL + 提示词

- LLM 生成预览 URL
- 用户预览调整后复制提示词
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

A: config 是 Base64 编码的样式配置，用于从 URL 恢复用户调整后的具体配置。如果不传，默认为该场景模板的默认配置。
