import React from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import ToggleBtn from "./navbar/toggleBtn";
import GuestLinks from "./navbar/guestLinks";
import UserLinks from "./navbar/userLinks";
import useAxiosMutation from "@/hooks/useAxiosMutation";
import useAuthStore, {
  selectAccessToken,
  selectIsAdmin,
  selectLogout,
} from "@/store/useAuthStore";
import { axiosPrivate } from "@/services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = useAuthStore(selectAccessToken);
  const logout = useAuthStore(selectLogout);
  const isAdmin = useAuthStore(selectIsAdmin);

  const [openNav, setOpenNav] = React.useState<boolean>(false);

  function handleOpenNav() {
    setOpenNav(!openNav);
  }

  const { execute, actionLoading: logoutLoading } = useAxiosMutation({
    axiosInstance: axiosPrivate,
  });

  const handleLogout = async () => {
    try {
      await execute({ method: "post", url: "/auth/logout" });
      logout();
      localStorage.removeItem("react-auth-presist")
    } finally {
      navigate("/");
    }
  };

  return (
    <nav className="w-full text-light bg-main-layout py-4 shadow-main fixed z-50">
      <div className="container flex-between px-8">
        <Link
          to="/"
          className="navbar-brand md:text-2xl text-xl font-bold text-light"
        >
          MyApp
        </Link>
        <ToggleBtn handleToggle={handleOpenNav} />
        <div
          className={clsx(
            "navbar-links bg-main-layout w-full flex flex-col items-start gap-4 p-5 absolute top-full left-0 z-1",
            !openNav && "max-md:-top-99",
            "md:gap-7 md:items-center md:flex-row md:static md:w-fit md:py-0"
          )}
        >
          {!accessToken ? (
            <GuestLinks />
          ) : (
            <UserLinks
              isAdmin={isAdmin}
              handleLogout={handleLogout}
              logoutLoading={logoutLoading}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
