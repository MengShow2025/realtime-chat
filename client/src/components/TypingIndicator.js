import React from 'react';
import './TypingIndicator.css';

function TypingIndicator({ users }) {
  if (users.length === 0) return null;

  const getTypingText = () => {
    if (users.length === 1) {
      return `${users[0]} 正在输入...`;
    } else if (users.length === 2) {
      return `${users[0]} 和 ${users[1]} 正在输入...`;
    } else {
      return `${users[0]} 等 ${users.length} 人正在输入...`;
    }
  };

  return (
    <div className="typing-indicator">
      <div className="typing-content">
        <div className="typing-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <span className="typing-text">{getTypingText()}</span>
      </div>
    </div>
  );
}

export default TypingIndicator;
