import React from 'react';
import './Message.css';

function Message({ message, isOwn, showAvatar }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (message.type === 'system') {
    return (
      <div className="message system-message">
        <div className="system-content">
          <span className="system-icon">ℹ️</span>
          <span className="system-text">{message.message}</span>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`message user-message ${isOwn ? 'own' : 'other'}`}>
      <div className="message-content">
        {!isOwn && showAvatar && (
          <div className="message-avatar">
            <span className="avatar-emoji">{message.avatar || '👤'}</span>
          </div>
        )}
        
        <div className="message-bubble">
          {!isOwn && showAvatar && (
            <div className="message-header">
              <span className="message-username">{message.username}</span>
            </div>
          )}
          
          <div className="message-text">
            {message.message}
          </div>
          
          <div className="message-time">
            {formatTime(message.timestamp)}
          </div>
        </div>
        
        {isOwn && showAvatar && (
          <div className="message-avatar">
            <span className="avatar-emoji">{message.avatar || '👤'}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
