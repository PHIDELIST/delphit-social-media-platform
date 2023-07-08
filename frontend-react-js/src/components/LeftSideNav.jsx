import Logo from "../assets/Logo.png";
import "./LeftSideNav.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import {
  FaBars,
  FaHome,
  FaBell,
  FaComments,
  FaUserFriends,
  FaUser,
} from "react-icons/fa";

function LeftSideNav() {
  const navigate = useNavigate();
  const [showNavButtons, setShowNavButtons] = useState(true);

  const toggleNavButtons = () => {
    setShowNavButtons(!showNavButtons);
  };

  return (
    <>
      <div id="leftSideNav" className={showNavButtons ? "" : "compressed"}>
        <img id="logo" src={Logo} alt="logo" />
        <div
          id="leftnav-btns"
          className={showNavButtons ? "show" : "hide"}
        >
          <button id="leftnav-btn" onClick={() => navigate("/home")}>
            <FaHome size={32} id="icons" /> <span>Home</span>
          </button>
          <button id="leftnav-btn" onClick={() => navigate("/notifications")}>
            <FaBell size={32} id="icons" /> <span>Notifications</span>
          </button>
          <button id="leftnav-btn" onClick={() => navigate("/chats")}>
            <FaComments size={32} id="icons" /><span>Chats</span>
          </button>
          <button id="leftnav-btn" onClick={() => navigate("/friends")}>
            <FaUserFriends size={32} id="icons" /><span>Friends</span>
          </button>
          <button id="leftnav-btn" onClick={() => navigate("/profile")}>
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
