import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaHeartBroken } from "react-icons/fa";
import Advantage from "../Advantage/Advantage";
import { Footer } from "../../components/shared/Footer/Footer";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter((item) => item._id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen h-screen bg-container text-[white] px-4">
                <div className="container flex h-full justify-center items-center mx-auto">
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-center text-[white] text-4xl">
                            Your wishlist is empty. 😔
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-container text-[white] py-10 ">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlist.map((item) => (
                        <div key={item._id} className="bg-[#333] relative rounded-lg p-4 text-[white]">
                            <img
                                src={item.photos[0]}
                                alt={item.title}
                                className="w-full object-cover object-top h-[200px] rounded-md"
                            />
                            <h3 className="font-semibold mt-2">{item.title}</h3>
                            <h2>
                                Narxi:{" "}
                                {new Intl.NumberFormat("uz-UZ").format(item.price)} so'm
                            </h2>
                            <button
                                onClick={() => removeFromWishlist(item._id)}
                                className="absolute top-5 hover:bg-highlight hover:text-[white] bg-[white] text-highlight right-5 flex items-center gap-2 p-2 rounded-md transition-colors duration-300">
                                <FaHeartBroken />
                            </button>
                            <Link to={`/detail/${item._id}`}>
                                <button className="text-[#9A836C] hover:bg-highlight hover:text-[white] absolute top-16 right-5 flex items-center gap-2 p-2 rounded-md bg-[white] transition-colors duration-300">
                                    <FaEye />
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Advantage />
            <Footer />
        </div>
    );
}
