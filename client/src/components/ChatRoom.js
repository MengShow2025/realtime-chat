import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import './ChatRoom.css';

function ChatRoom({ 
  user, 
  messages, 
  users, 
  typingUsers, 
  onSendMessage, 
  onTyping, 
  isConnected 
}) {
  const [showUserList, setShowUserList] = useState(false);
  const messagesEndRef = useRef(null);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message) => {
    onSendMessage(message);
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  return (
    <div className="chat-room">
      {/* 聊天室头部 */}
      <div className="chat-header">
        <div className="header-left">
          <h2>💬 实时聊天室</h2>
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            <span className="status-dot"></span>
            {isConnected ? '已连接' : '连接中...'}
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-avatar">{user.avatar}</span>
            <span className="username">{user.username}</span>
          </div>
          <button 
            className="users-toggle"
            onClick={toggleUserList}
            title="查看在线用户"
          >
            👥 {users.length}
          </button>
        </div>
      </div>

      {/* 聊天主体 */}
      <div className="chat-body">
        <div className="chat-main">
          <MessageList 
            messages={messages} 
            currentUser={user}
            typingUsers={typingUsers}
          />
          <div ref={messagesEndRef} />
        </div>

        {/* 用户列表侧边栏 */}
        <div className={`user-sidebar ${showUserList ? 'show' : ''}`}>
          <UserList users={users} currentUser={user} />
        </div>
      </div>

      {/* 消息输入区域 */}
      <div className="chat-footer">
        <MessageInput 
          onSendMessage={handleSendMessage}
          onTyping={onTyping}
          disabled={!isConnected}
        />
      </div>

      {/* 移动端用户列表遮罩 */}
      {showUserList && (
        <div 
          className="user-list-overlay"
          onClick={() => setShowUserList(false)}
        />
      )}
    </div>
  );
}

export default ChatRoom;
