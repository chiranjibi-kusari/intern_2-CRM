//import React from "react";
//import { Navigate } from "react-router-dom";

//const ProtectedRoute = ({ children }) => {
//  const token = localStorage.getItem("token");
//  const role = localStorage.getItem("role");

//  if (!token) return <Navigate to="/" />;
//  if (!role === "admin") return <Navigate to="/unauthorize" />;

//  return children;
//};

//export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
