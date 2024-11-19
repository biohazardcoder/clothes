import React from "react";
import { Header } from "../components/shared/Header/Header";
import { Outlet, useLocation } from "react-router-dom";

export const RootLayout = () => {
  const location = useLocation();
  const isWishlistPage = location.pathname === "/wishlist";

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
