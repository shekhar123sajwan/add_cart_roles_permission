import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../utils/userSlice";
import { clearUserTokens } from "../helpers/storage";

const NavbarProfileIcons = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    clearUserTokens();
    window.location.href = "/user/login";
  };
  return user ? (
    <li className="nav-item dropdown">
      <Link
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        to="#"
        className="nav-link dropdown-toggle d-inline-block "
        id="navbarDropdownMenuLink"
      >
        <img
          src={user.image}
          alt="Profile"
          width="30"
          className="rounded-circle"
          height="30"
        />
      </Link>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li>
          <Link className="dropdown-item" to={"/user/profile"}>
            Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to={"#"} onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </li>
  ) : (
    <li className="nav-item">
      <Link className="nav-link" to={"/user/login"}>
        Login
      </Link>
    </li>
  );
};

export default NavbarProfileIcons;
