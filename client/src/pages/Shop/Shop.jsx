import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { Container } from "../../components/shared/Container/Container";
import { getProductSuccess } from "../../toolkit/ProductsSlicer";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import { TbCategory } from "react-icons/tb";
import Advantage from "../Advantage/Advantage";
import { Footer } from "../../components/shared/Footer/Footer";
import AutoFocus from "../../middlewares/AutoFocus";
import { FiLayers } from "react-icons/fi";

export const Shop = () => {
    const { data } = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Barcha");
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        Axios.get("product")
            .then((response) => {
                dispatch(getProductSuccess(response.data.data));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            });
    }, [dispatch]);

    const categories = [
        {
            title: "Barcha",
            icon: <FiLayers />,
        },
        {
            title: "Erkaklar",
        },
        {
            title: "Ayollar",
        },
        {
            title: "Bolalar",
        },
        {
            title: "Aksessuarlar",
        },
    ];

    const toggleWishlist = (product) => {
        const isExists = wishlist.some((item) => item._id === product._id);
        const updatedWishlist = isExists
            ? wishlist.filter((item) => item._id !== product._id)
            : [...wishlist, product];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const isProductInWishlist = (productId) =>
        wishlist.some((product) => product._id === productId);

    const filteredProducts = data.filter((product) => {
        const matchesCategory =
            selectedCategory === "Barcha" ||
            (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-container">
            <AutoFocus />
            <Container className="min-h-screen py-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <input
                        type="text"
                        placeholder="Mahsulotlarni qidirish..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`
                            p-2 w-full md:w-1/4 mb-4 md:mb-0 rounded-xl bg-container border border-secondary focus:ring-2 focus:ring-highlight focus:outline-none transition-shadow shadow-sm text-primary hover:shadow-lg
                            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                        disabled={isLoading}
                    />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-1 text-3xl mb-4 md:mb-0 text-primary transition-shadow shadow-sm hover:shadow-lg"
                    >
                        <TbCategory />
                    </button>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-[black] bg-opacity-70 flex items-center justify-center z-50">
                        <div className="bg-[white] rounded-lg p-6 w-3/4 max-w-md">
                            <h3 className="text-lg font-semibold mb-4">Kategoriyani tanlang</h3>
                            <ul className="space-y-2">
                                {categories.map((category) => (
                                    <li
                                        key={category.title}
                                        className={`cursor-pointer p-2 rounded-md flex gap-2 items-center ${selectedCategory === category.title ? "bg-highlight text-primary" : ""}`}
                                        onClick={() => {
                                            setSelectedCategory(category.title);
                                            setIsModalOpen(false);
                                        }}
                                    >
                                        {category.icon && <span>{category.icon}</span>}
                                        {category.title} Kiyimi
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-4 w-full bg-accent text-[#fff] py-2 rounded-lg"
                            >
                                Yopish
                            </button>
                        </div>
                    </div>
                )}
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
                                    <div className="text-[white] bg-[#333] rounded-lg p-4">
                                        <figure className="w-full relative overflow-hidden">
                                            <img
                                                className="w-full object-cover object-top h-[300px]"
                                                src={product.photos[0]}
                                                alt={product.title}
                                            />
                                            <button
                                                className="absolute top-5 bg-[white] text-[#9A836C] right-5 flex items-center gap-2 p-2 rounded-md transition-colors duration-300"
                                                onClick={() => toggleWishlist(product)}
                                            >
                                                {isProductInWishlist(product._id) ? <FaHeart /> : <FaRegHeart />}
                                            </button>
                                            <Link to={`/detail/${product._id}`}>
                                                <button className="text-[#9A836C] absolute top-16 right-5 flex items-center gap-2 p-2 rounded-md bg-[white] transition-colors duration-300">
                                                    <FaEye />
                                                </button>
                                            </Link>
                                        </figure>
                                        <h3 className="font-semibold mt-2">{product.title}</h3>
                                        <h2 className="mt-1 text-sm">
                                            Narxi: <span className="text-lg font-bold text-[white]">{new Intl.NumberFormat("uz-UZ").format(product.price)} so'm</span>
                                        </h2>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center text-[white]">Hech qanday mahsulot topilmadi.</p>
                        )}
                    </div>
                )}
            </Container>
            <Advantage />
            <Footer />
        </div>
    );
};
