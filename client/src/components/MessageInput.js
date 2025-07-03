import React, { useState, useRef, useEffect } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage, onTyping, disabled }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    // 组件挂载时聚焦输入框
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    // 处理正在输入状态
    if (value.trim() && !isTyping) {
      setIsTyping(true);
      onTyping(true);
    }

    // 清除之前的定时器
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // 设置新的定时器，1秒后停止输入状态
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        onTyping(false);
      }
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      
      // 停止输入状态
      if (isTyping) {
        setIsTyping(false);
        onTyping(false);
      }
      
      // 清除定时器
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "连接中..." : "输入消息... (Enter发送，Shift+Enter换行)"}
          disabled={disabled}
          rows={1}
          className="message-textarea"
          maxLength={1000}
        />
        
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="send-button"
          title="发送消息"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      
      <div className="input-footer">
        <span className="char-count">
          {message.length}/1000
        </span>
        <span className="input-hint">
          Enter发送 • Shift+Enter换行
        </span>
      </div>
    </form>
  );
}

export default MessageInput;
