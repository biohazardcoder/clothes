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
        <>
            <section className="h-screen flex justify-center items-center bg-wishlistBg">
                <div className="flex items-center h-3/4 bg-red-200 justify-center">
                    <div className="bg-red-400 h-full ">
                        <img src={LoginImg} alt="Rasm" className="h-full" />
                    </div>
                    <div className="h-full flex items-center bg-white justify-center">
                        <div className="">
                            <form
                                className="flex flex-col h-full gap-5 w-full md:w-[500px]  text-black p-10 "
                                onSubmit={handleLogin}
                            >

                                <div>
                                    <h1 className="font-semibold text-2xl">Welcome!</h1>
                                    <p className="text-sm">Please login here:</p>
                                </div>
                                <div>
                                    Phone Number:
                                    <div className="flex h justify-between border border-black rounded-xl   overflow-hidden">
                                        <button
                                            type="button"
                                            className="w-1/6 text-[12px] md:text-lg bg-transparent text-white border-r bg-wishlistBg border-white"
                                        >
                                            +998
                                        </button>
                                        <input
                                            type="text"
                                            className="p-2 outline-none w-5/6 bg-transparent text-black"
                                            placeholder="Телефонный номер"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    Password:
                                    <div className="relative" >
                                        <input
                                            type={isPasswordVisible ? "text" : "password"}
                                            className="border border-black p-2 w-full rounded-xl bg-transparent text-black"
                                            placeholder="Введите пароль"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
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
                                <p>
                                    If you don't have an account: {" "}
                                    <Link to={"/register"} className="text-[dodgerblue] underline">Register</Link> {" "}
                                    here
                                </p>
                                <button
                                    type="submit"
                                    className="bg-hoverBg font-semibold py-3 text-white rounded-xl"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
