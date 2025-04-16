import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeStyle = "underline text-black";

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white sticky top-0 z-50 shadow-md">
        {/* Left: Logo + Categories */}
        <div className="flex items-center gap-6">
          <Link to="/category/all" className="font-bold text-lg">
            Shopi
          </Link>

          <ul className="hidden md:flex items-center gap-4">
            {["all", "clothes", "electronics", "furnitures", "toys"].map(
              (category) => (
                <li key={category}>
                  <NavLink
                    to={`/category/${category}`}
                    className={({ isActive }) =>
                      isActive ? activeStyle : "text-gray-600"
                    }
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Right: User links (hidden on mobile) */}
        <ul className="hidden md:flex items-center gap-4 text-sm">
          <li className="text-gray-500">userintheapp@test.com</li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                isActive ? activeStyle : "text-gray-400"
              }
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) =>
                isActive ? activeStyle : "text-gray-400"
              }
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? activeStyle : "text-gray-400"
              }
            >
              Cart
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isMobileMenuOpen ? (
            <FaTimes size={24} className="cursor-pointer" />
          ) : (
            <FaBars size={24} className="cursor-pointer" />
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-white shadow-lg p-4`}
      >
        <ul className="space-y-4 text-sm">
          {["all", "clothes", "electronics", "furnitures", "toys"].map(
            (category) => (
              <li key={category}>
                <NavLink
                  to={`/category/${category}`}
                  className={({ isActive }) =>
                    isActive ? activeStyle : "text-gray-600"
                  }
                  onClick={toggleMenu}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              </li>
            )
          )}
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                isActive ? activeStyle : "text-gray-600"
              }
              onClick={toggleMenu}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) =>
                isActive ? activeStyle : "text-gray-600"
              }
              onClick={toggleMenu}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? activeStyle : "text-gray-600"
              }
              onClick={toggleMenu}
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
