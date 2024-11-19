import React, { useEffect, useState } from 'react'
import { Container } from '../../components/shared/Container/Container';
import { FaEye, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Axios from "../../Axios"
import { getProductSuccess } from '../../toolkit/ProductsSlicer';
import { Link } from 'react-router-dom';

function Bestseller() {
    const [wishlist, setWishlist] = useState([]);
    const { data } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem("saved_products")) || [];
        setWishlist(savedProducts);
    }, []);

    useEffect(() => {
        Axios.get("product")
            .then((response) => {
                dispatch(getProductSuccess(response.data.data));
                console.log(response);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, [dispatch]);

    const isProductInWishlist = (productId) => wishlist.includes(productId);

    const toggleWishlist = (productId) => {
        let updatedWishlist = [...wishlist];
        if (updatedWishlist.includes(productId)) {
            updatedWishlist = updatedWishlist.filter((id) => id !== productId);
        } else {
            updatedWishlist.push(productId);
        }
        setWishlist(updatedWishlist);
        localStorage.setItem("saved_products", JSON.stringify(updatedWishlist));
    };
    return (
        <section className="py-20 bg-container" id="watches">
            <Container>
                <h1 className="mb-10 text-white text-3xl">Our Bestseller</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.map((product, index) => (
                        <div key={index} className="text-white bg-[#333] rounded-lg p-4">
                            <figure className="w-full relative overflow-hidden">
                                <img
                                    className="w-full object-cover object-top h-[300px]"
                                    src={product.photos[0]}
                                    alt={product.title}
                                />

                                <button
                                    className={`absolute top-5 bg-white text-[#9A836C] right-5 flex items-center gap-2 p-2 rounded-md transition-colors duration-300 `}
                                    onClick={() => toggleWishlist(product.id)}
                                >
                                    {isProductInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                                </button>

                                <Link to={`detail/${product.id}`}>
                                    <button

                                        className="text-[#9A836C] absolute top-16 right-5 flex items-center gap-2 p-2 rounded-md bg-white transition-colors duration-300 "
                                    >
                                        <FaEye />
                                    </button>
                                </Link>
                            </figure>
                            <h3 className="font-semibold ">
                                {product.title}
                            </h3>
                            <h2 >
                                Narxi:  {new Intl.NumberFormat('uz-UZ').format(product.price)} so'm
                            </h2>

                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Bestseller