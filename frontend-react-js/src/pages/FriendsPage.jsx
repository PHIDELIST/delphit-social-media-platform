import React, { useEffect, useState } from 'react';
import './FriendsPage.css';
import Avatar from '../components/Avatar';
import FriendItem from '../components/FriendItem';
import axios from 'axios';
import { useSelector } from 'react-redux';

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const currentUserID = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    // Fetch friends data from the backend
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
          <FriendItem key={friend.friendship_id} friend={friend} />
        ))}
      </ul>
    </div>
  );
}

export default FriendsPage;
