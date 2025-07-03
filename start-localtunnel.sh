#!/bin/bash

# 使用localtunnel的内网穿透方案
echo "🌐 使用LocalTunnel内网穿透"
echo "========================="

# 安装localtunnel
if ! command -v lt &> /dev/null; then
    echo "📦 安装localtunnel..."
    npm install -g localtunnel
fi

# 启动应用
echo "🚀 启动应用..."
npm start &
APP_PID=$!

# 等待应用启动
sleep 5

# 启动localtunnel
echo "🌐 启动内网穿透..."
echo "🔗 将显示外网访问地址"
lt --port 3001 --subdomain realtime-chat-$(date +%s)

# 清理
kill $APP_PID
