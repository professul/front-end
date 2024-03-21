import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./components/Layout/MainNavigation";

function Layout() {
  return (
    <div>
      <MainHeader />
      <Outlet />
    </div>
  );
}

export default Layout;
