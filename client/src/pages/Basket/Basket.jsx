import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import { MdDelete } from "react-icons/md";
import AutoFocus from "../../middlewares/AutoFocus";

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
      color: item.color, // Include color
      size: item.size,   // Include size
      title: item.title,
    })),
    status: "Pending",
    totalPrice: calculateTotal(),
  });


  useEffect(() => {
    localStorage.setItem("shopList", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveItem = (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this item?"
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
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Checkout failed:", err.response?.data || err.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center text-primary min-h-screen bg-zinc-900 flex items-center justify-center">
        Your basket is empty.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-container text-primary py-16 px-4">
      <AutoFocus />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Basket</h1>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="py-4">Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
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
                      className="text-red-500 hover:text-red-700"
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
            className="text-[#212121] bg-[#8D7966] hover:bg-transparent border border-[#8D7966] hover:text-[#8D7966] px-6 py-3 rounded-md transition-all"
          >
            Checkout
          </button>
          <Link
            to="/"
            className="text-[#8D7966] bg-transparent border border-[#8D7966] px-6 py-3 rounded-md hover:bg-[#8D7966] hover:text-[#212121] transition-all"
          >
            Continue Shopping
          </Link>
          <div className="text-lg font-bold text-gray-300">
            Sub Total: {calculateTotal().toLocaleString()} so'm
          </div>
        </div>
      </div>
    </div>
  );
};