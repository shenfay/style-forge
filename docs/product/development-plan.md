# 开发计划与规范

## 开发计划

### v0.1 基础配置器（已完成）

- [x] **项目初始化**
  - [x] React + TypeScript + Vite 项目搭建
  - [x] Tailwind CSS 集成
  - [x] 基础项目结构

- [x] **配置系统**
  - [x] 20维配置矩阵定义（色彩10 + 形状6 + 间距4 + 排版5）
  - [x] 配置类型定义（StyleConfig）
  - [x] 预设配置（6个预设模板）
  - [x] 配置联动机制（设计令牌系统）

- [x] **UI框架**
  - [x] 四栏布局（顶部导航 + 左侧菜单 + 中间预览 + 右侧配置）
  - [x] 配置菜单导航（5个配置分类）
  - [x] 响应式面板切换

**交付物**：基础配置器框架，支持配置调整和实时预览

### v0.5 模板场景体系（进行中）

- [x] **模板场景体系**
  - [x] 电商场景模板 JSON 定义（移动端 + PC端）
  - [x] 移动端/PC 端双端模板支持
  - [x] 模板加载器（templateLoader）
  - [ ] 模板选择器 UI 优化

- [x] **预览组件**
  - [x] 移动端预览组件（MobilePreview）
  - [x] PC 端预览组件（DesktopPreview）
  - [x] 设备框架切换（手机/桌面）
  - [ ] 预览组件优化（电商模板完整实现）

- [x] **配置系统**
  - [x] URL 参数解析与生成（useUrlConfig Hook）
  - [x] 20 维配置面板完善（色彩/形状/间距/排版）
  - [x] 配置编解码（configEncoder）
  - [x] 配置联动（design-tokens.ts）

- [x] **导出功能**
  - [x] AI 提示词导出（promptGenerator）
  - [x] Tailwind Config 导出（tailwindGenerator）
  - [x] CSS Variables 导出
  - [ ] 设计 Token JSON 导出

- [ ] **LLM 集成**
  - [x] 完成 llm-guide.md 文档
  - [ ] 验证 LLM 交互流程
  - [ ] 完善 AI Prompt 模板

**交付物**：可用的 v0.5 版本，支持电商场景的双端预览和导出

---

### v1.5 增强

- [ ] **微交互增强**
  - [ ] 按钮 hover/active 状态动画
  - [ ] 切换器过渡动画
  - [ ] 卡片悬停效果

- [ ] **预设模板扩展**
  - [ ] 每个场景 2-3 个模板
  - [ ] 共 12+ 预设模板

- [ ] **SEO 优化**
  - [ ] 预渲染配置
  - [ ] 动态 meta 标签
  - [ ] OG Image 生成

---

### v2.0 社区

- [ ] **MCP Server**
  - [ ] 实现 MCP 协议
  - [ ] 发布 MCP 市场

- [ ] **社区功能**
  - [ ] 用户分享配置
  - [ ] 配置收藏夹

- [ ] **AI 推荐**
  - [ ] 关键词生成配置

---

## 开发规范

### 代码规范

#### 技术栈
- **框架**：React 18 + TypeScript
- **构建**：Vite 5
- **样式**：Tailwind CSS 3
- **组件**：函数组件 + Hooks

#### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `StyleConfigurator.tsx` |
| 组件名 | PascalCase | `StyleConfigurator` |
| Hooks | camelCase，use 开头 | `useUrlConfig` |
| 工具函数 | camelCase | `configEncoder` |
| 类型定义 | PascalCase | `StyleConfig` |
| 常量 | camelCase | `defaultConfig` |
| 样式配置 | camelCase | `backgroundColor` |

#### 文件结构

