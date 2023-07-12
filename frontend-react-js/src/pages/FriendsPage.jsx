import React from 'react';
import './FriendsPage.css';
import Avatar from '../components/Avatar';


function FriendsPage() {

  const friends = [
    {
      id: 1,
      name: 'omuya',
      avatar: <Avatar />,
      status: 'Online',
    },
    {
      id: 2,
      name: 'oluoch',
      avatar: <Avatar />,
      status: 'Offline',
    },
    
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
