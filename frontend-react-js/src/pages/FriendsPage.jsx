import React, { useEffect, useState } from 'react';
import './FriendsPage.css';
import Avatar from '../components/Avatar';
import FriendItem from '../components/FriendItem';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Chatsocket from '../components/Chatsocket';

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const currentUserID = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.name);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:8081/friends', {
          headers: {
            authorization: token,
          },
        });
        const fetchedFriends = response.data.filter((friend) => friend.userID !== currentUserID);
        setFriends(fetchedFriends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [currentUserID, token]);

  return (
    <div className="friends-page-container">
      <ul className="friend-list">
        {friends.map((friend) => (
          <FriendItem
            key={friend.friendship_id}
            friend={friend}
            onClick={() => setSelectedFriend(friend)}
          />
        ))}
      </ul>
      {selectedFriend && (
        <Chatsocket
          username={username} 
          room={selectedFriend.friendship_id}
        />
      )}
    </div>
  );
}

export default FriendsPage;
