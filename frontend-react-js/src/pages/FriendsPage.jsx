import React from 'react';
import FriendItem from '../components/FriendItem';
import './FriendsPage.css';
import Avatar from '../components/Avatar';

function FriendsPage() {
  const friends = [
    {
      id: 1,
      name: 'John Doe',
      avatar: <Avatar />,
      status: 'Online',
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: <Avatar />,
      status: 'Offline',
    },
    // Add more friend objects as needed
  ];

  return (
    <div className="friends-page-container">
      
      <ul className="friend-list">
        {friends.map((friend) => (
          <FriendItem key={friend.id} friend={friend} />
        ))}
      </ul>
    </div>
  );
}

export default FriendsPage;
