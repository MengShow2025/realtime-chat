#!/bin/bash

# 简化版腾讯云部署脚本 - 适合技术小白
echo "🚀 简化版部署脚本"
echo "=================="

# 1. 安装Node.js
echo "📦 安装Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安装PM2
echo "📦 安装PM2..."
sudo npm install -g pm2

# 3. 克隆项目
echo "📥 下载项目..."
git clone https://github.com/MengShow2025/realtime-chat.git
cd realtime-chat

# 4. 安装依赖
echo "📦 安装依赖..."
npm install --legacy-peer-deps
cd server && npm install --legacy-peer-deps
cd ../client && npm install --legacy-peer-deps && cd ..

# 5. 构建项目
echo "🏗️ 构建项目..."
cd client && npm run build && cd ..

# 6. 启动应用
echo "🚀 启动应用..."
pm2 start server/index.js --name "chat-app"
pm2 save
pm2 startup

# 7. 开放端口
echo "🔥 配置防火墙..."
sudo ufw allow 3001
sudo ufw --force enable

echo "🎉 部署完成！"
echo "访问地址: http://$(curl -s ifconfig.me):3001"
echo "查看日志: pm2 logs chat-app"
