import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "../../Axios";
import { Container } from '../../components/shared/Container/Container';
import Button from '../../components/ui/Button';
import AutoFocus from '../../middlewares/AutoFocus';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await Axios.get(`/product/${id}`);
                setProduct(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                toast.error("Mahsulot maʼlumotlarini olib boʻlmadi", { autoClose: 2000 })
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const saveToLocalStorage = () => {
        if (!selectedSize || !selectedColor) {
            toast.warning("Iltimos, o'lcham va rangni tanlang", { autoClose: 2000 });
            return;
        }

        const shopItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            img: product.photos[0],
            size: selectedSize,
            color: selectedColor,
        };

        const shopList = JSON.parse(localStorage.getItem("shopList")) || [];
        shopList.push(shopItem);
        localStorage.setItem("shopList", JSON.stringify(shopList));

        toast.success("Mahsulot xaridlaringiz ro'yxatiga qo'shildi!", { autoClose: 2000 });
    };

    if (loading) {
        return <div className="flex items-center justify-center gap-2 py-10 text-lg text-[#fff]">
            <AiOutlineLoading3Quarters className='animate-spin font-semibold'/>
            Kutilmoqda...
            </div>;
    }

    if (error) {
        return <div className="text-center py-10 text-error">Xatolik: {error}</div>;
    }

    return (
        <div className="bg-container  text-primary pt-10">
            <ToastContainer closeOnClick limit={2} position="top-left" theme={"dark"} icon pauseOnHover={false} />
            <AutoFocus />
            <Container className="grid  grid-cols-1 lg:grid-cols-3 ">
                <div className="flex relative justify-center col-span-1 items-center px-0 md:px-4 rounded-2xl shadow-xl ">
                    <img
                        src={product.photos[0]}
                        alt={product.title}
                        className="w-full h-full object-contain "
                    />
                    {product.sale > 0 ? (<div className='absolute py-2 px-2 z-10 bg-container top-5 text-[white] right-10'>
                        Chegirma
                    </div>) : (
                        " ")
                    }
                </div>

                <div className="col-span-1 md:col-span-2 p-6  rounded-2xl shadow-xl space-y-6">
                    <h1 className="text-2xl font-bold text-primary"><strong>Nomi: </strong>{product.title}</h1>
                    <p className="text-lg text-secontary">Kompaniyasi: {product.company}</p>

                    <div className="mt-6 flex items-center space-x-6">
                        <div className="text-3xl font-bold text-primary">
                            {product.price.toLocaleString()} so'm
                        </div>
                        {product.sale > 0 ? (
                            <div className="text-lg text-secontary line-through mt-2">
                                {product.sale.toLocaleString()} so'm
                            </div>
                        ) : ("")}
                    </div>
                    <div className="mt-6 flex items-center space-x-6">
                        <div className="text-2xl font-bold text-primary">
                            Mavjud: {product.stock}
                        </div>
                        <div>
                            {product.stock > 0 ? (
                                <div>
                                    <h1 className="text-xl font-semibold text-white bg-[#4CAF50] p-2 rounded-md text-center">Zaxirada mavjud</h1>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-xl font-semibold text-white bg-[#FF6347] p-2 rounded-md text-center">Zaxirada mavjud emas</h1>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-primary">O'lchamni tanlang*</h3>
                        <div className="flex gap-6 mt-2 flex-wrap">
                            {product.size.split(", ").map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-3 py-1 border-2 rounded-lg text-primary font-semibold transition-all duration-300 ${selectedSize === size ? 'bg-secontary' : ''
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-primary">Rangni tanlang*</h3>
                        <div className="flex gap-6 mt-2 flex-wrap">
                            {product.color.split(", ").map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 ${selectedColor === color ? 'border-[6px] border-secontary' : 'border-secontary '
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {
                        product.stock > 0 ? (
                            <div className="mt-8">
                                <Button
                                    onClick={saveToLocalStorage}
                                    className="w-full py-3 font-semibold text-[white] bg-secontary border-none rounded-lg hover:bg-meteor transition-colors duration-700"
                                >
                                    Savatga qo'shish
                                </Button>
                            </div>
                        ) : ("")
                    }
                </div>
            </Container >
        </div >
    );
}

export default Detail;
