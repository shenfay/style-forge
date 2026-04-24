# Style Forge 文档中心

欢迎使用 Style Forge！这里是完整的文档中心。

---

## 📚 文档导航

### 产品文档

- [**产品文档**](./product/product-doc.md) - 产品定位、设计系统规范、模板场景体系、竞品对比
- [**开发计划**](./product/development-plan.md) - 版本规划、开发规范、里程碑、技术栈

### 技术文档

- [**架构设计文档**](./architecture.md) - 系统架构、核心分层、数据流、组件设计模式、扩展性设计
- [**组件库文档**](./components.md) - 组件架构、配置器组件、预览组件、UI组件、扩展指南
- [**模板扩展指南**](./template-guide.md) - 模板系统架构、添加新场景、最佳实践、测试清单

### 集成文档

- [**LLM 集成指南**](./integration/llm-guide.md) - 与大型语言模型的交互方式、URL 参数规范、提示词模板
- [**JSON Schema**](./schema/style-schema.json) - 完整的数据模型定义

---

## 🚀 快速开始

### 对于开发者

1. 阅读 [架构设计文档](./architecture.md) 了解系统整体架构
2. 查看 [开发计划](./product/development-plan.md) 了解技术栈和开发规范
3. 参考 [组件库文档](./components.md) 了解组件使用方式

### 对于设计师

1. 阅读 [产品文档](./product/product-doc.md) 了解 20 维配置矩阵
2. 查看 [模板扩展指南](./template-guide.md) 了解模板设计原则
3. 使用 [LLM 集成指南](./integration/llm-guide.md) 导出 AI 提示词

### 对于想添加场景的贡献者

1. 首先阅读 [模板扩展指南](./template-guide.md)
2. 参考现有的 [电商场景模板](../src/templates/ecommerce.json)
3. 遵循模板设计最佳实践
4. 提交 Pull Request

---

## 📖 文档更新日志

### 2026-04-19

- ✅ 更新产品文档：补充 20 维配置系统（色彩10 + 形状6 + 间距4 + 排版5）
- ✅ 更新开发计划：反映当前 v0.5 进度
- ✅ 创建架构设计文档：完整的系统架构说明
- ✅ 创建组件库文档：所有组件的 API 和使用指南
- ✅ 创建模板扩展指南：如何添加新场景和模板
- ✅ 更新 LLM 集成指南：补充 20 维配置详解和配置联动说明

---

## 🎯 核心概念速查

### 20 维配置矩阵

| 系统 | 维度数 | 关键配置 |
|------|--------|---------|
| 色彩系统 | 10 | 主色、辅助色、强调色、背景色等 |
| 形状系统 | 6 | 圆角、卡片样式、按钮样式等 |
| 间距系统 | 4 | 内边距、卡片间距、区块间距、元素间距 |
| 文字排版 | 5 | 标题装饰、标题大小、字重、字号、行高 |

### 配置联动机制

- 大圆角 → 强阴影 + 大内边距
- 大标题 → 粗装饰线 + 大间距
- 宽松行高 → 大段落间距

### 场景类型

- `ecommerce` - 电商零售
- `food` - 食品健康
- `saas` - SaaS 工具
- `media` - 内容媒体
- `social` - 社交社区
- `finance` - 金融服务

### URL 参数

```
?scene={scene}&device={device}&template={template}&config={base64}
```

---

## 🛠️ 开发资源

### 项目结构

```
style-forge/
├── docs/                      # 文档目录
│   ├── product/              # 产品文档
│   ├── integration/          # 集成文档
│   ├── schema/               # JSON Schema
│   └── *.md                  # 技术文档
├── src/
│   ├── components/           # 组件目录
│   │   ├── Configurator/    # 配置器组件
│   │   ├── Preview/         # 预览组件
│   │   └── UI/              # UI 组件
│   ├── templates/            # 模板 JSON
│   ├── types/                # TypeScript 类型
│   ├── utils/                # 工具函数
│   └── hooks/                # React Hooks
└── package.json
```

### 关键文件

| 文件 | 说明 |
|------|------|
| `src/types/config.ts` | 配置类型定义（StyleConfig） |
| `src/types/template.ts` | 模板类型定义（TemplateConfig） |
| `src/utils/design-tokens.ts` | 设计令牌系统（配置联动） |
| `src/utils/templateLoader.ts` | 模板加载器 |
| `src/utils/configEncoder.ts` | 配置编解码 |
| `src/utils/promptGenerator.ts` | AI 提示词生成器 |
| `src/utils/tailwindGenerator.ts` | Tailwind 配置生成器 |

---

## 💡 常见问题

### Q: 如何快速了解配置系统？

A: 阅读 [产品文档](./product/product-doc.md) 中的"20维配置矩阵"部分，然后查看 [架构设计文档](./architecture.md) 中的"配置联动机制"。

### Q: 如何添加新的场景？

A: 按照 [模板扩展指南](./template-guide.md) 的步骤操作，参考现有的电商场景模板。

### Q: 如何与 LLM 集成？

A: 阅读 [LLM 集成指南](./integration/llm-guide.md)，将提供的 System Prompt 添加到你的 LLM 配置中。

### Q: 配置如何保存和分享？

A: 所有配置通过 URL 参数保存和分享，自定义配置会编码为 Base64 格式。

---

## 📞 获取帮助

- **产品问题**: 查看 [产品文档](./product/product-doc.md)
- **技术问题**: 查看 [架构设计文档](./architecture.md) 和 [组件库文档](./components.md)
- **模板问题**: 查看 [模板扩展指南](./template-guide.md)
- **集成问题**: 查看 [LLM 集成指南](./integration/llm-guide.md)

---

**文档版本**: 1.0  
**最后更新**: 2026-04-19  
**维护者**: Style Forge Team
