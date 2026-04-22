# 模板与组件设计规范

> **目标**：支撑快速场景扩展、模板开发和组件复用

本文档定义了 Style Forge 的模板和组件设计规范，确保所有模板和组件能够正确响应右侧配置系统，实现配置联动效果。

---

## 1. 核心设计原则

### 1.1 组件即配置消费者

**原则**：组件不需要知道配置系统的存在，只接收 Design Tokens 并按约定应用样式。

```tsx
// ✅ 正确：组件接收 tokens，自动应用
<div style={{ fontSize: tokens.bodySize, color: tokens.colors.textPrimary }}>
  {productName}
</div>

// ❌ 错误：组件硬编码样式
<div style={{ fontSize: '16px', color: '#333' }}>
  {productName}
</div>
```

### 1.2 同类元素 = 同类组件

**原则**：相同语义的元素必须使用相同组件类型，确保配置联动一致。

```
✅ 所有商品卡片 → ProductCard 组件
✅ 所有区块标题 → SectionHeader 组件
✅ 所有品牌标识 → BrandItem 组件

❌ 不要为相似功能创建不同组件
```

### 1.3 命名即语义

**原则**：组件名和类名必须明确表达用途，见名知意。

```tsx
// ✅ 好的命名
<ProductCard productName="Apple Watch" price={2999} />
<SectionHeader title="限时抢购" />
<BrandItem name="Apple" />

// ❌ 模糊的命名
<Item data={...} />
<Title text="..." />
<Logo brand="..." />
```

---

## 2. 组件语义类型规范

### 2.1 标准组件类型

Style Forge 定义了以下标准组件类型，每个类型自动映射到特定的配置项：

#### SectionHeader（区块标题）

**用途**：页面各区块的标题（如"限时抢购"、"品牌专区"、"新品推荐"）

**配置映射**：
- 标题文字 → `tokens.sectionHeader.titleSize`、`tokens.sectionHeader.titleColor`、`tokens.sectionHeader.titleWeight`
- 装饰条 → `tokens.colors.primary`、`tokens.sectionHeader.decorationThickness`、`tokens.sectionHeader.decorationGap`

**使用示例**：
```tsx
<SectionHeader 
  title="限时抢购"
  showDecoration={true}
  align="left"
/>
```

#### ProductCard（商品卡片）

**用途**：展示商品信息（名称、价格、标签、图片）

**配置映射**：
- 商品名称 → `tokens.typography.bodySize`、`tokens.colors.textPrimary`
- 价格 → `tokens.typography.bodySize`、`tokens.colors.primary`、`fontWeight: 'bold'`
- 原价 → `tokens.typography.bodySize`、`tokens.colors.textSecondary`、`textDecoration: 'line-through'`
- 标签 → `tokens.typography.bodySize`、`tokens.colors.primary`、`tokens.colors.primaryLight`
- 卡片容器 → `tokens.shape.cornerRadius`、`tokens.colors.backgroundColor`

**使用示例**：
```tsx
<ProductCard
  image={<Placeholder type="product" />}
  productName="Apple Watch Series 9"
  price={2999}
  originalPrice={3999}
  tag="新品"
/>
```

#### BrandItem（品牌项）

**用途**：品牌 Logo 和名称展示

**配置映射**：
- 品牌名称 → `tokens.typography.bodySize`、`tokens.colors.textPrimary`
- Logo 容器 → `tokens.shape.cornerRadius`、`tokens.colors.backgroundColor`

**使用示例**：
```tsx
<BrandItem
  logo={<BrandLogo brand="apple" />}
  name="Apple"
/>
```

#### Navigation（导航）

**用途**：顶部导航栏、底部标签栏

**配置映射**：
- 导航文字 → `tokens.typography.bodySize`、`tokens.colors.textPrimary`
- 激活状态 → `tokens.colors.primary`
- 容器 → `tokens.colors.backgroundColor`

#### Button（按钮）

**用途**：操作按钮（购买、查看更多、提交）

**配置映射**：
- 按钮文字 → `tokens.typography.bodySize`、`tokens.colors.textOnPrimary`
- 按钮容器 → `tokens.colors.primary`、`tokens.shape.cornerRadius`

---

### 2.2 组件配置映射表

