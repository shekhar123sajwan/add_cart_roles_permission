import React, { memo } from "react";
import { Link } from "react-router-dom";
import NavbarProfileIcons from "./NavbarProfileIcons";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={"/"}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/permissions"}>
              Permissions
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/products"}>
              Products
            </Link>
          </li>
          <NavbarProfileIcons />
        </ul>
      </div>
    </nav>
  );
};

export default memo(Navbar);
