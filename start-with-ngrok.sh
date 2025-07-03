#!/bin/bash

# 一键启动应用并开启内网穿透
echo "🚀 启动聊天应用 + 内网穿透"
echo "=========================="

# 检查ngrok是否安装
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok未安装，请先运行: ./setup-ngrok.sh"
    exit 1
fi

# 检查是否配置了authtoken
if ! ngrok config check &> /dev/null; then
    echo "⚠️  请先配置ngrok authtoken:"
    echo "1. 访问 https://ngrok.com 注册账号"
    echo "2. 获取authtoken"
    echo "3. 运行: ngrok config add-authtoken 你的token"
    exit 1
fi

# 启动应用
echo "🏗️ 构建并启动应用..."
npm run build
npm start &
APP_PID=$!

# 等待应用启动
echo "⏳ 等待应用启动..."
sleep 5

# 检查应用是否启动成功
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ 应用启动成功！"
else
    echo "❌ 应用启动失败，请检查日志"
    kill $APP_PID
    exit 1
fi

# 启动ngrok
echo "🌐 启动内网穿透..."
echo "📱 请保持此窗口打开！"
echo "🔗 ngrok将显示外网访问地址"
echo "📋 复制https://开头的地址给朋友即可"
echo ""

# 启动ngrok并显示URL
ngrok http 3001

# 清理
echo "🧹 清理进程..."
kill $APP_PID
