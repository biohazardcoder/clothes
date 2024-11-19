import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { Container } from "../../components/shared/Container/Container";
import { getProductSuccess } from "../../toolkit/ProductsSlicer";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";

// Skeleton Loader CSS (Tailwind does not support this out of the box)
const skeletonLoader = `
  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: 200px 0; }
  }
`;

export const Shop = () => {
    const { data } = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );
    const dispatch = useDispatch();

    useEffect(() => {
        Axios.get("product")
            .then((response) => {
                dispatch(getProductSuccess(response.data.data));
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, [dispatch]);

    useEffect(() => {
        if (data.length > 0) {
            setIsLoading(false);
        }
    }, [data]);

    const categories = ["All", ...new Set(data.map((product) => product.category))];

    const toggleWishlist = (product) => {
        const isExists = wishlist.find((item) => item._id === product._id);
        let updatedWishlist;
        if (isExists) {
            updatedWishlist = wishlist.filter((item) => item._id !== product._id);
        } else {
            updatedWishlist = [...wishlist, product];
        }
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const isProductInWishlist = (productId) =>
        wishlist.some((product) => product._id === productId);

    const filteredProducts = data.filter((product) => {
        const matchesCategory =
            selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-container">
            <Container className="min-h-screen py-20 px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`
                            p-3 w-full md:w-1/3 mb-4 md:mb-0 rounded-xl bg-container border border-secondary focus:ring-2 focus:ring-highlight focus:outline-none transition-shadow shadow-sm text-primary hover:shadow-lg
                            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                        disabled={isLoading}
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`
                            p-3 w-full md:w-1/4 mb-4 md:mb-0 rounded-xl bg-container border border-secondary text-primary focus:ring-2 focus:ring-highlight focus:outline-none transition-shadow shadow-sm hover:shadow-lg
                            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                        disabled={isLoading}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category} className="bg-container text-primary">
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Loading Skeleton */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array(8).fill().map((_, index) => (
                            <div key={index} className="bg-gray-200 animate-pulse rounded-lg overflow-hidden">
                                <div className="h-[300px] bg-gray-300 rounded-t-lg"></div>
                                <div className="p-4">
                                    <div className="h-6 bg-gray-300 mb-2 rounded"></div>
                                    <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.length ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="shadow-md rounded-lg overflow-hidden"
                                >
                                    <div className="text-white bg-[#333] rounded-lg p-4">
                                        <figure className="w-full relative overflow-hidden">
                                            <img
                                                className="w-full object-cover object-top h-[300px]"
                                                src={product.photos[0]}
                                                alt={product.title}
                                            />
                                            <button
                                                className="absolute top-5 bg-white text-[#9A836C] right-5 flex items-center gap-2 p-2 rounded-md transition-colors duration-300"
                                                onClick={() => toggleWishlist(product)}
                                            >
                                                {isProductInWishlist(product._id) ? <FaHeart /> : <FaRegHeart />}
                                            </button>
                                            <Link to={`/detail/${product._id}`}>
                                                <button className="text-[#9A836C] absolute top-16 right-5 flex items-center gap-2 p-2 rounded-md bg-white transition-colors duration-300">
                                                    <FaEye />
                                                </button>
                                            </Link>
                                        </figure>
                                        <h3 className="font-semibold mt-2">{product.title}</h3>
                                        <h2 className="mt-1 text-sm">
                                            Narxi:{" "}
                                            <span className="text-lg font-bold text-white">
                                                {new Intl.NumberFormat("uz-UZ").format(product.price)} so'm
                                            </span>
                                        </h2>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center">No products found.</p>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
};
