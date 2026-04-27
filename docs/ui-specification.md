# UI 设计规范

> Style Forge 设计器界面 UI 规范文档，确保视觉一致性和可维护性。

**版本**: v1.1 | **更新日期**: 2026-04-24

---

## 1. 整体布局

### 1.1 四栏布局架构

```
┌─────────────┬──────────────┬────────────────┬─────────────┐
│  左侧菜单   │  模板选择    │   预览区       │  配置面板   │
│  (场景/模板)│  (具体模板)  │  (实时预览)    │  (样式配置) │
│   w-60      │   w-60       │   flex-1       │   w-80      │
└─────────────┴──────────────┴────────────────┴─────────────┘
```

**宽度规范**：
| 区域 | 宽度 | 说明 |
|------|------|------|
| 左侧菜单 | `w-60` (240px) | 场景和模板导航 |
| 模板选择 | `w-60` (240px) | 具体模板列表 |
| 预览区 | `flex-1` | 自适应剩余空间 |
| 配置面板 | `w-80` (320px) | 样式配置项 |

---

## 2. 颜色系统

### 2.1 选中态统一颜色

**所有选中态采用统一颜色**：

| 元素 | 背景色 | 文字色 | 边框 |
|------|--------|--------|------|
| 左侧菜单选中 | `#ECEAE5` | `#1A1A1A` | 无 |
| 模板选中 | `#ECEAE5` | `#1A1A1A` | 无 |
| 配置按钮选中 | `#ECEAE5` | `#1A1A1A` | 无 |

**未选中态**：
| 元素 | 背景色 | 文字色 | 边框 |
|------|--------|--------|------|
| 左侧菜单 | `transparent` | `#4A4A4A` | 无 |
| 模板 | `transparent` | `#4A4A4A` | 无 |
| 配置按钮 | `white` | `#6B6B6B` | `1px solid #E5E5E5` |

### 2.2 文字颜色层级

| 层级 | 用途 | 颜色值 | Tailwind 类 |
|------|------|--------|-------------|
| **标题文字** | 区域标题 | `#1A1A1A` | `gray[800]` |
| **配置项标签** | 配置项名称 | `#6B6B6B` | `gray[600]` |
| **主要文字** | 正文、选项 | `#4A4A4A` | `text.primary` |
| **次要文字** | 辅助说明、滑块标签 | `#6B6B6B` | `text.secondary` |
| **辅助文字** | 次要辅助信息 | `#999999` | `text.tertiary` |

---

## 3. 文字规范

### 3.1 字号体系

| 层级 | 字号 | 字重 | 用途 |
|------|------|------|------|
| **大标题** | 16px | 600 | 区域标题（如"文字排版"） |
| **配置项标签** | 13px | 500 | 配置项名称（如"标题字重"） |
| **选项文字** | 12px | 400 | 按钮内的选项文字 |
| **辅助文字** | 12px | 400 | 滑块下方说明、行高说明 |
| **小字** | 11px | 400 | 次要辅助信息 |

### 3.2 字体

- 系统默认字体栈
- 不使用自定义字体

---

## 4. 按钮规范

### 4.1 配置按钮尺寸

| 类型 | 内边距 | 圆角 | 说明 |
|------|--------|------|------|
| 标题字重/大小 | `px-2 py-1` | `rounded-lg` | 紧凑按钮 |
| 形状系统选项 | `padding: 8px` | `rounded-lg` | 可视化按钮 |

### 4.2 按钮状态

```tsx
// 未选中
backgroundColor: 'white',
color: colors.text.secondary,
border: '1px solid #E5E5E5'

// 选中
backgroundColor: '#ECEAE5',
color: '#1A1A1A',
border: 'none'
```

### 4.3 交互规范

- **禁用过渡动画**：移除 `transition-all`，避免切换时出现闪烁
- **手型光标**：所有可点击元素添加 `cursor-pointer`

---

## 5. 组件规范

### 5.1 配置项容器 (ConfigItem)

```tsx
<div className="space-y-3">
  <div style={{ fontSize: '13px', fontWeight: 500, color: '#6B6B6B' }}>
    {label}
  </div>
  {children}
</div>
```

**间距**：
- 标签与内容间距：`space-y-3` (12px)
- 配置项之间间距：`space-y-6` (24px)

### 5.2 可视化选项组 (VisualOptionGroup)

用于需要视觉预览的配置项（卡片样式、按钮样式等）。

```tsx
<VisualOptionGroup
  label="卡片样式"
  options={[
    { label: '边框', value: 'border', preview: <预览内容 /> },
  ]}
  value={config.cardStyle}
  onChange={handleChange}
  columns={3}  // 2 或 3
/>
```

