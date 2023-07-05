import React from 'react'
import './RightSideNav.css'
 function RightSideNav() {
  return (
    <div id='rightSideNav'>
      <div id='searchBar'>
        <input type="search" placeholder='Search' />
        <button>Search</button>
      </div>
      <div id='signin-signup'>
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>

    </div>
  )
}
export default RightSideNav;