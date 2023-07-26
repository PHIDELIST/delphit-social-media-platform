import React, { useEffect, useState } from 'react';
import './RightSideNav.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { avatarurl, url } from '../utilis.js';
import Trends from './Trends';

function RightSideNav() {
  const loggedInUserID = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [trends, setTrends] = useState([]);

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleFollow = async (userID, index) => {
    try {
      await axios.post(
        `${url}/follow/${userID}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );

      // Update the users state to reflect the followed user
      setUsers((prevUsers) =>
        prevUsers.map((user, i) => (i === index ? { ...user, followed: true } : user))
      );

      console.log(`Successfully followed user with ID: ${userID}`);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/users`);
        const usersWithFollowedStatus = response.data.map((user) => ({
          ...user,
          followed: false, // Initialize followed status for each user as false
        }));

        // Filter out the logged-in user from the suggestion list
        const filteredUsers = usersWithFollowedStatus.filter(
          (user) => user.userID !== loggedInUserID
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [loggedInUserID]); // Fetch users again if the logged-in user changes

  return (
    <div id='rightSideNav'>
      <div id='trends'>
        <Trends />
      </div>
      <div id="platform-users">
        <h6>Suggested Users</h6>
        <ul>
          {users.map((user, index) => (
            <li key={user.userID}>
              <img className="displayImg" src={`${avatarurl}/${user.userID}.jpeg`} alt="Profile pic" />
              <span>{user.name}</span>
              {user.followed ? ( // Check if the user is already followed
                <span>Followed</span>
              ) : (
                <button onClick={() => handleFollow(user.userID, index)}>Follow</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RightSideNav;
