import './WelcomePage.css'
import Welcome from '../assets/Welcome.jpg'

export default function WelcomePage() {
  return (
    <>
    <div id='Welcome-Page'>
    <div id='welcomepage-header'><header>WELCOME TO OUR PLATFORM</header></div>
    <div id='welcomepage-img'><img src={Welcome} alt="welcome" /> </div>
    </div>
    </>
  )
}
