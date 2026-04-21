# Style Forge 配置规范

## 设计令牌体系

### 1. 色彩配置 (Color System)

#### 1.1 主色 (Primary Color)
**配置项**: `primaryColor`
**影响范围**:
- ✅ 按钮背景色（渐变/纯色/描边）
- ✅ 价格文字颜色
- ✅ 促销标签背景色
- ✅ 选中状态指示器（Tab、分类）
- ✅ 标题装饰条（左侧/右侧/底部 accent）
- ✅ 底部导航栏选中图标
- ✅ 轮播图指示器当前点

**使用规范**:
```typescript
// 按钮
background: config.buttonStyle === 'gradient' 
  ? `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)` 
  : config.primaryColor

// 价格
color: '#FF4757' // 固定红色，不受主色影响

// 标签
background: withOpacity(config.primaryColor, 0.1)
color: config.primaryColor

// 选中状态
color: config.primaryColor
```

#### 1.2 背景色 (Background Color)
**配置项**: `backgroundColor`
**影响范围**:
- ✅ 页面整体背景
- ✅ 顶部搜索栏背景
- ✅ 吸顶元素背景

**使用规范**:
```typescript
// 页面背景
background: config.backgroundColor

// 吸顶元素（需要与页面背景一致）
background: config.backgroundColor
```

#### 1.3 标题颜色 (Title Color)
**配置项**: `titleColor`
**影响范围**:
- ✅ 区域标题文字（"限时抢购"、"猜你喜欢"等）
- ✅ 页面标题

**使用规范**:
```typescript
color: config.titleColor
```

---

### 2. 形状与结构 (Shape & Structure)

#### 2.1 圆角半径 (Corner Radius)
**配置项**: `cornerRadius: 'small' | 'medium' | 'large'`
**映射值**:
- small: 8px
- medium: 16px
- large: 24px

**影响范围**:
- ✅ 商品卡片圆角
- ✅ 按钮圆角
- ✅ 输入框圆角
- ✅ 搜索栏圆角
- ✅ 营销卡片圆角
- ✅ 轮播图圆角
- ✅ 分类容器圆角

**使用规范**:
```typescript
const radius = getBorderRadius(config.cornerRadius)

// 所有需要圆角的元素
borderRadius: radius
```

#### 2.2 卡片样式 (Card Style)
**配置项**: `cardStyle: 'border' | 'shadow' | 'borderless'`
**影响范围**:
- ✅ 商品卡片
- ✅ 分类导航容器
- ✅ 限时抢购容器
- ✅ 品牌专区容器
- ✅ 表单容器

**样式定义**:
```typescript
// border - 边框样式
boxShadow: 'none'
border: `1px solid ${colors.border.light}`

// shadow - 阴影样式
boxShadow: shadows.sm
border: 'none'

// borderless - 无边框无阴影
boxShadow: 'none'
border: 'none'
background: '#FFFFFF'
```

#### 2.3 徽章样式 (Badge Style)
**配置项**: `badgeStyle: 'rounded' | 'text-only'`
**影响范围**:
- ✅ 商品标签（"新品"、"热卖"）
- ✅ 分类徽章
- ✅ 促销标签

**使用规范**:
```typescript
// rounded - 圆角背景徽章
borderRadius: '999px'
background: withOpacity(config.primaryColor, 0.08)
color: config.primaryColor

// text-only - 纯文字
background: 'transparent'
color: config.primaryColor
```

---

### 3. 组件风格 (Component Style)

#### 3.1 按钮样式 (Button Style)
**配置项**: `buttonStyle: 'gradient' | 'solid' | 'wireframe'`
**影响范围**:
- ✅ 主要操作按钮（购买、提交等）
- ✅ 次要按钮（收藏、分享等）

**样式定义**:
```typescript
// gradient - 渐变按钮
background: `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}CC)`
color: '#FFFFFF'

// solid - 纯色按钮
background: config.primaryColor
color: '#FFFFFF'

// wireframe - 线框按钮
background: 'transparent'
border: `1px solid ${config.primaryColor}`
color: config.primaryColor
```

#### 3.2 标题栏样式 (Title Bar Style)
**配置项**: `titleBarStyle: 'white-underline' | 'frosted-glass' | 'colored-bg'`
**影响范围**:
- ✅ 顶部导航栏
- ✅ 详情页导航栏

