import React, { useEffect } from "react";
import { Container } from "../../components/shared/Container/Container";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import Axios from "../../Axios";
import { useDispatch, useSelector } from "react-redux";
import { getProductSuccess } from "../../toolkit/ProductsSlicer";
import { FaCartPlus, FaShopify } from "react-icons/fa";

export const Home = () => {
  const userData = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  console.log(userData.data);
  console.log(data);

  useEffect(() => {
    Axios.get("product")
      .then((response) => {
        getProductSuccess(response.data.data);
        dispatch(getProductSuccess(response.data.data));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch]);


  return (
    <>
      <section className="h-screen hero_bg">
        <Container className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-12">
          <div className="flex flex-col h-full justify-center items-start gap-10">
            <h1 className="text-white text-6xl font-bold">
              Discover Luxurious Watches You Will Love.
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
        <Container >
          <h1 className="mb-10 text-white text-3xl">New Watches</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((product, index) => (
              <div key={index} className="text-white bg-[#333] rounded-lg p-4">
                <figure className="w-full overflow-hidden">
                  <img
                    className="w-full object-cover object-top h-[500px]"
                    src={product.photos[0]}
                    alt={product.title}
                  />
                </figure>
                <h3>
                  <span className="font-semibold font-serif">Title:</span> {product.title}
                </h3>
                <h2>
                  <span className="font-serif">Price:</span> ${product.price}
                </h2>
                <h2>
                  <span className="font-serif">Color:</span> {product.colors}
                </h2>
                <h2>
                  <span className="font-serif">Stock:</span> {product.stock}
                </h2>
                <div className="flex items-center gap-4` justify-center mt-2">
                  <button
                    className="text-[#9A836C] flex items-center gap-2 p-2 rounded-md bg-white transition-colors duration-300 hover:bg-[#9A836C] hover:text-white"
                    onClick={() => {
                      let savedProducts = JSON.parse(localStorage.getItem("saved_products"));

                      if (!savedProducts) {
                        savedProducts = [];
                      }

                      if (!savedProducts.includes(product.id)) {
                        savedProducts.push(product.id);
                        localStorage.setItem("saved_products", JSON.stringify(savedProducts));
                      }
                      console.log("Initial savedProducts:", savedProducts);
                      console.log("Updated savedProducts:", JSON.parse(localStorage.getItem("saved_products")));

                    }}
                  >
                    <FaCartPlus />
                    Save to Wishlist
                  </button>

                  <button
                    className="text-[#9A836C] flex items-center gap-2 py-2 px-3 rounded-md bg-white transition-colors duration-300 hover:bg-[#9A836C] hover:text-white"
                  >
                    <FaShopify />
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>


        </Container>
      </section>

      <section>
      </section>
    </>
  );
};
