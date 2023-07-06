import Logo from "../assets/Logo.png"
import './LeftSideNav.css'
import {useNavigate} from 'react-router-dom'
import Avatar from '../components/Avatar'
 function LeftSideNav() {
  const navigate = useNavigate();
  return (
    <>
    <div id="leftSideNav"> 
      <img id="logo" src={Logo} alt="logo" />
      <div id="leftnav-btns">
        <button id="leftnav-btn" onClick={()=>navigate('/home')}>Home</button>
        <button id="leftnav-btn" onClick={()=>navigate('/notification')}>Notification</button>
        <button id="leftnav-btn" onClick={()=>navigate('/chats')}>Chats</button>
        <button id="leftnav-btn" onClick={()=>navigate('/friends')}>Friends</button>
        <button id="leftnav-btn" onClick={()=>navigate('/profile')}>Profile</button>
       
      </div>
      <div id="leftnav-avatar" ><Avatar /> @delphino</div>
    </div>
    </>
  )
}
export default LeftSideNav;