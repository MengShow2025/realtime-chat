#!/bin/bash

# 简化的构建脚本
echo "开始安装依赖..."

# 安装根目录依赖
npm install --legacy-peer-deps

# 安装服务器依赖
cd server
npm install --legacy-peer-deps
cd ..

# 安装客户端依赖并构建
cd client
npm install --legacy-peer-deps
npm run build
cd ..

echo "构建完成！"
