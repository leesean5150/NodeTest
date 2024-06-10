import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import env_config from "../../api/env_config";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(env_config.env + "auth/verify").then((response) => {
      if (!response.data.status) {
        navigate("/login");
      }
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
  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
