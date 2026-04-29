# Style Forge - 多阶段构建

# === Stage 1: 构建 SPA ===
FROM node:22-alpine AS builder

WORKDIR /app

# 先安装依赖（利用 Docker 缓存层）
COPY package.json package-lock.json ./
RUN npm ci

# 构建
COPY . .
RUN npm run build

# === Stage 2: Nginx 静态服务 ===
FROM nginx:alpine

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
