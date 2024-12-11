import React from "react";
import { FaInstagram } from "react-icons/fa";
import FirstImg from "./firstImg.jfif"
import SecondImg from "./secondImg.jpg"
import ThirdImg from "./thirdImg.jpg"
import FourthImg from "./fourthImg.jpg"
const Instagram = () => {
    return (
        <div className="flex flex-col min-h-[50vh] items-center justify-center bg-container text-[white] p-6">
            <h1 className="text-3xl font-semibold  mb-8">Our Instagram Stories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    FirstImg,
                    SecondImg,
                    ThirdImg,
                    FourthImg
                ].map((image, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg"
                    >
                        <img
                            src={image}
                            alt={`Instagram Story ${index + 1}`}
                            className="w-full h-[50vh] object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center  bg-opacity-30">
                            <a href="#" className="flex items-center">
                                <span className="text-primary border-primary border-2 rounded-full p-2 text-xl font-bold">
                                    <FaInstagram />
                                </span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instagram;