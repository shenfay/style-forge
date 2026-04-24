# Style Forge 组件库文档

## 组件架构概览

Style Forge 的组件分为三大类：

1. **配置器组件** (Configurator) - 用户交互界面
2. **预览组件** (Preview) - 设计效果展示
3. **UI 组件** (UI) - 通用界面元素

---

## 1. 配置器组件 (Configurator)

### 1.1 StyleConfigurator

**文件**: `src/components/Configurator/StyleConfigurator.tsx`

**职责**: 主配置面板，根据当前激活的配置分类显示对应的配置项

**Props**:
```typescript
interface StyleConfiguratorProps {
  config: StyleConfig
  onChange: (config: StyleConfig) => void
  activeSection: 'colors' | 'shape' | 'spacing' | 'typography'
}
```

**配置分类**:

#### 色彩系统 (colors)
- 主色选择器
- 辅助色选择器
- 强调色选择器
- 页面背景色选择器
- 卡片背景色选择器
- 标题色选择器
- 正文色选择器
- 辅助文字色选择器
- 成功色选择器
- 警告色选择器
- 错误色选择器

#### 形状系统 (shape)
- 圆角大小 (small/medium/large)
- 卡片样式 (border/shadow/borderless)
- 按钮样式 (gradient/solid/wireframe)
- 标签样式 (rounded/text-only)
- 标题栏样式 (white-underline/frosted-glass/colored-bg)
- 切换器样式 (underline/pill/capsule)

#### 间距系统 (spacing)
- 内边距 (compact/medium/relaxed)
- 卡片间距 (small/medium/large)
- 区块间距 (small/medium/large)
- 元素间距 (compact/medium/relaxed)

#### 文字排版 (typography)
- 标题装饰 (left-accent/right-accent/bottom-accent/plain)
- 标题大小 (small/medium/large)
- 标题字重 (normal/medium/bold)
- 正文字号 (small/medium/large)
- 行高 (compact/medium/relaxed)

---

### 1.2 SceneSelector

**文件**: `src/components/Configurator/SceneSelector.tsx`

**职责**: 场景和设备类型选择器

**Props**:
```typescript
interface SceneSelectorProps {
  selectedScene: SceneType
  selectedDevice: DeviceType
  selectedTemplate: PageType
  onSceneChange: (scene: SceneType) => void
  onDeviceChange: (device: DeviceType) => void
  onTemplateChange: (template: PageType) => void
}
```

**功能**:
- 场景切换（电商、食品、SaaS等）
- 设备切换（移动端/PC端）
- 触发页面重新加载以加载新场景模板

---

### 1.3 TemplateSelector

**文件**: `src/components/Configurator/TemplateSelector.tsx`

**职责**: 模板列表选择器

**Props**:
```typescript
interface TemplateSelectorProps {
  templates: TemplateConfig[]
  selectedTemplate: PageType | null
  onTemplateChange: (template: TemplateConfig) => void
}
```

**功能**:
- 显示当前场景下的所有可用模板
- 高亮当前选中的模板
- 点击切换模板并应用模板默认配置

---

## 2. 预览组件 (Preview)

### 2.1 MobilePreview

**文件**: `src/components/Preview/MobilePreview.tsx`

**职责**: 移动端预览组件 (375×812 iPhone 尺寸)

**Props**:
```typescript
interface MobilePreviewProps {
  config: StyleConfig
  pageType: PageType
}
```

**当前实现的页面类型**:
- `result`: 扫码结果页（完整版）
- `home`: 电商首页（开发中）
- `detail`: 商品详情页（开发中）

**布局结构**:
```
MobilePreview
├── StatusBar (状态栏)
├── Header (标题栏)
│   └── 根据 titleBarStyle 渲染
├── Content (内容区)
│   ├── 根据 pageType 渲染不同内容
│   └── 应用 config 的所有配置
└── TabBar (底部导航，可选)
```

---

### 2.2 DesktopPreview

**文件**: `src/components/Preview/DesktopPreview.tsx`

