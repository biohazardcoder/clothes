import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import {
    getClientError,
    getClientPending,
    getClientSuccess
} from "../../Toolkit/ClientSlicer";
import { ToastContainer } from "react-toastify";

export const Client = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isPending, isError } = useSelector((state) => state.clients);
    const [isXS, setIsXS] = useState(window.innerWidth <= 767);
    const [activeIndex, setActiveIndex] = useState(null);
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        const handleResize = () => {
            setIsXS(window.innerWidth <= 767);
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const getAllClients = async () => {
            dispatch(getClientPending());
            try {
                const response = await Axios.get("client");
                dispatch(getClientSuccess(response.data));
            } catch (error) {
                dispatch(getClientError(error.response?.data?.message));
            }
        };
        getAllClients();
    }, [dispatch]);

    const getProductDetails = async (productId) => {
        try {
            const response = await Axios.get(`product/${productId}`);
            if (response.data.data) {
                setProductDetails((prevDetails) => ({
                    ...prevDetails,
                    [productId]: response.data.data
                }));
            } else {
                setProductDetails((prevDetails) => ({
                    ...prevDetails,
                    [productId]: null
                }));
            }
        } catch (error) {
            setProductDetails((prevDetails) => ({
                ...prevDetails,
                [productId]: null
            }));
            if (error.response?.status === 409) {
                setProductDetails((prevDetails) => ({
                    ...prevDetails,
                    [productId]: { title: 'Product Deleted', description: 'This product has been deleted.' }
                }));
            } else {
                console.error(error);
            }
        }
    };

    const countProductQuantity = (productId, products) => {
        return products.filter((product) => product === productId).length;
    };

    const toggleCollapse = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="p-4 sm:p-8 bg-wishlistBg h-screen overflow-y-auto">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl sm:text-3xl text-mainText">
                    Mijozlar [ {data.length} ]
                </h1>
            </div>

            {isPending ? (
                <p>Yuklanmoqda...</p>
            ) : isError ? (
                <p className="text-red-500 text-center text-xl">Xato: {isError}</p>
            ) : data.length > 0 ? (
                <div className="w-full">
                    {data.map((client, index) => (
                        <div key={client._id} className="border-b border-gray-300">
                            <div
                                className={`flex items-center ${isXS ? "bg-orange-500 text-white p-2 cursor-pointer" : "p-2"}`}
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
                                            <div className="font-bold">Ism:</div>
                                            <div className="ml-2">{client.firstName}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Familiya:</div>
                                            <div className="ml-2">{client.lastName}</div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="font-bold">Telefon raqami:</div>
                                        <div className="ml-2">{client.phoneNumber}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="font-bold">Manzil:</div>
                                        <div className="ml-2">{client.address}</div>
                                    </div>

                                    <div className="flex">
                                        <div className="font-bold">Sotib olgan mahsulotlari:</div>
                                        <div className="ml-2">
                                            {client.products
                                                ?.filter((value, index, self) => self.indexOf(value) === index)
                                                .map((productId, index) => {
                                                    if (!productDetails[productId]) {
                                                        getProductDetails(productId);
                                                    }

                                                    const product = productDetails[productId];
                                                    const quantity = countProductQuantity(productId, client.products);

                                                    return (
                                                        <div key={index} className="border rounded p-2 mt-2">
                                                            {product ? (
                                                                product.title === 'Product Deleted' ? (
                                                                    <p className="text-red-500 font-bold">
                                                                        Mahsulot o'chirilgan!
                                                                    </p>
                                                                ) : (
                                                                    <>
                                                                        <h3 className="font-bold">{product.title}</h3>
                                                                        <p>{product.description}</p>
                                                                        <p>Price: {product.price} UZS</p>
                                                                        <p>Quantity: {quantity}</p>
                                                                        <p>Category: {product.category}</p>
                                                                        <p>Company: {product.company}</p>
                                                                        <p>Size: {product.size}</p>
                                                                        <p>Stock: {product.stock}</p>
                                                                    </>
                                                                )
                                                            ) : (
                                                                <p className="text-red-500 font-bold">Mahsulot o'chirilgan!</p>
                                                            )}
                                                        </div>
                                                    );

                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center text-lg mt-4">Mijozlar topilmadi.</p>
            )}
        </div>
    );
};
