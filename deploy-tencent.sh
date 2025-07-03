#!/bin/bash

# 腾讯云服务器部署脚本
# 使用方法: chmod +x deploy-tencent.sh && ./deploy-tencent.sh

echo "🚀 腾讯云服务器部署脚本"
echo "=========================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查是否为root用户
if [ "$EUID" -eq 0 ]; then
    echo -e "${YELLOW}警告: 建议不要使用root用户运行此脚本${NC}"
fi

# 1. 更新系统
echo -e "${BLUE}📦 更新系统包...${NC}"
sudo apt update && sudo apt upgrade -y

# 2. 安装Node.js 18
echo -e "${BLUE}📦 安装Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
echo -e "${GREEN}✅ Node.js版本: $(node --version)${NC}"
echo -e "${GREEN}✅ npm版本: $(npm --version)${NC}"

# 3. 安装PM2 (进程管理器)
echo -e "${BLUE}📦 安装PM2...${NC}"
sudo npm install -g pm2

# 4. 安装Nginx (反向代理)
echo -e "${BLUE}📦 安装Nginx...${NC}"
sudo apt install -y nginx

# 5. 安装Git
echo -e "${BLUE}📦 安装Git...${NC}"
sudo apt install -y git

# 6. 创建应用目录
echo -e "${BLUE}📁 创建应用目录...${NC}"
sudo mkdir -p /var/www/realtime-chat
sudo chown -R $USER:$USER /var/www/realtime-chat

# 7. 克隆项目
echo -e "${BLUE}📥 克隆项目...${NC}"
cd /var/www/realtime-chat
git clone https://github.com/MengShow2025/realtime-chat.git .

# 8. 安装依赖
echo -e "${BLUE}📦 安装项目依赖...${NC}"
npm install --legacy-peer-deps
cd server && npm install --legacy-peer-deps
cd ../client && npm install --legacy-peer-deps

# 9. 构建客户端
echo -e "${BLUE}🏗️ 构建客户端...${NC}"
npm run build

# 10. 创建PM2配置文件
echo -e "${BLUE}⚙️ 创建PM2配置...${NC}"
cd /var/www/realtime-chat
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'realtime-chat',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
EOF

# 11. 创建Nginx配置
echo -e "${BLUE}⚙️ 配置Nginx...${NC}"
sudo tee /etc/nginx/sites-available/realtime-chat << 'EOF'
server {
    listen 80;
    server_name _;  # 替换为你的域名或IP

    # 静态文件
    location / {
        root /var/www/realtime-chat/client/build;
        try_files $uri $uri/ /index.html;
        
        # 缓存静态资源
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API和Socket.IO代理
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API路由
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# 12. 启用Nginx站点
sudo ln -sf /etc/nginx/sites-available/realtime-chat /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 13. 测试Nginx配置
echo -e "${BLUE}🧪 测试Nginx配置...${NC}"
sudo nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx配置正确${NC}"
    sudo systemctl reload nginx
else
    echo -e "${RED}❌ Nginx配置错误${NC}"
    exit 1
fi

# 14. 启动应用
echo -e "${BLUE}🚀 启动应用...${NC}"
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 15. 配置防火墙
echo -e "${BLUE}🔥 配置防火墙...${NC}"
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw --force enable

# 16. 显示状态
echo -e "${GREEN}🎉 部署完成！${NC}"
echo "=========================="
echo -e "${BLUE}📊 应用状态:${NC}"
pm2 status

echo -e "${BLUE}🌐 访问地址:${NC}"
echo "http://$(curl -s ifconfig.me)"
echo "或者"
echo "http://你的服务器IP地址"

echo -e "${BLUE}📝 常用命令:${NC}"
echo "查看日志: pm2 logs realtime-chat"
echo "重启应用: pm2 restart realtime-chat"
echo "停止应用: pm2 stop realtime-chat"
echo "更新代码: cd /var/www/realtime-chat && git pull && npm run build && pm2 restart realtime-chat"

echo -e "${GREEN}✅ 部署成功！${NC}"
