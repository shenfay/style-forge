# Style Forge 架构重构指南

## 概述

本次重构将主编辑器重命名为 **Designer**，并建立了统一的设计令牌系统和布局框架，使 Designer 和 Placeholder 两个模块既能独立开发，又能统一调整样式和布局。

## 新目录结构

```
src/
├── tokens/                      # 设计令牌系统 (新增)
│   ├── colors.ts                # 全局颜色系统
│   ├── spacing.ts               # 全局间距系统
│   ├── border-radius.ts         # 全局圆角系统
│   ├── shadows.ts               # 全局阴影系统
│   ├── typography.ts            # 全局字体系统
│   ├── transitions.ts           # 全局动画系统
│   ├── editor-tokens.ts         # Designer 专属令牌
│   └── index.ts                 # 统一导出
│
├── layout/                      # 布局框架 (新增)
│   ├── layout-config.ts         # 布局配置常量
│   ├── AppLayout.tsx            # 应用级布局容器
│   └── index.ts                 # 统一导出
│
├── components/
│   ├── Designer/                # 设计配置器 (原 Editor)
│   │   ├── SceneSelector.tsx
│   │   ├── TemplateSelector.tsx
│   │   ├── configurator/
│   │   │   ├── StyleConfigurator.tsx
│   │   │   ├── sections/        # 待拆分
│   │   │   └── shared/          # 待提取
│   │   └── index.ts
│   │
│   ├── Placeholder/             # 占位图生成器 (保持不变)
│   │   ├── ConfigPanel.tsx
│   │   ├── PreviewArea.tsx
│   │   └── SizePresets.tsx
│   │
│   └── UI/                      # 通用 UI 组件
│       ├── Button.tsx           # 新增
│       ├── Input.tsx            # 新增
│       ├── Dropdown.tsx         # 新增
│       ├── Card.tsx             # 已有
│       ├── NavBar.tsx           # 已有
│       ├── StatusBar.tsx        # 已有
│       └── index.ts
│
├── pages/
│   ├── DesignerPage.tsx         # 原 EditorPage
│   ├── PlaceholderPage.tsx
│   ├── HomePage.tsx
│   └── PreviewPage.tsx
│
└── ... (其他保持不变)
```

## 核心设计理念

### 三层样式管理

```
第一层: tokens/ (全局设计令牌)
  ↓ 所有模块共享
第二层: layout/ (布局框架)
  ↓ 定义全局布局规范
第三层: components/ (模块特定样式)
  ↓ Designer/ 和 Placeholder/ 各自独立
```

### 统一调整的实现方式

#### 场景 1: 修改全局配色
```typescript
// 修改 src/tokens/colors.ts
export const colors = {
  border: {
    light: '#D4D4D4'  // 从 '#E5E5E5' 改为 '#D4D4D4'
  }
}
// ✅ Designer 和 Placeholder 的边框色同时更新
```

#### 场景 2: 调整侧边栏宽度
```typescript
// 修改 src/layout/layout-config.ts
export const layoutConfig = {
  sidebar: {
    width: '260px'  // 从 '240px' 改为 '260px'
  }
}
// ✅ 所有使用 AppLayout 的页面同时生效
```

#### 场景 3: 修改按钮样式
```typescript
// 修改 src/components/UI/Button.tsx
// 或修改 src/tokens/ 中的相关令牌
// ✅ 两个模块的按钮样式统一更新
```

## 使用指南

### 在组件中使用设计令牌

```tsx
import { colors, spacing, borderRadius } from '../../tokens'

function MyComponent() {
  return (
    <div style={{
      padding: spacing.md,
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      border: `1px solid ${colors.border.light}`
    }}>
      内容
    </div>
  )
}
```

### 使用 AppLayout 布局

```tsx
import { AppLayout } from '../../layout'

function MyPage() {
  return (
    <AppLayout
      sidebar={<MySidebar />}
      panel={<MyPanel />}
      header={<MyHeader />}
    >
      <MainContent />
    </AppLayout>
  )
}
```

### 使用通用 UI 组件

```tsx
import { Button, Input, Dropdown, DropdownItem } from '../../components/UI'

function MyForm() {
  return (
    <div>
      <Input label="姓名" placeholder="请输入" />
      <Button variant="primary">提交</Button>
      <Dropdown trigger={<Button>更多</Button>}>
        <DropdownItem>选项 1</DropdownItem>
        <DropdownItem>选项 2</DropdownItem>
      </Dropdown>
    </div>
  )
}
```

## 后续优化计划

### 第二阶段 (待实施)

1. **拆分 StyleConfigurator**
   ```
   StyleConfigurator.tsx (容器, ~50行)
   ├── sections/
   │   ├── ColorsSection.tsx
   │   ├── ShapeSection.tsx
   │   ├── SpacingSection.tsx
   │   └── TypographySection.tsx
   └── shared/
       ├── ConfigItem.tsx
       ├── SectionHeader.tsx
       ├── ColorPickerField.tsx
       └── RangeSlider.tsx
   ```

2. **拆分 MobilePreview**
   ```
   MobilePreview.tsx (~50行, 路由分发)
   └── templates/
       ├── HomePage.tsx
       ├── DetailPage.tsx
       ├── ListPage.tsx
       └── ...
   ```

3. **提取 Designer 专属 Hooks**
   - `useDesignerState.ts` - 状态管理
   - `useTemplateLoader.ts` - 模板加载
   - `useUrlSync.ts` - URL 同步

### 第三阶段 (待实施)

4. **引入状态管理** (Zustand/Context)
5. **添加 ESLint 规则** (限制文件行数、禁止硬编码)
6. **完善组件文档** (Storybook/JSDoc)

## 关键收益

✅ **模块独立**: Designer 和 Placeholder 业务逻辑完全独立  
✅ **样式统一**: 通过 tokens/ 一层修改全局生效  
✅ **布局统一**: 通过 AppLayout 控制全局布局规范  
✅ **易于扩展**: 新增模块只需复用 tokens + AppLayout  
✅ **维护成本低**: 样式集中管理,避免多处修改  
✅ **代码质量**: 单文件控制在 200-300 行以内  

## 分支信息

- 分支名称: `refactor/designer-architecture`
- 创建时间: 2026-04-24
- 状态: 第一阶段完成 ✅

---

**文档版本**: 1.0  
**最后更新**: 2026-04-24  
**维护者**: Style Forge Team
