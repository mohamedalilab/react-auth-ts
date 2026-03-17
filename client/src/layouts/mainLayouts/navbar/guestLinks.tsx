import React from "react";
import NavBarLink from "./navBarLink";

function GuestLinks(): React.JSX.Element {
  return (
    <>
      <NavBarLink to="/login">Login</NavBarLink>
      <NavBarLink to="/register">Register</NavBarLink>
    </>
  );
}

export default GuestLinks;
