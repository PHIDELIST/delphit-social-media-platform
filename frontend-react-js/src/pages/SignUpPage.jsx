import { useForm } from "react-hook-form";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { url } from "../utilis";
function SignUpPage() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...requestData } = data;
      if (requestData.password !== confirmPassword) {
        alert("Passwords must match");
        return;
      }
      const response = await axios.post(`${url}/auth/register`
        ,
        requestData
      );
      if (response.data.error) {
        alert("User already exists"); 
      } else {
        alert("Registration successful");
        navigate("/signin");
      }
    } catch (error) {
      alert("error occured while registering");
      
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-page-container">
        <h1>Sign Up</h1>
        <form className="signupform" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
          <input type="text" placeholder="Email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
          <input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <a href="/signin">Login</a>
          </p>
        </form>
        
      </div>
    </div>
  );
}

export default SignUpPage;
