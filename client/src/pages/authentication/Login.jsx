import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";
import env_config from "../../api/env_config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("client");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(env_config.env + "auth/login/" + loginType, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.status) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-container" style={{}}>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2 style={{}}>Login</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button
            style={{
              background: loginType === "client" ? "#3498db" : "#D9D9D9",
              borderRadius: 20,
              display: "display: inline-block",
              justifyContent: "center",
              margin: 10,
            }}
            onClick={(e) => {
              e.preventDefault();
              setLoginType("client");
            }}
          >
            Client
          </button>
          <button
            style={{
              background: loginType === "admin" ? "#3498db" : "#D9D9D9",
              borderRadius: 20,
              display: "display: inline-block",
              justifyContent: "center",
              margin: 10,
            }}
            onClick={(e) => {
              e.preventDefault();
              setLoginType("admin");
            }}
          >
            Admin
          </button>
          <button
            style={{
              background: loginType === "trainer" ? "#3498db" : "#D9D9D9",
              borderRadius: 20,
              display: "display: inline-block",
              justifyContent: "center",
              margin: 10,
            }}
            onClick={(e) => {
              e.preventDefault();
              setLoginType("trainer");
            }}
          >
            Trainer
          </button>
        </div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
        <br></br>
        <br></br>
        <Link to="/forgotPassword">Forgot password?</Link>
        <p>
          Don't have an account?<Link to="/signup"> Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
