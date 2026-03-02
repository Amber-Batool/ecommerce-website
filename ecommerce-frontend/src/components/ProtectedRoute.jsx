import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem(role === "admin" ? "adminToken" : "userToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}