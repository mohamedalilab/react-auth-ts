import useAuthStore, { selectIsAuthenticated } from "@/store/useAuthStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function RequireGuest(): React.JSX.Element {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  console.log("guset---------");
  // If user is logged in → redirect away
  if (isAuthenticated) return <Navigate to="/" replace />;

  // Otherwise allow access (login / register pages)
  return <Outlet />;
}

export default RequireGuest;
