import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useLoadAuthConfig } from "../hooks/useLoadAuthConfig";

const Main = () => {
  useLoadAuthConfig();
  return (
    <div className="main">
      <Header />
      <div className="container mt-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
