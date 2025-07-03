# 微信云托管部署指南

## 📋 部署前准备

### 1. 注册微信开发者账号
- 访问 [微信公众平台](https://mp.weixin.qq.com/)
- 注册开发者账号并完成认证

### 2. 开通云开发服务
- 登录微信公众平台
- 进入"开发" -> "云开发"
- 开通云开发服务

### 3. 安装微信开发者工具
- 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 安装并登录

## 🐳 Docker 部署方式

### 方法一：使用微信开发者工具（推荐）

1. **打开微信开发者工具**
   - 选择"云开发"
   - 进入"云托管"页面

2. **创建服务**
   - 点击"新建服务"
   - 服务名称：`realtime-chat`
   - 选择地域（建议选择离用户最近的地域）

3. **上传代码**
   - 选择"本地代码包"
   - 上传整个项目文件夹
   - 或者使用 Docker 镜像上传

4. **配置服务**
   ```json
   {
     "containerPort": 3001,
     "minNum": 0,
     "maxNum": 10,
     "cpu": 0.25,
     "mem": 0.5,
     "policyType": "cpu",
     "policyThreshold": 60,
     "envParams": {
       "NODE_ENV": "production",
       "PORT": "3001"
     }
   }
   ```

5. **部署服务**
   - 点击"部署"
   - 等待部署完成

### 方法二：使用命令行工具

1. **安装 CLI 工具**
   ```bash
   npm install -g @cloudbase/cli
   ```

2. **登录**
   ```bash
   tcb login
   ```

3. **部署**
   ```bash
   tcb run deploy --name realtime-chat
   ```

## ⚙️ 配置说明

### 环境变量
- `NODE_ENV`: 设置为 `production`
- `PORT`: 设置为 `3001`
- `FRONTEND_URL`: 可选，设置前端域名

### 资源配置
- **CPU**: 0.25核（可根据需要调整）
- **内存**: 0.5GB（可根据需要调整）
- **实例数量**: 0-10个（支持弹性伸缩）

### 端口配置
- **容器端口**: 3001
- **协议**: HTTP/HTTPS + WebSocket

## 🌐 域名配置

### 1. 绑定自定义域名（可选）
- 在云托管控制台绑定域名
- 配置 SSL 证书
- 设置 DNS 解析

### 2. 使用默认域名
- 微信云托管会提供默认域名
- 格式：`https://xxx.tcb.qcloud.la`

## 🔧 部署后配置

### 1. 测试连接
- 访问部署后的域名
- 测试聊天功能
- 检查 WebSocket 连接

### 2. 监控配置
- 在云托管控制台查看日志
- 设置告警规则
- 监控资源使用情况

## 📱 小程序集成（可选）

如果要在小程序中使用：

1. **配置服务器域名**
   - 在小程序后台配置 request 域名
   - 配置 socket 域名

2. **修改客户端代码**
   ```javascript
   // 小程序中使用
   const socket = wx.connectSocket({
     url: 'wss://your-domain.com'
   });
   ```

## 🚀 快速部署

运行部署脚本：
```bash
./deploy.sh
```

## 📊 性能优化建议

### 1. 资源配置
- 根据用户量调整实例数量
- 监控 CPU 和内存使用率
- 设置合理的弹性伸缩策略

### 2. 网络优化
- 使用 CDN 加速静态资源
- 启用 gzip 压缩
- 优化 WebSocket 连接

### 3. 数据库集成
- 可集成微信云数据库存储聊天记录
- 使用 Redis 缓存在线用户信息

## 🔍 故障排查

### 常见问题

1. **部署失败**
   - 检查 Dockerfile 语法
   - 确认端口配置正确
   - 查看构建日志

2. **WebSocket 连接失败**
   - 检查域名配置
   - 确认防火墙设置
   - 验证 CORS 配置

3. **性能问题**
   - 增加实例数量
   - 优化代码性能
   - 检查内存泄漏

### 日志查看
- 在云托管控制台查看实时日志
- 使用 `console.log` 输出调试信息
- 设置日志级别

## 💰 费用说明

微信云托管按使用量计费：
- CPU 使用时间
- 内存使用时间
- 网络流量
- 存储空间

建议：
- 合理设置最小实例数
- 监控资源使用情况
- 优化代码减少资源消耗

## 📞 技术支持

- [微信云托管文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/)
- [微信开发者社区](https://developers.weixin.qq.com/community/)
- 微信开发者工具内置帮助
