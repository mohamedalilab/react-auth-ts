import React from "react";
import { Outlet } from "react-router-dom";
import { refreshAuth } from "@/services/authServices";
import useAuthStore, {
  selectIsAuthenticated,
  selectLogout,
} from "@/store/useAuthStore";

function PresistLogin(): React.JSX.Element {
  console.log("presist ----");
  /**
   * Read persist flag from localStorage.
   * Convert to boolean properly because "false" (string)
   * is truthy in JavaScript.
   */
  const presist = localStorage.getItem("react-auth-presist") === "true";

  /**
   * Select only required state/actions from Zustand.
   * This prevents unnecessary re-renders.
   */
  const logout = useAuthStore(selectLogout);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  /**
   * Page loading state.
   * Starts as true to prevent UI flicker
   * before auth check completes.
   */
  const [pageLoading, setPageLoading] = React.useState<boolean>(true);

  /**
   * Prevent double execution in React 18 StrictMode.
   * Ensures refresh runs only once on mount.
   */
  const effectRan = React.useRef(false);

  /**
   * Calls refresh endpoint to get new access token.
   * If refresh fails → logout user.
   */
  const handleRefreshAuth = async () => {
    setPageLoading(true);

    try {
      await refreshAuth();
    } catch (error) {
      // If refresh token expired or invalid → logout
      logout();
      throw error;
    } finally {
      setPageLoading(false);
    }
  };

  /**
   * On component mount:
   * - If user is NOT authenticated
   * - AND persist is enabled
   * → attempt refresh
   *
   * Runs only once.
   */
  React.useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    if (!isAuthenticated && presist) {
      handleRefreshAuth();
    } else {
      setPageLoading(false);
    }
  }, []);

  /**
   * While checking/refreshing auth → show loading.
   * Otherwise render protected routes.
   */
  return pageLoading ? <div>Loading...</div> : <Outlet />;
}

export default PresistLogin;
