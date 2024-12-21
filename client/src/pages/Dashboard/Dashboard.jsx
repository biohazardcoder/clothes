import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaPhone, FaLocationArrow } from "react-icons/fa";
import Cookies from "js-cookie";
import Axios from "../../Axios";
import { Link } from "react-router-dom";
import AutoFocus from "../../middlewares/AutoFocus";
import { toast, ToastContainer } from "react-toastify"
import { Footer } from "../../components/shared/Footer/Footer";
function Dashboard() {
    const { data, isAuth } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(data.firstName);
    const [lastName, setLastName] = useState(data.lastName);
    const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
    const [address, setAddress] = useState(data.address);
    function Logout() {
        if (!window.confirm("Are you sure you want to logout")) return;
        Cookies.remove("token");
        window.location.href = "/";
    }
    if (!isAuth) {
        window.location.href = "/login";

    }
    async function handleCancelOrder(orderId) {
        try {
            await Axios.delete(`/order/${orderId}`);
            toast.success("Buyurtma bekor qilindi", { autoClose: 1000 })
            setTimeout(() => {
                window.location.href = "/"
            }, 1500)
        } catch (error) {
            alert("Error canceling order. Please try again later.");
        }
    }

    async function handleSaveChanges() {
        try {
            await Axios.put(`/client/${data._id}`, {
                firstName,
                lastName,
                phoneNumber,
                address
            });
            toast.success("Tahrirlash muvaffaqiyatli amalga oshirildi!", { autoClose: 2000 })
            setIsEditing(false);
        } catch (error) {
            toast.error("Tahrirlashda xatolik. Qayta urinib ko'ring!", { autoClose: 2000 });
        }
    }


    return (
        <div className="h-screen bg-container text-mainText ">
            <ToastContainer closeOnClick limit={2} position="top-left" theme={"dark"} icon pauseOnHover={false} />
            <AutoFocus />
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="">
                        <div className="text-primary p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={data.avatar}
                                        alt="avatar"
                                        className="w-10 border-accent border-2 rounded-full"
                                    />
                                    <h1 className="text-2xl text-[white] font-semibold">
                                        Salom, {data.firstName}
                                    </h1>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mb-4">Shaxsiy ma'lumotingiz:</h2>
                            <div className="flex items-center gap-2 ">
                                <FaUser size={20} />
                                <span className="font-medium">{data.firstName} {data.lastName}</span>
                            </div>
                            <div className="flex items-center gap-2  mt-3">
                                <FaPhone size={20} />
                                <span className="font-medium">+998 {data.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-2  mt-3">
                                <FaLocationArrow size={20} />
                                <span className="font-medium">{data.address}</span>
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full bg-[indigo] text-[white] py-2 rounded-md hover:bg-indigo-500 transition duration-300 mt-4">
                                Tahrirlash
                            </button>
                            <button
                                onClick={Logout}
                                className="w-full mt-2 bg-[red] text-[white] py-2 rounded-md hover:bg-red-500 transition duration-300">
                                Chiqish
                            </button>
                        </div>
                    </div>


                    <div className=" col-span-2 p-6 ">
                        <h2 className="text-2xl text-primary font-semibold mb-4">Buyurtmalar:</h2>
                        {data.orders && data.orders.length > 0 ? (
                            <ul className="space-y-4  ">
                                {[...data.orders].reverse().map((order) => (
                                    <li
                                        key={order._id}
                                        className="bg- p-4 bg-primary shadow-sm relative border "
                                    >
                                        <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 space-y-2  text-sm">
                                            {order.products.map(({ productId, quantity, title, color, size }) => (
                                                <div
                                                    key={productId._id}
                                                    className="flex items-center justify-between p-4  mb-2"
                                                >
                                                    <Link to={`/detail/${productId._id}`}>
                                                        <img
                                                            src={productId.photos[0]}
                                                            alt={productId.title}
                                                            className="w-16 h-16 object-top object-cover rounded-md border border-highlight"
                                                        />
                                                    </Link>

                                                    <div className="flex-1 mx-2">
                                                        <h3 className="text-lg font-semibold text-[#000]">{title}</h3>
                                                        <div className="text-sm text-gray-400">
                                                            <span className="block">O'lchami: <span className="text-[#000]"><strong>{size}</strong></span></span>
                                                            <span className="block">Narxi: <span className="text-[#000]">{productId.price.toLocaleString()} so'm</span></span>
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
                                        <p className="text-sm text-secontary">Kuni: <span className="font-semibold text-[#000]">{order.orderDate.slice(0, 10)}</span></p>
                                        <p className="text-sm text-secontary">
                                            Umumiy qarzdorlik: <span className="font-semibold text-[#000]">{order.totalPrice.toLocaleString()}  so'm</span>
                                        </p>
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
                                                    : order.status === "Tahrirlangan"
                                                        ? "bg-[orange]"
                                                        : order.status === "Bekor qilingan"
                                                            ? "bg-[crimson]"
                                                            : "bg-container"
                                                }`}>Holati: <span className="font-semibold ">{order.status}</span></p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-primary">No orders found.</p>
                        )}
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-[black] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[white] p-6 rounded-lg w-1/3 shadow-lg">
                        <h2 className="text-2xl font-semibold  mb-4">Edit Account</h2>
                        <div className="flex items-center gap-2 mb-3">
                            <label className="">First Name:</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-2 rounded-md w-full" />
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <label className="">Last Name:</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-2 rounded-md w-full" />
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <label className="">Phone Number:</label>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border p-2 rounded-md w-full" />
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <label className="">Address:</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 rounded-md w-full" />
                        </div>
                        <button
                            onClick={handleSaveChanges}
                            className="w-full bg-[indigo] text-[white] py-2 rounded-md hover:bg-indigo-500 transition duration-300">
                            Save Changes
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 mt-2">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Dashboard;
