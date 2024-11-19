import { List, ShoppingCart, User, X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "../Container/Container";
import { Logo } from "../../../images/images";
import Button from "../../ui/Button";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiUser } from "react-icons/fi";

export const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const headerStyle = {
    top: visible ? "0" : "-100px",
  };


  const LiData = [
    {
      title: "Home",
      url: "/"
    },
    {
      title: "Shop",
      url: "/shop"
    },
    {
      title: "Contact",
      url: "/contact"
    },
    {
      title: "About",
      url: "/about"
    },

  ]
  return (
    <>
      <header
        style={headerStyle}
        className={`h-[70px] z-40 fixed bg-meteor left-0 top-0 w-full`}
      >
        <Container className="h-full flex justify-between items-center">
          <Link className={`text-2xl flex items-center gap-2 font-serif font-semibold px-2 text-primary`}>
            <img src={Logo} alt="" className="w-[25px] object-cover object-center" />
            ELDORADO
          </Link>
          <div className="flex gap-5 items-center">
            <nav className={`flex items-center gap-12`}>
              <ul
                className={`md:flex hidden gap-5 font-medium nav_menu text-white ${navActive ? "active" : ""}`}
              >
                {
                  LiData?.map((li, index) => (
                    <li key={index}>
                      <Link to={li.url}>
                        {li.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </nav>
            <div className="flex items-center justify-center gap-4">
              {!isAuth ? (
                <Button
                  className=" flex items-center gap-2 p-2 font-semibold "
                  to="/login"
                >
                  <User weight="bold" />
                  <span>Login</span>
                </Button>
              ) : (
                <div className="flex gap-2 items-center">
                  <Link to="/wishlist">
                    <IoIosHeartEmpty className="text-highlight text-2xl" />
                  </Link>
                  <Link to="/shoplist">
                    <ShoppingCart className="text-highlight text-2xl" />
                  </Link>
                  <Link to="/profile">
                    <FiUser className="text-highlight text-2xl" />
                  </Link>
                </div>
              )}

            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
