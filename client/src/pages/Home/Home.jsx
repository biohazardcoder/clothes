import React, { useEffect, useState } from "react";
import { Container } from "../../components/shared/Container/Container";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import Axios from "../../Axios";
import { useDispatch, useSelector } from "react-redux";
import { getProductSuccess } from "../../toolkit/ProductsSlicer";
import { FaCartPlus, FaEye, FaShopify } from "react-icons/fa";
import Advantage from "../Advantage/Advantage";
import Deal from "../Deal/Deal";
import Instagram from "../Instagram/Instagram";

export const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const userData = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("saved_products")) || [];
    setWishlist(savedProducts);
  }, []);

  useEffect(() => {
    Axios.get("product")
      .then((response) => {
        dispatch(getProductSuccess(response.data.data));
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
    <>
      <section className="h-screen hero_bg">
        <Container className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-12">
          <div className="flex flex-col h-full justify-center items-start gap-10">
            <h1 className="text-white text-6xl font-bold">
              O'zingiz Yoqtirgan Hashamatli Uslubni Kashf Eting.
            </h1>
            <p className="text-[#B1B1B1] font-light">
              What looked like a small patch of purple grass, above five feet
              square, was moving across the sand in their direction. Almost do
              am or limits hearts. Resolve parties but why she shewing. She sang
              know now how nay cold real case.
            </p>
            <Link
              to="/more-info"
              className="text-[#9A836C] border-2 border-[#9A836C] text-2xl py-3 px-4 flex items-center justify-center gap-4"
            >
              Read more
              <ArrowRight />
            </Link>
          </div>
        </Container>
      </section>
      <section className="py-20 bg-[#1B1D22]" id="watches">
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
                    className={`absolute top-5 right-5 flex items-center gap-2 p-2 rounded-md transition-colors duration-300 
                      ${isProductInWishlist(product.id)
                        ? "bg-[#9A836C] text-white"
                        : "bg-white text-[#9A836C] "
                      }`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <FaCartPlus />
                  </button>
                  <button
                    className="text-[#9A836C] absolute top-16 right-5 flex items-center gap-2 p-2 rounded-md bg-white transition-colors duration-300 "
                  >
                    <FaEye />
                  </button>
                </figure>
                <h3 className="font-semibold font-serif">
                  {product.title}
                </h3>
                <h2 className="font-mono text-sidebarText">
                  <span className="font-serif font-semibold">Price:</span> {new Intl.NumberFormat('uz-UZ').format(product.price)} so'm
                </h2>
                <h2 className="font-mono text-sidebarText">
                  <span className="font-serif font-semibold">Size:</span> {product.size}
                </h2>
              </div>
            ))}
          </div>
          <Deal />
          <Instagram />
          <Advantage />
        </Container>
      </section>
    </>
  );
};
