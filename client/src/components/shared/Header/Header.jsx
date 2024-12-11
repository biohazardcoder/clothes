import { List, ShoppingCart, User } from "@phosphor-icons/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "../Container/Container";
import { Logo } from "../../../images/images";
import Button from "../../ui/Button";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiUser, FiX } from "react-icons/fi";

export const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const { isAuth } = useSelector((state) => state.user);

  const LiData = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "Contact", url: "/contact" },
    { title: "About", url: "/about" },
  ];

  const toggleNav = () => {
    setNavActive((prev) => !prev);
  };

  return (
    <header className={`h-[70px] sticky top-0 z-40 bg-meteor shadow-md`}>
      <Container className="h-full flex justify-between items-center px-4 md:px-8">
        <Link
          to="/"
          className="text-2xl flex items-center gap-2 font-serif font-semibold text-[#fff]"
        >
          <img src={Logo} alt="" className="w-[25px] object-cover" />
          ELDORADO
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 text-[#EAEAEA] font-medium">
            {LiData.map((li, index) => (
              <li key={index}>
                <Link
                  to={li.url}
                  className="hover:text-[#fff] transition-colors duration-200"
                >
                  {li.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {!isAuth ? (
            <Button
              className="flex items-center gap-2 py-2 px-4 font-medium   text-[#FFFFFF] rounded transition-colors duration-200"
              to="/login"
            >
              <User weight="bold" className="w-5 h-5" />
              <span>Login</span>
            </Button>
          ) : (
            <div className="flex gap-3 items-center">
              <Link to="/wishlist">
                <IoIosHeartEmpty className="text-[#fff] text-2xl" />
              </Link>
              <Link to="/shoplist">
                <ShoppingCart className="text-[#fff] text-2xl" />
              </Link>
              <Link to="/profile">
                <FiUser className="text-[#fff] text-2xl" />
              </Link>
            </div>
          )}

          <button
            onClick={toggleNav}
            className="text-[#EAEAEA] text-2xl md:hidden ml-2"
            aria-label="Toggle navigation"
          >
            {navActive ? <FiX /> : <List />}
          </button>
        </div>
      </Container>

      <div
        className={`
          fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity duration-300
          ${navActive ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={toggleNav}
      />

      <nav
        className={`
          fixed top-[70px] left-0 h-full w-64 bg-[#161B22] md:hidden
          transform transition-transform duration-300 ease-in-out shadow-xl
          ${navActive ? "-translate-x-0" : "-translate-x-full"}
        `}
      >
        <ul className="flex flex-col gap-4 p-6 text-[#9CA3AF]">
          {LiData.map((li, index) => (
            <li key={index}>
              <Link
                to={li.url}
                className="hover:text-[#FF7F50] transition-colors duration-200 block py-2"
                onClick={() => setNavActive(false)}
              >
                {li.title}
              </Link>
            </li>
          ))}
          {isAuth && (
            <>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-[#FF7F50] transition-colors duration-200 block py-2"
                  onClick={() => setNavActive(false)}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/shoplist"
                  className="hover:text-[#FF7F50] transition-colors duration-200 block py-2"
                  onClick={() => setNavActive(false)}
                >
                  Shopping Cart
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
