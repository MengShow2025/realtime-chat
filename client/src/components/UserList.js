import React from 'react';
import './UserList.css';

function UserList({ users, currentUser }) {
  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>在线用户</h3>
        <span className="user-count">{users.length}</span>
      </div>
      
      <div className="user-list-content">
        {users.length === 0 ? (
          <div className="empty-users">
            <div className="empty-icon">👥</div>
            <p>暂无在线用户</p>
          </div>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div
                key={user.id}
                className={`user-item ${user.id === currentUser.id ? 'current-user' : ''}`}
              >
                <div className="user-avatar">
                  <span className="avatar-emoji">{user.avatar}</span>
                  <div className="online-indicator"></div>
                </div>
                
                <div className="user-info">
                  <div className="user-name">
                    {user.username}
                    {user.id === currentUser.id && (
                      <span className="you-label">(你)</span>
                    )}
                  </div>
                  <div className="user-status">在线</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
