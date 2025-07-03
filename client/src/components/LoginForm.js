import React, { useState } from 'react';
import './LoginForm.css';

const avatars = ['👤', '😀', '😎', '🤖', '👨‍💻', '👩‍💻', '🦄', '🐱', '🐶', '🦊'];

function LoginForm({ onLogin, isConnected }) {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() && isConnected) {
      setIsLoading(true);
      // 模拟加载延迟
      setTimeout(() => {
        onLogin({
          username: username.trim(),
          avatar: selectedAvatar
        });
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h1>💬 实时聊天室</h1>
          <p>选择头像，输入昵称开始聊天</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="avatar-selection">
            <label>选择头像：</label>
            <div className="avatar-grid">
              {avatars.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="username">昵称：</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入您的昵称"
              maxLength={20}
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={!username.trim() || !isConnected || isLoading}
          >
            {isLoading ? '加入中...' : '加入聊天室'}
          </button>

          <div className={`connection-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            <span className="status-dot"></span>
            {isConnected ? '已连接到服务器' : '连接服务器中...'}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
