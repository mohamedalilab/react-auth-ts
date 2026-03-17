import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../types";
import useAuthStore, {
  selectIsAuthenticated,
  selectUserData,
} from "@/store/useAuthStore";

interface RequireAuthProps {
  requiredRole?: UserRole;
}

const RequireAuth = ({ requiredRole }: RequireAuthProps) => {
  console.log("require auth ------");

  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore(selectUserData);
  // Not logged in → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // Everything is fine → render nested route
  return <Outlet />;
};

export default RequireAuth;
