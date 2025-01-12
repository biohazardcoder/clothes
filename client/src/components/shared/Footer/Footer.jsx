import React from "react";
import { FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";




export const Footer = () => {
  const { isAuth } = useSelector(state => state.user)

  const infoLinks = [
    { title: "Barcha mahsulotlar", url: "/shop" },
    isAuth
      ? { title: "Profil", url: "/profile" }
      : { title: "Kirish", url: "/login" }, ,
    { title: "Mening savatim", url: "/wishlist" },
    { title: "Mening istaklar ro'yxatim", url: isAuth ? "/shoplist" : "/login" },
  ];

  const serviceLinks = [
    { title: "Biz haqimizda", url: "/about" },
    { title: "Aloqa", url: "tel:+998500908088" },
  ];
  return (
    <footer className="bg-meteor text-[#fff] py-6 px-4 font-sans text-sm">
      <div className="container mx-auto flex flex-wrap justify-between gap-6">
        <div className="flex flex-col w-full sm:w-auto">
          <h2 className="text-xl font-bold mb-2">Naund</h2>
          <p className="flex items-center gap-2 mb-1">
            <FaPhoneAlt />
            +998 50 0908088
          </p>
          <p className="flex items-center gap-2 mb-1">
            <FaEnvelope />
            naundshop@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <FaLocationArrow />
            Namangan tumani, Xonobod 38
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <h4 className="text-lg font-semibold mb-3">Ma'lumotlar</h4>
          <ul className="space-y-2">
            {infoLinks.map((link, index) => (
              <li key={index} className="hover:underline cursor-pointer">
                <Link to={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full sm:w-auto">
          <h4 className="text-lg font-semibold mb-3">Xizmatlar</h4>
          <ul className="space-y-2">
            {serviceLinks.map((link, index) => (
              <li key={index} className="hover:underline cursor-pointer">
                <Link to={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full sm:w-auto">
          <h4 className="text-lg font-semibold mb-3">Obuna bo'ling</h4>
          <p className="mb-3">
            Quyida elektron pochta manzilingizni kiriting va yangi kolleksiyalar va mahsulot chiqishlari haqida birinchi bo'lib xabar toping.
          </p>
          <form className="flex flex-col sm:flex-row ">
            <input
              type="email"
              placeholder="Sizning emailingiz"
              className="p-2  text-[#000] flex-grow border-none outline-none"
              maxLength={30}
            />
            <button
              type="submit"
              className="p-3 bg-highlight text-[#fff] "
            >
              Yuborish
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 border-t p-4 border-gray-700 pt-4 flex flex-col sm:flex-row sm:justify-between items-center text-xs text-center sm:text-left">
        <p className="mb-2 sm:mb-0">©2025 NAUND Barcha huquqlar himoyalangan</p>
        <div className="flex flex-wrap justify-center sm:justify-start space-x-3 mb-2 sm:mb-0">
          <span className="cursor-pointer ">UzCard</span>
          <span className="cursor-pointer ">Humo</span>
          <span className="cursor-pointer ">Visa</span>
          <span className="cursor-pointer ">MasterCard</span>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start space-x-3">
          <a href="https://t.me/naundshop" className="cursor-pointer hover:underline">Telegram</a>
          <a href="https://www.instagram.com/naundshop" className="cursor-pointer hover:underline">Instagram</a>
          <a href="https://www.youtube.com/@naundshop" className="cursor-pointer hover:underline">YouTube</a>
        </div>
      </div>
    </footer>
  );
};
