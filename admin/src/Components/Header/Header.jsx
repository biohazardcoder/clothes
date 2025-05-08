import React from "react";
import { FaShopify } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="bg-sidebarBg h-[60px] shadow-lg flex items-center">
      <div className="w-full max-w-6xl flex items-center justify-between px-4 text-sidebarText">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-lg cursor-default font-semibold text-accent tracking-wide hover:text-secontary transition-colors duration-300 ease-in-out">
            Naundshop
          </h1>
        </div>
      </div>
    </header>
  );
};
