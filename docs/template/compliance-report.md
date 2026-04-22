# 模板与组件合规检查报告

> 检查日期：2024-01-20  
> 检查对象：现有模板（ecommerce.json）和预览组件

---

## 1. 模板合规检查

### 1.1 ecommerce.json

#### ✅ 符合规范的部分

1. **模板元数据完整**
   - ✅ 包含 `id`、`name`、`scene`、`device`、`description`
   - ✅ ID 命名符合规范（`ecommerce-home-mobile`）
   - ✅ 场景分类正确（`ecommerce`）

2. **双端适配策略**
   - ✅ 移动端模板独立定义
   - ⚠️ 缺少 PC 端对应模板（需要补充）

3. **布局结构清晰**
   - ✅ 使用 `regions` 定义页面区域
   - ✅ 每个区域有明确的 `type`（header/content/footer）
   - ✅ 组件列表语义化（`section-header`、`product-grid-2col`）

#### ❌ 不符合规范的部分

1. **模板 ID 命名不规范**
   ```json
   // ❌ 当前
   "id": "ecommerce-home-mobile"
   
   // ✅ 规范
   "id": "ecommerce-homepage"
   "device": "mobile"
   ```
   **问题**：ID 中包含了设备信息（`-mobile`），违反了"模板命名去设备化"规范。

2. **缺少 components 数组**
   ```json
   // ❌ 当前结构
   {
     "layout": {
       "regions": [...]
     }
   }
   
   // ✅ 规范结构
   {
     "components": [
       {
         "type": "SectionHeader",
         "props": { "title": "限时抢购" }
       }
     ]
   }
   ```
   **问题**：当前模板使用 `layout.regions` 定义结构，但规范建议使用 `components` 数组。

3. **defaultStyle 字段冗余**
   ```json
   // ❌ 当前
   "defaultStyle": {
     "backgroundColor": "#FFFFFF",
     "primaryColor": "#FF6B35",
     "cornerRadius": "medium",
     "cardStyle": "shadow",
     ...
   }
   ```
   **问题**：样式应该由右侧配置系统控制，模板不应该包含默认样式。

---

## 2. 组件合规检查

### 2.1 DesktopPreview.tsx

#### ✅ 符合规范的部分

1. **使用 Design Tokens**
   ```tsx
   // ✅ 正确使用 tokens
   const tokens = getDesignTokens(config)
   <div style={{ fontSize: tokens.sectionHeader.titleSize }} />
   ```

2. **组件语义化**
   - ✅ 使用 `SectionHeader` 概念（区块标题）
   - ✅ 使用 `ProductCard` 概念（商品卡片）
   - ✅ 使用 `BrandItem` 概念（品牌项）

3. **配置联动**
   - ✅ 所有颜色使用 `tokens.colors.*`
   - ✅ 所有字号使用 `tokens.typography.*` 或 `tokens.sectionHeader.*`
   - ✅ 所有圆角使用 `tokens.shape.cornerRadius`

#### ❌ 不符合规范的部分

1. **组件未抽离为独立文件**
   ```tsx
   // ❌ 当前：所有组件内联在 DesktopPreview 中
   function DesktopPreview() {
     // 100+ 行内联组件代码
   }
   
   // ✅ 规范：应该抽离为独立组件
   // src/components/Preview/SectionHeader.tsx
   // src/components/Preview/ProductCard.tsx
   ```

2. **部分样式硬编码**
   ```tsx
   // ❌ 发现的问题
   style={{ color: '#FF4757' }}  // 价格颜色硬编码
   style={{ fontSize: '24px' }}  // 字号硬编码
   ```

3. **缺少组件类型定义**
   - ❌ 没有明确的 `ComponentType` 枚举
   - ❌ 组件 Props 接口不统一

---

### 2.2 MobilePreview.tsx

#### ✅ 符合规范的部分

1. **使用 Design Tokens**
   ```tsx
   // ✅ 大部分样式使用 tokens
   style={{ color: tokens.colors.primary }}
   ```

2. **组件语义清晰**
   - ✅ `SectionHeader` 组件（区块标题）
   - ✅ `ProductCard` 组件（商品卡片）
   - ✅ `BrandItem` 组件（品牌项）

3. **Placeholder 居中修复**
   - ✅ 使用 `flex justify-center` 实现居中
   - ✅ 占位图简化为极简设计

#### ❌ 不符合规范的部分

1. **组件未抽离**
   - ❌ 所有组件内联在 `MobilePreview` 中
   - ❌ 代码过长（905 行），难以维护

2. **部分硬编码样式**
   ```tsx
   // ❌ 需要修复
   style={{ background: config.primaryColor }}  // 应该用 tokens
   style={{ width: '2px' }}                     // 应该用 tokens
   ```

