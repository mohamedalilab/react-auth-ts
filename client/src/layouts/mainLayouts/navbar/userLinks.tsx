import React from "react";
import NavBarLink from "./navBarLink";

interface UserLinksProps {
  isAdmin: boolean;
  handleLogout: () => void;
  logoutLoading: boolean;
}

export function UserLinks({
  isAdmin,
  handleLogout,
  logoutLoading,
}: UserLinksProps): React.JSX.Element {
  return (
    <>
      <NavBarLink to="/dashboard">Dashboard</NavBarLink>
      <NavBarLink to="/posts">Posts</NavBarLink>
      {isAdmin && <NavBarLink to="/admin">Admin</NavBarLink>}
      <NavBarLink to="/profile">Profile</NavBarLink>
      <button
        onClick={handleLogout}
        className="
        navbar-logout font-bold text-sm text-white bg-logout hover:brightness-90
        md:py-2 md:px-4 px-2 py-1 rounded-xl"
        disabled={logoutLoading}
      >
        Logout
      </button>
    </>
  );
}

export default UserLinks;
