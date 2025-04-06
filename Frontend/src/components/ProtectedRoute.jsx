// src/components/ProtectedRoute.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" />; // not logged in
  if (role && user.role !== role) return <Navigate to="/" />; // role doesn't match

  return children;
};

export default ProtectedRoute;
