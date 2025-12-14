import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // redirect based on role
    if (role === "visitor") return <Navigate to="/visitor/login" />;
    if (role === "resident") return <Navigate to="/residents/login" />;
    if (role === "guard") return <Navigate to="/guard/login" />;
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
