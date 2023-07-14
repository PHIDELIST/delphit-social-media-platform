import React from 'react'
import './Avatar.css'
import { useSelector } from 'react-redux'
import {avatarurl} from '../utilis.js'
export default function Avatar() {
  const avatarID = useSelector(state => state.user.userID)
  return (
    <div id="avatar-img">
      <img className="displayImg" src={`${avatarurl}/${avatarID}.jpeg`} alt="Profile pic" />

    </div>
  )
}
