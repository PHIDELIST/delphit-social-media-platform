import Logo from "../assets/Logo.png"
import './LeftSideNav.css'
 function LeftSideNav() {
  return (
    <>
    <div id="leftSideNav"> 
      <img id="logo" src={Logo} alt="logo" />
    </div>
    </>
  )
}
export default LeftSideNav;