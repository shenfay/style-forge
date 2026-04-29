#!/bin/bash
# Style Forge - SSL 证书初始化脚本（首次部署使用）
# 前置条件：域名 DNS 已指向服务器 IP
#
# 使用方式：
#   chmod +x scripts/init-ssl.sh
#   sudo ./scripts/init-ssl.sh
#
# 依赖：certbot, docker

set -e

DOMAIN="style.atmedia.fun"
EMAIL="admin@atmedia.fun"  # 改为你的邮箱

echo "=== Step 1: 创建 certbot 目录 ==="
mkdir -p certbot/www

echo "=== Step 2: 临时启动 Nginx 获取证书 ==="
docker compose run --rm -p 80:80 \
    -v $(pwd)/certbot/www:/var/www/certbot \
    nginx nginx -g "daemon off;" &
NGINX_PID=$!
sleep 2

echo "=== Step 3: 运行 certbot ==="
docker run --rm \
    -v $(pwd)/certbot/www:/var/www/certbot \
    -v $(pwd)/ssl:/etc/letsencrypt \
    certbot/certbot \
    certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN

echo "=== Step 4: 停止临时 Nginx ==="
kill $NGINX_PID 2>/dev/null || true
wait $NGINX_PID 2>/dev/null || true

echo "=== Step 5: 复制证书到 ssl/ 目录 ==="
mkdir -p ssl
cp ssl/live/$DOMAIN/fullchain.pem ssl/
cp ssl/live/$DOMAIN/privkey.pem ssl/

echo "=== 完成 ==="
echo "现在可以运行 docker compose up -d 启动完整服务"
