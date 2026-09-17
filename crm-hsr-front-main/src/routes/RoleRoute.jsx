import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.setor)) return <Navigate to="/unauthorized" replace />;

  return children;
}
