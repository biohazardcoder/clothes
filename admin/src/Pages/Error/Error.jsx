import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <section className="h-screen bg-wishlistBg">
      <div className="container h-full flex items-center justify-center flex-col gap-5">
        <h1 className="text-8xl text-accent font-bold">
          <span className="text-mainText">4</span>0
          <span className="text-mainText">4</span>
        </h1>
        <p className="font-bold text-accent">Bu siz qidirayotgan veb-sahifa emas</p>
        <Link
          to={"/"}
          className="bg-accent hover:bg-highlight transition-colors duration-300 py-2 px-5 font-bold text-mainBg rounded-3xl"
        >
          Ortga qaytish
        </Link>
      </div>
    </section>
  );
};
