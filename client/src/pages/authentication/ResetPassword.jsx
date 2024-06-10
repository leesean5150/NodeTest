import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "./Signup.css";
import env_config from "../../api/env_config";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(env_config.env + "auth/reset-password/" + token, {
        password,
      })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
