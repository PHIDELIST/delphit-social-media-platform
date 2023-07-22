import './ProfilePage.css';
import { useState, useEffect } from 'react';
import Welcome from '../assets/Welcome.jpg';
import Avatar from '../components/Avatar';
import { useDispatch } from "react-redux";
import { homeUI } from "../redux/uiSlice";
import { useSelector } from 'react-redux';
import { logout } from "../redux/userSlice";
import {useNavigate} from 'react-router-dom';
import { url } from '../utilis';
import axios from 'axios'; 
export default function ProfilePage() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  const useremail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const avatarID = useSelector((state) => state.user.userID);
  const [bio, setBio] = useState("");

  const handleCreatepost = () => {
    dispatch(homeUI("createpost"));
  };

  const handleEditprofile = () => {
    dispatch(homeUI("editprofile"));
  };
  const handleActivies = () => {
    dispatch(homeUI("activities"));
  }
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await axios.get(`${url}/updateprofile`, {
          headers: {
            authorization: token,
          },
        });

        setBio(response.data);
   
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBio(); 
  }, [token]);
  const handlelogout = () => {
      dispatch(logout());
      navigate('/signin');
  }
  return (
    <>
      <div id='profilepage-main'>
        <h6>@{username}</h6>
        <div className="card">
          <div className="card__img">
            <img src={Welcome} alt="avatar background" />
          </div>
          <div className="card__avatar">
            <Avatar avatarID={avatarID} />
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
            <button id='logout' onClick={handleActivies}>Activies</button>'
            <button id='logout' onClick={handlelogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}
