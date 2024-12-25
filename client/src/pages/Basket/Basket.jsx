import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import { MdDelete } from "react-icons/md";
import AutoFocus from "../../middlewares/AutoFocus";
import { toast, ToastContainer } from "react-toastify";

export const Shoplist = () => {
  const { data } = useSelector((state) => state.user);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("shopList")) || []
  );

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateOrderData = () => ({
    customer: data?._id,
    products: cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
      title: item.title,
    })),
    status: "Kutilmoqda",
    totalPrice: calculateTotal(),
  });


  useEffect(() => {
    localStorage.setItem("shopList", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveItem = (index) => {
    const isConfirmed = window.confirm(
      "Haqiqatan ham bu elementni olib tashlamoqchimisiz?"
    );
    if (isConfirmed) {
      const updatedCart = cart.filter((_, idx) => idx !== index);
      setCart(updatedCart);
    }
  };

  const handleQuantityChange = (index, action) => {
    const updatedCart = cart.map((item, idx) => {
      if (idx === index) {
        const newQuantity =
          action === "increment" ? item.quantity + 1 : item.quantity - 1;
        return {
          ...item,
          quantity: Math.max(newQuantity, 1),
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleCheckout = async () => {
    try {
      const response = await Axios.post("/order/new-order", updateOrderData());
      localStorage.removeItem("shopList");
      setCart([]);
      window.location.reload()
    } catch (err) {
      toast.error(`Buyurtma amalga oshirilmadi:  ${err.response?.data.message}`);
    }
  };


  if (cart.length === 0) {
    return (
      <div className="text-center text-primary py-20  flex items-center justify-center">
        Sizning savatingiz bo'sh!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-container text-primary py-4 px-4">
      <ToastContainer closeOnClick limit={2} position="top-left" theme={"dark"} icon pauseOnHover={false} />
      <AutoFocus />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Sizning savatingiz</h1>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="py-4">Mahsulot</th>
                <th>Narxi</th>
                <th>Miqdori</th>
                <th>Qarzdorlik</th>
                <th>Harakat</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-4 flex items-center gap-4">
                    <img
                      src={item.img || ""}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span>{item.title}</span>
                  </td>
                  <td>{item.price} so'm</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(index, "decrement")}
                        className="px-2 py-1 bg-gray-700 text-primary rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(index, "increment")}
                        className="px-2 py-1 bg-gray-700 text-primary rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()} so'm</td>
                  <td>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className=" bg-highlight p-2 rounded-md hover:bg-accent transition-colors duration-300 hover:text-secontary "
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleCheckout}
            className="text-primary bg-highlight  border border-primary hover:bg-primary hover:text-container transition-colors duration-300 px-4 py-2 "
          >
            Buyurtma berish
          </button>
          <Link
            to="/"
            className="text-primary  bg-[crimson] border border-primary px-4 py-2  hover:bg-primary hover:text-container transition-colors duration-300"
          >
            Orqaga qaytish
          </Link>
          <div className=" text-gray-300">
            Jami: <strong>{calculateTotal().toLocaleString()}</strong> so'm
          </div>
        </div>
      </div>
    </div>
  );
};