import React, { useState, useEffect } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Axios from "../../../Axios";
import { LoginImg } from "../../../images/images";
import { Link } from "react-router-dom";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuth) {
      window.location.href = "/";
    }
  }, [isAuth]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post("client/login", {
        password,
        phoneNumber: +phone,
      });

      Cookies.set("token", data.token, { secure: true, expires: 7 });
      window.location.href = "/";
    } catch (err) {
      console.log(err.response?.data.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-mainBg p-4">
      <div className="w-full max-w-md">
        <div className="bg-sidebarBg rounded-2xl shadow-xl overflow-hidden">
          <div
            className="h-48 bg-cover bg-center md:hidden"
            style={{ backgroundImage: `url(${LoginImg})` }}
          ></div>
          <div className="md:flex">
            <div className="hidden md:block md:w-1/2">
              <img
                src={LoginImg}
                alt="Login"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-8 md:w-1/2">
              <h2 className="text-2xl font-bold text-mainText mb-4">
                Welcome!
              </h2>
              <p className="text-sidebarText mb-6">
                Please login to your account
              </p>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-mainText mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-hoverBg bg-productBg text-sidebarText text-sm">
                      +998
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-highlight focus:border-highlight sm:text-sm border-hoverBg bg-productBg text-mainText"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-mainText mb-1"
                  >
                    Password
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-highlight focus:border-highlight sm:text-sm border-hoverBg bg-productBg text-mainText"
                      placeholder="Enter password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <EyeSlash size={20} className="text-sidebarText" />
                      ) : (
                        <Eye size={20} className="text-sidebarText" />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-highlightText bg-highlight hover:bg-mainBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="mt-4 text-center text-sm text-sidebarText">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-highlight hover:text-highlightText"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
