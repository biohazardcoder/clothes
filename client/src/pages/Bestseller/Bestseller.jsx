import React, { useEffect, useState } from "react";
import { Container } from "../../components/shared/Container/Container";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import { getProductSuccess } from "../../toolkit/ProductsSlicer";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Bestseller() {
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );
    const [loading, setLoading] = useState(false);
    const [randomProducts, setRandomProducts] = useState([]);
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.products);

    useEffect(() => {
        setLoading(true);
        Axios.get("/product")
            .then((response) => {
                dispatch(getProductSuccess(response.data.data));
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch]);

    useEffect(() => {
        if (data.length > 0) {
            const shuffled = [...data].sort(() => 0.5 - Math.random());
            setRandomProducts(shuffled.slice(0, 4));
        }
    }, [data]);

    const toggleWishlist = (product) => {
        const isExists = wishlist.find((item) => item._id === product._id);
        const updatedWishlist = isExists
            ? wishlist.filter((item) => item._id !== product._id)
            : [...wishlist, product];

        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const isProductInWishlist = (productId) =>
        wishlist.some((product) => product._id === productId);

    if (loading) {
        return (
            <div className="flex items-center justify-center gap-2 py-10 text-lg text-[#fff]">
                <AiOutlineLoading3Quarters className="animate-spin font-semibold" />
                Kutilmoqda...
            </div>
        );
    }

    return (
        <section className="py-20 bg-container" id="watches">
            <Container>
                <h1 className="mb-10 text-[#fff] text-3xl">Bizning Bestsellerimiz</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {randomProducts.map((product) => (
                        <div key={product._id} className="text-[#fff] bg-[#333] rounded-lg p-4">
                            <figure className="w-full relative overflow-hidden">
                                <img
                                    className="w-full object-cover object-top h-[300px]"
                                    src={product.photos?.[0]}
                                    alt={product.title}
                                />
                                {product.sale > 0 && (
                                    <div className="absolute py-1 px-2 text-sm bg-meteor text-[#fff] top-5 left-5">
                                        Chegirma
                                    </div>
                                )}
                                {product.stock <= 0 && (
                                    <div className={`absolute py-1 px-2 text-sm bg-[crimson] text-[#fff] ${product.sale > 0 ? "top-14" : "top-5"} left-5`}>
                                        Sotuvda yo'q
                                    </div>
                                )}
                                <button
                                    className="absolute top-5 bg-white text-highlight right-5 flex items-center gap-2 p-2 rounded-md transition-colors duration-300"
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
                            <h3 className="font-semibold pt-3">{product.title}</h3>
                            <h2>
                                Narxi:{" "}
                                {new Intl.NumberFormat("uz-UZ").format(product.price)} so'm
                                {product.sale > 0 && (
                                    <span className="pl-1 line-through text-secontary">
                                        {new Intl.NumberFormat("uz-UZ").format(product.sale)} so'm
                                    </span>
                                )}
                            </h2>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default Bestseller;
