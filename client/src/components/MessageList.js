import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import './MessageList.css';

function MessageList({ messages, currentUser, typingUsers }) {
  return (
    <div className="message-list">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>欢迎来到聊天室！</h3>
            <p>开始发送消息与其他用户交流吧</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message
              key={message.id || index}
              message={message}
              isOwn={message.username === currentUser.username}
              showAvatar={
                index === 0 || 
                messages[index - 1].username !== message.username ||
                messages[index - 1].type !== message.type
              }
            />
          ))
        )}
        
        {/* 正在输入指示器 */}
        {typingUsers.length > 0 && (
          <TypingIndicator users={typingUsers} />
        )}
      </div>
    </div>
  );
}

export default MessageList;
