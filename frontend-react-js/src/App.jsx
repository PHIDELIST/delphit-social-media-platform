import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LeftSideNav from './components/LeftSideNav'
import Homepage from './pages/Homepage'
import RightSideNav from './components/RightSideNav'
import WelcomePage from './pages/WelcomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Chat from './components/Chat'
import NotificationsPage from './pages/NotificationsPage'
import FriendsPage from './pages/FriendsPage'




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
      <Route path="/chats" element={<Chat />}></Route>
      <Route path="/signin" element={<LoginPage />}/>
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="/notifications" element={<NotificationsPage />}></Route>
      <Route path="/friends" element ={<FriendsPage />}></Route>
    </Routes>
    </div>
    <div id='NavRight'><RightSideNav /></div>
    </div>
    </BrowserRouter>
    
    </>
  )
}

export default App