**样式定义**:
```typescript
// white-underline - 白色底+下划线
background: '#FFFFFF'
borderBottom: `1px solid ${colors.border.light}`

// frosted-glass - 毛玻璃效果
background: 'rgba(255, 255, 255, 0.8)'
backdropFilter: 'blur(10px)'

// colored-bg - 主题色背景
background: config.primaryColor
color: '#FFFFFF'
```

#### 3.3 切换器样式 (Switcher Style)
**配置项**: `switcherStyle: 'underline' | 'pill' | 'capsule'`
**影响范围**:
- ✅ Tab 切换器
- ✅ 分类筛选器

**样式定义**:
```typescript
// underline - 下划线
borderBottom: isActive ? `2px solid ${config.primaryColor}` : 'none'
color: isActive ? config.primaryColor : '#666666'

// pill - 药丸形
background: isActive ? config.primaryColor : '#FFFFFF'
color: isActive ? '#FFFFFF' : '#666666'
borderRadius: '999px'

// capsule - 胶囊形
background: isActive ? withOpacity(config.primaryColor, 0.1) : 'transparent'
color: isActive ? config.primaryColor : '#666666'
borderRadius: radius
```

---

### 4. 标题样式 (Title Style)

#### 4.1 标题装饰 (Title Decoration)
**配置项**: `titleStyle: 'left-accent' | 'right-accent' | 'bottom-accent' | 'plain'`
**影响范围**:
- ✅ 区域标题（"限时抢购"、"猜你喜欢"等）

**样式定义**:
```typescript
// left-accent - 左侧装饰条
paddingLeft: '12px'
::before {
  content: ''
  position: 'absolute'
  left: 0
  width: '3px'
  height: '20px'
  background: config.primaryColor
}

// right-accent - 右侧装饰条
paddingRight: '12px'
::after {
  content: ''
  position: 'absolute'
  right: 0
  width: '3px'
  height: '20px'
  background: config.primaryColor
}

// bottom-accent - 底部装饰线
paddingBottom: '8px'
::after {
  content: ''
  position: 'absolute'
  bottom: 0
  left: 0
  right: 0
  height: '2px'
  background: config.primaryColor
}

// plain - 无装饰
// 仅应用 titleColor、titleSize、titleWeight
```

#### 4.2 标题大小 (Title Size)
**配置项**: `titleSize: 'small' | 'medium' | 'large'`
**映射值**:
- small: 14px
- medium: 16px
- large: 18px

#### 4.3 标题粗细 (Title Weight)
**配置项**: `titleWeight: 'normal' | 'medium' | 'bold'`
**映射值**:
- normal: 400
- medium: 500
- bold: 700

---

## 配置应用优先级

### 高优先级（必须应用）
1. **主色** - 所有交互元素、选中状态
2. **圆角** - 所有容器元素
3. **卡片样式** - 所有卡片容器

### 中优先级（建议应用）
4. **按钮样式** - 所有按钮
5. **标题样式** - 所有区域标题
6. **徽章样式** - 所有标签

### 低优先级（可选应用）
7. **标题栏样式** - 导航栏
8. **切换器样式** - Tab 切换

---

## 实现检查清单

### 色彩配置
- [ ] 主色应用于按钮、标签、选中状态
- [ ] 背景色应用于页面和吸顶元素
- [ ] 标题颜色应用于区域标题

### 形状与结构
- [ ] 圆角应用于所有容器
- [ ] 卡片样式正确应用（边框/阴影/无）
- [ ] 徽章样式正确应用（圆角/纯文字）

### 组件风格
- [ ] 按钮样式正确应用（渐变/纯色/线框）
- [ ] 标题栏样式正确应用
- [ ] 切换器样式正确应用

### 标题样式
- [ ] 标题装饰正确应用（左/右/下/无）
- [ ] 标题大小正确应用
- [ ] 标题粗细正确应用

---

## 扩展配置项（未来规划）

### 间距系统 (Spacing System)
- spacing: 'compact' | 'normal' | 'loose'
- 影响：元素间距、内边距

### 字体系统 (Typography System)
- fontFamily: 'system' | 'rounded' | 'serif'
- fontSize: 'small' | 'normal' | 'large'

### 动效系统 (Animation System)
- animation: 'none' | 'subtle' | 'prominent'
- transition: 'fast' | 'normal' | 'slow'
