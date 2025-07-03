# 🚀 实时聊天应用

一个基于 React + Node.js + Socket.IO 的现代化实时聊天应用，支持多用户在线聊天、打字指示器、用户状态等功能。

## ✨ 功能特性

- 💬 **实时消息传递** - 基于 WebSocket 的即时通讯
- 👥 **多用户支持** - 支持多人同时在线聊天
- 📱 **响应式设计** - 完美适配手机、平板、电脑
- ⌨️ **打字指示器** - 实时显示正在输入的用户
- 🎨 **现代化UI** - 美观的界面设计和流畅动画
- 👤 **用户头像** - 支持emoji头像选择
- 🔄 **连接状态** - 实时显示连接状态
- 📝 **消息时间戳** - 显示消息发送时间
- 🔔 **系统通知** - 用户加入/离开提醒

## 🛠️ 技术栈

### 前端
- **React 18** - 用户界面框架
- **Socket.IO Client** - WebSocket客户端
- **CSS3** - 样式和动画
- **响应式设计** - 移动端适配

### 后端
- **Node.js** - 服务器运行环境
- **Express** - Web应用框架
- **Socket.IO** - WebSocket服务器
- **CORS** - 跨域资源共享

## 🚀 快速开始

### 环境要求
- Node.js 14.0 或更高版本
- npm 6.0 或更高版本

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/你的用户名/realtime-chat.git
   cd realtime-chat
   ```

2. **安装依赖**
   ```bash
   npm run install-all
   ```

3. **启动应用**
   ```bash
   npm run dev
   ```

4. **访问应用**
   - 打开浏览器访问 `http://localhost:3000`
   - 局域网访问：`http://你的IP:3000`

## 📱 使用方法

1. **输入用户名** - 在登录页面输入你的昵称
2. **选择头像** - 点击选择一个emoji头像
3. **开始聊天** - 点击"加入聊天室"开始使用
4. **发送消息** - 在输入框输入消息并按回车发送
5. **查看在线用户** - 点击右上角按钮查看在线用户列表

## 🌐 部署选项

### 开发环境
```bash
npm run dev
```

### 生产环境
```bash
npm run build
npm start
```

### Docker部署
```bash
npm run docker:build
npm run docker:run
```

### 微信云托管
详见 [微信云托管部署指南](./WECHAT_CLOUD_DEPLOY.md)

## 📁 项目结构

```
realtime-chat/
├── client/                 # React前端应用
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── App.js         # 主应用组件
│   │   └── index.js       # 入口文件
│   └── package.json
├── server/                 # Node.js后端服务
│   ├── index.js           # 服务器主文件
│   └── package.json
├── Dockerfile             # Docker配置
├── container.config.json  # 云托管配置
└── README.md
```

## 🎯 核心功能

### 实时通讯
- WebSocket连接管理
- 消息广播
- 连接状态监控

### 用户管理
- 用户加入/离开处理
- 在线用户列表
- 用户状态同步

### 界面交互
- 响应式布局
- 打字状态显示
- 消息自动滚动

## 🔧 配置说明

### 环境变量
- `NODE_ENV` - 运行环境（development/production）
- `PORT` - 服务器端口（默认3001）

### 网络配置
- 前端端口：3000
- 后端端口：3001
- WebSocket协议：ws/wss

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 微信群讨论

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
