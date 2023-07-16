## Using Cognito
### Install AWS Amplify
yarn add aws-amplify
## go to aws account configure your cognito
## update vite config js
```.js 
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
},
})
```
## configure amplify in app.js
```.jsx
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import { useSelector } from 'react-redux'
import {Amplify} from 'aws-amplify';

import {region,userPoolId,clientId} from './utilis.js'

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
      <Route path="/signup" element={<SignUpPage />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

```
  ## this is login page
  ```.jsx
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Auth } from 'aws-amplify'; // Import the Auth module from Amplify
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    
    try {
      const user = await Auth.signIn(email, password);
      const { signInUserSession } = user;
      const token = signInUserSession.accessToken.jwtToken;
      const userID = user.attributes.sub; // Assuming user ID is stored in 'sub' attribute

      // Dispatch the login action with the obtained token and user data
      dispatch(login({ token, email, userID }));

      navigate('/');
    } catch (error) {
      alert(error.message);
      console.log('Error:', error);
    }
  };

  return (
    <div className="LoginPage">
      <h1>Sign into your account</h1>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} />
        <p>{errors.email?.message}</p>
        <input type="password" placeholder="Password" {...register('password')} />
        <p>{errors.password?.message}</p>
        <button type="submit">Login</button>
      </form>
      <p>
        New here? <a href="/signup">SignUp</a>
      </p>
    </div>
  );
}

export default LoginPage;


  ```
***check other confirmation page and signup page in the code***