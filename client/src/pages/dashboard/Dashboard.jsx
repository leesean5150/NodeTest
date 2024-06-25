import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import env_config from "../../api/env_config";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [role, setRole] = useState("");

  useEffect(() => {
    axios.get(env_config.env + "auth/verify").then((response) => {
      if (!response.data.status) {
        navigate("/login");
      }
      setRole(response.data.role);
    });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .get(env_config.env + "auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(role);

  return (
    <>
      Dashboard
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            margin: 20,
            background: role === "admin" ? "#8055DC" : "#D9D9D9",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Admin
        </div>
        <div
          style={{
            width: 120,
            height: 120,
            margin: 20,
            background: role === "user" ? "#8055DC" : "#D9D9D9",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          User
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
