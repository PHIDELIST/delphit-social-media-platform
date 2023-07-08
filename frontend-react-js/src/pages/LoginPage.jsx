import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8081/auth/login', data);
      console.log(response.data); 
      navigate('/home');
    } catch (error) {
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
    </div>
  );
}

export default LoginPage;
