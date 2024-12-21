import React, { useEffect, useState } from "react";
import { Container } from "../../components/shared/Container/Container";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import { getProductSuccess } from "../../toolkit/ProductsSlicer";
import { Link } from "react-router-dom";

function Bestseller() {
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );
    const [randomProducts, setRandomProducts] = useState([]);
    const { data } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    console.log(data);

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
            const shuffled = [...data].sort(() => 0.5 - Math.random());
            setRandomProducts(shuffled.slice(0, 4));
        }
    }, [data]);

    const isProductInWishlist = (productId) =>
        wishlist.some((product) => product._id === productId);

    return (
        <section className="py-20 bg-container" id="watches">
            <Container>
                <h1 className="mb-10 text-[white] text-3xl">Bizning Bestsellerimiz</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {randomProducts.map((product) => (
                        <div key={product._id} className="text-[white] bg-[#333] rounded-lg p-4">
                            <figure className="w-full relative overflow-hidden">
                                <img
                                    className="w-full object-cover  object-top h-[300px]"
                                    src={product.photos[0]}
                                    alt={product.title}
                                />
                                {
                                    product.sale > 0 ? (<div className="absolute py-1 px-2 text-sm bg-meteor text-[white] top-5 left-5">
                                        Chegirma
                                    </div>
                                    ) :
                                        ("")
                                }
                                {
                                    product.stock <= 0 ? (
                                        <div className={`absolute py-1 px-2 text-sm bg-[crimson] text-[white] ${product.sale > 0 ? "top-14" : "top-5"} left-5`}>
                                            Sotuvda yo'q
                                        </div>
                                    ) :
                                        ("")
                                }
                                <button
                                    className="absolute top-5 bg-[white] text-highlight right-5 flex items-center gap-2 p-2 rounded-md transition-colors duration-300"
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
                            <h3 className="font-semibold pt-3">{product.title}</h3>
                            <h2>
                                Narxi:{" "}
                                {new Intl.NumberFormat("uz-UZ").format(product.price)} so'm
                                {product.sale > 0 ? (
                                    <span className="pl-1 line-through text-secontary">{product.sale}</span>

                                ) : ("")}
                            </h2>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default Bestseller;
