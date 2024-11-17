import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import {
    getOrdersError,
    getOrdersPending,
    getOrdersSuccess
} from "../../Toolkit/OrdersSlicer";
import { Trash2 } from "lucide-react";
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

    return (
        <div className="p-4 sm:p-8 bg-wishlistBg h-screen overflow-y-auto">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl sm:text-3xl text-mainText">
                    Buyurtmalar [ {data.length} ]
                </h1>
                <button
                    onClick={() => navigate("/create-order")}
                    className="bg-sidebarBg text-white py-2 px-3 rounded hover:bg-slate-700"
                >
                    Yangi Buyurtma Qo'shish
                </button>
            </div>

            {isPending ? (
                <p>Yuklanmoqda...</p>
            ) : isError ? (
                <p className="text-red-500 text-center text-xl">Xato: {isError}</p>
            ) : data.length > 0 ? (
                <div className="w-full">
                    {data.map((order, index) => (
                        <div key={order._id} className="border-b border-gray-300">
                            <div
                                className={`flex items-center ${isXS ? "bg-orange-500 text-white p-2 cursor-pointer" : "p-2"
                                    }`}
                                onClick={() => toggleCollapse(index)}
                            >
                                {isXS && (
                                    <span className="ml-auto">
                                        {activeIndex === index ? "-" : "+"}
                                    </span>
                                )}
                            </div>
                            {((isXS && activeIndex === index) || !isXS) && (
                                <div className="p-4 space-y-2 bg-gray-100">
                                    <div>
                                        <div className="flex">
                                            <div className="font-bold">Buyurtma raqami:</div>
                                            <div className="ml-2">{order._id}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Mijoz ismi:</div>
                                            <div className="ml-2">{order.customer}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Quantity:</div>
                                            <div className="ml-2">{order.quantity}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Mahsulotlar:</div>
                                            <div className="ml-2">{order.products.map((item, index) => (
                                                <li key={index}>{item._id}</li>
                                            ))}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Date :</div>
                                            <div className="ml-2">{order.orderDate}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Status :</div>
                                            <div className="ml-2">{order.status}</div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="font-bold">Jami summa:</div>
                                        <div className="ml-2">{order.totalPrice} UZS</div>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="bg-red-600 text-white rounded-md p-1 hover:bg-red-700"
                                        >
                                            <Trash2 className="text-white text-[10px]" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center text-lg mt-4">
                    Buyurtmalar topilmadi.
                </p>
            )}
        </div>
    );
};
