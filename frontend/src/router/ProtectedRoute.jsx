import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;
  if (!role === "admin") return <Navigate to="/unauthorize" />;

  return children;
};

export default ProtectedRoute;
