// components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, setAuthModalOpen, setAuthView } = useContext(AuthContext);

  if (!user) {
    setAuthView("login");
    setAuthModalOpen(true);
    return <Navigate to="/" replace />;
  }

  return children;
}