import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
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
      const userID = user.attributes.sub;
      const name = user.attributes.name;  

      // Dispatch the login action with the obtained token and user data
      dispatch(login({ token, email, userID, name}));

      navigate('/');
    } catch (error) {
      alert(error.message);
      console.log('Error:', error);
    }
  };

  return (
    <div className="LoginPage">
       <div className="recover-info">
       <img src={Logo} alt="" />
      </div>
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
