import React from "react";
import { FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-meteor text-[#fff] py-6 px-4 font-sans text-sm">
      <div className="container mx-auto flex flex-wrap justify-between gap-6">
        <div className="flex flex-col w-full sm:w-auto">
          <h2 className="text-xl font-bold mb-2">Eldorado</h2>
          <p className="flex items-center gap-2 mb-1">
            <FaPhoneAlt />
            (704) 555-0127
          </p>
          <p className="flex items-center gap-2 mb-1">
            <FaEnvelope />
            eldoradouz@example.com
          </p>
          <p className="flex items-center gap-2">
            <FaLocationArrow />
            3891 Ranchview Dr. Richardson, California 62639
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <h4 className="text-lg font-semibold mb-3">Information</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">My Account</li>
            <li className="hover:underline cursor-pointer">Login</li>
            <li className="hover:underline cursor-pointer">My Cart</li>
            <li className="hover:underline cursor-pointer">My Wishlist</li>
            <li className="hover:underline cursor-pointer">Checkout</li>
          </ul>
        </div>

        <div className="w-full sm:w-auto">
          <h4 className="text-lg font-semibold mb-3">Service</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Delivery Information</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        <div className="w-full sm:w-auto">
          <h4 className="text-lg font-semibold mb-3">Subscribe</h4>
          <p className="mb-3">
            Enter your email below to be the first to know about new collections and product launches.
          </p>
          <form className="flex flex-col sm:flex-row ">
            <input
              type="email"
              placeholder="Your Email"
              className="p-2  text-[#000] flex-grow border-none outline-none"
              maxLength={30}
            />
            <button
              type="submit"
              className="p-3 bg-highlight text-[#fff] "
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 border-t p-4 border-gray-700 pt-4 flex flex-col sm:flex-row sm:justify-between items-center text-xs text-center sm:text-left">
        <p className="mb-2 sm:mb-0">©2025 Eldorado All Rights are reserved</p>
        <div className="flex flex-wrap justify-center sm:justify-start space-x-3 mb-2 sm:mb-0">
          <span className="cursor-pointer hover:underline">Visa</span>
          <span className="cursor-pointer hover:underline">MasterCard</span>
          <span className="cursor-pointer hover:underline">Google Pay</span>
          <span className="cursor-pointer hover:underline">PayPal</span>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start space-x-3">
          <span className="cursor-pointer hover:underline">Facebook</span>
          <span className="cursor-pointer hover:underline">Instagram</span>
          <span className="cursor-pointer hover:underline">Twitter</span>
        </div>
      </div>
    </footer>
  );
};