**职责**: PC端预览组件 (1440×900 桌面尺寸)

**Props**:
```typescript
interface DesktopPreviewProps {
  config: StyleConfig
  pageType: PageType
}
```

**当前实现的页面类型**:
- `home`: 电商首页（完整版）
- `detail`: 商品详情页（开发中）

**布局结构**:
```
DesktopPreview
├── TopNav (顶部导航栏)
│   ├── Logo
│   ├── SearchBar
│   ├── CartIcon
│   └── UserMenu
├── MainContent (主内容区)
│   ├── Sidebar (侧边栏，可选)
│   └── Content (内容区)
│       └── 根据 pageType 渲染
└── Footer (页脚)
```

---

### 2.3 通用预览组件

#### ProductCard

**文件**: `src/components/Preview/ProductCard.tsx`

**职责**: 商品卡片组件

**Props**:
```typescript
interface ProductCardProps {
  productName: string
  price: number
  originalPrice?: number
  tag?: string
  sales?: string
  config: StyleConfig
}
```

**特性**:
- 应用配置系统的圆角、阴影、颜色
- 支持促销标签
- 支持原价/现价对比

#### SectionHeader

**文件**: `src/components/Preview/SectionHeader.tsx`

**职责**: 区块标题组件

**Props**:
```typescript
interface SectionHeaderProps {
  title: string
  showMore?: boolean
  config: StyleConfig
}
```

**特性**:
- 支持四种标题装饰样式
- 根据配置应用标题大小、字重
- 可选的"查看更多"按钮

#### ScanResultPreview

**文件**: `src/components/Preview/ScanResultPreview.tsx`

**职责**: 扫码结果展示组件（已重构为通用结果页）

**Props**:
```typescript
interface ScanResultPreviewProps {
  config: StyleConfig
  // ... 其他结果数据
}
```

---

## 3. UI 组件 (UI)

### 3.1 颜色选择器

**文件**: `src/components/UI/ColorPicker.tsx`

**职责**: 颜色选择输入框

**Props**:
```typescript
interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}
```

---

### 3.2 选项组

**文件**: `src/components/UI/OptionGroup.tsx`

**职责**: 单选选项组（用于形状、间距等配置）

**Props**:
```typescript
interface OptionGroupProps {
  label: string
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (value: string) => void
}
```

---

## 4. 组件设计模式

### 4.1 配置驱动模式

所有预览组件都接收 `config: StyleConfig` 作为 props，通过设计令牌系统转换为实际样式：

```tsx
const ProductCard = ({ config, ...props }: ProductCardProps) => {
  const tokens = generateComponentTokens(config)
  
  return (
    <div style={{
      borderRadius: tokens.card.borderRadius,
      boxShadow: tokens.card.boxShadow,
      backgroundColor: tokens.card.backgroundColor,
    }}>
      {/* 组件内容 */}
    </div>
  )
}
```

### 4.2 条件渲染模式

根据配置值条件渲染不同的样式：

```tsx
const SectionHeader = ({ config, title }: SectionHeaderProps) => {
  const decorationStyle = {
    'left-accent': <LeftAccent />,
    'right-accent': <RightAccent />,
    'bottom-accent': <BottomAccent />,
    'plain': null,
  }[config.titleStyle]
  
  return (
    <div>
      <h2>{title}</h2>
      {decorationStyle}
    </div>
  )
}
```

### 4.3 组合模式

复杂组件由多个子组件组合而成：

```tsx
const DesktopPreview = ({ config, pageType }) => {
  return (
    <>
      <TopNav config={config} />
      <MainContent>
        {pageType === 'home' && <HomePage config={config} />}
        {pageType === 'detail' && <DetailPage config={config} />}
      </MainContent>
      <Footer config={config} />
    </>
  )
}
```

---

## 5. 组件扩展指南

### 5.1 添加新的预览组件

**步骤 1**: 创建组件文件

