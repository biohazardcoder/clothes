import React, { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Axios from "../../../Axios";
import { RegisterImg } from "../../../images/images";

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
            window.location.href = "/login"
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            const errorMsg = err.response?.data?.message || "Registration failed";
            setMessage(errorMsg);
        }
    };


    return (
        <section className="h-screen flex justify-center items-center bg-container">
            <div className="flex items-center h-3/4 bg-red-200 justify-center">
                <div className="bg-red-400 h-full">
                    <img src={RegisterImg} alt="Rasm" className="h-full" />
                </div>
                <div className="h-full flex items-center bg-white justify-center">
                    <div>
                        <form
                            className="flex flex-col h-full gap-3 w-full md:w-[500px] text-black p-10"
                            onSubmit={handleRegister}
                        >
                            <div>
                                <h1 className="font-semibold text-2xl">Register</h1>
                                <p className="text-sm">Create your account here:</p>
                                {message && (
                                    <p
                                        className={`text-center text-sm mt-3 ${message === "Registration successful!"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {message}
                                    </p>
                                )}
                            </div>

                            <div>
                                Phone Number:
                                <div className="flex justify-between border border-black rounded-xl overflow-hidden">
                                    <h1
                                        className="w-1/6 flex items-center justify-center bg-container text-[12px] md:text-lg  text-white border-r  border-white"
                                    >
                                        +998
                                    </h1>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="p-2 outline-none w-5/6 bg-transparent text-black"
                                        placeholder="Телефонный номер"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div>
                                First Name:
                                <input
                                    type="text"
                                    name="firstName"
                                    className="border border-black p-2 w-full rounded-xl bg-transparent text-black"
                                    placeholder="Имя"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                Last Name:
                                <input
                                    type="text"
                                    name="lastName"
                                    className="border border-black p-2 w-full rounded-xl bg-transparent text-black"
                                    placeholder="Фамилия"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                Password:
                                <div className="relative">
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        name="password"
                                        className="border border-black p-2 w-full rounded-xl bg-transparent text-black"
                                        placeholder="Введите пароль"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        {isPasswordVisible ? (
                                            <EyeSlash size={24} color="#000" />
                                        ) : (
                                            <Eye size={24} color="#000" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    className="border border-black p-2 w-full rounded-xl bg-transparent text-black"
                                    placeholder="Адрес"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>


                            <button
                                type="submit"
                                className="bg-meteor font-semibold py-3 text-white rounded-xl"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
