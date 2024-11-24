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
    <section className="min-h-screen flex items-center justify-center bg-mainBg p-4">
      <div className="w-full max-w-4xl bg-sidebarBg rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative">
            <img
              src={RegisterImg}
              alt="Register"
              className="w-full h-48 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-2xl font-bold text-mainText mb-2">Register</h1>
            <p className="text-sidebarText mb-6">Create your account here:</p>
            {message && (
              <p
                className={`text-center text-sm mb-4 ${
                  message === "Registration successful!"
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
                  Phone Number
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-hoverBg bg-productBg text-sidebarText text-sm">
                    +998
                  </span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-2 focus:ring-highlight focus:border-highlight text-sm border-hoverBg bg-productBg text-mainText"
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
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="block w-full px-3 py-2 border border-hoverBg rounded-md focus:ring-2 focus:ring-highlight focus:border-highlight text-sm bg-productBg text-mainText"
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
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="block w-full px-3 py-2 border border-hoverBg rounded-md focus:ring-2 focus:ring-highlight focus:border-highlight text-sm bg-productBg text-mainText"
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
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className="block w-full px-3 py-2 border border-hoverBg rounded-md focus:ring-2 focus:ring-highlight focus:border-highlight text-sm bg-productBg text-mainText pr-10"
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
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="block w-full px-3 py-2 border border-hoverBg rounded-md focus:ring-2 focus:ring-highlight focus:border-highlight text-sm bg-productBg text-mainText"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-highlightText bg-highlight hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight transition-colors duration-200"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-sidebarText">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-highlight hover:text-accent"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
