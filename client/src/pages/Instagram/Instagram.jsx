import React from "react";
import { FaInstagram } from "react-icons/fa";

const Instagram = () => {
    return (
        <div className="flex flex-col items-center justify-center text-mainText p-6">
            <h1 className="text-3xl font-semibold  mb-8">Our Instagram Stories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1lbiUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
                    "https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?cs=srgb&dl=pexels-harsh-kushwaha-804217-1689731.jpg&fm=jpg",
                    "https://i.pinimg.com/originals/39/07/c4/3907c41616c1bdec6a582573b1915b86.jpg",
                    "https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?cs=srgb&dl=pexels-arnie-chou-304906-1557843.jpg&fm=jpg",
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
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <a href="#" className="flex items-center">
                                <span className="text-white border-2 rounded-full p-2 text-xl font-bold">
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