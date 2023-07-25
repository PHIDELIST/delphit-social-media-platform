import Logo from "../assets/Logo.png";
import "./LeftSideNav.css";
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import Avatar from "../components/Avatar";
import { FaBars, FaHome, FaBell, FaComments, FaUserFriends,FaPlusCircle,} from "react-icons/fa";
import {useDispatch} from "react-redux"
import {homeUI} from "../redux/uiSlice";
import { useSelector } from "react-redux";
function LeftSideNav() {
  const username =  useSelector((state) => state.user.name);
  const avatarID = useSelector((state) => state.user.userID);
  const dispatch = useDispatch();

  const handleCreatepost = () => {
    dispatch(homeUI("createpost"));
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

 const [collapsed, setCollapsed] = useState(false);
 const handleWindowResize = () => {
  setCollapsed(window.innerWidth < 768);
 
 }
 useEffect(() => {
  handleWindowResize();
  window.addEventListener("resize", handleWindowResize);
  return () => {
   window.removeEventListener("resize", handleWindowResize);
  };
 
},[])
  return (
  
      <Sidebar id="leftSideNav" collapsed={collapsed}   style={{ height: "100vh"}}>
        <Menu>
          
        <MenuItem icon={<FaBars />} onClick={() => {   setCollapsed(!collapsed); }} style={{ textAlign: "center" }} > {" "}<img id="logo" src={Logo} alt="logo" /></MenuItem>
          
        <MenuItem id="leftnav-btn" icon={<FaHome size={30}  id="icons" />}onClick={handleHome}>Home</MenuItem>
         <MenuItem id="leftnav-btn" icon={<FaBell size={30} id="icons" />}onClick={handleNotifications}>Notifications</MenuItem>
          <MenuItem id="leftnav-btn" icon={<FaComments size={30} id="icons"  />} onClick={handleChats}>Chats</MenuItem>
          <MenuItem id="leftnav-btn" icon={<FaUserFriends size={30} id="icons"  />} onClick={handleFriends}>Friends</MenuItem>
         <MenuItem id="leftnav-avatar" icon={ <Avatar avatarID={avatarID } /> }onClick={handleProfile}>@{username}</MenuItem>  
         <button id='logout' onClick={handleCreatepost}> <FaPlusCircle />post</button>      
      </Menu>
      </Sidebar>      
  );
}

export default LeftSideNav;
