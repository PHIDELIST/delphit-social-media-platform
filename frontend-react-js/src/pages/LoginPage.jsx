import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { url } from '../utilis';
import axios from 'axios';
import { login } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
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
   axios.post(`${url}/auth/login`, data)
      // console.log(response.data); 
        .then(({data}) => {
          console.log(data);
          if(data.token){
            dispatch(login({token: data.token, email: data.email,user:data.user,userID:data.userID}))
            navigate('/');
          }
        })
     .catch((error) => {
      alert(error.response.data.message)
      console.log('Error:', error);
    
    });
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
