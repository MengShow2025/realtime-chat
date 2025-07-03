import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import LoginForm from './components/LoginForm';
import ChatRoom from './components/ChatRoom';
import './App.css';

// 根据环境自动选择服务器地址
const SOCKET_URL = process.env.NODE_ENV === 'production'
  ? window.location.origin
  : 'http://localhost:3001';

function App() {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 创建socket连接
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // 连接状态监听
    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('已连接到服务器');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('与服务器断开连接');
    });

    // 监听消息
    newSocket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // 监听用户列表更新
    newSocket.on('users_update', (userList) => {
      setUsers(userList);
    });

    // 监听正在输入状态
    newSocket.on('typing', (data) => {
      setTypingUsers(prev => {
        if (data.isTyping) {
          return [...prev.filter(u => u !== data.username), data.username];
        } else {
          return prev.filter(u => u !== data.username);
        }
      });
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    socket.emit('join', userData);
  };

  const handleSendMessage = (message) => {
    if (socket && message.trim()) {
      socket.emit('message', { message: message.trim() });
    }
  };

  const handleTyping = (isTyping) => {
    if (socket) {
      socket.emit('typing', { isTyping });
    }
  };

  if (!user) {
    return (
      <div className="app">
        <LoginForm onLogin={handleLogin} isConnected={isConnected} />
      </div>
    );
  }

  return (
    <div className="app">
      <ChatRoom
        user={user}
        messages={messages}
        users={users}
        typingUsers={typingUsers}
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        isConnected={isConnected}
      />
    </div>
  );
}

export default App;
