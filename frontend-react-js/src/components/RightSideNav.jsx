import React, { useEffect, useState } from 'react';
import './RightSideNav.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {avatarurl} from '../utilis.js'


function RightSideNav() {
  const user = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };
  const handleFollow = async (userID) => {
   
    try {
      await axios.post(`http://localhost:8081/follow/${userID}`,{},
        {
          headers: {
            authorization: token,
          },
        }
      );
      
      console.log(`Successfully followed user with ID: ${userID}`);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div id='rightSideNav'>
      {user ? (
        <div id='trends'>
          <h6>Trending</h6>
        </div>
      ) : (
        <div id='signin-signup'>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      )}

              <div id="platform-users">
                <h6>Platform Users</h6>
                <ul>
                  {users.map((user) => (
                    <li key={user.userID}>
                     <img className="displayImg" src={`${avatarurl}/${user.userID}.jpeg`} alt="Profile pic" />
                      
                      <span>{user.name}</span>
                      <button onClick={() => handleFollow(user.userID)}>Follow</button>
                    </li>
                  ))}
                </ul>
              </div>

    </div>
  );
}

export default RightSideNav;
