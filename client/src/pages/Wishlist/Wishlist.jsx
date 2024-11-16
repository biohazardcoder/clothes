import React, { useEffect, useState } from 'react';
import Axios from '../../Axios';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaShopify } from 'react-icons/fa';

function Wishlist() {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const savedProductIds = JSON.parse(localStorage.getItem("saved_products")) || [];

        if (savedProductIds.length > 0) {
            Promise.all(savedProductIds.map(id => Axios.get(`product/${id}`)))
                .then((responses) => {
                    const data = responses.map(response => response.data);
                    const products = data.map(data => data.data);
                    setWishlistProducts(products);
                })
                .catch((error) => {
                    console.error("Error fetching wishlist products:", error);
                });
        }
    }, []);

    const handleSelectProduct = (productId) => {
        setSelectedProducts(prevSelected =>
            prevSelected.includes(productId)
                ? prevSelected.filter(id => id !== productId)
                : [...prevSelected, productId]
        );
    };

    const handleDeleteSelected = () => {
        const updatedWishlist = wishlistProducts.filter(
            product => !selectedProducts.includes(product._id)
        );
        const updatedProductIds = updatedWishlist.map(product => product._id);

        setWishlistProducts(updatedWishlist);
        setSelectedProducts([]);
        localStorage.setItem("saved_products", JSON.stringify(updatedProductIds));
    };

    return (
        <div className="w-full min-h-screen bg-[#1B1D22] text-white p-4">
            <h1 className="text-3xl mb-6">Wishlist</h1>
            {wishlistProducts.length > 0 ? (
                <div className="overflow-auto">
                    <table className="min-w-full bg-[#333] text-white border-separate border-spacing-0 rounded-lg">
                        <thead>
                            <tr className="bg-[#444] text-xs sm:text-sm">
                                <th className="p-2 border border-gray-600">Select</th>
                                <th className="p-2 border border-gray-600">Image</th>
                                <th className="p-2 border border-gray-600">Title</th>
                                <th className="p-2 border border-gray-600">Price</th>
                                <th className="p-2 border border-gray-600">Quantity</th>
                                <th className="p-2 border border-gray-600">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlistProducts.map((product) => (
                                <tr key={product._id} className="bg-[#1B1D22] text-center text-xs sm:text-sm">
                                    <td className="p-2 border-b border-gray-600">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 accent-green-500"
                                            checked={selectedProducts.includes(product._id)}
                                            onChange={() => handleSelectProduct(product._id)}
                                        />
                                    </td>
                                    <td className="p-2 border-b border-gray-600">
                                        <img
                                            src={product.photos}
                                            alt={product.title}
                                            className="h-12 w-12 object-cover sm:h-16 sm:w-16 mx-auto rounded-lg"
                                        />
                                    </td>
                                    <td className="p-2 border-b border-gray-600">{product.title}</td>
                                    <td className="p-2 border-b border-gray-600">${product.price}</td>
                                    <td className="p-2 border-b border-gray-600">- 0 +</td>
                                    <td className="p-2 border-b border-gray-600">${product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center mt-10">Your wishlist is empty.</p>
            )}
            <div className="mt-4 flex items-center justify-between">
                <Link to="/">
                    <button className="py-2 px-4 bg-[#141414] text-xs sm:text-sm rounded-md hover:bg-[#000] transition-colors duration-300">
                        Back to Home
                    </button>
                </Link>
                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center gap-1 py-2 px-4 bg-red-500 text-xs sm:text-sm rounded-md hover:bg-red-700 transition-colors duration-300"
                        onClick={handleDeleteSelected}
                        disabled={selectedProducts.length === 0}
                    >
                        <MdDelete />
                        Delete from Wishlist
                    </button>
                    <button className="flex items-center gap-1 py-2 px-4 sm:py1 sm:px2 bg-green-500 text-xs sm:text-sm rounded-md hover:bg-green-700 transition-colors duration-300">
                        <FaShopify />
                        Buy selected Products
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
