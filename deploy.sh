#!/bin/bash

# 微信云托管部署脚本

echo "🚀 开始部署到微信云托管..."

# 检查是否安装了微信开发者工具CLI
if ! command -v wxcloud &> /dev/null; then
    echo "❌ 请先安装微信开发者工具CLI"
    echo "下载地址: https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html"
    exit 1
fi

# 构建 Docker 镜像
echo "📦 构建 Docker 镜像..."
docker build -t realtime-chat .

if [ $? -ne 0 ]; then
    echo "❌ Docker 镜像构建失败"
    exit 1
fi

echo "✅ Docker 镜像构建成功"

# 推送到微信云托管
echo "☁️ 推送到微信云托管..."
echo "请在微信开发者工具中完成以下步骤："
echo "1. 打开微信开发者工具"
echo "2. 选择云开发 -> 云托管"
echo "3. 创建新服务或选择现有服务"
echo "4. 上传本地 Docker 镜像: realtime-chat"
echo "5. 配置服务参数（参考 container.config.json）"
echo "6. 部署服务"

echo "🎉 部署脚本执行完成！"
