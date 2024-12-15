import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "../../Axios";
import { Container } from '../../components/shared/Container/Container';
import Button from '../../components/ui/Button';
import Advantage from '../Advantage/Advantage';
import { Footer } from '../../components/shared/Footer/Footer';
import AutoFocus from '../../middlewares/AutoFocus';

function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    console.log(product);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await Axios.get(`/product/${id}`);
                setProduct(response.data.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch product data");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const saveToLocalStorage = () => {
        if (!selectedSize || !selectedColor) {
            alert("Please select a size and a color.");
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

        alert("Product added to your shopping list!");
    };

    if (loading) {
        return <div className="text-center py-10 text-lg text-secontary">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-error">{error}</div>;
    }
    console.log(product.size.split(", "));
    console.log(product.color.split(", "));

    return (
        <div className="bg-container  text-primary pt-10">
            <AutoFocus />
            <Container className="grid  grid-cols-1 lg:grid-cols-3 ">
                <div className="flex relative justify-center col-span-1 items-center px-0 md:px-4 rounded-2xl shadow-xl ">
                    <img
                        src={product.photos[0]}
                        alt={product.title}
                        className="w-full h-full object-contain "
                    />
                    {product.sale > 0 ? (<div className='absolute py-2 px-2 z-10 bg-highlight top-5 text-[white] right-10'>
                        Sale
                    </div>) : (
                        " ")
                    }
                </div>

                <div className="col-span-1 md:col-span-2 p-6  rounded-2xl shadow-xl space-y-6">
                    <h1 className="text-2xl font-bold text-primary"><strong>Title: </strong>{product.title}</h1>
                    <p className="text-lg text-secontary">{product.company}</p>

                    <div className="mt-6 flex items-center space-x-6">
                        <div className="text-3xl font-bold text-primary">
                            {product.price.toLocaleString()} so'm
                        </div>
                        {product.sale > 0 ? (
                            <div className="text-sm text-secontary line-through mt-2">
                                {product.sale.toLocaleString()} so'm
                            </div>
                        ) : ("")}
                    </div>
                    <div className="mt-6 flex items-center space-x-6">
                        <div className="text-3xl font-bold text-primary">
                            Stock: {product.stock}
                        </div>
                        <div>
                            {product.stock > 0 ? (
                                <div>
                                    <h1 className="text-xl font-semibold text-white bg-[#4CAF50] p-2 rounded-md text-center">In Stock</h1>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-xl font-semibold text-white bg-[#FF6347] p-2 rounded-md text-center">Out of Stock</h1>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-primary">Choose Size</h3>
                        <div className="flex gap-6 mt-2">
                            {product.size.split(", ").map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-3 py-1 border-2 rounded-lg text-primary font-semibold transition-all duration-300 ${selectedSize === size ? 'bg-highlight' : ''
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-primary">Choose Color</h3>
                        <div className="flex gap-6 mt-2">
                            {product.color.split(", ").map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 ${selectedColor === color ? 'border-8 border-highlight' : 'border-secontary '
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
                                    className="w-full py-3 font-semibold text-[white] bg-highlight rounded-lg hover:bg-accent transition-all duration-300"
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        ) : ("")
                    }
                </div>
            </Container >
            <div className='mt-14'>
                <Footer />
            </div>
        </div >
    );
}

export default Detail;
