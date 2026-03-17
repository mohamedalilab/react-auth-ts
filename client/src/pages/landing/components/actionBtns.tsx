import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import useAuthStore, { selectIsAuthenticated } from "@/store/useAuthStore";

function ActionBtns(): React.JSX.Element {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  return (
    <div
      className={clsx("action-btns flex-center", !isAuthenticated && "gap-4")}
    >
      {!isAuthenticated ? (
        <>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </>
      ) : (
        <Link to="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
      )}
    </div>
  );
}

export default ActionBtns;
