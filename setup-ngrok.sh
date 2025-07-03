#!/bin/bash

# ngrok内网穿透设置脚本
echo "🌐 设置ngrok内网穿透"
echo "===================="

# 检查操作系统
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "📱 检测到macOS系统"
    
    # 检查是否安装了Homebrew
    if ! command -v brew &> /dev/null; then
        echo "📦 安装Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # 安装ngrok
    echo "📦 安装ngrok..."
    brew install ngrok/ngrok/ngrok
    
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "🐧 检测到Linux系统"
    
    # 下载ngrok
    echo "📦 下载ngrok..."
    curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
    echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
    sudo apt update && sudo apt install ngrok
    
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows
    echo "🪟 检测到Windows系统"
    echo "请手动下载ngrok: https://ngrok.com/download"
    echo "或使用Chocolatey: choco install ngrok"
fi

echo "✅ ngrok安装完成！"
echo ""
echo "📋 接下来的步骤："
echo "1. 访问 https://ngrok.com 注册账号"
echo "2. 获取你的authtoken"
echo "3. 运行: ngrok config add-authtoken 你的token"
echo "4. 启动应用: npm start"
echo "5. 新终端运行: ngrok http 3001"
echo ""
echo "🎉 然后就可以通过ngrok提供的URL让朋友访问了！"
