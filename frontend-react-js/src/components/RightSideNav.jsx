import React from 'react'
import './RightSideNav.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import ProfileForm from './AvatarUpload';
 function RightSideNav() {
  const user = useSelector(state => state.user.userID);
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate('/signin');
  }
  const handleSignUp = () => {
    navigate('/signup');
  
  }
  return (
    <div id='rightSideNav'>
      
      {user? <div id='trends'>
          <h6>Trending</h6>
      </div> :
       <div id='signin-signup'>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      }
      
    {/* < ProfileForm /> */}
    </div>
  )
}
export default RightSideNav;