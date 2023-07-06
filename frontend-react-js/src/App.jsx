import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LeftSideNav from './components/LeftSideNav'
import Homepage from './pages/Homepage'
import RightSideNav from './components/RightSideNav'
import WelcomePage from './pages/WelcomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'



function App() {

  return (
    <>
    <BrowserRouter>
    <div id='landing-page'>
    <div id='NavLeft'><LeftSideNav/></div>
    <div id='pages'>
    <Routes>
      <Route path="/" element={<WelcomePage />}/>
      <Route path="/home" element={<Homepage/>}/>
      <Route path="/signin" element={<LoginPage />}/>
      <Route path="/signup" element={<SignUpPage />}/>
    </Routes>
    </div>
    <div id='NavRight'><RightSideNav /></div>
    </div>
    </BrowserRouter>
    
    </>
  )
}

export default App
