import React, { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavbarProfileIcons from "./NavbarProfileIcons";
import Cart from "./Cart";

const Navbar = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartRef = useRef(null);

  // Show cart items on hover
  const handleMouseEnter = () => {
    setIsCartVisible(true);
  };
  useEffect(() => {
    const handleClickOutsideCart = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideCart);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    };
  }, []);

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
          <li className="nav-item cart">
            <button
              className="nav-link"
              to={"/cart"}
              onClick={handleMouseEnter}
            >
              Cart
            </button>
            {isCartVisible && (
              <div className="cart-menu-nav" ref={cartRef}>
                <Cart cartFor="navbar" />
              </div>
            )}
          </li>
          <NavbarProfileIcons />
        </ul>
      </div>
    </nav>
  );
};

export default memo(Navbar);
