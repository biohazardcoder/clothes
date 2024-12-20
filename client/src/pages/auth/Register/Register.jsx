import React, { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Axios from "../../../Axios";
import { RegisterImg } from "../../../images/images";
import { Link } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    address: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", formData);
      const { data } = await Axios.post("client/register", formData);
      console.log("Response data:", data);
      setMessage("Registration successful!");
      window.location.href = "/login";
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Registration failed";
      setMessage(errorMsg);
    }
  };

  return (
    <section className="flex items-center justify-center bg-container p-4">
      <div className="w-full max-w-4xl bg-[white]  shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative">
            <img
              src={RegisterImg}
              alt="Register"
              className="w-full h-48 md:h-full object-cover object-top"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-2xl font-bold text-mainText mb-2">Ro'yxatdan o'tish</h1>
            {message && (
              <p
                className={`text-center text-sm mb-4 ${message === "Registration successful!"
                  ? "text-success"
                  : "text-error"
                  }`}
              >
                {message}
              </p>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-mainText mb-1"
                >
                  Telefon raqamingiz
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-hoverBg bg-productBg text-sidebarText text-sm">
                    +998
                  </span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="flex-1 min-w-0 block w-full border px-3 py-2 rounded-none rounded-r-md  text-sm border-hoverBg"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-mainText mb-1"
                >
                  Ismingiz
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="block w-full px-3 py-2 border border-hoverBg rounded-md  text-sm"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-mainText mb-1"
                >
                  Familiyangiz
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="block w-full px-3 py-2 border border-hoverBg rounded-md  text-sm"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-mainText mb-1"
                >
                  Parolingiz
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className="block w-full px-3 py-2 border border-hoverBg rounded-md  text-sm pr-10"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-mainText mb-1"
                >
                  Manzilingiz
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="block w-full px-3 py-2 border border-hoverBg rounded-md  text-sm"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-highlight hover:bg-accent  transition-colors duration-300"
              >
                Yuborish
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-sidebarText">
              Hisobingiz bormi?{" "}
              <Link
                to="/login"
                className="font-medium underline text-highlight hover:text-accent"
              >
                Bu yerdan Kiring!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
