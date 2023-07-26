import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ConfirmationPage from './pages/ConfirmationPage'
import MainPage from './pages/MainPage'
import { useSelector } from 'react-redux'
import {Amplify} from 'aws-amplify';
import {region,userPoolId,clientId} from './utilis.js'
import RecoveryPage from './pages/RecoveryPage'

Amplify.configure({
  "AWS_PROJECT_REGION": region,
  "aws_cognito_region": region,
  "aws_user_pools_id": userPoolId,
  "aws_user_pools_web_client_id": clientId,
  "oauth": {},
  Auth: {
    region: region,
    userPoolId: userPoolId,
    userPoolWebClientId: clientId,
  }});

function App() {
const user = useSelector(state => state.user.userID);
  return (
    <>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={user? <MainPage/> :<SignUpPage />}/>
      <Route path="/signin" element={<LoginPage />}/>
      <Route path='/confirm' element={<ConfirmationPage />} />
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/reset-password" element={<RecoveryPage />}/>
    
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