```
src/
├── components/
│   ├── Configurator/
│   │   ├── StyleConfigurator.tsx   # 主配置面板
│   │   ├── ColorPicker.tsx          # 颜色选择器
│   │   ├── OptionGroup.tsx          # 选项组
│   │   └── PresetList.tsx           # 预设列表
│   ├── Preview/
│   │   ├── DeviceFrame.tsx          # 设备框架
│   │   ├── MobilePreview.tsx        # 移动端预览
│   │   ├── DesktopPreview.tsx      # PC端预览
│   │   └── templates/               # 模板组件
│   │       ├── FoodResult.tsx       # 食品扫码结果
│   │       ├── EcommerceDetail.tsx  # 电商详情
│   │       └── ...
│   └── Export/
│       ├── TailwindExport.tsx      # Tailwind 导出
│       ├── PromptExport.tsx         # 提示词导出
│       └── TokenExport.tsx          # Token 导出
├── hooks/
│   ├── useUrlConfig.ts              # URL 配置同步
│   └── useTemplate.ts               # 模板管理
├── templates/                       # 模板 JSON
│   ├── food.json
│   ├── ecommerce.json
│   └── ...
├── types/
│   ├── config.ts                    # 配置类型
│   ├── template.ts                  # 模板类型
│   └── export.ts                    # 导出类型
├── utils/
│   ├── configEncoder.ts            # 配置编解码
│   ├── tailwindGenerator.ts         # Tailwind 生成
│   ├── promptGenerator.ts           # 提示词生成
│   └── contrastChecker.ts           # 对比度检测
├── App.tsx
├── main.tsx
└── index.css
```

---

### Git 规范

#### 分支命名

```
feature/{功能名称}
fix/{问题描述}
docs/{文档类型}
```

#### Commit 规范

```bash
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 格式调整（不影响功能）
refactor: 重构
test: 测试相关
chore: 构建/工具更新
```

#### 示例

```bash
git commit -m "feat: 添加电商商品详情页模板"
git commit -m "fix: 修复移动端预览尺寸问题"
git commit -m "docs: 更新 LLM 集成指南"
```

---

### API 规范（v1.5+）

#### URL 参数

```
?scene={scene}&device={device}&template={template}&config={base64}
```

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| scene | string | 是 | 场景 ID |
| device | string | 是 | mobile / desktop |
| template | string | 是 | 模板 ID |
| config | string | 否 | Base64 编码的配置 |

---

### 测试规范

- 单元测试：核心工具函数
- 组件测试：交互逻辑
- E2E 测试：关键用户流程

---

## 技术方案

### 零后端架构

| 特性 | 实现方式 |
|------|----------|
| 配置存储 | URL 参数 + Base64 编码 |
| 模板数据 | 静态 JSON 文件 |
| 状态管理 | React Hooks + URL |
| 分享功能 | 复制 URL |

### SEO 方案

1. **预渲染**：使用 Vite SSG 或 prerender-spa-plugin
2. **动态 Meta**：基于模板生成页面 title 和 description
3. **结构化数据**：JSON-LD 格式
4. **OG Image**：静态图片或动态生成

### 部署方案

| 平台 | 说明 |
|------|------|
| **Vercel** | 主推，免费，CI/CD |
| **Cloudflare Pages** | 备选，全球 CDN |
| **Netlify** | 备选，静态托管 |

#### 域名
- 主域名：`styleforge.dev`
- 预览路径：`/preview?scene=...`

---

## 里程碑

| 版本 | 内容 | 状态 |
|------|------|------|
| v0.1 | 项目初始化 + 20维配置器 + 四栏布局 | ✅ 完成 |
| v0.5 | 电商场景模板 + 双端预览 + 配置联动 + 导出 | 进行中 |
| v1.0 | 6 场景模板 + LLM 集成 + 预设模板扩展 | 规划 |
| v1.5 | 微交互 + SEO + 12+ 模板 | 规划 |
| v2.0 | MCP + 社区功能 | 规划 |

---

## 开发时间线（参考）

```
Week 1-2:  20维配置系统设计 + 四栏布局实现（v0.1）✅
Week 3-4:  电商场景模板 + 双端预览 + 配置联动（v0.5）🔄
Week 5-6:  扩展至6个场景 + LLM 集成测试（v1.0）
Week 7-8:  微交互增强 + SEO优化 + 预设模板填充（v1.5）
Week 9-10: MCP Server + 社区功能（v2.0）
```
