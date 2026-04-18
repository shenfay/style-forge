# Style Forge 文档

## 文档结构

```
docs/
├── README.md                    # 文档索引
├── product/                    # 产品文档
│   ├── product-doc.md          # 产品定位、功能、场景
│   └── development-plan.md    # 开发计划与规范
├── schema/                     # 数据模型
│   └── style-schema.json      # JSON Schema 定义
└── integration/               # 集成文档
    └── llm-guide.md           # LLM 集成指南
```

## 快速导航

| 文档 | 内容 | 受众 |
|------|------|------|
| [product-doc.md](./product/product-doc.md) | 产品定位、8维配置、场景体系 | 产品、设计、开发 |
| [development-plan.md](./product/development-plan.md) | 开发计划、代码规范、Git 规范 | 开发 |
| [style-schema.json](./schema/style-schema.json) | 完整 JSON 数据模型定义 | 开发 |
| [llm-guide.md](./integration/llm-guide.md) | LLM 交互流程、提示词模板 | LLM 集成、使用 |

## 版本

- **v1.0**：6 场景模板 + 双端预览 + LLM 集成
- **v1.5**：微交互 + SEO + 12+ 预设模板
- **v2.0**：MCP + 社区功能
