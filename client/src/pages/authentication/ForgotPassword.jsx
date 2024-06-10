import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import env_config from "../../api/env_config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(env_config.env + "auth/forgot-password", {
        email,
      })
      .then((response) => {
        if (response.data.status) {
          alert("check your email for the password reset link");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type="submit">Send reset link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
