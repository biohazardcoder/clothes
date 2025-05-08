import useSWR from "swr";
import Axios from "../../Axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const fetcher = url => Axios.get(url).then(res => res.data?.data || []);

export const Orders = () => {
    const { data: orders = [], error, isLoading, mutate } = useSWR("order", fetcher);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredData = orders?.filter((order) => {
        const search = searchQuery.toLowerCase();
        return (
            order._id.toLowerCase().includes(search) ||
            order.customer?.firstName?.toLowerCase().includes(search) ||
            order.customer?.lastName?.toLowerCase().includes(search)
        );
    });
    
    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Haqiqatan ham buyurtma bekor qilishni xohlaysizmi!")) return;
        try {
            await Axios.delete(`/order/${orderId}`);
            toast.success("Buyurtma bekor qilindi", { autoClose: 1000 });
            mutate();
        } catch (error) {
            toast.error("Bekor qilishda xato", { autoClose: 2000 });
        }
    };

    const handleOrder = async (orderId) => {
        if (!window.confirm("Haqiqatan ham buyurtma yo'lga chiqdimi")) return;
        try {
            await Axios.put(`/order/${orderId}`);
            toast.success("Buyurtma yo'lda!", { autoClose: 1000 });
            mutate();
        } catch (error) {
            toast.error("Xatolik yuz berdi", { autoClose: 2000 });
        }
    };

    const handleSuccess = async (orderId) => {
        if (!window.confirm("Haqiqatan ham buyurtma yetkazib berildimi")) return;
        try {
            await Axios.put(`/order/success/${orderId}`);
            toast.success("Buyurtma yetkazib berildi", { autoClose: 1000 });
            mutate();
        } catch (error) {
            toast.error("Xatolik yuz berdi", { autoClose: 2000 });
        }
    };

    if (isLoading) return <p className="bg-wishlistBg w-full h-screen text-white flex items-center justify-center">
        <BiLoaderAlt className="animate-spin text-2xl text-white"/>
    </p>;

    if (error) return <p className="text-red-500 text-center text-xl">Xato: {error.message}</p>;

    return (
        <div className="p-4 sm:p-8 bg-wishlistBg h-screen overflow-y-auto">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl sm:text-3xl text-mainText">
                Buyurtmalar [ {filteredData.length} ]
                </h1>
                <input
                type="text"
                placeholder="Qidirish (ID, ism, familiya)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-1/3 px-2 py-1 border border-gray-300 rounded-md outline-none"
            />
            </div>

            {filteredData.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[...filteredData].reverse().map((order) => (
                        <li key={order._id} className="bg-primary p-4 shadow-sm relative border">
                            <ul className="mt-2 space-y-2 text-sm">
                                {order.products?.map(({ productId, quantity, title, color, size }) => (
                                    <div key={productId?._id} className="flex items-center justify-between p-4">
                                        <img
                                            src={productId?.photos?.[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW1QfJp-qyNLzfZB2Eie3smAwK2aA5if1KVoxO7QI7PgGti3dLRVvbZiNTQ4rRF72HOEo&usqp=CAU"}
                                            alt={productId?.title}
                                            className="w-16 h-16 object-cover rounded-md border border-highlight"
                                        />
                                        <div className="flex-1 mx-2">
                                            <h3 className="text-lg font-semibold text-[#000]">{title}</h3>
                                            <div className="text-sm text-gray-400">
                                                <span className="block">O'lchami: <strong className="text-[#000]">{size}</strong></span>
                                                <span className="block">Narxi: <span className="text-[#000]">{productId?.price?.toLocaleString()} so'm</span></span>
                                                <span className="flex items-center gap-2">Rangi: <span style={{ backgroundColor: color }} className="text-[#000] py-2 px-10 border shadow-md"></span></span>
                                                <span className="block">Miqdori: <span className="text-[#000]">{quantity} dona</span></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>

                            <div className="space-y-1 mt-2 text-sm text-secontary">
                                <p>Buyurtma ID: <span className="font-semibold text-[#000]">{order._id}</span></p>
                                <p>Ism: <span className="font-semibold text-[#000]">{order.customer.firstName} {order.customer.lastName}</span></p>
                                <p>Manzil: <span className="font-semibold text-[#000]">{order.customer.address}</span></p>
                                <p>Telefon: <span className="font-semibold text-[#000]">+998 {order.customer.phoneNumber}</span></p>
                                <p>Kuni: <span className="font-semibold text-[#000]">{order.orderDate.slice(0, 10)}</span></p>
                                <p>Jami: <span className="font-semibold text-[#000]">{order.totalPrice.toLocaleString()} so'm</span></p>
                            </div>

                            {order.status === "Kutilmoqda" && (
                                <button onClick={() => handleOrder(order._id)} className="w-full h-[36px] bg-yellow-500 text-primary mt-2">
                                    Yo'lda
                                </button>
                            )}
                            {order.status === "Yo'lda" && (
                                <button onClick={() => handleSuccess(order._id)} className="w-full h-[36px] bg-success text-primary mt-2">
                                    Yetkazim berildi
                                </button>
                            )}
                            {(order.status === "Kutilmoqda" || order.status === "Yo'lda") && (
                                <button onClick={() => handleCancelOrder(order._id)} className="w-full h-[36px] bg-highlight text-primary mt-2">
                                    Bekor qilish
                                </button>
                            )}

                            <div className="absolute top-1 left-1">
                                <p className={`text-sm text-primary py-2 px-3 ${
                                    order.status === "Yetkazib berilgan" ? "bg-green-600"
                                    : order.status === "Kutilmoqda" ? "bg-container"
                                    : order.status === "Yo'lda" ? "bg-yellow-500"
                                    : order.status === "Bekor qilingan" ? "bg-red-500"
                                    : "bg-container"
                                }`}>
                                    Holati: <span className="font-semibold">{order.status}</span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 text-center text-lg mt-4">
                    Mos buyurtmalar topilmadi.
                </p>
            )}
        </div>
    );
};
