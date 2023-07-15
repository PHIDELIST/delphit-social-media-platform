
import './ProfilePage.css';
import Welcome from '../assets/Welcome.jpg';
import Avatar from '../components/Avatar';
import {useDispatch} from "react-redux"
import {homeUI} from "../redux/uiSlice";
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user);
  const useremail = useSelector((state) => state.user.email);
const handleCreatepost= () => {
  dispatch(homeUI("createpost"));
};


const handleEditprofile= () => {
  dispatch(homeUI("editprofile"));
};

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
            <button onClick={handleEditprofile}id='logout'> Edit Profile</button>
          </div>
          
          <div className='bio'>
            <h5>About {username}</h5>
            <p> I am a full stack cloud developer with a particular interest in making things simple and automating daily tasks. I try to keep up with security and best practices, and am always looking for new things to learn. </p>
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