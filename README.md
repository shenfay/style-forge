# Style Forge

场景化 UI 设计配置器 - 在真实组件中预览效果，一键导出 Tailwind Config 和 AI 提示词。

## Features

- 🎨 **8维配置矩阵** - 页面底色、主题色、圆角、卡片样式等
- 📱 **双端预览** - 移动端 + PC 端实时预览
- 🤖 **LLM 集成** - 导出 AI 提示词供大模型使用
- 📦 **多格式导出** - Tailwind Config / AI 提示词 / 设计 Token
- 🌐 **URL 分享** - 无后端，配置通过 URL 参数传递

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4

## Getting Started

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 类型检查
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Configurator/   # 配置面板
│   ├── Preview/        # 预览组件
│   └── Export/         # 导出功能
├── hooks/              # 自定义 Hooks
├── templates/           # 模板 JSON
├── types/               # 类型定义
└── utils/               # 工具函数
```

## Documentation

See [docs](./docs/) for detailed documentation.

## License

MIT
