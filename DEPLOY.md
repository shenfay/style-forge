# 部署指南

## 快速部署

### 方案一：Vercel（推荐）

1. ** Fork 仓库**
   ```bash
   git clone https://github.com/your-username/style-forge.git
   cd style-forge
   ```

2. ** 推送到 GitHub**
   ```bash
   git remote add origin https://github.com/your-username/style-forge.git
   git push -u origin main
   ```

3. ** 部署到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入 GitHub 仓库
   - 自动检测 Vite 框架，无需额外配置
   - 点击 "Deploy"

4. ** 自定义域名（可选）**
   - 在 Vercel 项目设置中添加自定义域名
   - 配置 DNS 记录指向 Vercel

### 方案二：Netlify

1. ** 创建 netlify.toml**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. ** 部署到 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 拖拽 `dist` 文件夹或连接 GitHub 仓库
   - 自动部署

### 方案三：静态服务器

1. ** 构建项目**
   ```bash
   npm run build
   ```

2. ** 使用 Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # 缓存静态资源
       location /assets/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. ** 使用 Docker**
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

## 环境变量

创建 `.env` 文件（可选）：

```env
VITE_APP_TITLE=Style Forge
VITE_APP_URL=https://style-forge.dev
```

## 性能优化

### 已配置优化

- ✅ React 代码分割（react-vendor chunk）
- ✅ 静态资源缓存策略（1年）
- ✅ 安全头配置（XSS、Frame、Content-Type）
- ✅ SPA 路由支持（rewrites）

### 可选优化

1. **图片优化**
   ```bash
   npm install -D @tinysvg/vite-plugin-image-optimizer
   ```

2. **压缩**
   ```bash
   npm install -D vite-plugin-compression
   ```

   ```typescript
   import compression from 'vite-plugin-compression'
   
   export default defineConfig({
     plugins: [compression({ algorithm: 'gzip' })]
   })
   ```

3. **分析包大小**
   ```bash
   npm install -D rollup-plugin-visualizer
   ```

## 监控和分析

### Google Analytics

在 `index.html` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_ID');
</script>
```

### Sentry 错误监控

```bash
npm install @sentry/react @sentry/vite-plugin
```

## CI/CD（可选）

### GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 故障排查

### 构建失败

1. 检查 Node.js 版本（建议 18+）
   ```bash
   node --version
   ```

2. 清理缓存
   ```bash
   rm -rf node_modules
   npm cache clean --force
   npm install
   ```

### 部署后 404

- 确认 SPA 路由配置正确
- Vercel：检查 `vercel.json` rewrites
- Netlify：检查 `netlify.toml` redirects
- Nginx：检查 `try_files` 配置

### 静态资源加载失败

- 检查 `vite.config.ts` 中的 `base` 配置
- 生产环境应使用相对路径：`base: './'`
