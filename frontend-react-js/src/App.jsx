import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
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
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
