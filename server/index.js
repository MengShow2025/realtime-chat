const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// 存储在线用户
const users = new Map();
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);

  // 用户加入
  socket.on('join', (userData) => {
    users.set(socket.id, {
      id: socket.id,
      username: userData.username,
      avatar: userData.avatar || '👤'
    });
    
    // 广播用户列表更新
    io.emit('users_update', Array.from(users.values()));
    
    // 发送欢迎消息
    socket.emit('message', {
      id: Date.now(),
      username: '系统',
      message: `欢迎 ${userData.username} 加入聊天室！`,
      timestamp: new Date().toISOString(),
      type: 'system'
    });
    
    // 广播用户加入消息
    socket.broadcast.emit('message', {
      id: Date.now(),
      username: '系统',
      message: `${userData.username} 加入了聊天室`,
      timestamp: new Date().toISOString(),
      type: 'system'
    });
  });

  // 处理消息
  socket.on('message', (messageData) => {
    const user = users.get(socket.id);
    if (user) {
      const message = {
        id: Date.now(),
        username: user.username,
        avatar: user.avatar,
        message: messageData.message,
        timestamp: new Date().toISOString(),
        type: 'user'
      };
      
      // 广播消息给所有用户
      io.emit('message', message);
    }
  });

  // 用户正在输入
  socket.on('typing', (data) => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('typing', {
        username: user.username,
        isTyping: data.isTyping
      });
    }
  });

  // 用户断开连接
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      
      // 广播用户离开消息
      socket.broadcast.emit('message', {
        id: Date.now(),
        username: '系统',
        message: `${user.username} 离开了聊天室`,
        timestamp: new Date().toISOString(),
        type: 'system'
      });
      
      // 更新用户列表
      io.emit('users_update', Array.from(users.values()));
    }
    
    console.log('用户断开连接:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`本地访问: http://localhost:${PORT}`);

  // 获取本机IP地址
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      if (interface.family === 'IPv4' && !interface.internal) {
        console.log(`局域网访问: http://${interface.address}:${PORT}`);
      }
    }
  }
});
