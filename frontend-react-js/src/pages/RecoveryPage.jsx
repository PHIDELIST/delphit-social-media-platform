import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import "./RecoveryPage.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.png'

export default function RecoveryPage() {
  const [errors, setErrors] = useState("");
  const [formState, setFormState] = useState("send_code");
 const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    username: yup.string().email("Invalid email").required("Email is required"),
    code: yup.string().required("Code is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    passwordAgain: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onsubmit_send_code = async (data) => {
    setErrors("");
    try {
      await Auth.forgotPassword(data.username);
      setFormState("confirm_code");
    } catch (err) {
      setErrors(err.message);
    }
  };

  const onsubmit_confirm_code = async (data) => {
    setErrors("");
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      setFormState("success");
      reset();
    } catch (err) {
      setErrors(err.message);
    }
  };

  const send_code = () => {
    return (
      <form className="recover_form" onSubmit={handleSubmit(onsubmit_send_code)}>
        <h2>Recover your Password</h2>
        <div className="fields">
          <div className="field text_field username">
            <label>Email</label>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <input type="text" {...field} />
              )}
            />
          </div>
        </div>
        {errors.username && <div className="errors">{errors.username.message}</div>}
        <div className="submit">
          <button type="submit" disabled={isSubmitting}>Send Recovery Code</button>
        </div>
      </form>
    );
  };

  const confirm_code = () => {
    return (
      <form className="recover_form" onSubmit={handleSubmit(onsubmit_confirm_code)}>
        <h2>Recover your Password</h2>
        <div className="fields">
          <div className="field text_field code">
            <label>Reset Password Code</label>
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <input type="text" {...field} />
              )}
            />
          </div>
          <div className="field text_field password">
            <label>New Password</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <input type="password" {...field} />
              )}
            />
          </div>
          <div className="field text_field password_again">
            <label>New Password Again</label>
            <Controller
              name="passwordAgain"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <input type="password" {...field} />
              )}
            />
          </div>
        </div>
        {errors.code && <div className="errors">{errors.code.message}</div>}
        {errors.password && <div className="errors">{errors.password.message}</div>}
        {errors.passwordAgain && <div className="errors">{errors.passwordAgain.message}</div>}
        <div className="submit">
          <button type="submit" disabled={isSubmitting}>Reset Password</button>
        </div>
      </form>
    );
  };

  const success = () => {
    return (
      <form>
        <p>Your password has been successfully reset!</p>
        <button onClick={navigate("/signin")}>Proceed to Sign In</button>
      </form>
    );
  };

  let form;
  if (formState === "send_code") {
    form = send_code();
  } else if (formState === "confirm_code") {
    form = confirm_code();
  } else if (formState === "success") {
    form = success();
  }

  return (
    <article className="recover-article">
      <div className="recover-wrapper">
      <div className="recover-info">
        <img className="logo" src={Logo} alt="" />
      </div>
        {form}</div>
    </article>
  );
}