### 5.3 折叠面板 (CollapsePanel)

用于可收起/展开的配置项（间距系统）。

```tsx
<CollapsePanel title="内边距" defaultExpanded={true}>
  <RangeSlider ... />
</CollapsePanel>
```

**规范**：
- 默认只展开第一个面板
- 面板间间距：`space-y-2` (8px)
- 展开内容内边距：`pb-4` (16px)

### 5.4 滑块选择器 (RangeSlider)

```tsx
<RangeSlider
  label="圆角半径"
  options={[
    { label: '0', value: 'none' },
    { label: '小 (4px)', value: 'small' },
  ]}
  value={config.cornerRadius}
  onChange={handleChange}
/>
```

**标签颜色**：`text.secondary` (#6B6B6B)

---

## 6. 区域标题规范

### 6.1 SectionHeader

```tsx
<SectionHeader
  number="02"
  title="形状系统"
  icon={<svg>...</svg>}
/>
```

**样式**：
- 编号背景：`gray[800]` (#1A1A1A)
- 编号文字：`white`
- 标题文字：`gray[800]` (#1A1A1A), 16px, 600
- 分割线：`border-b`, `gray[200]`

---

## 7. 可点击元素规范

### 7.1 鼠标光标

**所有可点击元素必须添加 `cursor-pointer`**：
- 按钮
- 菜单项
- 配置选项
- 导航链接

### 7.2 悬停效果

- 左侧菜单：背景色变化
- 配置按钮：无悬停效果（选中态已足够明显）

---

## 8. 响应式与适配

### 8.1 桌面端

- 四栏布局固定宽度
- 预览区自适应

### 8.2 移动端

- 独立模板体系
- 配置面板收起/展开

---

## 9. 待优化项

### 9.1 高优先级

1. **配置项折叠优化**
   - 当前：间距系统全部折叠，只展开第一个
   - 建议：记忆用户上次展开状态（localStorage）

2. **可视化预览增强**
   - 当前：使用简单 CSS 图形
   - 建议：使用实际预览截图或 SVG 图标

3. **快捷键支持**
   - 建议：添加键盘导航（Tab、Enter、Space）

### 9.2 中优先级

4. **配置搜索功能**
   - 建议：配置面板顶部添加搜索框

5. **配置重置功能**
   - 建议：每个区域添加"重置"按钮

6. **配置导出/导入**
   - 建议：支持 JSON 格式导出配置

### 9.3 低优先级

7. **暗色主题支持**
   - 建议：添加暗色模式切换

8. **动画优化**
   - 当前：移除所有 transition-all
   - 建议：对非颜色属性添加过渡（如高度、透明度）

9. **无障碍优化**
   - 建议：添加 aria-label、role 属性

---

## 10. 代码组织

### 10.1 文件结构

```
src/components/Designer/
├── configurator/
│   ├── sections/          # 配置区域
│   │   ├── ColorsSection.tsx
│   │   ├── ShapeSection.tsx
│   │   ├── SpacingSection.tsx
│   │   └── TypographySection.tsx
│   ├── shared/            # 共享组件
│   │   ├── ConfigItem.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── OptionGroup.tsx
│   │   ├── VisualOptionGroup.tsx
│   │   ├── RangeSlider.tsx
│   │   ├── CollapsePanel.tsx
│   │   └── ColorPickerField.tsx
│   └── index.ts
├── SceneSelector.tsx
├── TemplateSelector.tsx
└── AppLayout.tsx
```

### 10.2 设计令牌

```
src/tokens/
├── colors.ts              # 颜色定义
├── spacing.ts             # 间距定义
├── fontSize.ts            # 字号定义
├── borderRadius.ts        # 圆角定义
└── index.ts               # 统一导出
```

---

## 11. 更新日志

### v1.1 (2026-04-24)
- 折叠面板添加 height + opacity 过渡动画
- 形状系统预览 SVG 图标增强（卡片/按钮/标签/标题/切换器样式）
- Placeholder 组件重构：内联 SVG 改为占位图图片服务
- 移动端商城首页分类导航 emoji + 色彩背景
- 品牌专区首字母圆形图标 + 品牌色点缀
- 底部导航 SVG 图标精修（round 线条风格）
- 商品标签增强：小圆点 + 药丸形 + 细边框
- 轮播图指示器优化：圆点 → 药丸形
- 营销卡片添加装饰圆形元素

### v1.0 (2026-04-24)
- 统一选中态颜色为 `#ECEAE5`
- 优化按钮尺寸（`px-2 py-1`）
- 统一文字层级规范
- 移除 transition-all 避免闪烁
- 新增可视化选项组组件
- 新增折叠面板组件
- 圆角半径增加 0 选项
