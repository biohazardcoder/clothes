import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import {
    getOrdersError,
    getOrdersPending,
    getOrdersSuccess
} from "../../Toolkit/OrdersSlicer";
import { toast, ToastContainer } from "react-toastify";

export const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isPending, isError } = useSelector((state) => state.orders);
    const [isXS, setIsXS] = useState(window.innerWidth <= 767);
    const [activeIndex, setActiveIndex] = useState(null);
    console.log(data);

    useEffect(() => {
        const handleResize = () => {
            setIsXS(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const getAllOrders = async () => {
            dispatch(getOrdersPending());
            try {
                const response = await Axios.get("order");
                dispatch(getOrdersSuccess(response.data?.data || []));
            } catch (error) {
                dispatch(
                    getOrdersError(error.response?.data?.message || "Noma'lum xato")
                );
            }
        };
        getAllOrders();
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (!window.confirm("Siz ushbu buyurtmani o'chirishni xohlaysizmi?")) return;
        try {
            await Axios.delete(`orders/${id}`);
            dispatch(getOrdersSuccess(data.filter((order) => order._id !== id)));
            toast.success("Buyurtma muvaffaqiyatli o'chirildi!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Buyurtmani o'chirishda xato");
        }
    };

    const toggleCollapse = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    async function handleCancelOrder(orderId) {
        try {
            await Axios.delete(`/order/${orderId}`);
            if (!window.confirm("Haqiqatan ham buyurtma bekor qilishni xohlaysizmi!")) return;
            toast.success("Buyurtma bekor qilindi", { autoClose: 1000 })
            setTimeout(() => {
                window.location.href = "/orders"
            }, 1500)
        } catch (error) {
            toast.error("Buyurtmani bekor qilishda xatolik yuz berdi. Keyinroq qayta urinib ko‘ring yoki biz bilan bo'glaning", { autoClose: 2000 });
        }
    }
    async function handleOrder(orderId) {
        try {
            await Axios.put(`/order/${orderId}`);
            if (!window.confirm("Haqiqatan ham buyurtma yo'lga chiqdimi")) return;
            toast.success("Buyurtma yo'lda!", { autoClose: 1000 })
            setTimeout(() => {
                window.location.href = "/orders"
            }, 1500)
        } catch (error) {
            toast.error("Buyurtmani bekor qilishda xatolik yuz berdi. Keyinroq qayta urinib ko‘ring yoki biz bilan bo'glaning", { autoClose: 2000 });
        }
    }
    async function handleSuccess(orderId) {
        try {
            await Axios.put(`/order/success/${orderId}`);
            if (!window.confirm("Haqiqatan ham buyurtma yetkazib berildimi")) return;
            toast.success("Buyurtma yetkazib berildi", { autoClose: 1000 })
            setTimeout(() => {
                window.location.href = "/orders"
            }, 1500)
        } catch (error) {
            toast.error("Buyurtmani bekor qilishda xatolik yuz berdi. Keyinroq qayta urinib ko‘ring yoki biz bilan bo'glaning", { autoClose: 2000 });
        }
    }
    return (
        <div className="p-4 sm:p-8 bg-wishlistBg h-screen overflow-y-auto">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl sm:text-3xl text-mainText">
                    Buyurtmalar [ {data.length} ]
                </h1>
            </div>

            {isPending ? (
                <p className="text-primary">Yuklanmoqda...</p>
            ) : isError ? (
                <p className="text-red-500 text-center text-xl">Xato: {isError}</p>
            ) : data.length > 0 ? (
                <div className="w-full">
                    {data && data.length > 0 ? (
                        <ul className="space-y-4  ">
                            {[...data].reverse().map((order) => (
                                <li
                                    key={order._id}
                                    className="bg- p-4 bg-primary shadow-sm relative border "
                                >
                                    <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 space-y-2  text-sm">
                                        {order.products?.map(({ productId, quantity, title, color, size }) => (
                                            <div
                                                key={productId?._id}
                                                className="flex items-center justify-between p-4  mb-2"
                                            >
                                                {
                                                    productId?.photos ? (<img
                                                        src={productId.photos[0]}
                                                        alt={productId.title}
                                                        className="w-16 h-16 object-top object-cover rounded-md border border-highlight"
                                                    />) : (
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW1QfJp-qyNLzfZB2Eie3smAwK2aA5if1KVoxO7QI7PgGti3dLRVvbZiNTQ4rRF72HOEo&usqp=CAU"
                                                            alt={productId?.title}
                                                            className="w-16 h-16 object-top object-cover rounded-md border border-highlight"
                                                        />
                                                    )
                                                }
                                                <div className="flex-1 mx-2">
                                                    <h3 className="text-lg font-semibold text-[#000]">{title}</h3>
                                                    <div className="text-sm text-gray-400">
                                                        <span className="block">O'lchami: <span className="text-[#000]"><strong>{size}</strong></span></span>
                                                        <span className="block">Narxi: <span className="text-[#000]">{productId?.price?.toLocaleString()} so'm</span></span>
                                                        <span className="flex items-center gap-2">Rangi: <span style={{ backgroundColor: color }} className="text-[#000] py-2 px-10 border shadow-md"></span></span>
                                                        <span className="block">Miqdori: <span className="text-[#000]">{quantity} dona</span></span>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}

                                    </ul>

                                    <h3 className="text-sm text-secontary">
                                        Buyurtma ID: <span className="font-semibold text-[#000]">{order._id}</span>
                                    </h3>
                                    <h3 className="text-sm text-secontary">
                                        Buyurtma beruvchi: <span className="font-semibold text-[#000]">{order.customer.firstName + " " + order.customer.lastName}</span>
                                    </h3>
                                    <h3 className="text-sm text-secontary">
                                        Buyurtma beruvchi manzili: <span className="font-semibold text-[#000]">{order.customer.address}</span>
                                    </h3>
                                    <h3 className="text-sm text-secontary">
                                        Buyurtma beruvchi raqami: <span className="font-semibold text-[#000]">+998 {order.customer.phoneNumber}</span>
                                    </h3>
                                    <p className="text-sm text-secontary">Kuni: <span className="font-semibold text-[#000]">{order.orderDate.slice(0, 10)}</span></p>
                                    <p className="text-sm text-secontary">
                                        Umumiy qarzdorlik: <span className="font-semibold text-[#000]">{order.totalPrice.toLocaleString()}  so'm</span>
                                    </p>
                                    {
                                        (order.status === "Kutilmoqda") ? (
                                            <button
                                                onClick={() => handleOrder(order._id)}
                                                className="w-full h-[36px] bg-yellow-500 text-primary mt-2"
                                            >
                                                Yo'lda
                                            </button>
                                        ) : null
                                    }
                                    {
                                        (order.status === "Yo'lda") ? (
                                            <button
                                                onClick={() => handleSuccess(order._id)}
                                                className="w-full h-[36px] bg-success text-primary mt-2"
                                            >
                                                Yetkazim berildi
                                            </button>
                                        ) : null
                                    }

                                    {
                                        (order.status === "Kutilmoqda" || order.status === "Yo'lda") ? (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="w-full h-[36px] bg-highlight text-primary mt-2"
                                            >
                                                Bekor qilish
                                            </button>
                                        ) : null
                                    }

                                    <div className="absolute top-1 left-1">
                                        <p className={`text-sm text-primary py-2 px-3 ${order.status === "Yetkazib berilgan"
                                            ? "bg-[green]"
                                            : order.status === "Kutilmoqda"
                                                ? "bg-container"
                                                : order.status === "Yo'lda"
                                                    ? "bg-yellow-500"
                                                    : order.status === "Bekor qilingan"
                                                        ? "bg-[crimson]"
                                                        : "bg-container"
                                            }`}>Holati: <span className="font-semibold ">{order.status}</span></p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-primary">Buyurtmalar topilmadi.</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-600 text-center text-lg mt-4">
                    Buyurtmalar topilmadi.
                </p>
            )}
        </div>
    );
};
