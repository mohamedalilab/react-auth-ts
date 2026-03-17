import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";

function MainLayouts(): React.JSX.Element {
  console.log("navbar ---------")
  return (
    <div className="app min-h-dvh flex flex-col">
      <Navbar />
      <main className="main-content flex-1 pt-25 pb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayouts;
