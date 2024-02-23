import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;