| 组件类型 | 元素 | 字号配置 | 颜色配置 | 其他配置 |
|---------|------|---------|---------|---------|
| SectionHeader | 标题文字 | `titleSize` | `titleColor` | `titleWeight` |
| SectionHeader | 装饰条 | - | `primary` | `decorationThickness` |
| ProductCard | 商品名称 | `bodySize` | `textPrimary` | - |
| ProductCard | 价格 | `bodySize` | `primary` | `bold` |
| ProductCard | 原价 | `bodySize` | `textSecondary` | `line-through` |
| ProductCard | 标签 | `bodySize` | `primary` | `primaryLight` 背景 |
| BrandItem | 品牌名称 | `bodySize` | `textPrimary` | - |
| Navigation | 导航文字 | `bodySize` | `textPrimary` / `primary` | - |
| Button | 按钮文字 | `bodySize` | `textOnPrimary` | - |

---

## 3. 设计令牌使用规范

### 3.1 必须使用 Token 的场景

**所有样式必须通过 Design Tokens 获取，禁止硬编码：**

```tsx
// ✅ 正确
<div style={{
  color: tokens.colors.primary,
  fontSize: tokens.typography.bodySize,
  borderRadius: tokens.shape.cornerRadius,
  padding: tokens.spacing.md
}} />

// ❌ 错误
<div style={{
  color: '#2A9E30',
  fontSize: '16px',
  borderRadius: '8px',
  padding: '16px'
}} />
```

### 3.2 Token 分类

#### 色彩系统（Colors）

```typescript
tokens.colors = {
  primary,           // 主色（按钮、价格、强调元素）
  primaryLight,      // 主色浅色（标签背景）
  backgroundColor,   // 页面背景色
  titleColor,        // 区块标题颜色
  textPrimary,       // 正文主要文字
  textSecondary,     // 正文次要文字（原价、描述）
  textOnPrimary      // 主色背景上的文字（按钮文字）
}
```

#### 排版系统（Typography）

```typescript
tokens.typography = {
  bodySize,          // 正文字号（商品名、价格、导航）
  lineHeight         // 行高
}

tokens.sectionHeader = {
  titleSize,         // 区块标题字号
  titleColor,        // 区块标题颜色
  titleWeight        // 区块标题字重
}
```

#### 形状系统（Shape）

```typescript
tokens.shape = {
  cornerRadius       // 圆角半径（卡片、按钮、容器）
}
```

#### 间距系统（Spacing）

```typescript
tokens.spacing = {
  sectionGap,        // 区块间距
  sm,                // 小间距 (8px)
  md,                // 中间距 (16px)
  lg                 // 大间距 (24px)
}
```

### 3.3 Token 使用优先级

```
1. tokens.sectionHeader.*     // 区块标题专用
2. tokens.typography.*        // 正文通用
3. tokens.colors.*            // 颜色系统
4. tokens.shape.*             // 形状系统
5. tokens.spacing.*           // 间距系统
```

---

## 4. 模板结构规范

### 4.1 模板 JSON 结构

```json
{
  "id": "ecommerce-homepage",
  "name": "电商首页",
  "scene": "ecommerce",
  "device": "pc",
  "description": "电商平台首页模板，包含限时抢购、品牌专区、新品推荐等区块",
  "components": [
    {
      "type": "SectionHeader",
      "props": {
        "title": "限时抢购",
        "showDecoration": true,
        "align": "left"
      }
    },
    {
      "type": "ProductGrid",
      "props": {
        "columns": 5,
        "items": [
          {
            "productName": "商品名称",
            "price": 2999,
            "tag": "新品"
          }
        ]
      }
    }
  ]
}
```

### 4.2 模板元数据

| 字段 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| `id` | string | ✅ | 模板唯一标识，格式：`{scene}-{page}` |
| `name` | string | ✅ | 模板显示名称 |
| `scene` | string | ✅ | 所属场景（ecommerce/social/education） |
| `device` | string | ✅ | 设备类型（pc/mobile） |
| `description` | string | ❌ | 模板描述 |
| `components` | array | ✅ | 组件列表 |

### 4.3 模板 ID 命名规范

```
格式：{scene}-{page}-{variant?}

示例：
- ecommerce-homepage          # 电商首页
- ecommerce-product-detail    # 电商商品详情
- social-profile              # 社交个人主页
- education-course-list       # 教育课程列表
```

---

## 5. 双端适配规范

### 5.1 独立模板策略

**PC 端和移动端使用独立模板**，不共享配置，不需要同步。

```
templates/
├── ecommerce.json
│   ├── pc-homepage           # PC 端电商首页
│   ├── mobile-homepage       # 移动端电商首页
│   ├── pc-product-detail     # PC 端商品详情
│   └── mobile-product-detail # 移动端商品详情
```

### 5.2 布局差异

| 配置项 | PC 端 | Mobile 端 |
|-------|-------|-----------|
| 商品网格列数 | 4-5 列 | 2 列 |
| 品牌网格列数 | 6 列 | 3 列 |
| 区块间距 | 32-48px | 24px |
| 卡片内边距 | 16-24px | 12px |

