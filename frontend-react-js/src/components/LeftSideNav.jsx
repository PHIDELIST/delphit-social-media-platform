import Logo from "../assets/Logo.png";
import "./LeftSideNav.css";
import { useState } from "react";

import Avatar from "../components/Avatar";
import { FaBars, FaHome, FaBell, FaComments, FaUserFriends, FaUser,} from "react-icons/fa";
import {useDispatch} from "react-redux"
import {homeUI} from "../redux/uiSlice";



function LeftSideNav() {
  const dispatch = useDispatch();

  const [showNavButtons, setShowNavButtons] = useState(true);
  const toggleNavButtons = () => {
    setShowNavButtons(!showNavButtons);
  };
  const handleHome = ()=> {
    dispatch(homeUI("home"));
  };
  const handleNotifications = () =>{
    dispatch(homeUI("notifications"));
  };
  const handleChats = () => {
    dispatch(homeUI("chats"));
  };
  const handleFriends = () => {
    dispatch(homeUI("friends"));
  };
  const handleProfile = () => {
    dispatch(homeUI("profile"));
  };

  
  return (
    <>
      <div id="leftSideNav" className={showNavButtons ? "" : "compressed"}>
        <img id="logo" src={Logo} alt="logo" />
        <div
          id="leftnav-btns"
          className={showNavButtons ? "show" : "hide"}
        >
          <button id="leftnav-btn" onClick={handleHome}>
            <FaHome size={32} id="icons" /> <span>Home</span>
          </button>
          <button id="leftnav-btn" onClick={handleNotifications}>
            <FaBell size={32} id="icons" /> <span>Notifications</span>
          </button>
          <button id="leftnav-btn" onClick={handleChats}>
            <FaComments size={32} id="icons" /><span>Chats</span>
          </button>
          <button id="leftnav-btn" onClick={handleFriends}>
            <FaUserFriends size={32} id="icons" /><span>Friends</span>
          </button>
          <button id="leftnav-btn" onClick={handleProfile}>
            <FaUser size={32} id="icons" /><span>Profile</span>
          </button>
        </div>
        <div id="leftnav-avatar">
          <Avatar /> @delphino
        </div>
        <div id="toggle-btn" onClick={toggleNavButtons}>
          <FaBars size={24} />
        </div>
      </div>
    </>
  );
}

export default LeftSideNav;
