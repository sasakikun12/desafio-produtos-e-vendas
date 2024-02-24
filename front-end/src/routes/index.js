import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login";
import Signup from "../views/Signup";
import Home from "../views/Home";
import Cookies from "js-cookie";

const AppRoutes = () => {
  const token = Cookies.get("token");
  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Home /> : <Navigate to={{ pathname: "/login" }} />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to={{ pathname: "/" }} /> : <Login />}
      />
      <Route
        path="/signup"
        element={token ? <Navigate to={{ pathname: "/" }} /> : <Signup />}
      />
    </Routes>
  );
};

export default AppRoutes;