### 5.3 组件适配

组件本身不需要适配双端，由模板的 `layout` 配置控制：

```json
{
  "type": "ProductGrid",
  "layout": {
    "pc": { "columns": 5, "gap": 24 },
    "mobile": { "columns": 2, "gap": 12 }
  }
}
```

---

## 6. 快速开发指南

### 6.1 如何添加新场景

**Step 1: 创建场景 JSON**

```bash
# 在 templates/ 目录创建
touch src/templates/education.json
```

**Step 2: 定义场景元数据**

```json
{
  "id": "education",
  "name": "教育",
  "icon": "📚",
  "description": "在线教育平台模板",
  "templates": []
}
```

**Step 3: 注册场景**

在 `src/types/config.ts` 中添加场景类型：

```typescript
export type SceneType = 'ecommerce' | 'social' | 'education'
```

### 6.2 如何添加新模板

**Step 1: 复制基础模板**

```bash
# 复制同场景的现有模板作为基础
cp src/templates/ecommerce.json src/templates/ecommerce-new.json
```

**Step 2: 修改模板 ID 和名称**

```json
{
  "id": "ecommerce-shopping-cart",
  "name": "购物车",
  "scene": "ecommerce",
  "device": "pc"
}
```

**Step 3: 调整组件结构**

使用标准组件类型，配置自动应用：

```json
{
  "components": [
    {
      "type": "SectionHeader",
      "props": { "title": "购物车" }
    },
    {
      "type": "ProductCard",
      "props": {
        "productName": "商品名称",
        "price": 2999
      }
    }
  ]
}
```

**Step 4: 测试配置联动**

在预览区验证：
- 修改主色 → 价格、标签、按钮同步变化
- 修改圆角 → 卡片、按钮同步变化
- 修改字号 → 所有正文同步变化

### 6.3 如何开发新组件

**Step 1: 创建组件文件**

```bash
touch src/components/Preview/Carousel.tsx
```

**Step 2: 定义组件 Props**

```tsx
interface CarouselProps {
  items: Array<{
    image: React.ReactNode
    title: string
  }>
}
```

**Step 3: 应用 Design Tokens**

```tsx
export function Carousel({ items }: CarouselProps) {
  const tokens = useDesignTokens()
  
  return (
    <div style={{
      borderRadius: tokens.shape.cornerRadius,
      backgroundColor: tokens.colors.backgroundColor
    }}>
      {items.map(item => (
        <div key={item.title} style={{
          fontSize: tokens.typography.bodySize,
          color: tokens.colors.textPrimary
        }}>
          {item.title}
        </div>
      ))}
    </div>
  )
}
```

**Step 4: 注册组件类型**

在组件映射表中添加：

```typescript
const COMPONENT_MAP = {
  SectionHeader,
  ProductCard,
  BrandItem,
  Carousel  // 新增
}
```

---

## 7. 最佳实践

### 7.1 DO（推荐）

✅ 使用标准组件类型（SectionHeader/ProductCard/BrandItem）  
✅ 所有样式通过 Design Tokens 获取  
✅ 组件名明确表达用途  
✅ 同类元素使用相同组件  
✅ PC 和 Mobile 使用独立模板  
✅ 组件保持纯展示，不包含业务逻辑  

### 7.2 DON'T（禁止）

❌ 硬编码颜色值（`#2A9E30`）  
❌ 硬编码字号（`16px`）  
❌ 为相似功能创建不同组件  
❌ 组件内部包含配置逻辑  
❌ PC 和 Mobile 共享同一模板  
❌ 组件包含业务逻辑（如数据请求）  

---

## 8. 常见问题

### Q1: 如何决定使用哪个组件类型？

**A**: 根据元素的语义用途选择：
- 区块标题 → SectionHeader
- 商品信息 → ProductCard
- 品牌展示 → BrandItem
- 导航链接 → Navigation
- 操作按钮 → Button

### Q2: 组件可以有自己的样式吗？

**A**: 当前阶段组件应该是**纯展示组件**，所有样式来自 Design Tokens。未来可能会支持组件级配置覆盖。

### Q3: 如何处理特殊情况（如促销价格需要更大字号）？

**A**: 创建新的组件变体或使用条件样式：

```tsx
<ProductCard
  price={2999}
  priceVariant="large"  // 组件内部处理特殊样式
/>
```

### Q4: PC 和 Mobile 模板配置不同怎么办？

**A**: 完全独立，不需要同步。每个模板有独立的配置。

---

## 9. 更新日志

| 日期 | 版本 | 更新内容 |
|-----|------|---------|
| 2024-01-20 | 1.0.0 | 初始版本 |
