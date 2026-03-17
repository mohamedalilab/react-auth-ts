import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

function NavBarLink(props: NavLinkProps): React.JSX.Element {
  return (
    <NavLink
      className="text-light md:text-lg font-bold hover:text-theme max-md:hover:ml-5"
      {...props}
    />
  );
}

export default NavBarLink;
