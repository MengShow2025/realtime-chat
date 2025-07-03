# 🚀 腾讯云服务器部署指南

## 📋 准备工作

### 1. 购买腾讯云服务器
- 访问 [腾讯云官网](https://cloud.tencent.com/)
- 选择 **云服务器CVM**
- 推荐配置：
  - **CPU**: 1核或2核
  - **内存**: 2GB或4GB
  - **系统**: Ubuntu 20.04 LTS
  - **带宽**: 1Mbps以上

### 2. 获取服务器信息
- **公网IP地址**
- **SSH登录用户名** (通常是 `ubuntu` 或 `root`)
- **SSH密钥** 或 **密码**

## 🎯 部署方案选择

### 方案一：一键自动部署（推荐新手）

#### 步骤1：连接服务器
```bash
# 使用SSH连接服务器（替换为你的IP地址）
ssh ubuntu@你的服务器IP地址
```

#### 步骤2：下载并运行部署脚本
```bash
# 下载项目
git clone https://github.com/MengShow2025/realtime-chat.git
cd realtime-chat

# 给脚本执行权限
chmod +x deploy-tencent.sh

# 运行完整部署脚本
./deploy-tencent.sh
```

#### 步骤3：访问应用
- 打开浏览器访问：`http://你的服务器IP地址`

---

### 方案二：简化部署（适合技术小白）

#### 步骤1：连接服务器并运行简化脚本
```bash
# SSH连接服务器
ssh ubuntu@你的服务器IP地址

# 下载并运行简化脚本
git clone https://github.com/MengShow2025/realtime-chat.git
cd realtime-chat
chmod +x deploy-simple.sh
./deploy-simple.sh
```

#### 步骤2：访问应用
- 打开浏览器访问：`http://你的服务器IP地址:3001`

---

### 方案三：Docker部署（推荐有经验用户）

#### 步骤1：安装Docker
```bash
# 安装Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 步骤2：部署应用
```bash
# 克隆项目
git clone https://github.com/MengShow2025/realtime-chat.git
cd realtime-chat

# 启动服务
docker-compose up -d
```

#### 步骤3：访问应用
- 打开浏览器访问：`http://你的服务器IP地址`

## 🔧 常用管理命令

### PM2 进程管理
```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs realtime-chat

# 重启应用
pm2 restart realtime-chat

# 停止应用
pm2 stop realtime-chat

# 删除应用
pm2 delete realtime-chat
```

### 更新应用
```bash
# 进入项目目录
cd /var/www/realtime-chat

# 拉取最新代码
git pull origin main

# 重新构建
npm run build

# 重启应用
pm2 restart realtime-chat
```

### Docker管理
```bash
# 查看容器状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 更新并重启
git pull && docker-compose up -d --build
```

## 🛡️ 安全配置

### 1. 配置防火墙
```bash
# 允许SSH
sudo ufw allow 22

# 允许HTTP
sudo ufw allow 80

# 允许HTTPS
sudo ufw allow 443

# 启用防火墙
sudo ufw enable
```

### 2. 配置SSL证书（可选）
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取SSL证书（替换为你的域名）
sudo certbot --nginx -d yourdomain.com
```

## 🚨 故障排除

### 应用无法访问
1. 检查应用状态：`pm2 status`
2. 查看日志：`pm2 logs`
3. 检查端口：`netstat -tlnp | grep 3001`
4. 检查防火墙：`sudo ufw status`

### 构建失败
1. 检查Node.js版本：`node --version`
2. 清理缓存：`npm cache clean --force`
3. 重新安装依赖：`rm -rf node_modules && npm install`

### 内存不足
1. 检查内存使用：`free -h`
2. 重启应用：`pm2 restart realtime-chat`
3. 考虑升级服务器配置

## 📞 技术支持

如果遇到问题，请提供以下信息：
- 服务器系统版本：`lsb_release -a`
- Node.js版本：`node --version`
- 错误日志：`pm2 logs realtime-chat`
- 系统资源：`free -h && df -h`

## 🎉 部署成功标志

当你看到以下内容时，说明部署成功：
- PM2显示应用状态为 `online`
- 浏览器能正常访问聊天界面
- 能够发送和接收消息
- 多个用户可以同时在线聊天
