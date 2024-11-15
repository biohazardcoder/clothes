import React, { useState } from "react";
import { Section } from "../../Components/Section/Section";
import Axios from "../../Axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const CreateAdmin = () => {
  const [createAdminData, setcreateAdminData] = useState({
    phoneNumber: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcreateAdminData((adminData) => ({ ...adminData, [name]: value }));
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/admin/create", {
        phoneNumber: createAdminData.phoneNumber,
        password: createAdminData.password,
        firstName: createAdminData.firstName,
        lastName: createAdminData.lastName,
      });
      toast.success("Admin Added!")
      setTimeout(() => {
        window.location.href = "/admins";
      }, 1000);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const FormInput = "border border-gray-300 rounded-md p-2 w-full"
  return (
    <Section className="bg-dashboardBg flex flex-col justify-center items-center h-screen p-4">
      <ToastContainer />
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md bg-mainBg p-8 rounded-lg shadow-lg flex flex-col gap-6"
      >
        <h1 className="text-center text-2xl font-bold text-mainText">Yangi Admin yaratish:</h1>
        <input
          type="text"
          name="firstName"
          className={FormInput}
          onChange={handleInputChange}
          placeholder="Ismi"
        />
        <input
          type="text"
          name="lastName"
          className={FormInput}
          onChange={handleInputChange}
          placeholder="Familiyasi"
        />
        <input
          type="number"
          name="phoneNumber"
          className={FormInput}
          onChange={handleInputChange}
          placeholder="Telefon raqami"
        />
        <input
          type="text"
          name="password"
          className={FormInput}
          onChange={handleInputChange}
          placeholder="Paroli"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-highlight transition-colors duration-300 w-full text-xl py-2 rounded-md text-white"
        >
          Yaratish
        </button>
      </form>
    </Section>
  );
};
