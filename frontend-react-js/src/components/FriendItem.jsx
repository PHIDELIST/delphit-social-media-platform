import React from 'react';
import './FriendItem.css';
import Avatar from './Avatar';
function FriendItem({ friend }) {
  const { name, avatar, status } = friend;

  return (
    <li className="friend-item">
      <div className="friend-avatar">
        @{name}
        <Avatar/>
      </div>
      <div className="friend-info">
        
        <p>Status: {status}</p>
      </div>
    </li>
  );
}

export default FriendItem;