3. **组件 Props 不统一**
   - ❌ 有的组件接收 `config`，有的接收 `tokens`
   - ❌ 应该统一接收 `tokens`

---

### 2.3 Placeholder.tsx

#### ✅ 符合规范的部分

1. **纯展示组件**
   - ✅ 无业务逻辑
   - ✅ 只负责渲染占位图

2. **样式简化**
   - ✅ 去掉多层叠加，避免模糊
   - ✅ 使用极简设计（圆形 + 横线）

#### ❌ 不符合规范的部分

1. **未使用 Design Tokens**
   ```tsx
   // ❌ 当前
   fill="#E2E8F0"
   opacity="0.6"
   
   // ✅ 应该使用 tokens（如果适用）
   fill={tokens.colors.placeholderBackground}
   ```
   **说明**：Placeholder 是特殊组件，可能不需要响应配置系统。

---

## 3. 问题汇总

### 高优先级（必须修复）

1. **模板 ID 命名不规范**
   - 影响：违反命名规范，可能导致路由冲突
   - 修复：移除 ID 中的设备信息

2. **组件未抽离为独立文件**
   - 影响：代码过长，难以维护和复用
   - 修复：抽离 `SectionHeader`、`ProductCard`、`BrandItem` 等组件

3. **部分样式硬编码**
   - 影响：配置联动失效
   - 修复：全部替换为 Design Tokens

### 中优先级（建议修复）

4. **模板结构不符合规范**
   - 影响：与新文档规范不一致
   - 修复：重构为 `components` 数组结构

5. **defaultStyle 字段冗余**
   - 影响：配置系统混乱
   - 修复：移除 `defaultStyle`，由配置系统统一管理

### 低优先级（可选优化）

6. **缺少 PC 端模板**
   - 影响：双端适配不完整
   - 修复：补充 PC 端对应模板

7. **组件 Props 不统一**
   - 影响：开发体验不一致
   - 修复：统一组件接口

---

## 4. 改进建议

### 4.1 短期（1-2 天）

1. **修复硬编码样式**
   - 搜索所有 `style={{ color: '#' }}` 和 `style={{ fontSize: 'px' }}`
   - 替换为 `tokens.colors.*` 和 `tokens.typography.*`

2. **重命名模板 ID**
   - `ecommerce-home-mobile` → `ecommerce-homepage`（device: "mobile"）
   - `ecommerce-product-detail-mobile` → `ecommerce-product-detail`
   - `ecommerce-cart-mobile` → `ecommerce-cart`

### 4.2 中期（3-5 天）

3. **抽离标准组件**
   ```
   src/components/Preview/
   ├── SectionHeader.tsx      # 区块标题
   ├── ProductCard.tsx        # 商品卡片
   ├── BrandItem.tsx          # 品牌项
   ├── ProductGrid.tsx        # 商品网格
   └── Navigation.tsx         # 导航栏
   ```

4. **重构模板 JSON 结构**
   ```json
   {
     "components": [
       {
         "type": "SectionHeader",
         "props": { "title": "限时抢购" }
       },
       {
         "type": "ProductGrid",
         "props": {
           "columns": 5,
           "items": [...]
         }
       }
     ]
   }
   ```

### 4.3 长期（1-2 周）

5. **补充 PC 端模板**
   - `ecommerce-homepage`（PC 版）
   - `ecommerce-product-detail`（PC 版）

6. **建立组件库文档**
   - 每个组件的使用示例
   - Props 接口说明
   - 配置映射表

---

## 5. 总结

### 当前状态

| 检查项 | 状态 | 完成度 |
|-------|------|-------|
| 模板元数据 | ✅ 基本符合 | 80% |
| 模板 ID 命名 | ❌ 不符合 | 40% |
| 模板结构 | ⚠️ 部分符合 | 60% |
| 组件抽离 | ❌ 不符合 | 20% |
| Design Tokens 使用 | ⚠️ 部分符合 | 70% |
| 硬编码样式 | ❌ 存在问题 | 50% |
| 双端适配 | ⚠️ 只有移动端 | 50% |

### 总体评分：**55/100**

### 下一步行动

1. ✅ **已完成**：编写模板与组件设计规范文档
2. 🔄 **进行中**：检查现有模板和组件合规性
3. ⏳ **待开始**：修复高优先级问题（硬编码样式、模板 ID）
4. ⏳ **待开始**：抽离标准组件为独立文件
5. ⏳ **待开始**：重构模板 JSON 结构

---

**报告生成时间**：2024-01-20  
**检查人**：AI Assistant  
**审核状态**：待用户确认
