import './ProfilePage.css';
import { useState, useEffect } from 'react';
import Welcome from '../assets/Welcome.jpg';
import Avatar from '../components/Avatar';
import { useDispatch } from "react-redux";
import { homeUI } from "../redux/uiSlice";
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import axios for API requests

export default function ProfilePage() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  const useremail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const [bio, setBio] = useState("");

  const handleCreatepost = () => {
    dispatch(homeUI("createpost"));
  };

  const handleEditprofile = () => {
    dispatch(homeUI("editprofile"));
  };

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await axios.get('http://localhost:8081/updateprofile', {
          headers: {
            authorization: token,
          },
        });

        setBio(response.data);
   
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBio(); // Call the fetchBio function
  }, [token]);

  return (
    <>
      <div id='profilepage-main'>
        <h6>@{username}</h6>
        <div className="card">
          <div className="card__img">
            <img src={Welcome} alt="avatar background" />
          </div>
          <div className="card__avatar">
            <Avatar />
          </div>
          <div className="email-editprofile">
            <h6>Email: {useremail}</h6>
            <button onClick={handleEditprofile} id='logout'> Edit Profile</button>
          </div>
          <div className='bio'>
            <h5>About {username}</h5>
            <p> {bio}</p>
          </div>
          <div className="post-logout">
            <button id='logout' onClick={handleCreatepost}>Create Post</button>
            <button id='logout'> Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}
