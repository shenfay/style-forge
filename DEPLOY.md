# 部署指南

## 方案一：自建服务器（Docker Compose，推荐）

完整部署架构：**Nginx（静态文件 + 反向代理）+ Node.js（占位图服务）**

### 前置条件

- 服务器安装 Docker 和 Docker Compose
- 域名 `style.atmedia.fun` DNS 已指向服务器 IP
- 开放端口 80（HTTP）和 443（HTTPS）

### 1. 克隆项目

```bash
git clone https://github.com/your-username/style-forge.git
cd style-forge
```

### 2. 初始化 SSL 证书（首次部署）

```bash
chmod +x scripts/init-ssl.sh
sudo ./scripts/init-ssl.sh
```

脚本会自动完成：
- 创建 certbot 验证目录
- 临时启动 Nginx 用于域名验证
- 通过 Let's Encrypt 获取 SSL 证书
- 将证书复制到 `ssl/` 目录

### 3. 启动服务

```bash
docker compose up -d
```

### 4. 验证部署

```bash
# 查看容器状态
docker compose ps

# 查看日志
docker compose logs -f

# 访问服务
curl https://style.atmedia.fun
curl https://style.atmedia.fun/placeholder?width=800&height=600
```

### 更新部署

```bash
git pull
docker compose build --no-cache nginx
docker compose up -d
```

### 文件结构

```
├── nginx.conf              # Nginx 生产配置
├── Dockerfile              # 多阶段构建（Builder + Nginx）
├── docker-compose.yml      # Nginx + Placeholder 服务编排
├── .dockerignore
├── server/
│   └── placeholder.mjs     # 占位图 SVG 生成服务
└── scripts/
    └── init-ssl.sh          # SSL 证书初始化
```

### 架构说明

```
客户端 → Nginx (:443)
         ├── /assets/*        → 静态文件（长缓存 1 年）
         ├── /robots.txt 等   → 静态文件
         ├── /placeholder     → 代理到 Node.js 服务 (:3001)
         └── /*               → SPA index.html（客户端路由）
```

## 方案二：Vercel（零配置）

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

## 方案三：自建服务器（原生部署，不使用 Docker）

服务器需安装：Node.js 20+、Nginx、certbot

### 前置条件

- 域名 `style.atmedia.fun` DNS 指向服务器 IP
- 开放端口 80 / 443

### 1. 安装依赖（Ubuntu 示例）

```bash
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx

# 确认安装
node --version   # v20+
nginx -v
```

### 2. 部署代码

```bash
# 创建部署目录
sudo mkdir -p /var/www/style.atmedia.fun
sudo chown -R $USER:www-data /var/www/style.atmedia.fun

# 克隆或同步代码
git clone https://github.com/your-username/style-forge.git /var/www/style.atmedia.fun

# 安装依赖并构建
cd /var/www/style.atmedia.fun
npm ci
npm run build
```

### 3. 配置 Nginx 站点

```bash
# 启用站点配置
sudo ln -sf /var/www/style.atmedia.fun/nginx-site.conf \
    /etc/nginx/sites-available/style.atmedia.fun
sudo ln -sf /etc/nginx/sites-available/style.atmedia.fun \
    /etc/nginx/sites-enabled/

# 创建 certbot 验证目录
sudo mkdir -p /var/www/certbot

# 测试配置并重启
sudo nginx -t && sudo systemctl reload nginx
```

### 4. 获取 SSL 证书

```bash
sudo certbot --nginx -d style.atmedia.fun --email admin@atmedia.fun --agree-tos --no-eff-email
```

certbot 会自动修改 Nginx 配置添加 SSL 相关指令，后续证书到期也会自动续期。

### 5. 配置占位图服务为系统服务

```bash
sudo cp /var/www/style.atmedia.fun/server/style-forge-placeholder.service \
    /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable style-forge-placeholder
sudo systemctl start style-forge-placeholder
sudo systemctl status style-forge-placeholder  # 确认 running
```

### 6. 验证

```bash
curl https://style.atmedia.fun
curl https://style.atmedia.fun/placeholder?width=800&height=600
curl http://127.0.0.1:3001/health   # 占位图服务健康检查
```

### 日常更新流程

```bash
cd /var/www/style.atmedia.fun
git pull
npm ci                # 安装新依赖
npm run build         # 重新构建
sudo systemctl restart style-forge-placeholder  # 仅占位图服务变更时需要
sudo nginx -t && sudo systemctl reload nginx  # 仅 Nginx 配置变更时需要
```

> 如果只改前端代码（`src/` 下文件），只需 `npm run build` 即可，Nginx 会自动服务新文件，无需重启进程。

### 文件说明

```
/var/www/style.atmedia.fun/
├── nginx-site.conf                 # Nginx 站点配置（非 Docker 用）
├── server/
│   ├── placeholder.mjs             # 占位图 SVG 服务
│   └── style-forge-placeholder.service  # systemd 服务单元
└── dist/                           # 构建产物（Nginx 直接服务）
```

## 环境变量

创建 `.env` 文件（可选）：

```env
VITE_APP_TITLE=Style Forge
VITE_APP_URL=https://style.atmedia.fun
```

## 性能优化

### 已配置优化

- ✅ React 代码分割（react-vendor chunk）
- ✅ 静态资源缓存策略（1年）
- ✅ 安全头配置（XSS、Frame、Content-Type）
- ✅ SPA 路由支持（rewrites）
- ✅ 关键页面静态预渲染（首页、编辑页、占位图页）
- ✅ 动态 SEO meta 注入（useSEOMeta hook）
- ✅ robots.txt + sitemap.xml
- ✅ 404 页面（SPA catch-all）

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

## SEO 架构

### 路由角色

| 页面 | 路由 | robots | canonical | 说明 |
|------|------|--------|-----------|------|
| 营销首页 | `/` | `index, follow` | 自引用 | 品牌入口，承载核心 SEO |
| 编辑器 | `/designer/workbench` | `index, follow` | 自引用 | 接收预览页汇聚的权重 |
| 预览页 | `/designer?scene=xxx&...` | `noindex, follow` | → 编辑器 | 可被爬虫访问，权重归编辑器 |
| 占位图生成器 | `/placeholder/workbench` | `index, follow` | 自引用 | 独立工具页 |

### SEO 实现机制

- **静态预渲染**：构建时通过 `scripts/prerender.mjs` 为首页、编辑页、占位图页生成带完整 SEO meta 的 HTML 文件，爬虫无需执行 JS 即可获取 meta 信息
- **客户端动态注入**：运行时通过 `useSEOMeta` hook（`src/hooks/useSEOMeta.ts`）动态更新各页面的 title/meta/OG/canonical/JSON-LD
- **权重归集**：预览页通过 `<link rel="canonical">` 将 SEO 权重传递到编辑器页
- **社交分享**：预览页保留 OG 标签，确保社交平台分享时显示正确标题和描述

### 未来升级

当前采用方案 A（预渲染 + 客户端 SEO），架构设计兼容未来 SSR 迁移：
- `useSEOMeta` hook 内部实现可替换为 `react-helmet-async` 或 `next/head`
- 路由结构和组件无需变动
- 预渲染脚本可增强为 puppeteer 全量渲染

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
