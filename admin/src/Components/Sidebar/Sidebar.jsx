import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="md:hidden p-4 bg-sidebarBg flex items-center justify-between shadow-lg">
        <h1 className="text-lg font-semibold text-sidebarText">Menyular</h1>
        <button onClick={toggleMenu} className="text-3xl text-sidebarText">
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-sidebarBg h-full shadow-lg transform md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out fixed md:static top-0 left-0 w-64 z-50 md:w-[310px]`}
      >
        <ul className="h-full flex flex-col">
          {[
            { path: "/", label: "Shaxsiy panel" },
            { path: "/admins", label: "Adminlar" },
            { path: "/products", label: "Mahsulotlar" },
          ].map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center text-lg font-semibold p-4 transition-colors duration-300 ${isActive
                    ? "bg-highlight text-highlightText"
                    : "text-sidebarText hover:bg-hoverBg hover:text-hoverText"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};
