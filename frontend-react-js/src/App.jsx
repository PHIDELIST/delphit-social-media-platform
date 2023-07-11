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
import PostCreationPage from './pages/PostCreationPage'
import EditProfilePage from './pages/EditProfilePage'
import MainPage from './pages/MainPage'
import { useSelector } from 'react-redux'


function App() {
const user = useSelector(state => state.user.userID);
  return (
    <>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={user? <MainPage/> :<SignUpPage />}/>
      <Route path="/signin" element={<LoginPage />}/>
      <Route path="/signup" element={<SignUpPage />}/>
      {/* <Route path="/home" element={<Homepage/>}/>
      <Route path="/chats" element={<Chat />}></Route>
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="/notifications" element={<NotificationsPage />}></Route>
      <Route path="/friends" element ={<FriendsPage />}></Route> */}
      {/* <Route path='/createpost' element={<PostCreationPage />}></Route>
      <Route path='/editprofile' element={<EditProfilePage />}></Route> */}
    </Routes>
   
    </BrowserRouter>
    
    </>
  )
}

export default App