```tsx
// src/components/Preview/NewComponent.tsx
import type { StyleConfig } from '../../types/config'
import { generateComponentTokens } from '../../utils/design-tokens'

interface NewComponentProps {
  config: StyleConfig
  // 其他 props
}

export const NewComponent = ({ config, ...props }: NewComponentProps) => {
  const tokens = generateComponentTokens(config)
  
  return (
    <div style={{ /* 应用 tokens */ }}>
      {/* 组件内容 */}
    </div>
  )
}
```

**步骤 2**: 在模板 JSON 中引用

```json
{
  "components": [
    {
      "type": "NewComponent",
      "props": {
        // 组件 props
      }
    }
  ]
}
```

**步骤 3**: 在预览组件中渲染

```tsx
import { NewComponent } from './NewComponent'

const componentMap = {
  NewComponent,
  // ... 其他组件
}

// 在渲染逻辑中使用
{template.components.map((comp) => {
  const Component = componentMap[comp.type]
  return <Component key={comp.id} {...comp.props} config={config} />
})}
```

---

### 5.2 添加新的配置维度

**步骤 1**: 更新类型定义

```typescript
// src/types/config.ts
export interface StyleConfig {
  // ... 现有配置
  newDimension: 'option1' | 'option2' | 'option3'
}
```

**步骤 2**: 更新默认配置

```typescript
export const defaultConfig: StyleConfig = {
  // ... 现有配置
  newDimension: 'option1',
}
```

**步骤 3**: 添加配置 UI

```tsx
// src/components/Configurator/StyleConfigurator.tsx
{activeSection === 'shape' && (
  <OptionGroup
    label="新维度"
    options={[
      { value: 'option1', label: '选项1' },
      { value: 'option2', label: '选项2' },
      { value: 'option3', label: '选项3' },
    ]}
    value={config.newDimension}
    onChange={(value) => onChange({ ...config, newDimension: value as any })}
  />
)}
```

**步骤 4**: 添加联动逻辑

```typescript
// src/utils/design-tokens.ts
export const generateComponentTokens = (config: StyleConfig) => {
  return {
    // ... 现有令牌
    newFeature: config.newDimension === 'option1' 
      ? { /* 样式1 */ }
      : { /* 样式2 */ },
  }
}
```

**步骤 5**: 更新导出工具

```typescript
// src/utils/tailwindGenerator.ts
export const generateTailwindConfig = (config: StyleConfig) => {
  return `
    module.exports = {
      theme: {
        extend: {
          // ... 现有配置
          newDimension: {
            option1: 'value1',
            option2: 'value2',
          }
        }
      }
    }
  `
}
```

---

## 6. 组件性能优化

### 6.1 记忆化令牌计算

```tsx
const Component = ({ config }) => {
  const tokens = useMemo(() => 
    generateComponentTokens(config),
    [config]
  )
  
  return <div style={tokens.card}>...</div>
}
```

### 6.2 避免不必要的重渲染

```tsx
// 使用 React.memo 包裹纯展示组件
export const ProductCard = React.memo(({ config, product }) => {
  // 组件逻辑
})
```

### 6.3 懒加载大型组件

```tsx
// 按需导入大型预览组件
const MobilePreview = React.lazy(() => import('./MobilePreview'))
const DesktopPreview = React.lazy(() => import('./DesktopPreview'))
```

---

## 7. 组件测试策略

### 7.1 单元测试

```typescript
describe('ProductCard', () => {
  it('应该正确应用圆角配置', () => {
    const config = { ...defaultConfig, cornerRadius: 'large' }
    render(<ProductCard config={config} {...mockProps} />)
    
    const card = screen.getByRole('article')
    expect(card).toHaveStyle({ borderRadius: '24px' })
  })
})
```

### 7.2 视觉回归测试

使用 Storybook 或 Chromatic 进行视觉回归测试：

```tsx
// ProductCard.stories.tsx
export const WithLargeRadius = {
  args: {
    config: { ...defaultConfig, cornerRadius: 'large' },
    product: mockProduct,
  },
}
```

---

**文档版本**: 1.0  
**最后更新**: 2026-04-19  
**维护者**: Style Forge Team
