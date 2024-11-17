import React, { useEffect, useState, useRef } from "react";
import { Container } from "../Container/Container";
import { Link, useNavigate } from "react-router-dom";
import { List, ShoppingBag, X } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import "./Header.css";
import { FaRegUserCircle, FaShopify } from "react-icons/fa";
import Cookies from "js-cookie";

export const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const navigate = useNavigate();
  const navMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const { data } = useSelector((state) => state.user);
  console.log(data);

  const id = data._id
  console.log(id);

  const navData = [
    {
      url: "/",
      text: "Home",
    },
    {
      url: "/shop",
      text: "Shop",
    },
    {
      url: "/about",
      text: "About",
    },
    {
      url: "/services",
      text: "Services",
    },
    {
      url: "/contact",
      text: "Contact",
    },
  ];

  const { isAuth } = useSelector((state) => state.user);

  document.body.style.overflowY = navActive ? "hidden" : "auto";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setNavActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout")) return;
    Cookies.remove("token");
    window.location.href = "/";
  };
  return (
    <header className="h-[80px] z-10 bg-mainBg fixed w-full left-0 top-0">
      <Container className={"h-full flex justify-between items-center"}>
        <Link
          to={"/"}
          className="flex gap-2 text-mainText items-center font-semibold text-xl"
        >
          <FaShopify />
          Kiyim do'koni
        </Link>
        <div className="flex gap-8 items-center">
          <ul
            ref={navMenuRef}
            className={`flex gap-5 font-semibold text-white nav-menu ${navActive ? "active" : ""
              }`}
          >
            {navData.map((item, index) => (
              <li key={index}>
                <Link to={item.url}>{item.text}</Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-white">
            <Link to={"/wishlist"} className="font-bold">
              <ShoppingBag size={25} />
            </Link>
            <div className="handleNav">
              {navActive ? (
                <X
                  ref={toggleButtonRef}
                  size={25}
                  onClick={() => setNavActive(false)}
                />
              ) : (
                <List
                  ref={toggleButtonRef}
                  size={25}
                  onClick={(e) => {
                    e.stopPropagation();
                    setNavActive(true);
                  }}
                />
              )}
            </div>
            <div>
              <ul className="flex items-center gap-4">
                {!isAuth ? (
                  <Link to="/login">
                    <li className="py-2 px-4 bg-accent hover:bg-highlight transition-colors duration-300 text-black rounded-md font-semibold">
                      Login
                    </li>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/d/${id}`}
                      className="text-white flex items-center gap-2"
                    >
                      <FaRegUserCircle size={25} />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-2 px-4 bg-accent hover:bg-highlight transition-colors duration-300 text-black rounded-md font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
