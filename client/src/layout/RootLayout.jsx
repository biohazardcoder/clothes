import React from "react";
import { Header } from "../components/shared/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/shared/Footer/Footer";

export const RootLayout = () => {
  const location = useLocation();
  const isWishlistPage = location.pathname === "/wishlist";

  return (
    <>
      {!isWishlistPage && <Header />}
      <Outlet />
      {!isWishlistPage && <Footer />}
    </>
  );
};
