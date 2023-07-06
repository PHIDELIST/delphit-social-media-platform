import React from 'react'
import './RightSideNav.css'
import { useNavigate } from 'react-router-dom';
 function RightSideNav() {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/search');
  }
  const handleSignIn = () => {
    navigate('/signin');
  }
  const handleSignUp = () => {
    navigate('/signup');
  
  }
  return (
    <div id='rightSideNav'>
      <div id='searchBar'>
        <input type="search" placeholder='Search' />
        <button onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i>Search</button>
      </div>
      <div id='signin-signup'>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>

    </div>
  )
}
export default RightSideNav;