import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import { useLoadAuthConfig } from "../hooks/useLoadAuthConfig";

const UserLayout = () => {
  useLoadAuthConfig();
  return (
    <div className="main user-layout">
      <Header />
      <div className="container mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
