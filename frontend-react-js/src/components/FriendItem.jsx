import React, { useState } from 'react';
import './FriendItem.css';
import Avatar from './Avatar';
import axios from 'axios';
import Chatsocket from './Chatsocket';
import { url } from '../utilis';
import { useSelector } from 'react-redux';
function FriendItem({ friend }) {
  const { friendship_id, name, avatarID } = friend;
  const [showChat, setShowChat] = useState(false); // State variable to toggle chat display
  const username = useSelector(state => state.user.name)
  const handleDeleteFriendship = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this friendship?');
    if (confirmDelete) {
      try {
        await axios.delete(`${url}/unfollow/${friendship_id}`);
        console.log('Friendship deleted successfully');
      } catch (error) {
        console.error('Error deleting friendship:', error);
      }
    }
  };

  return (
    <li className="friend-item">
      <div id="friend-container-header">
      <div className="friend-avatar">
      @{name}
        <Avatar avatarID={avatarID} />
      
      </div>
      <div className="friend-btns">
        <button onClick={handleDeleteFriendship}>Unfollow</button>
        <button onClick={() => setShowChat(!showChat)}>Chat</button>
       </div>
       </div>
       <div className="chat-container"> 
        {showChat && (
          <Chatsocket
            username={username} 
            room={friendship_id}
          />
        )}
      </div>
    </li>
  );
}

export default FriendItem;
