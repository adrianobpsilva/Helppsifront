import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // 🔥 NOVO: verifica também localStorage
  const usuarioSalvo = localStorage.getItem("user");

  if (!user && !usuarioSalvo) {
    return <Navigate to="/login" />;
  }

  return children;
}