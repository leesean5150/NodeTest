import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/authentication/Signup.jsx";
import Login from "./pages/authentication/Login.jsx";
import ForgotPassword from "./pages/authentication/ForgotPassword.jsx";
import ResetPassword from "./pages/authentication/ResetPassword.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
