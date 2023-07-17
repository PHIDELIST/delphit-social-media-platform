import React from 'react';
import './FriendItem.css';
import Avatar from './Avatar';
import axios from 'axios';

function FriendItem({ friend }) {
  const { friendship_id, name, avatarID } = friend;

  const handleDeleteFriendship = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this friendship?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/unfollow/${friendship_id}`);
        console.log('Friendship deleted successfully');
      } catch (error) {
        console.error('Error deleting friendship:', error);
      }
    }
  };
  
  return (
    <li className="friend-item">
      <div className="friend-avatar">
        <Avatar avatarID={avatarID} />
        @{name}
      </div>
      <div className="friend-info">
        <button onClick={handleDeleteFriendship}>Unfollow</button>
      </div>
    </li>
  );
}

export default FriendItem;
